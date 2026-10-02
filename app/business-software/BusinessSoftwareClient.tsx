"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleDot,
  Diamond,
  Dribbble,
  FileText,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  PanelsTopLeft,
  Phone,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Users,
  Workflow,
  X
} from "lucide-react";
import { webPortfolioContact } from "../web-portfolio/webProjects";
import {
  softwareCapabilities,
  softwareProcess,
  softwareProjects,
  type SoftwareProject
} from "./softwareProjects";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Business Software", href: "/business-software" },
  { label: "Contact", href: "/#contact" }
];

const capabilityIcons = {
  Users,
  LayoutDashboard,
  Workflow,
  PanelsTopLeft,
  ShieldCheck,
  ChartNoAxesCombined
};

function LogoMark() {
  return (
    <a href="/" className="flex items-center leading-none" aria-label="Fusion Ventures home">
      <Image
        src="/fusion-ventures-logo.webp"
        alt="Fusion Ventures"
        width={640}
        height={176}
        priority
        className="h-9 w-auto shrink-0 sm:h-10"
      />
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d6a84f]">
      <Diamond className="h-3 w-3" />
      {children}
    </p>
  );
}

function BesmilePreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#7eb2d8]/25 bg-[#0d1720] text-left shadow-[0_30px_90px_rgba(0,0,0,0.35)] ${compact ? "min-h-[230px]" : "min-h-[390px]"}`} aria-hidden="true">
      <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#111f2a] px-4 sm:h-14 sm:px-5">
        <div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-md bg-[#a5d7f4] text-[#10202b]"><CircleDot className="h-4 w-4" /></span><span className="text-[10px] font-semibold tracking-[0.14em] text-white/70">BESMILE / OPERATIONS</span></div>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#7bd6ad]" /><span className="hidden text-[10px] text-white/45 sm:inline">System online</span><span className="h-6 w-6 rounded-full bg-[#3c5c70]" /></div>
      </div>
      <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[132px_1fr]">
        <aside className="min-h-[270px] border-r border-white/10 bg-[#0a1219] p-2 sm:min-h-[330px] sm:p-4">
          <div className="mb-5 h-2 w-9 rounded-full bg-white/20 sm:w-14" />
          {["Overview", "Patients", "Staff", "Reports"].map((item, index) => <div key={item} className={`mb-2 flex items-center gap-2 rounded-md px-2 py-2 text-[9px] sm:gap-3 sm:px-3 sm:text-[10px] ${index === 0 ? "bg-[#9fd3ed]/15 text-[#b9e4f8]" : "text-white/35"}`}><span className={`h-2 w-2 rounded-sm ${index === 0 ? "bg-[#9fd3ed]" : "bg-white/20"}`} />{item}</div>)}
          <div className="mt-8 hidden border-t border-white/10 pt-4 text-[9px] text-white/30 sm:block">Workspace settings</div>
        </aside>
        <div className="min-w-0 p-3 sm:p-5">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-[9px] uppercase tracking-[0.16em] text-[#91bdd4]">Wednesday, 18 September</p><h3 className="mt-1 text-base font-medium text-white sm:text-xl">Good morning, team</h3></div><span className="hidden rounded-md bg-[#a5d7f4] px-3 py-2 text-[9px] font-bold text-[#10202b] sm:block">Add patient</span></div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">{[["184", "Active patients"], ["12", "Pending reviews"], ["96%", "Tasks on track"]].map(([value, label]) => <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-2.5 sm:p-3"><p className="text-lg font-medium text-white sm:text-2xl">{value}</p><p className="mt-1 text-[8px] leading-3 text-white/40 sm:text-[10px]">{label}</p></div>)}</div>
          <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold text-white/70">Today&apos;s operations</p><span className="text-[9px] text-[#91bdd4]">View all</span></div>{["New patient intake", "Clinical review", "Employee onboarding"].map((row, index) => <div key={row} className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5"><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${index === 1 ? "bg-[#e6c16a]" : "bg-[#7bd6ad]"}`} /><span className="text-[9px] text-white/58 sm:text-[10px]">{row}</span></div><ChevronRight className="h-3 w-3 text-white/25" /></div>)}</div>
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3"><p className="text-[10px] font-semibold text-white/70">Weekly activity</p><div className="mt-4 flex h-16 items-end gap-1.5 sm:h-20">{[35, 52, 42, 66, 58, 78, 89].map((height, index) => <span key={index} className={`flex-1 rounded-t-sm ${index === 6 ? "bg-[#a5d7f4]" : "bg-[#43738e]"}`} style={{ height: `${height}%` }} />)}</div><div className="mt-2 flex justify-between text-[8px] text-white/30"><span>Mon</span><span>Sun</span></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BesmileScreenshot({
  screenshot,
  compact = false,
  fallback
}: {
  screenshot?: NonNullable<SoftwareProject["screenshots"]>[number];
  compact?: boolean;
  fallback?: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (!screenshot || failed) {
    if (fallback === true) return <PergolaPreview compact={compact} />;
    if (fallback === false) return <BesmilePreview compact={compact} />;
    return fallback ?? <BesmilePreview compact={compact} />;
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#7eb2d8]/25 bg-[#0d1720] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-contain object-top"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function PergolaPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#d6a84f]/25 bg-[#17120c] text-left shadow-[0_30px_90px_rgba(0,0,0,0.35)] ${compact ? "min-h-[230px]" : "min-h-[390px]"}`} aria-hidden="true">
      <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#21190e] px-4 sm:h-14 sm:px-5"><div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-md bg-[#d6a84f] text-[#21190e]"><LayoutDashboard className="h-4 w-4" /></span><span className="text-[10px] font-semibold tracking-[0.14em] text-white/70">UNIVERSAL / CONTROL ROOM</span></div><div className="flex items-center gap-3"><Search className="h-4 w-4 text-white/35" /><span className="h-6 w-6 rounded-full bg-[#836b3d]" /></div></div>
      <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[132px_1fr]"><aside className="min-h-[270px] border-r border-white/10 bg-[#100d09] p-2 sm:min-h-[330px] sm:p-4"><div className="mb-5 h-2 w-9 rounded-full bg-white/20 sm:w-14" />{[["Overview", BarChart3], ["Enquiries", Users], ["Content", FileText], ["SEO & media", Settings2]].map(([item, Icon], index) => { const ItemIcon = Icon as typeof BarChart3; return <div key={item as string} className={`mb-2 flex items-center gap-2 rounded-md px-2 py-2 text-[9px] sm:gap-3 sm:px-3 sm:text-[10px] ${index === 0 ? "bg-[#d6a84f]/15 text-[#e7c975]" : "text-white/35"}`}><ItemIcon className="h-3 w-3" />{item as string}</div>; })}</aside>
        <div className="min-w-0 p-3 sm:p-5"><div className="mb-4 flex items-end justify-between"><div><p className="text-[9px] uppercase tracking-[0.16em] text-[#d6a84f]">Business overview</p><h3 className="mt-1 text-base font-medium text-white sm:text-xl">A clearer view of growth</h3></div><span className="hidden rounded-md border border-[#d6a84f]/35 px-3 py-2 text-[9px] text-[#e7c975] sm:block">This month</span></div><div className="grid grid-cols-3 gap-2 sm:gap-3">{[["48", "New enquiries"], ["16", "Open quotes"], ["27", "Content items"]].map(([value, label]) => <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-2.5 sm:p-3"><p className="text-lg font-medium text-white sm:text-2xl">{value}</p><p className="mt-1 text-[8px] leading-3 text-white/40 sm:text-[10px]">{label}</p></div>)}</div><div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1.2fr_0.8fr]"><div className="rounded-lg border border-white/10 bg-white/[0.035] p-3"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold text-white/70">Latest enquiries</p><span className="text-[9px] text-[#d6a84f]">Open pipeline</span></div>{["Pergola enquiry", "Garden room quote", "Commercial shading"].map((row, index) => <div key={row} className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5"><div><p className="text-[9px] text-white/60 sm:text-[10px]">{row}</p><p className="mt-1 text-[8px] text-white/30">{index + 1} day{index ? "s" : ""} ago</p></div><span className="rounded-full bg-[#d6a84f]/12 px-2 py-1 text-[8px] text-[#e7c975]">Review</span></div>)}</div><div className="rounded-lg border border-white/10 bg-white/[0.035] p-3"><p className="text-[10px] font-semibold text-white/70">Growth signals</p><div className="relative mt-4 h-20 overflow-hidden"><div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/15" /><svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 80" preserveAspectRatio="none"><path d="M0 64 C20 58, 26 62, 42 48 S66 52, 78 38 S104 46, 119 25 S143 31, 160 12" fill="none" stroke="#d6a84f" strokeWidth="2" /></svg></div><p className="mt-2 text-[8px] text-white/30">Enquiries over time</p></div></div></div></div>
    </div>
  );
}

function SoftwarePreview({ project, compact = false }: { project: SoftwareProject; compact?: boolean }) {
  return <BesmileScreenshot screenshot={project.screenshots?.[0]} compact={compact} fallback={project.slug === "universal-pergola" ? true : undefined} />;
}

function ProjectModal({ project, onClose }: { project: SoftwareProject; onClose: () => void }) {
  const [selectedScreenshotId, setSelectedScreenshotId] = useState(project.screenshots?.[0]?.id ?? "");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [onClose]);

  const selectedScreenshot = project.screenshots?.find(({ id }) => id === selectedScreenshotId) ?? project.screenshots?.[0];
  const isBesmile = project.slug === "besmile";

  return (
    <div className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-[#030303]" role="dialog" aria-modal="true" aria-labelledby="software-project-title">
      <header className="shrink-0 border-b border-white/[0.08] bg-[#030303]/95 px-5 pb-4 pt-[max(16px,env(safe-area-inset-top))] backdrop-blur-xl sm:px-8"><div className="mx-auto flex max-w-[1200px] items-center gap-4"><button type="button" onClick={onClose} className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/18 text-white transition-colors hover:border-[#d6a84f] hover:text-[#d6a84f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f] sm:h-12 sm:w-12" aria-label="Close software project details"><X className="h-5 w-5" /></button><div className="min-w-0"><h2 id="software-project-title" className="truncate font-display text-[27px] font-medium leading-none text-white sm:text-3xl">{project.title}</h2><p className="mt-2 truncate text-base leading-none text-[#d6a84f]">{project.type}</p></div></div></header>
      <div className="flex-1 overflow-y-auto overscroll-contain bg-[#050505] px-4 pb-10 pt-5 [-webkit-overflow-scrolling:touch] sm:px-8 sm:pt-8"><div className="mx-auto max-w-[1200px]"><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"><div><BesmileScreenshot screenshot={selectedScreenshot} fallback={isBesmile ? undefined : true} /><p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/32">{isBesmile ? "Director workspace preview — synthetic demo data" : "Business operations preview — synthetic demo data"}</p>{project.screenshots && <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{project.screenshots.map((screenshot) => <button key={screenshot.id} type="button" onClick={() => setSelectedScreenshotId(screenshot.id)} aria-label={`Show ${screenshot.label} screenshot`} aria-pressed={selectedScreenshot?.id === screenshot.id} className={`rounded-md border px-3 py-2 text-left text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f] ${selectedScreenshot?.id === screenshot.id ? "border-[#d6a84f] bg-[#d6a84f]/15 text-[#e8c56f]" : "border-white/12 text-white/58 hover:border-white/30 hover:text-white"}`}>{screenshot.label}</button>)}</div>}</div><div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"><Eyebrow>{project.type}</Eyebrow><p className="mt-5 text-base leading-7 text-white/65">{project.description}</p><div className="mt-7"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">What we built</p><p className="mt-3 text-sm leading-7 text-white/62">{project.positioning}</p></div><div className="mt-7"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Platform areas</p><div className="mt-3 flex flex-wrap gap-2">{project.features.map((feature) => <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-xs text-white/70"><Check className="h-3.5 w-3.5 text-[#d6a84f]" />{feature}</span>)}</div></div><div className="mt-8 border-t border-white/10 pt-5"><p className="text-xs text-white/40">Demo status</p><p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#d6a84f]"><span className="h-2 w-2 rounded-full bg-[#d6a84f]" />{project.status}</p>{project.demoUrl && <p className="mt-3 text-xs text-white/42">Explore with fictional demonstration data.</p>}</div></div></div></div></div>
      <div className="border-t border-white/[0.08] bg-[#030303]/96 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl"><div className="mx-auto flex max-w-[1200px] gap-3"><button type="button" onClick={onClose} className="hidden h-[52px] flex-1 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-[#d6a84f] sm:flex">Close Details</button>{project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[10px] border border-[#d6a84f] bg-[#d6a84f] px-6 text-base font-bold text-[#080808] transition-colors hover:bg-[#efc86f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f] sm:h-[52px] sm:text-sm">{project.liveDemoLabel ?? "Open Live Demo"}<ArrowRight className="h-4 w-4" /></a> : <button type="button" disabled className="flex h-[58px] flex-1 cursor-not-allowed items-center justify-center gap-3 rounded-[10px] border border-[#d6a84f]/35 bg-[#d6a84f]/10 px-6 text-base font-bold text-[#d6a84f]/70 sm:h-[52px] sm:text-sm">Live Demo — Coming Soon</button>}</div></div>
    </div>
  );
}

export default function BusinessSoftwareClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<SoftwareProject | null>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-[#030405] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl"><div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-10 lg:px-14"><LogoMark /><nav className="hidden items-center gap-6 xl:flex">{navItems.map((item) => <a key={item.label} href={item.href} className={`text-[10px] font-bold uppercase tracking-[0.07em] transition-colors hover:text-white ${item.label === "Business Software" ? "border-b border-[#b99a5b] pb-2 text-[#d8c38b]" : "text-white/70"}`}>{item.label}</a>)}</nav><a href="/#contact" className="hidden border border-[#b99a5b] bg-[#b99a5b] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b] sm:inline-flex">Start a Project</a><button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-md border border-[#d6a84f]/45 text-[#d6a84f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f] xl:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button></div>{menuOpen && <div className="border-t border-white/10 bg-[#060705] px-5 py-5 xl:hidden"><nav className="mx-auto grid max-w-[1440px] gap-4">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className={`text-sm font-semibold uppercase tracking-[0.08em] ${item.label === "Business Software" ? "text-[#d6a84f]" : "text-white/75"}`}>{item.label}</a>)}<a href="/#contact" onClick={() => setMenuOpen(false)} className="mt-2 border border-[#d6a84f]/70 px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-[#e0ba68]">Start a Project</a></nav></div>}<div className="mobile-nav-motion lg:hidden" /></header>

      <section className="relative overflow-hidden border-b border-white/[0.07] px-5 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-28 lg:px-14 lg:pb-32 lg:pt-36"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_18%,rgba(214,168,79,0.13),transparent_26%),radial-gradient(circle_at_20%_60%,rgba(104,163,201,0.08),transparent_25%),linear-gradient(180deg,#080a0c_0%,#030405_100%)]" /><div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20"><div className="max-w-[760px]"><Eyebrow>Custom Business Software</Eyebrow><h1 className="mt-6 max-w-[720px] font-display text-[clamp(3rem,7vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.065em] text-white">Software built around how your business actually works.</h1><p className="mt-7 max-w-[640px] text-base leading-8 text-white/60 sm:text-lg">Custom CRM systems, operations platforms and internal software designed around real business workflows.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#projects" className="inline-flex items-center justify-center gap-3 rounded-md bg-[#d6a84f] px-6 py-4 text-sm font-bold text-[#080808] transition-colors hover:bg-[#efc86f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f]">Explore Our Work <ArrowRight className="h-4 w-4" /></a><a href="/#contact" className="inline-flex items-center justify-center gap-3 rounded-md border border-white/20 px-6 py-4 text-sm font-semibold text-white transition-colors hover:border-[#d6a84f] hover:text-[#d6a84f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f]">Start a Project</a></div></div><div className="relative border-l border-[#d6a84f]/45 pl-6 sm:pl-8"><p className="max-w-[260px] text-sm leading-7 text-white/48">Built for the parts of a business that generic software leaves behind.</p><div className="mt-7 grid max-w-[310px] grid-cols-2 gap-x-5 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d6a84f]"><span>CRM</span><span>Operations</span><span>Automation</span><span>Internal platforms</span></div></div></div></section>

      <section id="projects" className="scroll-mt-24 px-5 py-20 sm:px-10 sm:py-28 lg:px-14"><div className="mx-auto max-w-[1280px]"><div className="max-w-[680px]"><Eyebrow>Selected platforms</Eyebrow><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">Ten systems. Ten distinct operating realities.</h2><p className="mt-5 text-base leading-7 text-white/55">A look at how we translate complex, role-heavy workflows into software that teams can actually use.</p></div><div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">{softwareProjects.map((project, index) => <article key={project.slug} className="grid gap-9 lg:grid-cols-2 lg:items-center lg:gap-16"><div className={index % 2 === 1 ? "lg:order-2" : ""}><SoftwarePreview project={project} /></div><div className={index % 2 === 1 ? "lg:order-1" : ""}><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d6a84f]">{String(index + 1).padStart(2, "0")} / {project.type}</p><h3 className="mt-4 font-display text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">{project.title}</h3><p className="mt-5 max-w-[520px] text-base leading-8 text-white/62">{project.description}</p><div className="mt-7 flex flex-wrap gap-2">{project.features.map((feature) => <span key={feature} className="rounded-full border border-white/12 bg-white/[0.025] px-3 py-2 text-xs text-white/62">{feature}</span>)}</div><div className="mt-8 border-l border-[#d6a84f]/50 pl-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">What we built</p><p className="mt-2 max-w-[500px] text-sm leading-7 text-white/58">{project.positioning}</p></div><div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"><button type="button" onClick={() => setSelectedProject(project)} className="inline-flex items-center gap-3 rounded-md bg-[#d6a84f] px-5 py-3.5 text-sm font-bold text-[#080808] transition-colors hover:bg-[#efc86f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f]">Explore Platform <ArrowRight className="h-4 w-4" /></button>{project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[#d6a84f]/60 px-4 py-3 text-sm font-semibold text-[#e4bf69] transition-colors hover:bg-[#d6a84f]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f]">{project.liveDemoLabel ?? "Open Live Demo"}<ArrowRight className="h-4 w-4" /></a> : <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 px-2 py-3 text-sm font-semibold text-white/30">Live Demo — Coming Soon</button>}</div></div></article>)}</div></div></section>

      <section className="border-y border-white/[0.07] bg-[#08090a] px-5 py-20 sm:px-10 sm:py-24 lg:px-14"><div className="mx-auto max-w-[1280px]"><div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-20"><div><Eyebrow>Capability, not a template</Eyebrow><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">The system should fit the work.</h2></div><div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">{softwareCapabilities.map(([title, text, icon]) => { const Icon = capabilityIcons[icon]; return <article key={title} className="bg-[#08090a] p-5 sm:p-6"><Icon className="h-6 w-6 text-[#d6a84f]" strokeWidth={1.4} /><h3 className="mt-8 text-base font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/48">{text}</p></article>; })}</div></div></div></section>

      <section className="px-5 py-20 sm:px-10 sm:py-24 lg:px-14"><div className="mx-auto max-w-[1280px]"><div className="max-w-[650px]"><Eyebrow>Our approach</Eyebrow><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">Start with the workflow, then shape the software.</h2></div><div className="mt-12 grid border-y border-white/10 md:grid-cols-4">{softwareProcess.map(([title, text], index) => <article key={title} className="border-b border-white/10 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d6a84f]">0{index + 1}</p><h3 className="mt-5 text-lg font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/48">{text}</p></article>)}</div></div></section>

      <section className="px-5 pb-20 sm:px-10 sm:pb-28 lg:px-14"><div className="relative mx-auto max-w-[1280px] overflow-hidden border border-[#d6a84f]/35 bg-[radial-gradient(circle_at_85%_30%,rgba(214,168,79,0.16),transparent_35%),linear-gradient(120deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-7 sm:p-12"><div className="relative max-w-[720px]"><Eyebrow>Build the right system</Eyebrow><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">Your workflow shouldn&apos;t have to fit generic software.</h2><p className="mt-5 max-w-[560px] text-base leading-7 text-white/58">We build systems around the way your team actually operates.</p><a href="/#contact" className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#d6a84f] px-6 py-4 text-sm font-bold text-[#080808] transition-colors hover:bg-[#efc86f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a84f]">Discuss Your Software Project <ArrowRight className="h-4 w-4" /></a></div></div></section>

      <footer className="border-t border-white/10 bg-black px-5 py-9 sm:px-10 lg:px-14"><div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]"><div><LogoMark /><p className="mt-5 max-w-[260px] text-sm leading-6 text-white/50">Building digital experiences and business systems that move ventures forward.</p><div className="mt-5 flex gap-3">{[Linkedin, Instagram, Dribbble].map((Icon, index) => <span key={index} className="grid h-8 w-8 place-items-center rounded-full border border-white/14 text-white/72"><Icon className="h-4 w-4" /></span>)}</div></div><div><h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>{[["Home", "/"], ["About Us", "/about"], ["Ventures", "/ventures"], ["Web Portfolio", "/web-portfolio"], ["Business Software", "/business-software"], ["Contact", "/#contact"]].map(([item, href]) => <a key={item} href={href} className="mb-3 block text-sm text-white/52 hover:text-[#d6a84f]">{item}</a>)}</div><div><h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>{[["Privacy Policy", "/privacy-policy"], ["Terms and Conditions", "/terms-and-conditions"], ["Cookie Policy", "/cookie-policy"]].map(([item, href]) => <a key={item} href={href} className="mb-3 block text-sm text-white/52 hover:text-[#d6a84f]">{item}</a>)}</div><div><h3 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h3><a href={`mailto:${webPortfolioContact.email}`} className="mb-3 flex items-center gap-3 text-sm text-white/56 hover:text-[#d6a84f]"><Mail className="h-4 w-4" />{webPortfolioContact.email}</a><a href={`tel:${webPortfolioContact.phone.replace(/[^+\d]/g, "")}`} className="mb-3 flex items-center gap-3 text-sm text-white/56 hover:text-[#d6a84f]"><Phone className="h-4 w-4" />{webPortfolioContact.phone}</a><p className="flex items-center gap-3 text-sm text-white/56"><MapPin className="h-4 w-4" />{webPortfolioContact.location}</p></div></div><div className="mx-auto mt-8 max-w-[1280px] border-t border-white/10 pt-5 text-center text-xs text-white/38">&copy; 2024 Fusion Ventures. All rights reserved.</div></footer>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
