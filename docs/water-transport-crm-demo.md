# AquaFleet CRM — water transport demo

## Confirmed Client Requirements

The supplied written brief describes a small water delivery operator with 2–3 tankers and assigned drivers, cash and credit customers, a prepaid government/source water account, vehicle-level reporting, important fuel monitoring and intended expansion through 50/50 partnerships. The primary operating entities are trips, customers, vehicles, drivers, water-source accounts, fuel, collections, expenses and profitability. Generic lead, quotation and opportunity pipelines are outside this workflow.

The brief is the requirements source used here. No client recordings or real client records were supplied or consulted. Names, registration examples, contacts, account numbers, transactions and financial figures are fictional.

## Client workflow

1. Select a customer, available tanker, driver, water source, quantity, delivery location, date/time, charge and payment type. The assigned vehicle's default driver is selected automatically; the customer supplies location and cash/credit defaults.
2. Create the trip as Assigned, reserving the tanker and driver. Scheduled seed trips require an explicit assignment and cannot claim a tanker that is busy.
3. Load water. The source cost is quantity × the source's rate. Loading checks available balance and posts one debit with balance before/after and a link to the trip. Low balance below AED 1,000 produces a visible warning.
4. Record actual fuel litres and cost, driver earnings and other trip expenses while Loading. Estimates are excluded from expenses. Costs can be posted once. Actual costs are required before dispatch.
5. Dispatch and confirm delivery. Delivery recognizes the charge as revenue and creates the balance due.
6. For cash, record collection before completion. For credit, complete the trip with a balance outstanding and a due date based on credit terms. Partial and full receipts reduce the outstanding balance without recognizing revenue twice.
7. Completion releases the vehicle and driver. Trips, customer profiles, tanker/driver analytics, expenses, credit balances, reports and partner allocations read the same browser-local model.

## Modules

| Module | Implemented scope |
| --- | --- |
| Dashboard | Eight KPIs; today's dispatch table; fleet state and contribution; source balance; revenue/cost, fuel, cash/credit and trip comparisons; completed walkthrough |
| Trips | Search plus status, vehicle, driver, customer, date and payment-type filters; create form; detail; guarded status transitions; actual cost recording |
| Customers | Operational contact/location and terms; credit limit; outstanding; monthly trips/revenue; full trip history, receipts and notes |
| Vehicles | Capacity, driver, ownership, availability; vehicle revenue, source/fuel/driver/other cost and net profit; monthly fuel comparison and averages |
| Drivers | Default and live assignment; completed trips, handled revenue, earned driver costs, fuel per recorded trip and recent trips |
| Water Source | Two prepaid accounts, rates, balances, monthly loads/litres/spend; running load/recharge ledger; recharge form and low-balance warning |
| Payments | All, Cash, Credit, Outstanding, Paid and Overdue filters; invoice/due date/status; partial/full collection; receipt history |
| Expenses | Derived actual trip costs plus separate fleet expenses; vehicle/month/category filters; add maintenance, toll, parking or other fleet cost |
| Partners | One partnership vehicle; investment; monthly revenue and costs; profit/loss split equally between company and partner |
| Reports | Fleet, fuel, customer, driver, financial and government-account reports; month selection where relevant; working CSV export per report |

## Demo data and accounting rules

The initial dataset has nine UAE-style customer accounts, three fictional vehicles, three drivers, 36 trips (14 September and 22 October), two source accounts, receipt history, four fleet expenses and one partner. The fixed demo date is **5 October 2026**, with September and October reports. New trips can be booked for that date or later; operational steps on future bookings remain blocked. Collections and expenses cannot be posted after the demo date. Recharge entries cannot be backdated before the account's latest transaction.

The model has one source of truth in `public/water-transport-crm/model.js`. All figures use AED and quantities use litres. On the initial October dashboard: delivered revenue AED 14,300, actual operating costs AED 10,503, net profit AED 3,797. Opening demo source balances start in September; the running ledger yields AED 12,650 for the government account and AED 2,000 for the northern source.

`TR-1058` is the completed walkthrough: Al Noor Contracting LLC, Dubai Investment Park, Dubai A 45821, Shabeer, Government Filling Station 01 and 5,000 L. Revenue is AED 550, water AED 210, fuel AED 95, driver AED 40, other AED 0, operating cost AED 345, profit AED 205 and credit outstanding AED 550. Its source debit and vehicle/customer contribution are already reflected in seed balances. Creating the same new delivery produces these exact incremental effects across modules.

Revenue is recognized at Delivered or Completed. Actual water cost is incurred at loading; other actual trip costs are recorded during loading. Monthly profit includes all actual costs posted in the period, including work still in progress, and separate fleet expenses. Trip expenses are derived for the expense register and are not counted again. Source recharges affect prepaid cash balances, not profit. Driver costs are earned operational costs, without a separate payroll/disbursement workflow. Customer and driver contribution exclude unallocated fleet overhead; vehicle and company net profit include vehicle-assigned overhead.

September is a full demo month and October is month-to-date. Fuel charts state that explicitly. A reduction in total litres across these unequal periods does not imply improved efficiency. Fuel per trip divides actual recorded litres by trips with costs recorded. No distance-based efficiency claims are made without odometer or GPS data.

## Demo Enhancements / Assumptions

- The name AquaFleet, two illustrative filling stations, fictional rates/credit limits/terms and all financial values are presentation choices, not verified client details.
- Native dialogs, local persistence, reset, CSV reports, receipt references and explicit workflow gates make the demonstration reviewable.
- Light maintenance, toll and parking costs extend the required expense view; this is not a maintenance scheduling or workshop system.
- Partnership investment is illustrated as AED 90,000 total, shared equally. The 50/50 amount is an earned allocation of profit or loss, not a payment or legally defined distribution.
- One tanker and one driver can hold one noncompleted assignment at a time. Future bookings reserve these resources immediately. Scheduling optimization and multi-trip route queues would require a production scheduling model.
- Credit-limit warnings are advisory in this demo. They do not block bookings or represent an approved credit-control policy.

## Persistence and simplifications

Everything runs in static HTML/CSS/JavaScript without login, backend, external font/CDN or chart dependency. The shared Inter font is hosted in the same repository. The localStorage key is `fusion-aquafleet-crm-v1`; Reset clears only this demonstration. If storage is unavailable, changes remain in the session. Malformed saved JSON is replaced by the fictional starting state with a visible notification. All user-entered text is escaped when displayed; CSV export guards against spreadsheet formula prefixes.

The initial 36 trips are deliberately a small presentation dataset rather than an attempt to reproduce the client's actual monthly volume. Trips and costs are append-only in the UI. Costs cannot be amended, deliveries cannot be cancelled/refunded, and posted transactions cannot be reversed. No VAT, bank reconciliation, audit controls, depreciation, production integrations, live tracking, actual WhatsApp messages or money transfers are implemented.

## Fusion Ventures integration

- Portfolio entry: `app/business-software/softwareProjects.ts` with title AquaFleet CRM, six requested feature tags and **View Demo** CTA.
- URL: `/water-transport-crm/index.html`.
- Preview: `public/images/business-software/water-transport-crm/dashboard-preview.webp`, captured from the actual dashboard, matching existing portfolio WebP assets.
- Portfolio heading derives its count from `softwareProjects.length`; page metadata now includes water transport without a stale hardcoded count. Other project entries remain intact.

## Verification and local review

The standalone demo can be served using the existing `node scripts/trading-demo/serve.cjs` preview server, then opened at `http://127.0.0.1:3211/water-transport-crm/index.html`. The Next.js site serves the same public URL and the portfolio at `/business-software`.

Run:

```powershell
node --test scripts/water-transport-crm/model.test.cjs
node scripts/water-transport-crm/acceptance.cjs
node scripts/water-transport-crm/preview.cjs
node scripts/water-transport-crm/integration.cjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next lint
node node_modules/next/dist/bin/next build
```

These direct Node invocations are equivalent to the package scripts and also work when npm is not on PATH. Browser scripts use the environment's bundled Playwright and Microsoft Edge; `PLAYWRIGHT_MODULE` can override the library path. `AQUAFLEET_URL`, `SITE_URL` and `EVIDENCE_DIR` allow alternate local servers and evidence locations. Browser evidence defaults to the OS temp directory. The browser is tooling only and is not shipped as a runtime dependency.

Model tests cover seed relationships, profit/expense reconciliation, source running balances, duplicate debit/cost prevention, full cash/credit journeys, partial/overpayment, low-balance loading gates, recharge neutrality, assignment/capacity/date/number validation and partnership changes. Browser acceptance exercises all modules and workflows at 1920, 1440, 1280, 1024, 768, 430×932 and 390×844, including stacked forms, dialogs, Escape, mobile navigation, persistent state, CSV download and page containment.

### Results — 5 October 2026

- Typecheck passed.
- Lint passed with three pre-existing warnings in the laundry navigation, web portfolio and app shell. No new lint warnings were introduced.
- All ten AquaFleet model tests passed. The existing CRM model test also passed.
- Production build completed successfully. Existing email/dashboard integrations logged missing Supabase environment variables during rendering attempts; those unrelated routes require their existing environment configuration for live operation. No backend settings were changed.
- Browser acceptance passed with no JavaScript, console or failed-response errors. All ten modules, both complete trip workflows, actual cost/source accounting, collections, persistence, six report downloads and reset were exercised.
- All seven requested widths passed page/modal containment checks. Desktop and 430/390px dashboard, form and detail screenshots were visually inspected.
- Production-site integration passed at 1440, 430 and 390px: `/CRM` redirect, 14 portfolio entries, loaded preview, project modal and View Demo opening the actual dashboard. All 13 preceding software project entries remained identical. Seven existing website/demo routes returned successful responses.
- Evidence files are saved in the OS temp `aquafleet-evidence` directory (`acceptance.json`, `integration.json`, dashboard/form/detail and portfolio PNGs). The portfolio WebP is committed with the implementation.

## Future production features

Confirm source-provider terms, litres/rate units, fuel receipts, credit policy and the actual partnership cost-sharing agreement before production modeling. Production work could add secure roles, a shared database and transaction/audit history, reversals and cost amendments, customer/driver imports, reliable scheduling, odometer/GPS readings, delivery acknowledgment, invoices and tax treatment, partner payouts, bank reconciliation, source-provider integration and consent-based WhatsApp communication.
