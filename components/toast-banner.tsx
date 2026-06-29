const messages: Record<string, string> = {
  "lead-added": "Lead added.",
  "csv-uploaded": "CSV uploaded.",
  "email-generated": "Email generated and added to review.",
  "template-fallback-used": "Generated using template fallback.",
  "generate-error": "Could not generate this email. Please check the lead and database setup.",
  "generate-validation-error": "Business name, email, and service to pitch are required before generation.",
  "bulk-generated": "Generated review emails for new leads.",
  "bulk-generate-error": "Could not bulk generate emails. Please check the database setup.",
  "email-regenerated": "Email regenerated.",
  "template-regenerated": "Template email regenerated.",
  "ai-regenerated": "AI email regenerated.",
  "gmail-draft-created": "Gmail draft created.",
  "email-sent": "Approved email sent through Resend.",
  "audit-generated": "Website audit angle generated.",
  "audit-error": "Could not generate the audit angle. Template fallback will still work for email generation.",
  "audit-validation-error": "Business name, email, and service to pitch are required before generating an audit angle.",
  "marked-sent": "Lead marked as sent and follow-up reminder created.",
  "lead-skipped": "Lead skipped.",
  "settings-saved": "Settings saved."
};

export function ToastBanner({ toast, count }: { toast?: string; count?: string }) {
  if (!toast) return null;

  const message = messages[toast] || "Done.";
  const suffix = toast === "csv-uploaded" && count ? ` ${count} row${count === "1" ? "" : "s"} processed.` : "";

  return (
    <div className="mb-5 rounded-md border border-mint/30 bg-mint/10 px-4 py-3 text-sm font-medium text-ink">
      {message}
      {suffix}
    </div>
  );
}
