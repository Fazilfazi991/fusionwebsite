"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gem,
  Gift,
  Globe2,
  Handshake,
  Laptop,
  Mail,
  Menu,
  MousePointer2,
  PenTool,
  Plane,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  WandSparkles
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

type Venture = {
  name: string;
  category: string;
  short: string;
  stripShort: string;
  tagline: string;
  description: string;
  logo: string;
  logoScale: number;
  logoPadding: number;
  logoBackground: string;
  logoObjectFit: "contain";
  logoFilter?: string;
  activeLogoFilter?: string;
  website?: string;
  status?: string;
  accent: string;
  accentRgb: string;
  accentSoft: string;
  accentBorder: string;
  accentGlow: string;
  image: string;
  imagePositionDesktop: string;
  imagePositionTablet: string;
  imagePositionMobile: string;
  imageScale: string;
  overlayStrength: string;
  features: { title: string; text: string; icon: typeof Sparkles }[];
  meta: {
    founded: string;
    model: string;
    market: string;
    positioning: string;
  };
};

const ventures: Venture[] = [
  {
    name: "Dearelle",
    category: "LIFESTYLE & BEAUTY",
    short: "Jewelry that defines you",
    stripShort: "Premium jewelry",
    tagline: "Jewelry that defines you.",
    description:
      "Dearelle creates modern, meaningful jewelry designed to celebrate individuality, emotion, and everyday elegance.",
    logo: "/ventures/logos/dearelle-logo-trimmed.png",
    logoScale: 1.14,
    logoPadding: 7,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    website: "https://dearelle.in",
    accent: "#D9A441",
    accentRgb: "217, 164, 65",
    accentSoft: "rgba(217,164,65,0.12)",
    accentBorder: "rgba(217,164,65,0.42)",
    accentGlow: "rgba(217,164,65,0.34)",
    image: "/ventures/showcase/dearelle-pendant-hero.png",
    imagePositionDesktop: "76% center",
    imagePositionTablet: "72% center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.76",
    features: [
      { title: "Curated Elegance", text: "Thoughtfully selected designs for meaningful moments", icon: Gem },
      { title: "Personal Expression", text: "Jewelry that reflects individual style and stories", icon: Sparkles },
      { title: "Gifting Made Meaningful", text: "Premium gifting experiences for loved ones", icon: Gift }
    ],
    meta: { founded: "2026", model: "D2C", market: "India & GCC", positioning: "Premium Gifting" }
  },
  {
    name: "Occazn",
    category: "OCCASIONS & DIGITAL INVITATIONS",
    short: "Digital experiences for special moments",
    stripShort: "Digital invitations",
    tagline: "One event. One beautiful link.",
    description:
      "Occazn helps people create and share modern digital invitations with RSVP, event details, memories, maps, and guest experiences in one place.",
    logo: "/ventures/logos/occazn-logo-clean.png",
    logoScale: 1.18,
    logoPadding: 7,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    logoFilter: "brightness(1.18) contrast(1.12)",
    website: "https://www.occazn.com",
    accent: "#9B5DE5",
    accentRgb: "155, 93, 229",
    accentSoft: "rgba(155,93,229,0.12)",
    accentBorder: "rgba(155,93,229,0.44)",
    accentGlow: "rgba(155,93,229,0.34)",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1300&q=85",
    imagePositionDesktop: "62% center",
    imagePositionTablet: "56% center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.72",
    features: [
      { title: "Digital Invitations", text: "Mobile-first invitation experiences", icon: PenTool },
      { title: "RSVP Management", text: "Simple guest confirmation and tracking", icon: UsersRound },
      { title: "Event Memories", text: "Photos, timelines, locations, and live moments", icon: Sparkles }
    ],
    meta: { founded: "2026", model: "SaaS", market: "Global", positioning: "Event Technology" }
  },
  {
    name: "Fynta",
    category: "MARKETING & GROWTH",
    short: "Growth marketing for modern brands",
    stripShort: "Growth marketing",
    tagline: "Strategy, creativity, and measurable growth.",
    description:
      "Fynta supports brands with digital strategy, creative campaigns, content, advertising, and performance-driven growth systems.",
    logo: "/ventures/logos/fynta_logo_transparent_cropped.png",
    logoScale: 1.2,
    logoPadding: 6,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    logoFilter: "brightness(2.15) contrast(1.12) saturate(1.2)",
    activeLogoFilter: "brightness(2.65) contrast(1.24) saturate(1.25)",
    website: "https://www.fusionventuresglobal.com/fynta",
    accent: "#7D5AC7",
    accentRgb: "125, 90, 199",
    accentSoft: "rgba(125,90,199,0.12)",
    accentBorder: "rgba(125,90,199,0.44)",
    accentGlow: "rgba(125,90,199,0.34)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1300&q=85",
    imagePositionDesktop: "58% center",
    imagePositionTablet: "center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.76",
    features: [
      { title: "Brand Strategy", text: "Clear positioning and growth direction", icon: Target },
      { title: "Creative Production", text: "Campaigns, content, and visual communication", icon: WandSparkles },
      { title: "Performance Marketing", text: "Data-led advertising focused on results", icon: Rocket }
    ],
    meta: { founded: "2026", model: "B2B Services", market: "UAE & Global", positioning: "Growth Partner" }
  },
  {
    name: "Tarx",
    category: "TECHNOLOGY SOLUTIONS",
    short: "Technology solutions for smarter businesses",
    stripShort: "Digital solutions",
    tagline: "Technology built around real business needs.",
    description:
      "Tarx develops websites, digital platforms, automation tools, and technology solutions for businesses looking to operate and scale smarter.",
    logo: "/ventures/logos/tarx-solutions-logo-trimmed.png",
    logoScale: 1.13,
    logoPadding: 6,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    website: "https://tarx.in",
    accent: "#27C7C9",
    accentRgb: "39, 199, 201",
    accentSoft: "rgba(39,199,201,0.12)",
    accentBorder: "rgba(39,199,201,0.42)",
    accentGlow: "rgba(39,199,201,0.3)",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1300&q=85",
    imagePositionDesktop: "58% center",
    imagePositionTablet: "center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.76",
    features: [
      { title: "Digital Products", text: "Websites, platforms, and custom applications", icon: Laptop },
      { title: "Automation", text: "Systems that reduce manual work", icon: Sparkles },
      { title: "Business Transformation", text: "Technology aligned with operational goals", icon: Rocket }
    ],
    meta: { founded: "2026", model: "B2B Technology", market: "UAE & India", positioning: "Digital Solutions" }
  },
  {
    name: "Resumi",
    category: "CAREER TOOLS",
    short: "Career tools that help people stand out",
    stripShort: "Resume builder",
    tagline: "Build a resume that gets noticed.",
    description:
      "Resumi is an AI-powered resume builder that helps professionals create polished, ATS-friendly resumes and career documents.",
    logo: "/ventures/logos/resumi_logo_transparent_cropped.png",
    logoScale: 1.18,
    logoPadding: 6,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    logoFilter: "brightness(1.16)",
    website: "https://resumi.live",
    accent: "#3B82F6",
    accentRgb: "59, 130, 246",
    accentSoft: "rgba(59,130,246,0.12)",
    accentBorder: "rgba(59,130,246,0.44)",
    accentGlow: "rgba(59,130,246,0.32)",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=85",
    imagePositionDesktop: "58% center",
    imagePositionTablet: "center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.76",
    features: [
      { title: "ATS-Friendly Templates", text: "Professional layouts designed for hiring systems", icon: ShieldCheck },
      { title: "AI Assistance", text: "Smarter writing and content guidance", icon: WandSparkles },
      { title: "Instant PDF Export", text: "Create and download resumes quickly", icon: ExternalLink }
    ],
    meta: { founded: "2026", model: "SaaS", market: "Global", positioning: "Career Technology" }
  },
  {
    name: "Plumlet",
    category: "CREATIVE MARKETPLACE",
    short: "Handmade creativity and artisan products",
    stripShort: "Artisan marketplace",
    tagline: "Made by hands. Built with heart.",
    description:
      "Plumlet connects artisans, makers, and independent creators with people who value original handmade products, creativity, and craftsmanship.",
    logo: "/ventures/logos/plumlet-logo-trimmed.png",
    logoScale: 1.16,
    logoPadding: 7,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    logoFilter: "brightness(1.12)",
    website: "/plumlet",
    accent: "#B56AE6",
    accentRgb: "181, 106, 230",
    accentSoft: "rgba(181,106,230,0.13)",
    accentBorder: "rgba(181,106,230,0.46)",
    accentGlow: "rgba(181,106,230,0.34)",
    image: "/ventures/plumlet_assets_webp/01_hero_creative_composition.webp",
    imagePositionDesktop: "70% center",
    imagePositionTablet: "center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.72",
    features: [
      { title: "Artisan Marketplace", text: "Discover products from independent creators", icon: Search },
      { title: "Handmade Products", text: "Original items with authentic stories", icon: PenTool },
      { title: "Creator Community", text: "Supporting creativity and small businesses", icon: UsersRound }
    ],
    meta: { founded: "2026", model: "Marketplace", market: "India", positioning: "Handmade Commerce" }
  },
  {
    name: "Getaway",
    category: "TRAVEL & EXPERIENCES",
    short: "Curated travel and lifestyle experiences",
    stripShort: "Travel experiences",
    tagline: "Curated experiences worth remembering.",
    description:
      "Getaway is being developed as a travel and lifestyle venture focused on carefully selected journeys, holiday experiences, and memorable destinations.",
    logo: "/ventures/logos/getaway-logo-transparent.png",
    logoScale: 1.04,
    logoPadding: 8,
    logoBackground: "rgba(255,255,255,0.025)",
    logoObjectFit: "contain",
    logoFilter: "brightness(1.08) contrast(1.08)",
    status: "Coming Soon",
    accent: "#42C7B9",
    accentRgb: "66, 199, 185",
    accentSoft: "rgba(66,199,185,0.12)",
    accentBorder: "rgba(66,199,185,0.42)",
    accentGlow: "rgba(66,199,185,0.3)",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1300&q=85",
    imagePositionDesktop: "center bottom",
    imagePositionTablet: "center bottom",
    imagePositionMobile: "center bottom",
    imageScale: "cover",
    overlayStrength: "0.62",
    features: [
      { title: "Curated Travel", text: "Carefully selected travel experiences", icon: Plane },
      { title: "Lifestyle Journeys", text: "Trips designed around people and moments", icon: Sparkles },
      { title: "Seamless Discovery", text: "Easier access to inspiring destinations", icon: Globe2 }
    ],
    meta: { founded: "2026", model: "Travel Platform", market: "UAE & India", positioning: "Curated Travel" }
  },
  {
    name: "Entry Pazz",
    category: "EVENTS & COMMUNITIES",
    short: "Events, access, and communities",
    stripShort: "Events & access",
    tagline: "Unlocking access, events, and opportunities.",
    description:
      "Entry Pazz is being developed as a platform for discovering events, accessing experiences, and building stronger communities around shared interests.",
    logo: "/ventures/logos/entry-pazz-logo-trimmed.png",
    logoScale: 1.2,
    logoPadding: 6,
    logoBackground: "transparent",
    logoObjectFit: "contain",
    logoFilter: "brightness(1.22) contrast(1.12)",
    status: "Coming Soon",
    accent: "#F59E42",
    accentRgb: "245, 158, 66",
    accentSoft: "rgba(245,158,66,0.12)",
    accentBorder: "rgba(245,158,66,0.42)",
    accentGlow: "rgba(245,158,66,0.32)",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1300&q=85",
    imagePositionDesktop: "66% center",
    imagePositionTablet: "center",
    imagePositionMobile: "center",
    imageScale: "cover",
    overlayStrength: "0.72",
    features: [
      { title: "Event Discovery", text: "Find relevant events and experiences", icon: Search },
      { title: "Easy Access", text: "Simplified event entry and participation", icon: MousePointer2 },
      { title: "Community Building", text: "Connect people through shared interests", icon: UsersRound }
    ],
    meta: { founded: "2026", model: "Event Platform", market: "UAE", positioning: "Events & Communities" }
  }
];

const metaItems = [
  { key: "founded", label: "Founded", icon: CalendarDays },
  { key: "model", label: "Business Model", icon: BriefcaseBusiness },
  { key: "market", label: "Market", icon: Globe2 },
  { key: "positioning", label: "Positioning", icon: Target }
] as const;

const pathPoints = [
  { x: 48.7, y: 11 },
  { x: 43, y: 21.5 },
  { x: 35.9, y: 32.5 },
  { x: 35, y: 44 },
  { x: 45.8, y: 56 },
  { x: 37.6, y: 67.5 },
  { x: 41, y: 78.5 },
  { x: 48.1, y: 86 }
];

const ecosystemPath =
  "M55 2 C43 11 38 21 39 31 C40 37 35 40 35 44 C35 49 42 53 43 57 C45 66 35 72 38 79 C41 86 50 87 55 94";

const activePath = "M39 34 C40 39 35 41 35 44 C35 48 40 51 43 54";

function LogoMark() {
  return (
    <a href="/" aria-label="Fusion Ventures home">
      <Image
        src="/fusion-ventures-logo.webp"
        alt="Fusion Ventures"
        width={640}
        height={176}
        priority
        className="h-8 w-auto sm:h-9 lg:h-8"
      />
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#d6a84f]">{children}</p>;
}

function VentureLogo({
  venture,
  active = false,
  size = "md"
}: {
  venture: Venture;
  active?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "h-[90px] w-[90px]" : size === "md" ? "h-14 w-14" : size === "sm" ? "h-[52px] w-[52px]" : "h-11 w-11";

  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border bg-black/55 transition duration-300 ${sizeClass}`}
      style={{
        background: `linear-gradient(${venture.logoBackground}, ${venture.logoBackground}), #080b11`,
        borderColor: "var(--venture-accent-border)",
        boxShadow: active ? "0 0 38px var(--venture-accent-glow), inset 0 0 0 7px rgba(var(--venture-accent-rgb),0.055)" : "0 0 16px var(--venture-accent-glow)"
      }}
    >
      {active && <span className="pointer-events-none absolute inset-[6px] rounded-full border border-[var(--venture-accent-border)]" />}
      <Image
        src={venture.logo}
        alt={`${venture.name} logo`}
        width={120}
        height={72}
        unoptimized
        className="h-full w-full"
        style={{
          objectFit: venture.logoObjectFit,
          padding: venture.logoPadding,
          filter: active ? venture.activeLogoFilter ?? venture.logoFilter : venture.logoFilter,
          transform: `scale(${venture.logoScale})`
        }}
      />
    </span>
  );
}

function MobileNodeSelector({
  activeIndex,
  select,
  previous,
  next
}: {
  activeIndex: number;
  select: (index: number) => void;
  previous: () => void;
  next: () => void;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeItem = refs.current[activeIndex];

    if (!scroller || !activeItem) return;

    const targetLeft = activeItem.offsetLeft - scroller.clientWidth / 2 + activeItem.clientWidth / 2;
    scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div className="mb-4 mt-8 lg:hidden">
      <div ref={scrollerRef} className="no-scrollbar overflow-x-auto overscroll-x-contain scroll-smooth">
        <div className="flex min-w-max gap-3 pr-3">
          {ventures.map((venture, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={venture.name}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                type="button"
                aria-label={`Select ${venture.name}`}
                aria-pressed={isActive}
                onClick={() => select(index)}
                className={`grid w-[82px] shrink-0 justify-items-center gap-2 rounded-2xl border bg-white/[0.035] px-2 py-3 text-center outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-[var(--venture-accent)] ${
                  isActive ? "border-[var(--venture-accent-border)] shadow-[0_0_24px_var(--venture-accent-glow)]" : "border-white/10"
                }`}
              >
                <span
                  style={
                    {
                      "--venture-accent-border": venture.accentBorder,
                      "--venture-accent-glow": venture.accentGlow,
                      "--venture-accent-rgb": venture.accentRgb
                    } as CSSProperties
                  }
                >
                  <VentureLogo venture={venture} active={isActive} size={isActive ? "sm" : "xs"} />
                </span>
                <span className="max-w-full truncate text-[11px] font-semibold text-white">{venture.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-5 rounded-xl border border-white/10 bg-black/28 px-4 py-3">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous venture"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white/80"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="whitespace-nowrap text-sm font-medium tracking-[0.2em] text-white">
          {String(activeIndex + 1).padStart(2, "0")} / {String(ventures.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next venture"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white/80"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function EcosystemNavigator({
  activeIndex,
  select,
  previous,
  next
}: {
  activeIndex: number;
  select: (index: number) => void;
  previous: () => void;
  next: () => void;
}) {
  const active = ventures[activeIndex];
  const count = ventures.length;

  const orderedNodes = useMemo(() => {
    const centerPoint = 3;

    return ventures.map((venture, index) => {
      const distance = (index - activeIndex + count) % count;
      const pointIndex = distance === 0 ? centerPoint : distance <= 4 ? centerPoint + distance : distance - 5;
      return { venture, index, point: pathPoints[pointIndex], isActive: index === activeIndex };
    });
  }, [activeIndex, count]);

  return (
    <aside className="relative hidden h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden border-r border-white/10 lg:grid">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_45%,var(--venture-accent-soft),transparent_34%),radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="relative min-h-0 overflow-hidden px-8 pt-8 xl:px-10">
        <LogoMark />

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={ecosystemPath} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.22" />
          <path
            d={activePath}
            fill="none"
            stroke="var(--venture-accent)"
            strokeLinecap="round"
            strokeWidth="0.34"
            className="opacity-90 transition-[stroke] duration-500"
          />
        </svg>

        <div className="absolute inset-0">
          {orderedNodes.map(({ venture, index, point, isActive }) => (
            <button
              key={venture.name}
              type="button"
              aria-label={`Select ${venture.name}`}
              aria-pressed={isActive}
              onClick={() => select(index)}
              className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center outline-none transition duration-200 hover:z-20 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-[var(--venture-accent)] ${
                isActive ? "z-30 rounded-full" : "z-10"
              }`}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                "--venture-accent": venture.accent,
                "--venture-accent-rgb": venture.accentRgb,
                "--venture-accent-border": venture.accentBorder,
                "--venture-accent-glow": venture.accentGlow,
                "--node-accent": venture.accent
              } as CSSProperties}
            >
              <VentureLogo venture={venture} active={isActive} size={isActive ? "lg" : "md"} />

              {!isActive && (
                <span className="ml-4 flex min-w-[132px] items-center text-left">
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <span className="block text-[14px] font-semibold text-white/78">{venture.name}</span>
                    <span className="mt-0.5 block max-w-[136px] text-[11px] leading-[1.2] text-white/42">{venture.stripShort}</span>
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute left-[calc(35%+69px)] top-[44%] z-40 hidden w-[188px] -translate-y-1/2 rounded-xl border border-[var(--venture-accent-border)] bg-[#11131b]/86 p-4 shadow-[0_0_26px_var(--venture-accent-glow)] backdrop-blur-md xl:block">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--venture-accent)]">Active Venture</p>
            <ExternalLink className="h-3.5 w-3.5 text-white/65" />
          </div>
          <h3 className="mt-3 text-[26px] font-medium leading-none tracking-[-0.035em] text-white">{active.name}</h3>
          <p className="mt-2 line-clamp-2 text-[11px] font-medium leading-4 text-[var(--venture-accent)]">{active.category}</p>
        </div>
      </div>

      <div className="relative z-40 flex min-h-[82px] items-center gap-5 border-t border-white/10 bg-[#070a10]/92 px-8 py-5 backdrop-blur-md xl:px-10">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous venture"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white transition hover:border-[var(--venture-accent)] hover:text-[var(--venture-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--venture-accent)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="whitespace-nowrap text-sm font-medium tracking-[0.22em] text-white">
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next venture"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white transition hover:border-[var(--venture-accent)] hover:text-[var(--venture-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--venture-accent)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function VentureDetail({ active }: { active: Venture }) {
  return (
    <article className="relative bg-[#070a0f] lg:h-full lg:min-h-0 lg:overflow-hidden">
      <div className="absolute inset-0 hidden lg:block">
        <div
          key={active.image}
          role="img"
          aria-label={`${active.name} featured venture image`}
          className="absolute inset-0 bg-cover bg-center transition duration-500"
          style={{ backgroundImage: `url("${active.image}")`, backgroundPosition: active.imagePositionDesktop, backgroundSize: active.imageScale }}
        />
        <div
          className="absolute inset-0 transition duration-500"
          style={{
            background: `linear-gradient(90deg, rgba(5,8,13,0.98) 0%, rgba(5,8,13,${active.overlayStrength}) 44%, rgba(5,8,13,0.3) 68%, rgba(5,8,13,0.08) 100%), radial-gradient(circle at 34% 36%, var(--venture-accent-glow), transparent 38%)`
          }}
        />
      </div>

      <div
        key={`${active.image}-mobile`}
        role="img"
        aria-label={`${active.name} featured venture image`}
        className="aspect-[4/3] bg-cover bg-center lg:hidden"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(5,8,13,0.08), rgba(5,8,13,0.62)), url("${active.image}")`, backgroundPosition: active.imagePositionMobile }}
      />

      <div className="relative z-10 grid gap-5 px-6 py-7 motion-safe:animate-[ventureFade_420ms_cubic-bezier(0.22,1,0.36,1)_both] sm:px-8 lg:h-full lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-3 lg:px-9 lg:py-7 xl:px-10">
        <header className="min-h-0 max-w-[430px] pt-1 lg:pt-4 xl:pt-5">
          <p className="hidden text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--venture-accent)] lg:block">Featured Venture</p>
          <span className="mt-3 hidden h-px w-10 bg-[var(--venture-accent)] lg:block" />
          <p className="mt-4 line-clamp-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--venture-accent)] lg:mt-5">{active.category}</p>
          <h2 className="mt-2 line-clamp-2 max-w-[520px] text-[42px] font-medium leading-[0.96] tracking-[-0.045em] text-white sm:text-[48px] lg:text-[46px] xl:text-[52px]">
            {active.name}
          </h2>
          <p className="mt-2 line-clamp-2 max-w-[430px] text-xl leading-[1.22] text-white sm:text-[22px] lg:text-[20px] xl:text-[22px]">{active.tagline}</p>
          <span className="mt-3 block h-px w-10 bg-[var(--venture-accent)]" />
          <p className="mt-3 line-clamp-4 max-w-[410px] text-[14px] leading-[1.45] text-white/68 lg:line-clamp-3">{active.description}</p>
        </header>

        <section className="min-h-0 max-w-[430px] self-start lg:self-center" aria-label={`${active.name} features`}>
          <div className="grid gap-0">
            {active.features.map(({ title, text, icon: Icon }) => (
              <div key={title} className="grid min-h-[49px] grid-cols-[44px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] py-1.5 last:border-b-0">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--venture-accent-border)] bg-black/28 text-[var(--venture-accent)]">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold leading-5 text-white">{title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[10px] leading-[1.35] text-white/54 xl:text-[11px]">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <footer className="min-h-0">
          <div className="mb-3 flex flex-col gap-2.5 sm:flex-row">
            {active.status ? (
              <span className="inline-flex h-9 min-w-[136px] items-center justify-center rounded-md border border-[var(--venture-accent-border)] bg-[var(--venture-accent-soft)] px-4 text-[12px] font-semibold text-[var(--venture-accent)] shadow-[0_0_22px_var(--venture-accent-glow)]">
                {active.status}
              </span>
            ) : (
              <a
                href={active.website}
                target={active.website?.startsWith("http") ? "_blank" : undefined}
                rel={active.website?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex h-9 min-w-[136px] items-center justify-center gap-2.5 rounded-md bg-[var(--venture-accent)] px-4 text-[12px] font-semibold text-black shadow-[0_0_24px_var(--venture-accent-glow)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--venture-accent)]"
              >
                Visit Website
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
            <a
              href="/#contact"
              className="group inline-flex h-9 min-w-[128px] items-center justify-center gap-2.5 rounded-md border border-white/22 bg-black/20 px-4 text-[12px] font-semibold text-white transition hover:border-[var(--venture-accent-border)] hover:text-[var(--venture-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--venture-accent)]"
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <dl className="grid min-h-[66px] grid-cols-2 gap-y-3 overflow-visible rounded-xl border border-white/12 bg-black/38 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md sm:grid-cols-[0.7fr_1.15fr_1.05fr_1.2fr] lg:min-h-[68px]">
            {metaItems.map(({ key, label, icon: Icon }, index) => (
              <div key={key} className={`flex min-w-0 items-center gap-2 px-2 sm:border-l sm:border-white/10 sm:first:border-l-0 ${index % 2 === 0 ? "pl-0 sm:pl-2" : ""}`}>
                <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--venture-accent-soft)] text-[var(--venture-accent)] xl:grid">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0">
                  <dt className="text-[8px] font-semibold uppercase leading-3 tracking-[0.14em] text-[var(--venture-accent)] xl:text-[9px]">{label}</dt>
                  <dd className="mt-0 line-clamp-2 text-[13px] font-medium leading-[1.15] text-white xl:text-[14px]">{active.meta[key]}</dd>
                </span>
              </div>
            ))}
          </dl>
        </footer>
      </div>
    </article>
  );
}

export default function VenturesShowcaseClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ventures[activeIndex];
  const count = ventures.length;
  const select = (index: number) => setActiveIndex((index + count) % count);
  const previous = () => select(activeIndex - 1);
  const next = () => select(activeIndex + 1);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        previous();
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const accentStyle = {
    "--venture-accent": active.accent,
    "--venture-accent-rgb": active.accentRgb,
    "--venture-accent-soft": active.accentSoft,
    "--venture-accent-border": active.accentBorder,
    "--venture-accent-glow": active.accentGlow
  } as CSSProperties;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#05080d] text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.055),transparent_32%),radial-gradient(circle_at_100%_45%,rgba(255,255,255,0.025),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.28),transparent_18%,transparent_82%,rgba(0,0,0,0.28))]"
      style={accentStyle}
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05080d]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:h-[64px]">
          <LogoMark />
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-white ${
                  item.label === "Ventures" ? "border-b border-[#d6a84f] pb-2 text-[#d6a84f]" : "text-white/70"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/#contact"
            className="hidden h-11 items-center gap-3 rounded-md border border-[#d6a84f]/70 px-5 text-[12px] font-semibold text-[#f0c66c] transition-colors hover:bg-[#d6a84f] hover:text-black sm:inline-flex"
          >
            Partner With Us
            <ExternalLink className="h-3.5 w-3.5" />
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

      <section className="relative z-10 px-5 pb-5 pt-7 sm:px-8 lg:px-10 lg:pb-4 lg:pt-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(circle_at_50%_30%,rgba(214,168,79,0.14),transparent_42%)]" />
        <div className="relative mx-auto max-w-[1380px] text-center">
          <Eyebrow>OUR ECOSYSTEM</Eyebrow>
          <h1 className="mx-auto mt-2 max-w-[840px] text-5xl font-medium leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-[48px] xl:text-[56px] min-[1400px]:text-[61px]">
            One ecosystem.
            <br />
            Infinite possibilities.
          </h1>
          <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.5] text-white/66">
            Fusion Ventures builds, operates, and supports purpose-built ventures that solve real problems and shape what&apos;s next.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-5 pb-7 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-10 h-[720px] bg-[radial-gradient(circle_at_48%_42%,var(--venture-accent-soft),transparent_52%)]" />
        <div className="relative mx-auto max-w-[1380px]">
          <MobileNodeSelector activeIndex={activeIndex} select={select} previous={previous} next={next} />

            <div className="grid overflow-hidden rounded-[24px] border border-white/16 bg-[#080b11] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.42)] transition-colors duration-500 lg:h-[650px] lg:grid-cols-[47%_53%] xl:h-[660px] xl:grid-cols-[48%_52%]">
            <EcosystemNavigator activeIndex={activeIndex} select={select} previous={previous} next={next} />
            <VentureDetail active={active} />
          </div>

          <section className="relative mt-6 overflow-hidden rounded-[22px] border border-white/14 bg-[radial-gradient(circle_at_76%_44%,rgba(214,168,79,0.13),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-6 text-center shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:px-10 lg:py-6">
            <div className="pointer-events-none absolute -left-24 top-[-42%] h-80 w-80 rounded-full border border-transparent border-r-[#d6a84f]/12" />
            <div className="pointer-events-none absolute -right-16 top-[10%] h-72 w-72 rounded-full border border-transparent border-l-[#d6a84f]/12" />
            <div className="pointer-events-none absolute right-[9%] top-[23%] h-44 w-44 rounded-full border border-[#d6a84f]/[0.055]" />
            <span className="pointer-events-none absolute right-[18%] top-[35%] h-10 w-10 rounded-full bg-[radial-gradient(circle_at_30%_28%,#f1ce78,#4e3511_58%,#05080d_72%)] shadow-[0_0_44px_rgba(214,168,79,0.3)]" />
            <div className="relative mx-auto max-w-[720px]">
              <Eyebrow>BUILDING WHAT&apos;S NEXT</Eyebrow>
              <h2 className="mt-2 text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-[42px]">
                Great ventures start with a spark.
                <br />
                We help them go further.
              </h2>
              <p className="mx-auto mt-2 max-w-[590px] text-sm leading-6 text-white/62 sm:text-base">
                Whether you&apos;re an entrepreneur, investor, or strategic partner, let&apos;s create what&apos;s next together.
              </p>
              <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:info@fustionventuresglobal.com"
                  className="group inline-flex items-center justify-center gap-3 rounded-md bg-[#d6a84f] px-9 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#f0ca6b]"
                >
                  Let&apos;s Connect
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-3 rounded-md border border-white/16 px-9 py-4 text-sm font-semibold text-white transition-colors hover:border-[#d6a84f]/70 hover:text-[#d6a84f]"
                >
                  Explore Our Ventures
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black px-5 py-9 sm:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <LogoMark />
          <nav className="flex flex-wrap gap-6 text-sm text-white/58">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#d6a84f]">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3 text-white/72">
            {[UsersRound, BriefcaseBusiness, Mail, Handshake].map((Icon, index) => (
              <span key={index} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1440px] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/42 sm:flex-row sm:justify-between">
          <p>&copy; 2026 Fusion Ventures. All rights reserved.</p>
          <p>Privacy Policy &middot; Terms of Use</p>
        </div>
      </footer>
    </main>
  );
}
