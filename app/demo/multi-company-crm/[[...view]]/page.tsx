import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CRM from "@/components/multi-company-crm/CRM";

export const metadata: Metadata = { title: "Workspace CRM | Multi-company demo", description: "An isolated, interactive multi-company CRM demonstration." };
const views = ["dashboard", "customers", "meetings", "opportunities", "quotations", "orders", "tasks", "reports"];
export default function DemoPage({ params }: { params: { view?: string[] } }) {
  const view = params.view?.[0] || "dashboard";
  if (!views.includes(view) || (params.view?.length || 0) > 1) notFound();
  return <CRM view={view} />;
}
