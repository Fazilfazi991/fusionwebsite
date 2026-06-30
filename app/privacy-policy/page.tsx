import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Fusion Ventures",
  description: "Privacy Policy for Fusion Ventures."
};

const sections = [
  {
    title: "Information We Collect",
    text: "We may collect contact details, business information, project requirements, website usage data, and communications you share with us through forms, email, or direct conversations."
  },
  {
    title: "How We Use Information",
    text: "We use information to respond to enquiries, provide services, improve our website, manage business relationships, send relevant updates, and protect our operations."
  },
  {
    title: "Sharing Information",
    text: "We do not sell personal information. We may share limited information with trusted service providers, partners, or legal authorities when required to operate our business or comply with law."
  },
  {
    title: "Data Security",
    text: "We use reasonable technical and organisational measures to protect information. No digital system is completely secure, but we work to keep data handled responsibly."
  },
  {
    title: "Your Choices",
    text: "You may request access, correction, or deletion of your personal information where applicable. You can also ask us to stop non-essential communications."
  },
  {
    title: "Contact",
    text: "For privacy questions, contact Fusion Ventures at info@fustionventuresglobal.com."
  }
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy.
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-8 text-white/64">
            This Privacy Policy explains how Fusion Ventures handles information collected through our website and business communications.
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
