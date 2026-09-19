import type { Metadata } from "next";
import AutoPartsCRM from "./AutoPartsCRM";

export const metadata: Metadata = {
  title: "Auto Parts CRM | Interactive Demo",
  description: "Interactive automotive spare-parts CRM workflow demo."
};

export default function AutoPartsCRMPage() {
  return <AutoPartsCRM />;
}
