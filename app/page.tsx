"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Compass,
  Dribbble,
  Globe2,
  Handshake,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Network,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "#contact" }
];

const whatWeDo = [
  {
    title: "Build",
    text: "We create and shape new ventures in markets with clear demand and long-term potential.",
    icon: Sparkles
  },
  {
    title: "Operate",
    text: "We support businesses with systems, processes, people, technology, and execution.",
    icon: BriefcaseBusiness
  },
  {
    title: "Scale",
    text: "We grow ventures through digital strategy, marketing, partnerships, and operational discipline.",
    icon: Rocket
  },
  {
    title: "Partner",
    text: "We collaborate with founders, businesses, and investors who share a long-term vision.",
    icon: Handshake
  }
];

const groupStatements = [
  {
    text: "Fusion Ventures brings multiple businesses under one group structure, while allowing each venture to grow with its own identity.",
    icon: Layers3
  },
  {
    text: "We work across the full journey, from idea validation and brand creation to digital product development, operations, partnerships, and growth.",
    icon: Compass
  }
];

const groupMetrics = [
  { value: "8+", label: "Ventures", icon: Rocket },
  { value: "10+", label: "Markets Explored", icon: Globe2 },
  { value: "4+", label: "Growth Verticals", icon: TrendingUp },
  { value: "1", label: "Unified Group", icon: Network }
];

const sectors = [
  ["Commerce & D2C Brands", "Modern online brands built around clear customer needs."],
  ["Marketplaces & Platforms", "Digital platforms connecting users, sellers, services, and experiences."],
  ["Technology & Digital Solutions", "Tools, systems, and software that help businesses operate better."],
  ["Travel & Experiences", "Curated travel, holiday, ticketing, and experience-led ventures."],
  ["Consumer Brands", "Lifestyle, fashion, gifting, kids, and everyday product brands."],
  ["Future Ventures", "New ideas, experimental models, and early-stage opportunities."]
];

type VentureCompany = {
  name: string;
  category: string;
  description: string;
  logo?: string;
  initials?: string;
  panelClass?: string;
};

const companies: VentureCompany[] = [
  {
    name: "Plumlet",
    category: "E-Commerce",
    description: "A creative marketplace connecting artists, makers, and creators with people who appreciate unique handmade products, art, and craftsmanship.",
    logo: "/ventures/logos/plumlet-logo-trimmed.png"
  },
  {
    name: "Dearelle",
    category: "E-Commerce",
    description: "A modern jewelry brand offering premium, stylish, and meaningful pieces that reflect individuality and elegance.",
    logo: "/ventures/logos/dearelle-logo-trimmed.png"
  },
  {
    name: "Tarx Solutions",
    category: "Technology",
    description: "Digital systems and business solutions for modern operations.",
    logo: "/ventures/logos/tarx-solutions-logo-trimmed.png"
  },
  {
    name: "Tarx Holidays",
    category: "Travel",
    description: "Curated travel experiences across UAE, Kerala, and beyond.",
    logo: "/ventures/logos/tarx-holidays-logo-trimmed.png"
  },
  {
    name: "Entry Pazz",
    category: "Events",
    description: "Event discovery, ticketing, and access made simple.",
    logo: "/ventures/logos/entry-pazz-logo-trimmed.png"
  },
  {
    name: "Resumi",
    category: "Careers",
    description: "Smart resume and profile tools for modern job seekers.",
    logo: "/ventures/logos/resumi_logo_transparent_cropped.png"
  },
  {
    name: "Fynta",
    category: "Marketing",
    description: "Creative marketing and growth support for modern brands.",
    logo: "/ventures/logos/fynta_logo_transparent_cropped.png"
  },
  {
    name: "Occazn",
    category: "Events",
    description: "Occasion-focused experiences, planning, and social event presentation.",
    logo: "/ventures/logos/occazn-logo-clean.png"
  }
];

const approach = [
  ["01", "Identify", "We look for markets, customer problems, and business models with long-term potential."],
  ["02", "Build", "We shape the brand, product, systems, and early execution plan."],
  ["03", "Launch", "We bring ventures to market with focused positioning and practical operations."],
  ["04", "Operate", "We support growth through systems, partnerships, marketing, and business development."],
  ["05", "Scale", "We reinvest learning, capital, and execution into ventures that show strong potential."]
];

const people = [
  {
    name: "Ayisha Muneer",
    photo: "/team/ayisha-muneer.webp",
    role: "Founder & CEO",
    bio: "As the Founder & CEO of Fusion Ventures, Ayisha leads the company's mission to build and scale innovative businesses under a unified vision. Adding her expertise in marketing strategy, people leadership, and business growth, she focuses on creating sustainable ventures, adding strong teams, and transforming ambitious ideas into impactful, future-ready businesses.",
    website: "https://ayishamuneer.com",
    linkedin: "https://www.linkedin.com/in/ayishamuneer"
  },
  {
    name: "Mohammad Fazil",
    photo: "/team/mohammad-fazil.webp",
    role: "Co-Founder, Technical & Business Development",
    bio: "As Co-Founder of Fusion Ventures, Fazil brings over 8+ years of experience in technology, product innovation, and business development. He plays a crucial role in shaping the company's technical vision, building scalable digital solutions, and transforming business concepts into sustainable ventures. His ability to bridge technology and business strategy enables Fusion Ventures to deliver innovative solutions and long-term value across diverse industries.",
    website: "https://fazildigital.com",
    linkedin: "https://www.linkedin.com/in/fazilfazi"
  },
  {
    name: "Thameem AR",
    photo: "/team/thameem-ar.webp",
    role: "Co-Founder, Branding & Growth Strategy",
    bio: "As Co-Founder of Fusion Ventures, Thameem brings over 10+ years of experience in branding, growth strategy, and venture development. He leads strategic initiatives that drive business expansion, strengthen market positioning, and unlock new growth opportunities. With a strong focus on long-term value creation, Thameem plays a key role in shaping the vision and sustainable growth of the ventures within the Fusion Ventures ecosystem.",
    website: "https://thameemar.online",
    linkedin: "https://www.linkedin.com/in/thameemar"
  }
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b99a5b]">
      {children}
    </p>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="scroll-reveal max-w-[760px]">
      <Label>{eyebrow}</Label>
      <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-6 text-base leading-8 text-white/62">{text}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flippedVenture, setFlippedVenture] = useState<string | null>(null);
  const [activePersonIndex, setActivePersonIndex] = useState(0);
  const activePerson = people[activePersonIndex];

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060705] text-white">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-transparent">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-14">
          <a href="#home" aria-label="Fusion Ventures home">
            <Image
              src="/fusion-ventures-logo.webp"
              alt="Fusion Ventures"
              width={640}
              height={176}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden border border-[#d6a84f]/75 bg-transparent px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#e0ba68] transition-colors hover:bg-[#d6a84f] hover:text-black sm:inline-flex"
            >
              Partner With Us
            </a>
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors hover:border-[#b99a5b] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#060705] px-5 py-5 lg:hidden">
            <div className="grid gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-[0.1em] text-white/78"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 border border-[#d6a84f]/75 bg-transparent px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-[#e0ba68] transition-colors hover:bg-[#d6a84f] hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                Partner With Us
              </a>
            </div>
          </div>
        )}
        <div className="mobile-nav-motion lg:hidden" />
      </header>

      <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-10 sm:pt-36 lg:px-14 lg:pb-28 lg:pt-40" id="home">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src="/videos/business-meeting-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/24" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.38)_100%)]" />

        <div className="relative mx-auto max-w-[1280px]">
          <div className="scroll-reveal mx-auto max-w-[980px] text-center">
            <Label>UAE-Based Venture Group</Label>
            <h1 className="mx-auto max-w-[850px] text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              We Build, Own & Scale Modern Businesses.
            </h1>
            <p className="mx-auto mt-8 max-w-[680px] text-base leading-8 text-white/72">
              We bring together ideas, execution, branding, technology, partnerships, and long-term
              operating focus to create ventures designed to grow.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/ventures"
                className="border border-[#d6a84f]/80 bg-transparent px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-[#e0ba68] transition-colors hover:bg-[#d6a84f] hover:text-black"
              >
                Explore Ventures
              </a>
              <a
                href="#contact"
                className="border border-[#d6a84f]/45 bg-black/10 px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#d6a84f] hover:bg-[#d6a84f] hover:text-black"
              >
                Partner With Us
              </a>
            </div>
          </div>

        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-5 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-10" id="group">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_18%_18%,rgba(214,168,79,0.07),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.035),transparent_30%),repeating-linear-gradient(118deg,rgba(255,255,255,0.012)_0,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_16px)]" />
        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[42%_58%] lg:items-center lg:gap-10">
            <div className="scroll-reveal">
              <div className="flex items-center gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6a84f]">The Group</p>
                <span className="h-px w-24 bg-gradient-to-r from-[#d6a84f] to-transparent" />
              </div>
              <h2 className="mt-5 max-w-[520px] font-serif text-4xl font-normal leading-[0.98] text-white sm:text-5xl lg:text-[52px]">
                A Venture Group Built Around Execution<span className="text-[#d6a84f]">.</span>
              </h2>
              <span className="mt-6 block h-px w-56 max-w-full bg-gradient-to-r from-[#d6a84f] via-[#d6a84f]/55 to-transparent shadow-[0_0_12px_rgba(214,168,79,0.32)]" />
            </div>

            <div className="grid gap-3">
              {groupStatements.map(({ text, icon: Icon }) => (
                <article
                  key={text}
                  className="group scroll-reveal relative grid min-h-[124px] grid-cols-[52px_1px_minmax(0,1fr)] items-center gap-4 overflow-hidden rounded-lg border border-[#d6a84f]/30 bg-white/[0.035] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition-colors hover:border-[#d6a84f]/55 sm:grid-cols-[64px_1px_minmax(0,1fr)] sm:gap-5 sm:p-5"
                >
                  <span className="pointer-events-none absolute right-0 top-0 h-16 w-16 bg-[radial-gradient(circle_at_top_right,rgba(214,168,79,0.22),transparent_68%)]" />
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d6a84f]/65 text-[#d6a84f] shadow-[0_0_24px_rgba(214,168,79,0.08)] sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6" strokeWidth={1.35} />
                  </span>
                  <span className="h-20 w-px bg-[#d6a84f]/35" />
                  <p className="text-[14px] leading-6 text-white/72 sm:text-base sm:leading-7">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-lg border border-[#d6a84f]/32 bg-[radial-gradient(circle_at_50%_130%,rgba(214,168,79,0.18),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
            <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-56 -translate-x-1/2 bg-[#d6a84f] shadow-[0_0_18px_4px_rgba(214,168,79,0.45)]" />
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {groupMetrics.map(({ value, label, icon: Icon }, index) => (
                <article
                  key={label}
                  className={`scroll-reveal min-w-0 px-4 py-5 transition-colors hover:bg-[#d6a84f]/[0.035] sm:px-5 sm:py-5 ${
                    index >= 2 ? "border-t border-[#d6a84f]/18 sm:border-t-0" : ""
                  } ${index % 2 === 1 ? "border-l border-[#d6a84f]/18" : ""} ${
                    index > 0 ? "sm:border-l sm:border-[#d6a84f]/18" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-7 w-7 shrink-0 text-[#d6a84f] sm:h-8 sm:w-8" strokeWidth={1.35} />
                    <p className="font-serif text-3xl leading-none text-[#d6a84f] sm:text-4xl">{value}</p>
                  </div>
                  <p className="mt-3 text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] text-white/66 sm:text-[10px]">
                    {label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-5 py-20 text-black sm:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="scroll-reveal mb-12 max-w-[680px]">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b6335]">
              What We Do
            </p>
            <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Build, operate, scale, and partner.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-black/12 lg:grid-cols-4">
            {whatWeDo.map(({ title, text, icon: Icon }) => (
              <article key={title} className="bg-[#f3f0e8] p-5 sm:p-8">
                <Icon className="mb-8 h-7 w-7 text-[#173d2d] sm:h-9 sm:w-9" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:px-14 lg:py-28" id="sectors">
        <div className="mx-auto max-w-[1280px]">
          <SectionIntro
            eyebrow="Sectors"
            title="Building Across Digital-First Markets."
            text="Fusion Ventures focuses on sectors where technology, brand, distribution, and customer experience can create long-term value."
          />
          <div className="mt-12 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-3">
            {sectors.map(([title, text]) => (
              <article key={title} className="bg-[#0b0d09] p-5 sm:p-8">
                <Layers3 className="mb-7 h-7 w-7 text-[#b99a5b]" strokeWidth={1.4} />
                <h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/56">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-5 py-16 sm:px-10 lg:px-14 lg:py-24" id="ventures">
        <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(214,168,79,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(214,168,79,0.055)_1px,transparent_1px),radial-gradient(circle_at_72%_48%,rgba(214,168,79,0.09),transparent_30%)] [background-size:120px_120px,120px_120px,auto]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[29%_71%] lg:items-start lg:gap-10">
          <div className="scroll-reveal lg:sticky lg:top-24">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d6a84f]">
              Our Portfolio
            </p>
            <h2 className="max-w-[410px] font-display text-4xl font-normal leading-[1.04] text-white sm:text-5xl lg:text-[58px]">
              Ventures we&apos;re proud to build with.
            </h2>
            <span className="mt-7 block h-px w-12 bg-[#d6a84f]" />
            <p className="mt-8 max-w-[340px] text-sm leading-7 text-white/62 sm:text-base">
              We partner with visionary founders to build category-defining brands across diverse industries.
            </p>
            <a
              href="/ventures"
              className="group mt-8 inline-flex items-center gap-5 text-sm font-medium text-[#d6a84f] transition-colors hover:text-white sm:text-base"
            >
              Explore all ventures
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
            </a>

            <div className="mt-12 flex items-stretch gap-8">
              <div>
                <p className="font-serif text-4xl text-[#d6a84f]">08</p>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">Ventures</p>
              </div>
              <span className="w-px bg-[#d6a84f]/35" />
              <div>
                <p className="font-serif text-4xl text-[#d6a84f]">06</p>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">Categories</p>
              </div>
            </div>

            <div className="mt-10 hidden items-center gap-3 lg:flex">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/45">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d6a84f]/55 text-[#d6a84f]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="scroll-reveal grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {companies.map((company, index) => {
              const isFlipped = flippedVenture === company.name;

              return (
                <article
                  key={company.name}
                  className={`venture-card group h-[280px] min-w-0 cursor-pointer outline-none min-[390px]:h-[330px] md:h-[320px] lg:h-[360px] ${
                    isFlipped ? "is-flipped" : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${isFlipped ? "Hide" : "View"} details for ${company.name}`}
                  aria-pressed={isFlipped}
                  onClick={() => setFlippedVenture(isFlipped ? null : company.name)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setFlippedVenture(isFlipped ? null : company.name);
                    }
                  }}
                >
                  <div className="venture-card-inner">
                    <div className="venture-card-face venture-card-front rounded-lg border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-5">
                      <p className="text-[10px] font-medium tracking-[0.1em] text-[#d6a84f]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="absolute inset-x-4 top-1/2 flex h-[126px] -translate-y-1/2 items-center justify-center rounded-lg bg-[#f8f6ef] p-5 shadow-[inset_0_0_25px_rgba(0,0,0,0.035)] sm:inset-x-5 lg:h-[150px]">
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            width={320}
                            height={150}
                            unoptimized
                            className="max-h-20 w-full object-contain lg:max-h-24"
                          />
                        ) : (
                          <span
                            className={`flex h-full w-full items-center justify-center rounded-md font-display text-3xl font-bold tracking-[-0.04em] lg:text-4xl ${
                              company.panelClass ?? "bg-white text-black"
                            }`}
                          >
                            {company.initials}
                          </span>
                        )}
                      </div>
                      <p className="absolute inset-x-4 bottom-5 text-center text-[9px] font-semibold uppercase tracking-[0.24em] text-white/48 sm:inset-x-5">
                        {company.category}
                      </p>
                    </div>

                    <div className="venture-card-face venture-card-back flex flex-col rounded-lg border border-[#d6a84f]/75 bg-[radial-gradient(circle_at_90%_10%,rgba(214,168,79,0.16),transparent_35%),linear-gradient(145deg,#181814,#090a08)] p-5 shadow-[0_18px_70px_rgba(214,168,79,0.12)] sm:p-6">
                      <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.16em] text-[#d6a84f]">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="max-w-[65%] truncate text-right">{company.category}</span>
                      </div>
                      <div className="flex min-h-0 flex-1 flex-col justify-center pt-4">
                        <h3 className="font-display text-xl font-medium leading-tight text-white sm:text-2xl lg:text-3xl">
                          {company.name}
                        </h3>
                        <p className="mt-3 text-xs leading-5 text-white/62 sm:mt-4 sm:text-sm sm:leading-6">
                          {company.description}
                        </p>
                        <span className="mt-5 h-px w-16 bg-[#d6a84f]/70 sm:mt-7 sm:w-20" />
                        <a
                          href="/ventures"
                          className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-medium text-[#d6a84f] transition-colors hover:text-white sm:mt-6 sm:gap-3 sm:text-sm"
                          onClick={(event) => event.stopPropagation()}
                        >
                          View venture
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-5 py-20 text-black sm:px-10 lg:px-14 lg:py-28" id="approach">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[30%_70%]">
          <div className="scroll-reveal">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b6335]">
              Approach
            </p>
            <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Our Operating Approach.
            </h2>
          </div>
          <div className="scroll-reveal grid grid-cols-2 gap-px bg-black/12 lg:grid-cols-5">
            {approach.map(([number, title, text]) => (
              <article key={number} className="bg-[#f3f0e8] p-5 sm:p-6">
                <p className="text-4xl font-light tracking-[-0.05em] text-black/24">{number}</p>
                <div className="my-5 h-px w-10 bg-black/35" />
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="mt-4 text-xs leading-5 text-black/60 sm:text-sm sm:leading-6">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-10 lg:px-14 lg:py-28" id="people">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_85%_35%,rgba(214,168,79,0.08),transparent_30%),radial-gradient(circle_at_12%_70%,rgba(255,255,255,0.035),transparent_26%),linear-gradient(125deg,rgba(255,255,255,0.018),transparent_36%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="scroll-reveal grid gap-8 lg:grid-cols-[36%_1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6a84f]">People</p>
                <span className="h-px w-20 bg-gradient-to-r from-[#d6a84f] to-transparent" />
              </div>
              <h2 className="mt-5 max-w-[560px] font-display text-4xl font-normal leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[56px]">
                The People Building Fusion Ventures<span className="text-[#d6a84f]">.</span>
              </h2>
            </div>
            <p className="max-w-[690px] text-sm leading-7 text-white/68 sm:text-base sm:leading-8 lg:pb-2">
              Fusion Ventures is led by a small group of builders, operators, and growth-focused partners working
              across business development, digital execution, brand building, and venture operations.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[38%_62%] lg:gap-12">
            <div className="scroll-reveal flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-0 lg:overflow-visible lg:pb-0">
              {people.map((person, index) => {
                const isActive = index === activePersonIndex;

                return (
                  <button
                    key={person.name}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActivePersonIndex(index)}
                    onFocus={() => setActivePersonIndex(index)}
                    onClick={() => setActivePersonIndex(index)}
                    className={`group relative grid min-w-[270px] grid-cols-[34px_56px_minmax(0,1fr)_24px] items-center gap-4 border-b border-white/10 px-0 py-5 text-left outline-none transition-colors lg:min-w-0 lg:grid-cols-[38px_72px_minmax(0,1fr)_32px] lg:py-7 ${
                      isActive ? "text-white" : "text-white/72 hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-6 hidden h-[calc(100%-48px)] w-px origin-top transition-all duration-300 lg:block ${
                        isActive ? "scale-y-100 bg-[#d6a84f]" : "scale-y-0 bg-white/20 group-hover:scale-y-75"
                      }`}
                    />
                    <span className={`self-start pt-1 text-xs font-semibold tracking-[0.12em] ${isActive ? "text-[#d6a84f]" : "text-white/46"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`relative h-14 w-14 overflow-hidden rounded-full border transition-all duration-300 lg:h-[72px] lg:w-[72px] ${
                        isActive
                          ? "border-[#d6a84f]/75 shadow-[0_0_28px_rgba(214,168,79,0.2)]"
                          : "border-white/14 grayscale group-hover:border-[#d6a84f]/45 group-hover:grayscale-0"
                      }`}
                    >
                      <Image
                        src={person.photo}
                        alt={`${person.name} portrait`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 72px, 56px"
                        className="object-cover object-center"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-xl font-normal leading-tight tracking-[-0.03em] text-white sm:text-2xl">
                        {person.name}
                      </span>
                      <span
                        className={`mt-2 block text-[9px] font-bold uppercase leading-4 tracking-[0.18em] transition-colors sm:text-[10px] ${
                          isActive ? "text-[#d6a84f]" : "text-white/46 group-hover:text-[#d6a84f]/80"
                        }`}
                      >
                        {person.role}
                      </span>
                      <span
                        className={`mt-4 block h-px transition-all duration-300 ${
                          isActive ? "w-full bg-[#d6a84f]/75" : "w-2/3 bg-white/12 group-hover:w-full group-hover:bg-white/20"
                        }`}
                      />
                    </span>
                    <ArrowRight
                      className={`h-5 w-5 justify-self-end transition-all duration-300 ${
                        isActive ? "translate-x-1 text-[#d6a84f]" : "text-white/35 group-hover:translate-x-1 group-hover:text-[#d6a84f]/80"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
            </div>

            <article
              key={activePerson.name}
              className="people-preview scroll-reveal relative overflow-hidden rounded-lg border border-[#d6a84f]/22 bg-[radial-gradient(circle_at_82%_28%,rgba(214,168,79,0.11),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.36)] sm:p-8 lg:min-h-[390px] lg:p-9"
            >
              <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,transparent,rgba(214,168,79,0.09),transparent),radial-gradient(circle_at_90%_50%,rgba(255,255,255,0.055),transparent_22%)]" />
              <div className="relative grid gap-9 lg:grid-cols-[48%_52%] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-[#d6a84f]/35 bg-black/20 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6a84f]">
                    {activePerson.role}
                  </span>
                  <h3 className="mt-8 font-serif text-4xl font-normal leading-tight text-white sm:text-5xl">
                    {activePerson.name}
                  </h3>
                  <span className="mt-6 block h-px w-44 bg-gradient-to-r from-[#d6a84f] via-[#d6a84f]/50 to-transparent shadow-[0_0_16px_rgba(214,168,79,0.36)]" />
                  <p className="mt-6 max-w-[430px] text-base leading-8 text-white/70">
                    {activePerson.bio}
                  </p>
                  <div className="mt-7 flex items-center gap-3">
                    <a
                      href={activePerson.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${activePerson.name} personal website`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/55 transition-colors hover:border-[#d6a84f]/70 hover:text-[#d6a84f]"
                    >
                      <Globe2 className="h-4 w-4" strokeWidth={1.55} />
                    </a>
                    <a
                      href={activePerson.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${activePerson.name} LinkedIn profile`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/55 transition-colors hover:border-[#d6a84f]/70 hover:text-[#d6a84f]"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={1.55} />
                    </a>
                  </div>
                </div>

                <div className="relative mx-auto grid h-[240px] w-[240px] place-items-center sm:h-[300px] sm:w-[300px]">
                  <span className="absolute inset-0 rounded-full border border-[#d6a84f]/18" />
                  <span className="absolute inset-5 rounded-full border border-[#d6a84f]/24" />
                  <span className="absolute inset-10 rounded-full border border-white/10" />
                  <span className="absolute left-8 top-10 h-2 w-2 rounded-full bg-[#d6a84f] shadow-[0_0_18px_rgba(214,168,79,0.85)]" />
                  <span className="absolute bottom-12 right-10 h-1.5 w-1.5 rounded-full bg-[#d6a84f]/80 shadow-[0_0_14px_rgba(214,168,79,0.65)]" />
                  <div className="relative h-[164px] w-[164px] overflow-hidden rounded-full border border-[#d6a84f]/65 shadow-[0_0_42px_rgba(214,168,79,0.18)] sm:h-[200px] sm:w-[200px]">
                    <Image
                      src={activePerson.photo}
                      alt={`${activePerson.name} portrait`}
                      fill
                      unoptimized
                      priority={activePersonIndex === 0}
                      sizes="(min-width: 640px) 200px, 164px"
                      className="people-preview-image object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                <button
                  type="button"
                  aria-label="Show previous profile"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/18 text-white/45 transition-colors hover:border-[#d6a84f]/70 hover:text-[#d6a84f]"
                  onClick={() => setActivePersonIndex((index) => (index === 0 ? people.length - 1 : index - 1))}
                >
                  <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Show next profile"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#d6a84f]/55 text-[#d6a84f] transition-colors hover:bg-[#d6a84f] hover:text-black"
                  onClick={() => setActivePersonIndex((index) => (index + 1) % people.length)}
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0a0b08] px-5 py-20 sm:px-10 lg:px-14" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,154,91,0.16),transparent_38%)]" />
        <div className="scroll-reveal relative mx-auto max-w-[860px] text-center">
          <Label>Partner With Us</Label>
          <h2 className="font-display text-5xl font-normal leading-tight sm:text-6xl">
            Let&apos;s Build What&apos;s Next.
          </h2>
          <p className="mx-auto mt-7 max-w-[720px] text-base leading-8 text-white/62">
            Whether you are a founder, partner, investor, operator, or business looking to
            collaborate, Fusion Ventures is open to meaningful conversations aligned with long-term
            growth.
          </p>
          <a
            href="mailto:hello@fusionventuresglobal.com"
            className="mt-10 inline-flex border border-[#d6a84f]/80 bg-transparent px-10 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-[#e0ba68] transition-colors hover:bg-[#d6a84f] hover:text-black"
          >
            Start A Conversation
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.35fr]">
          <div>
            <a href="#home" aria-label="Fusion Ventures home">
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
              {[Linkedin, Instagram, Dribbble, MousePointer2].map((Icon, index) => (
                <span
                  key={index}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/14 text-white/68 transition-colors hover:border-[#d6a84f]/60 hover:text-[#d6a84f]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.55} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            {[
              ["Home", "#home"],
              ["About", "/about"],
              ["Ventures", "/ventures"],
              ["Insights", "#"],
              ["Contact", "#contact"]
            ].map(([item, href]) => (
              <a key={item} href={href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-[#d6a84f]">
                {item}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Portfolio</h3>
            {[
              ["Web Portfolio", "/web-portfolio"],
              ["Our Edge", "#group"],
              ["Sectors", "#sectors"],
              ["People", "#people"]
            ].map(([item, href]) => (
              <a key={item} href={href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-[#d6a84f]">
                {item}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="mb-3 block text-sm text-white/52 transition-colors hover:text-[#d6a84f]">
                {item}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h3>
            <a
              href="mailto:hello@fusionventuresglobal.com"
              className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-[#d6a84f]"
            >
              <Mail className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              hello@fusionventuresglobal.com
            </a>
            <a
              href="tel:+13024703135"
              className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-[#d6a84f]"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              +1 (302) 470-3135
            </a>
            <p className="flex items-center gap-3 text-sm text-white/56">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              UAE-Based Venture Group
            </p>
          </div>
        </div>

        <div className="mx-auto mt-9 flex max-w-[1280px] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Fusion Ventures. All rights reserved.</p>
          <a href="#home" className="transition-colors hover:text-[#d6a84f]">
            Back To Top
          </a>
        </div>

        <div className="hidden">
          <p className="sm:text-left">© 2026 Fusion Ventures. All rights reserved.</p>
          <a href="#home" className="transition-colors hover:text-white">
            Back To Top
          </a>
          <p className="sm:text-right">UAE-Based Venture Group</p>
        </div>
      </footer>
    </main>
  );
}
