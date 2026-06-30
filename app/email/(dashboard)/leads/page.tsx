import { FolderKanban, SearchCheck, Sparkles } from "lucide-react";
import { BulkGenerateButton } from "@/components/bulk-generate-button";
import { CsvUpload } from "@/components/csv-upload";
import { LeadForm } from "@/components/lead-form";
import { SetupWarning } from "@/components/setup-warning";
import { ToastBanner } from "@/components/toast-banner";
import { isDatabaseReady, listCampaigns, listLeads } from "@/lib/db";
import { updateLeadSequenceStatus } from "@/app/email/(dashboard)/leads/actions";
import { generateAuditAngle, generateForAllNewLeads, generateForLead } from "@/app/email/(dashboard)/review/actions";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ toast?: string; count?: string }> }) {
  const params = await searchParams;
  const [databaseReady, leads, campaigns] = await Promise.all([isDatabaseReady(), listLeads(), listCampaigns()]);
  const campaignSections = campaigns
    .map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      service: campaign.service_to_pitch,
      status: campaign.status,
      leads: leads.filter((lead) => lead.campaign_id === campaign.id)
    }))
    .filter((section) => section.leads.length > 0);
  const unassignedLeads = leads.filter((lead) => !lead.campaign_id);
  const sections = [
    ...campaignSections,
    ...(unassignedLeads.length
      ? [{ id: "unassigned", name: "Unassigned leads", description: "Leads not added to a campaign yet.", service: "Mixed services", status: "new", leads: unassignedLeads }]
      : [])
  ];

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Fusion OS / Email Automation</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">Leads</h1>
        <p className="mt-1 text-sm text-zinc-500">Organize outreach leads by campaign section, then generate, review, queue, and follow up from one workspace.</p>
      </div>
      <SetupWarning ready={databaseReady} />
      <ToastBanner toast={params.toast} count={params.count} />
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Lead sections</h2>
                <p className="text-sm text-zinc-500">{leads.length} total leads across {sections.length || 0} section{sections.length === 1 ? "" : "s"}.</p>
              </div>
              <BulkGenerateButton action={generateForAllNewLeads} />
            </div>
          </div>

          {sections.map((section) => (
            <section key={section.id} className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-soft">
              <div className="border-b border-zinc-200 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-zinc-950 text-white">
                      <FolderKanban className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-950">{section.name}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{section.description || `${section.service} outreach section`}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700">{section.leads.length} leads</span>
                    <span className="rounded-md bg-zinc-950 px-2.5 py-1 text-xs font-semibold text-white">{section.status}</span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                    <tr>
                      <th className="px-4 py-3">Business</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Manual outcome</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.leads.map((lead) => (
                      <tr key={lead.id} className="border-t border-zinc-100">
                        <td className="px-4 py-3">
                          <p className="font-medium text-zinc-950">{lead.business_name}</p>
                          <p className="text-xs text-zinc-500">{lead.email}</p>
                        </td>
                        <td className="px-4 py-3 text-zinc-700">{lead.service_to_pitch}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600">{lead.sequence_status || lead.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <form action={updateLeadSequenceStatus} className="flex gap-2">
                            <input type="hidden" name="leadId" value={lead.id} />
                            <select name="status" className="min-w-36 text-xs">
                              <option value="replied">Replied</option>
                              <option value="interested">Interested</option>
                              <option value="not_interested">Not interested</option>
                              <option value="converted">Converted</option>
                              <option value="unsubscribed">Unsubscribed</option>
                              <option value="closed">Closed</option>
                            </select>
                            <button className="btn-secondary text-xs" type="submit">Update</button>
                          </form>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <form action={generateAuditAngle}>
                              <input type="hidden" name="leadId" value={lead.id} />
                              <input type="hidden" name="returnTo" value="/email/leads" />
                              <button className="btn-secondary">
                                <SearchCheck className="h-4 w-4" />
                                Audit
                              </button>
                            </form>
                            <form action={generateForLead}>
                              <input type="hidden" name="leadId" value={lead.id} />
                              <button className="btn-secondary" disabled={["Draft Created", "Sent", "Converted"].includes(lead.status)}>
                                <Sparkles className="h-4 w-4" />
                                Generate
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {!leads.length ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
              Add your first lead or upload a CSV to test the full flow.
            </div>
          ) : null}
        </div>
        <div className="space-y-5">
          <CsvUpload />
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
