import type { Metadata } from "next";
import BusinessSoftwareClient from "./BusinessSoftwareClient";

export const metadata: Metadata = {
  title: "Business Software Portfolio | Fusion Ventures",
  description:
    "Explore ten interactive demos of custom CRM, parts trading, equipment supply, construction, field sales, laundry, rental, healthcare and business operations platforms built by Fusion Ventures."
};

export default function BusinessSoftwarePage() {
  return <BusinessSoftwareClient />;
}
