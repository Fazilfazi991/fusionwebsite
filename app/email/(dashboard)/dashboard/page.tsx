import { SetupWarning } from "@/components/setup-warning";
import { listLeads, listReviewItems, countSentToday, getSettings, isDatabaseReady } from "@/lib/db";
import { getDailySendLimit } from "@/lib/resend";

export default async function DashboardPage() {
  const [databaseReady, leads, reviewItems, sentToday, settings] = await Promise.all([isDatabaseReady(), listLeads(), listReviewItems(), countSentToday(), getSettings()]);
  const dailySendLimit = getDailySendLimit(settings);
  const stats = [
    { label: "Total leads", value: leads.length },
    { label: "Need review", value: reviewItems.filter((item) => !["Draft Created", "Sent", "Skipped"].includes(item.leads.status)).length },
    { label: "Sent today", value: `${sentToday}/${dailySendLimit}` },
    { label: "Replies", value: leads.filter((lead) => lead.status === "Replied").length }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted">Your private lead generation and approved email sending workflow.</p>
      </div>
      <SetupWarning ready={databaseReady} />
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="panel p-5">
            <p className="field-label">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <section className="panel mt-6 p-5">
        <h2 className="text-lg font-semibold">Guardrails</h2>
        <div className="mt-3 grid gap-3 text-sm text-muted md:grid-cols-3">
          <p>No auto-send functionality exists.</p>
          <p>Every email must be manually reviewed and approved.</p>
          <p>Daily send limit is enforced before sending.</p>
        </div>
      </section>
    </div>
  );
}
