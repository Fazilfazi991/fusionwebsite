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
