"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Compass,
  Handshake,
  Layers3,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Group", href: "#group" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Sectors", href: "#sectors" },
  { label: "People", href: "#people" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" }
];

const trustBlocks = [
  ["Multiple", "Ventures"],
  ["UAE", "Based"],
  ["Founder", "Led"],
  ["Long-Term", "Focus"]
];

const heroCards = ["Plumlet", "Dearelle", "Tarx Solutions", "Tarx Holidays", "Entry Pazz"];

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
  mobileCategory: string;
  description: string;
  logo?: string;
  initials?: string;
  panelClass?: string;
};

const companies: VentureCompany[] = [
  {
    name: "Plumlet",
    category: "E-COMMERCE / KIDS & LIFESTYLE",
    mobileCategory: "E-COMMERCE",
    description: "Playful little finds for kids and families.",
    logo: "/ventures/logos/plumlet-logo-trimmed.png"
  },
  {
    name: "Dearelle",
    category: "E-COMMERCE / LIFESTYLE LUXURY",
    mobileCategory: "E-COMMERCE",
    description: "Everyday luxury with a refined lifestyle touch.",
    logo: "/ventures/logos/dearelle-logo-trimmed.png"
  },
  {
    name: "Tarx Solutions",
    category: "TECHNOLOGY / DIGITAL SOLUTIONS",
    mobileCategory: "TECHNOLOGY",
    description: "Digital systems and business solutions for modern operations.",
    logo: "/ventures/logos/tarx-solutions-logo-trimmed.png"
  },
  {
    name: "Tarx Holidays",
    category: "TRAVEL / HOLIDAYS",
    mobileCategory: "TRAVEL",
    description: "Curated travel experiences across UAE, Kerala, and beyond.",
    logo: "/ventures/logos/tarx-holidays-logo-trimmed.png"
  },
  {
    name: "Entry Pazz",
    category: "MARKETPLACE / EVENTS & TICKETS",
    mobileCategory: "MARKETPLACE",
    description: "Event discovery, ticketing, and access made simple.",
    logo: "/ventures/logos/entry-pazz-logo-trimmed.png"
  },
  {
    name: "Resumi",
    category: "CAREERS / HR TECH",
    mobileCategory: "CAREERS",
    description: "Smart resume and profile tools for modern job seekers.",
    initials: "resumi",
    panelClass: "bg-[#eefdf9] text-[#073d3b]"
  },
  {
    name: "Portify",
    category: "CREATOR TOOLS / PORTFOLIOS",
    mobileCategory: "CREATOR TOOLS",
    description: "Beautiful portfolio building for individuals and brands.",
    initials: "portify",
    panelClass: "bg-[#f3f0ff] text-[#111a4a]"
  },
  {
    name: "Inviteio",
    category: "EVENTS / INVITATIONS",
    mobileCategory: "EVENTS",
    description: "Elegant digital invitations and event presentation tools.",
    initials: "inviteio",
    panelClass: "bg-[#fff1eb] text-[#ec6d5d]"
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
    bio: "Leads the group's vision, direction, and long-term development across its growing portfolio of ventures."
  },
  {
    name: "Mohammad Fazil",
    photo: "/team/mohammad-fazil.webp",
    role: "Co-Founder & Growth / Business Development",
    bio: "Focused on partnerships, growth strategy, commercial direction, and new venture execution across the Fusion Ventures ecosystem."
  },
  {
    name: "Thameem AR",
    photo: "/team/thameem-ar.webp",
    role: "Co-Founder & Growth Strategy",
    bio: "Supports group-level growth, strategic partnerships, business expansion, and venture development across multiple sectors."
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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    let lastScrollY = window.scrollY;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      document.documentElement.dataset.scrollDir = currentScrollY < lastScrollY ? "up" : "down";
      lastScrollY = currentScrollY;
    };

    updateDirection();
    window.addEventListener("scroll", updateDirection, { passive: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", updateDirection);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateDirection);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060705] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060705]/86 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-14">
          <a href="#home" className="leading-none" aria-label="Fusion Ventures home">
            <span className="block text-3xl font-medium tracking-[0.24em] text-white">FUSION</span>
            <span className="ml-1 block text-[11px] font-semibold tracking-[0.42em] text-white/72">
              VENTURES
            </span>
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
              className="hidden border border-[#b99a5b] bg-[#b99a5b] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b] sm:inline-flex"
            >
              Partner With Us
            </a>
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="grid h-11 w-11 place-items-center border border-white/10 text-white transition-colors hover:border-[#b99a5b]"
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
                className="mt-2 border border-[#b99a5b] bg-[#b99a5b] px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-black"
                onClick={() => setMenuOpen(false)}
              >
                Partner With Us
              </a>
            </div>
          </div>
        )}
        <div className="mobile-nav-motion lg:hidden" />
      </header>

      <section className="relative px-5 py-20 sm:px-10 lg:px-14 lg:py-28" id="home">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
        <div className="absolute right-[-20%] top-24 h-[420px] w-[420px] rounded-full bg-[#143d2c]/35 blur-3xl" />
        <div className="absolute bottom-10 left-[-16%] h-[360px] w-[360px] rounded-full bg-[#b99a5b]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[52%_48%] lg:items-center">
          <div className="scroll-reveal">
            <Label>UAE-Based Venture Group</Label>
            <h1 className="max-w-[850px] text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              We Build, Own & Scale Modern Businesses.
            </h1>
            <p className="mt-8 max-w-[720px] text-lg leading-8 text-white/68">
              Fusion Ventures is a UAE-based venture group building digital-first companies across
              commerce, technology, marketplaces, travel, and consumer brands.
            </p>
            <p className="mt-5 max-w-[680px] text-base leading-8 text-white/52">
              We bring together ideas, execution, branding, technology, partnerships, and long-term
              operating focus to create ventures designed to grow.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/ventures"
                className="border border-[#b99a5b] bg-[#b99a5b] px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b]"
              >
                Explore Ventures
              </a>
              <a
                href="#contact"
                className="border border-white/24 px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                Partner With Us
              </a>
            </div>
          </div>

          <div className="scroll-reveal relative min-h-[520px] rounded-none border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40">
            <div className="absolute inset-4 border border-[#b99a5b]/18" />
            <div className="relative grid h-full gap-4">
              {heroCards.map((card, index) => (
                <div
                  key={card}
                  className={`flex items-center justify-between border border-white/10 bg-[#0d0f0b]/90 p-5 backdrop-blur-md ${
                    index % 2 === 0 ? "mr-8" : "ml-8"
                  }`}
                >
                  <h2 className="text-2xl font-medium tracking-[-0.04em]">{card}</h2>
                  <span className="h-2 w-2 rounded-full bg-[#2d6b4e]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a0b08] px-5 py-8 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {trustBlocks.map(([top, bottom]) => (
            <article key={top} className="bg-[#0a0b08] p-6 sm:p-8">
              <p className="text-3xl font-light tracking-[-0.05em] text-white sm:text-4xl">{top}</p>
              <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#b99a5b]">
                {bottom}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:px-14 lg:py-28" id="group">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[38%_62%]">
          <SectionIntro eyebrow="The Group" title="A Venture Group Built Around Execution." />
          <div className="scroll-reveal grid gap-px bg-white/10 sm:grid-cols-2">
            {[
              "Fusion Ventures brings multiple businesses under one group structure, while allowing each venture to grow with its own identity.",
              "We work across the full journey, from idea validation and brand creation to digital product development, operations, partnerships, and growth."
            ].map((text) => (
              <article key={text} className="bg-[#0b0d09] p-8 text-base leading-8 text-white/62">
                {text}
              </article>
            ))}
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

      <section className="bg-[#030403] px-4 py-16 sm:px-10 lg:px-14 lg:py-28" id="ventures">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[30%_70%] lg:items-start">
          <div className="scroll-reveal lg:sticky lg:top-28">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#b99a5b]">
              Portfolio Ventures
            </p>
            <h2 className="max-w-[760px] text-4xl font-medium leading-tight tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              A Portfolio of High-Potential Ventures.
            </h2>
            <p className="mt-6 max-w-[520px] text-base leading-8 text-white/58 sm:text-lg">
              We build and back brands across commerce, technology, travel, and digital products.
            </p>
            <a
              href="/web-portfolio"
              className="group mt-8 inline-flex items-center gap-5 border-b border-[#b99a5b] pb-3 text-base font-semibold text-[#d8b563] transition-colors hover:text-white sm:text-lg"
            >
              Explore Websites We&apos;ve Built
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
            </a>
          </div>

          <div className="scroll-reveal grid grid-cols-3 gap-2 min-[520px]:grid-cols-4 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {companies.map((company) => (
              <a
                key={company.name}
                href="/ventures"
                className="group min-w-0 rounded-lg border border-white/12 bg-[#080908] p-2 shadow-[0_18px_80px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b99a5b]/45 sm:p-3 lg:rounded-xl lg:p-6"
              >
                <div className="flex h-16 items-center justify-center rounded-md bg-[#f8f6ef] p-2 sm:h-20 lg:h-36 lg:p-5">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={320}
                      height={150}
                      unoptimized
                      className="max-h-10 w-full object-contain sm:max-h-14 lg:max-h-24"
                    />
                  ) : (
                    <span
                      className={`flex h-full w-full items-center justify-center rounded-md text-lg font-bold tracking-[-0.06em] sm:text-2xl lg:text-4xl ${
                        company.panelClass ?? "bg-white text-black"
                      }`}
                    >
                      {company.initials}
                    </span>
                  )}
                </div>
                <p className="mt-3 truncate text-[8px] font-bold uppercase tracking-[0.12em] text-white/48 sm:text-[10px] lg:mt-6 lg:text-[11px] lg:text-white/58">
                  <span className="lg:hidden">{company.mobileCategory}</span>
                  <span className="hidden lg:inline">{company.category}</span>
                </p>
                <h3 className="mt-2 truncate text-[13px] font-medium tracking-[-0.04em] text-white sm:text-base lg:text-2xl">
                  {company.name}
                </h3>
                <p className="mt-3 hidden text-sm leading-6 text-white/56 lg:block">
                  {company.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-3 text-[#d8b563] lg:mt-7">
                  <span className="hidden text-sm font-semibold lg:inline">View Venture</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </span>
              </a>
            ))}
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

      <section className="px-5 py-20 sm:px-10 lg:px-14 lg:py-28" id="people">
        <div className="mx-auto max-w-[1280px]">
          <SectionIntro
            eyebrow="People"
            title="The People Building Fusion Ventures."
            text="Fusion Ventures is led by a small group of builders, operators, and growth-focused partners working across business development, digital execution, brand building, and venture operations."
          />
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {people.map((person) => (
              <article key={person.name} className="bg-[#0b0d09] p-7 sm:p-8">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#b99a5b]/55 shadow-[0_0_28px_rgba(185,154,91,0.12)] sm:h-24 sm:w-24">
                  <Image
                    src={person.photo}
                    alt={`${person.name} portrait`}
                    fill
                    sizes="(min-width: 640px) 96px, 80px"
                    className="object-cover object-center"
                  />
                </div>
                <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b99a5b]">
                  {person.role}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.04em]">{person.name}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0a0b08] px-5 py-20 sm:px-10 lg:px-14" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,154,91,0.16),transparent_38%)]" />
        <div className="scroll-reveal relative mx-auto max-w-[860px] text-center">
          <Label>Partner With Us</Label>
          <h2 className="text-5xl font-medium leading-tight tracking-[-0.05em] sm:text-6xl">
            Let&apos;s Build What&apos;s Next.
          </h2>
          <p className="mx-auto mt-7 max-w-[720px] text-base leading-8 text-white/62">
            Whether you are a founder, partner, investor, operator, or business looking to
            collaborate, Fusion Ventures is open to meaningful conversations aligned with long-term
            growth.
          </p>
          <a
            href="mailto:hello@fusionventuresglobal.com"
            className="mt-10 inline-flex border border-[#b99a5b] bg-[#b99a5b] px-10 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b]"
          >
            Start A Conversation
          </a>
        </div>
      </section>

      <footer className="bg-[#060705] px-5 py-6 text-[11px] uppercase tracking-[0.08em] text-white/42 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-4 text-center sm:grid-cols-3">
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
