# Workspace CRM design

This design belongs only to the multi-company demonstration; it does not change the surrounding Fusion Ventures marketing website or live CRM modules.

## Intent and domain

The audience is a business owner presenting three legal entities and staff moving from a customer conversation to a delivered order. The interface should feel like a calm, precise working desk. Its domain is relationship history, enquiries, confidence, proposals, artwork versions, approval decisions, production, procurement, and delivery.

The physical color world is white proposal paper, light grey desk surfaces, navy business documents, blue annotations, teal sample labels, and violet supply binders. The signature is the company-specific horizontal order tracker, supported by the same customer relationship timeline in every company. It appears in navigation context, chart stage labels, order details, approval controls, and customer history.

Avoid oversized promotional KPI blocks, ornamental gradients, and a single generic workflow. Use compact figures, record-derived charts, and the actual company stages instead.

## System

- Typography: reuse the project's Inter font. Page title 27px/600, section heading 14px/650, record title 11–12px/550, metadata 9–10px. Desktop content prioritizes scan density while native form controls use 12px text.
- Hierarchy: the dashboard leads with business context and current figures; the customer view leads with the relationship; order details lead with operational progress. Supporting metadata and controls are smaller and muted.
- Palette: navy ink `#17243b`, secondary ink `#6d788b`, canvas `#f7f9fc`, white surfaces, border `#e7ebf1`, inset surface `#f0f4fa`. Company accents: blue `#2563eb`, teal `#0f766e`, violet `#7552bd`. Status hues communicate success, waiting, and revision/overdue conditions.
- Depth: quiet 1px borders, almost no card shadows, stronger shadow only on native dialog overlays. Surface temperature stays cool and neutral.
- Spacing: 4px base rhythm, 12–20px control/card spacing, 32px desktop content gutters, 14px mobile gutters, 236px sidebar.
- Controls: native buttons, selects, dates, checkboxes, files, and `<dialog>` for focus containment/Escape. Visible focus rings. Compact rounded cards (8–9px), controls (6px), and status badges (4px).
- Responsive layout: sidebar becomes horizontally scrollable navigation; six KPI cards become two columns; charts/widgets stack; tables and pipeline scroll within their own containers; dialogs retain vertical scroll. Guide/reset actions remain available in the mobile header.
- Motion: no custom motion is added. Changes are acknowledged by toasts, status badges, and updated charts without timing delays. There are no animated loading screens or chart transitions.

## Components

The shared Field, Badge, Dialog, record button, toolbar, derived Charts, quotation preview, and workflow tracker keep the three entities visually consistent. Scope every query and relationship to the selected company. Never substitute production authentication or external services for the explicit local-demo behavior.
