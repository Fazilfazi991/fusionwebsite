import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { getLead, getSettings } from "@/lib/db";
import { generateOutreachEmail } from "@/lib/ai";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const generateSchema = z.object({
  leadId: z.string().uuid()
});

export async function POST(request: Request) {
  const unauthorized = await requireApiAuth();
  if (unauthorized) return unauthorized;

  const { leadId } = generateSchema.parse(await request.json());
  const lead = await getLead(leadId);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const settings = await getSettings();
  const generated = await generateOutreachEmail({ lead, settings });
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("generated_emails")
    .insert({
      lead_id: lead.id,
      lead_observation: generated.observation,
      subject: generated.subject,
      body: generated.body,
      follow_up_1: generated.followup1,
      follow_up_2: generated.followup2,
      follow_up_3: generated.followup3,
      status: "Need Review",
      model: generated.generation_provider
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { error: statusError } = await supabase.from("leads").update({ status: "Need Review", sequence_status: "review_needed" }).eq("id", lead.id);
  if (statusError) {
    await supabase.from("leads").update({ status: "Generated" }).eq("id", lead.id);
  }
  return NextResponse.json({ generatedEmail: data, generationProvider: generated.generation_provider, warning: generated.warning || null });
}
