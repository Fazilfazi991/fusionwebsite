create extension if not exists pgcrypto;

create type lead_status as enum (
  'New',
  'Generated',
  'Need Review',
  'Draft Created',
  'Sent',
  'Follow-up Needed',
  'Replied',
  'Not Interested',
  'Converted',
  'Skipped'
);

create type pitch_service as enum (
  'Website development',
  'Website redesign',
  'E-commerce website',
  'Travel website/package pages',
  'Branding',
  'Social media design',
  'AI automation',
  'SEO',
  'Custom software'
);

create table agency_settings (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null default 'Fazil',
  agency_name text not null default 'Fusion Ventures',
  portfolio_url text not null default 'https://www.fusionventuresglobal.com/web-portfolio',
  reply_to_email text not null default '',
  sender_email text not null default '',
  default_signature text not null default '',
  daily_draft_limit integer not null default 25 check (daily_draft_limit > 0),
  daily_send_limit integer not null default 25 check (daily_send_limit > 0),
  generation_mode text not null default 'template' check (generation_mode in ('template', 'gemini', 'openai')),
  openai_api_key_encrypted text,
  gmail_connected boolean not null default false,
  bulk_unsubscribe_line text not null default 'If this is not relevant, reply unsubscribe and I will not contact you again.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text,
  email text not null,
  website text,
  instagram text,
  industry text,
  location text,
  service_to_pitch pitch_service not null,
  notes text,
  audit_problem text,
  audit_opportunity text,
  audit_pitch_angle text,
  audit_opening_line text,
  audit_generated_at timestamptz,
  status lead_status not null default 'New',
  follow_up_due_at timestamptz,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email)
);

create table generated_emails (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  lead_observation text not null,
  subject text not null,
  body text not null,
  follow_up_1 text not null,
  follow_up_2 text not null,
  edited_subject text,
  edited_body text,
  approved_subject text,
  approved_body text,
  approved_at timestamptz,
  status text not null default 'Draft',
  model text,
  prompt_version text not null default 'v1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table gmail_drafts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  generated_email_id uuid references generated_emails(id) on delete set null,
  gmail_draft_id text not null,
  subject text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table sent_emails (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  generated_email_id uuid not null references generated_emails(id) on delete cascade,
  provider text not null default 'resend',
  provider_message_id text,
  to_email text not null,
  from_email text not null,
  subject text not null,
  body text not null,
  status text not null default 'sent',
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  unique (generated_email_id)
);

create table outreach_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  event_type text not null,
  notes text,
  created_at timestamptz not null default now()
);

create index leads_status_idx on leads(status);
create index leads_follow_up_due_at_idx on leads(follow_up_due_at);
create index generated_emails_lead_id_idx on generated_emails(lead_id);
create index gmail_drafts_created_at_idx on gmail_drafts(created_at);
create index sent_emails_created_at_idx on sent_emails(created_at);
create index sent_emails_sent_at_idx on sent_emails(sent_at);
create index sent_emails_lead_id_idx on sent_emails(lead_id);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger agency_settings_updated_at
before update on agency_settings
for each row execute function set_updated_at();

create trigger leads_updated_at
before update on leads
for each row execute function set_updated_at();

create trigger generated_emails_updated_at
before update on generated_emails
for each row execute function set_updated_at();
