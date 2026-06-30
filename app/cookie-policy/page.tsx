import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cookie Policy | Fusion Ventures",
  description: "Cookie Policy for Fusion Ventures."
};

const sections = [
  {
    title: "What Cookies Are",
    text: "Cookies are small files stored on your device to help websites function, remember preferences, analyse performance, and improve user experience."
  },
  {
    title: "How We Use Cookies",
    text: "Fusion Ventures may use essential cookies, analytics cookies, and similar technologies to understand website usage and improve our digital experience."
  },
  {
    title: "Third-Party Tools",
    text: "Some cookies may be set by third-party tools used for analytics, embedded content, or website performance. These providers may process data under their own policies."
  },
  {
    title: "Managing Cookies",
    text: "You can manage or disable cookies through your browser settings. Some website features may not work properly if essential cookies are blocked."
  },
  {
    title: "Updates",
    text: "We may update this Cookie Policy as our website and tools evolve. The latest version will be available on this page."
  },
  {
    title: "Contact",
    text: "For cookie-related questions, contact Fusion Ventures at info@fustionventuresglobal.com."
  }
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 px-5 py-6 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <a href="/" aria-label="Fusion Ventures home">
            <Image src="/fusion-ventures-logo.webp" alt="Fusion Ventures" width={640} height={176} className="h-9 w-auto" />
          </a>
          <a href="/" className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6a84f]">
            Back Home
          </a>
        </div>
      </header>

      <section className="px-5 py-16 sm:px-10 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6a84f]">Legal</p>
          <h1 className="mt-5 font-display text-5xl font-normal leading-tight tracking-[-0.05em] sm:text-6xl">
            Cookie Policy.
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-8 text-white/64">
            This Cookie Policy explains how Fusion Ventures may use cookies and similar technologies on our website.
          </p>

          <div className="mt-12 grid gap-5">
            {sections.map((section) => (
              <article key={section.title} className="rounded-lg border border-[#d6a84f]/18 bg-white/[0.035] p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/62">{section.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
