"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
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
  Star
} from "lucide-react";
import {
  webPortfolioCategories,
  webPortfolioContact,
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

function PreviewArt({ project, featured = false }: { project: WebProject; featured?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const subject = project.preview.subject;

  if (!imageFailed) {
    return (
      <div
        className={`relative overflow-hidden bg-[#0b0d0f] ${
          featured ? "h-[240px] sm:h-[300px]" : "aspect-[16/8.7]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.title} website homepage preview`}
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
          onError={() => setImageFailed(true)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74),rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.36)),linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.76))]" />
        <div
          className={`absolute bottom-6 left-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
            featured ? "max-w-[58%] sm:max-w-[54%]" : "max-w-[66%]"
          }`}
        >
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/78">
            {project.preview.kicker}
          </p>
          <p
            className={`${
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            } font-semibold leading-[0.95] tracking-[-0.04em]`}
          >
            {project.preview.headline}
          </p>
          {featured && (
            <span className="mt-5 inline-flex items-center gap-3 rounded-md border border-white/28 bg-black/34 px-4 py-3 text-[11px] font-semibold">
              {project.preview.cta}
              <ArrowRight className="h-3.5 w-3.5 text-[#d6a84f]" />
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${project.preview.palette} ${
        featured ? "h-[240px] sm:h-[300px]" : "aspect-[16/8.7]"
      }`}
    >
      <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-between border-b border-black/10 bg-white/86 px-3 text-[7px] font-bold uppercase tracking-[0.12em] text-black/45">
        <span>{project.title}</span>
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
        </span>
      </div>
      <div className="absolute inset-0 top-8 bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_42%),radial-gradient(circle_at_78%_34%,rgba(255,255,255,0.32),transparent_23%)]" />

      {(subject === "building" || subject === "business" || subject === "hotel") && (
        <div className="absolute bottom-0 right-0 h-[68%] w-[58%]">
          <div className="absolute bottom-0 right-4 h-[74%] w-[78%] skew-x-[-12deg] border border-white/16 bg-black/46 shadow-2xl">
            <div className="grid h-full grid-cols-4 gap-1 p-3">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className="bg-[#f5c56a]/55" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-2 h-[40%] w-[72%] border border-white/12 bg-black/35" />
        </div>
      )}

      {subject === "seafood" && (
        <>
          <div className="absolute bottom-7 right-[-9%] h-[54%] w-[42%] rounded-full bg-white shadow-2xl" />
          <div className="absolute bottom-14 right-[3%] flex rotate-[-12deg] gap-1.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="h-5 w-12 rounded-full bg-[#e26b36] shadow-md" />
            ))}
          </div>
          <div className="absolute bottom-8 left-[50%] h-16 w-24 rounded-t-full border-x border-t border-white/42 bg-white/10" />
        </>
      )}

      {subject === "pet" && (
        <div className="absolute bottom-4 right-8 grid h-28 w-28 place-items-center rounded-full bg-[#c98543] shadow-2xl">
          <span className="h-12 w-12 rounded-full bg-[#f2d7a9]" />
          <span className="absolute left-3 top-6 h-10 w-7 rounded-full bg-[#8b5727]" />
          <span className="absolute right-3 top-6 h-10 w-7 rounded-full bg-[#8b5727]" />
        </div>
      )}

      {subject === "beauty" && (
        <div className="absolute bottom-5 right-8 flex items-end gap-3">
          {[44, 68, 56].map((height, index) => (
            <span key={height} className="w-6 rounded-t-lg bg-white/82 shadow-xl" style={{ height }} />
          ))}
        </div>
      )}

      {(subject === "education" || subject === "medical") && (
        <div className="absolute bottom-5 right-7 flex gap-3">
          <span className="h-24 w-16 rounded-t-full bg-white/82 shadow-xl" />
          <span className="h-24 w-16 rounded-t-full bg-white/70 shadow-xl" />
        </div>
      )}

      {subject === "fashion" && (
        <div className="absolute bottom-0 right-8 flex items-end gap-3">
          <span className="h-28 w-16 rounded-t-full bg-[#22110f] shadow-xl" />
          <span className="h-36 w-20 rounded-t-full bg-[#a64b35] shadow-xl" />
        </div>
      )}

      {subject === "saas" && (
        <div className="absolute bottom-8 right-8 h-28 w-44 rounded-lg border border-white/50 bg-white/84 p-3 shadow-2xl">
          <div className="mb-3 h-3 w-24 rounded bg-[#1d60e8]/70" />
          <div className="grid grid-cols-3 gap-2">
            <span className="h-12 rounded bg-[#1d60e8]/18" />
            <span className="h-12 rounded bg-[#1d60e8]/32" />
            <span className="h-12 rounded bg-[#1d60e8]/18" />
          </div>
        </div>
      )}

      {subject === "truck" && (
        <div className="absolute bottom-6 right-5 h-24 w-48 rounded-md bg-[#dadada] shadow-2xl">
          <span className="absolute bottom-[-10px] left-8 h-8 w-8 rounded-full bg-black" />
          <span className="absolute bottom-[-10px] right-8 h-8 w-8 rounded-full bg-black" />
          <span className="absolute right-0 top-8 h-12 w-16 bg-[#202020]" />
        </div>
      )}

      {subject === "lighting" && (
        <div className="absolute right-12 top-10 flex gap-4">
          {[70, 92, 58].map((height) => (
            <span key={height} className="w-px bg-[#e8be79]/70" style={{ height }}>
              <span className="mt-full block h-10 w-10 -translate-x-1/2 rounded-full bg-[#e8be79]/70 blur-sm" />
            </span>
          ))}
        </div>
      )}

      {subject === "yoga" && (
        <div className="absolute bottom-4 right-12 grid h-28 w-28 place-items-end">
          <span className="mx-auto h-20 w-16 rounded-t-full bg-[#2f302d]/70" />
          <span className="absolute bottom-0 h-4 w-32 rounded-full bg-[#2f302d]/55" />
        </div>
      )}

      {subject === "restaurant" && (
        <div className="absolute bottom-4 right-8 h-28 w-28 rounded-full border-[14px] border-white/85 bg-[#a33b18] shadow-2xl" />
      )}

      {subject === "print" && (
        <div className="absolute bottom-8 right-4 flex rotate-[-10deg] gap-2">
          {["#0ca4ff", "#f72585", "#33cc66", "#111111"].map((color) => (
            <span key={color} className="h-20 w-28 rounded-md shadow-2xl" style={{ backgroundColor: color }} />
          ))}
        </div>
      )}

      <div
        className={`absolute bottom-6 left-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
          featured ? "max-w-[56%] sm:max-w-[54%]" : "max-w-[62%]"
        }`}
      >
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/78">
          {project.preview.kicker}
        </p>
        <p className={`${featured ? "text-2xl sm:text-3xl" : "text-lg"} font-semibold leading-[0.95] tracking-[-0.04em]`}>
          {project.preview.headline}
        </p>
        {featured && (
          <span className="mt-5 inline-flex items-center gap-3 rounded-md border border-white/22 bg-black/24 px-4 py-3 text-[11px] font-semibold">
            {project.preview.cta}
            <ArrowRight className="h-3.5 w-3.5 text-[#d6a84f]" />
          </span>
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: WebProject }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-lg border border-white/12 bg-[#0b0d0f] shadow-[0_22px_80px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a84f]/70 hover:shadow-[0_24px_90px_rgba(214,168,79,0.14)]"
    >
      <PreviewArt project={project} featured />
      <div className="flex items-center justify-between border-t border-white/10 bg-[#090a0b] px-5 py-4">
        <div>
          <h3 className="text-xl font-medium tracking-[-0.03em] text-white">{project.title}</h3>
          <p className="mt-1 text-sm text-white/54">{project.industry}</p>
        </div>
        <ExternalLink className="h-5 w-5 text-[#d6a84f] transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  );
}

function ProjectCard({ project }: { project: WebProject }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group min-w-0 overflow-hidden rounded-lg border border-white/12 bg-[#090a0b] shadow-[0_16px_50px_rgba(0,0,0,0.26)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a84f]/55"
    >
      <PreviewArt project={project} />
      <div className="flex min-h-[74px] items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium tracking-[-0.02em] text-white sm:text-base">
            {project.title}
          </h3>
          <p className="mt-1 truncate text-xs text-white/48">{project.industry}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#d6a84f] transition-transform group-hover:translate-x-1.5" />
      </div>
    </a>
  );
}

export default function WebPortfolioClient() {
  const [activeCategory, setActiveCategory] = useState<WebPortfolioCategory>("All");
  const featuredProjects = webProjects.filter((project) => project.featured);
  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? webProjects
        : webProjects.filter((project) => project.tags.includes(activeCategory)),
    [activeCategory]
  );

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
        <GlobeVisual />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="max-w-[620px] pt-2 sm:pt-8 lg:pt-10">
            <Eyebrow>Our Portfolio</Eyebrow>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Websites We&apos;ve Built
            </h1>
            <p className="mt-6 max-w-[590px] text-lg leading-8 text-white/70">
              We design and develop high-performing websites that combine strategic thinking, modern
              design, and seamless functionality to help brands grow online.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:grid-cols-4">
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

      <section className="relative px-5 py-4 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-4 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 pt-3 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="-mx-5 mb-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:overflow-visible">
            {webPortfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`h-11 min-w-[132px] rounded-full border px-5 text-sm font-medium transition-colors lg:min-w-0 lg:flex-1 ${
                  activeCategory === category
                    ? "border-white bg-white text-black"
                    : "border-white/16 bg-white/[0.02] text-white/78 hover:border-[#d6a84f]/55 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
            <span className="inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-full border border-white/16 text-sm text-white/78 lg:hidden">
              More
              <ChevronDown className="h-4 w-4" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
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
          © 2024 Fusion Ventures. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
