import { RunAutomationButton } from "@/components/run-automation-button";
import { SetupWarning } from "@/components/setup-warning";
import { countQueuedDueNow, isDatabaseReady, listQueueItems } from "@/lib/db";

export default async function QueuePage() {
  const [databaseReady, queueItems, dueCount] = await Promise.all([isDatabaseReady(), listQueueItems(), countQueuedDueNow()]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Sending Queue</h1>
          <p className="text-sm text-muted">Approved emails wait here until the guarded automation runner sends them inside limits.</p>
        </div>
        <RunAutomationButton dueCount={dueCount} />
      </div>
      <SetupWarning ready={databaseReady} />
      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-cloud text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Step</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Scheduled</th>
            </tr>
          </thead>
          <tbody>
            {queueItems.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.leads?.business_name || item.to_email}</p>
                  <p className="text-xs text-muted">{item.to_email}</p>
                </td>
                <td className="px-4 py-3">{item.campaigns?.name || "No campaign"}</td>
                <td className="px-4 py-3">{item.step}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-cloud px-2 py-1 text-xs font-semibold text-muted">{item.status}</span>
                  {item.error_message ? <p className="mt-1 text-xs text-rose">{item.error_message}</p> : null}
                </td>
                <td className="px-4 py-3">{new Date(item.scheduled_at).toLocaleString()}</td>
              </tr>
            ))}
            {!queueItems.length ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-muted">No queued emails yet. Approve emails from the Review page to schedule them.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
