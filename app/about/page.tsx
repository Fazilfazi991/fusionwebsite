import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, Globe2, Linkedin, Menu, Rocket, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Fusion Ventures",
  description:
    "Learn how Fusion Ventures builds, operates, and scales digital-first businesses from the UAE."
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

const principles = [
  {
    title: "Build with purpose",
    text: "We begin with a clear customer problem, a focused market opportunity, and a business model designed for lasting value.",
    icon: Target
  },
  {
    title: "Operate with discipline",
    text: "We combine brand, technology, systems, partnerships, and hands-on execution to move ventures from idea to operation.",
    icon: BriefcaseBusiness
  },
  {
    title: "Scale with conviction",
    text: "We reinvest learning, capability, and commercial momentum into ventures that demonstrate meaningful potential.",
    icon: Rocket
  }
];

const leaders = [
  {
    name: "Ayisha Muneer",
    role: "Founder & CEO",
    photo: "/team/ayisha-muneer.webp",
    website: "https://ayishamuneer.com",
    linkedin: "https://www.linkedin.com/in/ayishamuneer"
  },
  {
    name: "Mohammad Fazil",
    role: "Co-Founder, Technical & Business Development",
    photo: "/team/mohammad-fazil.webp",
    website: "https://fazildigital.com",
    linkedin: "https://www.linkedin.com/in/fazilfazi"
  },
  {
    name: "Thameem AR",
    role: "Co-Founder, Branding & Growth Strategy",
    photo: "/team/thameem-ar.webp",
    website: "https://thameemar.online",
    linkedin: "https://www.linkedin.com/in/thameemar"
  }
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060705]/90 backdrop-blur-xl">
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

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-white ${
                item.label === "About Us"
                  ? "border-b border-[#b99a5b] pb-2 text-[#d8c38b]"
                  : "text-white/70"
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

        <details className="relative sm:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center border border-[#b99a5b]/55 text-[#d8c38b] [&::-webkit-details-marker]:hidden">
            <Menu className="h-6 w-6" />
          </summary>
          <nav className="absolute right-0 top-14 grid w-56 gap-4 border border-white/12 bg-[#060705] p-5 shadow-2xl">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-xs font-bold uppercase tracking-[0.08em] text-white/76">
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060705] text-white">
      <Header />

      <section className="border-b border-white/10 px-5 py-20 text-center sm:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b99a5b]">About Fusion Ventures</p>
          <h1 className="mx-auto mt-6 max-w-[920px] text-5xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            We turn focused ideas into enduring businesses.
          </h1>
          <p className="mx-auto mt-7 max-w-[720px] text-base leading-8 text-white/64 sm:text-lg">
            Fusion Ventures is a UAE-based venture group that builds and operates digital-first companies across commerce, technology, marketplaces, travel, and consumer brands.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[38%_62%]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b99a5b]">Who We Are</p>
            <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">Builders with an operator&apos;s mindset.</h2>
          </div>
          <div className="border-l border-white/12 pl-7 sm:pl-10">
            <p className="text-lg leading-9 text-white/72">
              We bring ideas, execution, branding, technology, partnerships, and operational focus together under one venture platform. Each company keeps its own identity while benefiting from shared experience, systems, and commercial direction.
            </p>
            <p className="mt-6 text-base leading-8 text-white/52">
              Our approach is practical and long term: identify a real opportunity, build the right foundation, launch with clarity, and scale with discipline.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0d09] px-5 py-20 sm:px-10 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#b99a5b]">How We Work</p>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {principles.map(({ title, text, icon: Icon }) => (
              <article key={title} className="bg-[#0b0d09] p-8 lg:p-10">
                <Icon className="h-8 w-8 text-[#b99a5b]" strokeWidth={1.4} />
                <h3 className="mt-8 text-2xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/56">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b99a5b]">Leadership</p>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">The people building Fusion Ventures.</h2>
          </div>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {leaders.map((leader) => (
              <article key={leader.name} className="flex items-center gap-5 bg-[#080a07] p-6 sm:p-8">
                <Image
                  src={leader.photo}
                  alt={`${leader.name} portrait`}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-20 w-20 shrink-0 rounded-full border border-[#b99a5b]/55 object-cover sm:h-24 sm:w-24"
                />
                <div className="min-w-0">
                  <h3 className="text-xl font-medium">{leader.name}</h3>
                  <p className="mt-2 text-xs font-bold uppercase leading-5 tracking-[0.08em] text-[#b99a5b]">{leader.role}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={leader.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${leader.name} personal website`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-white/48 transition-colors hover:border-[#b99a5b] hover:text-[#d8c38b]"
                    >
                      <Globe2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </a>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${leader.name} LinkedIn profile`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-white/48 transition-colors hover:border-[#b99a5b] hover:text-[#d8c38b]"
                    >
                      <Linkedin className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0b0d09] px-5 py-20 text-center sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Let&apos;s build what&apos;s next.</h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/58">We welcome conversations with founders, operators, partners, and businesses aligned with long-term value creation.</p>
          <a href="/#contact" className="mt-9 inline-flex items-center gap-4 border border-[#b99a5b] bg-[#b99a5b] px-8 py-4 text-xs font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b]">
            Partner With Us <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
