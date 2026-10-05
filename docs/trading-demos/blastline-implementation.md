# Blastline demonstration handoff

Entry: `/blastline-crm/index.html#overview`. Static HTML/CSS/JS, approved root-provided logo, shared self-hosted Inter. Fourteen complete modules: overview, enquiries, customers, catalog, sales, quotations, rentals, fleet, repairs, dispatch, stock, finance, tasks and reports. Fixed phone navigation exposes all modules via More. No backend, auth, Supabase, customer import, real send, real payment or third-party product asset is introduced.

## Connected walkthrough

1. Open Horizon Protective Coatings from the overview or guide. Enquiry E1 joins abrasive purchasing, compressor rental and the customer's WARRIOR repair.
2. Save a Garnet quotation, revise it, record acceptance and convert once. Reserve stock, deliver partially and issue an invoice only for the new delivered balance. Receive a partial purchase to replenish stock and finish delivery. The first invoice face never changes.
3. Reserve COMP-001 with explicit dates and daily/weekly/monthly sample terms. Overlaps and maintenance units are rejected. Dispatch records the kit; extension rechecks all bookings. Return inspection captures the actual exclusive end date, individual accessories, condition and damage. Missing/damage sends the unit to internal fleet maintenance. Billing uses actual calendar duration before issuing an immutable invoice. A late-return overlap is retained in inspection/history for operational review, while physical dispatch always refuses a unit already on rent.
4. Open customer-owned repair W1. Save diagnosis/estimate, issue it, record approval, create/receive linked demonstration parts, reserve them, start repair, finish work and pass QC. QC failure returns work to the technician. Only ready equipment can be invoiced, and invoice issuance precedes final customer handover. Declined work stops without an invoice.
5. Allocate sample customer receipts within each invoice's remaining balance. The dossier and reports reconcile all three services. Fleet internal maintenance remains separate from billable customer work.

All money is integer cents and fictional net AED; no tax inference is made. A daily term bills calendar days, weekly uses ceiling(days/7), monthly ceiling(days/30). Rental intervals are start-inclusive/end-exclusive. No deposits, refunds or damage revenue are modeled. Purchase costs are commitments, receipts change stock, and sales order cost snapshots support the delivered-sales margin. The demo does not claim inventory valuation, a complete accounting system, workshop profitability or audit readiness.

## Verification contract

`window.BlastlineDemo` is a frozen read-only interface: `storageKey`, `getState()`, `financial(customerId?)`, `availability(assetId,start,end,excludeRentalId?)`, `availableStock(productId)` and `rentalAmount(rentalId)`. Returned objects are copies. State is local to `fusion-blastline-crm-v1`; reset replaces only that key. Inaccessible browser storage allows a session-only demo; a new storage write failure rejects that transaction atomically and subsequent work can continue in-session.

Root executes `scripts/trading-demo/blastline-acceptance.cjs` using `DEMO_BASE_URL` and `OUT`. It uses real Playwright UI controls in an isolated Edge context and cleans up in finally. Assertions cover the connected three-service flow, protected invalid forms, repeat-action affordances, stock partial/full progression, booking conflicts and cancellation, accessory maintenance blocks, repair parts/QC/decline, immutable invoice faces, overpayment rejection, unified finance, refresh, scoped reset and actual mobile navigation at 320/390px. Captures settle fonts/toasts and scroll to zero. No browser was launched by the implementation agent.

Catalog facts/provenance: `blastline-research.md`. Approved logo source/provenance and direction are root-owned. Shipping visual finish is determined by the root's bounded browser/finish review; open findings belong in its acceptance report.
