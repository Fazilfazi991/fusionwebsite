"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  Bell,
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FilePenLine,
  FileText,
  Gauge,
  Handshake,
  LayoutDashboard,
  Menu,
  MoreVertical,
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
  UserRound,
  UsersRound,
  Wrench,
  X,
  XCircle,
} from "lucide-react";

import mobileStyles from "./mobile.module.css";

type Page =
  | "dashboard"
  | "leads"
  | "customers"
  | "inquiries"
  | "pricing"
  | "quotations"
  | "followups"
  | "pipeline"
  | "settings";
type LeadStatus =
  "New" | "Contacted" | "Qualified" | "Converted" | "Not Interested" | "Lost";
type PriceStatus =
  | "New Inquiry"
  | "Under Review"
  | "Pricing"
  | "Price Available"
  | "Partially Available"
  | "Price Not Available"
  | "Completed";
type QuoteStatus =
  | "Draft"
  | "Sent"
  | "Follow-up"
  | "Negotiation"
  | "Revised"
  | "Accepted"
  | "Rejected"
  | "Expired"
  | "Won"
  | "Lost";
type CustomerType =
  | "Fleet"
  | "Garage"
  | "Workshop"
  | "Parts Trader"
  | "Distributor"
  | "Government"
  | "Rental Company"
  | "Other";
type Stage =
  "Lead" | "Inquiry" | "Pricing" | "Quotation" | "Follow-up" | "Won" | "Lost";
type Event = {
  id: string;
  entity: "lead" | "customer" | "inquiry" | "quote";
  entityId: string;
  customerId?: string;
  text: string;
  at: string;
};
type Lead = {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  location: string;
  source: string;
  branch: string;
  salesperson: string;
  status: LeadStatus;
  notes?: string;
  customerId?: string;
};
type Customer = {
  id: string;
  company: string;
  type: CustomerType;
  contact: string;
  mobile: string;
  whatsapp: string;
  email: string;
  location: string;
  country: string;
  fleetSize: number;
  branch: string;
  salesperson: string;
  status: "Active" | "Inactive";
  created: string;
  remarks: string;
};
type PricingResponse = {
  availableQty: number;
  cost: number;
  sellingPrice: number;
  remarks: string;
};
type Requirement = {
  id: string;
  vin: string;
  item: string;
  partNo: string;
  qty: number;
  remarks: string;
  pricing: PricingResponse;
};
type Inquiry = {
  id: string;
  activityType: "New Inquiry";
  customerId: string;
  customer: string;
  type: "LMV" | "HMV";
  branch: string;
  salesperson: string;
  createdBy: string;
  date: string;
  status: PriceStatus;
  assigned: string;
  items: Requirement[];
};
type QuoteItem = {
  id: string;
  item: string;
  partNo: string;
  requestedQty: number;
  availableQty: number;
  qty: number;
  unitPrice: number;
  discount: number;
};
type QuoteVersion = { revision: number; items: QuoteItem[]; savedAt: string };
type CloseInfo = {
  date: string;
  value?: number;
  orderReference?: string;
  reason?: string;
  otherReason?: string;
  remarks: string;
};
type Quotation = {
  id: string;
  inquiryId: string;
  customerId: string;
  customer: string;
  contact: string;
  items: QuoteItem[];
  revision: number;
  versions: QuoteVersion[];
  status: QuoteStatus;
  salesperson: string;
  branch: string;
  created: string;
  validity: string;
  delivery: string;
  payment: string;
  notes: string;
  close?: CloseInfo;
};
type FollowUp = {
  id: string;
  customerId: string;
  customer: string;
  inquiryId: string;
  quotationId: string;
  salesperson: string;
  followupDate: string;
  nextFollowup: string;
  status:
    "Pending" | "Contacted" | "Negotiation" | "Awaiting Customer" | "Completed";
  note: string;
};
type InquiryForm = {
  customerId: string;
  type: "LMV" | "HMV";
  items: Requirement[];
};

const currentUser = "Ahmed Hassan";
const branches = ["Dubai", "Sharjah", "Abu Dhabi"];
const salespeople = ["Ahmed Hassan", "Sara Khan", "Omar Farooq"];
const customerTypes: CustomerType[] = [
  "Fleet",
  "Garage",
  "Workshop",
  "Parts Trader",
  "Distributor",
  "Government",
  "Rental Company",
  "Other",
];
const today = "20 Sep 2026";
const blankPricing = (): PricingResponse => ({
  availableQty: 0,
  cost: 0,
  sellingPrice: 0,
  remarks: "",
});

const seedLeads: Lead[] = [
  {
    id: "LD-0128",
    company: "Al Falah Workshop",
    contact: "Khalid Mansoor",
    phone: "+971 50 482 1180",
    email: "khalid@alfalah.ae",
    location: "Industrial Area 4",
    source: "Referral",
    branch: "Sharjah",
    salesperson: currentUser,
    status: "Qualified",
  },
  {
    id: "LD-0127",
    company: "Dubai Motor Works",
    contact: "Imran Qureshi",
    phone: "+971 55 214 9073",
    email: "imran@dmw.ae",
    location: "Al Quoz",
    source: "Website",
    branch: "Dubai",
    salesperson: "Sara Khan",
    status: "Contacted",
  },
  {
    id: "LD-0126",
    company: "Falcon Garage",
    contact: "Yousef Abdulla",
    phone: "+971 52 739 4410",
    email: "yousef@falcon.ae",
    location: "Ajman",
    source: "Walk-in",
    branch: "Sharjah",
    salesperson: "Omar Farooq",
    status: "New",
  },
  {
    id: "LD-0125",
    company: "Emirates Auto Service",
    contact: "Nabeel Rahman",
    phone: "+971 56 680 2234",
    email: "nabeel@eas.ae",
    location: "Mussafah",
    source: "Campaign",
    branch: "Abu Dhabi",
    salesperson: currentUser,
    status: "Lost",
  },
];
const seedCustomers: Customer[] = [
  {
    id: "CUS-0042",
    company: "Al Noor Auto Parts LLC",
    type: "Parts Trader",
    contact: "Ahmed Rahman",
    mobile: "+971 50 817 2241",
    whatsapp: "+971 50 817 2241",
    email: "ahmed@alnoorparts.ae",
    location: "Deira",
    country: "UAE",
    fleetSize: 0,
    branch: "Dubai",
    salesperson: currentUser,
    status: "Active",
    created: "04 Jan 2026",
    remarks: "Preferred trade account",
  },
  {
    id: "CUS-0041",
    company: "Royal Road Garage",
    type: "Garage",
    contact: "Sameer Bhat",
    mobile: "+971 55 920 1147",
    whatsapp: "+971 55 920 1147",
    email: "sameer@royalroad.ae",
    location: "Al Qusais",
    country: "UAE",
    fleetSize: 0,
    branch: "Dubai",
    salesperson: "Sara Khan",
    status: "Active",
    created: "18 Feb 2026",
    remarks: "30-day terms",
  },
  {
    id: "CUS-0038",
    company: "Capital Auto Care",
    type: "Workshop",
    contact: "Adnan Mirza",
    mobile: "+971 54 119 8820",
    whatsapp: "+971 54 119 8820",
    email: "adnan@capitalauto.ae",
    location: "Mussafah",
    country: "UAE",
    fleetSize: 12,
    branch: "Abu Dhabi",
    salesperson: "Omar Farooq",
    status: "Active",
    created: "12 Mar 2026",
    remarks: "Insurance repair specialist",
  },
  {
    id: "CUS-0035",
    company: "Speedline Workshop",
    type: "Workshop",
    contact: "Arun Menon",
    mobile: "+971 52 440 9913",
    whatsapp: "+971 52 440 9913",
    email: "arun@speedline.ae",
    location: "Al Nahda",
    country: "UAE",
    fleetSize: 4,
    branch: "Sharjah",
    salesperson: currentUser,
    status: "Active",
    created: "27 Mar 2026",
    remarks: "",
  },
];
const seedInquiries: Inquiry[] = [
  {
    id: "I26-001",
    activityType: "New Inquiry",
    customerId: "CUS-0042",
    customer: "Al Noor Auto Parts LLC",
    type: "LMV",
    branch: "Dubai",
    salesperson: currentUser,
    createdBy: `${currentUser} – Sales Executive`,
    date: "19 Sep 2026",
    status: "Completed",
    assigned: "Mohammed Ali",
    items: [
      {
        id: "R1",
        vin: "JTMHU01J9N4123456",
        item: "Oil Filter",
        partNo: "90915-YZZD4",
        qty: 20,
        remarks: "Nissan Patrol",
        pricing: {
          availableQty: 20,
          cost: 25,
          sellingPrice: 35,
          remarks: "Available",
        },
      },
      {
        id: "R2",
        vin: "JTMHU01J9N4123456",
        item: "Air Filter",
        partNo: "17801-38030",
        qty: 10,
        remarks: "Nissan Patrol",
        pricing: {
          availableQty: 5,
          cost: 40,
          sellingPrice: 55,
          remarks: "Partial availability",
        },
      },
    ],
  },
  {
    id: "I26-002",
    activityType: "New Inquiry",
    customerId: "CUS-0041",
    customer: "Royal Road Garage",
    type: "HMV",
    branch: "Dubai",
    salesperson: "Sara Khan",
    createdBy: "Sara Khan – Sales Executive",
    date: "19 Sep 2026",
    status: "Under Review",
    assigned: "Fatima Noor",
    items: [
      {
        id: "R3",
        vin: "JN1TANY62U0018493",
        item: "Water Pump",
        partNo: "21010-1LA0A",
        qty: 2,
        remarks: "With gasket",
        pricing: blankPricing(),
      },
    ],
  },
  {
    id: "I26-003",
    activityType: "New Inquiry",
    customerId: "CUS-0038",
    customer: "Capital Auto Care",
    type: "LMV",
    branch: "Abu Dhabi",
    salesperson: "Omar Farooq",
    createdBy: "Omar Farooq – Sales Executive",
    date: "20 Sep 2026",
    status: "Pricing",
    assigned: "Rashid Karim",
    items: [
      {
        id: "R4",
        vin: "JTJHY7AX9K4298741",
        item: "Headlamp Assembly RH",
        partNo: "81145-60J40",
        qty: 1,
        remarks: "LED type",
        pricing: {
          availableQty: 1,
          cost: 2140,
          sellingPrice: 2625,
          remarks: "Available next day",
        },
      },
    ],
  },
];
const seedQuotes: Quotation[] = [
  {
    id: "QT-2026-0048",
    inquiryId: "I26-001",
    customerId: "CUS-0042",
    customer: "Al Noor Auto Parts LLC",
    contact: "Ahmed Rahman",
    items: [
      {
        id: "Q1",
        item: "Oil Filter",
        partNo: "90915-YZZD4",
        requestedQty: 20,
        availableQty: 20,
        qty: 20,
        unitPrice: 35,
        discount: 5,
      },
      {
        id: "Q2",
        item: "Air Filter",
        partNo: "17801-38030",
        requestedQty: 10,
        availableQty: 5,
        qty: 5,
        unitPrice: 55,
        discount: 0,
      },
    ],
    revision: 1,
    versions: [],
    status: "Negotiation",
    salesperson: currentUser,
    branch: "Dubai",
    created: "19 Sep 2026",
    validity: "7 days",
    delivery: "As per item availability",
    payment: "30 days from invoice",
    notes: "Subject to stock availability.",
  },
  {
    id: "QT-2026-0047",
    inquiryId: "I26-000",
    customerId: "CUS-0041",
    customer: "Royal Road Garage",
    contact: "Sameer Bhat",
    items: [
      {
        id: "Q3",
        item: "Alternator",
        partNo: "23100-1LA1A",
        requestedQty: 1,
        availableQty: 1,
        qty: 1,
        unitPrice: 1290,
        discount: 0,
      },
    ],
    revision: 0,
    versions: [],
    status: "Sent",
    salesperson: "Sara Khan",
    branch: "Dubai",
    created: "17 Sep 2026",
    validity: "7 days",
    delivery: "2 working days",
    payment: "Cash on delivery",
    notes: "",
  },
  {
    id: "QT-2026-0046",
    inquiryId: "H26-004",
    customerId: "CUS-0038",
    customer: "Capital Auto Care",
    contact: "Adnan Mirza",
    items: [
      {
        id: "Q4",
        item: "Wheel Bearing",
        partNo: "43570-60010",
        requestedQty: 2,
        availableQty: 2,
        qty: 2,
        unitPrice: 485,
        discount: 0,
      },
    ],
    revision: 0,
    versions: [],
    status: "Won",
    salesperson: "Omar Farooq",
    branch: "Abu Dhabi",
    created: "15 Sep 2026",
    validity: "14 days",
    delivery: "Same day",
    payment: "Account terms",
    notes: "",
    close: {
      date: "16 Sep 2026",
      value: 1018.5,
      orderReference: "LPO-8841",
      remarks: "Confirmed",
    },
  },
  {
    id: "QT-2026-0045",
    inquiryId: "H26-003",
    customerId: "CUS-0035",
    customer: "Speedline Workshop",
    contact: "Arun Menon",
    items: [
      {
        id: "Q5",
        item: "Starter Motor",
        partNo: "31200-5A2-A52",
        requestedQty: 1,
        availableQty: 1,
        qty: 1,
        unitPrice: 870,
        discount: 0,
      },
    ],
    revision: 1,
    versions: [],
    status: "Lost",
    salesperson: currentUser,
    branch: "Sharjah",
    created: "13 Sep 2026",
    validity: "7 days",
    delivery: "Next day",
    payment: "Cash on delivery",
    notes: "",
    close: {
      date: "15 Sep 2026",
      reason: "Price",
      remarks: "Competitor offer selected",
    },
  },
];
const seedFollowups: FollowUp[] = [
  {
    id: "FU-0188",
    customerId: "CUS-0042",
    customer: "Al Noor Auto Parts LLC",
    inquiryId: "I26-001",
    quotationId: "QT-2026-0048",
    salesperson: currentUser,
    followupDate: "19 Sep, 1:30 PM",
    nextFollowup: "20 Sep, 3:00 PM",
    status: "Negotiation",
    note: "Customer requested improved pricing.",
  },
  {
    id: "FU-0187",
    customerId: "CUS-0041",
    customer: "Royal Road Garage",
    inquiryId: "I26-000",
    quotationId: "QT-2026-0047",
    salesperson: "Sara Khan",
    followupDate: "17 Sep, 4:15 PM",
    nextFollowup: "20 Sep, 4:30 PM",
    status: "Awaiting Customer",
    note: "Decision after vehicle inspection.",
  },
];
const seedEvents: Event[] = [
  {
    id: "EV1",
    entity: "customer",
    entityId: "CUS-0042",
    customerId: "CUS-0042",
    text: "Customer account reviewed",
    at: "20 Sep, 9:15 AM",
  },
  {
    id: "EV2",
    entity: "inquiry",
    entityId: "I26-001",
    customerId: "CUS-0042",
    text: "I26-001 routed to LMV Price Desk",
    at: "19 Sep, 10:18 AM",
  },
  {
    id: "EV3",
    entity: "quote",
    entityId: "QT-2026-0048",
    customerId: "CUS-0042",
    text: "Quotation revision 1 created",
    at: "19 Sep, 1:42 PM",
  },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "leads", label: "Leads", icon: UserRound },
  { id: "customers", label: "Customers", icon: UsersRound },
  { id: "inquiries", label: "Inquiries", icon: FileText },
  { id: "pricing", label: "Price Desk", icon: CircleDollarSign },
  { id: "quotations", label: "Quotations", icon: ReceiptText },
  { id: "followups", label: "Follow-ups", icon: CalendarClock },
  { id: "pipeline", label: "Pipeline", icon: Gauge },
] as const;
const money = (n: number) =>
  new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);
const quoteTotals = (q: Quotation) => {
  const gross = q.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const discount = q.items.reduce(
    (s, i) => s + (i.qty * i.unitPrice * i.discount) / 100,
    0,
  );
  const subtotal = gross - discount;
  return {
    gross,
    discount,
    subtotal,
    vat: subtotal * 0.05,
    total: subtotal * 1.05,
  };
};
const cx = (...v: Array<string | false | undefined>) =>
  v.filter(Boolean).join(" ");
const inputClass =
  "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:h-10";
const primary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 md:h-10";
const secondary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 md:h-10";
const blankItem = (): Requirement => ({
  id: `R-${Date.now()}-${Math.random()}`,
  vin: "",
  item: "",
  partNo: "",
  qty: 1,
  remarks: "",
  pricing: blankPricing(),
});
const nextInquiryId = (items: Inquiry[]) => {
  const d = new Date();
  const prefix = `${String.fromCharCode(65 + d.getMonth())}${String(d.getFullYear()).slice(-2)}`;
  const seq =
    Math.max(
      0,
      ...items
        .filter((i) => i.id.startsWith(prefix))
        .map((i) => Number(i.id.split("-")[1]) || 0),
    ) + 1;
  return `${prefix}-${String(seq).padStart(3, "0")}`;
};

function StatusBadge({ value }: { value: string }) {
  const tone = [
    "Won",
    "Completed",
    "Converted",
    "Price Available",
    "Accepted",
  ].includes(value)
    ? "bg-green-50 text-green-700"
    : ["Lost", "Rejected", "Price Not Available"].includes(value)
      ? "bg-red-50 text-red-700"
      : ["Under Review", "Follow-up", "Awaiting Customer"].includes(value)
        ? "bg-amber-50 text-amber-700"
        : ["Negotiation"].includes(value)
          ? "bg-violet-50 text-violet-700"
          : "bg-blue-50 text-blue-700";
  return (
    <span
      className={cx(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ring-current/10",
        tone,
      )}
    >
      {value}
    </span>
  );
}
function Avatar({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <span
      className={cx(
        "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold",
        dark ? "bg-white/10 text-white" : "bg-blue-50 text-blue-700",
      )}
    >
      {name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}
function Modal({
  title,
  subtitle,
  children,
  onClose,
  wide,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeCallbackRef = useRef(onClose);
  useEffect(() => { closeCallbackRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]') || []).filter(el => el.getClientRects().length);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeCallbackRef.current(); }
      if (event.key === 'Tab') { const controls = focusable(), first = controls[0], last = controls[controls.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } }
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-3"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cx(
          "max-h-[94dvh] w-full overflow-hidden rounded-xl bg-white shadow-2xl",
          wide ? "max-w-6xl" : "max-w-2xl",
        )}
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 id="modal-title" className="text-lg font-bold">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </header>
        <div className="max-h-[calc(94dvh-76px)] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
function PageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
function DataTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <p className={mobileStyles.tableCue}>Swipe the table to see all columns.</p>
      <div className="overflow-x-auto" role="region" aria-label="Scrollable records" tabIndex={0}>
        <table className="w-full min-w-[900px] text-left text-[13px]">
          {children}
        </table>
      </div>
    </div>
  );
}
function TH({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}
function TD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td
      className={cx(
        "border-b border-slate-100 px-4 py-3 align-middle text-slate-600",
        className,
      )}
    >
      {children}
    </td>
  );
}

export default function AutoPartsCRM() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [leads, setLeads] = useState(seedLeads);
  const [customers, setCustomers] = useState(seedCustomers);
  const [inquiries, setInquiries] = useState(seedInquiries);
  const [quotes, setQuotes] = useState(seedQuotes);
  const [followups, setFollowups] = useState(seedFollowups);
  const [events, setEvents] = useState(seedEvents);
  const navigationRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobileMenu) return;
    const previous = document.activeElement as HTMLElement;
    const controls = () => Array.from(navigationRef.current?.querySelectorAll<HTMLElement>('button') || []).filter(el => el.getClientRects().length);
    controls()[0]?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); setMobileMenu(false); } if (event.key === 'Tab') { const buttons = controls(), first = buttons[0], last = buttons[buttons.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } } };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [mobileMenu]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [modal, setModal] = useState<
    "lead" | "inquiry" | "customer" | "followup" | "close" | "reset" | null
  >(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [queue, setQueue] = useState<"LMV" | "HMV">("LMV");
  const [closeMode, setCloseMode] = useState<"won" | "lost">("won");
  const [leadForm, setLeadForm] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    location: "Dubai",
    source: "Referral",
    notes: "",
    branch: "Dubai",
    salesperson: currentUser,
  });
  const [inquiryForm, setInquiryForm] = useState<InquiryForm>({
    customerId: "CUS-0042",
    type: "LMV",
    items: [blankItem()],
  });
  useEffect(() => {
    try {
      const raw = localStorage.getItem("autoparts-crm-demo-v5");
      if (raw) {
        const d = JSON.parse(raw);
        setLeads(d.leads || seedLeads);
        setCustomers(d.customers || seedCustomers);
        setInquiries(d.inquiries || seedInquiries);
        setQuotes(d.quotes || seedQuotes);
        setFollowups(d.followups || seedFollowups);
        setEvents(d.events || seedEvents);
      }
    } catch { setStorageError("Saved demo records could not be read. Fresh fictional samples are shown."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) { try {
      localStorage.setItem(
        "autoparts-crm-demo-v5",
        JSON.stringify({
          leads,
          customers,
          inquiries,
          quotes,
          followups,
          events,
        }),
      );
    } catch { setStorageError("Browser storage is unavailable or full. Changes work for this session; reload may restore older samples."); } }
  }, [ready, leads, customers, inquiries, quotes, followups, events]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  const notify = (s: string) => setToast(s);
  const addEvent = (event: Omit<Event, "id" | "at">) =>
    setEvents((v) => [
      { ...event, id: `EV-${Date.now()}`, at: "Just now" },
      ...v,
    ]);
  const go = (p: Page) => {
    setPage(p);
    setMobileMenu(false);
    setSelectedCustomer(null);
    setSelectedInquiry(null);
    setSelectedQuote(null);
    setSearch("");
  };
  const createLead = (e: FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      setLeads((v) =>
        v.map((x) => (x.id === editingLead.id ? { ...x, ...leadForm } : x)),
      );
      addEvent({
        entity: "lead",
        entityId: editingLead.id,
        customerId: editingLead.customerId,
        text: `${leadForm.company} lead updated`,
      });
      setEditingLead(null);
      setModal(null);
      notify("Lead changes saved");
      return;
    }
    const lead: Lead = {
      ...leadForm,
      id: `LD-${String(129 + leads.length).padStart(4, "0")}`,
      status: "New",
    };
    setLeads((v) => [lead, ...v]);
    addEvent({
      entity: "lead",
      entityId: lead.id,
      text: `${lead.company} lead created`,
    });
    setModal(null);
    notify("Lead saved");
  };
  const convertLead = (lead: Lead, openInquiry = false) => {
    let customer = customers.find(
      (c) =>
        c.id === lead.customerId ||
        c.company.toLowerCase() === lead.company.toLowerCase(),
    );
    if (!customer) {
      customer = {
        id: `CUS-${String(43 + customers.length).padStart(4, "0")}`,
        company: lead.company,
        type: "Garage",
        contact: lead.contact,
        mobile: lead.phone,
        whatsapp: lead.phone,
        email: lead.email,
        location: lead.location,
        country: "UAE",
        fleetSize: 0,
        branch: lead.branch,
        salesperson: lead.salesperson,
        status: "Active",
        created: today,
        remarks: lead.notes || "Created from lead",
      };
      setCustomers((v) => [customer!, ...v]);
    }
    setLeads((v) =>
      v.map((x) =>
        x.id === lead.id
          ? { ...x, status: "Converted", customerId: customer!.id }
          : x,
      ),
    );
    addEvent({
      entity: "customer",
      entityId: customer.id,
      customerId: customer.id,
      text: `${lead.id} converted to customer`,
    });
    notify(
      customer.id === lead.customerId
        ? "Customer already linked"
        : "Lead converted to customer",
    );
    if (openInquiry) {
      setInquiryForm({
        customerId: customer.id,
        type: "LMV",
        items: [blankItem()],
      });
      setModal("inquiry");
    }
  };
  const createCustomer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const customer: Customer = {
      id: `CUS-${String(43 + customers.length).padStart(4, "0")}`,
      company: String(f.get("company")),
      type: String(f.get("type")) as CustomerType,
      contact: String(f.get("contact")),
      mobile: String(f.get("mobile")),
      whatsapp: String(f.get("whatsapp")),
      email: String(f.get("email")),
      location: String(f.get("location")),
      country: "UAE",
      fleetSize: Number(f.get("fleet")),
      branch: String(f.get("branch")),
      salesperson: String(f.get("salesperson")),
      status: "Active",
      created: today,
      remarks: String(f.get("remarks")),
    };
    setCustomers((v) => [customer, ...v]);
    setInquiryForm((v) => ({ ...v, customerId: customer.id }));
    setModal("inquiry");
    notify("Customer created and selected");
  };
  const createInquiry = (e: FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === inquiryForm.customerId)!;
    const inquiry: Inquiry = {
      id: nextInquiryId(inquiries),
      activityType: "New Inquiry",
      customerId: customer.id,
      customer: customer.company,
      type: inquiryForm.type,
      branch: customer.branch,
      salesperson: customer.salesperson,
      createdBy: `${currentUser} – Sales Executive`,
      date: today,
      status: "New Inquiry",
      assigned: inquiryForm.type === "LMV" ? "Mohammed Ali" : "Fatima Noor",
      items: inquiryForm.items.map((i) => ({ ...i, pricing: blankPricing() })),
    };
    setInquiries((v) => [inquiry, ...v]);
    addEvent({
      entity: "inquiry",
      entityId: inquiry.id,
      customerId: customer.id,
      text: `${inquiry.id} routed to ${inquiry.type} Price Desk`,
    });
    setModal(null);
    setSelectedInquiry(inquiry);
    setPage("inquiries");
    setInquiryForm({
      customerId: customer.id,
      type: "LMV",
      items: [blankItem()],
    });
    notify(`${inquiry.id} created and routed to ${inquiry.type}`);
  };
  const updatePricing = (
    inquiryId: string,
    itemId: string,
    key: keyof PricingResponse,
    value: string | number,
  ) => {
    const updater = (i: Inquiry) =>
      i.id !== inquiryId
        ? i
        : {
            ...i,
            status: "Pricing" as PriceStatus,
            items: i.items.map((x) =>
              x.id === itemId
                ? { ...x, pricing: { ...x.pricing, [key]: value } }
                : x,
            ),
          };
    setInquiries((v) => v.map(updater));
    setSelectedInquiry((v) => (v ? updater(v) : v));
  };
  const completePricing = (inquiry: Inquiry) => {
    const available = inquiry.items.filter((i) => i.pricing.availableQty > 0);
    if (available.some((i) => i.pricing.sellingPrice <= 0))
      return notify("Selling price is required for available items");
    const status: PriceStatus =
      available.length === 0
        ? "Price Not Available"
        : available.length < inquiry.items.length ||
            available.some((i) => i.pricing.availableQty < i.qty)
          ? "Partially Available"
          : "Completed";
    const updated = { ...inquiry, status };
    setInquiries((v) => v.map((i) => (i.id === inquiry.id ? updated : i)));
    setSelectedInquiry(updated);
    addEvent({
      entity: "inquiry",
      entityId: inquiry.id,
      customerId: inquiry.customerId,
      text: `Pricing response completed: ${status}`,
    });
    notify("Pricing response saved");
  };
  const generateQuote = (inquiry: Inquiry) => {
    const existing = quotes.find((q) => q.inquiryId === inquiry.id);
    if (existing) {
      setSelectedQuote(existing);
      setPage("quotations");
      return;
    }
    const customer = customers.find((c) => c.id === inquiry.customerId)!;
    const items = inquiry.items
      .filter((i) => i.pricing.availableQty > 0 && i.pricing.sellingPrice > 0)
      .map((i) => ({
        id: `Q-${i.id}`,
        item: i.item,
        partNo: i.partNo,
        requestedQty: i.qty,
        availableQty: i.pricing.availableQty,
        qty: Math.min(i.qty, i.pricing.availableQty),
        unitPrice: i.pricing.sellingPrice,
        discount: 0,
      }));
    if (!items.length)
      return notify("Complete pricing before generating a quotation");
    const q: Quotation = {
      id: `QT-2026-${String(49 + quotes.length).padStart(4, "0")}`,
      inquiryId: inquiry.id,
      customerId: inquiry.customerId,
      customer: inquiry.customer,
      contact: customer.contact,
      items,
      revision: 0,
      versions: [],
      status: "Draft",
      salesperson: inquiry.salesperson,
      branch: inquiry.branch,
      created: today,
      validity: "7 days",
      delivery: "As per item availability",
      payment: "Cash on delivery",
      notes: "Subject to stock availability.",
    };
    setQuotes((v) => [q, ...v]);
    setSelectedQuote(q);
    setPage("quotations");
    addEvent({
      entity: "quote",
      entityId: q.id,
      customerId: q.customerId,
      text: `${q.id} generated from ${inquiry.id}`,
    });
    notify("Quotation generated");
  };
  const setQuote = (q: Quotation) => {
    setQuotes((v) => v.map((x) => (x.id === q.id ? q : x)));
    setSelectedQuote(q);
  };
  const revise = (q: Quotation) => {
    const updated = {
      ...q,
      versions: [
        ...q.versions,
        { revision: q.revision, items: q.items, savedAt: today },
      ],
      revision: q.revision + 1,
      status: "Revised" as QuoteStatus,
    };
    setQuote(updated);
    addEvent({
      entity: "quote",
      entityId: q.id,
      customerId: q.customerId,
      text: `Revision ${updated.revision} created; previous version retained`,
    });
    notify(`Revision ${updated.revision} created`);
  };
  const sendQuote = (q: Quotation) => {
    const updated = { ...q, status: "Sent" as QuoteStatus };
    setQuote(updated);
    if (!followups.some((f) => f.quotationId === q.id))
      setFollowups((v) => [
        {
          id: `FU-${189 + v.length}`,
          customerId: q.customerId,
          customer: q.customer,
          inquiryId: q.inquiryId,
          quotationId: q.id,
          salesperson: q.salesperson,
          followupDate: today,
          nextFollowup: "21 Sep, 10:00 AM",
          status: "Pending",
          note: "Follow up on sent quotation.",
        },
        ...v,
      ]);
    notify("Quotation sent and follow-up created");
  };
  const closeQuote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedQuote) return;
    const f = new FormData(e.currentTarget);
    const reason = String(f.get("reason") || "");
    if (closeMode === "lost" && !reason)
      return notify("Lost reason is required");
    const updated: Quotation = {
      ...selectedQuote,
      status: closeMode === "won" ? "Won" : "Lost",
      close: {
        date: today,
        value: closeMode === "won" ? Number(f.get("value")) : undefined,
        orderReference: String(f.get("order") || ""),
        reason: closeMode === "lost" ? reason : undefined,
        otherReason: String(f.get("other") || ""),
        remarks: String(f.get("remarks") || ""),
      },
    };
    setQuote(updated);
    addEvent({
      entity: "quote",
      entityId: updated.id,
      customerId: updated.customerId,
      text: `${updated.id} marked ${updated.status}${reason ? ` — ${reason}` : ""}`,
    });
    setModal(null);
    notify(`Quotation marked ${updated.status}`);
  };
  const scheduleFollowup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const q = quotes.find((x) => x.id === String(f.get("quote")))!;
    const item: FollowUp = {
      id: `FU-${189 + followups.length}`,
      customerId: q.customerId,
      customer: q.customer,
      inquiryId: q.inquiryId,
      quotationId: q.id,
      salesperson: String(f.get("salesperson")),
      followupDate: today,
      nextFollowup: String(f.get("date")),
      status: "Pending",
      note: String(f.get("note")),
    };
    setFollowups((v) => [item, ...v]);
    setModal(null);
    notify("Follow-up scheduled");
  };
  const reset = () => {
    setLeads(seedLeads);
    setCustomers(seedCustomers);
    setInquiries(seedInquiries);
    setQuotes(seedQuotes);
    setFollowups(seedFollowups);
    setEvents(seedEvents);
    try { localStorage.removeItem("autoparts-crm-demo-v5"); } catch { setStorageError("Browser storage is unavailable. Samples are restored for this session; saved records may return after reload."); }
    setModal(null);
    go("dashboard");
    notify("Demo data restored");
  };

  const filteredLeads = leads.filter((l) =>
    `${l.id} ${l.company} ${l.contact}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const filteredCustomers = customers.filter((c) =>
    `${c.id} ${c.company} ${c.contact}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const currentLabel = navItems.find((n) => n.id === page)?.label || "Settings";
  return (
    <div className={cx(mobileStyles.root, "min-h-screen bg-[#f6f7f9] font-sans text-slate-900")}>
      <aside
        ref={navigationRef}
        role={mobileMenu ? "dialog" : undefined}
        aria-modal={mobileMenu ? "true" : undefined}
        aria-label="Auto Parts navigation"
        className={cx(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-[#17202b] text-white transition-all",
          sidebarOpen ? "w-[244px]" : "w-[72px]",
          mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-[72px] items-center border-b border-white/10 px-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600">
            <Wrench size={19} />
          </span>
          {sidebarOpen && (
            <div className="ml-3">
              <div className="text-sm font-bold">AUTO PARTS CRM</div>
              <div className="text-[10px] text-slate-400">
                Sales & pricing workspace
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="ml-auto hidden p-1.5 text-slate-400 lg:block"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <PanelLeftClose size={17} />
            ) : (
              <PanelLeftOpen size={17} />
            )}
          </button>
        </div>
        <nav aria-label="Auto Parts modules" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              aria-label={label}
              aria-current={page === id ? "page" : undefined}
              onClick={() => go(id)}
              className={cx(
                "flex h-10 w-full items-center rounded-md text-slate-300 hover:bg-white/5 hover:text-white",
                page === id && "bg-blue-600 text-white",
                sidebarOpen ? "px-3" : "justify-center",
              )}
            >
              <Icon size={17} />
              {sidebarOpen && (
                <span className="ml-3 text-[13px] font-medium">{label}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => go("settings")}
            className={cx(
              "flex h-10 w-full items-center rounded-md text-slate-300",
              sidebarOpen ? "px-3" : "justify-center",
            )}
          >
            <Settings size={17} />
            {sidebarOpen && <span className="ml-3 text-[13px]">Settings</span>}
          </button>
          {sidebarOpen && (
            <div className="mt-2 flex items-center rounded-lg bg-white/5 p-2">
              <Avatar name={currentUser} dark />
              <div className="ml-2 text-xs">
                <b>{currentUser}</b>
                <div className="text-[10px] text-slate-400">
                  Sales Executive
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
      {mobileMenu && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
          onClick={() => setMobileMenu(false)}
          aria-label="Close navigation"
        />
      )}
      <div
        className={cx(
          "transition-all",
          sidebarOpen ? "lg:pl-[244px]" : "lg:pl-[72px]",
        )}
      >
        <header className="sticky top-0 z-20 flex h-[72px] items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
            aria-expanded={mobileMenu}
            className="mr-3 rounded-md border border-slate-200 p-2 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <div className="text-[11px] text-slate-400">
              Workspace / {currentLabel}
            </div>
            <div className="text-sm font-semibold">{currentLabel}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700 sm:block">
              ● Demo Environment
            </span>
            <button
              onClick={() => notify("No new alerts")}
              className="rounded-md border border-slate-200 p-2 text-slate-500"
              aria-label="Alerts"
            >
              <Bell size={17} />
            </button>
            <Avatar name={currentUser} />
          </div>
        </header>
        <p className={mobileStyles.disclosure}>Fictional demo records · Changes stay in this browser · No real sends</p>
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {storageError && <p role="alert" className={mobileStyles.storageError}>{storageError}</p>}
          {page === "dashboard" && (
            <Dashboard
              leads={leads}
              inquiries={inquiries}
              quotes={quotes}
              followups={followups}
              onGo={go}
            />
          )}
          {page === "leads" && (
            <>
              <PageTitle
                title="Leads"
                description="Capture, qualify and convert trade opportunities."
                action={
                  <button
                    className={primary}
                    onClick={() => {
                      setEditingLead(null);
                      setLeadForm({
                        company: "",
                        contact: "",
                        phone: "",
                        email: "",
                        location: "Dubai",
                        source: "Referral",
                        notes: "",
                        branch: "Dubai",
                        salesperson: currentUser,
                      });
                      setModal("lead");
                    }}
                  >
                    <Plus size={16} />
                    New Lead
                  </button>
                }
              />
              <SearchBox value={search} onChange={setSearch} />
              <div className="space-y-3 md:hidden">
                {filteredLeads.map((l) => (
                  <article
                    key={l.id}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-bold text-slate-950">
                          {l.company}
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                          {l.contact} · {l.phone}
                        </p>
                      </div>
                      <StatusBadge value={l.status} />
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <span>{l.salesperson}</span>
                      <span>{l.branch}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        className={cx(primary, "flex-1")}
                        onClick={() =>
                          notify(
                            `${l.id} · ${l.company} · ${l.contact} · ${l.source}`,
                          )
                        }
                      >
                        View
                      </button>
                      <details className="relative">
                        <summary
                          aria-label={`Actions for ${l.company}`}
                          className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-md border border-slate-300 bg-white text-slate-600"
                        >
                          <MoreVertical size={18} />
                        </summary>
                        <div className="absolute bottom-12 right-0 z-10 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                          <button
                            className="block min-h-11 w-full px-4 text-left text-sm hover:bg-slate-50"
                            onClick={() => {
                              setEditingLead(l);
                              setLeadForm({
                                company: l.company,
                                contact: l.contact,
                                phone: l.phone,
                                email: l.email,
                                location: l.location,
                                source: l.source,
                                notes: l.notes || "",
                                branch: l.branch,
                                salesperson: l.salesperson,
                              });
                              setModal("lead");
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="block min-h-11 w-full px-4 text-left text-sm hover:bg-slate-50"
                            onClick={() => convertLead(l)}
                          >
                            {l.status === "Converted"
                              ? "View linked customer"
                              : "Convert to customer"}
                          </button>
                          <button
                            className="block min-h-11 w-full px-4 text-left text-sm hover:bg-slate-50"
                            onClick={() => convertLead(l, true)}
                          >
                            Create inquiry
                          </button>
                          <button
                            className="block min-h-11 w-full px-4 text-left text-sm hover:bg-slate-50"
                            onClick={() =>
                              notify(
                                events
                                  .filter((e) => e.entityId === l.id)
                                  .map((e) => e.text)
                                  .join(" · ") || "No history yet",
                              )
                            }
                          >
                            View history
                          </button>
                        </div>
                      </details>
                    </div>
                  </article>
                ))}
              </div>
              <div className="hidden md:block">
                <DataTable>
                  <thead>
                    <tr>
                      <TH>Lead</TH>
                      <TH>Company</TH>
                      <TH>Contact</TH>
                      <TH>Branch</TH>
                      <TH>Source</TH>
                      <TH>Salesperson</TH>
                      <TH>Status</TH>
                      <TH>Actions</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <TD className="font-semibold text-blue-700">{l.id}</TD>
                        <TD className="font-semibold text-slate-900">
                          {l.company}
                        </TD>
                        <TD>
                          {l.contact}
                          <div className="text-[11px] text-slate-400">
                            {l.phone}
                          </div>
                        </TD>
                        <TD>{l.branch}</TD>
                        <TD>{l.source}</TD>
                        <TD>{l.salesperson}</TD>
                        <TD>
                          <select
                            aria-label={`Status for ${l.company}`}
                            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs"
                            value={l.status}
                            onChange={(e) =>
                              setLeads((v) =>
                                v.map((x) =>
                                  x.id === l.id
                                    ? {
                                        ...x,
                                        status: e.target.value as LeadStatus,
                                      }
                                    : x,
                                ),
                              )
                            }
                          >
                            {[
                              "New",
                              "Contacted",
                              "Qualified",
                              "Converted",
                              "Not Interested",
                              "Lost",
                            ].map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </TD>
                        <TD>
                          <div className="flex flex-wrap gap-2">
                            <button
                              className="text-xs font-semibold text-blue-700"
                              onClick={() => convertLead(l)}
                            >
                              {l.status === "Converted" ? "Linked" : "Convert"}
                            </button>
                            <button
                              className="text-xs font-semibold text-blue-700"
                              onClick={() => convertLead(l, true)}
                            >
                              Create inquiry
                            </button>
                            <button
                              className="text-xs font-semibold text-slate-500"
                              onClick={() => {
                                setEditingLead(l);
                                setLeadForm({
                                  company: l.company,
                                  contact: l.contact,
                                  phone: l.phone,
                                  email: l.email,
                                  location: l.location,
                                  source: l.source,
                                  notes: l.notes || "",
                                  branch: l.branch,
                                  salesperson: l.salesperson,
                                });
                                setModal("lead");
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-xs font-semibold text-slate-500"
                              onClick={() =>
                                notify(
                                  events
                                    .filter((e) => e.entityId === l.id)
                                    .map((e) => e.text)
                                    .join(" · ") || "No history yet",
                                )
                              }
                            >
                              History
                            </button>
                          </div>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </DataTable>
              </div>
            </>
          )}
          {page === "customers" &&
            (selectedCustomer ? (
              <CustomerDetail
                customer={selectedCustomer}
                inquiries={inquiries}
                quotes={quotes}
                followups={followups}
                events={events}
                onBack={() => setSelectedCustomer(null)}
                onCreate={() => {
                  setInquiryForm({
                    customerId: selectedCustomer.id,
                    type: "LMV",
                    items: [blankItem()],
                  });
                  setModal("inquiry");
                }}
              />
            ) : (
              <>
                <PageTitle
                  title="Customers"
                  description="Central customer master and complete commercial history."
                  action={
                    <button
                      className={primary}
                      onClick={() => setModal("customer")}
                    >
                      <Plus size={16} />
                      New Customer
                    </button>
                  }
                />
                <SearchBox value={search} onChange={setSearch} />
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCustomers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300 sm:p-5"
                    >
                      <div className="flex">
                        <span className="grid h-10 w-10 place-items-center rounded-md bg-slate-100">
                          <Building2 size={19} />
                        </span>
                        <div className="ml-3 min-w-0">
                          <b className="block truncate text-sm">{c.company}</b>
                          <span className="text-xs text-slate-500">
                            {c.id} · {c.type}
                          </span>
                        </div>
                        <ChevronRight
                          className="ml-auto text-slate-300"
                          size={17}
                        />
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-3 text-xs">
                        <div>
                          <span className="font-semibold text-slate-700">
                            {c.contact}
                          </span>
                          <span className="mt-0.5 block text-slate-500">
                            {c.mobile}
                          </span>
                        </div>
                        <StatusBadge value={c.status} />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs">
                        <span>
                          <b className="block text-slate-900">{c.branch}</b>
                          <span className="text-slate-400">Branch</span>
                        </span>
                        <span>
                          <b className="block text-slate-900">
                            {c.salesperson}
                          </b>
                          <span className="text-slate-400">Salesperson</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ))}
          {page === "inquiries" &&
            (selectedInquiry ? (
              <InquiryDetail
                inquiry={selectedInquiry}
                events={events}
                onBack={() => setSelectedInquiry(null)}
                onPrice={() => {
                  setQueue(selectedInquiry.type);
                  setPage("pricing");
                }}
                onQuote={() => generateQuote(selectedInquiry)}
              />
            ) : (
              <>
                <PageTitle
                  title="Inquiries"
                  description="Customer requirements routed to the appropriate Price Desk."
                  action={
                    <button
                      className={primary}
                      onClick={() => setModal("inquiry")}
                    >
                      <Plus size={16} />
                      New Inquiry
                    </button>
                  }
                />
                <InquiryTable items={inquiries} onOpen={setSelectedInquiry} />
              </>
            ))}
          {page === "pricing" &&
            (selectedInquiry ? (
              <PriceDeskDetail
                inquiry={selectedInquiry}
                customer={customers.find(
                  (c) => c.id === selectedInquiry.customerId,
                )}
                onBack={() => setSelectedInquiry(null)}
                onUpdate={updatePricing}
                onComplete={() => completePricing(selectedInquiry)}
                onQuote={() => generateQuote(selectedInquiry)}
              />
            ) : (
              <>
                <PageTitle
                  title="Price Desk"
                  description="Review incoming requirements and respond without changing the original request."
                />
                <div className="mb-4 grid grid-cols-2 gap-2 md:flex">
                  {(["LMV", "HMV"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setQueue(t)}
                      className={cx(
                        secondary,
                        queue === t &&
                          "border-blue-600 bg-blue-50 text-blue-700",
                      )}
                    >
                      {t}
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px]">
                        {inquiries.filter((i) => i.type === t).length}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="space-y-3 md:hidden">
                  {inquiries
                    .filter((i) => i.type === queue)
                    .map((i) => (
                      <button
                        key={i.id}
                        onClick={() => setSelectedInquiry(i)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left active:bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-sm font-bold text-blue-700">
                            {i.id}
                          </span>
                          <StatusBadge value={i.status} />
                        </div>
                        <h2 className="mt-3 text-sm font-bold leading-5 text-slate-950">
                          {i.customer}
                        </h2>
                        <p className="mt-2 text-xs text-slate-500">
                          {i.type} · {i.branch}
                        </p>
                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                          <span className="truncate pr-3">{i.salesperson}</span>
                          <span className="shrink-0">{i.date}</span>
                        </div>
                        <span className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue-700">
                          Open Inquiry{" "}
                          <ChevronRight className="ml-1" size={15} />
                        </span>
                      </button>
                    ))}
                </div>
                <div className="hidden md:block">
                  <DataTable>
                    <thead>
                      <tr>
                        <TH>Inquiry</TH>
                        <TH>Customer</TH>
                        <TH>Branch</TH>
                        <TH>Salesperson</TH>
                        <TH>Type</TH>
                        <TH>Date</TH>
                        <TH>Status</TH>
                        <TH>Action</TH>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries
                        .filter((i) => i.type === queue)
                        .map((i) => (
                          <tr key={i.id}>
                            <TD className="font-semibold text-blue-700">
                              {i.id}
                            </TD>
                            <TD className="font-semibold text-slate-900">
                              {i.customer}
                            </TD>
                            <TD>{i.branch}</TD>
                            <TD>{i.salesperson}</TD>
                            <TD>{i.type}</TD>
                            <TD>{i.date}</TD>
                            <TD>
                              <StatusBadge value={i.status} />
                            </TD>
                            <TD>
                              <button
                                className="text-xs font-semibold text-blue-700"
                                onClick={() => setSelectedInquiry(i)}
                              >
                                Open
                              </button>
                            </TD>
                          </tr>
                        ))}
                    </tbody>
                  </DataTable>
                </div>
              </>
            ))}
          {page === "quotations" &&
            (selectedQuote ? (
              <QuotationView
                quote={selectedQuote}
                onBack={() => setSelectedQuote(null)}
                onChange={setQuote}
                onSend={() => sendQuote(selectedQuote)}
                onFollowup={() => setModal("followup")}
                onRevise={() => revise(selectedQuote)}
                onClose={(mode) => {
                  setCloseMode(mode);
                  setModal("close");
                }}
                onPdf={() => notify("Quotation PDF prepared for presentation")}
              />
            ) : (
              <>
                <PageTitle
                  title="Quotations"
                  description="Commercial offers generated from approved pricing responses."
                />
                <div className="grid gap-3 lg:grid-cols-2">
                  {quotes.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300 sm:p-5"
                    >
                      <div className="flex justify-between">
                        <div>
                          <b>{q.id}</b>
                          <div className="mt-1 text-sm text-slate-500">
                            {q.customer}
                          </div>
                        </div>
                        <StatusBadge value={q.status} />
                      </div>
                      <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
                        <div>
                          <b className="text-lg">
                            {money(quoteTotals(q).total)}
                          </b>
                          <span className="mt-1 block text-xs text-slate-500">
                            {q.created}
                          </span>
                        </div>
                        <span className="inline-flex min-h-11 items-center text-xs font-semibold text-blue-700 md:min-h-0">
                          View Quotation{" "}
                          <ChevronRight className="ml-1" size={14} />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ))}
          {page === "followups" && (
            <>
              <PageTitle
                title="Follow-ups"
                description="Customer actions linked to inquiries and quotations."
                action={
                  <button
                    className={primary}
                    onClick={() => setModal("followup")}
                  >
                    <Plus size={16} />
                    Schedule
                  </button>
                }
              />
              <div className="space-y-3 md:hidden">
                {followups.map((f) => (
                  <article
                    key={f.id}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-sm font-bold text-slate-950">
                        {f.customer}
                      </h2>
                      <StatusBadge value={f.status} />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {f.inquiryId} · {f.quotationId}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-xs">
                      <div>
                        <span className="block text-slate-400">
                          Next follow-up
                        </span>
                        <b className="mt-1 block text-slate-700">
                          {f.nextFollowup}
                        </b>
                      </div>
                      <div>
                        <span className="block text-slate-400">
                          Salesperson
                        </span>
                        <b className="mt-1 block text-slate-700">
                          {f.salesperson}
                        </b>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-600">
                      {f.note}
                    </p>
                  </article>
                ))}
              </div>
              <div className="hidden md:block">
                <DataTable>
                  <thead>
                    <tr>
                      <TH>Customer</TH>
                      <TH>Inquiry</TH>
                      <TH>Quotation</TH>
                      <TH>Salesperson</TH>
                      <TH>Last Contact</TH>
                      <TH>Next Follow-up</TH>
                      <TH>Status</TH>
                      <TH>Notes</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {followups.map((f) => (
                      <tr key={f.id}>
                        <TD className="font-semibold text-slate-900">
                          {f.customer}
                        </TD>
                        <TD>{f.inquiryId}</TD>
                        <TD>{f.quotationId}</TD>
                        <TD>{f.salesperson}</TD>
                        <TD>{f.followupDate}</TD>
                        <TD>{f.nextFollowup}</TD>
                        <TD>
                          <StatusBadge value={f.status} />
                        </TD>
                        <TD>{f.note}</TD>
                      </tr>
                    ))}
                  </tbody>
                </DataTable>
              </div>
            </>
          )}
          {page === "pipeline" && (
            <Pipeline leads={leads} inquiries={inquiries} quotes={quotes} />
          )}{" "}
          {page === "settings" && (
            <SettingsPage
              onReset={() => setModal("reset")}
              onSaved={() => notify("Preferences saved")}
            />
          )}
        </main>
      </div>
      {modal === "lead" && (
        <LeadModal
          editing={Boolean(editingLead)}
          form={leadForm}
          setForm={setLeadForm}
          onSubmit={createLead}
          onClose={() => {
            setEditingLead(null);
            setModal(null);
          }}
        />
      )}{" "}
      {modal === "customer" && (
        <CustomerModal
          onSubmit={createCustomer}
          onClose={() => setModal(null)}
        />
      )}{" "}
      {modal === "inquiry" && (
        <InquiryModal
          customers={customers}
          inquiries={inquiries}
          form={inquiryForm}
          setForm={setInquiryForm}
          onNewCustomer={() => setModal("customer")}
          onSubmit={createInquiry}
          onClose={() => setModal(null)}
        />
      )}{" "}
      {modal === "followup" && (
        <FollowupModal
          quotes={quotes}
          selected={selectedQuote}
          onSubmit={scheduleFollowup}
          onClose={() => setModal(null)}
        />
      )}{" "}
      {modal === "close" && selectedQuote && (
        <CloseModal
          quote={selectedQuote}
          mode={closeMode}
          onSubmit={closeQuote}
          onClose={() => setModal(null)}
        />
      )}{" "}
      {modal === "reset" && (
        <Modal
          title="Restore demo data?"
          subtitle="This replaces local changes with the prepared presentation scenario."
          onClose={() => setModal(null)}
        >
          <div className="flex justify-end gap-2">
            <button className={secondary} onClick={() => setModal(null)}>
              Cancel
            </button>
            <button className={primary} onClick={reset}>
              <RefreshCcw size={16} />
              Restore
            </button>
          </div>
        </Modal>
      )}
      <nav className={mobileStyles.mobileNav} aria-label="Mobile Auto Parts navigation">
        {navItems.filter(item => ["dashboard", "inquiries", "quotations", "followups"].includes(item.id)).map(({id, label, icon: Icon}) => <button key={id} aria-label={label} aria-current={page === id ? "page" : undefined} onClick={() => go(id)}><Icon size={20}/><span>{id === "dashboard" ? "Home" : id === "quotations" ? "Quotes" : label}</span></button>)}
        <button aria-label="More navigation" aria-expanded={mobileMenu} onClick={() => { setSidebarOpen(true); setMobileMenu(true); }}><MoreHorizontal size={20}/><span>More</span></button>
      </nav>
      {toast && (
        <div
          role="status"
          className={cx(mobileStyles.toast, "fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl")}
        >
          <CheckCircle2 size={17} className="text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative mb-4 block max-w-sm">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={16}
      />
      <input
        className={cx(inputClass, "pl-9")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search records..."
        aria-label="Search records"
      />
    </label>
  );
}

function Dashboard({
  leads,
  inquiries,
  quotes,
  followups,
  onGo,
}: {
  leads: Lead[];
  inquiries: Inquiry[];
  quotes: Quotation[];
  followups: FollowUp[];
  onGo: (p: Page) => void;
}) {
  const openQuotes = quotes.filter(
    (q) => !["Won", "Lost", "Rejected", "Expired"].includes(q.status),
  );
  const won = quotes.filter((q) => q.status === "Won");
  const lost = quotes.filter((q) => q.status === "Lost");
  const wonValue = won.reduce(
    (s, q) => s + (q.close?.value ?? quoteTotals(q).total),
    0,
  );
  const lostValue = lost.reduce((s, q) => s + quoteTotals(q).total, 0);
  const closed = won.length + lost.length;
  const conversion = closed ? (won.length / closed) * 100 : 0;
  const kpis = [
    {
      label: "Total Leads",
      value: String(leads.length),
      page: "leads" as Page,
    },
    {
      label: "New Inquiries",
      value: String(inquiries.filter((i) => i.status === "New Inquiry").length),
      page: "inquiries" as Page,
    },
    {
      label: "Open Quotations",
      value: String(openQuotes.length),
      page: "quotations" as Page,
    },
    {
      label: "Quotation Value",
      value: money(openQuotes.reduce((s, q) => s + quoteTotals(q).total, 0)),
      page: "quotations" as Page,
    },
    { label: "Won Value", value: money(wonValue), page: "pipeline" as Page },
    { label: "Lost Value", value: money(lostValue), page: "pipeline" as Page },
    {
      label: "Conversion",
      value: `${conversion.toFixed(1)}%`,
      page: "pipeline" as Page,
    },
    {
      label: "Pending Follow-ups",
      value: String(followups.filter((f) => f.status !== "Completed").length),
      page: "followups" as Page,
    },
  ];
  const bySource = Array.from(new Set(leads.map((l) => l.source))).map((x) => ({
    label: x,
    value: leads.filter((l) => l.source === x).length,
  }));
  const byType = (["LMV", "HMV"] as const).map((x) => ({
    label: x,
    value: inquiries.filter((i) => i.type === x).length,
  }));
  const sales = salespeople.map((name) => ({
    name,
    quotes: quotes.filter((q) => q.salesperson === name).length,
    won: quotes
      .filter((q) => q.salesperson === name && q.status === "Won")
      .reduce((s, q) => s + quoteTotals(q).total, 0),
    open: quotes.filter(
      (q) => q.salesperson === name && !["Won", "Lost"].includes(q.status),
    ).length,
  }));
  return (
    <>
      <PageTitle
        title="Management dashboard"
        description="Live performance across sales, pricing and customer follow-up."
        action={
          <button className={primary} onClick={() => onGo("inquiries")}>
            <Plus size={16} />
            New Inquiry
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <button
            key={k.label}
            onClick={() => onGo(k.page)}
            className="min-h-[92px] rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-blue-300 sm:min-h-0 sm:p-4"
          >
            <div className="text-xs font-medium text-slate-500">{k.label}</div>
            <div className={cx(mobileStyles.metricValue, "mt-2 text-lg font-bold tracking-tight text-slate-950 sm:text-xl")}>
              {String(k.value).startsWith("AED") ? <><small>AED</small><span>{String(k.value).replace(/^AED\s*/, "")}</span></> : k.value}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-4 md:hidden">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-bold">Needs attention</h2>
          <div className="mt-3 divide-y divide-slate-100">
            <Attention
              label="Pending follow-ups"
              value={String(
                followups.filter((f) => f.status !== "Completed").length,
              )}
              note="Customer actions awaiting contact"
            />
            <Attention
              label="Price Desk pending"
              value={String(
                inquiries.filter(
                  (i) =>
                    !["Completed", "Price Not Available"].includes(i.status),
                ).length,
              )}
              note="New, under review or pricing"
            />
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Recent inquiries</h2>
            <button
              onClick={() => onGo("inquiries")}
              className="min-h-11 text-xs font-semibold text-blue-700"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {inquiries.slice(0, 3).map((i) => (
              <button
                key={i.id}
                onClick={() => onGo("inquiries")}
                className="flex min-h-14 w-full items-center py-3 text-left"
              >
                <div className="min-w-0">
                  <b className="text-xs text-blue-700">{i.id}</b>
                  <p className="truncate text-xs text-slate-600">
                    {i.customer}
                  </p>
                </div>
                <span className="ml-auto shrink-0">
                  <StatusBadge value={i.status} />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <BarSet
            title="Won vs lost"
            items={[
              { label: "Won", value: won.length },
              { label: "Lost", value: lost.length },
            ]}
          />
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-bold">Salesperson performance</h2>
          <div className="mt-3 divide-y divide-slate-100">
            {sales.map((s) => (
              <div key={s.name} className="py-3">
                <div className="flex justify-between text-xs">
                  <b>{s.name}</b>
                  <span className="text-slate-500">
                    {s.quotes} quotes · {money(s.won)} won
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${Math.min(100, 20 + s.quotes * 18)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-5 hidden gap-5 md:grid xl:grid-cols-[1.15fr_.85fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-bold">Commercial overview</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <BarSet title="Leads by source" items={bySource} />
            <BarSet title="Inquiries by type" items={byType} />
            <BarSet
              title="Won vs lost"
              items={[
                { label: "Won", value: won.length },
                { label: "Lost", value: lost.length },
              ]}
            />
          </div>
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold">Branch performance</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {branches.map((b) => (
                <div key={b} className="rounded-md bg-slate-50 p-3">
                  <b className="text-sm">{b}</b>
                  <div className="mt-2 text-xs text-slate-500">
                    {inquiries.filter((i) => i.branch === b).length} inquiries ·{" "}
                    {quotes.filter((q) => q.branch === b).length} quotes
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-bold">Operational attention</h2>
          <div className="mt-4 divide-y divide-slate-100">
            <Attention
              label="Price Desk pending"
              value={String(
                inquiries.filter(
                  (i) =>
                    !["Completed", "Price Not Available"].includes(i.status),
                ).length,
              )}
              note="New, under review or pricing"
            />
            <Attention
              label="Follow-up aging"
              value={String(
                followups.filter((f) => f.status !== "Completed").length,
              )}
              note="Open customer actions"
            />
            <Attention
              label="Partial availability"
              value={String(
                inquiries.filter((i) => i.status === "Partially Available")
                  .length,
              )}
              note="Sales decision required"
            />
          </div>
        </section>
      </div>
      <section className="mt-5 hidden overflow-hidden rounded-lg border border-slate-200 bg-white md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold">Salesperson performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr>
                <TH>Salesperson</TH>
                <TH>Quotes</TH>
                <TH>Open</TH>
                <TH>Won value</TH>
                <TH>Performance</TH>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.name}>
                  <TD className="font-semibold text-slate-900">{s.name}</TD>
                  <TD>{s.quotes}</TD>
                  <TD>{s.open}</TD>
                  <TD>{money(s.won)}</TD>
                  <TD>
                    <div className="h-1.5 w-32 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(100, 20 + s.quotes * 18)}%`,
                        }}
                      />
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
function BarSet({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: number }[];
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div>
      <h3 className="text-xs font-semibold text-slate-500">{title}</h3>
      <div className="mt-3 space-y-3">
        {items.map((i) => (
          <div key={i.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span>{i.label}</span>
              <b>{i.value}</b>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${(i.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Attention({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex items-center py-4 first:pt-0">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-blue-50 font-bold text-blue-700">
        {value}
      </span>
      <div className="ml-3">
        <b className="text-sm">{label}</b>
        <div className="text-xs text-slate-500">{note}</div>
      </div>
    </div>
  );
}

function InquiryTable({
  items,
  onOpen,
}: {
  items: Inquiry[];
  onOpen: (i: Inquiry) => void;
}) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {items.map((i) => (
          <button
            key={i.id}
            onClick={() => onOpen(i)}
            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left active:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-bold text-blue-700">{i.id}</span>
              <StatusBadge value={i.status} />
            </div>
            <h2 className="mt-3 text-sm font-bold text-slate-950">
              {i.customer}
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              {i.type} · {i.branch}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span>{i.date}</span>
              <span>
                {i.items.length} {i.items.length === 1 ? "item" : "items"}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="hidden md:block">
        <DataTable>
          <thead>
            <tr>
              <TH>Reference</TH>
              <TH>Customer</TH>
              <TH>Type</TH>
              <TH>Branch</TH>
              <TH>Items</TH>
              <TH>Created by</TH>
              <TH>Date</TH>
              <TH>Status</TH>
              <TH>Action</TH>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="hover:bg-slate-50">
                <TD className="font-semibold text-blue-700">{i.id}</TD>
                <TD className="font-semibold text-slate-900">{i.customer}</TD>
                <TD>{i.type}</TD>
                <TD>{i.branch}</TD>
                <TD>{i.items.length}</TD>
                <TD>{i.createdBy}</TD>
                <TD>{i.date}</TD>
                <TD>
                  <StatusBadge value={i.status} />
                </TD>
                <TD>
                  <button
                    className="text-xs font-semibold text-blue-700"
                    onClick={() => onOpen(i)}
                  >
                    Open
                  </button>
                </TD>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </>
  );
}

function CustomerDetail({
  customer,
  inquiries,
  quotes,
  followups,
  events,
  onBack,
  onCreate,
}: {
  customer: Customer;
  inquiries: Inquiry[];
  quotes: Quotation[];
  followups: FollowUp[];
  events: Event[];
  onBack: () => void;
  onCreate: () => void;
}) {
  const [tab, setTab] = useState("Inquiries");
  const iq = inquiries.filter((i) => i.customerId === customer.id);
  const qs = quotes.filter((q) => q.customerId === customer.id);
  const fs = followups.filter((f) => f.customerId === customer.id);
  const tabs = [
    { name: "Inquiries", count: iq.length },
    { name: "Quotations", count: qs.length },
    { name: "Follow-ups", count: fs.length },
    { name: "Won", count: qs.filter((q) => q.status === "Won").length },
    { name: "Lost", count: qs.filter((q) => q.status === "Lost").length },
    {
      name: "Activity",
      count: events.filter((e) => e.customerId === customer.id).length,
    },
  ];
  return (
    <>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft size={16} />
        Back to customers
      </button>
      <header className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <span className="grid h-12 w-12 place-items-center rounded-md bg-blue-50 text-blue-700">
            <Building2 size={22} />
          </span>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{customer.company}</h1>
              <BadgeCheck size={16} className="text-blue-600" />
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {customer.id} · {customer.type} · {customer.status}
            </p>
          </div>
        </div>
        <button className={primary} onClick={onCreate}>
          <Plus size={16} />
          Create Inquiry
        </button>
      </header>
      <div className="mt-5 grid gap-5 xl:grid-cols-[.72fr_1.28fr]">
        <div className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold">Customer master</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <Detail label="Contact person" value={customer.contact} />
              <Detail label="Mobile" value={customer.mobile} />
              <Detail label="WhatsApp" value={customer.whatsapp} />
              <Detail label="Email" value={customer.email} />
              <Detail
                label="Location"
                value={`${customer.location}, ${customer.country}`}
              />
              <Detail label="Fleet size" value={String(customer.fleetSize)} />
              <Detail label="Assigned branch" value={customer.branch} />
              <Detail
                label="Assigned salesperson"
                value={customer.salesperson}
              />
              <Detail label="Created date" value={customer.created} />
              <Detail label="Remarks" value={customer.remarks || "—"} />
            </div>
          </section>
        </div>
        <section className="rounded-lg border border-slate-200 bg-white">
          <div className="flex overflow-x-auto border-b border-slate-200 px-3">
            {tabs.map((t) => (
              <button
                key={t.name}
                onClick={() => setTab(t.name)}
                className={cx(
                  "whitespace-nowrap border-b-2 px-3 py-4 text-xs font-semibold",
                  tab === t.name
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500",
                )}
              >
                {t.name}{" "}
                <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-.5">
                  {t.count}
                </span>
              </button>
            ))}
          </div>
          <div className="p-5">
            {tab === "Inquiries" && (
              <RecordList
                items={iq.map((i) => ({
                  id: i.id,
                  meta: `${i.type} · ${i.date}`,
                  status: i.status,
                }))}
              />
            )}{" "}
            {tab === "Quotations" && (
              <RecordList
                items={qs.map((q) => ({
                  id: q.id,
                  meta: `${q.created} · ${money(quoteTotals(q).total)}`,
                  status: q.status,
                }))}
              />
            )}{" "}
            {tab === "Follow-ups" && (
              <RecordList
                items={fs.map((f) => ({
                  id: f.quotationId,
                  meta: `${f.nextFollowup} · ${f.note}`,
                  status: f.status,
                }))}
              />
            )}{" "}
            {tab === "Won" && (
              <RecordList
                items={qs
                  .filter((q) => q.status === "Won")
                  .map((q) => ({
                    id: q.id,
                    meta: `${q.close?.orderReference || "No LPO"} · ${money(q.close?.value ?? quoteTotals(q).total)}`,
                    status: "Won",
                  }))}
              />
            )}{" "}
            {tab === "Lost" && (
              <RecordList
                items={qs
                  .filter((q) => q.status === "Lost")
                  .map((q) => ({
                    id: q.id,
                    meta: `${q.close?.reason || "Reason unavailable"} · ${q.close?.remarks || ""}`,
                    status: "Lost",
                  }))}
              />
            )}{" "}
            {tab === "Activity" && (
              <Timeline
                events={events.filter((e) => e.customerId === customer.id)}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}
function RecordList({
  items,
}: {
  items: { id: string; meta: string; status: string }[];
}) {
  return items.length ? (
    <div className="divide-y divide-slate-100">
      {items.map((x) => (
        <div key={`${x.id}-${x.meta}`} className="flex items-center py-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-100">
            <FileText size={15} />
          </span>
          <div className="ml-3">
            <b className="text-sm text-blue-700">{x.id}</b>
            <div className="text-xs text-slate-500">{x.meta}</div>
          </div>
          <span className="ml-auto">
            <StatusBadge value={x.status} />
          </span>
        </div>
      ))}
    </div>
  ) : (
    <EmptyState text="No related records for this customer." />
  );
}

function InquiryDetail({
  inquiry,
  events,
  onBack,
  onPrice,
  onQuote,
}: {
  inquiry: Inquiry;
  events: Event[];
  onBack: () => void;
  onPrice: () => void;
  onQuote: () => void;
}) {
  return (
    <>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft size={16} />
        Back to inquiries
      </button>
      <header className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{inquiry.id}</h1>
            <StatusBadge value={inquiry.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {inquiry.customer} · {inquiry.type} Price Desk
          </p>
        </div>
        <div className="flex gap-2">
          <button className={secondary} onClick={onPrice}>
            <CircleDollarSign size={16} />
            Open Price Desk
          </button>
          {["Completed", "Partially Available", "Price Available"].includes(
            inquiry.status,
          ) && (
            <button className={primary} onClick={onQuote}>
              <ReceiptText size={16} />
              Generate Quotation
            </button>
          )}
        </div>
      </header>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold">Original requirement</h2>
            <p className="mt-1 text-xs text-slate-500">
              Customer-supplied values remain unchanged by pricing.
            </p>
          </div>
          <div className="divide-y divide-slate-100 md:hidden">
            {inquiry.items.map((i) => (
              <div key={i.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold">{i.item}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {i.partNo || "Part number not provided"}
                    </p>
                  </div>
                  <span className="text-sm font-bold">Qty {i.qty}</span>
                </div>
                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                  <Detail label="VIN#" value={i.vin || "—"} />
                  <Detail label="Customer remarks" value={i.remarks || "—"} />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr>
                  <TH>VIN#</TH>
                  <TH>Item</TH>
                  <TH>Part No.</TH>
                  <TH>Qty</TH>
                  <TH>Remarks</TH>
                </tr>
              </thead>
              <tbody>
                {inquiry.items.map((i) => (
                  <tr key={i.id}>
                    <TD>{i.vin || "—"}</TD>
                    <TD className="font-semibold text-slate-900">{i.item}</TD>
                    <TD>{i.partNo || "—"}</TD>
                    <TD>{i.qty}</TD>
                    <TD>{i.remarks || "—"}</TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold">Context</h2>
            <div className="mt-4 space-y-4">
              <Detail label="Activity type" value={inquiry.activityType} />
              <Detail label="Created by" value={inquiry.createdBy} />
              <Detail label="Branch" value={inquiry.branch} />
              <Detail label="Salesperson" value={inquiry.salesperson} />
              <Detail label="Assigned Price Desk" value={inquiry.assigned} />
              <Detail label="Inquiry date" value={inquiry.date} />
            </div>
          </section>
          <Timeline events={events.filter((e) => e.entityId === inquiry.id)} />
        </div>
      </div>
    </>
  );
}

function PriceDeskDetail({
  inquiry,
  customer,
  onBack,
  onUpdate,
  onComplete,
  onQuote,
}: {
  inquiry: Inquiry;
  customer?: Customer;
  onBack: () => void;
  onUpdate: (
    iid: string,
    id: string,
    key: keyof PricingResponse,
    v: string | number,
  ) => void;
  onComplete: () => void;
  onQuote: () => void;
}) {
  const canQuote = [
    "Completed",
    "Partially Available",
    "Price Available",
  ].includes(inquiry.status);
  return (
    <>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft size={16} />
        Back to Price Desk
      </button>
      <header className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{inquiry.id}</h1>
              <StatusBadge value={inquiry.status} />
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {inquiry.customer} · {inquiry.type}
            </p>
          </div>
          <div className="flex gap-2">
            {canQuote && (
              <button className={secondary} onClick={onQuote}>
                <ReceiptText size={16} />
                Generate Quotation
              </button>
            )}
            <button className={primary} onClick={onComplete}>
              <PackageCheck size={16} />
              Complete Pricing
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3 lg:grid-cols-6">
          <Detail label="Contact" value={customer?.contact || "—"} />
          <Detail label="Mobile" value={customer?.mobile || "—"} />
          <Detail label="Branch" value={inquiry.branch} />
          <Detail label="Salesperson" value={inquiry.salesperson} />
          <Detail label="Date" value={inquiry.date} />
          <Detail label="Assigned" value={inquiry.assigned} />
        </div>
      </header>
      <div className="mt-5 space-y-4">
        {inquiry.items.map((item, index) => (
          <section
            key={item.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:grid-cols-5">
              <Detail
                label={`Original requirement ${index + 1}`}
                value={item.item}
              />
              <Detail label="VIN#" value={item.vin || "—"} />
              <Detail label="Part No." value={item.partNo || "—"} />
              <Detail label="Required Qty" value={String(item.qty)} />
              <Detail label="Customer remarks" value={item.remarks || "—"} />
            </div>
            <div className="p-5">
              <h3 className="mb-4 text-sm font-bold">Pricing response</h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Available Qty">
                  <input
                    type="number"
                    min="0"
                    max={item.qty}
                    className={inputClass}
                    value={item.pricing.availableQty}
                    onChange={(e) =>
                      onUpdate(
                        inquiry.id,
                        item.id,
                        "availableQty",
                        Math.max(0, Number(e.target.value)),
                      )
                    }
                  />
                </Field>
                <Field label="Cost (AED)">
                  <input
                    type="number"
                    min="0"
                    step=".01"
                    className={inputClass}
                    value={item.pricing.cost || ""}
                    onChange={(e) =>
                      onUpdate(
                        inquiry.id,
                        item.id,
                        "cost",
                        Math.max(0, Number(e.target.value)),
                      )
                    }
                  />
                </Field>
                <Field label="Selling Price (AED)">
                  <input
                    type="number"
                    min="0"
                    step=".01"
                    className={inputClass}
                    value={item.pricing.sellingPrice || ""}
                    onChange={(e) =>
                      onUpdate(
                        inquiry.id,
                        item.id,
                        "sellingPrice",
                        Math.max(0, Number(e.target.value)),
                      )
                    }
                  />
                </Field>
                <Field label="Availability / Remarks">
                  <input
                    className={inputClass}
                    value={item.pricing.remarks}
                    onChange={(e) =>
                      onUpdate(inquiry.id, item.id, "remarks", e.target.value)
                    }
                    placeholder="Available, partial, alternative..."
                  />
                </Field>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function QuotationView({
  quote,
  onBack,
  onChange,
  onSend,
  onFollowup,
  onRevise,
  onClose,
  onPdf,
}: {
  quote: Quotation;
  onBack: () => void;
  onChange: (q: Quotation) => void;
  onSend: () => void;
  onFollowup: () => void;
  onRevise: () => void;
  onClose: (m: "won" | "lost") => void;
  onPdf: () => void;
}) {
  const totals = quoteTotals(quote);
  const updateItem = (id: string, key: keyof QuoteItem, v: number) =>
    onChange({
      ...quote,
      items: quote.items.map((i) => (i.id === id ? { ...i, [key]: v } : i)),
      status: "Draft",
    });
  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
        >
          <ArrowLeft size={16} />
          Back to quotations
        </button>
        <div className="flex items-center gap-2 md:hidden">
          <button className={primary} onClick={onSend}>
            <Send size={16} />
            Send
          </button>
          <details className="relative">
            <summary
              aria-label="Quotation actions"
              className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-md border border-slate-300 bg-white text-slate-600"
            >
              <MoreVertical size={18} />
            </summary>
            <div className="absolute right-0 top-12 z-10 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                className="block min-h-11 w-full px-4 text-left text-sm"
                onClick={() => onChange({ ...quote, status: "Draft" })}
              >
                Save Draft
              </button>
              <button
                className="block min-h-11 w-full px-4 text-left text-sm"
                onClick={onPdf}
              >
                Generate PDF
              </button>
              <button
                className="block min-h-11 w-full px-4 text-left text-sm"
                onClick={onFollowup}
              >
                Create Follow-up
              </button>
              <button
                className="block min-h-11 w-full px-4 text-left text-sm"
                onClick={onRevise}
              >
                Revise
              </button>
              <button
                className="block min-h-11 w-full px-4 text-left text-sm"
                onClick={() => onClose("won")}
              >
                Mark Won
              </button>
              <button
                className="block min-h-11 w-full px-4 text-left text-sm text-red-700"
                onClick={() => onClose("lost")}
              >
                Mark Lost
              </button>
            </div>
          </details>
        </div>
        <div className="hidden flex-wrap gap-2 md:flex">
          <button
            className={secondary}
            onClick={() => onChange({ ...quote, status: "Draft" })}
          >
            <ClipboardCheck size={16} />
            Save Draft
          </button>
          <button className={secondary} onClick={onPdf}>
            <FileText size={16} />
            Generate PDF
          </button>
          <button className={secondary} onClick={onFollowup}>
            <CalendarClock size={16} />
            Follow-up
          </button>
          <button className={secondary} onClick={onRevise}>
            <FilePenLine size={16} />
            Revise
          </button>
          <button className={secondary} onClick={() => onClose("lost")}>
            <XCircle size={16} />
            Mark Lost
          </button>
          <button className={secondary} onClick={() => onClose("won")}>
            <Handshake size={16} />
            Mark Won
          </button>
          <button className={primary} onClick={onSend}>
            <Send size={16} />
            Send Quotation
          </button>
        </div>
      </div>
      <article className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="h-1 bg-blue-600" />
        <div className="p-4 sm:p-8">
          <header className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row">
            <div className="flex">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-[#17202b] text-white">
                <Wrench size={21} />
              </span>
              <div className="ml-3">
                <b>AUTO PARTS CRM</b>
                <div className="text-xs text-slate-500">
                  Automotive Parts & Trading
                </div>
              </div>
            </div>
            <div className="sm:text-right">
              <div className="text-xs font-semibold text-blue-700">
                QUOTATION
              </div>
              <h1 className="mt-1 text-2xl font-bold">{quote.id}</h1>
              <div className="mt-2 flex gap-2 sm:justify-end">
                <span className="text-xs text-slate-500">
                  Revision {quote.revision}
                </span>
                <StatusBadge value={quote.status} />
              </div>
            </div>
          </header>
          <div className="grid gap-5 py-6 sm:grid-cols-3">
            <Detail
              label="Customer"
              value={`${quote.customer} · ${quote.contact}`}
            />
            <Detail label="Inquiry reference" value={quote.inquiryId} />
            <Detail
              label="Salesperson / Branch"
              value={`${quote.salesperson} · ${quote.branch}`}
            />
          </div>
          <div className="space-y-3 md:hidden">
            {quote.items.map((i) => {
              const amount = i.qty * i.unitPrice * (1 - i.discount / 100);
              return (
                <section
                  key={i.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <h2 className="text-sm font-bold text-slate-950">{i.item}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {i.partNo || "Part number not provided"}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <Detail
                      label="Requested / Available"
                      value={`${i.requestedQty} / ${i.availableQty}`}
                    />
                    <Detail label="Amount" value={money(amount)} />
                    <Field label="Quote Qty">
                      <input
                        aria-label={`Mobile quote quantity for ${i.item}`}
                        type="number"
                        min="0"
                        max={i.availableQty}
                        className={inputClass}
                        value={i.qty}
                        onChange={(e) =>
                          updateItem(
                            i.id,
                            "qty",
                            Math.min(
                              i.availableQty,
                              Math.max(0, Number(e.target.value)),
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Unit Price">
                      <input
                        aria-label={`Mobile unit price for ${i.item}`}
                        type="number"
                        min="0"
                        className={inputClass}
                        value={i.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            i.id,
                            "unitPrice",
                            Math.max(0, Number(e.target.value)),
                          )
                        }
                      />
                    </Field>
                    <Field label="Discount %">
                      <input
                        aria-label={`Mobile discount for ${i.item}`}
                        type="number"
                        min="0"
                        max="100"
                        className={inputClass}
                        value={i.discount}
                        onChange={(e) =>
                          updateItem(
                            i.id,
                            "discount",
                            Math.min(100, Math.max(0, Number(e.target.value))),
                          )
                        }
                      />
                    </Field>
                  </div>
                </section>
              );
            })}
          </div>
          <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr>
                  <TH>Item</TH>
                  <TH>Part No.</TH>
                  <TH>Requested</TH>
                  <TH>Available</TH>
                  <TH>Quote Qty</TH>
                  <TH>Unit Price</TH>
                  <TH>Discount %</TH>
                  <TH>Amount</TH>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((i) => {
                  const amount = i.qty * i.unitPrice * (1 - i.discount / 100);
                  return (
                    <tr key={i.id}>
                      <TD className="font-semibold text-slate-900">{i.item}</TD>
                      <TD>{i.partNo || "—"}</TD>
                      <TD>{i.requestedQty}</TD>
                      <TD>{i.availableQty}</TD>
                      <TD>
                        <input
                          aria-label={`Quote quantity for ${i.item}`}
                          type="number"
                          min="0"
                          max={i.availableQty}
                          className={cx(inputClass, "w-20")}
                          value={i.qty}
                          onChange={(e) =>
                            updateItem(
                              i.id,
                              "qty",
                              Math.min(
                                i.availableQty,
                                Math.max(0, Number(e.target.value)),
                              ),
                            )
                          }
                        />
                      </TD>
                      <TD>
                        <input
                          aria-label={`Unit price for ${i.item}`}
                          type="number"
                          min="0"
                          className={cx(inputClass, "w-28")}
                          value={i.unitPrice}
                          onChange={(e) =>
                            updateItem(
                              i.id,
                              "unitPrice",
                              Math.max(0, Number(e.target.value)),
                            )
                          }
                        />
                      </TD>
                      <TD>
                        <input
                          aria-label={`Discount for ${i.item}`}
                          type="number"
                          min="0"
                          max="100"
                          className={cx(inputClass, "w-20")}
                          value={i.discount}
                          onChange={(e) =>
                            updateItem(
                              i.id,
                              "discount",
                              Math.min(
                                100,
                                Math.max(0, Number(e.target.value)),
                              ),
                            )
                          }
                        />
                      </TD>
                      <TD className="font-semibold text-slate-900">
                        {money(amount)}
                      </TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm space-y-3 text-sm">
              <Sum label="Gross amount" value={totals.gross} />
              <Sum label="Discount" value={-totals.discount} />
              <Sum label="Subtotal" value={totals.subtotal} />
              <Sum label="VAT (5%)" value={totals.vat} />
              <div className="flex justify-between border-t border-slate-200 pt-3 text-lg">
                <b>Grand Total</b>
                <b className="text-blue-700">{money(totals.total)}</b>
              </div>
            </div>
          </div>
          <div className="mt-7 grid gap-4 rounded-md bg-slate-50 p-4 sm:grid-cols-3">
            <Detail label="Validity" value={quote.validity} />
            <Detail label="Payment Terms" value={quote.payment} />
            <Detail label="Delivery Terms" value={quote.delivery} />
          </div>
          {quote.versions.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <h2 className="text-sm font-bold">Revision history</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {quote.versions.map((v) => (
                  <span
                    key={v.revision}
                    className="rounded-md bg-slate-100 px-3 py-2 text-xs"
                  >
                    Revision {v.revision} · {v.savedAt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
function Sum({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span>
      <b className="text-slate-900">{money(value)}</b>
    </div>
  );
}

function LeadModal({
  editing,
  form,
  setForm,
  onSubmit,
  onClose,
}: {
  editing: boolean;
  form: Record<string, string>;
  setForm: (v: any) => void;
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title={editing ? "Edit lead" : "New lead"}
      subtitle="Capture the prospect once, then convert without re-entry."
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Company Name">
          <input
            required
            className={inputClass}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </Field>
        <Field label="Contact Person">
          <input
            required
            className={inputClass}
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </Field>
        <Field label="Mobile">
          <input
            required
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
        <Field label="Location">
          <input
            className={inputClass}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </Field>
        <Field label="Source">
          <select
            className={inputClass}
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          >
            <option>Referral</option>
            <option>Website</option>
            <option>Walk-in</option>
            <option>Campaign</option>
            <option>Trade show</option>
          </select>
        </Field>
        <Field label="Branch">
          <select
            className={inputClass}
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
          >
            {branches.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <Field label="Salesperson">
          <select
            className={inputClass}
            value={form.salesperson}
            onChange={(e) => setForm({ ...form, salesperson: e.target.value })}
          >
            {salespeople.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea
              className="min-h-20 w-full rounded-md border border-slate-300 p-3 text-sm"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Field>
        </div>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <button type="button" className={secondary} onClick={onClose}>
            Cancel
          </button>
          <button className={primary}>
            {editing ? "Save Changes" : "Save Lead"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CustomerModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title="Create customer"
      subtitle="The new account will be selected in the current inquiry."
      onClose={onClose}
      wide
    >
      <form
        onSubmit={onSubmit}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Field label="Company Name">
          <input required name="company" className={inputClass} />
        </Field>
        <Field label="Customer Type">
          <select name="type" className={inputClass}>
            {customerTypes.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <Field label="Contact Person">
          <input required name="contact" className={inputClass} />
        </Field>
        <Field label="Mobile">
          <input required name="mobile" className={inputClass} />
        </Field>
        <Field label="WhatsApp">
          <input name="whatsapp" className={inputClass} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" className={inputClass} />
        </Field>
        <Field label="Location">
          <input required name="location" className={inputClass} />
        </Field>
        <Field label="Country">
          <input disabled value="UAE" className={inputClass} />
        </Field>
        <Field label="Fleet Size">
          <input
            name="fleet"
            type="number"
            min="0"
            defaultValue="0"
            className={inputClass}
          />
        </Field>
        <Field label="Assigned Branch">
          <select name="branch" className={inputClass}>
            {branches.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <Field label="Assigned Salesperson">
          <select name="salesperson" className={inputClass}>
            {salespeople.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2 lg:col-span-3">
          <Field label="Remarks">
            <textarea
              name="remarks"
              className="min-h-20 w-full rounded-md border border-slate-300 p-3 text-sm"
            />
          </Field>
        </div>
        <div className="flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
          <button type="button" className={secondary} onClick={onClose}>
            Cancel
          </button>
          <button className={primary}>Create Customer</button>
        </div>
      </form>
    </Modal>
  );
}

function InquiryModal({
  customers,
  inquiries,
  form,
  setForm,
  onNewCustomer,
  onSubmit,
  onClose,
}: {
  customers: Customer[];
  inquiries: Inquiry[];
  form: InquiryForm;
  setForm: (v: InquiryForm) => void;
  onNewCustomer: () => void;
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
}) {
  const update = (id: string, key: keyof Requirement, v: string | number) =>
    setForm({
      ...form,
      items: form.items.map((i) => (i.id === id ? { ...i, [key]: v } : i)),
    });
  return (
    <Modal
      title="New inquiry"
      subtitle="Simple intake for routing to the Price Desk."
      onClose={onClose}
      wide
    >
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Field label="Activity Type">
            <input disabled value="New Inquiry" className={inputClass} />
          </Field>
          <Field label="Reference No.">
            <input
              disabled
              value={nextInquiryId(inquiries)}
              className={inputClass}
            />
          </Field>
          <Field label="Send to Price Desk">
            <select
              className={inputClass}
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as "LMV" | "HMV" })
              }
            >
              <option>LMV</option>
              <option>HMV</option>
            </select>
          </Field>
          <Field label="Created By">
            <input
              disabled
              value={`${currentUser} – Sales Executive`}
              className={inputClass}
            />
          </Field>
          <Field label="Customer">
            <select
              className={inputClass}
              value={form.customerId}
              onChange={(e) => setForm({ ...form, customerId: e.target.value })}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <button
          type="button"
          className="mt-2 text-xs font-semibold text-blue-700"
          onClick={onNewCustomer}
        >
          + Create New Customer
        </button>
        <div className="my-5 flex items-center justify-between border-t border-slate-200 pt-5">
          <div>
            <h3 className="font-bold">Required Items</h3>
            <p className="text-xs text-slate-500">
              Original request information is locked once submitted.
            </p>
          </div>
          <button
            type="button"
            className={secondary}
            onClick={() =>
              setForm({ ...form, items: [...form.items, blankItem()] })
            }
          >
            <Plus size={15} />
            Add Item
          </button>
        </div>
        <div className="space-y-3">
          {form.items.map((i, n) => (
            <div
              key={i.id}
              className="grid items-end gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_.4fr_1.2fr_auto]"
            >
              <Field label={n === 0 ? "VIN#" : `VIN# ${n + 1}`}>
                <input
                  className={inputClass}
                  value={i.vin}
                  onChange={(e) =>
                    update(i.id, "vin", e.target.value.toUpperCase())
                  }
                />
              </Field>
              <Field label="Item">
                <input
                  required
                  className={inputClass}
                  value={i.item}
                  onChange={(e) => update(i.id, "item", e.target.value)}
                />
              </Field>
              <Field label="Part No.">
                <input
                  className={inputClass}
                  value={i.partNo}
                  onChange={(e) => update(i.id, "partNo", e.target.value)}
                />
              </Field>
              <Field label="Qty">
                <input
                  required
                  type="number"
                  min="1"
                  className={inputClass}
                  value={i.qty}
                  onChange={(e) =>
                    update(i.id, "qty", Math.max(1, Number(e.target.value)))
                  }
                />
              </Field>
              <Field label="Remarks">
                <input
                  className={inputClass}
                  value={i.remarks}
                  onChange={(e) => update(i.id, "remarks", e.target.value)}
                />
              </Field>
              <button
                type="button"
                disabled={form.items.length === 1}
                className="grid h-10 w-10 place-items-center rounded-md border border-slate-300 bg-white text-slate-500 disabled:opacity-30"
                onClick={() =>
                  setForm({
                    ...form,
                    items: form.items.filter((x) => x.id !== i.id),
                  })
                }
                aria-label={`Remove item ${n + 1}`}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-slate-200 pt-5">
          <button type="button" className={secondary} onClick={onClose}>
            Cancel
          </button>
          <button className={primary}>
            <ClipboardCheck size={16} />
            Submit Inquiry
          </button>
        </div>
      </form>
    </Modal>
  );
}

function FollowupModal({
  quotes,
  selected,
  onSubmit,
  onClose,
}: {
  quotes: Quotation[];
  selected: Quotation | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title="Schedule follow-up"
      subtitle="Link the action to its customer, inquiry and quotation."
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Quotation">
          <select
            name="quote"
            defaultValue={selected?.id}
            className={inputClass}
          >
            {quotes
              .filter((q) => !["Won", "Lost"].includes(q.status))
              .map((q) => (
                <option key={q.id} value={q.id}>
                  {q.id} · {q.customer}
                </option>
              ))}
          </select>
        </Field>
        <Field label="Assigned Salesperson">
          <select
            name="salesperson"
            defaultValue={selected?.salesperson || currentUser}
            className={inputClass}
          >
            {salespeople.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <Field label="Next Follow-up">
          <input
            required
            name="date"
            type="datetime-local"
            className={inputClass}
          />
        </Field>
        <Field label="Notes">
          <textarea
            required
            name="note"
            className="min-h-20 w-full rounded-md border border-slate-300 p-3 text-sm"
          />
        </Field>
        <div className="flex justify-end gap-2">
          <button type="button" className={secondary} onClick={onClose}>
            Cancel
          </button>
          <button className={primary}>Schedule</button>
        </div>
      </form>
    </Modal>
  );
}

function CloseModal({
  quote,
  mode,
  onSubmit,
  onClose,
}: {
  quote: Quotation;
  mode: "won" | "lost";
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  return (
    <Modal
      title={mode === "won" ? "Close as won" : "Close as lost"}
      subtitle={`${quote.id} · ${quote.customer}`}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "won" ? (
          <>
            <Field label="Won Date">
              <input disabled value={today} className={inputClass} />
            </Field>
            <Field label="Won Value">
              <input
                required
                name="value"
                type="number"
                step=".01"
                defaultValue={quoteTotals(quote).total.toFixed(2)}
                className={inputClass}
              />
            </Field>
            <Field label="LPO / Order Reference">
              <input required name="order" className={inputClass} />
            </Field>
          </>
        ) : (
          <>
            <Field label="Lost Date">
              <input disabled value={today} className={inputClass} />
            </Field>
            <Field label="Lost Reason">
              <select
                required
                name="reason"
                className={inputClass}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select a reason</option>
                {[
                  "Price",
                  "Availability",
                  "Competitor",
                  "Customer Cancelled",
                  "No Response",
                  "Wrong Requirement",
                  "Delivery",
                  "Payment Terms",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            {reason === "Other" && (
              <Field label="Other Reason">
                <input required name="other" className={inputClass} />
              </Field>
            )}
          </>
        )}
        <Field label="Remarks">
          <textarea
            name="remarks"
            className="min-h-20 w-full rounded-md border border-slate-300 p-3 text-sm"
          />
        </Field>
        <div className="flex justify-end gap-2">
          <button type="button" className={secondary} onClick={onClose}>
            Cancel
          </button>
          <button
            className={cx(
              primary,
              mode === "lost" && "bg-red-700 hover:bg-red-800",
            )}
          >
            {mode === "won" ? "Confirm Won" : "Confirm Lost"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Timeline({ events }: { events: Event[] }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Activity size={16} className="text-blue-600" />
        <h2 className="font-bold">Activity timeline</h2>
      </div>
      {events.length ? (
        <div className="mt-4 space-y-4">
          {events.map((e) => (
            <div key={e.id} className="flex">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
              <div className="ml-3">
                <div className="text-xs font-semibold">{e.text}</div>
                <div className="mt-1 text-[10px] text-slate-400">{e.at}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No activity recorded for this record." />
      )}
    </div>
  );
}
function Pipeline({
  leads,
  inquiries,
  quotes,
}: {
  leads: Lead[];
  inquiries: Inquiry[];
  quotes: Quotation[];
}) {
  const columns: Stage[] = [
    "Lead",
    "Inquiry",
    "Pricing",
    "Quotation",
    "Follow-up",
    "Won",
    "Lost",
  ];
  const cards = [
    ...leads
      .filter((l) => l.status !== "Converted")
      .map((l) => ({
        key: l.id,
        stage: "Lead" as Stage,
        name: l.company,
        id: l.id,
        value: 0,
      })),
    ...inquiries
      .filter((i) => i.status === "New Inquiry")
      .map((i) => ({
        key: i.id,
        stage: "Inquiry" as Stage,
        name: i.customer,
        id: i.id,
        value: 0,
      })),
    ...inquiries
      .filter(
        (i) =>
          !["New Inquiry", "Completed", "Price Not Available"].includes(
            i.status,
          ),
      )
      .map((i) => ({
        key: `p-${i.id}`,
        stage: "Pricing" as Stage,
        name: i.customer,
        id: i.id,
        value: 0,
      })),
    ...quotes.map((q) => ({
      key: q.id,
      stage: (q.status === "Won"
        ? "Won"
        : q.status === "Lost"
          ? "Lost"
          : ["Follow-up", "Negotiation"].includes(q.status)
            ? "Follow-up"
            : "Quotation") as Stage,
      name: q.customer,
      id: q.id,
      value: quoteTotals(q).total,
    })),
  ];
  return (
    <>
      <PageTitle
        title="Sales pipeline"
        description="Connected opportunities from lead to final outcome."
      />
      <div className="space-y-3 md:hidden">
        {columns.map((col) => {
          const stageCards = cards.filter((c) => c.stage === col);
          return (
            <details
              key={col}
              className="rounded-xl border border-slate-200 bg-white"
              open={
                stageCards.length > 0 &&
                ["Pricing", "Quotation", "Follow-up"].includes(col)
              }
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-bold">
                <span>{col}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px]">
                  {stageCards.length}
                </span>
              </summary>
              {stageCards.length > 0 && (
                <div className="border-t border-slate-100 p-3">
                  <div className="space-y-2">
                    {stageCards.map((c) => (
                      <div key={c.key} className="rounded-lg bg-slate-50 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <b className="text-xs">{c.name}</b>
                            <div className="mt-1 text-[10px] text-blue-700">
                              {c.id}
                            </div>
                          </div>
                          {c.value > 0 && (
                            <b className="text-xs">{money(c.value)}</b>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </details>
          );
        })}
      </div>
      <div className="hidden overflow-x-auto pb-4 md:block">
        <div className="grid min-w-[1300px] grid-cols-7 gap-3">
          {columns.map((col) => (
            <section key={col} className="rounded-lg bg-slate-200/50 p-2.5">
              <div className="mb-3 flex justify-between px-1 text-xs">
                <b>{col}</b>
                <span>{cards.filter((c) => c.stage === col).length}</span>
              </div>
              <div className="space-y-2">
                {cards
                  .filter((c) => c.stage === col)
                  .map((c) => (
                    <div
                      key={c.key}
                      className="rounded-md border border-slate-200 bg-white p-3"
                    >
                      <b className="text-xs">{c.name}</b>
                      <div className="mt-1 text-[10px] text-blue-700">
                        {c.id}
                      </div>
                      {c.value > 0 && (
                        <div className="mt-3 text-sm font-bold">
                          {money(c.value)}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
function SettingsPage({
  onReset,
  onSaved,
}: {
  onReset: () => void;
  onSaved: () => void;
}) {
  return (
    <>
      <PageTitle
        title="Demo settings"
        description="Presentation data and commercial defaults."
      />
      <div className="grid max-w-4xl gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-bold">Presentation scenario</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Restore the prepared UAE automotive parts workflow before a client
            presentation.
          </p>
          <button className={cx(secondary, "mt-5")} onClick={onReset}>
            <RefreshCcw size={16} />
            Restore Demo Data
          </button>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-bold">Quotation preferences</h2>
          <div className="mt-4 space-y-4">
            <Field label="Trading name">
              <input className={inputClass} defaultValue="AUTO PARTS CRM" />
            </Field>
            <Field label="Currency">
              <input className={inputClass} disabled value="AED — UAE Dirham" />
            </Field>
            <button className={primary} onClick={onSaved}>
              Save Preferences
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}
function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-8 text-center">
      <Boxes className="mx-auto text-slate-300" size={23} />
      <p className="mt-2 text-xs text-slate-400">{text}</p>
    </div>
  );
}
