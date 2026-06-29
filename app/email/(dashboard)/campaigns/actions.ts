"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateOutreachEmail } from "@/lib/ai";
import { queueApprovedEmail } from "@/lib/automation";
import { getCampaign, getSettings, listCampaignLeads, logActivity } from "@/lib/db";
import { SERVICE_OPTIONS } from "@/lib/constants";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const campaignSchema = z.object({
  name: z.string().min(1),
  service_to_pitch: z.enum(SERVICE_OPTIONS),
  target_industry: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "paused", "completed"]).default("draft"),
  daily_send_limit: z.coerce.number().min(1).default(25),
  working_hours_start: z.string().default("09:00"),
  working_hours_end: z.string().default("17:00"),
  send_weekends: z.coerce.boolean().default(false),
  followup1_delay_days: z.coerce.number().min(1).default(3),
  followup2_delay_days: z.coerce.number().min(1).default(7),
  followup3_delay_days: z.coerce.number().min(1).default(12)
});

export async function createCampaign(formData: FormData) {
  const values = campaignSchema.parse({
    ...Object.fromEntries(formData),
    send_weekends: formData.get("send_weekends") === "on"
  });
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("campaigns").insert(values).select("id").single();
  if (error) throw error;
  await logActivity({ campaignId: data.id, type: "campaign_created", message: `Campaign created: ${values.name}` });
  revalidatePath("/email/campaigns");
  redirect(`/email/campaigns/${data.id}?toast=campaign-created`);
}

export async function assignLeadToCampaign(formData: FormData) {
  const campaignId = String(formData.get("campaignId"));
  const leadId = String(formData.get("leadId"));
  const campaign = await getCampaign(campaignId);
  if (!campaign) throw new Error("Campaign not found.");

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("leads")
    .update({ campaign_id: campaignId, service_to_pitch: campaign.service_to_pitch, sequence_status: "new" })
    .eq("id", leadId);
  if (error) throw error;
  await logActivity({ leadId, campaignId, type: "lead_assigned", message: "Lead assigned to campaign." });
  revalidatePath(`/email/campaigns/${campaignId}`);
  redirect(`/email/campaigns/${campaignId}?toast=campaign-updated`);
}

export async function generateEmailsForCampaign(formData: FormData) {
  const campaignId = String(formData.get("campaignId"));
  const [campaign, settings, leads] = await Promise.all([getCampaign(campaignId), getSettings(), listCampaignLeads(campaignId)]);
  if (!campaign) throw new Error("Campaign not found.");

  const supabase = getSupabaseAdmin();
  let count = 0;
  for (const lead of leads) {
    if (!lead.business_name || !lead.email || !lead.service_to_pitch) continue;
    const { data: existing } = await supabase.from("generated_emails").select("id").eq("lead_id", lead.id).limit(1).maybeSingle();
    if (existing?.id && lead.sequence_status !== "new") continue;

    const generated = await generateOutreachEmail({ lead, settings });
    const { data: inserted, error } = await supabase
      .from("generated_emails")
      .insert({
        lead_id: lead.id,
        lead_observation: generated.observation,
        subject: generated.subject,
        body: generated.body,
        follow_up_1: generated.followup1,
        follow_up_2: generated.followup2,
        follow_up_3: generated.followup3,
        status: settings?.require_manual_approval_before_first_send === false ? "Approved" : "Need Review",
        model: generated.generation_provider
      })
      .select("id,subject,body")
      .single();
    if (error) throw error;

    if (settings?.require_manual_approval_before_first_send === false) {
      await supabase
        .from("generated_emails")
        .update({ approved_subject: inserted.subject, approved_body: inserted.body, approved_at: new Date().toISOString() })
        .eq("id", inserted.id);
      await queueApprovedEmail(inserted.id);
    } else {
      await supabase.from("leads").update({ status: "Need Review", sequence_status: "review_needed" }).eq("id", lead.id);
    }
    await logActivity({ leadId: lead.id, campaignId, type: "email_generated", message: `Generated using ${generated.generation_provider}.` });
    count += 1;
  }

  revalidatePath(`/email/campaigns/${campaignId}`);
  revalidatePath("/email/review");
  revalidatePath("/email/queue");
  redirect(`/email/campaigns/${campaignId}?toast=campaign-emails-generated&count=${count}`);
}
