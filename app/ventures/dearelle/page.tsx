import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  PackageCheck,
  PenLine,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dearelle | Fusion Ventures",
  description:
    "Dearelle is a Fusion Ventures jewelry and gifting brand built around delicate everyday pieces, gift-ready packaging, and soft luxury storytelling."
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

const productCards = [
  {
    name: "Starry Studs",
    price: "Rs. 1,299",
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=520&q=85"
  },
  {
    name: "Luna Pendant",
    price: "Rs. 1,499",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=520&q=85"
  },
  {
    name: "Petite Ring",
    price: "Rs. 1,199",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=520&q=85"
  }
];

const trustChips = [
  { label: "Gift-Ready Packaging", icon: Gift },
  { label: "Lifetime Warranty", icon: ShieldCheck },
  { label: "Easy Returns", icon: RefreshCcw }
];

const whatCards = [
  { title: "Everyday Jewelry", text: "Delicate pieces designed to be worn and loved daily.", icon: Heart },
  { title: "Gift-Ready Packaging", text: "Thoughtful packaging that makes every moment special.", icon: Gift },
  { title: "Soft Luxury Brand", text: "Affordable luxury with a feminine, elegant touch.", icon: Sparkles }
];

const moodImages = [
  {
    alt: "Delicate jewelry closeup on blush silk",
    className: "md:row-span-2",
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=86"
  },
  {
    alt: "Soft pink gift packaging",
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=760&q=86"
  },
  {
    alt: "Minimal bracelet lifestyle detail",
    src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=760&q=86"
  },
  {
    alt: "Soft jewelry detail",
    src: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=760&q=86"
  },
  {
    alt: "Ribbon gift detail",
    src: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=760&q=86"
  }
];

const roleCards = [
  { title: "Brand Direction", text: "Shape, position and elevate the Dearelle brand.", icon: PenLine },
  { title: "Ecommerce Strategy", text: "Build seamless shopping experiences that convert.", icon: ShoppingBag },
  { title: "Content & Campaigns", text: "Story-led content that builds emotion and engagement.", icon: PackageCheck },
  { title: "Growth Marketing", text: "Data-driven growth to scale the Dearelle brand.", icon: TrendingUp }
];

const statusItems = [
  { label: "Stage", value: "Live", icon: Sparkles },
  { label: "Category", value: "Jewelry & Gifting", icon: BadgeCheck },
  { label: "Market", value: "India", icon: Heart },
  { label: "Focus", value: "Everyday luxury ecommerce", icon: TrendingUp }
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#9e5361]/10 bg-[#fffaf8]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-14">
        <a href="/" aria-label="Fusion Ventures home">
          <Image
            src="/fusion-ventures-logo.webp"
            alt="Fusion Ventures"
            width={640}
            height={176}
            priority
            className="h-9 w-auto sm:h-10"
            style={{ height: "2.25rem", width: "auto", maxWidth: "180px" }}
          />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#4d2428] ${
                item.label === "Ventures" ? "border-b border-[#d65a75] pb-2 text-[#c74763]" : "text-[#4d2428]/66"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/#contact"
          className="hidden rounded-md border border-[#d65a75] bg-[#d65a75] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-transparent hover:text-[#c74763] sm:inline-flex"
        >
          Partner With Us
        </a>
        <button
          className="grid h-11 w-11 place-items-center rounded-md border border-[#d65a75]/35 text-[#c74763] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="mobile-nav-motion lg:hidden" />
    </header>
  );
}

function ProductVisual() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.88),transparent_13rem),radial-gradient(circle_at_83%_24%,rgba(244,176,186,0.48),transparent_15rem),linear-gradient(135deg,rgba(255,247,245,0.9),rgba(243,204,199,0.6))] shadow-[0_30px_85px_rgba(126,73,70,0.16)] sm:min-h-[430px] lg:min-h-[520px]">
      <div className="absolute inset-3 z-[2] rounded-xl border border-white/60" />
      <div
        className="absolute inset-0 bg-cover bg-[45%_center] opacity-95"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,247,245,.76), rgba(255,247,245,.2)), linear-gradient(180deg, rgba(255,255,255,.12), rgba(235,171,165,.24)), url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=86')"
        }}
      />
      <div
        className="absolute bottom-[17%] left-[4%] z-[1] h-[46%] w-[42%] -rotate-[7deg] rounded-2xl bg-cover bg-center opacity-80 shadow-[0_26px_60px_rgba(118,58,58,0.14)] sm:bottom-[12%] sm:left-[7%] sm:h-[52%] sm:w-[38%]"
        style={{
          backgroundImage:
            "linear-gradient(145deg, rgba(255,255,255,.78), rgba(255,228,226,.28)), url('https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=760&q=82')"
        }}
      />
      <div className="absolute right-[5%] top-[8%] z-[3] grid aspect-square w-[132px] place-items-center rounded-2xl border border-white/45 bg-gradient-to-br from-[#edb8b1] to-[#f9d8d1] text-[#9c5148] shadow-[0_28px_64px_rgba(122,66,58,0.22)] sm:right-[8%] sm:w-[220px]">
        <span className="text-sm font-bold tracking-[0.12em] sm:text-xl">DEARELLE</span>
        <Heart className="h-4 w-4" />
      </div>
      <div className="absolute bottom-[5%] right-[3%] z-[4] grid w-[95%] grid-cols-3 gap-2 sm:bottom-[7.5%] sm:right-[4.5%] sm:w-[91%] sm:gap-3">
        {productCards.map((product, index) => (
          <article
            key={product.name}
            className="min-w-0 rotate-[6deg] rounded-xl border border-white/85 bg-white/85 p-1.5 shadow-[0_20px_38px_rgba(86,45,45,0.14)] backdrop-blur-xl sm:rounded-2xl sm:p-2.5"
            style={{
              transform:
                index === 1
                  ? "rotate(4deg) translateY(-18px)"
                  : index === 2
                    ? "rotate(8deg) translateY(8px)"
                    : undefined
            }}
          >
            <img
              src={product.image}
              alt=""
              className="aspect-square w-full rounded-lg object-cover brightness-110 saturate-[.72] sepia-[.08]"
              style={{ width: "100%", maxWidth: "100%" }}
            />
            <strong className="mt-2 block truncate text-[10px] text-[#513132] sm:text-xs">{product.name}</strong>
            <span className="mt-1 block truncate text-[9px] font-bold text-[#2f2222] sm:text-[11px]">{product.price}</span>
          </article>
        ))}
      </div>
      <span className="absolute left-[10%] top-[18%] z-[3] h-3 w-3 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#f9e4df_58%,#e9b8b2)] shadow-[0_8px_18px_rgba(143,77,73,.18)]" />
      <span className="absolute right-[38%] top-[12%] z-[3] h-2 w-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#f9e4df_58%,#e9b8b2)] shadow-[0_8px_18px_rgba(143,77,73,.18)]" />
      <Sparkles className="absolute right-8 top-[42%] z-[5] h-8 w-8 text-white drop-shadow-[0_2px_8px_rgba(225,95,115,.3)]" />
      <Sparkles className="absolute bottom-[25%] left-[9%] z-[5] h-6 w-6 text-white drop-shadow-[0_2px_8px_rgba(225,95,115,.3)]" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#9e5361]/12 bg-white px-5 py-10 text-[#321b1d] sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.35fr]">
        <div>
          <a href="/" aria-label="Fusion Ventures home">
            <Image
              src="/fusion-ventures-logo.webp"
              alt="Fusion Ventures"
              width={640}
              height={176}
              className="h-10 w-auto"
              style={{ height: "2.5rem", width: "auto", maxWidth: "190px" }}
            />
          </a>
          <p className="mt-5 max-w-[270px] text-sm leading-6 text-[#321b1d]/58">
            Building, operating, and scaling digital-first ventures with long-term focus.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Instagram, Mail].map((Icon, index) => (
              <span
                key={index}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#9e5361]/16 text-[#9e5361] transition-colors hover:border-[#d65a75]/60 hover:text-[#d65a75]"
              >
                <Icon className="h-4 w-4" strokeWidth={1.55} />
              </span>
            ))}
          </div>
        </div>

        {[
          ["Quick Links", [["Home", "/"], ["About", "/about"], ["Ventures", "/ventures"], ["Contact", "/#contact"]]],
          ["Portfolio", [["Web Portfolio", "/web-portfolio"], ["Dearelle", "/ventures/dearelle"], ["All Ventures", "/ventures"]]],
          ["Legal", [["Privacy Policy", "#"], ["Terms of Service", "#"], ["Cookie Policy", "#"]]]
        ].map(([title, links]) => (
          <div key={title as string}>
            <h3 className="mb-4 text-sm font-semibold text-[#321b1d]">{title as string}</h3>
            {(links as string[][]).map(([item, href]) => (
              <a key={item} href={href} className="mb-3 block text-sm text-[#321b1d]/56 transition-colors hover:text-[#c74763]">
                {item}
              </a>
            ))}
          </div>
        ))}

        <div>
          <h3 className="mb-4 text-sm font-semibold text-[#321b1d]">Let&apos;s Connect</h3>
          <a
            href="mailto:hello@fusionventuresglobal.com"
            className="mb-3 flex items-center gap-3 text-sm text-[#321b1d]/58 transition-colors hover:text-[#c74763]"
          >
            <Mail className="h-4 w-4 shrink-0" strokeWidth={1.55} />
            hello@fusionventuresglobal.com
          </a>
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1280px] flex-col gap-3 border-t border-[#9e5361]/10 pt-6 text-xs text-[#321b1d]/42 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Fusion Ventures. All rights reserved.</p>
        <a href="#top" className="transition-colors hover:text-[#c74763]">
          Back To Top
        </a>
      </div>
    </footer>
  );
}

export default function DearellePage() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#fffaf8] font-sans text-[#321b1d]">
      <Header />

      <section className="relative mx-auto grid max-w-[1280px] gap-9 px-5 py-10 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-14 lg:py-16">
        <div className="fade-up">
          <span className="inline-flex rounded-full border border-[#d65a75]/30 bg-[#fff0f1] px-4 py-2 text-sm font-semibold text-[#c74763]">
            Jewelry & Gifting Venture
          </span>
          <h1 className="mt-5 text-[4.4rem] font-semibold leading-[.86] tracking-[-0.06em] text-[#5a282b] drop-shadow-[0_14px_34px_rgba(112,47,52,.12)] sm:text-8xl lg:text-[8.6rem]">
            Dearelle
          </h1>
          <h2 className="mt-5 max-w-[500px] text-3xl font-normal leading-tight tracking-[-0.04em] text-[#cd5268] sm:text-4xl">
            Everyday little luxuries made for love and gifting.
          </h2>
          <p className="mt-5 max-w-[520px] text-base leading-8 text-[#4d3b3b]">
            Dearelle is a soft jewelry and gifting venture built around delicate everyday pieces,
            beautiful packaging, and emotional brand storytelling.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="https://dearelle.com" className="inline-flex items-center justify-center gap-3 rounded-md bg-[#d65a75] px-7 py-4 text-sm font-bold text-white shadow-[0_16px_28px_rgba(206,71,96,.22)]">
              Visit Dearelle
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#venture" className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d65a75]/55 bg-white/60 px-7 py-4 text-sm font-bold text-[#c74763]">
              Explore Venture
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-5">
            {trustChips.map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-[#9e5361]/10 bg-white/50 px-2 text-center text-[11px] font-semibold leading-tight text-[#3f3332] sm:border-0 sm:bg-transparent sm:px-0 sm:text-sm">
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="fade-up-delay">
          <ProductVisual />
        </div>
      </section>

      <section id="venture" className="mx-auto max-w-[1120px] rounded-t-3xl bg-white/70 px-5 py-10 text-center shadow-[0_-12px_45px_rgba(105,63,58,.05)] sm:px-10 lg:px-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d65a75]">A Jewelry Brand</p>
        <h2 className="mt-3 text-4xl font-medium leading-tight tracking-[-0.05em] text-[#4f2427] sm:text-5xl">
          A jewelry brand for everyday love
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {whatCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-[#9e5361]/10 bg-white/80 p-6 shadow-[0_18px_42px_rgba(92,56,53,.08)]">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fde5e8] text-[#dc5270]">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#201417]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5e4b4a]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-[1120px] gap-6 rounded-3xl bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.78),transparent_13rem),linear-gradient(135deg,rgba(255,244,242,.96),rgba(248,222,218,.72))] p-4 shadow-[inset_0_0_0_1px_rgba(160,91,87,.08)] md:grid-cols-[230px_minmax(0,1fr)] md:items-center">
        <div className="p-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d65a75]">The Dearelle</p>
          <h2 className="mt-2 text-5xl font-medium tracking-[-0.06em] text-[#4f2427]">mood</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Feminine", "Romantic", "Minimal", "Giftable", "Everyday Premium"].map((tag) => (
              <span key={tag} className="rounded-full border border-[#d65a75]/45 bg-white/45 px-3 py-2 text-xs font-semibold text-[#5c383a]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:auto-rows-[126px]">
          {moodImages.map((image) => (
            <img
              key={image.alt}
              src={image.src}
              alt={image.alt}
              className={`h-full min-h-[112px] w-full rounded-2xl object-cover brightness-105 saturate-[.78] sepia-[.05] shadow-[0_16px_32px_rgba(100,56,54,.1)] ${image.className}`}
              style={{ width: "100%", maxWidth: "100%" }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-12 text-center sm:px-10 lg:px-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d65a75]">Built and supported by</p>
        <h2 className="mt-3 text-4xl font-medium tracking-[-0.05em] text-[#4f2427] sm:text-5xl">Fusion Ventures</h2>
        <p className="mx-auto mt-5 max-w-[690px] text-sm leading-7 text-[#5e4b4a] sm:text-base">
          Fusion Ventures supports Dearelle through brand direction, ecommerce strategy, content
          planning, campaign structure, and growth marketing.
        </p>
        <p className="mx-auto mt-3 max-w-[690px] text-sm font-semibold leading-7 text-[#4d3334] sm:text-base">
          Dearelle is part of the Fusion Ventures ecosystem, created to build a modern digital-first
          jewelry and gifting brand with strong emotional storytelling.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {roleCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-[#9e5361]/10 bg-gradient-to-b from-white/90 to-[#fff7f5] p-5 text-left shadow-[0_18px_42px_rgba(92,56,53,.08)]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#fde5e8] text-[#dc5270]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-[#201417] sm:text-base">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#5e4b4a] sm:text-sm">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-5 px-5 pb-12 sm:px-10 lg:grid-cols-[.95fr_1.05fr] lg:px-14">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#9e5361]/10 bg-[#fff7f5]/90 shadow-[0_18px_42px_rgba(92,56,53,.08)] sm:grid-cols-4">
          {statusItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="grid min-h-[112px] place-items-center gap-2 border-b border-r border-[#9e5361]/10 p-4 text-center sm:min-h-[190px] sm:border-b-0">
              <Icon className="h-5 w-5 text-[#dc5270]" strokeWidth={1.8} />
              <span className="text-xs text-[#6c5756]">{label}</span>
              <strong className="text-sm leading-tight text-[#251719]">{value}</strong>
            </div>
          ))}
        </div>

        <div
          className="flex min-h-[220px] items-center overflow-hidden rounded-2xl border border-[#9e5361]/10 bg-cover bg-right p-6 shadow-[0_18px_42px_rgba(92,56,53,.08)] lg:min-h-[190px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,.94), rgba(255,250,248,.82) 48%, rgba(255,246,244,.72)), url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=86')"
          }}
        >
          <div className="max-w-[450px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d65a75]">Explore Dearelle</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em] text-[#4f2427]">Explore Dearelle</h2>
            <p className="mt-3 text-sm leading-6 text-[#5e4b4a] sm:text-base">
              A Fusion Ventures brand built around everyday beauty, thoughtful gifting, and soft luxury.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="https://dearelle.com" className="inline-flex items-center justify-center gap-3 rounded-md bg-[#d65a75] px-5 py-3 text-sm font-bold text-white">
                Visit Website
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/#contact" className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d65a75]/55 bg-white/70 px-5 py-3 text-sm font-bold text-[#c74763]">
                Partner With Fusion Ventures
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
