import type { Metadata } from "next";
import BusinessSoftwareClient from "./BusinessSoftwareClient";

export const metadata: Metadata = {
  title: "Interactive CRM Demos | Fusion Ventures",
  description:
    "Explore interactive CRM demos for property investment and rentals, cargo, water transport, parts trading, equipment supply, construction, printing, equipment rentals and repairs. Each system can be customized for your business."
};

export default function BusinessSoftwarePage() {
  return <BusinessSoftwareClient />;
}
