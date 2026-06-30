"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  X
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Careers", href: "/#people" },
  { label: "Insights", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

const assetsPath = "/ventures/plumlet_assets_webp";

const audienceCards = [
  {
    title: "For Creators",
    text: "Showcase your talent",
    icon: `${assetsPath}/02_icon_for_creators.webp`
  },
  {
    title: "For Shoppers",
    text: "Find something unique",
    icon: `${assetsPath}/03_icon_for_shoppers.webp`
  },
  {
    title: "For Everyone",
    text: "Celebrate creativity",
    icon: `${assetsPath}/04_icon_for_everyone.webp`
  }
];

const galleryImages = [
  { src: `${assetsPath}/06_gallery_earrings.webp`, alt: "Handmade earrings" },
  { src: `${assetsPath}/07_gallery_landscape_painting.webp`, alt: "Landscape painting on an easel", featured: true },
  { src: `${assetsPath}/08_gallery_pottery_vases.webp`, alt: "Handmade pottery vases" },
  { src: `${assetsPath}/09_gallery_woven_bracelets.webp`, alt: "Woven bracelets" },
  { src: `${assetsPath}/10_gallery_macrame_wall_hanging.webp`, alt: "Macrame wall hanging" },
  { src: `${assetsPath}/11_gallery_abstract_painting.webp`, alt: "Abstract painting" },
  { src: `${assetsPath}/12_gallery_ceramic_vase.webp`, alt: "Ceramic vase" }
];

const featureRows = [
  {
    title: "Discover unique creations",
    text: "Explore art, crafts, and handmade products from talented creators.",
    icon: `${assetsPath}/05_icon_gift.webp`
  },
  {
    title: "Support creative talent",
    text: "Empower makers and small businesses to grow and thrive.",
    icon: `${assetsPath}/03_icon_for_shoppers.webp`
  },
  {
    title: "Join a creative community",
    text: "Connect with like-minded people who share your passion.",
    icon: `${assetsPath}/04_icon_for_everyone.webp`
  }
];

const pillarItems = [
  { title: "Empowering Creators", icon: `${assetsPath}/02_icon_for_creators.webp` },
  { title: "Curated Marketplace", icon: `${assetsPath}/03_icon_for_shoppers.webp` },
  { title: "Connecting Communities", icon: `${assetsPath}/04_icon_for_everyone.webp` },
  { title: "Celebrating Originality", icon: `${assetsPath}/05_icon_gift.webp` }
];

function FusionHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060705]/94 backdrop-blur-xl">
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
              className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/#contact"
            className="hidden border border-[#d6a84f]/75 bg-transparent px-7 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#e0ba68] transition-colors hover:bg-[#d6a84f] hover:text-black sm:inline-flex"
          >
            Partner With Us
          </a>
          <button
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors hover:border-[#b99a5b] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#060705] px-5 py-5 lg:hidden">
          <div className="grid gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-[0.1em] text-white/78"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="mt-2 border border-[#d6a84f]/75 bg-transparent px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-[#e0ba68] transition-colors hover:bg-[#d6a84f] hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              Partner With Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function FusionFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 text-white sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1280px] gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.35fr]">
        <div>
          <a href="/" aria-label="Fusion Ventures home">
            <Image
              src="/fusion-ventures-logo.webp"
              alt="Fusion Ventures"
              width={640}
              height={176}
              className="h-9 w-auto sm:h-10"
            />
          </a>
          <p className="mt-5 max-w-[270px] text-sm leading-6 text-white/52">
            Building, operating, and scaling digital-first ventures with long-term focus.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Instagram, Facebook, MousePointer2].map((Icon, index) => (
              <span
                key={index}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/14 text-white/68 transition-colors hover:border-[#d6a84f]/60 hover:text-[#d6a84f]"
              >
                <Icon className="h-4 w-4" strokeWidth={1.55} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Ventures", "/ventures"],
            ["Insights", "/web-portfolio"],
            ["Contact", "/#contact"]
          ].map(([item, href]) => (
            <a key={item} href={href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-[#d6a84f]">
              {item}
            </a>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Portfolio</h3>
          {[
            ["Web Portfolio", "/web-portfolio"],
            ["Our Edge", "/#group"],
            ["Sectors", "/#sectors"],
            ["People", "/#people"]
          ].map(([item, href]) => (
            <a key={item} href={href} className="mb-3 block text-sm text-white/52 transition-colors hover:text-[#d6a84f]">
              {item}
            </a>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <a key={item} href="#" className="mb-3 block text-sm text-white/52 transition-colors hover:text-[#d6a84f]">
              {item}
            </a>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Let&apos;s Connect</h3>
          <a
            href="mailto:hello@fusionventuresglobal.com"
            className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-[#d6a84f]"
          >
            <Mail className="h-4 w-4 shrink-0" strokeWidth={1.55} />
            hello@fusionventuresglobal.com
          </a>
          <a
            href="tel:+13024703135"
            className="mb-3 flex items-center gap-3 text-sm text-white/56 transition-colors hover:text-[#d6a84f]"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={1.55} />
            +1 (302) 470-3135
          </a>
          <p className="flex items-center gap-3 text-sm text-white/56">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.55} />
            UAE-Based Venture Group
          </p>
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1280px] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Fusion Ventures. All rights reserved.</p>
        <a href="#top" className="transition-colors hover:text-[#d6a84f]">
          Back To Top
        </a>
      </div>
    </footer>
  );
}

function PlumletMark() {
  return (
    <a href="#top" className="inline-flex items-center gap-2" aria-label="Plumlet top">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#efe7ff] text-lg font-black text-[#5b2fc2]">
        P
      </span>
      <span className="text-xl font-black tracking-[-0.04em] text-[#26144f]">Plumlet</span>
    </a>
  );
}

function EmailSignup({ dark = false }: { dark?: boolean }) {
  return (
    <form className={`flex w-full flex-col gap-3 sm:flex-row ${dark ? "text-white" : "text-[#20113f]"}`}>
      <input
        type="email"
        aria-label="Email address"
        placeholder="Enter your email"
        className={`h-14 min-w-0 flex-1 rounded-[14px] border px-5 text-sm outline-none transition-colors focus:border-[#7446d8] ${
          dark
            ? "border-white/16 bg-white text-[#241246] placeholder:text-[#241246]/46"
            : "border-[#ddd1fb] bg-white text-[#241246] placeholder:text-[#241246]/42"
        }`}
      />
      <button
        type="button"
        className={`group inline-flex h-14 items-center justify-center gap-3 rounded-[14px] px-7 text-sm font-bold transition-all ${
          dark
            ? "bg-white text-[#4a21aa] hover:bg-[#f2eaff]"
            : "bg-[#5d2dcc] text-white shadow-[0_14px_30px_rgba(93,45,204,.2)] hover:bg-[#4b22ae]"
        }`}
      >
        Notify Me
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

export default function PlumletClient() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#fffefd] text-[#241246]">
      <FusionHeader />

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_78%_14%,rgba(220,205,255,.72),transparent_26%),linear-gradient(135deg,#fffafd_0%,#f7f0ff_52%,#fffdf8_100%)] px-5 pb-12 pt-12 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
        <div className="pointer-events-none absolute left-[12%] top-24 h-32 w-32 rounded-full bg-[#eadcff]/70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-[38%] h-40 w-40 rounded-full bg-[#fff0bf]/45 blur-3xl" />

        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative z-10">
            <PlumletMark />
            <span className="mt-12 inline-flex rounded-full bg-[#efe7ff] px-4 py-2 text-xs font-bold text-[#6d44d5]">
              Coming Soon
            </span>
            <h1 className="mt-5 max-w-[560px] text-5xl font-black leading-[0.96] tracking-[-0.055em] text-[#241246] sm:text-6xl lg:text-7xl">
              Plumlet
              <span className="mt-2 block text-[0.58em] leading-[1.02] tracking-[-0.04em]">
                A Marketplace for Creative Minds
              </span>
            </h1>
            <p className="mt-6 max-w-[560px] text-base leading-8 text-[#4b3c66]">
              Plumlet is an upcoming marketplace where creativity meets opportunity. A platform for artists,
              makers, and dreamers to showcase, sell, and celebrate unique art, crafts, and handmade creations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#preview"
                className="inline-flex h-14 items-center justify-center rounded-[16px] bg-[#5d2dcc] px-8 text-sm font-bold text-white shadow-[0_18px_38px_rgba(93,45,204,.22)] transition-transform hover:-translate-y-0.5"
              >
                Explore Preview
              </a>
              <a
                href="#learn"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-[16px] border border-[#ddd1fb] bg-white/80 px-8 text-sm font-bold text-[#2d1a5b] transition-transform hover:-translate-y-0.5"
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[340px] lg:min-h-[590px]">
            <div className="absolute inset-x-0 top-8 mx-auto h-[78%] max-w-[760px] rounded-[42px] bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,.95),transparent_22%),linear-gradient(135deg,rgba(235,222,255,.95),rgba(255,255,255,.24))] shadow-[0_32px_90px_rgba(118,72,180,.14)]" />
            <Image
              src={`${assetsPath}/01_hero_creative_composition.webp`}
              alt="Creative handmade objects with pottery, painting, macrame and baskets"
              width={980}
              height={760}
              priority
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_35px_70px_rgba(70,42,98,.18)]"
            />
          </div>
        </div>
      </section>

      <section className="-mt-6 px-5 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1120px] gap-px overflow-hidden rounded-[22px] border border-[#eee7fb] bg-[#eee7fb] shadow-[0_18px_60px_rgba(55,27,98,.08)] md:grid-cols-3">
          {audienceCards.map((item) => (
            <article key={item.title} className="flex items-center gap-5 bg-white p-6 transition-transform hover:-translate-y-0.5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#f2eaff]">
                <Image src={item.icon} alt="" width={30} height={30} className="h-7 w-7 object-contain" />
              </span>
              <div>
                <h2 className="text-sm font-black text-[#241246]">{item.title}</h2>
                <p className="mt-1 text-xs font-medium text-[#6c5d82]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1120px] gap-6 rounded-[26px] bg-[#f2eaff] p-6 shadow-[0_20px_70px_rgba(93,45,204,.08)] md:grid-cols-[1fr_0.85fr] md:items-center md:p-9">
          <div className="flex gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white">
              <Image src={`${assetsPath}/05_icon_gift.webp`} alt="" width={34} height={34} />
            </span>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-[#241246]">
                Something beautiful is on the way.
              </h2>
              <p className="mt-3 max-w-[590px] text-sm leading-7 text-[#5a4b72]">
                We&apos;re building a space that connects creativity with community. Stay tuned for the
                Plumlet experience.
              </p>
            </div>
          </div>
          <div>
            <EmailSignup />
            <p className="mt-3 text-xs font-medium text-[#6c5d82]">Get early access updates</p>
          </div>
        </div>
      </section>

      <section id="preview" className="px-5 py-8 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1120px] text-center">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#241246] sm:text-4xl">
            A Glimpse of What&apos;s Coming
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#7b4be2]" />
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[160px] lg:auto-rows-[190px]">
            {galleryImages.map((image) => (
              <figure
                key={image.src}
                className={`group overflow-hidden rounded-[18px] bg-[#f6f0ff] shadow-[0_16px_42px_rgba(55,27,98,.1)] ${
                  image.featured ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={580}
                  height={520}
                  className="h-full min-h-[150px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
          <a
            href="#learn"
            className="group mt-8 inline-flex h-11 items-center justify-center gap-3 rounded-full border border-[#ddd1fb] bg-white px-6 text-xs font-bold text-[#5d2dcc] shadow-[0_12px_30px_rgba(55,27,98,.08)]"
          >
            Explore Preview
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <section id="learn" className="px-5 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1120px] gap-9 overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_92%_18%,rgba(255,255,255,.85),transparent_16rem),linear-gradient(135deg,#f3eaff,#fff9ff)] p-6 shadow-[0_22px_80px_rgba(93,45,204,.1)] md:grid-cols-[0.95fr_1.05fr] md:items-center md:p-10">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#6d44d5]">
              Coming Soon
            </span>
            <h2 className="mt-5 max-w-[520px] text-3xl font-black leading-tight tracking-[-0.045em] text-[#241246] sm:text-4xl">
              A New Way to Discover, Connect and Create
            </h2>
            <p className="mt-4 max-w-[560px] text-sm leading-7 text-[#5a4b72]">
              Plumlet will bring together a world of original creations and the people who appreciate them.
            </p>
            <div className="mt-7 grid gap-5">
              {featureRows.map((item) => (
                <article key={item.title} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white">
                    <Image src={item.icon} alt="" width={25} height={25} />
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-[#241246]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5a4b72]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="relative grid min-h-[420px] place-items-center">
            <div className="absolute right-0 top-6 hidden w-[230px] sm:block">
              <Image
                src={`${assetsPath}/14_decorative_flowers_vases.webp`}
                alt="Decorative flowers and vases"
                width={420}
                height={520}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="relative z-10 rounded-[40px] border-[10px] border-[#171022] bg-[#171022] p-3 shadow-[0_32px_70px_rgba(55,27,98,.22)]">
              <Image
                src={`${assetsPath}/13_app_mockup_phone_screen.webp`}
                alt="Plumlet marketplace phone preview"
                width={310}
                height={620}
                className="h-auto w-[220px] rounded-[28px] object-contain sm:w-[270px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-6 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1120px] gap-px overflow-hidden rounded-[24px] border border-[#eee7fb] bg-[#eee7fb] shadow-[0_16px_55px_rgba(55,27,98,.07)] sm:grid-cols-2 lg:grid-cols-4">
          {pillarItems.map((item) => (
            <article key={item.title} className="grid min-h-[150px] place-items-center bg-white p-6 text-center">
              <Image src={item.icon} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              <h3 className="mt-4 text-sm font-black leading-tight text-[#241246]">{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1120px] gap-7 rounded-[26px] bg-[radial-gradient(circle_at_90%_20%,rgba(255,255,255,.18),transparent_12rem),linear-gradient(135deg,#7a44e4,#4d20ba)] p-6 text-white shadow-[0_24px_70px_rgba(77,32,186,.22)] md:grid-cols-[1fr_0.9fr] md:items-center md:p-9">
          <div className="flex gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white/14">
              <Image src={`${assetsPath}/15_cta_newsletter_icon.webp`} alt="" width={38} height={38} />
            </span>
            <div>
              <h2 className="text-3xl font-black tracking-[-0.04em]">Be the first to know</h2>
              <p className="mt-3 max-w-[560px] text-sm leading-7 text-white/76">
                Join our community and get early access updates when we launch.
              </p>
            </div>
          </div>
          <div>
            <EmailSignup dark />
            <p className="mt-3 text-xs font-medium text-white/70">No spam. Just creative updates.</p>
          </div>
        </div>
      </section>

      <FusionFooter />
    </main>
  );
}
