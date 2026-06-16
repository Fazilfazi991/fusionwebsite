"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Cpu,
  Expand,
  Factory,
  Menu,
  Monitor,
  Package,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  X
} from "lucide-react";

const navItems = [
  { label: "Group", href: "/groups" },
  { label: "Ventures", href: "#ventures" },
  { label: "Sectors", href: "#sectors" },
  { label: "People", href: "/groups#people" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" }
];

const overviewItems = [
  {
    title: "Build",
    text: "We create and validate businesses in attractive markets.",
    icon: Target
  },
  {
    title: "Own",
    text: "We take a long-term ownership mindset aligned with founders.",
    icon: ChartNoAxesCombined
  },
  {
    title: "Operate",
    text: "We build strong operators and efficient, scalable systems.",
    icon: Factory
  },
  {
    title: "Scale",
    text: "We reinvest and scale companies with durable competitive advantages.",
    icon: Expand
  }
];

const metrics = [
  ["25+", "Companies", "Across Our Portfolio"],
  ["$1B+", "Aggregate Revenue", "Across Portfolio"],
  ["10+", "Countries", "Global Footprint"],
  ["1,000+", "Team Members", "Across Companies"],
  ["15+", "Years of Combined", "Operating Experience"]
];

const sectors = [
  {
    title: "E-Commerce",
    text: "Direct-to-consumer and multi-category e-commerce businesses.",
    icon: ShoppingBag
  },
  {
    title: "Marketplaces",
    text: "Platform models that connect buyers and sellers at scale.",
    icon: Store
  },
  {
    title: "Digital Platforms",
    text: "SaaS and digital products solving real user problems.",
    icon: Monitor
  },
  {
    title: "Technology",
    text: "Infrastructure, tools, and enabling technology.",
    icon: Cpu
  },
  {
    title: "Consumer Brands",
    text: "Modern brands built for today's consumer.",
    icon: Package
  },
  {
    title: "Future Ventures",
    text: "Early-stage bets on tomorrow's opportunities.",
    icon: Sparkles
  }
];

const companies = [
  {
    name: "Plumlet",
    category: "E-commerce / Kids & Lifestyle",
    tagline: "The Sweetest Little Finds",
    logo: "/ventures/logos/plumlet-logo-trimmed.png",
    description:
      "A playful e-commerce brand focused on sweet, useful, and lovable little finds."
  },
  {
    name: "Dearelle",
    category: "E-commerce / Lifestyle Luxury",
    tagline: "Your everyday little luxury.",
    logo: "/ventures/logos/dearelle-logo-trimmed.png",
    description: "A premium lifestyle commerce brand built around elegant everyday products."
  },
  {
    name: "Tarx Solutions",
    category: "Technology / Digital Solutions",
    logo: "/ventures/logos/tarx-solutions-logo-trimmed.png",
    logoSize: "large",
    description:
      "A technology and digital solutions company supporting modern business operations."
  },
  {
    name: "Tarx Holidays",
    category: "Travel / Holidays",
    logo: "/ventures/logos/tarx-holidays-logo-trimmed.png",
    logoSize: "large",
    description:
      "A travel and holiday brand focused on curated UAE, Kerala, and international travel experiences."
  },
  {
    name: "Entry Pazz",
    category: "Marketplace / Events & Tickets",
    logo: "/ventures/logos/entry-pazz-logo-trimmed.png",
    description:
      "A ticketing and event access platform for discovering and booking experiences."
  }
];

const pillars = [
  ["01", "Founder First", "We partner with driven founders and back their vision."],
  ["02", "Operational Excellence", "We build systems, processes, and teams that scale."],
  ["03", "Capital Efficiency", "We deploy capital with discipline and focus on returns."],
  ["04", "Shared Resources", "We leverage a group platform to accelerate growth."],
  ["05", "Long-Term Mindset", "We think in decades, not quarters."]
];

function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] ${
        dark ? "text-white/55" : "text-black/45"
      }`}
    >
      {children}
    </p>
  );
}

function ArrowLink({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href="#contact"
      className={`group mt-8 inline-flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.08em] ${
        dark ? "text-white" : "text-black"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!elements.length) {
      return;
    }

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
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateDirection);
    };
  }, []);

  return (
    <main className="min-h-screen bg-paper">
      <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-14">
          <a href="#" className="leading-none" aria-label="Fusion Ventures home">
            <span className="block text-3xl font-medium tracking-[0.24em]">FUSION</span>
            <span className="ml-1 block text-[11px] font-semibold tracking-[0.42em]">VENTURES</span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-55"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden border border-black bg-black px-8 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-black sm:inline-flex"
            >
              Partner With Us
            </a>
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="grid h-10 w-10 place-items-center border border-transparent transition-colors hover:border-black"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-white px-6 py-5 lg:hidden">
            <div className="grid gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-[0.08em]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 border border-black bg-black px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-white"
                onClick={() => setMenuOpen(false)}
              >
                Partner With Us
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden bg-white" id="group">
        <div className="mx-auto grid min-h-[640px] max-w-[1440px] lg:grid-cols-[47%_53%]">
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-24">
            <div className="max-w-[620px] scroll-reveal">
              <Label>Venture Group</Label>
              <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Building Companies
                <br />
                With Long-Term Vision.
              </h1>
              <p className="mt-8 max-w-[560px] text-base leading-8 text-black/65">
                Fusion Ventures is a diversified venture group that builds, owns, operates, and
                scales market-leading businesses across e-commerce, marketplaces, digital products,
                and technology.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#group-overview"
                  className="border border-black bg-black px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Explore Our Group
                </a>
                <a
                  href="#ventures"
                  className="border border-black px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-black hover:text-white"
                >
                  View Our Ventures
                </a>
              </div>
            </div>
          </div>
          <div className="min-h-[360px] overflow-hidden lg:min-h-[640px]">
            <div className="architectural-hero h-full min-h-[360px] origin-center transition-transform duration-700 hover:scale-[1.025]" />
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-20 sm:px-10 lg:px-24 lg:py-24" id="group-overview">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[38%_62%]">
          <div className="scroll-reveal">
            <Label>The Fusion Ventures Group</Label>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              A Long-Term Owner
              <br />& Operator of Businesses
            </h2>
            <p className="mt-8 max-w-[520px] text-sm leading-7 text-black/62">
              We partner with exceptional founders and teams to build and grow enduring companies.
              Our model combines operational expertise, capital, and decentralized autonomy,
              empowering businesses to scale with speed and sustainability.
            </p>
            <ArrowLink>Learn More About Us</ArrowLink>
          </div>

          <div className="scroll-reveal grid gap-px bg-black/10 sm:grid-cols-2">
            {overviewItems.map(({ title, text, icon: Icon }) => (
              <article key={title} className="bg-mist p-8 sm:p-10">
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-full border border-black/35">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-3 max-w-[260px] text-sm leading-6 text-black/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-10 lg:px-24">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-white/18 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map(([number, label, sub]) => (
            <article key={number} className="bg-black py-7 sm:px-8 lg:px-10">
              <p className="text-4xl font-light tracking-[-0.04em]">{number}</p>
              <p className="mt-4 text-sm leading-5 text-white">{label}</p>
              <p className="text-sm leading-5 text-white/72">{sub}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 lg:px-24" id="sectors">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[22%_78%]">
          <div className="scroll-reveal">
            <Label>Core Sectors</Label>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              Building In Large,
              <br />
              Growing Markets.
            </h2>
          </div>
          <div className="scroll-reveal grid gap-px bg-black/12 sm:grid-cols-2 lg:grid-cols-6">
            {sectors.map(({ title, text, icon: Icon }) => (
              <article key={title} className="min-h-[240px] bg-white p-6">
                <Icon className="mb-8 h-8 w-8" strokeWidth={1.5} />
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-10 lg:px-24" id="ventures">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[24%_76%]">
          <div className="scroll-reveal">
            <Label dark>Portfolio Companies</Label>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              A Portfolio of
              <br />
              High-Potential
              <br />
              Businesses.
            </h2>
            <ArrowLink dark>Explore Our Ventures</ArrowLink>
          </div>
          <div className="scroll-reveal grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <a
                key={company.name}
                href="#ventures"
                className="group flex min-h-[280px] flex-col border border-transparent bg-black p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white hover:text-black"
              >
                <div className="flex h-32 items-center justify-center bg-white px-6 py-5">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={320}
                    height={140}
                    className={`w-full object-contain transition-opacity duration-300 group-hover:opacity-75 ${
                      company.logoSize === "large" ? "max-h-24" : "max-h-20"
                    }`}
                  />
                </div>
                <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.14em] text-white/48 transition-colors group-hover:text-black/45">
                  {company.category}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{company.name}</h3>
                {company.tagline && (
                  <p className="mt-2 text-sm font-medium text-white/78 transition-colors group-hover:text-black/62">
                    {company.tagline}
                  </p>
                )}
                <p className="mt-4 flex-1 text-sm leading-6 text-white/62 transition-colors group-hover:text-black/62">
                  {company.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.1em]">
                  View Venture
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 lg:px-24" id="approach">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[24%_76%]">
          <div className="scroll-reveal">
            <Label>How We Create Value</Label>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              An Operating Model
              <br />
              Built For Scale.
            </h2>
            <p className="mt-7 text-sm leading-7 text-black/62">
              We combine decentralized leadership with a shared playbook, driving performance
              across our portfolio while preserving founder DNA.
            </p>
            <ArrowLink>Our Approach</ArrowLink>
          </div>
          <div className="scroll-reveal grid gap-px bg-black/12 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map(([number, title, text]) => (
              <article key={number} className="bg-white p-6">
                <p className="text-5xl font-light tracking-[-0.05em] text-black/22">{number}</p>
                <div className="my-6 h-px w-12 bg-black/35" />
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="architectural-cta px-6 py-16 text-white sm:px-10 lg:px-24" id="contact">
        <div className="scroll-reveal mx-auto max-w-[760px] text-center">
          <Label dark>Let&apos;s Build The Future Together</Label>
          <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
            Partner With A Group
            <br />
            That Builds To Last.
          </h2>
          <a
            href="mailto:hello@fusionventures.com"
            className="mt-9 inline-flex border border-white bg-white px-12 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-white"
          >
            Start A Conversation
          </a>
        </div>
      </section>

      <footer className="border-t border-line bg-white px-6 py-5 text-[11px] uppercase tracking-[0.06em] text-black/45 sm:px-10 lg:px-24">
        <div className="mx-auto grid max-w-[1280px] gap-4 text-center sm:grid-cols-3">
          <p className="sm:text-left">© 2026 Fusion Ventures. All rights reserved.</p>
          <div className="flex justify-center gap-10">
            <a href="#" className="transition-colors hover:text-black">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-black">
              Terms of Use
            </a>
          </div>
          <a href="#" className="transition-colors hover:text-black sm:text-right">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
