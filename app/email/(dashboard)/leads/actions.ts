"use server";

import { parse } from "csv-parse/sync";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SERVICE_OPTIONS } from "@/lib/constants";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const leadSchema = z.object({
  business_name: z.string().min(1),
  contact_name: z.string().optional(),
  email: z.string().email(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  service_to_pitch: z.enum(SERVICE_OPTIONS),
  notes: z.string().optional()
});

export async function createLead(formData: FormData) {
  const values = leadSchema.parse(Object.fromEntries(formData));
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("leads").upsert(values, { onConflict: "email", ignoreDuplicates: true });
  if (error) throw error;
  revalidatePath("/email/leads");
  redirect("/email/leads?toast=lead-added");
}

export async function uploadLeadsCsv(formData: FormData) {
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("CSV file is required.");

  const text = await file.text();
  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  }) as Array<Record<string, string>>;

  const leads = rows
    .map((row) => ({
      business_name: row.business_name || row.company || row.business || "",
      contact_name: row.contact_name || row.name || "",
      email: row.email || "",
      website: row.website || "",
      instagram: row.instagram || "",
      industry: row.industry || "",
      location: row.location || "",
      service_to_pitch: row.service_to_pitch || "Website development",
      notes: row.notes || ""
    }))
    .filter((row) => row.business_name && row.email)
    .map((row) => leadSchema.parse(row));

  if (leads.length) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").upsert(leads, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw error;
  }

  revalidatePath("/email/leads");
  redirect(`/email/leads?toast=csv-uploaded&count=${leads.length}`);
}
