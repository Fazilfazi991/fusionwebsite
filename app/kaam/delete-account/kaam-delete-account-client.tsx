"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { createKaamBrowserClient } from "@/lib/kaam/supabase-browser";

type Step = "email" | "otp" | "confirm" | "deleting" | "success";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resendDelaySeconds = 45;

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "your email address";
  return `${local.slice(0, 1)}${"•".repeat(Math.min(Math.max(local.length - 1, 3), 6))}@${domain}`;
}

function isRateLimitError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return message.includes("rate") || message.includes("too many");
}

function otpVerificationErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (isRateLimitError(error)) return "Please wait a moment before requesting another code.";
  if (message.includes("expired")) return "This code has expired. Request a new code and try again.";
  if (message.includes("token") || message.includes("otp")) return "That code is not valid. Check the code and try again.";
  return "We couldn't verify that code. Request a new code and try again.";
}

export function KaamDeleteAccountClient() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => setCooldown((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  async function requestOtp() {
    if (isSubmitting || cooldown > 0) return;
    if (!emailPattern.test(normalizedEmail)) {
      setMessage("Enter a valid KAAM account email address.");
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      const { error } = await createKaamBrowserClient().auth.signInWithOtp({
        email: normalizedEmail,
        options: { shouldCreateUser: false }
      });
      if (error) throw error;
      setStep("otp");
      setCooldown(resendDelaySeconds);
    } catch (error) {
      setMessage(isRateLimitError(error) ? "Please wait a moment before requesting another code." : "We couldn't verify this KAAM account. Check the email and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const code = otp.replace(/\s/g, "");
    if (!/^\d{6}$/.test(code)) {
      setMessage("Enter the six-digit code from your email.");
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      const supabase = createKaamBrowserClient();
      const { error } = await supabase.auth.verifyOtp({ email: normalizedEmail, token: code, type: "email" });
      if (error) throw error;
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data.user) throw new Error("No authenticated user");
      setStep("confirm");
    } catch (error) {
      setMessage(otpVerificationErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteAccount() {
    if (!acknowledged || isSubmitting) return;
    setStep("deleting");
    setIsSubmitting(true);
    setMessage(null);
    const supabase = createKaamBrowserClient();
    try {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data.user) throw new Error("Session expired");
      const { error } = await supabase.functions.invoke("delete-account");
      if (error) throw error;
      await supabase.auth.signOut({ scope: "local" });
      setStep("success");
    } catch (error) {
      setStep("confirm");
      setMessage("We couldn't delete your account. Please try again or contact info@fusionventuresglobal.com.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function startOver() {
    setStep("email");
    setEmail("");
    setOtp("");
    setAcknowledged(false);
    setMessage(null);
    setCooldown(0);
  }

  const cardTitle = step === "email" ? "Delete your KAAM account" : step === "otp" ? "Verify your email" : step === "confirm" ? "Permanently delete your KAAM account?" : step === "deleting" ? "Deleting your account" : "Your KAAM account has been deleted";

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 px-5 py-6 sm:px-10 lg:px-14"><div className="mx-auto flex max-w-[980px] items-center justify-between gap-5"><a href="/" aria-label="Fusion Ventures home"><Image src="/fusion-ventures-logo.webp" alt="Fusion Ventures" width={640} height={176} className="h-9 w-auto" /></a><a href="/" className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6a84f]">Return to Fusion Ventures</a></div></header>
      <section className="px-5 py-14 sm:px-10 sm:py-20 lg:py-24"><div className="mx-auto max-w-xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6a84f]">KAAM · FUSION VENTURES FZ-LLC</p>
        <h1 className="mt-5 font-display text-4xl leading-tight tracking-[-0.045em] sm:text-5xl">{cardTitle}</h1>
        <p className="mt-5 text-base leading-7 text-white/65">This secure page supports permanent deletion of existing KAAM Candidate and Employer accounts. You do not need the KAAM mobile app.</p>
        <div className="mt-10 rounded-xl border border-[#d6a84f]/25 bg-white/[0.035] p-6 shadow-soft sm:p-8">
          {message && <p role="alert" className="mb-6 rounded-md border border-rose/50 bg-rose/10 px-4 py-3 text-sm leading-6 text-white">{message}</p>}
          {step === "email" && <form onSubmit={(event) => { event.preventDefault(); void requestOtp(); }} className="space-y-6"><div><label htmlFor="kaam-email" className="block text-sm font-semibold">KAAM account email</label><p className="mt-2 text-sm leading-6 text-white/55">We will send a verification code only for an existing KAAM account.</p><input id="kaam-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-4 w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-base text-white outline-none transition focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/30" required /></div><button type="submit" disabled={isSubmitting || cooldown > 0} className="w-full rounded-md bg-[#d6a84f] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ebbe67] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Sending code…" : cooldown > 0 ? `Try again in ${cooldown}s` : "Send verification code"}</button></form>}
          {step === "otp" && <form onSubmit={verifyOtp} className="space-y-6"><div><label htmlFor="kaam-otp" className="block text-sm font-semibold">Six-digit verification code</label><p className="mt-2 text-sm leading-6 text-white/55">Enter the code sent to {maskEmail(normalizedEmail)}.</p><input id="kaam-otp" type="text" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} className="mt-4 w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-center text-xl tracking-[0.45em] text-white outline-none transition focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/30" required /></div><button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-[#d6a84f] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ebbe67] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Verifying…" : "Verify account"}</button><button type="button" onClick={startOver} className="w-full rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/50">Use a different email</button><p className="text-center text-sm text-white/55">{cooldown > 0 ? `You can request another code in ${cooldown} seconds.` : <button type="button" onClick={() => void requestOtp()} className="underline underline-offset-4 hover:text-white">Send a new code</button>}</p></form>}
          {step === "confirm" && <div className="space-y-6"><p className="text-sm leading-7 text-white/65">KAAM account verified for {maskEmail(normalizedEmail)}. This permanent action deletes your account and associated active KAAM data. It cannot be undone.</p><label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/15 p-4 text-sm leading-6 text-white/80"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#d6a84f]" /><span>I understand that my KAAM account and associated data will be permanently deleted.</span></label><button type="button" onClick={() => void deleteAccount()} disabled={!acknowledged || isSubmitting} className="w-full rounded-md bg-rose px-4 py-3 text-sm font-bold text-white transition hover:bg-[#f03561] disabled:cursor-not-allowed disabled:opacity-50">Delete My KAAM Account</button><button type="button" onClick={startOver} className="w-full rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/50">Cancel</button></div>}
          {step === "deleting" && <div role="status" className="py-4 text-sm leading-7 text-white/70">Your verified KAAM account is being permanently deleted. Please do not close this page.</div>}
          {step === "success" && <div className="space-y-6"><p className="text-sm leading-7 text-white/70">Your account and associated KAAM data have been removed from our active KAAM systems.</p><a href="/" className="block w-full rounded-md bg-[#d6a84f] px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-[#ebbe67]">Return to Fusion Ventures</a></div>}
        </div>
      </div></section>
      <SiteFooter />
    </main>
  );
}
