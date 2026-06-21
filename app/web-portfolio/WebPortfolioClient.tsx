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
      className={`group relative mx-auto grid h-[150px] w-[calc(100%_-_32px)] grid-cols-[54%_46%] overflow-hidden rounded-[18px] border bg-[#050505] text-left outline-none transition-transform active:scale-[0.99] max-[379px]:h-[144px] max-[379px]:w-[calc(100%_-_24px)] max-[379px]:grid-cols-[52%_48%] ${
        isGold
          ? "border-[#d6a84f]/75 shadow-[0_0_0_1px_rgba(214,168,79,0.12),0_12px_40px_rgba(214,168,79,0.08)]"
          : "border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(255,255,255,0.05)]"
      } focus-visible:ring-2 focus-visible:ring-[#d6a84f]`}
    >
      <div className="relative min-h-0 overflow-hidden bg-[#101114]">
        <Image
          src={project.image}
          alt={`${project.title} website preview`}
          fill
          unoptimized
          sizes="54vw"
          className="block object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_38px] items-stretch gap-x-2 overflow-hidden px-3 py-3.5 sm:px-3.5">
        <div className="flex min-w-0 flex-col justify-center overflow-hidden">
          <h2 className="line-clamp-3 max-w-full overflow-hidden font-display text-[17px] font-medium leading-[1.08] text-white max-[379px]:text-[16px]">
            {project.title}
          </h2>
          <p className="mt-2 truncate text-[13px] font-medium leading-[1.2] text-[#d6a84f]">
            {project.industry}
          </p>
        </div>
        <div className="grid h-full place-items-center border-l border-white/[0.08] pl-2">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${isGold ? "border-[#d6a84f]/75 text-[#d6a84f]" : "border-white/55 text-white/75"}`}>
            <ArrowRight className="h-[18px] w-[18px]" />
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
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-semibold text-white lg:text-base">
              {project.title}
            </h3>
            <p className="mt-1 truncate text-xs text-[#d6a84f] lg:text-sm">{project.industry}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#d6a84f] transition-transform group-hover:translate-x-1.5 lg:h-5 lg:w-5" />
      </div>
    </button>
  );
}

function ProjectPreview({ project, onClose }: { project: WebProject; onClose: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const previewImage = project.fullImage || project.image;

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    if (!project.fullImage && process.env.NODE_ENV !== "production") {
      console.warn(`Missing full preview image for ${project.title}. Falling back to card image.`);
    }
  }, [project]);

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
    <div className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-[#030303]" role="dialog" aria-modal="true" aria-labelledby="project-preview-title">
      <header className="z-30 max-h-24 shrink-0 border-b border-white/[0.08] bg-[#030303]/95 px-5 pb-4 pt-[max(16px,env(safe-area-inset-top))] backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-[1100px] items-center gap-4">
          <button type="button" onClick={onClose} className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/18 text-white transition-colors hover:border-[#d6a84f] hover:text-[#d6a84f] sm:h-12 sm:w-12" aria-label="Close project preview">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h2 id="project-preview-title" className="truncate font-display text-[28px] font-medium leading-none text-white sm:text-3xl">{project.title}</h2>
            <p className="mt-2 truncate text-lg font-medium leading-none text-[#d6a84f] sm:text-sm">{project.industry}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain bg-[#050505] px-3 pb-[calc(110px+env(safe-area-inset-bottom))] pt-4 [-webkit-overflow-scrolling:touch] sm:px-8 sm:pb-32 sm:pt-8">
        <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-xl border border-white/14 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] lg:max-w-[1100px]">
          {!isLoaded && !hasError && (
            <div className="grid min-h-[420px] place-items-center bg-[linear-gradient(110deg,#0b0b0c_8%,#161719_18%,#0b0b0c_33%)] bg-[length:200%_100%] text-sm font-semibold uppercase tracking-[0.16em] text-white/50 animate-pulse">
              Loading preview...
            </div>
          )}
          {hasError ? (
            <div className="grid min-h-[420px] place-items-center bg-[#08090b] px-8 text-center">
              <p className="max-w-[320px] text-base leading-7 text-white/68">
                Preview unavailable. You can still open the live website.
              </p>
            </div>
          ) : (
            /* Full captures have variable heights, so a native image preserves their intrinsic aspect ratio. */
            <img
              key={previewImage}
              src={previewImage}
              alt={`${project.title} full homepage preview`}
              className={`block h-auto w-full transition-opacity duration-300 ${isLoaded ? "opacity-100" : "h-0 opacity-0"}`}
              loading="eager"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#030303]/96 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[720px] gap-3">
          <button type="button" onClick={onClose} className="hidden h-[52px] flex-1 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-white sm:flex">Close Preview</button>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[10px] bg-[#d6a84f] px-6 text-lg font-bold text-[#050505] transition-colors hover:bg-[#efc86f] sm:h-[52px] sm:text-sm">
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

      <section className="relative px-5 pb-3 pt-7 sm:px-10 sm:pt-9 lg:px-14 lg:pb-5 lg:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(255,255,255,0.1),transparent_30%),linear-gradient(180deg,#090a0c_0%,#030405_78%)]" />
        <div className="hidden lg:block"><GlobeVisual /></div>
        <div className="relative mx-auto max-w-[1280px]">
          <div className="max-w-[620px] pt-1 lg:pt-10">
            <div className="lg:hidden">
              <p className="flex items-center gap-4 text-xs font-semibold uppercase text-[#d6a84f]">
                Our Work <span className="h-px w-9 bg-[#d6a84f]" />
              </p>
              <h1 className="mt-3 max-w-[340px] font-display text-[30px] font-medium leading-[1.08] text-white sm:text-[40px]">
                Digital experiences that define brands<span className="text-[#d6a84f]">.</span>
              </h1>
              <p className="mt-3 max-w-[370px] text-[14px] leading-[1.55] text-white/58">
                A curated selection of websites we&apos;ve designed and developed for ambitious brands.
              </p>
            </div>
            <div className="hidden lg:block">
              <Eyebrow>Our Portfolio</Eyebrow>
              <h1 className="mt-5 font-display text-7xl font-semibold leading-[0.96] text-white">
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
          <div className="-mx-5 mb-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:overflow-visible">
            {webPortfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`h-11 min-w-max snap-start rounded-full border px-5 text-sm font-medium transition-colors lg:min-w-0 lg:flex-1 ${
                  activeCategory === category
                    ? "border-[#d6a84f]/70 bg-[#d6a84f]/12 text-[#f2d083]"
                    : "border-[#d6a84f]/30 bg-white/[0.02] text-[#d6a84f] hover:border-[#d6a84f]/70 hover:bg-[#d6a84f]/8"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="-mx-5 space-y-4 overflow-hidden lg:hidden">
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
              <h2 className="font-display text-3xl font-medium text-white">Have a project in mind?</h2>
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
