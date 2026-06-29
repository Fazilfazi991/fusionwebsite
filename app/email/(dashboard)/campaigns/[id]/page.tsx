import { Sparkles } from "lucide-react";
import { SetupWarning } from "@/components/setup-warning";
import { ToastBanner } from "@/components/toast-banner";
import { assignLeadToCampaign, generateEmailsForCampaign } from "@/app/email/(dashboard)/campaigns/actions";
import { getCampaign, isDatabaseReady, listCampaignLeads, listLeads, listQueueItems, listRecentActivity, listReviewItems } from "@/lib/db";

export default async function CampaignDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ toast?: string; count?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [databaseReady, campaign, campaignLeads, allLeads, queueItems, reviewItems, activity] = await Promise.all([
    isDatabaseReady(),
    getCampaign(id),
    listCampaignLeads(id),
    listLeads(),
    listQueueItems(),
    listReviewItems(),
    listRecentActivity(50)
  ]);

  if (!campaign) {
    return <div className="panel p-8 text-sm text-muted">Campaign not found.</div>;
  }

  const campaignQueue = queueItems.filter((item) => item.campaign_id === id);
  const campaignReview = reviewItems.filter((item) => item.leads.campaign_id === id);
  const stats = [
    { label: "Total leads", value: campaignLeads.length },
    { label: "Generated", value: campaignReview.length },
    { label: "Scheduled", value: campaignQueue.filter((item) => item.status === "queued").length },
    { label: "Sent", value: campaignQueue.filter((item) => item.status === "sent").length },
    { label: "Replied", value: campaignLeads.filter((lead) => lead.sequence_status === "replied" || lead.status === "Replied").length },
    { label: "Interested", value: campaignLeads.filter((lead) => lead.sequence_status === "interested").length },
    { label: "Not interested", value: campaignLeads.filter((lead) => lead.sequence_status === "not_interested" || lead.status === "Not Interested").length },
    { label: "Converted", value: campaignLeads.filter((lead) => lead.sequence_status === "converted" || lead.status === "Converted").length },
    { label: "Failed", value: campaignQueue.filter((item) => item.status === "failed").length },
    { label: "Follow-ups due", value: campaignQueue.filter((item) => item.status === "queued" && item.step !== "initial" && new Date(item.scheduled_at) <= new Date()).length }
  ];
  const unassignedLeads = allLeads.filter((lead) => !lead.campaign_id);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{campaign.name}</h1>
          <p className="text-sm text-muted">{campaign.description || `${campaign.service_to_pitch} outreach campaign.`}</p>
        </div>
        <form action={generateEmailsForCampaign}>
          <input type="hidden" name="campaignId" value={campaign.id} />
          <button className="btn-primary">
            <Sparkles className="h-4 w-4" />
            Generate Emails for Campaign
          </button>
        </form>
      </div>
      <SetupWarning ready={databaseReady} />
      <ToastBanner toast={query.toast} count={query.count} />
      <div className="grid gap-4 md:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="panel p-4">
            <p className="field-label">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="panel overflow-hidden">
          <div className="border-b border-line p-5">
            <h2 className="text-lg font-semibold">Campaign leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cloud text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Business</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Next action</th>
                </tr>
              </thead>
              <tbody>
                {campaignLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <p className="font-medium">{lead.business_name}</p>
                      <p className="text-xs text-muted">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3">{lead.sequence_status || lead.status}</td>
                    <td className="px-4 py-3">{lead.next_action_at ? new Date(lead.next_action_at).toLocaleString() : "None"}</td>
                  </tr>
                ))}
                {!campaignLeads.length ? (
                  <tr><td colSpan={3} className="px-4 py-10 text-center text-sm text-muted">Assign test leads before generating campaign emails.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="space-y-5">
          <section className="panel p-5">
            <h2 className="text-lg font-semibold">Assign lead</h2>
            <form action={assignLeadToCampaign} className="mt-4 grid gap-3">
              <input type="hidden" name="campaignId" value={campaign.id} />
              <select name="leadId" className="w-full" required>
                <option value="">Select unassigned lead</option>
                {unassignedLeads.map((lead) => (
                  <option key={lead.id} value={lead.id}>{lead.business_name} - {lead.email}</option>
                ))}
              </select>
              <button className="btn-secondary" type="submit">Assign to campaign</button>
            </form>
          </section>
          <section className="panel p-5">
            <h2 className="text-lg font-semibold">Activity log</h2>
            <div className="mt-4 grid gap-3 text-sm">
              {activity.filter((item) => item.campaign_id === campaign.id).slice(0, 12).map((item) => (
                <div key={item.id} className="rounded-md border border-line p-3">
                  <p className="font-medium">{item.message}</p>
                  <p className="text-xs text-muted">{new Date(item.created_at).toLocaleString()}</p>
                </div>
              ))}
              {!activity.filter((item) => item.campaign_id === campaign.id).length ? <p className="text-sm text-muted">No activity yet.</p> : null}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
