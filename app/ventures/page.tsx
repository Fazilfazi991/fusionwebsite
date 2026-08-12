import type { Metadata } from "next";
import VenturesShowcaseClient from "./VenturesShowcaseClient";

export const metadata: Metadata = {
  title: "Fusion Ventures Portfolio | Ventures Built for the Future",
  description:
    "Explore the Fusion Ventures ecosystem, a portfolio of digital-first ventures across consumer brands, technology, travel, events, career tools, and creator platforms."
};

export default function VenturesPage() {
  return <VenturesShowcaseClient />;
}
