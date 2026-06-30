"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  FilePenLine,
  LayoutTemplate,
  LockKeyhole,
  MessageCircle,
  Monitor,
  Palette,
  Rocket,
  ShieldCheck,
  Users,
  Zap
} from "lucide-react";
import {
  processStages,
  processSteps,
  processTrustItems,
  processValuePoints,
  type ProcessStage,
  type ProcessStageId,
  type ProcessStep,
  type ProcessStepId
} from "@/lib/canada-agency-process";

const stageIcons = {
  brand: Palette,
  wireframe: LayoutTemplate,
  concept: Monitor,
  approved: CheckCircle2
};

const stepIcons = {
  inputs: FilePenLine,
  homepage: Monitor,
  review: MessageCircle,
  payment: CreditCard,
  build: Rocket
};

const valueIcons = [LockKeyhole, Zap, ShieldCheck];
const trustIcons = [ShieldCheck, Clock3, Users, BadgeCheck];

function stageForStep(stepId: ProcessStepId): ProcessStageId {
  return processSteps.find((step) => step.id === stepId)?.stageId ?? "concept";
}

function StageVisual({ stage, isActive }: { stage: ProcessStage; isActive: boolean }) {
  if (stage.id === "brand") {
    return (
      <div className="mt-7">
        <div className="text-center font-serif text-xl uppercase tracking-[0.32em] text-white">Fusion</div>
        <div className="mt-2 text-center text-[10px] uppercase tracking-[0.36em] text-white/58">Agency</div>
        <div className="mt-7 flex justify-center gap-3">
          {["bg-[#f8fafc]", "bg-[#6067f5]", "bg-[#151927]", "bg-[#7dd3fc]"].map((color) => (
            <span key={color} className={`h-9 w-9 rounded-full border border-white/26 shadow-[0_8px_24px_rgba(0,0,0,0.22)] ${color}`} />
          ))}
        </div>
        <div className="mt-7 grid gap-3">
          <div className="flex items-end gap-4">
            <span className="font-serif text-3xl text-white">Aa</span>
            <span className="h-px flex-1 bg-white/26" />
          </div>
          <div className="flex items-end gap-4">
            <span className="text-2xl font-semibold text-white/88">Aa</span>
            <span className="h-px flex-1 bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  if (stage.id === "wireframe") {
    return (
      <div
        className={`mt-7 rounded-md border border-white/22 bg-white/[0.055] p-4 transition-transform duration-300 ${
          isActive ? "rotate-y-process translate-y-[-2px]" : ""
        }`}
      >
        <div className="mb-4 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/36" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/22" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/16" />
        </div>
        <div className="aspect-[1.45] border border-white/22 bg-black/20" />
        <div className="mt-4 space-y-2">
          <span className="block h-1.5 w-5/6 rounded-full bg-white/32" />
          <span className="block h-1.5 w-2/3 rounded-full bg-white/22" />
          <span className="block h-1.5 w-3/4 rounded-full bg-white/16" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <span className="aspect-square border border-white/20 bg-white/[0.025]" />
          <span className="aspect-square border border-white/20 bg-white/[0.025]" />
          <span className="aspect-square border border-white/20 bg-white/[0.025]" />
        </div>
      </div>
    );
  }

  if (stage.id === "concept") {
    return (
      <div className="mt-6 overflow-hidden rounded-md border border-indigo-200/30 bg-[#080b17] shadow-[0_18px_50px_rgba(99,102,241,0.16)]">
        <div className="relative min-h-[178px] p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.28),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
          <div className="relative">
            <div className="mb-7 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/62">Northpeak</span>
              <span className="rounded-sm bg-indigo-400/80 px-2 py-1 text-[8px] font-bold text-white">Get Started</span>
            </div>
            <p className="max-w-[210px] font-serif text-2xl leading-tight text-white">Strategic websites for growth.</p>
            <p className="mt-3 max-w-[230px] text-[10px] leading-4 text-white/66">
              Conversion-focused homepage direction designed around your client.
            </p>
            <span className="mt-5 inline-flex rounded-sm bg-white/16 px-3 py-2 text-[9px] font-semibold text-white/88">
              Preview Concept
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-white/10">
          {["Strategy", "Design", "Build"].map((item) => (
            <span key={item} className="px-3 py-3 text-center text-[9px] text-white/64">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-9 grid place-items-center">
      <div className={`approval-ring grid h-24 w-24 place-items-center rounded-full border border-indigo-300/34 ${isActive ? "is-active" : ""}`}>
        <Check className="h-10 w-10 text-indigo-200" strokeWidth={1.8} />
      </div>
      <p className="mt-7 text-center text-xl font-semibold text-white">Approved</p>
      <p className="mt-2 text-center text-sm leading-6 text-white/54">You only pay after approval.</p>
    </div>
  );
}

export function CanadaAgencyProcess() {
  const [activeStageId, setActiveStageId] = useState<ProcessStageId>("concept");
  const [activeStepId, setActiveStepId] = useState<ProcessStepId>("homepage");
  const [hasAutoplayed, setHasAutoplayed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeStage = useMemo(
    () => processStages.find((stage) => stage.id === activeStageId) ?? processStages[2],
    [activeStageId]
  );
  const activeStep = useMemo(
    () => processSteps.find((step) => step.id === activeStepId) ?? processSteps[1],
    [activeStepId]
  );

  function activateStage(stageId: ProcessStageId) {
    setActiveStageId(stageId);
    const relatedStep = processSteps.find((step) => step.stageId === stageId);
    if (relatedStep) {
      setActiveStepId(relatedStep.id);
    }
  }

  function activateStep(step: ProcessStep) {
    setActiveStepId(step.id);
    setActiveStageId(step.stageId);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAutoplayed) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHasAutoplayed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAutoplayed) {
          return;
        }

        setHasAutoplayed(true);
        const sequence: ProcessStageId[] = ["brand", "wireframe", "concept", "approved", "concept"];
        sequence.forEach((stageId, index) => {
          window.setTimeout(() => {
            setActiveStageId(stageId);
            const relatedStep = processSteps.find((step) => step.stageId === stageId);
            if (relatedStep) {
              setActiveStepId(relatedStep.id);
            }
          }, index * 900);
        });
      },
      { threshold: 0.28 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAutoplayed]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-[#050505] px-5 pb-16 pt-12 text-white sm:px-10 lg:px-14 lg:pb-24 lg:pt-14"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_72%_18%,rgba(99,102,241,0.055),transparent_27%),radial-gradient(circle_at_18%_72%,rgba(255,255,255,0.032),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_42%)]" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-12 xl:grid-cols-[32%_1fr] xl:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-indigo-200/70">Our Process</p>
            <span className="mt-4 block h-px w-16 bg-indigo-200/55" />
            <h2 className="mt-7 max-w-[560px] whitespace-pre-line font-display text-4xl font-normal leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[56px]">
              {"A clear process.\nBuilt under your brand.\nApproved before payment."}
            </h2>
            <p className="mt-6 max-w-[520px] text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
              We create a branded homepage concept first, so your agency and client can review the
              direction before the full build begins.
            </p>
            <div className="mt-8 grid gap-4">
              {processValuePoints.map((point, index) => {
                const Icon = valueIcons[index] ?? ShieldCheck;
                return (
                  <div key={point} className="flex items-center gap-4 text-sm text-white/70">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-indigo-200/16 bg-white/[0.025] text-indigo-100/80">
                      <Icon className="h-4 w-4" strokeWidth={1.55} />
                    </span>
                    {point}
                  </div>
                );
              })}
            </div>
            <a
              href="#contact"
              className="mt-9 inline-flex min-h-14 w-full items-center justify-between rounded-md border border-indigo-200/24 bg-indigo-400/[0.08] px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-indigo-200/38 hover:bg-indigo-400/[0.12] sm:w-[290px]"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" strokeWidth={1.7} />
            </a>
          </div>

          <div className="min-w-0">
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
              {processStages.map((stage, index) => {
                const Icon = stageIcons[stage.id];
                const isActive = stage.id === activeStageId;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => activateStage(stage.id)}
                    onFocus={() => activateStage(stage.id)}
                    onClick={() => activateStage(stage.id)}
                    className={`process-stage-card group relative min-h-[330px] w-[270px] shrink-0 snap-start rounded-lg border p-5 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-200/35 md:min-h-[372px] md:w-auto ${
                      isActive
                        ? "z-10 -translate-y-1 border-indigo-100/54 bg-indigo-200/[0.08] shadow-[0_28px_88px_rgba(99,102,241,0.24)] md:scale-[1.035]"
                        : "border-white/16 bg-white/[0.04] hover:-translate-y-1 hover:border-indigo-200/28 hover:bg-white/[0.055] hover:shadow-[0_18px_60px_rgba(99,102,241,0.1)]"
                    } ${stage.id === "wireframe" && isActive ? "process-wireframe-active" : ""}`}
                  >
                    {index < processStages.length - 1 && (
                      <span className="process-connector hidden md:block" aria-hidden="true" />
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-white/56">{stage.number}</p>
                        <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.08em] text-white">{stage.title}</h3>
                      </div>
                      <Icon className={`h-5 w-5 ${isActive ? "text-indigo-50" : "text-white/52 group-hover:text-indigo-100/78"}`} strokeWidth={1.65} />
                    </div>
                    <StageVisual stage={stage} isActive={isActive} />
                  </button>
                );
              })}
            </div>

            <div key={`${activeStage.id}-${activeStep.id}`} className="process-detail-update mt-7 rounded-lg border border-indigo-200/18 bg-black/24 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-100/66">{activeStage.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{activeStep.title}: {activeStep.text}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7">
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {processSteps.map((step) => {
              const Icon = stepIcons[step.id];
              const isActive = step.id === activeStepId;
              const stageId = stageForStep(step.id);

              return (
                <button
                  key={step.id}
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => activateStep(step)}
                  onFocus={() => activateStep(step)}
                  onClick={() => activateStep(step)}
                  className={`group relative min-w-[245px] rounded-lg border p-5 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-200/35 lg:min-w-0 ${
                    isActive
                      ? "border-indigo-100/42 bg-indigo-300/[0.075] shadow-[0_20px_62px_rgba(99,102,241,0.18)] -translate-y-1"
                      : "border-white/12 bg-white/[0.03] hover:-translate-y-1 hover:border-indigo-200/24 hover:bg-white/[0.045]"
                  }`}
                >
                  <span
                    className={`absolute left-5 top-0 h-px w-16 transition-opacity ${
                      isActive ? "bg-indigo-200/70 opacity-100" : "bg-white/20 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <div className="flex gap-4">
                    <Icon className={`h-8 w-8 shrink-0 ${isActive ? "text-indigo-50" : "text-white/50 group-hover:text-indigo-100/72"}`} strokeWidth={1.55} />
                    <div>
                      <p className="text-xs text-white/42">{step.number}</p>
                      <h3 className="mt-2 text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-xs leading-5 text-white/50">{step.text}</p>
                      <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-white/34">{stageId}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-0 overflow-hidden rounded-lg border border-white/12 bg-white/[0.035] md:grid-cols-4">
          {processTrustItems.map((item, index) => {
            const Icon = trustIcons[index] ?? BadgeCheck;
            return (
              <div
                key={item.title}
                className={`flex gap-4 border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:border-white/10 ${
                  index === 0 ? "bg-indigo-200/[0.055]" : ""
                }`}
              >
                <Icon className={`mt-1 h-8 w-8 shrink-0 ${index === 0 ? "text-indigo-100" : "text-white/76"}`} strokeWidth={1.45} />
                <div>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/52">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
