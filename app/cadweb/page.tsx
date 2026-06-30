import Image from "next/image";
import { ArrowRight, Dribbble, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CanadaAgencyPricing } from "@/components/canada-agency-pricing";
import { CanadaAgencyProcess } from "@/components/canada-agency-process";

export default function CadWebPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 bg-[#050505]/95">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-14">
          <a href="/" aria-label="Fusion Ventures home">
            <Image
              src="/fusion-ventures-logo.webp"
              alt="Fusion Ventures"
              width={640}
              height={176}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-white/18 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white/78 transition-colors hover:border-white/34 hover:text-white sm:px-7"
          >
            Discuss Partnership
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
          </a>
        </div>
      </header>

      <CanadaAgencyPricing />
      <CanadaAgencyProcess />

      <footer id="contact" className="border-t border-white/10 bg-black px-5 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:grid-cols-[1.6fr_1fr_1fr_1.45fr]">
          <div>
            <a href="/" aria-label="Fusion Ventures home">
              <Image
                src="/fusion-ventures-logo.webp"
                alt="Fusion Ventures"
                width={640}
                height={176}
                className="h-9 w-auto sm:h-10"
              />
            </a>
            <p className="mt-5 max-w-[270px] text-sm leading-6 text-white/52">
              Building, operating, and scaling digital-first ventures with long-term focus.
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Instagram, Dribbble].map((Icon, index) => (
                <span
                  key={index}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/14 text-white/62 transition-colors hover:border-white/32 hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.55} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Web Portfolio", "/web-portfolio"],
              ["Ventures", "/ventures"]
            ].map(([item, href]) => (
              <a key={item} href={href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            {[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms and Conditions", "/terms-and-conditions"],
              ["Cookie Policy", "/cookie-policy"]
            ].map(([item, href]) => (
              <a key={item} href={href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h3>
            <a
              href="mailto:info@fustionventuresglobal.com"
              className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              info@fustionventuresglobal.com
            </a>
            <a
              href="tel:+971542763828"
              className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              +971 54 276 3828
            </a>
            <p className="flex items-center gap-3 text-sm text-white/56">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              UAE-Based Venture Group
            </p>
          </div>
        </div>

        <div className="mx-auto mt-9 flex max-w-[1280px] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Fusion Ventures. All rights reserved.</p>
          <a href="/cadweb" className="transition-colors hover:text-white">
            Back To Top
          </a>
        </div>
      </footer>
    </main>
  );
}
