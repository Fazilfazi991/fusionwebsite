# Static trading CRM sales demos

ColdFlow and MedSupply are independent static HTML/CSS/JavaScript demos. The existing collection remains at `/business-software`; `/CRM` redirects there. All seven incumbent entries remain identical and in their original relative order.

## Walk-through for 3 October 2026

**ColdFlow:** Start with the Al Noor compressor enquiry ENQ-1042. Create an itemized quotation for six Copeland compressors and twelve capacitors, save a discount, simulate sending it, revise it and accept it once. Dispatch the four available compressors and all capacitors. The two remaining compressors stay on backorder. Reorder and receive two units, complete the delivery, record sample payments, then open the same customer history and export the sales report.

**MedSupply:** Open the Ritaj equipment enquiry or QT-2026-041 quotation. Revise the two monitors and ECG quotation, simulate sending, accept and convert it once. Allocate individual equipment serials, dispatch partially, complete a dated installation and handover, and inspect its warranty and service reminder. Finish dispatch, record a sample collection, create and complete a linked service job, then inspect customer history and reports.

Both demos have an in-app guide. Reset before each prospect to restore the seed; reset deletes only that demo's state. Browser storage keeps changes on that browser/device between visits.

## Verification

- ColdFlow acceptance: fourteen groups passed, including quantities/monetary validation, quote revisions, duplicate conversion, FIFO reservations, partial purchase receipts and deliveries, settlement, reload/deep links, cancellation, safe rendered user text, tasks, CSV and reset isolation. Nine views checked at 390px with no document overflow or page errors.
- MedSupply acceptance: sixteen checks passed, including revisions and line editing, cancelled simulated sending, duplicate conversion, serial allocation, partial/full dispatch, future and duplicate handover guards, payment persistence, linked service completion, purchase receipts, serial uniqueness, safe rendered notes, search, CSV and reset. Twelve mobile views checked without document overflow or page errors.
- Collection integration: both cards/details/launch links, desktop/mobile dashboards, `/CRM`, and all seven existing demo route smoke checks passed; browser page errors were empty. Original project entries are compared against baseline commit `9e6ed6fded4971c8aac761e48febf18725bf545c`.
- Next production build, lint and TypeScript checking passed. Existing lint warnings remain in Laundry MobileNavigation and image elements in webportfolio/app-shell. The local build logs missing Supabase configuration for unrelated existing email routes; these demos do not use those routes or require that configuration.
- Paired desktop/mobile review cleared the bounded phone readability, chart and disclosure fixes. Existing Inter/navy operational design is retained. A final documentation pass preserved the scoped system; small legacy-style desktop metadata was not made a reusable design rule.

Run the `.cjs` scripts in `scripts/trading-demo/` using Node and Playwright/Edge. `ac-acceptance.cjs` accepts `DEMO_BASE_URL`; `medical-acceptance.cjs` accepts `MEDICAL_URL`; `integration.cjs` accepts `SITE_URL`. Optional `CDP_URL` connects to an existing dedicated test browser. `serve.cjs` serves the public directory on localhost:3211 for independent static testing. Screenshots/test outputs stay outside deployed demo assets; `previews.cjs` generates the two collection WebP previews from captured dashboards.

## Limits

All customers, transactions, equipment serials, prices, payment records and service work are fictional. The seed uses 3 October 2026 as its operational date. VAT, costing and warranty examples illustrate a sales conversation and are not accounting or legal calculations for a real business. Sends, deliveries, payment recording and service completion are simulations. There is no authentication, database, backend, real payment or messaging integration, import, multi-user synchronization, patient data or clinical advice. CSV exports contain sample records. Browser-local state is not a production backup.

Inter is self-hosted under its included OFL license. No remote fonts, API requests or new service credentials are required by either demo.
