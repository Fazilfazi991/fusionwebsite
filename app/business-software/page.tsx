import type { Metadata } from "next";
import BusinessSoftwareClient from "./BusinessSoftwareClient";

export const metadata: Metadata = {
  title: "Business Software Portfolio | Fusion Ventures",
  description:
    "Explore custom CRM, healthcare operations, content management and business software platforms built by Fusion Ventures."
};

export default function BusinessSoftwarePage() {
  return <BusinessSoftwareClient />;
}
