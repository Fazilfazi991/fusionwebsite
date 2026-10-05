# Construction demo assets and dependencies

`public/construction-crm/assets/dpsc-logo.jpg` is the exact DPSC logo embedded in the user-provided quotation reference, extracted as PDF image object IM10 by the project lead. The source logo is 195 × 94 pixels, 5,355 bytes before provenance metadata. It contains company branding only. The user authorized a faithful template demonstration; this asset is supplied material, not an MIT library. Origin is embedded as JPEG COM metadata. `logo.js` carries the same logo bytes so vector PDF export works entirely offline after loading the page. No footer raster, customer details, signatures, stamps, or source PDF is published.

Self-hosted dependencies:

- jsPDF 2.5.2, MIT, `vendor/jspdf.umd.min.js`; full license in `vendor/jspdf-LICENSE.txt`.
- jsPDF-AutoTable 3.8.4, MIT, `vendor/jspdf.plugin.autotable.min.js`; full license in `vendor/autotable-LICENSE.txt`.
- Existing shared Inter font: `/demo-assets/inter-latin.woff2`.

No CDN calls, production authentication, external messages, payment processing, databases, customer imports, or credentials are introduced. All company recipients and people in the starting records are fictional; contact addresses use reserved `.example` domains. PDF footer contacts are fictional. PDF content is text and vector rules/tables, with the supplied raster logo; it is not a screenshot export.
