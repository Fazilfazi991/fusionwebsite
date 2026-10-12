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

## Local staff/counter update — October 12, 2026 (not published)

Synthetic demo employee sign-in uses IDs STF-001/STF-002/STF-003 for the existing branches, SUP-001 and ADM-001; STF-004 illustrates an inactive profile. No credentials or backend auth were added. Counter staff are branch-bound, cannot change bill rates/discounts/sample tax, cancel issued bills, access broader Accounting/Settings, change profiles or reset valid demo data. These are client action checks, not production security. Admin can toggle another employee's active status; supervisor has broader branch/account tracking but cannot edit profile status.

The user-provided Downloads images were visually inspected. Counter now has the requested top New/Save/Paid/Delivery/Print toolbar, customer/line-entry/totals left and lookup/previous customer bills right. Issued Cancel remains unavailable; Discard draft explicitly confirms an unsaved-draft discard. Existing customer IDs remain lookup codes until a customer is added/edited, when a generated C- sample code is assigned. Permitted detail edits remain name, phone, address and notes; branch/code are not freely editable by staff.

Storage key and version remain unchanged. Staff fields and creation/payment/handover snapshots are additive; old records and independent invoice sequences remain intact. Legacy staff IDs and completion dates are not fabricated. Unpaid Bills uses positive balance; Uncollected Laundry uses status != Delivered, so a bill may appear in both. Operational reports count bill creation, payment and delivery by their separate Bahrain timestamps. Existing partial payments, quality-check/driver/dispatch rules and local/offline outbox remain. Counter-collection bypass and issued-bill cancellation/refunds are still undefined and unavailable.

Print preview follows the bilingual green continuous-form reference but uses synthetic records and the existing illustrative tax, not the reference's 10% rate. Width/height/margin/row geometry is adjustable; 210x297mm is a sample default, not a confirmed paper specification. Sample PDF was rendered and verified nonblank on one page. Physical stationery alignment, reverse terms and BM/M/MQ/MK meanings remain pending. Drafts are explicitly unsaved; issued bills/events persist across reload. Print settings are browser-local.

Checks: scripts/laundry/staff-actions.test.cjs; targeted Next lint; TypeScript; Next production build; isolated Edge staff/admin/customer/draft/payment/delivery/report/mobile/actual-offline journeys. Local-only preview: http://localhost:3021/demo/laundry. Test evidence and captures are in C:\Users\USER\Documents\Codex\2026-10-01\task\laundry-counter. No commit, push, merge, deployment, external messaging or real payment action.

## Staff visual correction — local review only

The counter-staff role now lands in a standalone dense beige/native desktop-style screen, not the management sidebar/card shell. The re-inspected client screenshots determine the small inline customer fields, left service/quantity entry and cyan table, inline totals, right gray customer/results and prior-bills tables, and blue selected rows. Customer Number accepts code/name/phone lookup and selected customers populate details. Staff enters a garment and quantity then uses Add item (or Enter) before Save. The top New/Save/Paid/Delivery/Print/Cancel toolbar follows the user's requested top placement; issued Cancel remains disabled and Discard unsaved draft is separate. Sample data, locked staff prices/discounts/tax, and compact demo/offline status are necessary deviations. Admin/supervisor retain the separate management presentation.

Corrected preview: http://localhost:3022/demo/laundry. Captures, supported Library receipt and browser verification: task/laundry-counter/corrected-counter-desktop.png, corrected-counter-library-receipt.json and classic-browser-verification.json. No remote publication was performed.

## Dedicated staff entry and customer/bill access

Staff URL: /demo/laundry/staff. Management stays at /demo/laundry. Each entry offers its corresponding synthetic role profiles; persisted sessions do not expose the other workspace. Enter name, phone or code in the clearly labeled Find customer field, then click Select; Enter selects one match and ArrowDown focuses the result button. Selected details are explicitly read-only until Edit customer details. Add new customer opens editable fields; matching phone numbers prompt before creating a separate sample record. Repeated customer Save reuses its draft ID. Changing the search blocks saving against the previously selected customer until a result is selected.

Saved staff bills show View Bill, Download PDF and Print in the toolbar/history and billing dialog. Download produces a real browser-local PDF with bilingual high-resolution rendered pages, correct bill/customer/line/tax/payment data and automatic page breaks; it does not mutate issued data. Text is rendered into the PDF pages rather than being selectable vector text. The existing repository jsPDF vendor is copied locally with its license. Only the two exact laundry shells, Next static assets and this local vendor are cached; staff reload and PDF generation were tested with the browser actually offline. Existing currency/rates/5% illustrative tax and print-calibration limits remain. No physical printer validation or backend security/sync/payment/messaging integration is claimed.

Final QA: model permission tests, targeted lint, production type/build checks, comprehensive Windows Edge staff/admin/customer/duplicate/quantity/bill/reopen/repeat-payment/delivery/pending/report/PDF/mobile/offline journeys, one-page and 30-line three-page downloaded PDFs rendered with Poppler, and final persistent 3022 staff route HTTP200 verification. Evidence is task/laundry-counter/comprehensive-qa.json and final-3022-verification.json. No commit/push/deployment.

## Current offline acceptance recheck

The existing route-scoped shell is retained: only exact /demo/laundry and /demo/laundry/staff navigation, same-origin Next static assets and the local PDF vendor are cached. An online visit and Offline shell cached confirmation are required before disconnecting. No parent-site worker or backend was added.

Fresh production build and isolated Edge networking-disabled tests passed for customer creation/lookup, order creation/edit/status, billing, three-decimal payment, driver dispatch/delivery completion, cached local reports, persisted outbox, offline queued WhatsApp preview, reconnection simulation, sample conflict resolution, branch isolation, unique sample prefixes and reset IDs disjoint from erased invoices. Corrected a delivered-bill action guard so later reviewed message previews persist as Queued while offline instead of being treated as repeated handover. Sync and online sends remain explicitly simulated; there is no actual WhatsApp delivery or server synchronization.

Evidence: task/laundry/current-offline-build.log and current-offline-recheck.json; task/laundry-counter/comprehensive-qa.json. This recheck made no GitHub mutation or deployment. Branch addition remains future/unconfirmed, prefixes are demo configuration, all BHD prices and tax are sample assumptions. Browser storage/cache eviction and concurrent devices remain production limitations; durable outbox, authentication, idempotent backend processing, sequence allocation, conflict handling, backup/privacy and worker update management require production implementation.