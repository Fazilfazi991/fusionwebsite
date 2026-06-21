import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Fusion Ventures | UAE-Based Venture Group",
  description:
    "Fusion Ventures is a UAE-based venture group that builds, owns, operates, and scales digital-first businesses across commerce, technology, marketplaces, travel, and consumer brands."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} bg-paper font-sans text-ink`}>
        {children}
      </body>
    </html>
  );
}
