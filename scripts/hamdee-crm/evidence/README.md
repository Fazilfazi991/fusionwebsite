# Acceptance evidence

Root-owned tests use the supported browser UI, not direct model mutations in the browser. Financial unit tests run separately with `node scripts/hamdee-crm/model.test.cjs` (24 invariants).

Confirmed in the browser: all 13 distinct module pages; all eight property tabs; property search; creation of a partner, property, capital investment and tenant; a partial 500 cash receipt; bounced-cheque replacement with a 1,000 cheque; deposit and single clearance; a 5,500 West Bay settlement; a 500 partial partner payment and an unchanged 1,650 carried balance; unchanged company ledger after investor payments; company overhead/additional income; 40/35/25 property share editing while confirmed 50/30/20 snapshots remain fixed; local refresh persistence; warranty-gated job creation, previous-job viewing and same-vendor zero-cost revisit; external job completion with one cost entry and a 45-day warranty; agent navigation with no owner financial metrics; report previews, filters, export success feedback, audit review notes; scoped reset.

All 13 modules were checked at 390px. Narrow 320px views include dashboard, properties, partners, company accounts, additional transactions and reports. Tables scroll within their own regions. The mobile additional-transaction heading was tightened after inspection to eliminate page overflow. Desktop evidence is at 1440px. Browser error logs were empty.

The PDF and Excel controls execute and show success feedback. The in-app browser did not return a download-event path; format validation separately verifies PDF bytes and numeric Excel round-trip using the shipped libraries. Document attachments are intentionally filename metadata and their downloads are reference sheets.

Next.js production build and TypeScript pass. The build emits pre-existing warnings in unrelated components and missing local Supabase environment diagnostics for the unrelated email application, but completes with exit 0. No unrelated backend code or credentials are changed.

Screenshots are retained for visual inspection and the dashboard/property captures are optimized into the portfolio thumbnails under `public/images/business-software/hamdee-crm/`. All sample changes were reset before client-preview captures.
