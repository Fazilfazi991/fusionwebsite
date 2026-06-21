"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Diamond,
  Dribbble,
  ExternalLink,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Send,
  ShoppingCart,
  Star,
  X
} from "lucide-react";
import {
  webPortfolioCategories,
  webPortfolioContact,
  webPortfolioMobileOrder,
  webPortfolioStats,
  webProjects,
  type WebPortfolioCategory,
  type WebProject
} from "./webProjects";

const navItems = [
  { label: "About Us", href: "/" },
  { label: "Our Portfolio", href: "/web-portfolio" },
  { label: "Our Edge", href: "/#approach" },
  { label: "Insights", href: "/#sectors" },
  { label: "Careers", href: "/groups" }
];

const statIcons = {
  Globe: Globe2,
  Building2,
  ShoppingCart,
  Star
};

function LogoMark() {
  return (
    <a href="/" className="flex items-center gap-3 leading-none" aria-label="Fusion Ventures home">
      <span className="grid h-9 w-9 place-items-center rounded-sm border border-white/30 bg-white/[0.04] text-xl font-black text-white shadow-[0_0_18px_rgba(255,255,255,0.12)]">
        F
      </span>
      <span>
        <span className="block text-xl font-medium tracking-[0.24em] text-white sm:text-2xl">
          FUSION
        </span>
        <span className="ml-0.5 block text-[9px] font-semibold tracking-[0.42em] text-white/70">
          VENTURES
        </span>
      </span>
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

function GlobeVisual() {
  return (
    <div className="pointer-events-none absolute right-[-18%] top-10 h-[340px] w-[340px] opacity-55 sm:right-[-5%] sm:h-[460px] sm:w-[460px] lg:right-[2%] lg:top-5 lg:h-[620px] lg:w-[620px] lg:opacity-80">
      <div className="absolute inset-0 rounded-full border border-white/12 bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.32),transparent_9%),radial-gradient(circle_at_64%_35%,rgba(255,255,255,0.24),transparent_8%),radial-gradient(circle_at_48%_60%,rgba(255,255,255,0.18),transparent_10%),radial-gradient(circle_at_50%_50%,rgba(214,168,79,0.12),transparent_55%)] shadow-[inset_0_0_80px_rgba(255,255,255,0.06)]" />
      <div className="absolute inset-[8%] rounded-full border border-white/10" />
      <div className="absolute inset-[18%] rounded-full border border-white/8" />
      <div className="absolute left-[8%] top-1/2 h-px w-[84%] -translate-y-1/2 bg-white/18" />
      <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-white/14" />
      <div className="absolute left-[12%] top-[27%] h-px w-[74%] rotate-[-18deg] bg-white/18" />
      <div className="absolute left-[16%] top-[62%] h-px w-[68%] rotate-[16deg] bg-white/14" />
      {[18, 28, 42, 56, 68, 78].map((left, index) => (
        <span
          key={left}
          className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]"
          style={{ left: `${left}%`, top: `${index % 2 ? 36 : 58}%` }}
        />
      ))}
    </div>
  );
}

function PreviewArt({
  project,
  priority = false
}: {
  project: WebProject;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#101114]">
      <Image
        src={project.image}
        alt={`${project.title} website preview`}
        fill
        priority={priority}
        unoptimized
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
      />
    </div>
  );
}

function MobileProjectRow({
  project,
  index,
  onOpen
}: {
  project: WebProject;
  index: number;
  onOpen: (project: WebProject) => void;
}) {
  const isGold = index % 2 === 0;

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Preview ${project.title}`}
      className={`group grid h-[128px] w-full grid-cols-[56%_44%] overflow-hidden rounded-xl border bg-[#070809] text-left outline-none transition-transform active:scale-[0.99] sm:h-[146px] sm:grid-cols-[58%_42%] ${
        isGold
          ? "border-[#d6a84f]/75 shadow-[0_0_18px_rgba(214,168,79,0.13),inset_0_0_0_1px_rgba(214,168,79,0.14)]"
          : "border-white/55 shadow-[0_0_16px_rgba(230,230,230,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
      } focus-visible:ring-2 focus-visible:ring-[#d6a84f]`}
    >
      <div className="relative overflow-hidden border-r border-white/10 bg-[#101114]">
        <Image
          src={project.image}
          alt={`${project.title} website preview`}
          fill
          unoptimized
          sizes="58vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_42px] items-stretch sm:grid-cols-[minmax(0,1fr)_52px]">
        <div className="flex min-w-0 flex-col justify-center px-3 py-2 sm:px-5">
          <span className={`text-[11px] font-semibold ${isGold ? "text-[#d6a84f]" : "text-white/60"}`}>
            {String(project.number).padStart(2, "0")}
          </span>
          <h2 className="mt-1 line-clamp-3 font-serif text-[17px] leading-[1.02] text-white sm:text-2xl">
            {project.title}
          </h2>
          <p className={`mt-2 truncate text-[11px] font-medium sm:text-sm ${isGold ? "text-[#d6a84f]" : "text-white/62"}`}>
            {project.industry}
          </p>
        </div>
        <div className="grid place-items-center border-l border-white/10">
          <span className={`grid h-8 w-8 place-items-center rounded-full border sm:h-10 sm:w-10 ${isGold ? "border-[#d6a84f]/75 text-[#d6a84f]" : "border-white/55 text-white/75"}`}>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>
      </div>
    </button>
  );
}

function ProjectCard({ project, index, onOpen }: { project: WebProject; index: number; onOpen: (project: WebProject) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Preview ${project.title}`}
      className="group min-w-0 overflow-hidden rounded-[14px] border border-white/12 bg-white/[0.035] text-left shadow-[0_16px_50px_rgba(0,0,0,0.26)] outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a84f]/55 focus-visible:border-[#d6a84f] focus-visible:ring-2 focus-visible:ring-[#d6a84f]/35"
    >
      <PreviewArt project={project} priority={index < 4} />
      <div className="flex min-h-[64px] items-center justify-between gap-2 border-t border-white/[0.08] bg-[#08090b]/95 px-3 py-3 lg:min-h-[76px] lg:gap-4 lg:px-4 lg:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden h-8 w-8 shrink-0 place-items-center rounded border border-[#d6a84f]/35 bg-black/18 text-[13px] font-medium text-white/86 lg:grid">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white lg:text-base lg:tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="mt-1 truncate text-xs text-white/48 lg:text-sm">{project.industry}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#d6a84f] transition-transform group-hover:translate-x-1.5 lg:h-5 lg:w-5" />
      </div>
    </button>
  );
}

function ProjectPreview({ project, onClose }: { project: WebProject; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#030405]/98" role="dialog" aria-modal="true" aria-labelledby="project-preview-title">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4">
          <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white hover:border-[#d6a84f] hover:text-[#d6a84f]" aria-label="Close project preview">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h2 id="project-preview-title" className="truncate font-serif text-xl text-white sm:text-2xl">{project.title}</h2>
            <p className="truncate text-xs text-[#d6a84f] sm:text-sm">{project.industry}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-3 pb-28 pt-4 sm:px-8 sm:pt-8">
        <div className="overflow-hidden rounded-lg border border-white/12 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
          {/* Full captures have variable heights, so a native image preserves their intrinsic aspect ratio. */}
          <img src={project.fullImage} alt={`${project.title} full homepage preview`} className="block h-auto w-full" />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/90 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[720px] gap-3">
          <button type="button" onClick={onClose} className="hidden h-[52px] flex-1 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-white sm:flex">Close Preview</button>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex h-[52px] flex-1 items-center justify-center gap-3 rounded-md bg-[#d6a84f] px-6 text-sm font-bold text-black transition-colors hover:bg-[#efc86f]">
            Open Website <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WebPortfolioClient() {
  const [activeCategory, setActiveCategory] = useState<WebPortfolioCategory>("All Projects");
  const [selectedProject, setSelectedProject] = useState<WebProject | null>(null);
  const filteredProjects = useMemo(
    () =>
      activeCategory === "All Projects"
        ? webProjects
        : webProjects.filter((project) => project.tags.includes(activeCategory)),
    [activeCategory]
  );
  const mobileProjects = useMemo(() => {
    const order = new Map<string, number>(webPortfolioMobileOrder.map((title, index) => [title, index]));
    return [...filteredProjects].sort(
      (first, second) => (order.get(first.title) ?? 99) - (order.get(second.title) ?? 99)
    );
  }, [filteredProjects]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#030405] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-10 lg:px-14">
          <LogoMark />
          <nav className="hidden items-center gap-12 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#d6a84f] ${
                  item.label === "Our Portfolio" ? "border-b-2 border-[#d6a84f] pb-2 text-white" : "text-white/72"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${webPortfolioContact.email}`}
            className="hidden items-center gap-3 rounded-md border border-[#d6a84f]/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d6a84f] hover:text-black sm:inline-flex"
          >
            Let&apos;s Connect
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            className="grid h-11 w-11 place-items-center rounded-md border border-[#d6a84f]/45 text-[#d6a84f] lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="mobile-nav-motion lg:hidden" />
      </header>

      <section className="relative px-5 pb-6 pt-10 sm:px-10 lg:px-14 lg:pb-5 lg:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(255,255,255,0.1),transparent_30%),linear-gradient(180deg,#090a0c_0%,#030405_78%)]" />
        <div className="hidden lg:block"><GlobeVisual /></div>
        <div className="relative mx-auto max-w-[1280px]">
          <div className="max-w-[620px] pt-1 lg:pt-10">
            <div className="lg:hidden">
              <p className="flex items-center gap-4 text-xs font-semibold uppercase text-[#d6a84f]">
                Our Work <span className="h-px w-9 bg-[#d6a84f]" />
              </p>
              <h1 className="mt-4 max-w-[360px] font-serif text-[35px] leading-[1.06] text-white sm:text-5xl">
                Digital experiences that define brands<span className="text-[#d6a84f]">.</span>
              </h1>
              <p className="mt-4 max-w-[390px] text-[15px] leading-6 text-white/58">
                A curated selection of websites we&apos;ve designed and developed for ambitious brands.
              </p>
            </div>
            <div className="hidden lg:block">
              <Eyebrow>Our Portfolio</Eyebrow>
              <h1 className="mt-5 text-7xl font-semibold leading-[0.96] tracking-[-0.04em] text-white">
                Websites We&apos;ve Built
              </h1>
              <p className="mt-6 max-w-[590px] text-lg leading-8 text-white/70">
                We design and develop high-performing websites that combine strategic thinking, modern
                design, and seamless functionality to help brands grow online.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 hidden grid-cols-2 gap-3 sm:grid lg:mt-10 lg:grid-cols-4">
            {webPortfolioStats.map((stat) => {
              const Icon = statIcons[stat.icon];
              return (
                <article key={stat.label} className="rounded-lg border border-white/12 bg-white/[0.035] p-4 backdrop-blur-md sm:p-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d6a84f]/36 text-[#d6a84f]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-xs text-white/58">{stat.label}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-3 sm:px-10 lg:px-14 lg:pt-8">
        <div className="mx-auto max-w-[1560px]">
          <div className="-mx-5 mb-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:overflow-visible">
            {webPortfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`h-11 min-w-max rounded-full border px-5 text-sm font-medium transition-colors lg:min-w-0 lg:flex-1 ${
                  activeCategory === category
                    ? "border-[#d6a84f]/70 bg-[#d6a84f]/12 text-[#f2d083]"
                    : "border-white/16 bg-white/[0.02] text-white/72 hover:border-[#d6a84f]/55 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-3 lg:hidden">
            {mobileProjects.map((project, index) => (
              <MobileProjectRow key={project.title} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </div>

          <div className="hidden grid-cols-3 gap-5 lg:grid xl:grid-cols-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 overflow-hidden rounded-xl border border-white/12 bg-[linear-gradient(120deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)),radial-gradient(circle_at_88%_50%,rgba(214,168,79,0.16),transparent_34%)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d6a84f]/60 text-[#d6a84f]">
              <Send className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-3xl font-medium tracking-[-0.04em] text-white">Have a project in mind?</h2>
              <p className="mt-1 text-base text-white/62">Let&apos;s build something exceptional together.</p>
            </div>
          </div>
          <a
            href={`mailto:${webPortfolioContact.email}`}
            className="inline-flex items-center justify-center gap-4 rounded-md border border-[#d6a84f]/70 px-8 py-4 font-semibold text-[#d6a84f] transition-colors hover:bg-[#d6a84f] hover:text-black"
          >
            Let&apos;s Connect
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-9 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <LogoMark />
            <p className="mt-5 max-w-[260px] text-sm leading-6 text-white/50">
              Building digital experiences that drive brands forward.
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Instagram, Dribbble, MousePointer2].map((Icon, index) => (
                <span key={index} className="grid h-8 w-8 place-items-center rounded-full border border-white/14 text-white/72">
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            {["About Us", "Our Portfolio", "Our Edge", "Careers"].map((item) => (
              <a key={item} href="#" className="mb-3 block text-sm text-white/52 hover:text-[#d6a84f]">
                {item}
              </a>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
            {["Insights", "Case Studies", "Blog"].map((item) => (
              <a key={item} href="#" className="mb-3 block text-sm text-white/52 hover:text-[#d6a84f]">
                {item}
              </a>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="mb-3 block text-sm text-white/52 hover:text-[#d6a84f]">
                {item}
              </a>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h3>
            <a href={`mailto:${webPortfolioContact.email}`} className="mb-3 flex items-center gap-3 text-sm text-white/56 hover:text-[#d6a84f]">
              <Mail className="h-4 w-4" />
              {webPortfolioContact.email}
            </a>
            <a href={`tel:${webPortfolioContact.phone.replace(/[^+\d]/g, "")}`} className="mb-3 flex items-center gap-3 text-sm text-white/56 hover:text-[#d6a84f]">
              <Phone className="h-4 w-4" />
              {webPortfolioContact.phone}
            </a>
            <p className="flex items-center gap-3 text-sm text-white/56">
              <MapPin className="h-4 w-4" />
              {webPortfolioContact.location}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1280px] border-t border-white/10 pt-5 text-center text-xs text-white/38">
          &copy; 2024 Fusion Ventures. All rights reserved.
        </div>
      </footer>

      {selectedProject && (
        <ProjectPreview project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  );
}
