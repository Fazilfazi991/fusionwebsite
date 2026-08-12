"use client";

import { createClient } from "@supabase/supabase-js";

export function createKaamBrowserClient() {
  const url = process.env.NEXT_PUBLIC_KAAM_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_KAAM_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("KAAM account deletion is not configured.");
  }

  return createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
  });
}
