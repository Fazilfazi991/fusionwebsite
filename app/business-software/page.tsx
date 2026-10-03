import type { Metadata } from "next";
import BusinessSoftwareClient from "./BusinessSoftwareClient";

export const metadata: Metadata = {
  title: "Interactive CRM Demos | Fusion Ventures",
  description:
    "Try ten interactive CRM demos for different businesses, including parts trading, equipment supply, construction, field sales, laundry and rentals. Each system can be customized for your business."
};

export default function BusinessSoftwarePage() {
  return <BusinessSoftwareClient />;
}
