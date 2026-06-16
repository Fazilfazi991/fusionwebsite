import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fusion Ventures | Building Companies With Long-Term Vision",
  description:
    "Fusion Ventures is a diversified venture group that builds, owns, operates, and scales enduring businesses."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-paper font-sans text-ink`}>
        {children}
      </body>
    </html>
  );
}
