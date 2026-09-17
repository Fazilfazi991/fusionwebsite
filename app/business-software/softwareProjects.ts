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
      "A unified digital platform combining lead capture, quotation workflows, content operations, SEO management and business administration.",
    positioning:
      "Designed to connect the public website with the operational systems behind content, enquiries, quotations and ongoing digital growth.",
    features: [
      "Lead Enquiries",
      "Quote Requests",
      "Content Management",
      "SEO Operations",
      "Media Management",
      "Automation Workflows"
    ],
    status: "Platform demo coming soon",
    accent: "gold"
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
