import type { LeadStatus, ServiceOption } from "@/lib/constants";

export type Lead = {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string;
  website: string | null;
  instagram: string | null;
  industry: string | null;
  location: string | null;
  service_to_pitch: ServiceOption;
  notes: string | null;
  audit_problem: string | null;
  audit_opportunity: string | null;
  audit_pitch_angle: string | null;
  audit_opening_line: string | null;
  audit_generated_at: string | null;
  status: LeadStatus;
  follow_up_due_at: string | null;
  last_contacted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GeneratedEmail = {
  id: string;
  lead_id: string;
  lead_observation: string;
  subject: string;
  body: string;
  follow_up_1: string;
  follow_up_2: string;
  edited_subject: string | null;
  edited_body: string | null;
  approved_subject: string | null;
  approved_body: string | null;
  approved_at: string | null;
  status: string;
  model: string | null;
  prompt_version: string;
  created_at: string;
  updated_at: string;
};

export type AgencySettings = {
  id: string;
  sender_name: string;
  agency_name: string;
  portfolio_url: string;
  reply_to_email: string;
  sender_email: string;
  default_signature: string;
  daily_draft_limit: number;
  daily_send_limit: number;
  generation_mode: "template" | "gemini" | "openai";
  openai_api_key_encrypted: string | null;
  gmail_connected: boolean;
  bulk_unsubscribe_line: string;
};
