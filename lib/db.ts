import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { AgencySettings, GeneratedEmail, Lead } from "@/lib/types";

type SupabaseLikeError = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
};

function isMissingSchemaError(error: SupabaseLikeError) {
  return error.code === "42P01" || error.message?.toLowerCase().includes("does not exist");
}

function throwReadableError(error: SupabaseLikeError): never {
  throw new Error(error.message || JSON.stringify(error));
}

export async function isDatabaseReady() {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").select("id", { head: true, count: "exact" }).limit(1);
    if (!error) return true;
    if (isMissingSchemaError(error)) return false;
    throwReadableError(error);
  } catch (error) {
    if (error instanceof Error && error.message.includes("environment variables are missing")) {
      return false;
    }
    throw error;
  }
}

export async function getSettings(): Promise<AgencySettings | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("agency_settings").select("*").limit(1).maybeSingle();
  if (error) {
    if (isMissingSchemaError(error)) return null;
    throwReadableError(error);
  }
  return data;
}

export async function upsertSettings(input: Partial<AgencySettings>) {
  const supabase = getSupabaseAdmin();
  const current = await getSettings();
  const payload = {
    sender_name: input.sender_name || "Fazil",
    agency_name: input.agency_name || "Fusion Ventures",
    portfolio_url: input.portfolio_url || "https://www.fusionventuresglobal.com/web-portfolio",
    reply_to_email: input.reply_to_email || "",
    sender_email: input.sender_email || "",
    default_signature: input.default_signature || "",
    daily_draft_limit: Number(input.daily_draft_limit || 25),
    daily_send_limit: Number(input.daily_send_limit || 25),
    generation_mode: input.generation_mode || "template",
    openai_api_key_encrypted: input.openai_api_key_encrypted || null,
    gmail_connected: Boolean(input.gmail_connected),
    bulk_unsubscribe_line: input.bulk_unsubscribe_line || "If this is not relevant, reply unsubscribe and I will not contact you again."
  };

  if (current) {
    const { error } = await supabase.from("agency_settings").update(payload).eq("id", current.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("agency_settings").insert(payload);
  if (error) throw error;
}

export async function listLeads(): Promise<Lead[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error) {
    if (isMissingSchemaError(error)) return [];
    throwReadableError(error);
  }
  return data || [];
}

export async function getLead(id: string): Promise<Lead | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (error) {
    if (isMissingSchemaError(error)) return null;
    throwReadableError(error);
  }
  return data;
}

export async function listReviewItems(): Promise<Array<GeneratedEmail & { leads: Lead }>> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("generated_emails")
    .select("*, leads(*)")
    .order("created_at", { ascending: false });
  if (error) {
    if (isMissingSchemaError(error)) return [];
    throwReadableError(error);
  }
  return (data || []) as Array<GeneratedEmail & { leads: Lead }>;
}

export async function listFollowUps(): Promise<Lead[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .in("status", ["Follow-up Needed", "Sent"])
    .order("follow_up_due_at", { ascending: true, nullsFirst: false });
  if (error) {
    if (isMissingSchemaError(error)) return [];
    throwReadableError(error);
  }
  return data || [];
}

export async function countDraftsToday() {
  const supabase = getSupabaseAdmin();
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const { count, error } = await supabase
    .from("gmail_drafts")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since.toISOString());
  if (error) {
    if (isMissingSchemaError(error)) return 0;
    throwReadableError(error);
  }
  return count || 0;
}

export async function countSentToday() {
  const supabase = getSupabaseAdmin();
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const { count, error } = await supabase
    .from("sent_emails")
    .select("id", { count: "exact", head: true })
    .eq("status", "sent")
    .gte("sent_at", since.toISOString());
  if (error) {
    if (isMissingSchemaError(error)) return 0;
    throwReadableError(error);
  }
  return count || 0;
}
