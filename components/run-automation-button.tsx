"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Play } from "lucide-react";

export function RunAutomationButton({ dueCount }: { dueCount: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function run() {
    if (!confirm(`This will send up to ${dueCount} queued emails that are due now. Continue?`)) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/automation/run", { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Automation failed.");
      setMessage(`Sent ${data.sent}, skipped ${data.skipped}, failed ${data.failed}. Remaining today: ${data.dailyLimitRemaining}.`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Automation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="btn-primary w-fit" type="button" onClick={run} disabled={loading || dueCount <= 0}>
        <Play className="h-4 w-4" />
        {loading ? "Running..." : "Run Automation Now"}
      </button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}
