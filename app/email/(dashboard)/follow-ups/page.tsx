import { ToastBanner } from "@/components/toast-banner";
import { SetupWarning } from "@/components/setup-warning";
import { isDatabaseReady, listFollowUps } from "@/lib/db";

export default async function FollowUpsPage({ searchParams }: { searchParams: Promise<{ toast?: string }> }) {
  const params = await searchParams;
  const [databaseReady, leads] = await Promise.all([isDatabaseReady(), listFollowUps()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Follow-up Reminders</h1>
        <p className="text-sm text-muted">Leads marked sent or needing a follow-up appear here.</p>
      </div>
      <SetupWarning ready={databaseReady} />
      <ToastBanner toast={params.toast} />
      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-cloud text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Service</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <p className="font-medium">{lead.business_name}</p>
                  <p className="text-xs text-muted">{lead.email}</p>
                </td>
                <td className="px-4 py-3">{lead.status}</td>
                <td className="px-4 py-3">{lead.follow_up_due_at ? new Date(lead.follow_up_due_at).toLocaleDateString() : "Not set"}</td>
                <td className="px-4 py-3">{lead.service_to_pitch}</td>
              </tr>
            ))}
            {!leads.length ? (
              <tr>
                <td className="px-4 py-6 text-sm text-muted" colSpan={4}>
                  No follow-ups yet. Mark a reviewed email as sent to create a reminder.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
