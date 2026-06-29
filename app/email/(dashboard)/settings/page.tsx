import { MailCheck } from "lucide-react";
import { SetupWarning } from "@/components/setup-warning";
import { ToastBanner } from "@/components/toast-banner";
import { getSettings, isDatabaseReady } from "@/lib/db";
import { getEmailSendingConfig } from "@/lib/resend";
import { saveSettings } from "@/app/email/(dashboard)/settings/actions";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ toast?: string }> }) {
  const params = await searchParams;
  const [databaseReady, settings] = await Promise.all([isDatabaseReady(), getSettings()]);
  const emailConfig = getEmailSendingConfig();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted">Control sender identity, Gemini generation, and Resend email sending details.</p>
      </div>
      <SetupWarning ready={databaseReady} />
      <ToastBanner toast={params.toast} />
      <form action={saveSettings} className="panel grid gap-4 p-5 md:grid-cols-2">
        <label>
          <span className="field-label">Sender name</span>
          <input name="sender_name" defaultValue={settings?.sender_name || "Fazil"} className="mt-1 w-full" />
        </label>
        <label>
          <span className="field-label">Agency name</span>
          <input name="agency_name" defaultValue={settings?.agency_name || "Fusion Ventures"} className="mt-1 w-full" />
        </label>
        <label className="md:col-span-2">
          <span className="field-label">Portfolio URL</span>
          <input name="portfolio_url" type="url" defaultValue={settings?.portfolio_url || "https://www.fusionventuresglobal.com/web-portfolio"} className="mt-1 w-full" />
        </label>
        <label>
          <span className="field-label">Sender email</span>
          <input name="sender_email" type="email" defaultValue={settings?.sender_email || ""} className="mt-1 w-full" />
        </label>
        <label>
          <span className="field-label">Reply-to email</span>
          <input name="reply_to_email" type="email" defaultValue={settings?.reply_to_email || emailConfig.replyTo || ""} className="mt-1 w-full" />
        </label>
        <label>
          <span className="field-label">Daily send limit</span>
          <input name="daily_send_limit" type="number" min="1" defaultValue={settings?.daily_send_limit || emailConfig.dailyLimit || 25} className="mt-1 w-full" />
        </label>
        <label>
          <span className="field-label">Generation Mode</span>
          <select name="generation_mode" defaultValue={settings?.generation_mode === "openai" ? "gemini" : settings?.generation_mode || (process.env.AI_PROVIDER === "gemini" ? "gemini" : "template")} className="mt-1 w-full">
            <option value="template">Template fallback</option>
            <option value="gemini">Gemini</option>
          </select>
          <span className="mt-1 block text-xs text-muted">Gemini is used for AI generation. If Gemini fails, the app automatically uses template fallback.</span>
        </label>
        <label>
          <span className="field-label">Legacy daily draft limit</span>
          <input name="daily_draft_limit" type="number" min="1" defaultValue={settings?.daily_draft_limit || 25} className="mt-1 w-full" />
        </label>
        <label className="md:col-span-2">
          <span className="field-label">Default signature</span>
          <textarea name="default_signature" defaultValue={settings?.default_signature || ""} className="mt-1 min-h-28 w-full" />
        </label>
        <label className="md:col-span-2">
          <span className="field-label">Bulk unsubscribe line</span>
          <input name="bulk_unsubscribe_line" defaultValue={settings?.bulk_unsubscribe_line || ""} className="mt-1 w-full" />
        </label>
        <div className="rounded-md border border-line bg-cloud p-4 md:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <MailCheck className="h-4 w-4" />
            Email Sending Settings
          </div>
          <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
            <p><span className="font-semibold">Provider:</span> Resend</p>
            <p><span className="font-semibold">Daily send limit:</span> {settings?.daily_send_limit || emailConfig.dailyLimit}</p>
            <p><span className="font-semibold">From:</span> {emailConfig.from || "Set OUTREACH_FROM in .env.local"}</p>
            <p><span className="font-semibold">Reply-to:</span> {settings?.reply_to_email || emailConfig.replyTo || "Optional"}</p>
          </div>
          <p className="mt-3 text-sm text-muted">Make sure your sending domain is verified in Resend before sending real emails. The API key is never shown here.</p>
        </div>
        <div className="md:col-span-2">
          <button className="btn-primary" type="submit">
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}
