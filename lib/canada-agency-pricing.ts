export type AgencyPackageId = "growth" | "advanced" | "ecomPro" | "ecomAdvanced";

export type AgencyPackage = {
  id: AgencyPackageId;
  selectorTitle: string;
  packageName: string;
  title: string;
  subtitle: string;
  price: string;
  timeline: string;
  bestFor: string;
  accent: "green" | "blue" | "orange" | "red";
  icon: "leaf" | "crown" | "bag" | "rocket";
  badge?: string;
  features: string[];
};

export const trustBadges = [
  "CAD Pricing",
  "White-Label Delivery",
  "Fast Turnaround",
  "Agency Partner Support"
];

export const agencyPackages: AgencyPackage[] = [
  {
    id: "growth",
    selectorTitle: "Business Website Overflow",
    packageName: "Growth Package",
    title: "Growth Package",
    subtitle: "Advanced Business Website",
    price: "$199 CAD",
    timeline: "10-15 Business Days",
    bestFor: "Business websites and service-based companies.",
    accent: "green",
    icon: "leaf",
    features: [
      "Up to 15 Pages",
      "Premium Custom UI/UX Design",
      "Responsive Website Development",
      "Mobile & Tablet Friendly",
      "Blog Setup",
      "FAQ Section",
      "Lead Generation Forms",
      "Live Chat Integration",
      "CRM Integration",
      "Team & Company Profile Pages",
      "Service Pages",
      "Advanced Speed Optimization",
      "Enhanced Security Setup",
      "Business Email Configuration",
      "Image Gallery & Portfolio",
      "Advanced Contact Forms",
      "4 Revision Rounds"
    ]
  },
  {
    id: "advanced",
    selectorTitle: "Premium Client Website",
    packageName: "Advanced Website Package",
    title: "Advanced Website Package",
    subtitle: "Premium Business Website",
    price: "$375 CAD",
    timeline: "15-20 Business Days",
    bestFor: "Agencies handling premium business website projects.",
    accent: "blue",
    icon: "crown",
    features: [
      "Everything in Growth Package",
      "Up to 25 Pages",
      "Fully Custom UI/UX Design",
      "Advanced Landing Page Sections",
      "Multi-Service Page Structure",
      "Conversion-Focused Layout",
      "Blog & Resource Setup",
      "Advanced Lead Capture Forms",
      "CRM / Automation Tool Setup",
      "Booking or Consultation Form",
      "Portfolio / Case Study Layout",
      "Advanced On-Page SEO Setup",
      "Google Analytics Setup",
      "Google Search Console Setup",
      "Enhanced Performance Optimization",
      "Advanced Security Configuration",
      "Client Review & Feedback Support",
      "5 Revision Rounds"
    ]
  },
  {
    id: "ecomPro",
    selectorTitle: "Starter E-commerce Build",
    packageName: "Ecom Pro Package",
    title: "Ecom Pro Package",
    subtitle: "Starter E-commerce Website",
    price: "$450 CAD",
    timeline: "10-15 Business Days",
    bestFor: "Small online stores and starter e-commerce projects.",
    accent: "orange",
    icon: "bag",
    features: [
      "Up to 5 Pages: Home, Shop, About, Contact, Policy",
      "Responsive Custom Design",
      "Mobile & Tablet Friendly",
      "Product Categories",
      "Product Detail Pages",
      "Shopping Cart",
      "Secure Checkout",
      "Payment Gateway Integration",
      "Shipping Configuration",
      "Order Management Dashboard",
      "Customer Account Registration",
      "Wishlist Functionality",
      "Product Search",
      "Discount Coupon Setup",
      "Contact Form",
      "WhatsApp Integration",
      "Social Media Integration",
      "Basic On-Page SEO",
      "Google Analytics Setup",
      "Google Search Console Setup",
      "SSL Security Configuration",
      "Basic Speed Optimization",
      "Basic Training Session",
      "2 Revision Rounds"
    ]
  },
  {
    id: "ecomAdvanced",
    selectorTitle: "Scalable E-commerce Store",
    packageName: "Ecom Advanced Package",
    title: "Ecom Advanced Package",
    subtitle: "Advanced E-commerce Website",
    price: "$799 CAD",
    timeline: "15-25 Business Days",
    bestFor: "Serious e-commerce brands ready to scale.",
    accent: "red",
    icon: "rocket",
    badge: "Best for Scaling",
    features: [
      "Everything in Ecom Pro Package",
      "Up to 100 Products",
      "Premium Custom Store UI/UX",
      "Product Categories & Collections",
      "Advanced Product Search & Filters",
      "Product Reviews & Ratings",
      "Inventory Management",
      "Order Management System",
      "Customer Account Registration",
      "Wishlist Functionality",
      "Discount Coupons & Promo Codes",
      "Tax Configuration",
      "Email Notifications",
      "Sales Dashboard",
      "Shipping Rules Configuration",
      "Admin Training Session",
      "5 Revision Rounds"
    ]
  }
];

export const agencyAddOns = [
  { name: "Additional Page", price: "$25 CAD / page" },
  { name: "AI Chatbot", price: "$99 CAD" },
  { name: "Product Database with AI Photos", price: "$7 CAD / product" },
  {
    name: "Website Maintenance",
    price: "Free for 1 year for Growth & Ecom packages. Other packages: $69 CAD / year"
  },
  { name: "API & Third-Party Integration", price: "$85 CAD" }
];

export const agencyBenefits = [
  {
    title: "White-Label Friendly",
    text: "Delivered in a way your agency can present as your own."
  },
  {
    title: "Fast Turnaround",
    text: "Clear timelines and structured delivery for client projects."
  },
  {
    title: "Scalable Support",
    text: "Use us for one project or ongoing agency overflow work."
  }
];
