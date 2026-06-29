import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { countSentToday, getLead, getSettings } from "@/lib/db";
import { hasUnresolvedPlaceholders } from "@/lib/placeholders";
import { getDailySendLimit, getEmailSendingConfig, sendWithResend } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const sendSchema = z.object({
  leadId: z.string().uuid(),
  generatedEmailId: z.string().uuid(),
  subject: z.string().trim().min(1),
  body: z.string().trim().min(1)
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const unauthorized = await requireApiAuth();
  if (unauthorized) return unauthorized;

  const payload = sendSchema.parse(await request.json());
  const supabase = getSupabaseAdmin();
  const lead = await getLead(payload.leadId);
  const settings = await getSettings();

  if (!lead) return jsonError("Lead not found.", 404);
  if (!isValidEmail(lead.email)) return jsonError("Lead recipient email is missing or invalid.");
  if (hasUnresolvedPlaceholders(`${payload.subject}\n${payload.body}`)) {
    return jsonError("This email still contains unresolved placeholders. Please fix them before sending.");
  }

  const { data: generatedEmail, error: generatedError } = await supabase
    .from("generated_emails")
    .select("*")
    .eq("id", payload.generatedEmailId)
    .eq("lead_id", lead.id)
    .maybeSingle();

  if (generatedError) return jsonError(generatedError.message, 500);
  if (!generatedEmail) return jsonError("Generated email not found.", 404);

  const { data: existingSent, error: existingError } = await supabase
    .from("sent_emails")
    .select("id,status,provider_message_id")
    .eq("generated_email_id", payload.generatedEmailId)
    .eq("status", "sent")
    .maybeSingle();

  if (existingError) return jsonError(existingError.message, 500);
  if (existingSent) return jsonError("This generated email has already been sent.");

  const dailyLimit = getDailySendLimit(settings);
  const sentToday = await countSentToday();
  if (sentToday >= dailyLimit) {
    return jsonError(`Daily send limit reached (${sentToday}/${dailyLimit}).`);
  }

  const config = getEmailSendingConfig(settings);
  if (!config.apiKey) return jsonError("RESEND_API_KEY is missing.");
  if (!config.from) return jsonError("OUTREACH_FROM is missing.");

  const approvedAt = new Date().toISOString();

  await supabase
    .from("generated_emails")
    .update({
      approved_subject: payload.subject,
      approved_body: payload.body,
      approved_at: approvedAt,
      status: "Approved"
    })
    .eq("id", payload.generatedEmailId);

  try {
    const response = await sendWithResend({
      to: lead.email,
      subject: payload.subject,
      body: payload.body,
      settings
    });

    const sentAt = new Date().toISOString();
    const { error: sentError } = await supabase.from("sent_emails").upsert(
      {
        lead_id: lead.id,
        generated_email_id: payload.generatedEmailId,
        provider: "resend",
        provider_message_id: response.id,
        to_email: lead.email,
        from_email: config.from,
        subject: payload.subject,
        body: payload.body,
        status: "sent",
        error_message: null,
        sent_at: sentAt
      },
      { onConflict: "generated_email_id" }
    );

    if (sentError) return jsonError(sentError.message, 500);

    await supabase.from("generated_emails").update({ status: "Sent" }).eq("id", payload.generatedEmailId);
    await supabase.from("leads").update({ status: "Sent", last_contacted_at: sentAt }).eq("id", lead.id);
    await supabase.from("outreach_events").insert({ lead_id: lead.id, event_type: "Sent", notes: `Sent via Resend: ${response.id}` });

    return NextResponse.json({
      ok: true,
      provider: "resend",
      providerMessageId: response.id,
      sentAt
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Resend failed to send the email.";
    await supabase.from("sent_emails").upsert(
      {
        lead_id: lead.id,
        generated_email_id: payload.generatedEmailId,
        provider: "resend",
        provider_message_id: null,
        to_email: lead.email,
        from_email: config.from,
        subject: payload.subject,
        body: payload.body,
        status: "failed",
        error_message: message,
        sent_at: null
      },
      { onConflict: "generated_email_id" }
    );

    return jsonError(message, 502);
  }
}
