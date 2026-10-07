# HAMDEE INTERNATIONAL client-review demo

Open `/hamdee-crm/index.html` or `/hamdee-crm`. The project is listed first in the existing `/business-software` CRM collection; `/CRM` redirects to that collection. The demo is static and operates independently of the website's application APIs.

Local preview: `node scripts/hamdee-crm/serve.cjs`, then open `http://127.0.0.1:4173/hamdee-crm/index.html`. Production assets are served from Next.js `public/` without this preview helper.

## Walkthrough

1. Dashboard: 10 properties, 8 occupied, 2 vacant, Riyal 62,500 scheduled monthly rent, 54,800 received and 7,700 outstanding.
2. Open Al Rayyan Villa. Its 9,000 rental receipts less 1,100 costs and 500 Hamdee service charge yields 7,400. Main Investor/Ahmed/Khalid receive 3,700/2,220/1,480 at their property-specific 50/30/20 shares. Pearl has one investor; Al Waab has two. Change shares in the Partners tab or use contribution-based allocation.
3. Collections: record partial cash, advance, adjustment or carry-forward. Adjustments and rolling balances create no cash. Cheque payments create a pending cheque rather than a receipt.
4. Cheques: open the bounced Al Waab cheque, link a replacement, deposit it and clear it. Clearance generates exactly one rent receipt. Cleared cheque histories cannot be changed back to pending.
5. Maintenance: create an AC job at Al Rayyan. The earlier repair was completed 19 September and is covered until 22 November. View its history, assign the same vendor for a zero-cost revisit, or explicitly continue with new work. Updating a job records completion, invoice and warranty; completion cost enters the property ledger once.
6. Settlements: generate a West Bay settlement, review the financial bridge and configured shares, then confirm. Record paid/partial/carry-forward for each partner. Duplicate property-period settlements and overpayments are blocked. Confirmed snapshots retain original economics if the ledger changes.
7. Company Accounts: 5,000 service income + 650 additional income − 3,200 overhead = 2,450 company profit. Investor returns are excluded. Property expenses, company overheads, capital costs and miscellaneous transactions have explicit financial-layer classification.
8. Reports: filter real sample rows and download PDFs or Excel workbooks; partner statements, settlement statements, receipts and document reference sheets download as real PDFs. Annual audit pack and reconciliation are explicitly illustrative.
9. Profile/Settings: preview Owner / Admin or Collection Agent. Agent navigation and actions expose tenants, collections and cheques without investment/settlement/company figures. Set the currency label and defaults; property configurations can override income and share basis.

## Demo boundaries

The supplied logo is retained unchanged. All records are fictional and reference October 2026. State is saved under `hamdee-investment-demo-v1` in browser localStorage. Reset affects only that key. No authentication, database, file upload service, bank connection, messages or actual payments are implemented. Roles are visual demo roles, not a security boundary. Attachments store filename/size metadata; document downloads are reference sheets, not originals. Capital costs are not monthly deductions. Tenant deposits are displayed as liabilities and excluded from rental profit. Monthly agreement rent is the demo's schedule even when quarterly or annual payment preferences are selected; detailed billing cadence and historical rent amendments need the final specification. Carry-forward partner balances remain attached to the original settlement and can be paid later; no new income or duplicate allocation is created.

Fixed property service charges start with each property’s management start month and apply during vacancies. Cash basis is the seed default. Accrual is available for review; allocations exceeding cash available at confirmation cannot be paid. Settlement revision/reversal is outside the prototype, and confirmed snapshots must be reviewed after ledger changes. Annual bank totals separate operating receipts from capital funding; no bank balances are claimed as reconciled.

Third-party local export bundles are jsPDF, jsPDF-AutoTable and SheetJS, with their license files in `vendor/`. Inter and its license are shared from `/demo-assets/`.

## Verification

Run `node scripts/hamdee-crm/model.test.cjs` for the financial invariants. Browser acceptance uses the real UI for all 13 pages, all eight property sections, collection/cheque/settlement/warranty workflows, persistence, role visibility, downloads, report filtering and responsive layouts. `DESIGN.md` records the scoped design and motion assessment.
