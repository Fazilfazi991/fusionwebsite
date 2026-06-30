import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms and Conditions | Fusion Ventures",
  description: "Terms and Conditions for Fusion Ventures."
};

const sections = [
  {
    title: "Use of Website",
    text: "You may use this website for lawful purposes only. You agree not to misuse the website, interfere with its operation, or attempt to access restricted systems."
  },
  {
    title: "Website Content",
    text: "All content on this website is provided for general information. We may update, remove, or change content at any time without prior notice."
  },
  {
    title: "Intellectual Property",
    text: "Fusion Ventures branding, design, copy, images, and website materials are owned by or licensed to Fusion Ventures unless otherwise stated."
  },
  {
    title: "Business Enquiries",
    text: "Submitting an enquiry does not create a partnership, client relationship, investment agreement, or obligation until a separate written agreement is signed."
  },
  {
    title: "External Links",
    text: "Our website may link to third-party websites. We are not responsible for third-party content, policies, availability, or business practices."
  },
  {
    title: "Contact",
    text: "For questions about these Terms and Conditions, contact Fusion Ventures at info@fustionventuresglobal.com."
  }
];

export default function TermsAndConditionsPage() {
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
            Terms and Conditions.
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-8 text-white/64">
            These Terms and Conditions govern use of the Fusion Ventures website and related digital touchpoints.
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
