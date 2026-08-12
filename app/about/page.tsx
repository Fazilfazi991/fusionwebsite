import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import {
  ArrowRight,
  Globe2,
  Linkedin,
  Menu,
  Network
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Fusion Ventures",
  description: "Fusion Ventures builds digital-first ventures and tailored technology solutions from the UAE."
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Digital Solutions", href: "/fynta" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

const services = [
  {
    title: "Custom CRM Development",
    text: "Tailored CRM and internal management platforms built around your actual workflow, from leads and customer records to approvals, finance, documents, reports, and role-based access."
  },
  {
    title: "Web Application Development",
    text: "Responsive, scalable web applications for operations, customer platforms, marketplaces, dashboards, booking systems, portals, and digital services."
  },
  {
    title: "Mobile App Development",
    text: "Practical Android and iOS experiences designed around real customer journeys and operational requirements."
  },
  {
    title: "Website Design and Development",
    text: "High-performance websites that bring together clear positioning, thoughtful user experience, responsive design, SEO foundations, and conversion-focused structure."
  },
  {
    title: "Digital Product Development",
    text: "End-to-end product work across discovery, planning, UI/UX, architecture, development, testing, deployment, launch, and continuous improvement."
  },
  {
    title: "Workflow and Business Automation",
    text: "Connected systems that reduce repetitive work, improve information flow, and help teams operate accurately and efficiently."
  }
];

const leaders = [
  {
    name: "Ayisha Muneer",
    role: "Founder & CEO",
    expertise: "Venture direction, leadership, and strategic development.",
    photo: "/team/ayisha-muneer.webp",
    website: "https://ayishamuneer.com",
    linkedin: "https://www.linkedin.com/in/ayishamuneer"
  },
  {
    name: "Mohammad Fazil",
    role: "Co-Founder, Technical & Business Development",
    expertise: "Technology, digital products, and business development.",
    photo: "/team/mohammad-fazil.webp",
    website: "https://fazildigital.com",
    linkedin: "https://www.linkedin.com/in/fazilfazi"
  },
  {
    name: "Thameem AR",
    role: "Co-Founder, Branding & Growth Strategy",
    expertise: "Brand strategy, positioning, and growth.",
    photo: "/team/thameem-ar.webp",
    website: "https://thameemar.online",
    linkedin: "https://www.linkedin.com/in/thameemar"
  }
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b99a5b]">{children}</p>;
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060705]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-14">
        <a href="/" aria-label="Fusion Ventures home">
          <Image src="/fusion-ventures-logo.webp" alt="Fusion Ventures" width={640} height={176} priority className="h-9 w-auto sm:h-10" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-white ${item.label === "About Us" ? "border-b border-[#b99a5b] pb-2 text-[#d8c38b]" : "text-white/70"}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="/#contact" className="hidden border border-[#b99a5b] bg-[#b99a5b] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b] sm:inline-flex">Partner With Us</a>
        <details className="relative sm:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center border border-[#b99a5b]/55 text-[#d8c38b] [&::-webkit-details-marker]:hidden"><Menu className="h-6 w-6" /></summary>
          <nav className="absolute right-0 top-14 grid w-56 gap-4 border border-white/12 bg-[#060705] p-5 shadow-2xl">
            {navItems.map((item) => <a key={item.label} href={item.href} className="text-xs font-bold uppercase tracking-[0.08em] text-white/76">{item.label}</a>)}
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

      <section className="relative border-b border-white/10 px-5 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(185,154,91,0.11),transparent_38%)]" />
        <div className="relative mx-auto max-w-[1040px] text-center">
          <Eyebrow>About Fusion Ventures</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-[980px] text-5xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">We build ventures, technology, and systems designed to grow.</h1>
          <p className="mx-auto mt-7 max-w-[760px] text-base leading-8 text-white/64 sm:text-lg">Fusion Ventures is a UAE-based venture and technology group that builds digital-first companies and develops tailored digital solutions for businesses across multiple industries and markets.</p>
          <div className="mx-auto mt-11 flex max-w-md items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/58 sm:gap-6">
            <span>Ventures</span><span className="h-px w-12 bg-[#b99a5b] sm:w-20" aria-hidden="true" /><span className="text-[#d8c38b]">Digital Solutions</span>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-4 text-xs font-bold uppercase tracking-[0.1em]">
            <a href="/ventures" className="inline-flex items-center gap-2 text-[#d8c38b] transition hover:text-white">Explore Our Ventures <ArrowRight className="h-3.5 w-3.5" /></a>
            <a href="/#contact" className="inline-flex items-center gap-2 text-white/72 transition hover:text-[#d8c38b]">Build With Us <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[38%_62%]">
          <div><Eyebrow>Who We Are</Eyebrow><h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">Builders with an operator&apos;s mindset.</h2></div>
          <div className="grid gap-7 border-l border-white/12 pl-7 text-base leading-8 text-white/62 sm:grid-cols-2 sm:pl-10">
            <p>We bring business strategy, technology, design, branding, partnerships, and hands-on execution together under one platform. We build and operate our own ventures while helping businesses turn ideas, processes, and operational challenges into practical digital products.</p>
            <p>Because we approach every project as business operators—not only developers—we consider usability, scalability, performance, commercial viability, and long-term growth from the beginning.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a0b09] px-5 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1280px]"><Eyebrow>One Platform, Two Connected Sides</Eyebrow>
          <div className="mt-10 grid border border-white/12 lg:grid-cols-[1fr_150px_1fr]">
            <article className="p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b99a5b]">Our Ventures</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Ideas made operational.</h2><p className="mt-5 max-w-md leading-7 text-white/58">We identify meaningful opportunities, build strong foundations, launch focused brands, and operate digital-first businesses across multiple industries.</p><div className="mt-9 flex flex-wrap gap-2">{["Ideas", "Brands", "Markets", "Operations", "Growth"].map((label) => <span key={label} className="border border-white/14 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/62">{label}</span>)}</div></article>
            <div className="flex min-h-24 items-center justify-center border-y border-white/12 bg-black/20 lg:min-h-0 lg:border-x lg:border-y-0"><div className="grid h-16 w-16 place-items-center rounded-full border border-[#b99a5b]/55 text-[#d8c38b]"><Network className="h-6 w-6" strokeWidth={1.3} /></div></div>
            <article className="p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b99a5b]">Digital Solutions</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Technology built around business.</h2><p className="mt-5 max-w-md leading-7 text-white/58">We design and develop custom technology for businesses: CRM systems, web platforms, mobile applications, websites, dashboards, and workflow automation.</p><div className="mt-9 flex flex-wrap gap-2">{["Custom CRM", "Web Apps", "Mobile Apps", "Business Systems", "Automation"].map((label) => <span key={label} className="border border-white/14 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/62">{label}</span>)}</div></article>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1280px]"><Eyebrow>What We Build</Eyebrow><h2 className="mt-5 max-w-[660px] text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Digital products shaped around real business needs.</h2>
          <div className="mt-12 border-t border-white/12">{services.map((service, index) => <details key={service.title} className="group border-b border-white/12 py-5 open:bg-white/[0.025] sm:px-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium outline-none marker:content-none focus-visible:text-[#d8c38b] sm:text-2xl"><span><span className="mr-5 text-xs font-bold tracking-[0.12em] text-[#b99a5b]">0{index + 1}</span>{service.title}</span><span className="text-[#d8c38b] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-5 text-sm leading-7 text-white/60 sm:pl-9 sm:text-base">{service.text}</p></details>)}</div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10 lg:px-14 lg:py-32"><div className="mx-auto grid max-w-[1280px] gap-px bg-white/10 lg:grid-cols-2"><article className="bg-[#060705] p-8 sm:p-12"><Eyebrow>Our Vision</Eyebrow><h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Build meaningful products and scalable ventures.</h2><p className="mt-7 max-w-lg leading-8 text-white/62">To simplify operations, create new opportunities, and positively impact businesses and communities across global markets.</p></article><article className="bg-[#0a0b09] p-8 sm:p-12"><Eyebrow>Our Mission</Eyebrow><h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Turn real needs into practical digital solutions.</h2><p className="mt-7 max-w-lg leading-8 text-white/62">We combine technology, design, business understanding, and hands-on execution to help organizations strengthen their digital infrastructure and grow sustainably.</p></article></div><div className="mx-auto mt-8 flex max-w-[1280px] flex-wrap justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b99a5b]/80">{["Build", "Simplify", "Connect", "Scale", "Create"].map((word) => <span key={word}>{word}</span>)}</div></section>

      <section className="border-y border-white/10 bg-[#0a0b09] px-5 py-24 sm:px-10 lg:px-14 lg:py-28"><div className="mx-auto max-w-[1280px]"><Eyebrow>How We Work</Eyebrow><h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">From opportunity to lasting value.</h2><div className="mt-12 grid gap-px bg-white/10 md:grid-cols-4">{[["01", "Understand", "We begin with the problem, people, workflow, and desired business outcome."], ["02", "Define", "We establish the strategy, product scope, user experience, technology, and plan."], ["03", "Build", "We combine design, technology, branding, systems, and hands-on development."], ["04", "Improve", "We test, learn, refine, and strengthen the product as needs evolve."]].map(([number, title, text]) => <article key={number} className="bg-[#0a0b09] p-7 sm:p-8"><p className="text-xs font-bold tracking-[0.14em] text-[#b99a5b]">{number}</p><h3 className="mt-8 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-white/56">{text}</p></article>)}</div></div></section>

      <section className="px-5 py-24 sm:px-10 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1280px]"><div className="text-center"><Eyebrow>Leadership</Eyebrow><h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">The people building Fusion Ventures.</h2></div><div className="mt-12 grid gap-7 md:grid-cols-3">{leaders.map((leader) => <article key={leader.name} className="border-t border-white/14 pt-6"><Image src={leader.photo} alt={`${leader.name} portrait`} width={640} height={720} unoptimized className="aspect-[4/4.6] w-full object-cover grayscale transition duration-500 hover:grayscale-0" /><h3 className="mt-6 text-2xl font-medium">{leader.name}</h3><p className="mt-2 text-[10px] font-bold uppercase leading-5 tracking-[0.1em] text-[#b99a5b]">{leader.role}</p><p className="mt-4 text-sm leading-6 text-white/56">{leader.expertise}</p><div className="mt-5 flex gap-2"><a href={leader.website} target="_blank" rel="noreferrer" aria-label={`${leader.name} personal website`} className="grid h-9 w-9 place-items-center border border-white/14 text-white/58 transition hover:border-[#b99a5b] hover:text-[#d8c38b]"><Globe2 className="h-4 w-4" /></a><a href={leader.linkedin} target="_blank" rel="noreferrer" aria-label={`${leader.name} LinkedIn profile`} className="grid h-9 w-9 place-items-center border border-white/14 text-white/58 transition hover:border-[#b99a5b] hover:text-[#d8c38b]"><Linkedin className="h-4 w-4" /></a></div></article>)}</div></div></section>

      <section className="border-t border-white/10 bg-[#0a0b09] px-5 py-24 text-center sm:px-10 lg:px-14 lg:py-32"><div className="mx-auto max-w-[900px]"><Eyebrow>Let&apos;s Build What&apos;s Next</Eyebrow><h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">Have an idea, a business challenge, or a system that needs to work better?</h2><p className="mx-auto mt-7 max-w-[700px] text-base leading-8 text-white/60">Whether you are developing a new venture, modernizing operations, or creating a custom digital product, we would be glad to explore what can be built together.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><a href="/#contact" className="inline-flex items-center gap-3 bg-[#b99a5b] px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-black transition hover:bg-[#d8c38b]">Start a Conversation <ArrowRight className="h-4 w-4" /></a><a href="/ventures" className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:border-[#b99a5b] hover:text-[#d8c38b]">Explore Our Ventures <ArrowRight className="h-4 w-4" /></a></div></div></section>
      <SiteFooter />
    </main>
  );
}
