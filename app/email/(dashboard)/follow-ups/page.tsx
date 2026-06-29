import { ToastBanner } from "@/components/toast-banner";
import { SetupWarning } from "@/components/setup-warning";
import { isDatabaseReady, listQueueItems } from "@/lib/db";

export default async function FollowUpsPage({ searchParams }: { searchParams: Promise<{ toast?: string }> }) {
  const params = await searchParams;
  const [databaseReady, queueItems] = await Promise.all([isDatabaseReady(), listQueueItems()]);
  const followups = queueItems.filter((item) => item.step !== "initial" && ["queued", "failed"].includes(item.status));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Follow-up Reminders</h1>
        <p className="text-sm text-muted">Queued follow-ups appear here and stop automatically when you mark a lead replied or closed.</p>
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
            {followups.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.leads?.business_name || item.to_email}</p>
                  <p className="text-xs text-muted">{item.to_email}</p>
                </td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">{new Date(item.scheduled_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">{item.step}</td>
              </tr>
            ))}
            {!followups.length ? (
              <tr>
                <td className="px-4 py-6 text-sm text-muted" colSpan={4}>
                  No follow-ups due yet. They will appear after initial emails are sent from the queue.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
