"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Clock3,
  Crown,
  Leaf,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TimerReset,
  X
} from "lucide-react";
import {
  agencyAddOns,
  agencyBenefits,
  agencyPackages,
  trustBadges,
  type AgencyPackage,
  type AgencyPackageId
} from "@/lib/canada-agency-pricing";

const accentStyles = {
  green: {
    icon: "text-indigo-100",
    iconBg: "bg-indigo-300/10",
    border: "border-indigo-200/24",
    glow: "shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
  },
  blue: {
    icon: "text-indigo-100",
    iconBg: "bg-indigo-300/10",
    border: "border-indigo-200/24",
    glow: "shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
  },
  orange: {
    icon: "text-indigo-100",
    iconBg: "bg-indigo-300/10",
    border: "border-indigo-200/24",
    glow: "shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
  },
  red: {
    icon: "text-indigo-100",
    iconBg: "bg-indigo-300/10",
    border: "border-indigo-200/24",
    glow: "shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
  }
};

const packageIcons = {
  leaf: Leaf,
  crown: Crown,
  bag: ShoppingBag,
  rocket: Rocket
};

const trustIcons = [BadgeCheck, ShieldCheck, TimerReset, BriefcaseBusiness];

function PackageIcon({ item, large = false }: { item: AgencyPackage; large?: boolean }) {
  const Icon = packageIcons[item.icon];
  const accent = accentStyles[item.accent];

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg border ${accent.border} ${accent.iconBg} ${accent.icon} ${
        large ? "h-16 w-16" : "h-12 w-12"
      }`}
    >
      <Icon className={large ? "h-8 w-8" : "h-5 w-5"} strokeWidth={1.65} />
    </span>
  );
}

export function CanadaAgencyPricing() {
  const [selectedPackageId, setSelectedPackageId] = useState<AgencyPackageId>("growth");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedPackage = useMemo(
    () => agencyPackages.find((item) => item.id === selectedPackageId) ?? agencyPackages[0],
    [selectedPackageId]
  );
  const visibleFeatures = selectedPackage.features.slice(0, 8);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section
      id="canada-agency-pricing"
      className="relative overflow-hidden bg-[#050505] px-5 pb-12 pt-16 text-white sm:px-10 lg:px-14 lg:pb-14 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_18%,rgba(185,154,91,0.055),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(255,255,255,0.045),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(185,154,91,0.035),transparent_36%)]" />
      <div className="pointer-events-none absolute -right-16 bottom-20 hidden h-72 w-72 rotate-12 opacity-[0.035] lg:block">
        <svg viewBox="0 0 120 120" aria-hidden="true" className="h-full w-full fill-none stroke-white">
          <path
            strokeWidth="1.4"
            d="M60 6 68 38 98 23 80 52 112 60 80 68 98 97 68 82 60 114 52 82 22 97 40 68 8 60 40 52 22 23 52 38Z"
          />
          <path strokeWidth="1.2" d="M60 38v58M40 52l40 16M80 52 40 68" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-end">
          <div className="max-w-[820px]">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-white/46">
              Canada Agency Pricing
            </p>
            <h2 className="font-display text-4xl font-normal leading-tight tracking-[-0.045em] text-white sm:text-5xl lg:text-[56px]">
              What does your agency need help with?
            </h2>
            <p className="mt-6 max-w-[740px] text-sm leading-7 text-white/64 sm:text-base sm:leading-8">
              Choose a white-label website package built for Canadian agencies that need reliable
              development support, fast turnaround, and behind-the-scenes delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/12 bg-white/[0.04] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
            {trustBadges.map((badge, index) => {
              const Icon = trustIcons[index] ?? BadgeCheck;

              return (
                <div key={badge} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/22 p-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-indigo-200/18 text-indigo-100/76">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-xs font-semibold leading-4 text-white/80">{badge}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-[45%_55%] lg:gap-9">
          <div className="grid gap-[18px]" role="listbox" aria-label="Agency packages">
            {agencyPackages.map((item) => {
              const isActive = item.id === selectedPackage.id;
              const accent = accentStyles[item.accent];

              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setSelectedPackageId(item.id)}
                  className={`group relative grid min-h-[126px] w-full grid-cols-[48px_minmax(0,1fr)_auto_22px] items-center gap-5 overflow-hidden rounded-lg border p-5 text-left outline-none transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200/26 hover:bg-white/[0.06] hover:shadow-[0_20px_52px_rgba(0,0,0,0.26)] focus-visible:border-indigo-100/54 focus-visible:ring-2 focus-visible:ring-indigo-200/20 sm:p-6 ${
                    isActive
                      ? `border-indigo-100/48 bg-indigo-200/[0.075] shadow-[0_0_0_1px_rgba(199,210,254,0.12),0_24px_70px_rgba(99,102,241,0.16)] ${accent.glow}`
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <span
                    className={`absolute inset-y-5 left-0 w-px transition-opacity ${
                      isActive ? "bg-indigo-100/70 opacity-100" : "bg-white/20 opacity-0 group-hover:opacity-70"
                    }`}
                  />
                  <PackageIcon item={item} />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="block text-[15px] font-semibold leading-6 text-white">{item.selectorTitle}</span>
                      {item.badge && (
                        <span className="rounded-full border border-white/16 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/62">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 block text-xs leading-5 text-white/56">{item.packageName}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-white/40">From</span>
                    <span className="block text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                      {item.price.replace(" CAD", "")}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.12em] text-white/42">CAD</span>
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 justify-self-end transition-transform duration-300 ${
                      isActive ? "translate-x-1 text-white" : "text-white/32 group-hover:translate-x-1 group-hover:text-white"
                    }`}
                    strokeWidth={1.7}
                  />
                </button>
              );
            })}
          </div>

          <article
            key={selectedPackage.id}
            className="agency-package-detail relative overflow-hidden rounded-lg border border-white/16 bg-[radial-gradient(circle_at_80%_12%,rgba(99,102,241,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_26px_86px_rgba(0,0,0,0.42)] sm:p-8 lg:p-9"
          >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 gap-4">
                <PackageIcon item={selectedPackage} large />
                <div className="min-w-0">
                  <h3 className="font-display text-3xl font-normal leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                    {selectedPackage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{selectedPackage.subtitle}</p>
                </div>
              </div>
              <span className="inline-flex w-fit rounded-full border border-white/14 bg-white/[0.035] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/62">
                {selectedPackage.badge ?? "Best for"}
              </span>
            </div>

            <div className="relative mt-8 rounded-lg border border-white/12 bg-black/26 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/46">Best For</p>
              <p className="mt-3 text-[15px] leading-7 text-white/76">{selectedPackage.bestFor}</p>
              <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-5xl font-semibold tracking-[-0.06em] text-white">{selectedPackage.price.replace(" CAD", "")}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/46">CAD</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/66">
                  <Clock3 className="h-5 w-5 text-white/58" strokeWidth={1.6} />
                  {selectedPackage.timeline}
                </div>
              </div>
            </div>

            <ul className="mt-8 grid gap-3.5">
              {visibleFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-[15px] leading-7 text-white/74">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-indigo-100/78" strokeWidth={1.9} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/44">+ more included</p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-md border border-white/86 bg-white px-6 py-[18px] text-xs font-bold uppercase tracking-[0.11em] text-black outline-none transition-all hover:-translate-y-0.5 hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-200/35"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              View Full Inclusions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
          </article>
        </div>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.025] p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Optional Add-ons</h3>
              <p className="mt-1 text-sm text-white/52">Flexible extras that can be added based on project needs.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {agencyAddOns.map((addOn) => (
              <div key={addOn.name} className="rounded-md border border-white/10 bg-black/22 p-4">
                <p className="text-sm font-semibold leading-5 text-white">{addOn.name}</p>
                <p className="mt-2 text-xs leading-5 text-white/58">{addOn.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-white/12 bg-[#020302] shadow-[0_26px_80px_rgba(0,0,0,0.42)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
            <div className="p-5 sm:p-7 lg:p-8">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">Why Canadian Agencies Choose Us</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {agencyBenefits.map((benefit) => (
                  <div key={benefit.title} className="border-t border-white/12 pt-4">
                    <Sparkles className="mb-3 h-5 w-5 text-white/54" strokeWidth={1.6} />
                    <p className="text-sm font-semibold text-white">{benefit.title}</p>
                    <p className="mt-2 text-xs leading-5 text-white/50">{benefit.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-[850px] text-xs leading-6 text-white/42">
                All prices are in CAD. Final pricing may vary based on project complexity,
                integrations, content volume, and timeline.
              </p>
            </div>
            <div className="border-t border-white/12 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <p className="max-w-[240px] text-xl font-semibold leading-7 tracking-[-0.03em] text-white">
                Need a custom agency partnership plan?
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-md border border-white/18 px-5 py-4 text-xs font-bold uppercase tracking-[0.11em] text-white/78 transition-colors hover:border-white/34 hover:bg-white/[0.06] hover:text-white"
              >
                Discuss Partnership
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/78 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inclusions-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="max-h-[86vh] w-full max-w-[760px] overflow-hidden rounded-lg border border-white/14 bg-[#080907] shadow-[0_28px_100px_rgba(0,0,0,0.65)]">
            <div className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">Full Inclusions</p>
                <h3 id="inclusions-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {selectedPackage.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close full inclusions"
                onClick={() => setIsModalOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/14 text-white/70 transition-colors hover:border-white/32 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[calc(86vh-116px)] overflow-y-auto p-5 sm:p-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {selectedPackage.features.map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-md border border-white/8 bg-white/[0.025] p-3 text-sm leading-6 text-white/72">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-indigo-100/78" strokeWidth={1.9} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
