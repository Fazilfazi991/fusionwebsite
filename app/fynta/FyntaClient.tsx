"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Diamond,
  Dribbble,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X
} from "lucide-react";
import { webPortfolioContact } from "../web-portfolio/webProjects";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Fynta", href: "/fynta" },
  { label: "Contact", href: "/#contact" }
];

const filters = ["All", "Website", "SEO", "Ad / Video", "Social", "Product", "Campaign", "Branding"];

const featuredStories = [
  {
    title: "Verde Organics",
    type: "360 Campaign",
    text: "A full-funnel launch campaign built for awareness, engagement and conversion.",
    image: "/images/web-portfolio/cards/hydrelle-skincare.webp",
    tags: ["All", "Campaign", "Branding", "Social"]
  },
  {
    title: "Ignite Fitness",
    type: "Performance Campaign",
    text: "Scaling memberships through data-driven ads and creative storytelling.",
    image: "/images/web-portfolio/cards/n-universal-yoga.webp",
    tags: ["All", "Campaign", "Ad / Video", "Social"]
  },
  {
    title: "Nomad Watches",
    type: "Product Launch",
    text: "Global launch strategy with influencer and paid media.",
    image: "/images/web-portfolio/cards/lumora.webp",
    tags: ["All", "Product", "Campaign", "Branding"]
  }
];

const websiteProjects = [
  {
    title: "Aurora Living",
    subtitle: "Website redesign / e-commerce experience",
    image: "/images/web-portfolio/cards/harven-llc.webp"
  },
  {
    title: "Bare Skincare",
    subtitle: "Beauty e-commerce website",
    image: "/images/web-portfolio/cards/hydrelle-skincare.webp"
  },
  {
    title: "Atlas Coffee",
    subtitle: "Brand website / product storytelling",
    image: "/images/web-portfolio/cards/aqsa-print.webp"
  }
];

const videos = [
  ["Verde Organics", "Brand Film", "/images/web-portfolio/cards/hydrelle-skincare.webp"],
  ["Ignite Fitness", "Ad Campaign", "/images/web-portfolio/cards/n-universal-yoga.webp"],
  ["Nomad Watches", "Product Launch Film", "/images/web-portfolio/cards/lumora.webp"],
  ["Atlas Coffee", "Social Ad Series", "/images/web-portfolio/cards/boat-seafood.webp"]
];

const products = [
  ["Bare Skincare", "Product information page", "/images/web-portfolio/cards/hydrelle-skincare.webp"],
  ["Verde Organics", "Product campaign", "/images/web-portfolio/cards/pet-basket-store.webp"],
  ["Nomad Watches", "Product detail story", "/images/web-portfolio/cards/lumora.webp"],
  ["Atlas Coffee", "Packaging storytelling", "/images/web-portfolio/cards/aqsa-print.webp"]
];

const impact = [
  ["120+", "Brands Partnered", BriefcaseBusiness],
  ["250+", "Campaigns Launched", Target],
  ["$85M+", "Revenue Generated", TrendingUp],
  ["4.9X", "Avg. ROAS", BarChart3],
  ["98%", "Client Retention Rate", ShieldCheck]
];

const services = [
  ["Strategy", "Research, positioning and growth plans that set the foundation.", Sparkles],
  ["Creative", "Branding, content and design that capture attention and inspire action.", Diamond],
  ["Performance", "Paid media and CRO programs built to maximize ROI.", TrendingUp],
  ["SEO", "Technical SEO, content and link strategies that drive sustainable traffic.", Search],
  ["Social", "Social strategy, content and community management that builds loyalty.", Globe2],
  ["Analytics", "Tracking, reporting and insights that inform smarter decisions.", BarChart3]
];

const brandLogos = ["Aurora Living", "Ignite Fitness", "Nomad", "bare.", "Verde Organics", "atlas coffee"];

const testimonials = [
  [
    "Fynta transformed our digital presence and helped us scale faster than we imagined. True strategic partners.",
    "Lisa M., CEO, Verde Organics"
  ],
  [
    "The creativity, the execution, the results - they overdeliver every single time.",
    "Dan R., Founder, Ignite Fitness"
  ],
  [
    "Our online sales grew 4X in 90 days. Fynta knows how to drive real ROI.",
    "Mark S., COO, Nomad Watches"
  ]
];

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

function DarkLogoMark() {
  return (
    <Image
      src="/fusion-ventures-logo-original.webp"
      alt="Fusion Ventures"
      width={640}
      height={176}
      priority
      className="h-8 w-auto sm:h-9"
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#9c7738]">
      {children}
    </p>
  );
}

function EditorialSidebar({
  title,
  text,
  cta
}: {
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <aside className="border-b border-[#1a1712]/12 pb-6 lg:border-b-0 lg:pb-0">
      <h2 className="whitespace-pre-line font-serif text-3xl font-normal uppercase leading-[0.98] tracking-[-0.035em] text-[#15120e] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 max-w-[290px] text-[15px] leading-7 text-black/62">{text}</p>
      <a
        href="#contact"
        className="group mt-7 inline-flex items-center gap-3 border-b border-[#b99047] pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#15120e]"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </a>
    </aside>
  );
}

function ImageCard({
  title,
  type,
  text,
  image,
  large = false
}: {
  title: string;
  type: string;
  text: string;
  image: string;
  large?: boolean;
}) {
  return (
    <article className={`group relative overflow-hidden border border-[#1a1712]/12 bg-[#f5efe4] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#b99047]/70 ${large ? "min-h-[390px]" : "min-h-[300px]"}`}>
      <Image
        src={image}
        alt={title}
        fill
        unoptimized
        sizes="(min-width: 1024px) 30vw, 90vw"
        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
      />
      <div className="absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(180deg,transparent,rgba(7,6,5,0.76))]" />
      <div className="absolute inset-x-5 bottom-5 bg-[#f6f0e7]/94 p-5 backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a9823f]">{type}</p>
        <h3 className="mt-2 font-serif text-2xl leading-none text-[#15120e] transition-transform duration-500 group-hover:-translate-y-0.5">{title}</h3>
        <p className="mt-3 text-[13px] leading-6 text-black/64">{text}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#15120e]">
          View Case <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#b99047] transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}

export default function FyntaClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [websiteIndex, setWebsiteIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [heroMotion, setHeroMotion] = useState({ x: 0, y: 0 });
  const [hoveredHeroItem, setHoveredHeroItem] = useState<string | null>(null);
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const canAnimateHeroRef = useRef(false);
  const heroFrameRef = useRef<number | null>(null);
  const filterTimerRef = useRef<number | null>(null);

  const filteredStories = useMemo(
    () => featuredStories.filter((story) => story.tags.includes(activeFilter)),
    [activeFilter]
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHeroAnimationAvailability = () => {
      canAnimateHeroRef.current = precisePointer.matches && !reducedMotion.matches;
    };

    updateHeroAnimationAvailability();
    reducedMotion.addEventListener("change", updateHeroAnimationAvailability);
    precisePointer.addEventListener("change", updateHeroAnimationAvailability);

    return () => {
      reducedMotion.removeEventListener("change", updateHeroAnimationAvailability);
      precisePointer.removeEventListener("change", updateHeroAnimationAvailability);
      if (heroFrameRef.current) {
        cancelAnimationFrame(heroFrameRef.current);
      }
      if (filterTimerRef.current) {
        window.clearTimeout(filterTimerRef.current);
      }
    };
  }, []);

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canAnimateHeroRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (heroFrameRef.current) {
      cancelAnimationFrame(heroFrameRef.current);
    }

    heroFrameRef.current = requestAnimationFrame(() => {
      setHeroMotion({ x, y });
    });
  };

  const resetHeroMotion = () => {
    setHeroMotion({ x: 0, y: 0 });
    setHoveredHeroItem(null);
  };

  const selectFilter = (filter: string) => {
    if (filter === activeFilter) return;

    setIsFilterChanging(true);
    setActiveFilter(filter);

    if (filterTimerRef.current) {
      window.clearTimeout(filterTimerRef.current);
    }

    filterTimerRef.current = window.setTimeout(() => {
      setIsFilterChanging(false);
    }, 280);
  };

  const heroItemState = (id: string) => {
    const active = hoveredHeroItem === id;
    const muted = hoveredHeroItem !== null && !active;

    return {
      className: `transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        muted ? "opacity-70 blur-[0.6px]" : "opacity-100"
      } ${active ? "z-50 shadow-[0_28px_80px_rgba(40,29,12,0.28)]" : ""}`,
      active
    };
  };

  const heroTransform = ({
    id,
    strength,
    rotate,
    opposite = false
  }: {
    id: string;
    strength: number;
    rotate: number;
    opposite?: boolean;
  }) => {
    const active = hoveredHeroItem === id;
    const direction = opposite ? -1 : 1;
    const x = heroMotion.x * strength * direction;
    const y = heroMotion.y * strength * direction;
    const focusedRotate = active ? rotate * 0.16 : rotate;
    const scale = active ? 1.035 : 1;

    return {
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${focusedRotate}deg) scale(${scale})`
    };
  };

  const visibleWebsiteProjects = [
    websiteProjects[websiteIndex],
    websiteProjects[(websiteIndex + 1) % websiteProjects.length],
    websiteProjects[(websiteIndex + 2) % websiteProjects.length]
  ];

  const visibleProducts = [
    products[productIndex],
    products[(productIndex + 1) % products.length],
    products[(productIndex + 2) % products.length],
    products[(productIndex + 3) % products.length]
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3eee5] text-[#15120e]">
      <header className="sticky top-0 z-50 border-b border-[#1a1712]/10 bg-[#f3eee5]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-14">
          <DarkLogoMark />
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#15120e] ${
                  item.label === "Fynta" ? "border-b border-[#b99a5b] pb-2 text-[#9c7738]" : "text-black/58"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/#contact"
            className="hidden border border-[#b99a5b] bg-[#b99a5b] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#9c7738] sm:inline-flex"
          >
            Partner With Us
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

      <section className="relative overflow-hidden border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(21,18,14,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(21,18,14,0.04)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[44%_56%] lg:items-center">
          <div className="relative">
            <div className="mb-10">
              <DarkLogoMark />
            </div>
            <SectionLabel>Fynta Portfolio</SectionLabel>
            <h1 className="mt-5 font-serif text-[46px] font-normal leading-[0.95] tracking-[-0.04em] text-[#15120e] sm:text-6xl lg:text-[64px] xl:text-[68px]">
              <span className="block">Bold ideas.</span>
              <span className="block whitespace-nowrap">Smart strategy.</span>
              <em className="block font-serif italic text-[#b99047] md:whitespace-nowrap">Measurable impact.</em>
            </h1>
            <p className="mt-8 max-w-[560px] text-[16px] leading-8 text-black/66">
              A curated portfolio of digital campaigns, content, websites and experiences Fynta has crafted to help ambitious brands break through and grow.
            </p>
            <a href="#featured" className="group mt-9 inline-flex items-center gap-5 border-b border-[#b99047] pb-2 text-[11px] font-bold uppercase tracking-[0.16em]">
              Explore Fynta Work
              <ArrowRight className="h-4 w-4 rounded-full bg-[#c59a4a] p-0.5 text-white transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-10 font-serif text-xl italic text-[#b99047]">Strategy meets creativity</p>
          </div>

          <div
            className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[660px]"
            onPointerMove={handleHeroPointerMove}
            onPointerLeave={resetHeroMotion}
          >
            <span
              className="fynta-brush-orbit absolute left-[11%] top-[7%] h-[430px] w-[430px] rounded-full border-[18px] border-[#b99047]/44 sm:h-[500px] sm:w-[500px]"
              aria-hidden="true"
            />
            <div
              className={`absolute left-[6%] top-[25%] z-20 w-[70%] border border-[#15120e]/12 bg-[#f8f2e9] p-3 shadow-[0_24px_70px_rgba(40,29,12,0.22)] sm:top-[22%] sm:w-[66%] ${heroItemState("main").className}`}
              style={heroTransform({ id: "main", strength: 9, rotate: -1.5 })}
              onPointerEnter={() => setHoveredHeroItem("main")}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src="/images/web-portfolio/cards/hydrelle-skincare.webp" alt="Laptop campaign preview" fill unoptimized priority className="object-cover object-top" />
              </div>
              <span className={`absolute bottom-5 right-5 inline-flex items-center gap-2 bg-[#f8f2e9]/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#15120e] backdrop-blur-sm transition-all duration-500 ${hoveredHeroItem === "main" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                View Case Study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <div
              className={`absolute right-[2%] top-[28%] z-30 w-[24%] border border-[#15120e]/12 bg-[#f8f2e9] p-2 shadow-[0_18px_46px_rgba(40,29,12,0.2)] sm:right-[5%] ${heroItemState("mobile").className}`}
              style={heroTransform({ id: "mobile", strength: 18, rotate: 2 })}
              onPointerEnter={() => setHoveredHeroItem("mobile")}
            >
              <div className="relative aspect-[9/16] overflow-hidden">
                <Image src="/images/web-portfolio/cards/miracle-designs-boutique.webp" alt="Mobile campaign preview" fill unoptimized className="object-cover object-top" />
              </div>
              <span className={`absolute bottom-4 left-4 right-4 inline-flex items-center justify-center gap-2 bg-[#f8f2e9]/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#15120e] backdrop-blur-sm transition-all duration-500 ${hoveredHeroItem === "mobile" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                View Case Study <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div
              className={`absolute right-[17%] top-[2%] z-10 h-[150px] w-[230px] overflow-hidden border border-[#15120e]/12 grayscale sm:h-[170px] sm:w-[270px] ${heroItemState("portrait").className}`}
              style={heroTransform({ id: "portrait", strength: 24, rotate: 0.5 })}
              onPointerEnter={() => setHoveredHeroItem("portrait")}
            >
              <Image src="/images/web-portfolio/cards/n-universal-yoga.webp" alt="Campaign portrait" fill unoptimized className="object-cover" />
            </div>
            <div
              className={`absolute bottom-[5%] right-[11%] z-20 h-[160px] w-[240px] overflow-hidden border border-[#15120e]/12 bg-[#f8f2e9] p-2 sm:h-[180px] sm:w-[280px] ${heroItemState("product").className}`}
              style={heroTransform({ id: "product", strength: 11, rotate: 0.8, opposite: true })}
              onPointerEnter={() => setHoveredHeroItem("product")}
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image src="/images/web-portfolio/cards/lumora.webp" alt="Product visual" fill unoptimized className="object-cover object-top" />
              </div>
              <span className={`absolute bottom-4 right-4 inline-flex items-center gap-2 bg-[#f8f2e9]/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#15120e] backdrop-blur-sm transition-all duration-500 ${hoveredHeroItem === "product" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                View Case Study <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div
              className={`absolute bottom-[15%] left-[4%] z-10 h-[140px] w-[190px] overflow-hidden border border-[#15120e]/10 opacity-90 sm:h-[170px] sm:w-[220px] ${heroItemState("texture").className}`}
              style={heroTransform({ id: "texture", strength: 14, rotate: -0.4, opposite: true })}
              onPointerEnter={() => setHoveredHeroItem("texture")}
            >
              <Image src="/images/web-portfolio/cards/aqsa-print.webp" alt="Texture campaign visual" fill unoptimized className="object-cover object-center" />
            </div>
            <div
              className="absolute bottom-[23%] right-[1%] z-40 grid h-20 w-20 place-items-center rounded-full bg-[#070707] text-center text-2xl font-serif text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-24 sm:w-24"
              style={{ transform: `translate3d(${heroMotion.x * 6}px, ${heroMotion.y * 6}px, 0) rotate(${heroMotion.x * 8}deg)` }}
            >
              F
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[78px] z-40 border-b border-[#1a1712]/12 bg-[#f3eee5]/95 px-5 py-4 backdrop-blur-xl sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-black/58">Filter Work</span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => selectFilter(filter)}
              className={`group relative shrink-0 rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                activeFilter === filter ? "border-[#b99047] bg-[#15120e] text-[#f5efe4]" : "border-[#15120e]/14 text-black/58 hover:border-[#b99047]/70 hover:text-[#15120e]"
              }`}
            >
              {filter}
              <span className={`absolute -bottom-1 left-5 right-5 h-px origin-center bg-[#b99047] transition-transform duration-300 ${activeFilter === filter ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75"}`} />
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/52 lg:flex">
            Search Projects <Search className="h-4 w-4" />
          </span>
        </div>
      </section>

      <section id="featured" className="border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[23%_77%]">
          <EditorialSidebar title={"Featured\nBrand Stories"} text="Integrated campaigns built to inspire, connect and convert." cta="View All Case Studies" />
          <div className={`grid gap-5 transition-[opacity,transform] duration-300 ease-out lg:grid-cols-3 ${isFilterChanging ? "translate-y-2 opacity-55" : "translate-y-0 opacity-100"}`}>
            {(filteredStories.length ? filteredStories : featuredStories).map((story) => (
              <ImageCard key={story.title} title={story.title} type={story.type} text={story.text} image={story.image} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[23%_77%]">
          <EditorialSidebar title={"Website\nProjects"} text="Conversion-focused websites designed for performance and beautiful experiences." cta="View All Websites" />
          <div className="relative">
            <button
              type="button"
              onClick={() => setWebsiteIndex((index) => (index === 0 ? websiteProjects.length - 1 : index - 1))}
              className="absolute -left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#15120e]/16 bg-[#f3eee5] text-[#b99047] shadow-xl"
              aria-label="Previous website projects"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <div className="grid gap-5 md:grid-cols-3">
              {visibleWebsiteProjects.map((item) => (
                <ImageCard key={item.title} title={item.title} type={item.subtitle} text="Website experience shaped for storytelling, conversion, and brand trust." image={item.image} large />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setWebsiteIndex((index) => (index + 1) % websiteProjects.length)}
              className="absolute -right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#15120e]/16 bg-[#f3eee5] text-[#b99047] shadow-xl"
              aria-label="Next website projects"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[23%_77%]">
          <EditorialSidebar title={"Search Engine\nOptimization"} text="Organic growth that compounds. Rank higher. Get found. Grow." cta="View SEO Cases" />
          <div className="grid overflow-hidden border border-[#1a1712]/12 bg-[#f8f3eb] lg:grid-cols-[30%_45%_25%]">
            <div className="relative min-h-[250px]">
              <Image src="/images/web-portfolio/cards/ecom-sigma.webp" alt="Search performance screenshot" fill unoptimized className="object-cover object-top" />
            </div>
            <div className="grid gap-px bg-[#1a1712]/12 p-px sm:grid-cols-3">
              {[
                ["215%", "Increase in organic traffic"],
                ["187%", "Growth in keyword rankings"],
                ["4.6X", "Return on SEO investment"]
              ].map(([value, label]) => (
                <div key={label} className="bg-[#f8f3eb] p-6">
                  <p className="font-serif text-4xl text-[#15120e]">{value}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-black/52">{label}</p>
                </div>
              ))}
            </div>
            <div className="relative bg-[#f8f3eb] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a9823f]">Organic Traffic Growth</p>
              <svg viewBox="0 0 260 130" className="mt-6 h-32 w-full" aria-hidden="true">
                <polyline points="10,112 48,95 82,88 116,68 150,72 184,44 220,34 252,18" fill="none" stroke="#b99047" strokeWidth="3" />
                <line x1="10" y1="112" x2="252" y2="112" stroke="rgba(0,0,0,.16)" />
              </svg>
              <p className="font-serif text-5xl text-[#15120e]">#1</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/52">Ranked keywords for 35+ terms</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[23%_77%]">
          <EditorialSidebar title={"Ad + Video\nCampaigns"} text="Scroll-stopping creative that drives real results." cta="View All Campaigns" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map(([title, label, image]) => (
              <button key={title} type="button" onClick={() => setActiveVideo(title)} className="group relative min-h-[240px] overflow-hidden border border-[#1a1712]/12 text-left transition-colors duration-500 hover:border-[#b99047]/70">
                <Image src={image} alt={`${title} video thumbnail`} fill unoptimized className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/14" />
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(180deg,transparent,rgba(7,6,5,0.72))]" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-[0.85] place-items-center rounded-full border border-white/70 bg-black/28 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-100">
                  <Play className="h-5 w-5 fill-current" />
                </span>
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/72">{label}</p>
                  <p className="mt-3 inline-flex translate-y-1 items-center gap-2 border-b border-[#c59a4a] pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e5c16b] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Watch Reel <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[23%_77%]">
          <EditorialSidebar title={"Product\nShowcase"} text="Beautifully presented. Perfectly positioned." cta="View All Products" />
          <div className="relative">
            <button
              type="button"
              onClick={() => setProductIndex((index) => (index === 0 ? products.length - 1 : index - 1))}
              className="absolute -left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#15120e]/16 bg-[#f3eee5] text-[#b99047]"
              aria-label="Previous products"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map(([title, label, image]) => (
                <ImageCard key={title} title={title} type={label} text="A refined product story built to inform, persuade, and convert." image={image} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setProductIndex((index) => (index + 1) % products.length)}
              className="absolute -right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#15120e]/16 bg-[#f3eee5] text-[#b99047]"
              aria-label="Next products"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_82%_24%,rgba(185,144,71,0.22),transparent_28%),linear-gradient(135deg,#15120e,#030303)] px-5 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[23%_77%] lg:items-center">
          <div>
            <h2 className="font-serif text-3xl uppercase leading-none">Our Impact<br />By The Numbers</h2>
            <p className="mt-4 max-w-[260px] text-sm leading-6 text-white/62">Real results for real brands. Across channels. Every time.</p>
          </div>
          <div className="grid gap-px bg-white/14 sm:grid-cols-2 lg:grid-cols-5">
            {impact.map(([value, label, Icon]) => (
              <div key={label as string} className="bg-black/36 p-6 text-center">
                <Icon className="mx-auto h-7 w-7 text-[#c59a4a]" strokeWidth={1.4} />
                <p className="mt-4 font-serif text-4xl text-white">{value as string}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/58">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/10 bg-[#f5efe4] px-5 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[minmax(300px,30%)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:gap-24">
          <aside className="max-w-[430px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#b99047]">Fusion Ventures</p>
            <h2 className="mt-7 whitespace-pre-line font-serif text-[52px] font-normal uppercase leading-[0.95] tracking-[-0.035em] text-[#15120e] sm:text-6xl lg:text-[70px]">
              WHAT WE{"\n"}DELIVER
            </h2>
            <div className="relative my-9 h-[2px] max-w-[300px] bg-[#b99047]/70">
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#b99047] bg-[#f5efe4]" />
            </div>
            <p className="max-w-[340px] text-[18px] leading-9 text-black/72">
              End-to-end digital solutions that build brands and drive growth.
            </p>
            <a
              href="#contact"
              className="group mt-12 inline-flex items-center gap-5 border-b border-[#b99047] pb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#15120e]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 text-[#b99047] transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
          </aside>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map(([title, text, Icon]) => (
              <article
                key={title as string}
                className="group relative min-h-[245px] overflow-hidden rounded-[6px] bg-[#fbf6ee] p-9 shadow-[0_18px_55px_rgba(54,39,19,0.07)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(54,39,19,0.12)] sm:p-10"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#b99047] transition-transform duration-500 group-hover:scale-x-100" />
                <Icon className="h-10 w-10 text-[#b99047] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-3" strokeWidth={1.45} />
                <h3 className="mt-8 text-[13px] font-bold uppercase tracking-[0.22em] text-[#15120e]">{title as string}</h3>
                <span className="mt-5 block h-px w-12 bg-[#b99047]/58 transition-all duration-500 group-hover:w-20" />
                <p className="mt-5 max-w-[280px] text-[16px] leading-7 text-black/62">{text as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/12 px-5 py-12 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[18%_82%] lg:items-center">
          <EditorialSidebar title={"Brands We've\nGrown"} text="Proud to partner with visionary brands." cta="View All Clients" />
          <div className="grid grid-cols-2 gap-8 text-center font-serif text-2xl text-[#15120e] sm:grid-cols-3 lg:grid-cols-6">
            {brandLogos.map((brand) => (
              <span key={brand} className="opacity-78">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1712]/12 px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[18%_82%]">
          <EditorialSidebar title={"Kind Words\nFrom Partners"} text="Trusted by founders and marketing leaders." cta="View All Testimonials" />
          <div className="grid gap-px bg-[#1a1712]/12 lg:grid-cols-3">
            {testimonials.map(([quote, person]) => (
              <blockquote key={person} className="bg-[#f3eee5] p-8">
                <p className="font-serif text-4xl text-[#b99047]">&ldquo;</p>
                <p className="text-[15px] leading-7 text-black/70">{quote}</p>
                <footer className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-black/54">- {person}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_80%_34%,rgba(185,144,71,0.24),transparent_26%),linear-gradient(135deg,#111,#020202)] px-5 py-14 text-white sm:px-10 lg:px-14 lg:py-16" id="contact">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[16%_42%_42%] lg:items-center">
          <div className="grid h-28 w-28 place-items-center rounded-full border border-[#b99047]/55 font-serif text-4xl text-[#c59a4a]">F</div>
          <div>
            <h2 className="font-serif text-5xl leading-[0.95]">
              Great stories start
              <br />
              with a <em className="text-[#c59a4a]">conversation.</em>
            </h2>
            <p className="mt-4 text-sm text-white/62">Let&apos;s create something extraordinary together.</p>
          </div>
          <div className="border-l border-white/12 pl-0 lg:pl-10">
            <p className="max-w-[420px] text-sm leading-7 text-white/68">Have a project in mind or just want to say hello? We&apos;d love to hear from you.</p>
            <a href={`mailto:${webPortfolioContact.email}`} className="mt-6 inline-flex items-center gap-4 bg-[#c59a4a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-black">
              Start A Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-9 text-white sm:px-10 lg:px-14">
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

      {activeVideo && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true">
          <div className="w-full max-w-[820px] border border-[#c59a4a]/34 bg-[#090807] p-5 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c59a4a]">Campaign Preview</p>
                <h3 className="mt-2 font-serif text-3xl">{activeVideo}</h3>
              </div>
              <button type="button" onClick={() => setActiveVideo(null)} className="grid h-11 w-11 place-items-center rounded-full border border-white/18 text-white" aria-label="Close video preview">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid aspect-video place-items-center bg-[linear-gradient(135deg,#1b1712,#020202)]">
              <div className="text-center">
                <Play className="mx-auto h-16 w-16 text-[#c59a4a]" strokeWidth={1.2} />
                <p className="mt-5 text-sm leading-6 text-white/62">Video link placeholder. Add a YouTube, Vimeo, or hosted reel URL to play the full campaign here.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .fynta-brush-orbit {
            animation: fyntaBrushReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both,
              fyntaBrushDrift 24s linear 900ms infinite;
          }
        }

        @keyframes fyntaBrushReveal {
          from {
            opacity: 0;
            transform: scale(0.96) rotate(-4deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fyntaBrushDrift {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
