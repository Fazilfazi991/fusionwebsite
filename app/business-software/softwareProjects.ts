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
      "A Director-level operations platform designed to bring clinical, administrative, employee and commercial workflows into one connected system.",
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
        src: "/images/business-software/besmile/director-dashboard.webp",
        alt: "Besmile Director dashboard showing business KPIs, revenue trends, finance overview and lead pipeline"
      },
      {
        id: "crm-leads",
        label: "CRM & Leads",
        src: "/images/business-software/besmile/crm-leads.webp",
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
        src: "/images/business-software/besmile/finance.webp",
        alt: "Besmile finance dashboard showing synthetic income, expenses and operational metrics"
      },
      {
        id: "reports",
        label: "Reports",
        src: "/images/business-software/besmile/reports.webp",
        alt: "Besmile reports screen showing synthetic operational reporting data"
      }
    ],
    accent: "blue"
  },
  {
    slug: "universal-pergola",
    title: "Universal Pergola",
    type: "Business Operations & Content Platform",
    description:
      "A unified business platform connecting lead management, quotation workflows, content operations, SEO intelligence and digital automation.",
    positioning:
      "Designed to connect customer acquisition with the operational systems behind content, quotations, SEO and digital growth.",
    features: [
      "Lead & Enquiry Management",
      "Quote Request Workflows",
      "Content Operations",
      "SEO Intelligence",
      "Automation Queues",
      "Media & Project Management"
    ],
    status: "Live interactive demo",
    demoUrl: "https://pergola-public-demo.vercel.app/admin",
    liveDemoLabel: "Launch Live Demo",
    screenshots: [
      {
        id: "platform-dashboard",
        label: "Platform Dashboard",
        src: "/images/business-software/pergola/platform-dashboard.webp",
        alt: "Universal Pergola business operations dashboard showing enquiries, content, SEO and automation signals"
      },
      {
        id: "enquiries",
        label: "Enquiries",
        src: "/images/business-software/pergola/enquiries.webp",
        alt: "Universal Pergola enquiries workspace showing synthetic lead records, project details and follow-up actions"
      },
      {
        id: "quote-requests",
        label: "Quote Requests",
        src: "/images/business-software/pergola/quote-requests.webp",
        alt: "Universal Pergola quote requests workspace showing synthetic quotation workflow records"
      },
      {
        id: "content-operations",
        label: "Content Operations",
        src: "/images/business-software/pergola/content-operations.webp",
        alt: "Universal Pergola content operations workspace showing synthetic content records and editorial status"
      },
      {
        id: "seo-intelligence",
        label: "SEO Intelligence",
        src: "/images/business-software/pergola/seo-intelligence.webp",
        alt: "Universal Pergola SEO intelligence workspace showing synthetic keyword and content opportunity data"
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
