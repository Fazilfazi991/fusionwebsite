import { EmailEditor } from "@/components/email-editor";
import { SetupWarning } from "@/components/setup-warning";
import { ToastBanner } from "@/components/toast-banner";
import { getSettings, isDatabaseReady, listReviewItems } from "@/lib/db";

export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ toast?: string }> }) {
  const params = await searchParams;
  const [databaseReady, reviewItems, settings] = await Promise.all([isDatabaseReady(), listReviewItems(), getSettings()]);
  const aiAvailable = Boolean(process.env.GEMINI_API_KEY);
  const items = reviewItems.filter((item) => !["Draft Created", "Sent", "Skipped", "Converted"].includes(item.leads.status));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Email Review Queue</h1>
        <p className="text-sm text-muted">Edit AI output, regenerate it, or create Gmail drafts for manual sending.</p>
      </div>
      <SetupWarning ready={databaseReady} />
      <ToastBanner toast={params.toast} />
      <div className="grid gap-5">
        {items.map((item) => (
          <EmailEditor key={item.id} item={item} settings={settings} aiAvailable={aiAvailable} />
        ))}
        {!items.length ? <div className="panel p-8 text-center text-sm text-muted">No generated emails waiting for review. Generate an email from the Leads page to start.</div> : null}
      </div>
    </div>
  );
}
