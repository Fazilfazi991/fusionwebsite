import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Compass,
  Grid3X3,
  Mail,
  Menu,
  Network,
  Rocket,
  Sparkles,
  UsersRound
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fusion Ventures Portfolio | Ventures Built for the Future",
  description:
    "Explore the Fusion Ventures ecosystem — a growing portfolio of digital-first ventures across consumer brands, technology, travel, events, career tools, and creator platforms."
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

const ventures = [
  {
    name: "Dearelle",
    category: "Lifestyle & Beauty",
    description: "A modern jewelry brand offering premium, stylish, and meaningful pieces that reflect individuality and elegance.",
    url: "https://dearelle.in",
    logo: "/ventures/logos/dearelle-logo-trimmed.png",
    accent: "#ef527f",
    initials: "D"
  },
  {
    name: "Occazn",
    category: "Occasions & Social Planning",
    description: "Occasion-focused experiences, planning, and social event presentation.",
    url: "https://www.occazn.com/",
    logo: "/ventures/logos/occazn-logo-clean.png",
    accent: "#ff7a2d",
    initials: "O"
  },
  {
    name: "Fynta",
    category: "Marketing Agency",
    description: "Marketing strategy and creative growth support for modern brands.",
    url: "https://www.fusionventuresglobal.com/fynta",
    logo: "/ventures/logos/fynta_logo_transparent_cropped.png",
    accent: "#a962ff",
    initials: "F"
  },
  {
    name: "Tarx",
    category: "Technology Solutions",
    description: "Digital transformation and engineering solutions for forward-thinking businesses.",
    url: "https://tarx.in",
    logo: "/ventures/logos/tarx-solutions-logo-trimmed.png",
    accent: "#3d8cff",
    initials: "TS"
  },
  {
    name: "Resumi",
    category: "Career Tools",
    description: "Smarter resumes, stronger profiles, better opportunities.",
    url: "https://resumi.live/",
    logo: "/ventures/logos/resumi_logo_transparent_cropped.png",
    accent: "#6bcf7b",
    initials: "R"
  }
];

const edgeItems = [
  {
    title: "Strategic Capital",
    text: "Patient capital with an entrepreneurial mindset. We back ideas with clarity and conviction.",
    icon: Compass
  },
  {
    title: "Operational Partnership",
    text: "We roll up our sleeves to help ventures scale with the right strategy, talent and systems.",
    icon: Rocket
  },
  {
    title: "Ecosystem Access",
    text: "A powerful network of mentors, partners and operators across industries and borders.",
    icon: Network
  },
  {
    title: "Long-term Mindset",
    text: "We build for impact and endurance, creating value for the long run, not just the short term.",
    icon: BarChart3
  }
];

function LogoMark() {
  return (
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
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d6a84f]">
      {children}
    </p>
  );
}

function VentureLogo({
  venture,
  compact = false
}: {
  venture: (typeof ventures)[number];
  compact?: boolean;
}) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full border bg-black/20 ${
        compact ? "h-16 w-16" : "h-20 w-20"
      }`}
      style={{
        borderColor: venture.accent,
        boxShadow: `0 0 28px ${venture.accent}33`
      }}
    >
      {venture.logo ? (
        <Image
          src={venture.logo}
          alt={`${venture.name} logo`}
          width={120}
          height={64}
          unoptimized
          className="max-h-10 w-12 object-contain"
        />
      ) : (
        <span className="text-xl font-bold tracking-[-0.06em]" style={{ color: venture.accent }}>
          {venture.initials}
        </span>
      )}
    </div>
  );
}

export default function VenturesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05080d] text-[#f5f5f0]">
      <header className="sticky top-0 z-50 border-b border-[#d6a84f]/12 bg-[#05080d]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-10">
          <LogoMark />
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#f5f5f0] ${
                  item.label === "Ventures" ? "border-b border-[#b99a5b] pb-2 text-[#d8c38b]" : "text-[#f5f5f0]/70"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/#contact"
            className="hidden border border-[#b99a5b] bg-[#b99a5b] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b] sm:inline-flex"
          >
            Partner With Us
          </a>
          <button className="grid h-11 w-11 place-items-center rounded-md border border-[#d6a84f]/45 text-[#d6a84f] lg:hidden" aria-label="Open navigation menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="mobile-nav-motion lg:hidden" />
      </header>

      <section className="relative px-5 pb-8 pt-14 sm:px-10 lg:pb-0 lg:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(214,168,79,0.18),transparent_30%),radial-gradient(circle_at_18%_28%,rgba(41,114,167,0.16),transparent_30%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(214,168,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(214,168,79,0.08)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[34%_66%] lg:items-center">
          <div>
            <Eyebrow>Our Portfolio</Eyebrow>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              One Ecosystem.
              <br />
              Endless Potential.
              <br />
              <span className="text-[#d6a84f]">Built for the Future.</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-base leading-8 text-[#f5f5f0]/66">
              Fusion Ventures is a house of purpose-built ventures, united by a shared vision to
              create impact, unlock value, and shape what&apos;s next.
            </p>
            <a
              href="#portfolio"
              className="mt-8 inline-flex items-center gap-4 rounded-md border border-[#d6a84f]/55 px-7 py-4 text-sm font-semibold text-[#f5f5f0] transition-colors hover:bg-[#d6a84f] hover:text-black"
            >
              Explore Our Ventures
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6a84f]/18" />
            <div className="absolute left-1/2 top-1/2 h-[330px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#d6a84f]/18 animate-[spin_42s_linear_infinite] lg:h-[420px] lg:w-[720px]" />
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#d6a84f]/12 animate-[spin_60s_linear_infinite_reverse] lg:h-[270px] lg:w-[860px]" />
            {[12, 24, 36, 64, 76, 88].map((left, index) => (
              <span
                key={left}
                className="absolute h-2 w-2 rounded-full bg-[#d6a84f] shadow-[0_0_18px_rgba(214,168,79,0.9)]"
                style={{
                  left: `${left}%`,
                  top: `${index % 2 ? 56 : 38}%`
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d6a84f]/55 bg-[#05080d] shadow-[0_0_60px_rgba(214,168,79,0.45)] lg:h-44 lg:w-44">
              <div className="text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-[#f5f5f0]/22 text-xl font-black text-[#f5f5f0]">
                  F
                </div>
                <p className="text-xl font-medium tracking-[0.22em]">
                  FUSION
                </p>
                <p className="text-[9px] tracking-[0.38em] text-[#f5f5f0]/62">VENTURES</p>
              </div>
            </div>

            <div className="absolute -bottom-8 left-1/2 hidden h-24 w-px -translate-x-1/2 bg-gradient-to-b from-[#d6a84f] to-transparent lg:block" />
            <div className="absolute bottom-0 left-[24%] hidden h-px w-[52%] bg-gradient-to-r from-transparent via-[#d6a84f]/70 to-transparent lg:block" />
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-14 pt-8 sm:px-10 lg:pt-0" id="portfolio">
        <div className="absolute left-1/2 top-0 hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-[#d6a84f]/80 to-transparent lg:block" />
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-5 flex items-center justify-center gap-3 text-[#d6a84f]">
            <BriefcaseBusiness className="h-4 w-4" />
            <Eyebrow>Our Ventures</Eyebrow>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-16 hidden h-px w-[980px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d6a84f]/44 to-transparent lg:block" />
          <div className="grid gap-4 min-[390px]:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
            {ventures.map((venture) => (
              <a
                key={venture.name}
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl border bg-white/[0.035] p-4 outline-none transition-all duration-300 hover:-translate-y-1 focus:-translate-y-1 lg:min-h-[150px] lg:p-5"
                style={{
                  borderColor: `${venture.accent}55`,
                  boxShadow: `0 0 34px ${venture.accent}12`
                }}
              >
                <span className="absolute -top-5 left-1/2 hidden h-5 w-px -translate-x-1/2 bg-[#d6a84f]/42 lg:block" />
                <span className="absolute -top-[22px] left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[#d6a84f] shadow-[0_0_14px_rgba(214,168,79,0.9)] lg:block" />
                <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] lg:hidden" style={{ color: venture.accent }}>
                  {venture.category}
                </p>
                <p className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6a84f] lg:block">
                  {venture.category}
                </p>
                <div className="flex items-center gap-4">
                  <VentureLogo venture={venture} compact />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold tracking-[-0.04em]">{venture.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#f5f5f0]/62">{venture.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: venture.accent }} />
                </div>
                <p className="mt-4 text-sm font-medium" style={{ color: venture.accent }}>
                  Visit Website
                </p>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="#portfolio"
              className="inline-flex w-full items-center justify-center gap-4 rounded-md border border-[#d6a84f]/60 px-8 py-3 text-[#d6a84f] transition-colors hover:bg-[#d6a84f] hover:text-black min-[390px]:w-auto"
            >
              <Grid3X3 className="h-4 w-4" />
              View All Ventures
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-10" id="edge">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[26%_74%]">
          <div>
            <Eyebrow>Our Edge</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              The advantage behind every venture we build.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#f5f5f0]/62">
              We combine capital, capability and community to build and scale ventures that last.
            </p>
            <a href="/" className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#d6a84f]">
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {edgeItems.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-[#d6a84f]/16 bg-white/[0.035] p-5">
                <Icon className="h-10 w-10 text-[#d6a84f]" strokeWidth={1.4} />
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#f5f5f0]/58">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-10" id="contact">
        <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-2xl border border-[#d6a84f]/18 bg-white/[0.035] lg:grid-cols-[42%_58%]">
          <div className="relative min-h-[260px] bg-[radial-gradient(circle_at_72%_42%,rgba(214,168,79,0.58),transparent_18%),radial-gradient(circle_at_50%_70%,rgba(214,168,79,0.2),transparent_36%)]">
            <div className="absolute -bottom-24 left-[-15%] h-80 w-80 rounded-full border border-[#d6a84f]/18" />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#05080d] to-transparent" />
          </div>
          <div className="p-7 sm:p-10">
            <Eyebrow>Building What&apos;s Next</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em]">
              Let&apos;s build the future, together.
            </h2>
            <p className="mt-4 max-w-[680px] text-base leading-7 text-[#f5f5f0]/62">
              Whether you&apos;re an entrepreneur, investor or partner, let&apos;s create what&apos;s
              next together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@fusionventuresglobal.com"
                className="inline-flex items-center justify-center gap-4 rounded-md bg-[#d6a84f] px-8 py-4 font-semibold text-black"
              >
                Let&apos;s Connect
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-4 rounded-md border border-[#d6a84f]/45 px-8 py-4 font-semibold text-[#f5f5f0]"
              >
                Explore Our Ventures
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d6a84f]/12 px-5 py-8 sm:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <LogoMark />
          <nav className="flex flex-wrap gap-6 text-sm text-[#f5f5f0]/58">
            {navItems.slice(0, 5).map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#d6a84f]">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3 text-[#f5f5f0]/72">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8">
              <UsersRound className="h-4 w-4" />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8">
              <Mail className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1500px] flex-col gap-3 border-t border-[#d6a84f]/10 pt-6 text-xs text-[#f5f5f0]/45 sm:flex-row sm:justify-between">
          <p>© 2026 Fusion Ventures. All rights reserved.</p>
          <p>Privacy Policy · Terms of Use</p>
        </div>
      </footer>
    </main>
  );
}
