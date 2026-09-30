export const KEY = "fusion-multi-company-crm-demo-v1";
export const stages = ["New", "Qualified", "Quotation Sent", "Negotiation", "Won", "Lost"];
export const quoteStatuses = ["Draft", "Sent", "Under Review", "Approved", "Rejected"];
export const purposes = ["New Customer Introduction", "Follow-up Meeting", "New Business Opportunity", "Quotation Discussion", "Design / Sample Approval", "Payment Collection", "Site Visit", "Delivery Discussion", "General Discussion", "Other"];
export const staff = ["Sara Malik", "Omar Rashid", "Leena Thomas"];
export const companies = [
  { id: "advertising", name: "Advertising & Giveaways", short: "Advertising", color: "#2563eb", icon: "A", subtitle: "Ideas into lasting impressions", workflow: ["Enquiry", "Quotation", "Design", "Client Approval", "Production", "Delivery", "Completed"] },
  { id: "packaging", name: "Custom Packaging", short: "Packaging", color: "#0f766e", icon: "P", subtitle: "From the first sample to the final box", workflow: ["Enquiry", "Requirements", "Quotation", "Design / Sample", "Sample Approval", "Production", "Quality Check", "Delivery"] },
  { id: "supply", name: "Project Supply", short: "Supply", color: "#7552bd", icon: "S", subtitle: "Every requirement. Every delivery.", workflow: ["Enquiry", "Requirements", "Supplier Quotation", "Client Quotation", "Confirmation", "Procurement", "Delivery", "Completed"] }
];
export type Kind = "customers" | "meetings" | "opportunities" | "quotations" | "orders" | "tasks";
export interface Item { description: string; quantity: number; price: number }
export interface FileVersion { name: string; size: number; type: string; data?: string; at: string; version: number }
export interface History { at: string; text: string }
export interface RecordData {
  id: string; company: string; createdAt: string; name?: string; title?: string; customerId?: string; opportunityId?: string; quotationId?: string; meetingId?: string; orderId?: string;
  contact?: string; email?: string; mobile?: string; alternative?: string; location?: string; address?: string; customerType?: string; notes?: string;
  date?: string; time?: string; purpose?: string; assigned?: string; reminder?: string; status?: string; outcome?: string; nextAction?: string; followupDate?: string;
  value?: number; closeDate?: string; probability?: number; stage?: string; history: History[]; items?: Item[]; discount?: number; tax?: number;
  quantity?: number; product?: string; approval?: string; files?: FileVersion[]; designNotes?: string; deliveryDate?: string; production?: string;
  packagingType?: string; dimensions?: string; material?: string; printing?: string; sample?: string; deadline?: string;
  supplier?: string; supplierAmount?: number; customerAmount?: number; purchaseStatus?: string; deliveryStatus?: string; priority?: string; description?: string; relatedKind?: string; relatedId?: string;
}
export interface DemoState { version: 1; selected: string; records: Record<Kind, RecordData[]>; activity: (History & { company: string; customerId?: string; kind: Kind; recordId: string })[] }
export const kinds: Kind[] = ["customers", "meetings", "opportunities", "quotations", "orders", "tasks"];
export function today(offset = 0) { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
export function money(value = 0) { return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value); }
export function dateLabel(date?: string) { return date ? new Date(date.length === 10 ? date + "T12:00:00" : date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"; }
export function total(q: RecordData) { const sub = (q.items || []).reduce((n, i) => n + i.quantity * i.price, 0); return Math.max(0, sub - (q.discount || 0)) * (1 + (q.tax || 0) / 100); }
export function active(o: RecordData) { return o.stage !== "Won" && o.stage !== "Lost"; }
export function meetingStatus(m: RecordData) { return m.status === "Completed" ? "Completed" : `${m.date}T${m.time || "23:59"}` < new Date().toLocaleString("sv-SE").replace(" ", "T") ? "Overdue" : "Scheduled"; }
export function reminderDue(m: RecordData) { if (m.status === "Completed" || m.reminder === "None") return false; const time = new Date(`${m.date}T${m.time || "09:00"}`).getTime(); const lead = m.reminder === "One day before" ? 86400000 : 3600000; return time - lead <= Date.now(); }
export function uid() { return crypto.randomUUID(); }
export function saveRecord(state: DemoState, kind: Kind, data: Partial<RecordData>, message: string): DemoState {
  const old = data.id ? state.records[kind].find(r => r.id === data.id && r.company === state.selected) : undefined;
  if (data.id && !old) throw new Error("Record does not belong to this workspace.");
  const at = new Date().toISOString();
  const record: RecordData = { id: uid(), company: state.selected, createdAt: at, ...old, ...data, history: [...(old?.history || []), { at, text: message }] };
  // All relationship IDs must belong to the selected entity.
  const links: [keyof RecordData, Kind][] = [["customerId", "customers"], ["opportunityId", "opportunities"], ["quotationId", "quotations"], ["meetingId", "meetings"], ["orderId", "orders"]];
  links.forEach(([key, target]) => { if (record[key] && !state.records[target].some(r => r.id === record[key] && r.company === state.selected)) throw new Error("Related record is outside this workspace."); });
  if (kind === "tasks" && record.relatedId && !state.records[record.relatedKind as Kind]?.some(r => r.id === record.relatedId && r.company === state.selected)) throw new Error("Task link is outside this workspace.");
  return { ...state, records: { ...state.records, [kind]: old ? state.records[kind].map(r => r.id === old.id ? record : r) : [...state.records[kind], record] }, activity: [{ at, text: message, company: state.selected, customerId: kind === "customers" ? record.id : record.customerId, kind, recordId: record.id }, ...state.activity] };
}
export function convertOrder(state: DemoState, source: RecordData, kind: "opportunities" | "quotations") {
  if (source.company !== state.selected || (kind === "opportunities" ? source.stage !== "Won" : source.status !== "Approved")) throw new Error("Approve the quotation or win the opportunity first.");
  const existing = state.records.orders.find(r => r.company === state.selected && (kind === "opportunities" ? r.opportunityId === source.id : r.quotationId === source.id || (!!source.opportunityId && r.opportunityId === source.opportunityId)));
  if (existing) {
    if (kind === "quotations" && existing.quotationId !== source.id) {
      const next = saveRecord(state, "orders", { id: existing.id, quotationId: source.id }, `Approved quotation linked: ${source.title}`);
      return { state: next, order: next.records.orders.find(r => r.id === existing.id)! };
    }
    return { state, order: existing };
  }
  const quotation = kind === "quotations" ? source : state.records.quotations.find(q => q.company === state.selected && q.opportunityId === source.id && q.status === "Approved");
  const next = saveRecord(state, "orders", { title: source.title, customerId: source.customerId, opportunityId: kind === "opportunities" ? source.id : source.opportunityId, quotationId: quotation?.id, value: quotation ? total(quotation) : source.value, stage: "Enquiry", quantity: quotation?.items?.reduce((sum, i) => sum + i.quantity, 0) || 500, approval: "Pending Approval", files: [], product: source.title, production: "Not started", purchaseStatus: "Pending", deliveryStatus: "Not scheduled" }, `Order created from ${kind === "quotations" ? "approved quotation" : "won opportunity"}: ${source.title}`);
  return { state: next, order: next.records.orders[next.records.orders.length - 1] };
}
export function seed(): DemoState {
  const state: DemoState = { version: 1, selected: "advertising", records: { customers: [], meetings: [], opportunities: [], quotations: [], orders: [], tasks: [] }, activity: [] };
  const names = [["Cedar Events", "Meridian Hospitality", "Atlas Wellness", "Palm & Coast", "Nexa Learning", "Olive Retail", "Horizon Studio", "Mosaic Foods", "Summit Mobility", "Beacon Consulting"], ["Luma Cosmetics", "Cacao & Co.", "Fieldnote Coffee", "Pearl Organics", "Arcadia Retail", "Nest Bakery", "Serein Fragrance", "Willow Pharmacy", "Bloom Tea", "Terra Market"], ["Orion Interiors", "Seabrook Projects", "Vertex Engineering", "Ridgeway Facilities", "Aster Construction", "Copperline Design", "Slate Contracting", "Harbor Hotels", "Axis Development", "Stonebridge Works"]];
  const titles = [["500 branded welcome kits", "Corporate gifting · Q4", "Exhibition tote bags", "New-starter stationery", "Summer event merchandise", "VIP leather gift sets", "Conference lanyards", "Annual awards campaign"], ["Rigid gift boxes · 2,000 units", "Retail sleeve collection", "Printed coffee pouches", "Cosmetic sample cartons", "Bakery takeaway packaging", "Fragrance launch boxes", "Premium tea canisters", "Recycled mailer boxes"], ["Marina fit-out materials", "Hotel lighting package", "Office furniture supply", "Site safety equipment", "Villa bathroom fixtures", "Restaurant kitchen supplies", "Lobby flooring project", "Guestroom accessories"]];
  companies.forEach((co, c) => {
    const base = (i: number) => ({ id: `${co.id}-${i}`, company: co.id, createdAt: new Date(today(-i * 6) + "T09:00:00").toISOString(), history: [] as History[] });
    names[c].forEach((name, i) => state.records.customers.push({ ...base(i), id: `${co.id}-c${i}`, name, contact: ["Maya Rahman", "Rami Faris", "Nadia Elias", "Adam Saleh"][i % 4], email: `contact${i}@${co.id}.example`, mobile: `+971 50 555 ${String(1000 + c * 100 + i)}`, location: ["Al Quoz, Dubai", "Business Bay, Dubai", "Al Majaz, Sharjah", "Khalifa City, Abu Dhabi"][i % 4], customerType: ["Corporate", "Retail", "Agency"][i % 3], notes: "Fictional demo customer. Prefers a call before a visit.", history: [{ at: base(i).createdAt, text: "Customer registered" }] }));
    titles[c].forEach((title, i) => {
      const createdAt = new Date(today(-i * 22) + "T09:00:00").toISOString();
      const stage = ["Negotiation", "Won", "Qualified", "Quotation Sent", "New", "Won", "Lost", "Qualified"][i];
      state.records.opportunities.push({ ...base(i), id: `${co.id}-o${i}`, createdAt, title, customerId: `${co.id}-c${i === 7 ? 0 : i}`, value: [24500, 42000, 18000, 12500, 8500, 36000, 14000, 22000][i] * (c + 1), probability: [70, 95, 40, 55, 20, 100, 15, 30][i], stage, closeDate: today(7 + i * 3), assigned: staff[i % 3], history: [{ at: createdAt, text: `Opportunity created · probability ${[70, 95, 40, 55, 20, 100, 15, 30][i]}%` }] });
    });
    for (let i = 0; i < 7; i++) state.records.meetings.push({ ...base(i), id: `${co.id}-m${i}`, customerId: `${co.id}-c${i === 6 ? 0 : i}`, opportunityId: `${co.id}-o${i === 6 ? 0 : i}`, title: purposes[i], purpose: purposes[i], date: today([0, 0, 1, 1, 4, -2, -5][i]), time: ["10:00", "14:30", "11:00", "15:00", "09:30", "12:00", "16:00"][i], status: i > 4 ? "Completed" : "Scheduled", assigned: staff[i % 3], location: "Customer office, Dubai", reminder: "One day before", notes: i > 4 ? "Discussed specifications. Customer requested a revised proposal." : "Review requirements and agree next steps.", outcome: i > 4 ? "Needs Follow-up" : undefined, history: [{ at: base(i).createdAt, text: i > 4 ? "Meeting completed · needs follow-up" : "Meeting scheduled" }] });
    for (let i = 0; i < 4; i++) {
      state.records.quotations.push({ ...base(i), id: `${co.id}-q${i}`, title: `QT-${c + 1}0${i + 1} · ${titles[c][i]}`, customerId: `${co.id}-c${i}`, opportunityId: `${co.id}-o${i}`, status: ["Under Review", "Approved", "Draft", "Sent"][i], items: [{ description: titles[c][i], quantity: 500, price: 42 + i * 8 }], discount: 500, tax: 5, history: [{ at: base(i).createdAt, text: `Quotation ${["under review", "approved", "drafted", "sent"][i]}` }] });
      const stage = co.workflow[[c === 0 ? 3 : 4, 5, 2, c === 0 ? 2 : 3][i]];
      state.records.orders.push({ ...base(i), id: `${co.id}-r${i}`, title: titles[c][i], customerId: `${co.id}-c${i}`, opportunityId: `${co.id}-o${i}`, stage, value: (21000 + i * 3000) * (c + 1), quantity: 500 + i * 250, product: titles[c][i], approval: i === 3 ? "Revision Requested" : i === 1 ? "Approved" : "Pending Approval", files: c === 2 ? [] : [{ name: "concept-v1.svg", size: 220, type: "image/svg+xml", version: 1, at: base(i).createdAt }], material: "FSC-certified paperboard", packagingType: "Rigid box", dimensions: "240 × 180 × 80 mm", printing: "Two-color logo with matte finish", sample: "Physical sample required", location: "Jumeirah project site, Dubai", deadline: today(8 + i), production: i === 1 ? "In progress" : "Not started", supplier: "Northstar Trading (fictional)", supplierAmount: 18000, customerAmount: 26500, purchaseStatus: "Pending", deliveryStatus: "Not scheduled", deliveryDate: today(10 + i), designNotes: "Logo centered; confirm brand colors before production.", history: [{ at: base(i).createdAt, text: `Order created · ${stage}` }, { at: base(i).createdAt, text: i === 3 ? (c === 2 ? "Revision requested · Review material specifications" : "Revision requested · Adjust logo spacing") : (c === 2 ? "Supplier quotation recorded · awaiting client confirmation" : "Artwork submitted · version 1") }] });
      state.records.tasks.push({ ...base(i), id: `${co.id}-t${i}`, title: ["Confirm artwork feedback", "Call about delivery schedule", "Send revised quotation", "Check sample with customer"][i], customerId: `${co.id}-c${i}`, orderId: `${co.id}-r${i}`, relatedKind: "orders", relatedId: `${co.id}-r${i}`, date: today(i - 1), assigned: staff[i % 3], priority: i === 0 ? "High" : "Medium", status: "Pending", description: "Contact the customer and record the next step." });
    }
    kinds.forEach(kind => state.records[kind].filter(r => r.company === co.id).forEach(r => r.history.forEach(h => state.activity.push({ ...h, company: co.id, customerId: kind === "customers" ? r.id : r.customerId, kind, recordId: r.id }))));
  });
  state.activity.sort((a, b) => b.at.localeCompare(a.at));
  return state;
}
