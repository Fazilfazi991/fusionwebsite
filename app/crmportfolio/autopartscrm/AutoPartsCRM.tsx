"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Boxes,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  FilePenLine,
  FileText,
  Gauge,
  Handshake,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PackageCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  ReceiptText,
  RefreshCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Truck,
  UserRound,
  UsersRound,
  Wrench,
  X,
  XCircle
} from "lucide-react";

type Page = "dashboard" | "leads" | "customers" | "inquiries" | "pricing" | "quotations" | "followups" | "pipeline" | "settings";
type Stage = "Lead" | "Inquiry" | "Pricing" | "Quotation" | "Follow-up" | "Won" | "Lost";

type Lead = {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  location: string;
  source: string;
  salesperson: string;
  status: "New" | "Contacted" | "Qualified" | "Converted";
  notes?: string;
};

type Customer = {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  location: string;
  inquiries: number;
  quotations: number;
  wonValue: number;
  lastActivity: string;
};

type Part = {
  id: string;
  name: string;
  number: string;
  brand: string;
  qty: number;
  notes: string;
  supplier?: string;
  cost?: number;
  price?: number;
  availability?: string;
  delivery?: string;
  remarks?: string;
};

type Inquiry = {
  id: string;
  customerId: string;
  customer: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  registration: string;
  notes: string;
  parts: Part[];
  salesperson: string;
  assigned: string;
  priority: "Normal" | "High" | "Urgent";
  status: "Draft" | "New" | "Checking" | "Price Received" | "Pricing Completed";
  updated: string;
};

type Quotation = {
  id: string;
  inquiryId: string;
  customer: string;
  vehicle: string;
  parts: Part[];
  revision: number;
  status: "Draft" | "Sent" | "Negotiation" | "Won" | "Lost";
  salesperson: string;
  created: string;
  validity: string;
  delivery: string;
  payment: string;
  notes: string;
};

type FollowUp = {
  id: string;
  customer: string;
  quotation: string;
  amount: number;
  salesperson: string;
  lastContact: string;
  nextFollowup: string;
  status: "Pending" | "Contacted" | "Negotiation" | "Awaiting Customer" | "Completed";
  note: string;
};

type InquiryFormState = {
  customerId: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  registration: string;
  notes: string;
  salesperson: string;
  parts: Part[];
};

const salespeople = ["Ahmed Hassan", "Sara Khan", "Omar Farooq"];
const pricingTeam = ["Mohammed Ali", "Fatima Noor", "Rashid Karim"];

const seedLeads: Lead[] = [
  { id: "LD-0128", company: "Al Falah Workshop", contact: "Khalid Mansoor", phone: "+971 50 482 1180", email: "khalid@alfalah.ae", location: "Sharjah", source: "Referral", salesperson: "Ahmed Hassan", status: "Qualified" },
  { id: "LD-0127", company: "Dubai Motor Works", contact: "Imran Qureshi", phone: "+971 55 214 9073", email: "imran@dmw.ae", location: "Al Quoz, Dubai", source: "Website", salesperson: "Sara Khan", status: "Contacted" },
  { id: "LD-0126", company: "Falcon Garage", contact: "Yousef Abdulla", phone: "+971 52 739 4410", email: "yousef@falcon.ae", location: "Ajman", source: "Walk-in", salesperson: "Omar Farooq", status: "New" },
  { id: "LD-0125", company: "Emirates Auto Service", contact: "Nabeel Rahman", phone: "+971 56 680 2234", email: "nabeel@eas.ae", location: "Mussafah, Abu Dhabi", source: "Campaign", salesperson: "Ahmed Hassan", status: "Qualified" },
  { id: "LD-0124", company: "Desert Track Motors", contact: "Rami Nasser", phone: "+971 50 317 8204", email: "rami@deserttrack.ae", location: "Ras Al Khaimah", source: "Trade show", salesperson: "Sara Khan", status: "Contacted" }
];

const seedCustomers: Customer[] = [
  { id: "CUS-0042", company: "Al Noor Auto Parts LLC", contact: "Ahmed Rahman", phone: "+971 50 817 2241", email: "ahmed@alnoorparts.ae", location: "Dubai, UAE", inquiries: 8, quotations: 6, wonValue: 42800, lastActivity: "18 Sep, 1:42 PM" },
  { id: "CUS-0041", company: "Royal Road Garage", contact: "Sameer Bhat", phone: "+971 55 920 1147", email: "sameer@royalroad.ae", location: "Al Qusais, Dubai", inquiries: 5, quotations: 3, wonValue: 21750, lastActivity: "18 Sep, 11:10 AM" },
  { id: "CUS-0038", company: "Capital Auto Care", contact: "Adnan Mirza", phone: "+971 54 119 8820", email: "adnan@capitalauto.ae", location: "Mussafah, Abu Dhabi", inquiries: 4, quotations: 4, wonValue: 19700, lastActivity: "17 Sep, 4:36 PM" },
  { id: "CUS-0035", company: "Speedline Workshop", contact: "Arun Menon", phone: "+971 52 440 9913", email: "arun@speedline.ae", location: "Al Nahda, Sharjah", inquiries: 3, quotations: 2, wonValue: 0, lastActivity: "16 Sep, 9:20 AM" }
];

const seedInquiries: Inquiry[] = [
  {
    id: "INQ-2026-0104", customerId: "CUS-0042", customer: "Al Noor Auto Parts LLC", make: "Toyota", model: "Land Cruiser", year: "2022", vin: "JTMHU01J9N4123456", registration: "D 45821", notes: "Customer needs genuine brake components. Prioritize same-day options.", salesperson: "Ahmed Hassan", assigned: "Mohammed Ali", priority: "Urgent", status: "Pricing Completed", updated: "12 min ago",
    parts: [
      { id: "P-1", name: "Front Brake Pad", number: "04465-60320", brand: "Toyota Genuine", qty: 4, notes: "Genuine only", supplier: "Gulf Parts Trading", cost: 185, price: 235, availability: "In Stock", delivery: "Same Day", remarks: "6 sets available" },
      { id: "P-2", name: "Oil Filter", number: "90915-YZZD4", brand: "Toyota Genuine", qty: 10, notes: "Genuine filter requested", supplier: "Al Masaood Parts", cost: 24, price: 38, availability: "In Stock", delivery: "Same Day", remarks: "Available from Dubai stock" },
      { id: "P-3", name: "Air Filter", number: "17801-38030", brand: "Denso", qty: 5, notes: "", supplier: "Denso Middle East", cost: 68, price: 92, availability: "In Stock", delivery: "Next Day", remarks: "" }
    ]
  },
  { id: "INQ-2026-0103", customerId: "CUS-0041", customer: "Royal Road Garage", make: "Nissan", model: "Patrol", year: "2020", vin: "JN1TANY62U0018493", registration: "A 91802", notes: "", salesperson: "Sara Khan", assigned: "Fatima Noor", priority: "High", status: "Checking", updated: "28 min ago", parts: [
    { id: "P-4", name: "Water Pump", number: "21010-1LA0A", brand: "Nissan Genuine", qty: 2, notes: "With gasket" },
    { id: "P-5", name: "Drive Belt", number: "11720-1CA0A", brand: "Gates", qty: 4, notes: "" }
  ] },
  { id: "INQ-2026-0102", customerId: "CUS-0038", customer: "Capital Auto Care", make: "Lexus", model: "LX570", year: "2019", vin: "JTJHY7AX9K4298741", registration: "AD 74116", notes: "Insurance repair", salesperson: "Omar Farooq", assigned: "Rashid Karim", priority: "Normal", status: "Price Received", updated: "1 hr ago", parts: [
    { id: "P-6", name: "Headlamp Assembly RH", number: "81145-60J40", brand: "Lexus Genuine", qty: 1, notes: "LED type", supplier: "Lexus Parts Centre", cost: 2140, price: 2625, availability: "In Stock", delivery: "Next Day", remarks: "" }
  ] },
  { id: "INQ-2026-0101", customerId: "CUS-0035", customer: "Speedline Workshop", make: "Mitsubishi", model: "Pajero", year: "2017", vin: "JMBLYV97WHJ002831", registration: "S 31485", notes: "", salesperson: "Ahmed Hassan", assigned: "Unassigned", priority: "Normal", status: "New", updated: "3 hrs ago", parts: [
    { id: "P-7", name: "Front Shock Absorber", number: "4060A481", brand: "KYB", qty: 2, notes: "Pair" },
    { id: "P-8", name: "Control Arm LH", number: "4013A129", brand: "555", qty: 1, notes: "" }
  ] }
];

const seedQuotations: Quotation[] = [
  { id: "QT-2026-0048", inquiryId: "INQ-2026-0104", customer: "Al Noor Auto Parts LLC", vehicle: "2022 Toyota Land Cruiser", parts: seedInquiries[0].parts, revision: 2, status: "Negotiation", salesperson: "Ahmed Hassan", created: "18 Sep 2026", validity: "7 days", delivery: "Available items: same day", payment: "30 days from invoice", notes: "Prices include delivery within Dubai. Subject to stock availability." },
  { id: "QT-2026-0047", inquiryId: "INQ-2026-0099", customer: "Royal Road Garage", vehicle: "2020 Nissan Patrol", parts: [{ id: "Q-1", name: "Alternator", number: "23100-1LA1A", brand: "Hitachi", qty: 1, notes: "", price: 1290 }], revision: 0, status: "Sent", salesperson: "Sara Khan", created: "17 Sep 2026", validity: "7 days", delivery: "2 working days", payment: "Cash on delivery", notes: "" },
  { id: "QT-2026-0046", inquiryId: "INQ-2026-0097", customer: "Capital Auto Care", vehicle: "2019 Lexus LX570", parts: [{ id: "Q-2", name: "Wheel Bearing", number: "43570-60010", brand: "Koyo", qty: 2, notes: "", price: 485 }], revision: 0, status: "Won", salesperson: "Omar Farooq", created: "15 Sep 2026", validity: "14 days", delivery: "Same day", payment: "Account terms", notes: "" },
  { id: "QT-2026-0045", inquiryId: "INQ-2026-0093", customer: "Speedline Workshop", vehicle: "2018 Honda Accord", parts: [{ id: "Q-3", name: "Starter Motor", number: "31200-5A2-A52", brand: "Denso", qty: 1, notes: "", price: 870 }], revision: 1, status: "Lost", salesperson: "Ahmed Hassan", created: "13 Sep 2026", validity: "7 days", delivery: "Next day", payment: "Cash on delivery", notes: "" }
];

const seedFollowups: FollowUp[] = [
  { id: "FU-0188", customer: "Al Noor Auto Parts LLC", quotation: "QT-2026-0048", amount: 1869, salesperson: "Ahmed Hassan", lastContact: "18 Sep, 1:30 PM", nextFollowup: "Today, 3:00 PM", status: "Negotiation", note: "Customer requested improved pricing on brake pads." },
  { id: "FU-0187", customer: "Royal Road Garage", quotation: "QT-2026-0047", amount: 1354.5, salesperson: "Sara Khan", lastContact: "17 Sep, 4:15 PM", nextFollowup: "Today, 4:30 PM", status: "Awaiting Customer", note: "Decision after vehicle inspection." },
  { id: "FU-0185", customer: "Green Line Motors", quotation: "QT-2026-0044", amount: 4280, salesperson: "Omar Farooq", lastContact: "16 Sep, 11:20 AM", nextFollowup: "Tomorrow, 10:00 AM", status: "Pending", note: "Confirm stock before calling." }
];

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "leads", label: "Leads", icon: UserRound },
  { id: "customers", label: "Customers", icon: UsersRound },
  { id: "inquiries", label: "Inquiries", icon: FileText },
  { id: "pricing", label: "Price Desk", icon: CircleDollarSign },
  { id: "quotations", label: "Quotations", icon: ReceiptText },
  { id: "followups", label: "Follow-ups", icon: CalendarClock },
  { id: "pipeline", label: "Pipeline", icon: Gauge }
];

const workflow: { label: Stage; icon: typeof UserRound }[] = [
  { label: "Lead", icon: UserRound }, { label: "Inquiry", icon: FileText }, { label: "Pricing", icon: CircleDollarSign }, { label: "Quotation", icon: ReceiptText }, { label: "Follow-up", icon: CalendarClock }, { label: "Won", icon: BadgeCheck }
];

const money = (value: number) => new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
const totalFor = (quote: Quotation) => quote.parts.reduce((sum, p) => sum + (p.price || 0) * p.qty, 0) * 1.05;
const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");
const formatFollowupDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-AE", { day: "2-digit", month: "short", hour: "numeric", minute: "2-digit" }).format(date);
};

function cx(...classes: Array<string | false | undefined>) { return classes.filter(Boolean).join(" "); }

function StatusBadge({ value }: { value: string }) {
  const tone = ["Won", "Pricing Completed", "Completed", "Converted", "In Stock"].includes(value)
    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/15"
    : ["Lost", "Urgent", "Unavailable"].includes(value) ? "bg-rose-50 text-rose-700 ring-rose-600/15"
    : ["Sent", "Contacted", "Price Received", "Quotation"].includes(value) ? "bg-blue-50 text-blue-700 ring-blue-600/15"
    : ["Negotiation", "Checking", "Awaiting Customer", "Pricing", "Waiting", "High"].includes(value) ? "bg-amber-50 text-amber-700 ring-amber-600/15"
    : value === "Follow-up" ? "bg-violet-50 text-violet-700 ring-violet-600/15"
    : "bg-slate-100 text-slate-600 ring-slate-500/15";
  return <span className={cx("inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset", tone)}>{value}</span>;
}

function Avatar({ name, dark = false }: { name: string; dark?: boolean }) {
  return <span className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold", dark ? "bg-white/10 text-white" : "bg-[#e7effc] text-[#1768e5]")}>{initials(name)}</span>;
}

function Modal({ title, subtitle, children, onClose, wide = false }: { title: string; subtitle?: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#07101f]/55 p-3 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div role="dialog" aria-modal="true" aria-labelledby="crm-modal-title" className={cx("max-h-[92vh] w-full overflow-hidden rounded-2xl bg-white shadow-2xl", wide ? "max-w-5xl" : "max-w-2xl")}>
      <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
        <div><h2 id="crm-modal-title" className="text-lg font-bold text-slate-950">{title}</h2>{subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}</div>
        <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><X size={18} /></button>
      </div>
      <div className="max-h-[calc(92vh-74px)] overflow-y-auto p-5 sm:p-6">{children}</div>
    </div>
  </div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>{children}</label>;
}

const inputClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1768e5] focus:ring-2 focus:ring-[#1768e5]/10";
const buttonPrimary = "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1768e5] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1058c8] focus:outline-none focus:ring-2 focus:ring-[#1768e5]/30";
const buttonSecondary = "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

function PageTitle({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action}</div>;
}

function DataTable({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.03)]"><div className="overflow-x-auto"><table className="w-full min-w-[860px] text-left text-sm">{children}</table></div></div>;
}

function TableHead({ children }: { children: ReactNode }) { return <th className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-[11px] font-semibold text-slate-500">{children}</th>; }
function TableCell({ children, className }: { children: ReactNode; className?: string }) { return <td className={cx("border-b border-slate-100 px-4 py-3.5 align-middle text-slate-600", className)}>{children}</td>; }

export default function AutoPartsCRM() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [leads, setLeads] = useState(seedLeads);
  const [customers, setCustomers] = useState(seedCustomers);
  const [inquiries, setInquiries] = useState(seedInquiries);
  const [quotations, setQuotations] = useState(seedQuotations);
  const [followups, setFollowups] = useState(seedFollowups);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState<"lead" | "inquiry" | "pricing" | "followup" | "reset" | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [leadForm, setLeadForm] = useState({ company: "", contact: "", phone: "", email: "", location: "Dubai", source: "Referral", notes: "", salesperson: "Ahmed Hassan" });
  const [inquiryForm, setInquiryForm] = useState({ customerId: "CUS-0042", make: "Toyota", model: "Land Cruiser", year: "2022", vin: "", registration: "", notes: "", salesperson: "Ahmed Hassan", parts: [{ id: "NEW-1", name: "", number: "", brand: "Any", qty: 1, notes: "" }] as Part[] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("autoparts-crm-demo-v4");
      if (saved) {
        const data = JSON.parse(saved);
        setLeads(data.leads || seedLeads); setCustomers(data.customers || seedCustomers); setInquiries(data.inquiries || seedInquiries); setQuotations(data.quotations || seedQuotations); setFollowups(data.followups || seedFollowups);
      }
    } catch { /* demo falls back to seed data */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("autoparts-crm-demo-v4", JSON.stringify({ leads, customers, inquiries, quotations, followups }));
  }, [ready, leads, customers, inquiries, quotations, followups]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message: string) => setToast(message);
  const go = (next: Page) => { setPage(next); setMobileMenu(false); setSelectedCustomer(null); setSelectedInquiry(null); setSelectedQuote(null); setSearch(""); };

  const createLead = (e: FormEvent) => {
    e.preventDefault();
    const lead: Lead = { ...leadForm, id: `LD-${String(129 + leads.length - seedLeads.length).padStart(4, "0")}`, status: "New" };
    setLeads((items) => [lead, ...items]); setModal(null); setLeadForm({ company: "", contact: "", phone: "", email: "", location: "Dubai", source: "Referral", notes: "", salesperson: "Ahmed Hassan" }); notify(`${lead.company} added as a new lead`);
  };

  const convertLead = (lead: Lead) => {
    if (lead.status === "Converted") return;
    setLeads((items) => items.map((item) => item.id === lead.id ? { ...item, status: "Converted" } : item));
    setCustomers((items) => [{ id: `CUS-${String(43 + items.length - seedCustomers.length).padStart(4, "0")}`, company: lead.company, contact: lead.contact, phone: lead.phone, email: lead.email, location: lead.location, inquiries: 0, quotations: 0, wonValue: 0, lastActivity: "Just now" }, ...items]);
    notify(`${lead.company} converted to customer`);
  };

  const createInquiry = (e: FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === inquiryForm.customerId) || customers[0];
    const inquiry: Inquiry = { id: `INQ-2026-${String(105 + inquiries.length - seedInquiries.length).padStart(4, "0")}`, customerId: customer.id, customer: customer.company, make: inquiryForm.make, model: inquiryForm.model, year: inquiryForm.year, vin: inquiryForm.vin, registration: inquiryForm.registration, notes: inquiryForm.notes, parts: inquiryForm.parts.filter((p) => p.name), salesperson: inquiryForm.salesperson, assigned: "Unassigned", priority: "Normal", status: "Draft", updated: "Just now" };
    setInquiries((items) => [inquiry, ...items]); setCustomers((items) => items.map((c) => c.id === customer.id ? { ...c, inquiries: c.inquiries + 1, lastActivity: "Just now" } : c)); setModal(null); setSelectedCustomer(null); setSelectedInquiry(inquiry); setPage("inquiries"); notify(`${inquiry.id} saved`);
  };

  const assignInquiry = (inquiry: Inquiry) => {
    const updated = { ...inquiry, status: "New" as const, assigned: inquiry.assigned === "Unassigned" ? "Mohammed Ali" : inquiry.assigned, updated: "Just now" };
    setInquiries((items) => items.map((item) => item.id === inquiry.id ? updated : item)); setSelectedInquiry(updated); notify(`${inquiry.id} assigned to Price Desk`);
  };

  const updatePartPricing = (inquiryId: string, partId: string, key: keyof Part, value: string | number) => {
    const update = (item: Inquiry) => item.id !== inquiryId ? item : { ...item, status: "Checking" as const, parts: item.parts.map((part) => part.id === partId ? { ...part, [key]: value } : part) };
    setInquiries((items) => items.map(update));
    setSelectedInquiry((current) => current ? update(current) : current);
  };

  const completePricing = (inquiry: Inquiry) => {
    const updated = { ...inquiry, status: "Pricing Completed" as const, updated: "Just now" };
    setInquiries((items) => items.map((item) => item.id === inquiry.id ? updated : item)); setSelectedInquiry(updated); setModal(null); notify("Pricing completed and returned to Sales Team");
  };

  const generateQuote = (inquiry: Inquiry) => {
    const existing = quotations.find((q) => q.inquiryId === inquiry.id);
    if (existing) { setSelectedQuote(existing); setPage("quotations"); return; }
    const quote: Quotation = { id: `QT-2026-${String(49 + quotations.length - seedQuotations.length).padStart(4, "0")}`, inquiryId: inquiry.id, customer: inquiry.customer, vehicle: `${inquiry.year} ${inquiry.make} ${inquiry.model}`, parts: inquiry.parts, revision: 0, status: "Draft", salesperson: inquiry.salesperson, created: "19 Sep 2026", validity: "7 days", delivery: "As per item availability", payment: "Cash on delivery", notes: "Subject to stock availability at the time of confirmation." };
    setQuotations((items) => [quote, ...items]); setCustomers((items) => items.map((c) => c.id === inquiry.customerId ? { ...c, quotations: c.quotations + 1, lastActivity: "Just now" } : c)); setSelectedQuote(quote); setPage("quotations"); notify(`${quote.id} generated`);
  };

  const updateQuote = (quote: Quotation, status: Quotation["status"], message: string) => {
    const updated = { ...quote, status };
    setQuotations((items) => items.map((item) => item.id === quote.id ? updated : item)); setSelectedQuote(updated);
    if (status === "Sent" && !followups.some((f) => f.quotation === quote.id)) setFollowups((items) => [{ id: `FU-${189 + items.length - seedFollowups.length}`, customer: quote.customer, quotation: quote.id, amount: totalFor(quote), salesperson: quote.salesperson, lastContact: "Just now", nextFollowup: "Tomorrow, 10:00 AM", status: "Pending", note: "Follow up on sent quotation." }, ...items]);
    notify(message);
  };

  const reviseQuote = (quote: Quotation) => {
    const updated = { ...quote, revision: quote.revision + 1, status: "Draft" as const };
    setQuotations((items) => items.map((item) => item.id === quote.id ? updated : item)); setSelectedQuote(updated); notify(`Revision ${updated.revision} generated`);
  };

  const scheduleFollowup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const quoteId = String(form.get("quote")); const quote = quotations.find((q) => q.id === quoteId) || quotations[0];
    const nextFollowup = formatFollowupDate(String(form.get("date")));
    const note = String(form.get("note"));
    const existing = followups.find((item) => item.quotation === quote.id && item.status !== "Completed");
    if (existing) {
      setFollowups((items) => items.map((item) => item.id === existing.id ? { ...item, nextFollowup, note, status: "Pending" } : item));
    } else {
      const item: FollowUp = { id: `FU-${189 + followups.length - seedFollowups.length}`, customer: quote.customer, quotation: quote.id, amount: totalFor(quote), salesperson: quote.salesperson, lastContact: "Not contacted", nextFollowup, status: "Pending", note };
      setFollowups((items) => [item, ...items]);
    }
    setModal(null); notify(existing ? "Follow-up rescheduled" : "Follow-up scheduled");
  };

  const resetDemo = () => { setLeads(seedLeads); setCustomers(seedCustomers); setInquiries(seedInquiries); setQuotations(seedQuotations); setFollowups(seedFollowups); localStorage.removeItem("autoparts-crm-demo-v4"); setSelectedCustomer(null); setSelectedInquiry(null); setSelectedQuote(null); setModal(null); setPage("dashboard"); notify("Demo data restored and ready"); };

  const currentLabel = navItems.find((item) => item.id === page)?.label || "Settings";
  const filteredLeads = leads.filter((l) => `${l.company} ${l.contact} ${l.id}`.toLowerCase().includes(search.toLowerCase()));
  const filteredCustomers = customers.filter((c) => `${c.company} ${c.contact} ${c.id}`.toLowerCase().includes(search.toLowerCase()));

  return <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f6f8] font-sans text-slate-900">
    <aside className={cx("fixed inset-y-0 left-0 z-40 flex flex-col bg-[#10151f] text-white transition-all duration-300", sidebarOpen ? "w-[248px]" : "w-[76px]", mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
      <div className="flex h-[76px] items-center border-b border-white/8 px-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1768e5] shadow-[0_8px_24px_rgba(23,104,229,.35)]"><Wrench size={21} strokeWidth={2.2} /></div>
        {sidebarOpen && <div className="ml-3 min-w-0"><div className="whitespace-nowrap text-sm font-extrabold tracking-tight">AUTO PARTS CRM</div><div className="mt-0.5 whitespace-nowrap text-[10px] text-slate-400">Customized CRM Demo</div></div>}
        <button className="ml-auto hidden rounded-md p-1.5 text-slate-500 hover:bg-white/5 hover:text-white lg:block" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">{sidebarOpen ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}</button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => go(id)} className={cx("flex h-10 w-full items-center rounded-lg transition", page === id ? "bg-[#1768e5] text-white shadow-[0_6px_20px_rgba(23,104,229,.2)]" : "text-slate-400 hover:bg-white/[.06] hover:text-white", sidebarOpen ? "px-3" : "justify-center")} title={!sidebarOpen ? label : undefined}><Icon size={18} />{sidebarOpen && <span className="ml-3 text-[13px] font-medium">{label}</span>}{sidebarOpen && id === "pricing" && <span className="ml-auto rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">12</span>}</button>)}
      </nav>
      <div className="border-t border-white/8 p-3">
        <button onClick={() => go("settings")} className={cx("flex h-10 w-full items-center rounded-lg text-slate-400 hover:bg-white/[.06] hover:text-white", page === "settings" && "bg-white/[.08] text-white", sidebarOpen ? "px-3" : "justify-center")}><Settings size={18} />{sidebarOpen && <span className="ml-3 text-[13px] font-medium">Settings</span>}</button>
        {sidebarOpen && <div className="mt-3 flex items-center rounded-xl border border-white/10 bg-white/[.04] p-2.5"><Avatar name="Ahmed Hassan" dark /><div className="ml-2.5 min-w-0"><div className="truncate text-xs font-semibold">Ahmed Hassan</div><div className="truncate text-[10px] text-slate-500">Sales Executive</div></div><ChevronRight className="ml-auto text-slate-600" size={15} /></div>}
      </div>
    </aside>

    {mobileMenu && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setMobileMenu(false)} aria-label="Close menu" />}

    <div className={cx("min-w-0 transition-all duration-300", sidebarOpen ? "lg:pl-[248px]" : "lg:pl-[76px]")}>
      <header className="sticky top-0 z-20 flex h-[76px] items-center border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <button onClick={() => setMobileMenu(true)} className="mr-3 rounded-lg border border-slate-200 p-2 lg:hidden"><Menu size={19} /></button>
        <div><div className="text-xs font-medium text-slate-400">Workspace / {currentLabel}</div><div className="mt-0.5 text-sm font-semibold text-slate-800">{currentLabel}</div></div>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="hidden items-center gap-1.5 rounded-full bg-[#eef4ff] px-3 py-1.5 text-[11px] font-semibold text-[#1768e5] ring-1 ring-inset ring-[#1768e5]/15 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-[#1768e5] animate-pulse" />Demo Environment</span>
          <button onClick={() => notify("No new sales alerts")} className="relative rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50" aria-label="Sales alerts"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" /></button>
          <Avatar name="Ahmed Hassan" />
        </div>
      </header>

      <main className="mx-auto w-full min-w-0 max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {page === "dashboard" && <Dashboard inquiries={inquiries} followups={followups} onGo={go} onCreateInquiry={() => setModal("inquiry")} onOpenInquiry={(item) => { setSelectedInquiry(item); setPage("inquiries"); }} />}
        {page === "leads" && <>
          <PageTitle title="Leads" description="Capture, qualify and convert new trade opportunities." action={<button className={buttonPrimary} onClick={() => setModal("lead")}><Plus size={17} />New Lead</button>} />
          <Toolbar search={search} setSearch={setSearch} placeholder="Search leads..." />
          <DataTable><thead><tr><TableHead>Lead ID</TableHead><TableHead>Company</TableHead><TableHead>Contact Person</TableHead><TableHead>Phone</TableHead><TableHead>Location</TableHead><TableHead>Source</TableHead><TableHead>Salesperson</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></tr></thead><tbody>{filteredLeads.map((lead) => <tr key={lead.id} className="group hover:bg-slate-50/80"><TableCell className="font-semibold text-[#1768e5]">{lead.id}</TableCell><TableCell className="font-semibold text-slate-900">{lead.company}</TableCell><TableCell>{lead.contact}</TableCell><TableCell>{lead.phone}</TableCell><TableCell>{lead.location}</TableCell><TableCell>{lead.source}</TableCell><TableCell><div className="flex items-center gap-2"><Avatar name={lead.salesperson} />{lead.salesperson}</div></TableCell><TableCell><StatusBadge value={lead.status} /></TableCell><TableCell>{lead.status !== "Converted" ? <button onClick={() => convertLead(lead)} className="whitespace-nowrap text-xs font-semibold text-[#1768e5] hover:text-[#1058c8]">Convert to Customer</button> : <span className="text-xs text-slate-400">Converted</span>}</TableCell></tr>)}</tbody></DataTable>
        </>}
        {page === "customers" && (selectedCustomer ? <CustomerDetail customer={selectedCustomer} inquiries={inquiries} quotations={quotations} onBack={() => setSelectedCustomer(null)} onCreate={() => { setInquiryForm((v) => ({ ...v, customerId: selectedCustomer.id })); setModal("inquiry"); }} /> : <>
          <PageTitle title="Customers" description="Trade accounts, buying history and relationship activity." action={<button className={buttonPrimary} onClick={() => setModal("inquiry")}><Plus size={17} />Create Inquiry</button>} />
          <Toolbar search={search} setSearch={setSearch} placeholder="Search customers..." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{filteredCustomers.map((customer) => <button key={customer.id} onClick={() => setSelectedCustomer(customer)} className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-[0_1px_2px_rgba(15,23,42,.03)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_12px_28px_rgba(15,23,42,.07)]"><div className="flex items-start"><div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-600"><Building2 size={20} /></div><div className="ml-3 min-w-0"><h3 className="truncate font-bold text-slate-900">{customer.company}</h3><p className="mt-0.5 text-xs text-slate-500">{customer.id} · {customer.location}</p></div><ChevronRight className="ml-auto text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#1768e5]" size={18} /></div><div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100 py-3"><MiniStat label="Inquiries" value={String(customer.inquiries)} /><MiniStat label="Quotes" value={String(customer.quotations)} /><MiniStat label="Won" value={money(customer.wonValue)} /></div><div className="mt-4 flex items-center justify-between text-xs"><span className="text-slate-500">{customer.contact}</span><span className="text-slate-400">{customer.lastActivity}</span></div></button>)}</div>
        </>)}
        {page === "inquiries" && (selectedInquiry ? <InquiryDetail inquiry={selectedInquiry} onBack={() => setSelectedInquiry(null)} onAssign={() => assignInquiry(selectedInquiry)} onPrice={() => { setModal("pricing"); }} onQuote={() => generateQuote(selectedInquiry)} /> : <>
          <PageTitle title="Inquiries" description="Vehicle-specific requests from intake through pricing." action={<button className={buttonPrimary} onClick={() => setModal("inquiry")}><Plus size={17} />Create Inquiry</button>} />
          <InquiryTable inquiries={inquiries} onOpen={setSelectedInquiry} />
        </>)}
        {page === "pricing" && (selectedInquiry ? <PriceDeskDetail inquiry={selectedInquiry} onBack={() => setSelectedInquiry(null)} onUpdate={updatePartPricing} onComplete={() => completePricing(selectedInquiry)} /> : <>
          <PageTitle title="Price Desk" description="Source availability, costs and selling prices for every requested part." />
          <div className="mb-5 flex flex-wrap gap-2"><StatusBadge value="New" /><StatusBadge value="Checking" /><StatusBadge value="Price Received" /><StatusBadge value="Pricing Completed" /></div>
          <DataTable><thead><tr><TableHead>Inquiry</TableHead><TableHead>Customer</TableHead><TableHead>Vehicle</TableHead><TableHead>Parts</TableHead><TableHead>Requested By</TableHead><TableHead>Assigned</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></tr></thead><tbody>{inquiries.filter((i) => i.status !== "Draft").map((item) => <tr key={item.id} className="hover:bg-slate-50/80"><TableCell className="font-semibold text-[#1768e5]">{item.id}</TableCell><TableCell className="font-semibold text-slate-900">{item.customer}</TableCell><TableCell>{item.year} {item.make} {item.model}</TableCell><TableCell>{item.parts.length} items</TableCell><TableCell>{item.salesperson}</TableCell><TableCell>{item.assigned}</TableCell><TableCell><StatusBadge value={item.priority} /></TableCell><TableCell><StatusBadge value={item.status} /></TableCell><TableCell><button onClick={() => setSelectedInquiry(item)} className="whitespace-nowrap text-xs font-semibold text-[#1768e5]">Open Inquiry</button></TableCell></tr>)}</tbody></DataTable>
        </>)}
        {page === "quotations" && (selectedQuote ? <QuotationView quote={selectedQuote} onBack={() => setSelectedQuote(null)} onSend={() => updateQuote(selectedQuote, "Sent", "Quotation sent successfully")} onRevise={() => reviseQuote(selectedQuote)} onWon={() => updateQuote(selectedQuote, "Won", `${selectedQuote.id} marked as won`)} onLost={() => updateQuote(selectedQuote, "Lost", `${selectedQuote.id} marked as lost`)} /> : <>
          <PageTitle title="Quotations" description="Prepare, revise and close customer offers." />
          <div className="grid gap-4 lg:grid-cols-2">{quotations.map((quote) => <button key={quote.id} onClick={() => setSelectedQuote(quote)} className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-[0_1px_2px_rgba(15,23,42,.03)] transition hover:border-blue-200 hover:shadow-[0_12px_28px_rgba(15,23,42,.06)]"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><span className="font-bold text-slate-950">{quote.id}</span>{quote.revision > 0 && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">REV {quote.revision}</span>}</div><div className="mt-1 text-sm text-slate-500">{quote.customer}</div></div><StatusBadge value={quote.status} /></div><div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4"><div><div className="text-xs text-slate-400">Quotation total</div><div className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">{money(totalFor(quote))}</div></div><div className="text-right text-xs text-slate-500"><div>{quote.vehicle}</div><div className="mt-1">{quote.created}</div></div></div></button>)}</div>
        </>)}
        {page === "followups" && <>
          <PageTitle title="Follow-ups" description="Keep every active quotation moving toward a decision." action={<button className={buttonPrimary} onClick={() => setModal("followup")}><Plus size={17} />Schedule Follow-up</button>} />
          <DataTable><thead><tr><TableHead>Customer</TableHead><TableHead>Quotation</TableHead><TableHead>Amount</TableHead><TableHead>Salesperson</TableHead><TableHead>Last Contact</TableHead><TableHead>Next Follow-up</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></tr></thead><tbody>{followups.map((item) => <tr key={item.id} className="hover:bg-slate-50/80"><TableCell className="font-semibold text-slate-900"><div>{item.customer}</div><div className="mt-1 max-w-[220px] truncate text-xs font-normal text-slate-400">{item.note}</div></TableCell><TableCell className="font-semibold text-[#1768e5]">{item.quotation}</TableCell><TableCell className="font-semibold text-slate-900">{money(item.amount)}</TableCell><TableCell>{item.salesperson}</TableCell><TableCell>{item.lastContact}</TableCell><TableCell><span className="inline-flex items-center gap-1.5 font-medium text-slate-800"><Clock3 size={14} className="text-amber-500" />{item.nextFollowup}</span></TableCell><TableCell><StatusBadge value={item.status} /></TableCell><TableCell><button disabled={item.status === "Completed"} onClick={() => { setFollowups((all) => all.map((f) => f.id === item.id ? { ...f, status: "Completed" } : f)); notify("Follow-up completed"); }} className="text-xs font-semibold text-[#1768e5] disabled:text-slate-300">Mark completed</button></TableCell></tr>)}</tbody></DataTable>
        </>}
        {page === "pipeline" && <Pipeline leads={leads} inquiries={inquiries} quotations={quotations} onChange={(quote, stage) => { const status = stage === "Won" ? "Won" : stage === "Lost" ? "Lost" : stage === "Follow-up" ? "Negotiation" : "Sent"; setQuotations((items) => items.map((q) => q.id === quote.id ? { ...q, status } : q)); notify(`${quote.customer} moved to ${stage}`); }} />}
        {page === "settings" && <SettingsPage onRequestReset={() => setModal("reset")} onSaved={() => notify("Quotation preferences saved")} />}
      </main>
    </div>

    {modal === "lead" && <Modal title="Create new lead" subtitle="Capture a new trade opportunity for the sales team." onClose={() => setModal(null)}><form onSubmit={createLead} className="grid gap-4 sm:grid-cols-2"><Field label="Company Name"><input required className={inputClass} value={leadForm.company} onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })} placeholder="e.g. Al Quoz Auto Care" /></Field><Field label="Contact Person"><input required className={inputClass} value={leadForm.contact} onChange={(e) => setLeadForm({ ...leadForm, contact: e.target.value })} placeholder="Full name" /></Field><Field label="Mobile"><input required className={inputClass} value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} placeholder="+971 50 000 0000" /></Field><Field label="Email"><input type="email" className={inputClass} value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} placeholder="name@company.ae" /></Field><Field label="Location"><input className={inputClass} value={leadForm.location} onChange={(e) => setLeadForm({ ...leadForm, location: e.target.value })} /></Field><Field label="Lead Source"><select className={inputClass} value={leadForm.source} onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}><option>Referral</option><option>Website</option><option>Walk-in</option><option>Campaign</option><option>Trade show</option></select></Field><Field label="Assigned Salesperson"><select className={inputClass} value={leadForm.salesperson} onChange={(e) => setLeadForm({ ...leadForm, salesperson: e.target.value })}>{salespeople.map((s) => <option key={s}>{s}</option>)}</select></Field><div /><div className="sm:col-span-2"><Field label="Notes"><textarea className="min-h-24 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-[#1768e5] focus:ring-2 focus:ring-[#1768e5]/10" value={leadForm.notes} onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })} placeholder="Vehicle focus, buying needs or next step..." /></Field></div><div className="flex justify-end gap-2 border-t border-slate-100 pt-4 sm:col-span-2"><button type="button" className={buttonSecondary} onClick={() => setModal(null)}>Cancel</button><button className={buttonPrimary}><Check size={17} />Save Lead</button></div></form></Modal>}
    {modal === "inquiry" && <InquiryModal customers={customers} form={inquiryForm} setForm={setInquiryForm} onSubmit={createInquiry} onClose={() => setModal(null)} />}
    {modal === "pricing" && selectedInquiry && <Modal title={`Assign ${selectedInquiry.id}`} subtitle="Select a Price Desk specialist and priority." onClose={() => setModal(null)}><div className="space-y-4"><Field label="Price Desk Specialist"><select className={inputClass} value={selectedInquiry.assigned} onChange={(e) => setSelectedInquiry({ ...selectedInquiry, assigned: e.target.value })}><option>Unassigned</option>{pricingTeam.map((p) => <option key={p}>{p}</option>)}</select></Field><Field label="Priority"><select className={inputClass} value={selectedInquiry.priority} onChange={(e) => setSelectedInquiry({ ...selectedInquiry, priority: e.target.value as Inquiry["priority"] })}><option>Normal</option><option>High</option><option>Urgent</option></select></Field><div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><button className={buttonSecondary} onClick={() => setModal(null)}>Cancel</button><button className={buttonPrimary} onClick={() => { setInquiries((all) => all.map((i) => i.id === selectedInquiry.id ? { ...selectedInquiry, status: "New", updated: "Just now" } : i)); setModal(null); notify(`${selectedInquiry.id} assigned to ${selectedInquiry.assigned}`); }}><ArrowRight size={17} />Assign to Price Desk</button></div></div></Modal>}
    {modal === "followup" && <Modal title="Schedule follow-up" subtitle="Add the next customer touchpoint." onClose={() => setModal(null)}><form onSubmit={scheduleFollowup} className="space-y-4"><Field label="Quotation"><select name="quote" className={inputClass}>{quotations.filter((q) => q.status !== "Won" && q.status !== "Lost").map((q) => <option key={q.id} value={q.id}>{q.id} — {q.customer}</option>)}</select></Field><Field label="Next Follow-up"><input name="date" type="datetime-local" required className={inputClass} /></Field><Field label="Note"><textarea name="note" className="min-h-24 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-[#1768e5]" placeholder="What should the salesperson discuss?" /></Field><div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><button type="button" className={buttonSecondary} onClick={() => setModal(null)}>Cancel</button><button className={buttonPrimary}><CalendarClock size={17} />Schedule Follow-up</button></div></form></Modal>}
    {modal === "reset" && <Modal title="Restore demo data?" subtitle="This returns the CRM to the client-ready Al Noor Auto Parts scenario." onClose={() => setModal(null)}><div><div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900"><RefreshCcw className="mt-0.5 shrink-0" size={18} /><p className="leading-6">Any changes made during this demonstration will be replaced with the original leads, inquiries, pricing, quotations and follow-ups.</p></div><div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-5"><button className={buttonSecondary} onClick={() => setModal(null)}>Keep current data</button><button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1768e5] px-4 text-sm font-semibold text-white hover:bg-[#1058c8]" onClick={resetDemo}><RefreshCcw size={16} />Restore Demo Data</button></div></div></Modal>}

    {toast && <div className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-[#10151f] px-4 py-3 text-sm font-medium text-white shadow-2xl"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500"><Check size={15} /></span>{toast}<button onClick={() => setToast(null)} className="ml-2 text-white/55 hover:text-white" aria-label="Dismiss notification"><X size={15} /></button></div>}
  </div>;
}

function Toolbar({ search, setSearch, placeholder }: { search: string; setSearch: (value: string) => void; placeholder: string }) {
  return <div className="mb-4"><label className="relative block max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input className={cx(inputClass, "pl-9")} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></label></div>;
}

function MiniStat({ label, value }: { label: string; value: string }) { return <div className="px-3 first:pl-0 last:pr-0"><div className="truncate text-[10px] font-medium text-slate-400">{label}</div><div className="mt-1 truncate text-sm font-bold text-slate-800">{value}</div></div>; }

function Dashboard({ inquiries, followups, onGo, onCreateInquiry, onOpenInquiry }: { inquiries: Inquiry[]; followups: FollowUp[]; onGo: (page: Page) => void; onCreateInquiry: () => void; onOpenInquiry: (item: Inquiry) => void }) {
  const kpis = [
    { label: "Total Leads", value: "128", change: "+12 this month", icon: UserRound, tone: "text-blue-600 bg-blue-50" },
    { label: "Active Inquiries", value: "34", change: "9 need action", icon: FileText, tone: "text-violet-600 bg-violet-50" },
    { label: "Waiting for Pricing", value: "12", change: "3 high priority", icon: CircleDollarSign, tone: "text-amber-600 bg-amber-50" },
    { label: "Quotations Sent", value: "24", change: "AED 176.4K value", icon: Send, tone: "text-cyan-600 bg-cyan-50" },
    { label: "Follow-ups Due", value: "8", change: "3 due today", icon: CalendarClock, tone: "text-orange-600 bg-orange-50" },
    { label: "Won This Month", value: "AED 84,250.00", change: "+18.2% vs Aug", icon: BadgeCheck, tone: "text-emerald-600 bg-emerald-50" }
  ];
  const pipeline = [{ label: "Lead", value: 128, color: "bg-slate-400" }, { label: "Inquiry", value: 34, color: "bg-indigo-400" }, { label: "Pricing", value: 12, color: "bg-amber-400" }, { label: "Quotation", value: 24, color: "bg-sky-500" }, { label: "Follow-up", value: 15, color: "bg-violet-500" }, { label: "Won", value: 9, color: "bg-emerald-500" }];
  return <>
    <PageTitle title="Good morning, Ahmed" description="Here’s what needs attention across your sales desk today." action={<button className={buttonPrimary} onClick={onCreateInquiry}><Plus size={17} />Create Inquiry</button>} />
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">{kpis.map(({ label, value, change, icon: Icon, tone }) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,.03)]"><div className="flex items-start justify-between"><span className="text-xs font-medium text-slate-500">{label}</span><span className={cx("grid h-8 w-8 place-items-center rounded-lg", tone)}><Icon size={16} /></span></div><div className="mt-3 whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-950">{value}</div><div className="mt-1 text-[10px] font-medium text-slate-400">{change}</div></div>)}</div>
    <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><h2 className="font-bold text-slate-950">Sales pipeline</h2><p className="mt-1 truncate text-xs text-slate-500">Live opportunity volume by workflow stage</p></div><button onClick={() => onGo("pipeline")} className="shrink-0 text-xs font-semibold text-[#1768e5]">View pipeline</button></div><div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">{pipeline.map((stage, index) => <div key={stage.label} className="relative min-w-0"><div className="text-2xl font-extrabold tracking-tight text-slate-900">{stage.value}</div><div className="mt-1 truncate text-xs text-slate-500">{stage.label}</div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={cx("h-full rounded-full", stage.color)} style={{ width: `${Math.max(22, 100 - index * 13)}%` }} /></div></div>)}</div><div className="mt-6 flex w-full max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-2">{workflow.map(({ label, icon: Icon }, index) => <div key={label} className="flex min-w-[124px] flex-1 items-center"><div className="flex flex-1 items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm"><Icon size={14} className="text-[#1768e5]" /><span className="text-[11px] font-semibold text-slate-700">{label}</span></div>{index < workflow.length - 1 && <ArrowRight className="mx-1 shrink-0 text-slate-300" size={13} />}</div>)}</div></section>
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-[#10151f] p-5 text-white"><div className="flex min-w-0 items-center justify-between gap-3"><div className="min-w-0"><h2 className="truncate font-bold">Follow-ups due</h2><p className="mt-1 truncate text-xs text-blue-100/65">Your next customer actions</p></div><span className="shrink-0 rounded-full bg-amber-400/15 px-2.5 py-1 text-[10px] font-bold text-amber-300">3 TODAY</span></div><div className="mt-4 min-w-0 space-y-2">{followups.slice(0, 3).map((f) => <button key={f.id} onClick={() => onGo("followups")} className="flex w-full min-w-0 items-center overflow-hidden rounded-lg border border-white/8 bg-white/[.04] p-3 text-left transition hover:bg-white/[.08]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[.07] text-blue-100/80"><Clock3 size={16} /></span><div className="ml-3 min-w-0 flex-1"><div className="truncate text-xs font-semibold">{f.customer}</div><div className="mt-1 truncate text-[10px] text-blue-100/70">{f.nextFollowup} · {f.quotation}</div></div><ChevronRight className="ml-2 shrink-0 text-blue-100/40" size={16} /></button>)}</div><button onClick={() => onGo("followups")} className="mt-4 w-full rounded-lg border border-white/10 py-2 text-xs font-semibold text-blue-100/80 hover:bg-white/[.05]">Open follow-up list</button></section>
    </div>
    <section className="mt-5"><div className="mb-3 flex items-center justify-between"><div><h2 className="font-bold text-slate-950">Recent inquiries</h2><p className="mt-1 text-xs text-slate-500">Latest requests across the sales team</p></div><button onClick={() => onGo("inquiries")} className="text-xs font-semibold text-[#1768e5]">View all</button></div><InquiryTable inquiries={inquiries.slice(0, 4)} onOpen={onOpenInquiry} /></section>
  </>;
}

function InquiryTable({ inquiries, onOpen }: { inquiries: Inquiry[]; onOpen: (item: Inquiry) => void }) {
  return <DataTable><thead><tr><TableHead>Inquiry ID</TableHead><TableHead>Customer</TableHead><TableHead>Vehicle</TableHead><TableHead>Parts</TableHead><TableHead>Assigned To</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead><TableHead>Action</TableHead></tr></thead><tbody>{inquiries.map((item) => <tr key={item.id} className="hover:bg-slate-50/80"><TableCell className="font-semibold text-[#1768e5]"><div className="flex items-center gap-2"><span>{item.id}</span>{item.id === "INQ-2026-0104" && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 ring-1 ring-inset ring-blue-600/15">Demo case</span>}</div></TableCell><TableCell className="font-semibold text-slate-900">{item.customer}</TableCell><TableCell>{item.year} {item.make} {item.model}</TableCell><TableCell><span className="inline-flex items-center gap-1.5"><Boxes size={14} className="text-slate-400" />{item.parts.length} parts</span></TableCell><TableCell>{item.assigned}</TableCell><TableCell><StatusBadge value={item.priority} /></TableCell><TableCell><StatusBadge value={item.status} /></TableCell><TableCell>{item.updated}</TableCell><TableCell><button onClick={() => onOpen(item)} className="text-xs font-semibold text-[#1768e5]">Open</button></TableCell></tr>)}</tbody></DataTable>;
}

function CustomerDetail({ customer, inquiries, quotations, onBack, onCreate }: { customer: Customer; inquiries: Inquiry[]; quotations: Quotation[]; onBack: () => void; onCreate: () => void }) {
  const related = inquiries.filter((i) => i.customerId === customer.id);
  const quotes = quotations.filter((q) => q.customer === customer.company);
  return <><button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} />Back to customers</button><div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"><div className="flex items-center"><div className="grid h-14 w-14 place-items-center rounded-xl bg-[#e7effc] text-[#1768e5]"><Building2 size={24} /></div><div className="ml-4"><div className="flex items-center gap-2"><h1 className="text-xl font-bold text-slate-950">{customer.company}</h1><BadgeCheck size={17} className="text-[#1768e5]" /></div><p className="mt-1 text-sm text-slate-500">{customer.id} · Active trade account</p></div></div><button onClick={onCreate} className={buttonPrimary}><Plus size={17} />Create Inquiry</button></div><div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.5fr]"><div className="space-y-5"><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Customer details</h2><div className="mt-4 grid gap-4 text-sm"><Detail label="Primary contact" value={customer.contact} /><Detail label="Phone" value={customer.phone} /><Detail label="Email" value={customer.email} /><Detail label="Location" value={customer.location} /></div></section><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Account performance</h2><div className="mt-4 grid grid-cols-3 gap-3"><Metric label="Inquiries" value={String(customer.inquiries)} /><Metric label="Quotes" value={String(customer.quotations)} /><Metric label="Won value" value={money(customer.wonValue)} /></div></section></div><div className="space-y-5"><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Recent inquiries</h2><div className="mt-3 divide-y divide-slate-100">{related.length ? related.map((i) => <div key={i.id} className="flex items-center py-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100"><FileText size={16} /></span><div className="ml-3"><div className="text-sm font-semibold">{i.id}</div><div className="text-xs text-slate-400">{i.year} {i.make} {i.model} · {i.parts.length} parts</div></div><span className="ml-auto"><StatusBadge value={i.status} /></span></div>) : <EmptyState text="No inquiries yet. Create the first request for this customer." />}</div></section><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Quotation history</h2><div className="mt-3 divide-y divide-slate-100">{quotes.length ? quotes.map((q) => <div key={q.id} className="flex items-center py-3"><div><div className="text-sm font-semibold text-[#1768e5]">{q.id}</div><div className="text-xs text-slate-400">{q.created} · {money(totalFor(q))}</div></div><span className="ml-auto"><StatusBadge value={q.status} /></span></div>) : <EmptyState text="No quotations generated yet." />}</div></section><Timeline featured={customer.id === "CUS-0042"} /></div></div></>;
}

function InquiryDetail({ inquiry, onBack, onAssign, onPrice, onQuote }: { inquiry: Inquiry; onBack: () => void; onAssign: () => void; onPrice: () => void; onQuote: () => void }) {
  return <><button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} />Back to inquiries</button><div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-xl font-bold text-slate-950">{inquiry.id}</h1><StatusBadge value={inquiry.status} /><StatusBadge value={inquiry.priority} /></div><p className="mt-1 text-sm text-slate-500">{inquiry.customer} · created by {inquiry.salesperson}</p></div><div className="flex flex-wrap gap-2">{inquiry.status === "Draft" && <button className={buttonSecondary} onClick={onAssign}><ArrowRight size={17} />Quick assign</button>}<button className={buttonSecondary} onClick={onPrice}><CircleDollarSign size={17} />Assign Price Desk</button>{inquiry.status === "Pricing Completed" && <button className={buttonPrimary} onClick={onQuote}><ReceiptText size={17} />Generate Quotation</button>}</div></div><div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.75fr]"><div className="space-y-5"><section className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><Truck size={18} className="text-[#1768e5]" /><h2 className="font-bold">Vehicle information</h2></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Detail label="Customer" value={inquiry.customer} /><Detail label="Vehicle" value={`${inquiry.year} ${inquiry.make} ${inquiry.model}`} /><Detail label="Registration" value={inquiry.registration || "Not provided"} /><div className="sm:col-span-2"><Detail label="VIN / Chassis Number" value={inquiry.vin || "Not provided"} /></div></div></section><section className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div><h2 className="font-bold">Parts request</h2><p className="mt-1 text-xs text-slate-500">{inquiry.parts.length} requested line items</p></div><Boxes size={19} className="text-slate-400" /></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead><tr><TableHead>Part Name</TableHead><TableHead>Part Number</TableHead><TableHead>Brand Preference</TableHead><TableHead>Qty</TableHead><TableHead>Notes</TableHead></tr></thead><tbody>{inquiry.parts.map((part) => <tr key={part.id}><TableCell className="font-semibold text-slate-900">{part.name}</TableCell><TableCell><span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">{part.number || "—"}</span></TableCell><TableCell>{part.brand}</TableCell><TableCell>{part.qty}</TableCell><TableCell>{part.notes || "—"}</TableCell></tr>)}</tbody></table></div></section></div><div className="space-y-5"><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Ownership</h2><div className="mt-4 space-y-4"><Detail label="Salesperson" value={inquiry.salesperson} /><Detail label="Price Desk" value={inquiry.assigned} /><Detail label="Last updated" value={inquiry.updated} /></div></section><Timeline inquiryId={inquiry.id} featured={inquiry.id === "INQ-2026-0104"} /></div></div></>;
}

function PriceDeskDetail({ inquiry, onBack, onUpdate, onComplete }: { inquiry: Inquiry; onBack: () => void; onUpdate: (inquiryId: string, partId: string, key: keyof Part, value: string | number) => void; onComplete: () => void }) {
  const isComplete = inquiry.parts.every((p) => p.supplier && p.cost && p.price && p.availability && p.delivery);
  return <><button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} />Back to Price Desk</button><div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"><div><div className="flex items-center gap-2"><h1 className="text-xl font-bold">{inquiry.id}</h1><StatusBadge value={inquiry.status} /></div><p className="mt-1 text-sm text-slate-500">{inquiry.customer} · {inquiry.year} {inquiry.make} {inquiry.model}</p></div><div className="flex items-center gap-3"><div className="text-right text-xs"><div className="text-slate-400">Assigned to</div><div className="font-semibold text-slate-700">{inquiry.assigned}</div></div><Avatar name={inquiry.assigned} /></div></div><div className="mt-5 space-y-4">{inquiry.parts.map((part, index) => <section key={part.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 py-4"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-xs font-bold text-[#1768e5] shadow-sm">{index + 1}</span><div className="ml-3"><h3 className="font-bold text-slate-900">{part.name}</h3><p className="mt-0.5 text-xs text-slate-500">{part.number} · {part.brand} · Qty {part.qty}</p></div>{part.price && <span className="ml-auto"><StatusBadge value="Price Received" /></span>}</div><div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4"><Field label="Supplier"><input className={inputClass} value={part.supplier || ""} onChange={(e) => onUpdate(inquiry.id, part.id, "supplier", e.target.value)} placeholder="Supplier name" /></Field><Field label="Brand"><input className={inputClass} value={part.brand} onChange={(e) => onUpdate(inquiry.id, part.id, "brand", e.target.value)} /></Field><Field label="Cost Price (AED)"><input type="number" className={inputClass} value={part.cost || ""} onChange={(e) => onUpdate(inquiry.id, part.id, "cost", Number(e.target.value))} placeholder="0.00" /></Field><Field label="Selling Price (AED)"><input type="number" className={inputClass} value={part.price || ""} onChange={(e) => onUpdate(inquiry.id, part.id, "price", Number(e.target.value))} placeholder="0.00" /></Field><Field label="Availability"><select className={inputClass} value={part.availability || ""} onChange={(e) => onUpdate(inquiry.id, part.id, "availability", e.target.value)}><option value="">Select</option><option>In Stock</option><option>Limited Stock</option><option>Order Required</option><option>Unavailable</option></select></Field><Field label="Delivery Time"><select className={inputClass} value={part.delivery || ""} onChange={(e) => onUpdate(inquiry.id, part.id, "delivery", e.target.value)}><option value="">Select</option><option>Same Day</option><option>Next Day</option><option>2–3 Days</option><option>7–10 Days</option></select></Field><div className="md:col-span-2"><Field label="Remarks"><input className={inputClass} value={part.remarks || ""} onChange={(e) => onUpdate(inquiry.id, part.id, "remarks", e.target.value)} placeholder="Stock notes, alternatives or conditions" /></Field></div></div></section>)}</div><div className="sticky bottom-4 mt-5 flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-[0_12px_36px_rgba(15,23,42,.12)] backdrop-blur sm:flex-row"><div className="flex items-center gap-3"><span className={cx("grid h-9 w-9 place-items-center rounded-full", isComplete ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>{isComplete ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}</span><div><div className="text-sm font-semibold">{isComplete ? "All lines are priced" : "Pricing in progress"}</div><div className="text-xs text-slate-500">Complete supplier, cost, selling price, availability and delivery for every part.</div></div></div><button disabled={!isComplete} onClick={onComplete} className={cx(buttonPrimary, "disabled:cursor-not-allowed disabled:opacity-40")}><PackageCheck size={17} />Complete Pricing</button></div></>;
}

function QuotationView({ quote, onBack, onSend, onRevise, onWon, onLost }: { quote: Quotation; onBack: () => void; onSend: () => void; onRevise: () => void; onWon: () => void; onLost: () => void }) {
  const subtotal = quote.parts.reduce((sum, part) => sum + (part.price || 0) * part.qty, 0); const vat = subtotal * .05; const total = subtotal + vat;
  return <><div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} />Back to quotations</button><div className="flex flex-wrap gap-2"><button className={buttonSecondary} onClick={onRevise}><FilePenLine size={16} />Revise</button><button className={buttonSecondary} onClick={onLost}><XCircle size={16} />Mark Lost</button><button className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700" onClick={onWon}><Handshake size={16} />Mark Won</button><button className={buttonPrimary} onClick={onSend}><Send size={16} />Send Quotation</button></div></div><div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,.08)]"><div className="h-2 bg-[#1768e5]" /><div className="p-6 sm:p-10"><div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-7 sm:flex-row"><div className="flex items-center"><div className="grid h-12 w-12 place-items-center rounded-xl bg-[#10151f] text-white"><Wrench size={23} /></div><div className="ml-3"><div className="text-base font-extrabold tracking-tight">AUTO PARTS CRM</div><div className="text-xs text-slate-400">Automotive Parts & Trading</div></div></div><div className="sm:text-right"><div className="text-xs font-semibold text-[#1768e5]">QUOTATION</div><div className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">{quote.id}</div><div className="mt-1 text-xs text-slate-500">Date: {quote.created}</div><div className="mt-2 flex items-center gap-2 sm:justify-end">{quote.revision > 0 && <span className="text-xs font-semibold text-slate-500">Revision {quote.revision}</span>}<StatusBadge value={quote.status} /></div></div></div><div className="grid gap-6 py-7 sm:grid-cols-2"><div><div className="text-[11px] font-semibold text-slate-400">PREPARED FOR</div><div className="mt-2 text-lg font-bold text-slate-950">{quote.customer}</div><div className="mt-1 text-sm text-slate-500">Dubai, United Arab Emirates</div></div><div className="sm:text-right"><div className="text-[11px] font-semibold text-slate-400">VEHICLE</div><div className="mt-2 text-base font-bold text-slate-950">{quote.vehicle}</div><div className="mt-1 text-sm text-slate-500">Inquiry reference: {quote.inquiryId}</div></div></div><div className="overflow-hidden rounded-xl border border-slate-200"><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead><tr><TableHead>Part</TableHead><TableHead>Part Number</TableHead><TableHead>Brand</TableHead><TableHead>Qty</TableHead><TableHead>Unit Price</TableHead><TableHead>Line Total</TableHead></tr></thead><tbody>{quote.parts.map((part) => <tr key={part.id}><TableCell className="font-semibold text-slate-900">{part.name}<div className="mt-1 text-xs font-normal text-slate-400">{part.delivery || "As advised"} · {part.availability || "Subject to availability"}</div></TableCell><TableCell><span className="font-mono text-xs">{part.number}</span></TableCell><TableCell>{part.brand}</TableCell><TableCell>{part.qty}</TableCell><TableCell>{money(part.price || 0)}</TableCell><TableCell className="font-semibold text-slate-900">{money((part.price || 0) * part.qty)}</TableCell></tr>)}</tbody></table></div></div><div className="mt-7 flex justify-end"><div className="w-full max-w-sm space-y-3 text-sm"><div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold tabular-nums text-slate-800">{money(subtotal)}</span></div><div className="flex justify-between text-slate-500"><span>VAT (5%)</span><span className="font-semibold tabular-nums text-slate-800">{money(vat)}</span></div><div className="flex justify-between border-t border-slate-200 pt-4 text-lg"><span className="font-bold">Grand Total</span><span className="font-extrabold tabular-nums text-[#1768e5]">{money(total)}</span></div></div></div><div className="mt-8 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-3"><Detail label="Validity" value={quote.validity} /><Detail label="Delivery Terms" value={quote.delivery} /><Detail label="Payment Terms" value={quote.payment} /></div>{quote.notes && <div className="mt-5 text-xs leading-5 text-slate-500"><span className="font-semibold text-slate-700">Notes:</span> {quote.notes}</div>}<div className="mt-10 flex items-end justify-between border-t border-slate-200 pt-6 text-xs text-slate-400"><div><div className="font-semibold text-slate-600">Prepared by {quote.salesperson}</div><div className="mt-1">Sales quotation · {quote.created}</div></div><div className="text-right">Demo Environment<br />For client presentation</div></div></div></div></>;
}

function InquiryModal({ customers, form, setForm, onSubmit, onClose }: { customers: Customer[]; form: InquiryFormState; setForm: (form: InquiryFormState) => void; onSubmit: (e: FormEvent) => void; onClose: () => void }) {
  const updatePart = (id: string, key: keyof Part, value: string | number) => setForm({ ...form, parts: form.parts.map((p) => p.id === id ? { ...p, [key]: value } : p) });
  return <Modal title="Create inquiry" subtitle="Record the vehicle and every requested spare part." onClose={onClose} wide><form onSubmit={onSubmit}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="sm:col-span-2"><Field label="Customer"><select className={inputClass} value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>{customers.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></Field></div><Field label="Vehicle Make"><select className={inputClass} value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })}><option>Toyota</option><option>Nissan</option><option>Lexus</option><option>Mitsubishi</option><option>Honda</option></select></Field><Field label="Vehicle Model"><input required className={inputClass} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} /></Field><Field label="Model Year"><input className={inputClass} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></Field><div className="sm:col-span-2"><Field label="VIN / Chassis Number"><input className={inputClass} value={form.vin} onChange={(e) => setForm({ ...form, vin: e.target.value.toUpperCase() })} placeholder="17-character VIN" /></Field></div><Field label="Registration Number"><input className={inputClass} value={form.registration} onChange={(e) => setForm({ ...form, registration: e.target.value })} placeholder="D 00000" /></Field><div className="sm:col-span-2 lg:col-span-4"><Field label="Notes"><textarea className="min-h-20 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-[#1768e5]" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Customer preferences or urgency..." /></Field></div></div><div className="my-6 flex items-center justify-between border-t border-slate-200 pt-6"><div><h3 className="font-bold">Parts request</h3><p className="mt-1 text-xs text-slate-500">Add one line for each requested item.</p></div><button type="button" className={buttonSecondary} onClick={() => setForm({ ...form, parts: [...form.parts, { id: `NEW-${Date.now()}`, name: "", number: "", brand: "Any", qty: 1, notes: "" }] })}><Plus size={16} />Add Part</button></div><div className="space-y-3">{form.parts.map((part, index) => <div key={part.id} className="grid items-end gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_.45fr_1fr_auto]"><Field label={index === 0 ? "Part Name" : `Part ${index + 1}`}><input required className={inputClass} value={part.name} onChange={(e) => updatePart(part.id, "name", e.target.value)} placeholder="Brake Pads" /></Field><Field label="Part Number"><input className={inputClass} value={part.number} onChange={(e) => updatePart(part.id, "number", e.target.value)} placeholder="04465-60320" /></Field><Field label="Brand Preference"><input className={inputClass} value={part.brand} onChange={(e) => updatePart(part.id, "brand", e.target.value)} /></Field><Field label="Qty"><input type="number" min="1" className={inputClass} value={part.qty} onChange={(e) => updatePart(part.id, "qty", Number(e.target.value))} /></Field><Field label="Notes"><input className={inputClass} value={part.notes} onChange={(e) => updatePart(part.id, "notes", e.target.value)} /></Field><button type="button" disabled={form.parts.length === 1} aria-label={`Remove part ${index + 1}`} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-rose-600 disabled:opacity-30" onClick={() => setForm({ ...form, parts: form.parts.filter((p) => p.id !== part.id) })}><X size={16} /></button></div>)}</div><div className="mt-6 flex flex-col-reverse justify-between gap-2 border-t border-slate-200 pt-5 sm:flex-row"><button type="button" className={buttonSecondary} onClick={onClose}>Cancel</button><button type="submit" className={buttonPrimary}><ClipboardCheck size={16} />Save Inquiry</button></div></form></Modal>;
}

function Timeline({ inquiryId, featured = false }: { inquiryId?: string; featured?: boolean }) {
  const events = featured
    ? [{ time: "1:42 PM", text: "Revision 1 generated", icon: FilePenLine }, { time: "1:30 PM", text: "Customer requested revised pricing", icon: MessageSquareText }, { time: "11:10 AM", text: "Quotation QT-2026-0048 generated", icon: ReceiptText }, { time: "11:02 AM", text: "Pricing completed by Mohammed", icon: CheckCircle2 }, { time: "10:18 AM", text: "Assigned to Price Desk", icon: CircleDollarSign }, { time: "10:15 AM", text: "Inquiry INQ-2026-0104 created by Ahmed", icon: FileText }]
    : inquiryId
      ? [{ time: "2:20 PM", text: `${inquiryId} reviewed by the sales team`, icon: Activity }, { time: "1:05 PM", text: "Parts request sent to Price Desk", icon: CircleDollarSign }, { time: "10:30 AM", text: `${inquiryId} created`, icon: FileText }]
      : [{ time: "2:20 PM", text: "Latest parts enquiry reviewed", icon: Activity }, { time: "12:45 PM", text: "Customer requirements updated", icon: FilePenLine }, { time: "10:30 AM", text: "Trade account contacted by sales", icon: MessageSquareText }];
  return <section className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><Activity size={17} className="text-[#1768e5]" /><h2 className="font-bold">Activity timeline</h2></div><div className="mt-5 space-y-0">{events.map(({ time, text, icon: Icon }, index) => <div key={`${time}-${text}`} className="relative flex pb-5 last:pb-0">{index < events.length - 1 && <span className="absolute left-[13px] top-7 h-[calc(100%-12px)] w-px bg-slate-200" />}<span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-400"><Icon size={12} /></span><div className="ml-3"><div className="text-xs font-semibold text-slate-800">{text}</div><div className="mt-1 text-[10px] text-slate-400">{time} · Today</div></div></div>)}</div></section>;
}

function Pipeline({ leads, inquiries, quotations, onChange }: { leads: Lead[]; inquiries: Inquiry[]; quotations: Quotation[]; onChange: (quote: Quotation, stage: Stage) => void }) {
  const columns: Stage[] = ["Lead", "Inquiry", "Pricing", "Quotation", "Follow-up", "Won", "Lost"];
  const cards = [
    ...leads.filter((l) => l.status !== "Converted").slice(0, 3).map((l) => ({ key: l.id, stage: "Lead" as Stage, customer: l.company, id: l.id, amount: 0, salesperson: l.salesperson, age: "2d", quote: null as Quotation | null })),
    ...inquiries.filter((i) => i.status === "Draft").map((i) => ({ key: i.id, stage: "Inquiry" as Stage, customer: i.customer, id: i.id, amount: 0, salesperson: i.salesperson, age: "1d", quote: null })),
    ...inquiries.filter((i) => ["New", "Checking", "Price Received", "Pricing Completed"].includes(i.status)).map((i) => ({ key: i.id, stage: "Pricing" as Stage, customer: i.customer, id: i.id, amount: i.parts.reduce((s, p) => s + (p.price || 0) * p.qty, 0), salesperson: i.salesperson, age: "8h", quote: null })),
    ...quotations.map((q) => ({ key: q.id, stage: (q.status === "Won" ? "Won" : q.status === "Lost" ? "Lost" : q.status === "Negotiation" ? "Follow-up" : "Quotation") as Stage, customer: q.customer, id: q.inquiryId, amount: totalFor(q), salesperson: q.salesperson, age: q.status === "Won" ? "1d" : "3d", quote: q }))
  ];
  return <><PageTitle title="Sales pipeline" description="Every active opportunity from first contact to final decision." action={<div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">AED 286,400.00 open value</div>} /><div className="overflow-x-auto pb-4"><div className="grid min-w-[1400px] grid-cols-7 gap-3">{columns.map((column) => { const items = cards.filter((card) => card.stage === column); return <section key={column} className="rounded-xl bg-slate-200/50 p-2.5"><div className="mb-3 flex items-center justify-between px-1"><div className="flex items-center gap-2"><span className={cx("h-2 w-2 rounded-full", column === "Won" ? "bg-emerald-500" : column === "Lost" ? "bg-rose-500" : column === "Pricing" ? "bg-amber-500" : "bg-[#1768e5]")} /><h2 className="text-xs font-bold text-slate-700">{column}</h2></div><span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">{items.length}</span></div><div className="space-y-2.5">{items.map((card) => <div key={card.key} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"><div className="flex items-start justify-between gap-2"><div className="text-xs font-bold leading-5 text-slate-900">{card.customer}</div><MoreHorizontal size={15} className="shrink-0 text-slate-300" /></div><div className="mt-1 text-[10px] font-medium text-[#1768e5]">{card.id}</div>{card.amount > 0 && <div className="mt-3 text-sm font-extrabold tracking-tight">{money(card.amount)}</div>}<div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5"><div className="flex items-center gap-1.5"><Avatar name={card.salesperson} /><span className="max-w-[70px] truncate text-[10px] text-slate-500">{card.salesperson}</span></div><span className="text-[10px] text-slate-400">{card.age}</span></div>{card.quote && <select aria-label={`Move ${card.customer}`} className="mt-2 h-8 w-full rounded-md border border-slate-200 bg-slate-50 px-2 text-[10px] font-semibold text-slate-600 outline-none" value={card.stage} onChange={(e) => onChange(card.quote!, e.target.value as Stage)}><option>Quotation</option><option>Follow-up</option><option>Won</option><option>Lost</option></select>}</div>)}{items.length === 0 && <div className="rounded-lg border border-dashed border-slate-300 p-5 text-center text-[10px] text-slate-400">No opportunities</div>}</div></section>; })}</div></div></>;
}

function SettingsPage({ onRequestReset, onSaved }: { onRequestReset: () => void; onSaved: () => void }) {
  return <><PageTitle title="Demo settings" description="Keep the sales presentation ready for every client walkthrough." /><div className="grid max-w-4xl gap-5 lg:grid-cols-2"><section className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#1768e5]"><Sparkles size={19} /></span><div><h2 className="font-bold">Presentation scenario</h2><p className="mt-0.5 text-xs text-slate-500">Al Noor Auto Parts · Toyota Land Cruiser</p></div></div><p className="mt-4 text-sm leading-6 text-slate-600">Restore the CRM to the prepared lead-to-quotation scenario before a new client presentation.</p><button onClick={onRequestReset} className={cx(buttonSecondary, "mt-5 text-[#1768e5] hover:border-blue-200 hover:bg-blue-50")}><RefreshCcw size={16} />Restore Demo Data</button></section><section className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600"><Settings size={19} /></span><div><h2 className="font-bold">Quotation preferences</h2><p className="mt-0.5 text-xs text-slate-500">Default commercial settings</p></div></div><div className="mt-5 space-y-4"><Field label="Trading name"><input className={inputClass} defaultValue="AUTO PARTS CRM" /></Field><Field label="Quotation currency"><select className={inputClass}><option>AED — UAE Dirham</option></select></Field><button onClick={onSaved} className={buttonPrimary}>Save preferences</button></div></section></div></>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div><div className="text-[10px] font-semibold text-slate-400">{label}</div><div className="mt-1 text-sm font-medium text-slate-800">{value}</div></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-lg bg-slate-50 p-3"><div className="text-[10px] text-slate-400">{label}</div><div className="mt-1 truncate text-sm font-bold text-slate-900">{value}</div></div>; }
function EmptyState({ text }: { text: string }) { return <div className="py-8 text-center"><Boxes className="mx-auto text-slate-300" size={24} /><p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-400">{text}</p></div>; }
