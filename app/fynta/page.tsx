import type { Metadata } from "next";
import FyntaClient from "./FyntaClient";

export const metadata: Metadata = {
  title: "Fynta | Fusion Ventures",
  description:
    "Explore Fynta's creative digital marketing portfolio across branding, SEO, social media, ad campaigns, video, product marketing, and case studies."
};

export default function FyntaPage() {
  return <FyntaClient />;
}
