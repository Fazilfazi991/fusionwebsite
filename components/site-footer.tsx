import Image from "next/image";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Digital Solutions", href: "/fynta" },
  { label: "Web Portfolio", href: "/web-portfolio" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 text-white sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:grid-cols-[1.6fr_1fr_1fr_1.45fr]">
        <div>
          <a href="/" aria-label="Fusion Ventures home">
            <Image src="/fusion-ventures-logo.webp" alt="Fusion Ventures" width={640} height={176} className="h-9 w-auto sm:h-10" />
          </a>
          <p className="mt-5 max-w-[270px] text-sm leading-6 text-white/52">Building, operating, and scaling digital-first ventures with long-term focus.</p>
          <div className="mt-5 flex gap-3">
            {[
              { label: "Fusion Ventures on LinkedIn", href: "https://www.linkedin.com/company/fusion-ventures-global/", icon: Linkedin },
              { label: "Fusion Ventures on Instagram", href: "https://www.instagram.com/fusionventuresglobal/", icon: Instagram }
            ].map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-8 w-8 place-items-center rounded-full border border-white/14 text-white/68 transition-colors hover:border-[#d6a84f]/60 hover:text-[#d6a84f]"><Icon className="h-4 w-4" strokeWidth={1.55} /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
          {links.map((link) => <a key={link.label} href={link.href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-white">{link.label}</a>)}
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
          {[{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms and Conditions", href: "/terms-and-conditions" }, { label: "Cookie Policy", href: "/cookie-policy" }, { label: "KAAM Account Deletion", href: "/kaam/delete-account" }].map((link) => <a key={link.label} href={link.href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-white">{link.label}</a>)}
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h3>
          <a href="mailto:info@fusionventuresglobal.com" className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-[#d6a84f]"><Mail className="h-4 w-4 shrink-0" strokeWidth={1.55} />info@fusionventuresglobal.com</a>
          <a href="tel:+971542763828" className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-[#d6a84f]"><Phone className="h-4 w-4 shrink-0" strokeWidth={1.55} />+971 54 276 3828</a>
          <p className="flex items-center gap-3 text-sm text-white/56"><MapPin className="h-4 w-4 shrink-0" strokeWidth={1.55} />UAE-Based Venture Group</p>
        </div>
      </div>
      <div className="mx-auto mt-9 flex max-w-[1280px] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between"><p>&copy; 2026 Fusion Ventures. All rights reserved.</p><p>Privacy Policy &middot; Terms and Conditions</p></div>
    </footer>
  );
}
