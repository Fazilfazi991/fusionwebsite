# AdWorks assets and documentation evidence

The operational interface at `public/advertising-crm/index.html` uses shared self-hosted Inter (`/demo-assets/inter-latin.woff2`) with Arial/sans-serif fallback. The existing `public/demo-assets/README.md` records the unmodified variable Latin font's origin in this website's Next.js font cache; `public/demo-assets/OFL.txt` contains its SIL Open Font License 1.1. Navigation and the AdWorks mark are inline SVG paths authored in `app.js`, using current-color strokes. The workspace introduces no stock, generated or sourced decorative imagery and no icon package or icon font.

## Collection previews

| Asset | Actual source and state |
| --- | --- |
| `public/images/business-software/advertising-crm/dashboard.webp` | Final fictional seed overview; AED -30 actual loss shown red to the left of the zero baseline. |
| `public/images/business-software/advertising-crm/customer.webp` | Harbor customer dossier after the acceptance conference journey; AED 3,380 earned revenue minus AED 1,190 incurred cost equals AED 2,190 actual profit. |

Both previews are actual Playwright captures from the local AdWorks route on October 3, 2026, converted with Sharp to a 1440 × 900 top crop at WebP quality 88. Each has a neighboring `.webp.json` provenance file recording its route, source revision, transformation and creation time. They depict the authored fictional interface, rather than generated imagery. Current provenance records `app.js` SHA-256 `4132a3f0358cd26530506dc8fbdb10332b3bc3b09a80b488223828d1c85db015`; the documentation pass verified that hash against the actual source and inspected both refreshed previews.

## Review evidence and scope

Evidence remains outside the repository in `../evidence/advertising` relative to the project root. The documentation pass read `finance-review.json` (25 passing actual-source invariants; inert DOM/Node VM, not a browser) and `advertising-acceptance.json` (23 passing actual-browser interaction groups, no uncaught runtime errors). Supplied captures use actual viewports of 1440 × 1050, 390 × 844 and 320 × 844. Sampled desktop/phone views cover the seed overview, completed customer dossier and job, finance, and the same itemized rollup-cost dialog; the partial-job capture preserves incomplete gates at 45/46 units ready and 25/46 fulfilled/invoiced.

`finish-review.md` records the five-section review and its two state-presentation findings. `finish-verdict.md` resolves the signed loss chart and full-job tracker corrections with disposition **ship at those two fixes' scope**; it explicitly does not claim a whole-surface finish verdict. Documentation preserves that limit and does not upgrade the operational simulation into an accounting or audit claim.

This pass compared the finished source and supplied rendered evidence with `PRODUCT.md`, `advertising-direction.md`, the persisted AdWorks surface contract, `docs/trading-demos/DIRECTION.md`, the existing extension `DESIGN.md` and `app/demo/multi-company-crm/DESIGN.md`. It records ordinary inherited-world rules only. The incumbent app design, direction contracts, product files, root world/sidecar, other demos and all unrelated work are preserved; pre-existing drift elsewhere is outside this documentation scope. No browser, detector, Git or deployment action was run by the documenter.
