# Multi-company CRM demo

An isolated, browser-persisted client demonstration inside the existing Next.js application. No authentication, database, storage bucket, email integration, production module, or deployment configuration is changed.

## Local launch

From the repository root, with Node.js installed:

```sh
npm run dev
```

Open `http://localhost:3000/demo/multi-company-crm`.

If npm is not on PATH in the Codex desktop environment, use its bundled Node executable:

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules/next/dist/bin/next dev -p 3000
```

## Routes

The root opens the dashboard. All eight views support direct navigation:

- `/demo/multi-company-crm/dashboard`
- `/demo/multi-company-crm/customers`
- `/demo/multi-company-crm/meetings`
- `/demo/multi-company-crm/opportunities`
- `/demo/multi-company-crm/quotations`
- `/demo/multi-company-crm/orders`
- `/demo/multi-company-crm/tasks`
- `/demo/multi-company-crm/reports`

Unknown demo views return 404. The selected company persists across views and reloads.

## Presentation journey

1. Choose **Advertising & Giveaways**. Use **Reset Demo Data** to start with fresh dates. Reset replaces only this demo's browser records and uploads for all three companies.
2. Add **Al Noor Events**, including contact information and a manually typed location.
3. From its profile, schedule tomorrow's meeting with purpose **New Business Opportunity**.
4. Create **500 Customized Promotional Bags**, value AED 15,000, initial probability 20%.
5. Open the meeting and choose **Complete meeting**. Link the opportunity, enter notes, set probability to 50%, and choose a follow-up date and task or meeting.
6. Open the opportunity and create a quotation with 500 bags at AED 30 each. Add other items, discount, and tax as needed. Save and change its status to **Approved**.
7. Mark the opportunity **Won**, then **Create order**. Alternatively, convert the approved quotation directly. Repeating conversion opens the existing order; it does not duplicate it.
8. Select **Design** in the operational tracker. Upload an artwork file smaller than 1.5 MB. Record **Revision Requested** with feedback, upload a revised file, then record **Approved**.
9. Update production and delivery information. Select **Production**, then **Delivery** in the tracker.
10. Open the customer profile. Its chronological relationship timeline retains the completed meeting, probability updates, follow-up, quotation approval, artwork versions, approval decisions, and workflow changes.
11. Add **1,000 Corporate Gifts** as a second opportunity. Previous business remains intact.
12. Switch to **Custom Packaging** and **Project Supply**. Review their separate customers and orders, packaging specifications/sample approvals, and supplier quotation/procurement controls.

## Implemented behavior

- Independent company workspaces with subtle blue, teal, and purple identities.
- Relative-date seed data: 10 customers, 7 meetings, 8 opportunities, 4 quotations, 4 orders, and 4 tasks per company, including repeat business and revisions.
- Dashboard KPIs and three interactive charts calculated from the selected company's records. Monthly charts count opportunities by creation month and show how many are currently won; they do not claim historical revenue.
- Customer registration/editing, automatic potential duplicate suggestions, manual duplicate lookup, search, type/recent-activity filters, and profiles containing related records and the full relationship timeline.
- Meeting creation, inline customer registration, calendar/list views, status/date filters, details, completion, notes, outcomes, and follow-up generation.
- Date-based in-app reminders, refreshed once a minute while the application is open. No external or background notification delivery.
- Drag-and-drop pipeline with an accessible stage selector alternative. Probability can be edited independently and never changes automatically when a stage changes.
- Multi-item quotation calculations with absolute AED discount and percentage tax, status updates, professional preview, and order conversion.
- One reusable order engine with company-specific workflow trackers and details; separate operational history, supplier quotations, client confirmations, production and delivery updates.
- Artwork/sample files stored as local data URLs, downloadable after refresh, with version numbers and timestamps. Seed references are explicitly metadata-only. Uploads are limited to 1.5 MB each; browser quota errors are visibly reported.
- Tasks with customer/record links, staff assignment, due dates, priorities, status changes, overdue filter, and follow-up view.
- Company reporting with creation-date filters, derived metrics and charts.
- Responsive layouts, native controls and modal dialogs, keyboard-accessible actions, success notifications, empty states, guide, and reset confirmation.

## Deliberate simplifications

The simulated owner can access all three companies. Record scoping is a demonstration feature, not production authorization. There is no login, accounting ledger, inventory engine, external approval portal, PDF export, email/SMS/push delivery, or cross-company consolidated report. Artwork resides in this browser only. Storage is not shared across devices, and concurrent tab editing is not synchronized. Relative sample dates refresh when demo data is reset, preserving user edits during ordinary reloads.

## Verification

Run the existing project checks:

```sh
npm run lint
npm run typecheck
node scripts/crm-demo/model.test.cjs
```

With the local server running and Playwright plus Microsoft Edge available:

```sh
node scripts/crm-demo/acceptance.cjs
node scripts/crm-demo/interactions.cjs
```

The browser scripts use the Codex bundled Playwright path by default. Set `PLAYWRIGHT_MODULE` to another installed Playwright module path if needed, and `CRM_DEMO_URL` if using another port. Each script uses its own isolated browser context and never changes the presenter's browser data. They produce local screenshots in `scripts/crm-demo/`; these generated artifacts are excluded from Git locally.

The acceptance script verifies the full Al Noor journey, repeat business, persisted state, charts after updates, entity isolation, eight routes, calendar/search, desktop/mobile widths, page errors, and absence of production API requests. The interactions script covers duplicate suggestions, inline customer creation, follow-up meetings, linked tasks, approved quotation conversion, actual drag-and-drop, report filtering, mobile reset/guide, and both other companies' order screens. The model test checks scoping, conversion eligibility/idempotence, independent probability, date seeding, and quotation math.

Actual results: type-check, lint, model tests, both browser suites, and the optimized Next.js build completed successfully. Lint retains two pre-existing image warnings. Build output also reports missing Supabase environment variables for existing email modules; the isolated demo does not use those credentials. Desktop and mobile screenshots were visually inspected.
