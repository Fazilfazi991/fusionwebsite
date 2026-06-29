"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLead, getSettings } from "@/lib/db";
import { generateOutreachEmail } from "@/lib/ai";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function generateForLead(formData: FormData) {
  let destination = "/email/leads?toast=generate-error";
  try {
    const leadId = String(formData.get("leadId"));
    const lead = await getLead(leadId);
    if (!lead || !lead.business_name || !lead.email || !lead.service_to_pitch) {
      destination = "/email/leads?toast=generate-validation-error";
    } else {
      const settings = await getSettings();
      const generated = await generateOutreachEmail({ lead, settings });
      const supabase = getSupabaseAdmin();

      const { error } = await supabase.from("generated_emails").insert({
        lead_id: lead.id,
        lead_observation: generated.observation,
        subject: generated.subject,
        body: generated.body,
        follow_up_1: generated.followup1,
        follow_up_2: generated.followup2,
        status: "Need Review",
        model: generated.generation_provider
      });
      if (error) throw error;

      const { error: statusError } = await supabase.from("leads").update({ status: "Need Review" }).eq("id", lead.id);
      if (statusError) {
        await supabase.from("leads").update({ status: "Generated" }).eq("id", lead.id);
      }
      await supabase.from("outreach_events").insert({
        lead_id: lead.id,
        event_type: "Generated",
        notes: generated.warning || `Generated using ${generated.generation_provider}.`
      });

      revalidatePath("/email/leads");
      revalidatePath("/email/review");
      destination = generated.warning ? "/email/review?toast=template-fallback-used" : "/email/review?toast=email-generated";
    }
  } catch {
    destination = "/email/leads?toast=generate-error";
  }
  redirect(destination);
}

export async function generateForAllNewLeads() {
  let destination = "/email/leads?toast=bulk-generate-error";
  try {
    const supabase = getSupabaseAdmin();
    const settings = await getSettings();
    const { data: leads, error } = await supabase.from("leads").select("*").eq("status", "New").not("email", "is", null);
    if (error) throw error;

    let count = 0;
    for (const lead of leads || []) {
      if (!lead.business_name || !lead.email || !lead.service_to_pitch) continue;
      const generated = await generateOutreachEmail({ lead, settings });
      const { error: insertError } = await supabase.from("generated_emails").insert({
        lead_id: lead.id,
        lead_observation: generated.observation,
        subject: generated.subject,
        body: generated.body,
        follow_up_1: generated.followup1,
        follow_up_2: generated.followup2,
        status: "Need Review",
        model: generated.generation_provider
      });
      if (!insertError) {
        const { error: statusError } = await supabase.from("leads").update({ status: "Need Review" }).eq("id", lead.id);
        if (statusError) {
          await supabase.from("leads").update({ status: "Generated" }).eq("id", lead.id);
        }
        count += 1;
      }
    }

    revalidatePath("/email/leads");
    revalidatePath("/email/review");
    destination = `/email/leads?toast=bulk-generated&count=${count}`;
  } catch {
    destination = "/email/leads?toast=bulk-generate-error";
  }
  redirect(destination);
}

export async function generateAuditAngle(formData: FormData) {
  const leadId = String(formData.get("leadId"));
  const returnTo = String(formData.get("returnTo") || "/email/review");
  let destination = `${returnTo}?toast=audit-error`;
  try {
    const lead = await getLead(leadId);
    if (!lead || !lead.business_name || !lead.email || !lead.service_to_pitch) {
      destination = `${returnTo}?toast=audit-validation-error`;
    } else {
      const settings = await getSettings();
      const generated = await generateOutreachEmail({ lead, settings });
      const audit = {
        problem_noticed: generated.observation,
        opportunity: `Make the ${lead.service_to_pitch.toLowerCase()} angle easier to understand and act on.`,
        recommended_pitch_angle: generated.subject,
        opening_line: generated.observation,
        model: generated.generation_provider
      };
      const supabase = getSupabaseAdmin();
      const { error } = await supabase
        .from("leads")
        .update({
          audit_problem: audit.problem_noticed,
          audit_opportunity: audit.opportunity,
          audit_pitch_angle: audit.recommended_pitch_angle,
          audit_opening_line: audit.opening_line,
          audit_generated_at: new Date().toISOString()
        })
        .eq("id", lead.id);
      if (error) throw error;

      await supabase.from("outreach_events").insert({ lead_id: lead.id, event_type: "Audit Angle Generated", notes: `Generated with ${audit.model}.` });
      revalidatePath("/email/leads");
      revalidatePath("/email/review");
      destination = `${returnTo}?toast=audit-generated`;
    }
  } catch {
    destination = `${returnTo}?toast=audit-error`;
  }
  redirect(destination);
}

export async function regenerateEmail(formData: FormData) {
  const generatedId = String(formData.get("generatedId"));
  const leadId = String(formData.get("leadId"));
  const lead = await getLead(leadId);
  if (!lead) throw new Error("Lead not found.");

  const settings = await getSettings();
  const generated = await generateOutreachEmail({ lead, settings });
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("generated_emails")
    .update({
      lead_observation: generated.observation,
      subject: generated.subject,
      body: generated.body,
      follow_up_1: generated.followup1,
      follow_up_2: generated.followup2,
      edited_subject: null,
      edited_body: null,
      model: generated.generation_provider
    })
    .eq("id", generatedId);
  if (error) throw error;

  revalidatePath("/email/review");
  redirect("/email/review?toast=email-regenerated");
}

export async function regenerateWithTemplate(formData: FormData) {
  const generatedId = String(formData.get("generatedId"));
  const leadId = String(formData.get("leadId"));
  const lead = await getLead(leadId);
  if (!lead) throw new Error("Lead not found.");

  const settings = await getSettings();
  const generated = await generateOutreachEmail({
    lead,
    settings: {
      sender_name: settings?.sender_name || null,
      agency_name: settings?.agency_name || null,
      portfolio_url: settings?.portfolio_url || null,
      reply_to_email: settings?.reply_to_email || null,
      generation_mode: "template"
    }
  });
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("generated_emails")
    .update({
      lead_observation: generated.observation,
      subject: generated.subject,
      body: generated.body,
      follow_up_1: generated.followup1,
      follow_up_2: generated.followup2,
      edited_subject: null,
      edited_body: null,
      approved_subject: null,
      approved_body: null,
      approved_at: null,
      status: "Draft",
      model: generated.generation_provider
    })
    .eq("id", generatedId);
  if (error) throw error;

  revalidatePath("/email/review");
  redirect("/email/review?toast=template-regenerated");
}

export async function regenerateWithAi(formData: FormData) {
  const generatedId = String(formData.get("generatedId"));
  const leadId = String(formData.get("leadId"));
  const lead = await getLead(leadId);
  if (!lead) throw new Error("Lead not found.");

  const settings = await getSettings();
  const generated = await generateOutreachEmail({
    lead,
    settings: {
      sender_name: settings?.sender_name || null,
      agency_name: settings?.agency_name || null,
      portfolio_url: settings?.portfolio_url || null,
      reply_to_email: settings?.reply_to_email || null,
      generation_mode: "gemini"
    }
  });
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("generated_emails")
    .update({
      lead_observation: generated.observation,
      subject: generated.subject,
      body: generated.body,
      follow_up_1: generated.followup1,
      follow_up_2: generated.followup2,
      edited_subject: null,
      edited_body: null,
      approved_subject: null,
      approved_body: null,
      approved_at: null,
      status: "Draft",
      model: generated.generation_provider
    })
    .eq("id", generatedId);
  if (error) throw error;

  revalidatePath("/email/review");
  redirect("/email/review?toast=ai-regenerated");
}

export async function markSent(formData: FormData) {
  const leadId = String(formData.get("leadId"));
  const due = new Date();
  due.setDate(due.getDate() + 3);

  const supabase = getSupabaseAdmin();
  await supabase.from("leads").update({ status: "Sent", last_contacted_at: new Date().toISOString(), follow_up_due_at: due.toISOString() }).eq("id", leadId);
  await supabase.from("outreach_events").insert({ lead_id: leadId, event_type: "Sent", notes: "Marked as sent manually." });
  revalidatePath("/email/review");
  revalidatePath("/email/follow-ups");
  redirect("/email/follow-ups?toast=marked-sent");
}

export async function skipLead(formData: FormData) {
  const leadId = String(formData.get("leadId"));
  const supabase = getSupabaseAdmin();
  await supabase.from("leads").update({ status: "Skipped" }).eq("id", leadId);
  await supabase.from("outreach_events").insert({ lead_id: leadId, event_type: "Skipped", notes: "Skipped during manual review." });
  revalidatePath("/email/review");
  revalidatePath("/email/leads");
  redirect("/email/review?toast=lead-skipped");
}
