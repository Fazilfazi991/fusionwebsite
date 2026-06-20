import type { Metadata } from "next";
import WebPortfolioClient from "./WebPortfolioClient";

export const metadata: Metadata = {
  title: "Web Portfolio | Fusion Ventures",
  description:
    "Explore websites built by Fusion Ventures across ecommerce, corporate, healthcare, education, hospitality, wellness, printing, and digital platforms."
};

export default function WebPortfolioPage() {
  return <WebPortfolioClient />;
}
