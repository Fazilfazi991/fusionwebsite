export type SoftwareProject = {
  slug: string;
  title: string;
  type: string;
  description: string;
  positioning: string;
  features: string[];
  status: string;
  demoUrl?: string;
  liveDemoLabel?: string;
  screenshots?: {
    id: string;
    label: string;
    src: string;
    alt: string;
  }[];
  accent: "blue" | "gold";
};

export const softwareProjects: SoftwareProject[] = [
  {
    slug: "blastline-crm",
    title: "Blastline",
    type: "Equipment Sales, Rentals & Repair CRM",
    description:
      "Connect equipment and abrasive sales, physical rental assets and customer repair jobs with stock, dispatch, invoices and one customer history.",
    positioning:
      "Follow a fictional contractor buying Garnet, renting a compressor and repairing a WARRIOR pump. Check booking conflicts, accessory returns, internal fleet maintenance and approval-to-QC workshop gates in one browser-local workspace.",
    features: ["Sales & Quotations", "Rental Dates & Availability", "Accessory Returns & Maintenance", "Repair Approval & QC", "Stock & Purchasing", "Unified Customer & Finance"],
    status: "Interactive sales demo",
    demoUrl: "/blastline-crm/index.html",
    liveDemoLabel: "Launch Blastline Demo",
    screenshots: [{
      id: "blastline-dashboard",
      label: "Operations Dashboard",
      src: "/images/business-software/blastline-crm/dashboard.webp",
      alt: "Blastline fictional equipment sales, rentals and repairs dashboard with AED collections and linked operating queues"
    }, {
      id: "blastline-customer",
      label: "Three-Service Customer",
      src: "/images/business-software/blastline-crm/customer.webp",
      alt: "Blastline customer dossier joining Garnet sales, compressor rentals and WARRIOR pump repairs with invoice and receipt history"
    }],
    accent: "blue"
  },
  {
    slug: "advertising-crm",
    title: "AdWorks",
    type: "Advertising, Printing & Gifting CRM",
    description:
      "Connect enquiries, itemized quotations, artwork approvals, in-house and outsourced production, deliveries and collections with customer and job profit.",
    positioning:
      "Follow a fictional Dubai signage and gifting job from quotation to artwork approval, supplier QC and partial delivery. Review itemized material, labor, vendor and delivery costs alongside earned revenue, cash and customer history.",
    features: ["Enquiries & Quotations", "Artwork & Client Approvals", "Mixed Production Workflows", "Outsourcing & Supplier QC", "Delivery & Collections", "Customer & Job Profit"],
    status: "Interactive sales demo",
    demoUrl: "/advertising-crm/index.html",
    liveDemoLabel: "Launch Advertising Demo",
    screenshots: [{
      id: "advertising-dashboard",
      label: "Job Dashboard",
      src: "/images/business-software/advertising-crm/dashboard.webp",
      alt: "AdWorks fictional advertising and printing dashboard showing earned AED revenue, actual costs, job profit and production queues"
    }, {
      id: "advertising-customer",
      label: "Customer Profit",
      src: "/images/business-software/advertising-crm/customer.webp",
      alt: "AdWorks customer dossier connecting orders, itemized job costs, earned profit, invoices and payment history"
    }],
    accent: "gold"
  },
  {
    slug: "ac-parts-crm",
    title: "ColdFlow",
    type: "AC & Refrigeration Parts Trading CRM",
    description:
      "A complete parts trading desk connecting enquiries, itemized quotations, stock, purchasing, partial deliveries and collections in AED.",
    positioning:
      "Follow a Dubai parts enquiry through a revised quotation, sales order, backorder, supplier receipt and final delivery. Every change stays connected to the customer history in a fictional browser-local workspace.",
    features: ["Enquiries & Customer History", "SKUs, Brands & Stock", "Quotations & Revisions", "Purchasing & Receipts", "Partial Deliveries & Backorders", "Collections & Reports"],
    status: "Interactive sales demo",
    demoUrl: "/ac-parts-crm/index.html",
    liveDemoLabel: "Launch Parts Trading Demo",
    screenshots: [{
      id: "trading-dashboard",
      label: "Trading Dashboard",
      src: "/images/business-software/ac-parts-crm/dashboard.webp",
      alt: "ColdFlow fictional AC and refrigeration parts trading dashboard with AED sales, stock alerts, quotation pipeline and delivery queue"
    }],
    accent: "blue"
  },
  {
    slug: "medical-supply-crm",
    title: "MedSupply",
    type: "Medical Equipment Supplier CRM",
    description:
      "An equipment supplier workspace connecting sales, serialized stock, dispatch, installations, warranty, service contracts and collections in AED.",
    positioning:
      "Carry a fictional equipment enquiry from quotation and serial allocation to dispatch, installation and handover, then track warranty and service work from the same customer record.",
    features: ["Equipment Sales & Quotations", "Models & Serial Tracking", "Purchasing & Dispatch", "Installations & Handover", "Warranty & Service Contracts", "Customer History & Reports"],
    status: "Interactive sales demo",
    demoUrl: "/medical-supply-crm/index.html",
    liveDemoLabel: "Launch Equipment Supplier Demo",
    screenshots: [{
      id: "supplier-dashboard",
      label: "Supplier Dashboard",
      src: "/images/business-software/medical-supply-crm/dashboard.webp",
      alt: "MedSupply fictional medical equipment supplier dashboard with AED revenue, serialized stock, installations and service reminders"
    }],
    accent: "gold"
  },
  {
    slug: "construction-crm",
    title: "Construction Desk",
    type: "Construction & Steel Fabrication CRM",
    description:
      "Take an enquiry through estimation, editable PDF quotations, drawings, materials, fabrication, QA, delivery, erection and final collections.",
    positioning:
      "Keep a fictional steel project connected from tender to closeout. Prepare a revisioned quotation with a real PDF download, resolve operational gates and follow milestone billing from the same project history.",
    features: ["Enquiries & Estimation", "Editable PDF Quotations", "Drawings & Materials", "Fabrication & QA/QC", "Delivery & Erection", "Billing & Project Closeout"],
    status: "Interactive sales demo",
    demoUrl: "/construction-crm/index.html",
    liveDemoLabel: "Launch Construction Demo",
    screenshots: [{
      id: "construction-dashboard",
      label: "Project Dashboard",
      src: "/images/business-software/construction-crm/dashboard.webp",
      alt: "Construction Desk fictional steel project dashboard with AED contracts, collections, workflow gates and project progress"
    }, {
      id: "construction-quotation",
      label: "Quotation Editor",
      src: "/images/business-software/construction-crm/quotation.webp",
      alt: "Construction Desk editable DPSC quotation with scope rows, quantities, rates, revisions and a real PDF download"
    }],
    accent: "blue"
  },
  {
    slug: "equipflow",
    title: "EquipFlow",
    type: "Equipment Rental Operations Platform",
    description:
      "A rental operations workspace that follows equipment from availability and booking through dispatch, return inspection, maintenance and payment closure.",
    positioning:
      "Designed around the real movement of rental equipment. Check fleet availability, allocate a physical asset, track a live rental and carry return damage through service and final payment.",
    features: [
      "Fleet & Availability",
      "Bookings & Allocation",
      "Dispatch & Returns",
      "Inspections & Maintenance",
      "Rental Payments",
      "Cross-module Operations"
    ],
    status: "Interactive sales demo",
    demoUrl: "/equipflow/index.html",
    liveDemoLabel: "Launch EquipFlow Demo",
    screenshots: [
      {
        id: "operations-dashboard",
        label: "Operations Dashboard",
        src: "/images/business-software/equipflow/operations-dashboard.svg",
        alt: "EquipFlow rental operations dashboard with fleet utilisation, equipment status and today's dispatch queue"
      }
    ],
    accent: "gold"
  },
  {
    slug: "besmile",
    title: "Besmile",
    type: "Healthcare Operations Platform",
    description:
      "Explore Besmile’s latest Director dashboard, with business KPIs, flexible reporting periods, finance charts and lead pipelines in a safe interactive demo.",
    positioning:
      "Built to centralize day-to-day healthcare operations across multiple user roles, with attendance, leave, scheduling, notifications and reporting represented in a safe synthetic public demo.",
    features: [
      "Director Dashboard",
      "Client Management",
      "Employee Management",
      "CRM & Lead Management",
      "Finance Operations",
      "Reporting & Analytics"
    ],
    status: "Live interactive demo",
    demoUrl: "https://besmile-public-demo.vercel.app/admin",
    liveDemoLabel: "Launch Live Demo",
    screenshots: [
      {
        id: "director-dashboard",
        label: "Director Dashboard",
        src: "/images/business-software/besmile/director-dashboard-v2.webp",
        alt: "Besmile Director dashboard showing business KPIs, revenue trends, finance overview and lead pipeline"
      },
      {
        id: "crm-leads",
        label: "CRM & Leads",
        src: "/images/business-software/besmile/crm-leads-v2.webp",
        alt: "Besmile CRM leads management screen showing synthetic prospects, stages and follow-up actions"
      },
      {
        id: "employees",
        label: "Employees",
        src: "/images/business-software/besmile/employees.webp",
        alt: "Besmile employee management screen showing synthetic team members, roles and work status"
      },
      {
        id: "finance",
        label: "Finance",
        src: "/images/business-software/besmile/finance-v2.webp",
        alt: "Besmile finance dashboard showing synthetic income, expenses and operational metrics"
      },
      {
        id: "reports",
        label: "Reports",
        src: "/images/business-software/besmile/reports-v2.webp",
        alt: "Besmile reports screen showing synthetic operational reporting data"
      }
    ],
    accent: "blue"
  },
  {
    slug: "universal-pergola",
    title: "Universal Pergola",
    type: "Sales & Project Operations Platform",
    description:
      "An operations platform for architectural outdoor systems, connecting enquiries, customers, site visits, quotations, project delivery and accounts.",
    positioning:
      "Follow each project from the first enquiry and site survey through quotation approval, manufacturing, installation, handover and payment tracking in a fictional public workspace.",
    features: [
      "Lead & Enquiry Management",
      "Customers & Site Visits",
      "Quotation Workflows",
      "Project Delivery",
      "Payments & Accounts",
      "Operational Reporting"
    ],
    status: "Live interactive demo",
    demoUrl: "https://universalpergola-public-demo.vercel.app/dashboard",
    liveDemoLabel: "Launch Live Demo",
    screenshots: [
      {
        id: "platform-dashboard",
        label: "Platform Dashboard",
        src: "/images/business-software/pergola/platform-dashboard.webp",
        alt: "Universal Pergola operations dashboard showing fictional enquiries, site visits, quotation approvals, projects and accounts"
      },
      {
        id: "enquiries",
        label: "Enquiries",
        src: "/images/business-software/pergola/enquiries.webp",
        alt: "Universal Pergola enquiries workspace showing synthetic lead records, project details and follow-up actions"
      },
      {
        id: "quotations",
        label: "Quotations",
        src: "/images/business-software/pergola/quotations.webp",
        alt: "Universal Pergola quotations workspace showing fictional sales quotations and approval stages"
      },
      {
        id: "projects",
        label: "Projects",
        src: "/images/business-software/pergola/projects.webp",
        alt: "Universal Pergola project operations workspace showing fictional manufacturing, installation and handover progress"
      },
      {
        id: "accounts",
        label: "Accounts",
        src: "/images/business-software/pergola/accounts.webp",
        alt: "Universal Pergola accounts dashboard showing fictional payments, outstanding balances and collections"
      }
    ],
    accent: "gold"
  },
  {
    slug: "auto-parts-crm",
    title: "Auto Parts CRM",
    type: "Automotive Parts Sales CRM",
    description:
      "A focused CRM for automotive spare-parts teams, connecting customer enquiries, parts pricing, quotations and follow-ups in one sales workspace.",
    positioning:
      "Built around the complete spare-parts sales journey, from lead capture and vehicle-specific enquiries through supplier pricing, quotation revisions and customer follow-up.",
    features: [
      "Lead & Customer Management",
      "Vehicle & VIN Enquiries",
      "Parts Pricing Desk",
      "Quotation Management",
      "Sales Follow-ups",
      "Pipeline Tracking"
    ],
    status: "Live interactive demo",
    demoUrl: "/crmportfolio/autopartscrm",
    liveDemoLabel: "Launch Live Demo",
    screenshots: [
      {
        id: "sales-dashboard",
        label: "Sales Dashboard",
        src: "/images/business-software/autoparts-crm/dashboard.webp",
        alt: "Auto Parts CRM sales dashboard showing synthetic leads, inquiries, quotations, follow-ups and pipeline activity"
      }
    ],
    accent: "blue"
  },
  {
    slug: "multi-company-crm",
    title: "Multi-Company CRM",
    type: "Multi-Company Sales & Operations CRM",
    description:
      "One workspace for advertising and giveaways, custom packaging, and project supply, with separate customers, sales pipelines and company-specific order workflows.",
    positioning:
      "Follow the full journey from customer meetings and opportunity updates to itemized quotations, artwork approvals, production and delivery. Switch between three companies without mixing their records.",
    features: ["Three Company Workspaces", "Customers & Meetings", "Sales Pipelines", "Itemized Quotations", "Artwork & Approvals", "Orders & Delivery"],
    status: "Live interactive demo",
    demoUrl: "/demo/multi-company-crm",
    liveDemoLabel: "Launch Multi-Company CRM Demo",
    screenshots: [{
      id: "workspace-dashboard",
      label: "Workspace Dashboard",
      src: "/images/business-software/multi-company-crm/dashboard.webp",
      alt: "Multi-Company CRM dashboard showing fictional customers, sales pipeline, company-specific order stages and meeting activity"
    }],
    accent: "blue"
  },
  {
    slug: "emerald-interlink",
    title: "Emerald Field Sales CRM",
    type: "Field Sales & Shop Visit CRM",
    description:
      "A field sales workspace for Emerald Interlink Trading L.L.C, connecting hundreds of building-materials shops with salesperson check-ins, visit notes, follow-up dates and complete shop histories.",
    positioning:
      "Designed for sales executives on the road and the manager following their activity. Check in at a shop, record the discussion and any order interest, schedule the next visit, and keep every salesperson’s history together with the customer.",
    features: [
      "Shop Search & Visit History",
      "Mobile Check-in & Check-out",
      "Visit Notes & Order Interest",
      "New Shop & Lead Capture",
      "Follow-ups by Shop",
      "Manager Field Activity"
    ],
    status: "Interactive sales demo",
    demoUrl: "/demo/emerald-interlink",
    liveDemoLabel: "Launch Field Sales CRM Demo",
    screenshots: [
      {
        id: "field-activity",
        label: "Field Activity",
        src: "/images/business-software/emerald-interlink/dashboard-preview.svg",
        alt: "Emerald Field Sales CRM manager dashboard with today's shop visits, three sales executive activity cards and follow-ups due"
      }
    ],
    accent: "gold"
  },
  {
    slug: "computer-technology-crm",
    title: "Computer Technology CRM",
    type: "Field Sales & IT Operations CRM",
    description:
      "A field sales workspace for IT service teams, connecting prospect discovery, company visits, opportunities, site surveys, quotations and ongoing service work.",
    positioning:
      "Plan the team's daily visits and carry each company relationship through CCTV, networking, hardware and IT maintenance opportunities, projects, service tickets and AMC renewals.",
    features: ["Field Visit Planning", "Prospects & Companies", "Site Surveys", "Sales & Quotations", "Projects & Service Tickets", "AMC Contracts"],
    status: "Live interactive demo",
    demoUrl: "/computer-technology-crm",
    liveDemoLabel: "Launch Computer Technology CRM Demo",
    screenshots: [{
      id: "field-sales-dashboard",
      label: "Field Sales Dashboard",
      src: "/images/business-software/computer-technology-crm/dashboard.webp",
      alt: "Computer Technology CRM dashboard showing fictional field visits, IT service opportunities, sales pipeline and team activity"
    }],
    accent: "blue"
  },
  {
    slug: "laundry-crm",
    title: "Laundry CRM",
    type: "Multi-Branch Laundry Operations CRM",
    description:
      "A laundry operations workspace for three Bahrain branches, connecting customer intake, garment services, cleaning progress, delivery, invoices and collections.",
    positioning:
      "Take an order from the counter to delivery, track partial and full payments, and review branch-specific billing, expenses and reports in BHD. Explore offline workflows and simulated communications with fictional data.",
    features: ["Three Branch Workspaces", "Customers & Garment Intake", "Cleaning & Delivery", "Billing & Collections", "Accounting & Reports", "Offline Demo Workflows"],
    status: "Live interactive demo",
    demoUrl: "/demo/laundry",
    liveDemoLabel: "Launch Laundry CRM Demo",
    screenshots: [{
      id: "branch-dashboard",
      label: "Branch Dashboard",
      src: "/images/business-software/laundry-crm/dashboard.webp",
      alt: "Laundry CRM Manama dashboard showing fictional BHD billing, collections, cleaning orders, delivery queue and branch reports"
    }],
    accent: "blue"
  }
];

export const softwareCapabilities = [
  ["Custom CRM Systems", "Systems shaped around your customers, teams and operating rhythm.", "Users"],
  ["Operations Dashboards", "A clearer view of the work moving through the business.", "LayoutDashboard"],
  ["Workflow Automation", "Less manual handover across the steps your team repeats every day.", "Workflow"],
  ["Internal Business Platforms", "Secure tools that bring fragmented operations into one place.", "PanelsTopLeft"],
  ["Role-Based Portals", "Different teams see the information and actions relevant to them.", "ShieldCheck"],
  ["Reporting & Analytics", "Useful signals for decisions, reviews and continuous improvement.", "ChartNoAxesCombined"]
] as const;

export const softwareProcess = [
  ["Understand the workflow", "We map how work moves today, including the gaps between teams and tools."],
  ["Design the system", "We turn that understanding into a practical product structure and experience."],
  ["Build & integrate", "We build the core platform and connect the services the business already relies on."],
  ["Launch & improve", "We release deliberately, learn from usage and keep improving the system over time."]
] as const;
