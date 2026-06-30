import type { Metadata } from "next";
import PlumletClient from "./PlumletClient";

export const metadata: Metadata = {
  title: "Plumlet | Fusion Ventures",
  description:
    "Plumlet is an upcoming creative marketplace for artists, makers, dreamers, small creators, and shoppers."
};

export default function PlumletPage() {
  return <PlumletClient />;
}
