# Laundry CRM local demo

Route `/demo/laundry`, added only under `app/demo/laundry` in the existing Fusion Ventures Website checkout. The production preview runs at `http://127.0.0.1:3013/demo/laundry`. Start after building with `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 -p 3013`.

## Confirmed scope and assumptions

Three laundries in Bahrain; customer records/history, multi-service garment entry/editing, sequential cleaning status, delivery assignment/completion, invoicing, payments/expenses, daily/monthly reports, 7/30-day branch charts and keyboard billing. The main billing flow is invoice review → exact WhatsApp preview → fresh acknowledgment → explicit simulated send.

Manama/Riffa/Muharraq remain synthetic branch names. BHD rates 12/45/35/25, default illustrative tax 5%, staff, contacts, workflow, prefixes MNM/RFA/MHQ and sequence starts are sample assumptions. BHD totals round to three decimals; tax applies after an absolute discount. Payments cannot exceed balance, and edits cannot reduce an invoice below recorded payments. Prefixes are editable per branch; sequence counters advance independently and are read-only. Existing IDs and reviewed-message snapshots remain unchanged.

Reports use Bahrain calendar dates: billed and pending refer to invoices created in the period (pending is their current balance); collections use payment dates. Cash movement means collections less entered expenses, not statutory profit. Charts and reports represent local records rather than globally current accounts. Report schedules, SMS/email delivery and future branch creation remain unconfirmed.

## Keyboard and local offline workflow

Alt+N opens order entry from every view. Initial form focus and native Tab navigation support quick customer/billing intake.

The browser key is `fusion-laundry-demo-bahrain-v2`; earlier v1 sample data is preserved. Offline simulation supports customer lookup/create, order entry/edit/status, invoices/payment/delivery and local reports. Changed records enter a persisted branch-scoped outbox. Offline message actions remain Queued, not delivered. Online simulation enables explicit Simulate sync; it only changes local statuses. Repeating it does not duplicate invoices. The sample conflict can be resolved by keeping a local change; no actual server comparison occurs.

A route-scoped service worker now caches the laundry shell and required static assets after an online visit. Wait for Offline shell cached before disconnecting. Actual browser-offline reload and the core local workflows were verified. No backend sync was installed. Browser cache/storage eviction can remove the shell or records; private mode/quota failures and service-worker version upgrades remain production limitations. Production needs durable outbox storage, authenticated offline access, branch-safe sequences, idempotent backend commands, conflict resolution, reconnection handling, privacy/backup controls and hardened service-worker update management. Real communications must wait for reconnection. Concurrent tabs/devices are not synchronized.

Reset samples replaces only this demo after confirmation. Malformed records show recovery guidance and remain saved until explicit replacement.

## Verification and preservation

Full `next build` completed with exit 0 and generated `/demo/laundry`. It reported two pre-existing image lint warnings and missing-Supabase messages in unrelated email routes. Those modules and their configuration remain unchanged. The tracked-file diff is empty; only five files under the new laundry route are untracked. Existing homepage, workspace CRM and autoparts CRM return HTTP 200 in the production smoke check.

TypeScript and targeted lint passed. Browser acceptance covers customer/service intake, invoice calculation, stages/required driver/delivery, partial/full payment, reviewed sends, history, expenses, branch isolation, reload persistence and mobile overflow. Recovery tests cover malformed JSON/records, reset cancel/confirm, preservation of another demo key and immutable repeated-message snapshots. Offline tests cover keyboard intake, all local workflow stages, persisted queue, conflict resolution and idempotent sync. Final production tests cover empty-history rejection, BHD precision, report aggregation and Alt+N from Customers/Accounting. The site’s existing missing `/favicon.ico` is the only browser console resource warning observed.

Evidence folder: `C:\Users\USER\Documents\Codex\2026-10-01\task\laundry`. Key files: `production-build-verified.log`, `verification.json`, `recovery-verification.json`, `offline-verification.json`, `final-smoke-verification.json` and named desktop/mobile screenshots. Acceptance scripts use temporary headless Edge profiles. Final review explicitly used GPT-6.1 Sol; its two functional findings were corrected and verified.

No real sends/payments or database changes occur. Publishing to the existing Fusion repository and hosting was explicitly authorized after the local review. LMT/China projects are outside this change.

## Actual offline shell verification

`sw.js/route.ts` serves a worker registered only at `/demo/laundry`. Its navigation handler caches only the exact laundry route and its asset handler allows same-origin `/_next/static/` resources; it never intercepts APIs or other navigation. Tests proved homepage and workspace CRM documents have no laundry controller. Only this worker’s named caches are maintained. The parent site has no global worker added.

`browser-offline-verification.json` records actual Playwright browser networking disabled plus reload, customer lookup/create, order entry/edit/status, delivery, invoice/payment, reports, queued messages, reload persistence, branch IDs, prefix collision rejection, reset uniqueness, sync retries and mobile overflow. Full build evidence is `production-build-offline-shell.log` (exit0). The app shows actual browser connectivity separately from the optional offline simulation; sync is disabled and messages remain queued while the browser is offline. Reports clearly show local records without server freshness.

BeSmile visual reference was inspected in this iteration: Fusion’s local `public/images/business-software/besmile/director-dashboard.webp`, the screenshot associated with the linked public demo in `softwareProjects.ts`. Adopted hierarchy: KPI row above a wide trend section, finance comparison and operational queue beneath; white/cool surfaces and teal actions. The public live page itself was not inspected, and no clinic workflows/data were reused.

Normal confirmed resets clear the synthetic records/outbox but preserve branch prefixes and advance counters. Restored fixture invoices receive fresh IDs, so reset does not reuse IDs from the erased demo records. Browser storage loss or corruption still needs production recovery/backup design.

Dashboard correction: five separate KPI cards and a plotted daily billed/collected chart follow the inspected local BeSmile director screenshot. Finance, cleaning pipeline and service donut use branch-local records. Verbose simulation controls are collapsed. Fresh/reset samples include 30 days of illustrative history; existing saved records are never automatically overwritten. No client rates or taxes are asserted.

Reporting update: Today, This month, Last 7/30 days and applied Custom dates are shared between Dashboard and Accounting. Start/end are inclusive Bahrain calendar dates. Custom reports accept up to 366 days in this demo; invalid input preserves the last applied report. Billing uses creation date; collections use payment date; expenses use expense date. Outstanding balances and operational cards show current local state, not historical snapshots. No saved customer/order/payment records are changed by reporting controls.

Accounting layout: compact shared date controls precede four range metrics, a daily billed/collected/expense plot and cash-movement statement. Payment ledger supports invoice review and expandable remaining rows; expense ledger and purposeful empty states retain existing actions. Daily breakdown is expandable below the ledgers. No financial rules, record storage or backend semantics changed. Refinement used the installed Impeccable layout and craft-floor guidance after inspecting the exact supplied Accounting screenshot.

Mobile navigation uses fixed Home/Orders/Billing/Delivery tabs plus a native More dialog for Customers/Accounting/Settings, with safe-area padding and focus return. At small widths, record/report/invoice tables reflow into labeled two-column rows rather than requiring sideways swipes; desktop tables/sidebar remain.
