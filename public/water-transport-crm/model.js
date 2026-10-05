(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.AquaModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const TODAY = '2026-10-05', MONTH = '2026-10', PREVIOUS = '2026-09';
  const STATUSES = ['Scheduled', 'Assigned', 'Loading', 'In Transit', 'Delivered', 'Completed'];
  const round = n => Math.round(n * 100) / 100;
  const sum = (rows, fn) => round(rows.reduce((n, row) => n + fn(row), 0));
  const delivered = t => ['Delivered', 'Completed'].includes(t.status);
  const incurred = t => t.loaded;
  const cost = t => round((t.loaded ? t.waterCost : 0) + t.fuelCost + t.driverCost + t.otherCost);
  const outstanding = t => delivered(t) ? round(Math.max(0, t.amount - t.paid)) : 0;
  const profit = t => round((delivered(t) ? t.amount : 0) - cost(t));
  const due = (date, days) => { const d = new Date(date + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10); };
  const paymentStatus = t => !delivered(t) ? 'Not invoiced' : outstanding(t) === 0 ? 'Paid' : t.due < TODAY ? 'Overdue' : t.paid > 0 ? 'Partially Paid' : 'Outstanding';
  function vehicleStatus(state, id) {
    const v = state.vehicles.find(v => v.id === id);
    if (v.maintenance) return 'Maintenance';
    const live = state.trips.find(t => t.vehicle === id && !['Scheduled', 'Completed'].includes(t.status));
    return live ? (live.status === 'Assigned' ? 'Assigned' : 'On Trip') : 'Available';
  }
  function driverStatus(state, id) {
    return state.trips.some(t => t.driver === id && !['Scheduled', 'Completed'].includes(t.status)) ? 'On Trip' : 'Available';
  }
  function sourceBalance(state, id) { return state.sources.find(s => s.id === id).opening + sum(state.ledger.filter(l => l.source === id), l => l.amount); }
  function addLedger(state, source, amount, data) {
    const before = sourceBalance(state, source);
    state.ledger.push({ id: 'WS-' + (state.ledger.length + 1001), source, amount, before, after: round(before + amount), ...data });
  }
  function seed() {
    const names = ['Al Noor Contracting LLC', 'Golden Star Technical Services', 'Palm View Landscaping LLC', 'Bright Line Cleaning Services', 'Desert Gate Construction', 'Al Safa Labour Camp', 'Blue Horizon Maintenance', 'Emirates Garden Works', 'Oasis Site Services'];
    const locations = ['Dubai Investment Park', 'Al Quoz Industrial 3', 'Jumeirah Village Circle', 'Business Bay', 'Dubai South', 'Jebel Ali Industrial', 'Al Nahda, Sharjah', 'Mirdif', 'Al Warsan'];
    const contacts = ['Omar', 'Nadeem', 'Faisal', 'Zaid', 'Imran', 'Hassan', 'Adil', 'Salman', 'Rashid'];
    const s = {
      version: 1,
      customers: names.map((name, i) => ({ id: 'CU-' + (101 + i), name, location: locations[i], contact: contacts[i], phone: '+971 50 000 01' + String(i).padStart(2, '0'), type: [1, 3, 6].includes(i) ? 'Cash' : 'Credit', days: i === 4 ? 7 : 30, limit: i === 0 ? 8000 : 5000, notes: i === 0 ? 'Site supervisor requests a call on arrival. Deliver at the east gate.' : 'Fictional account for this operations demonstration.' })),
      vehicles: [
        { id: 'V1', plate: 'Dubai A 45821', capacity: 5000, driver: 'D1', ownership: 'Company', investment: 0 },
        { id: 'V2', plate: 'Dubai B 22194', capacity: 10000, driver: 'D2', ownership: 'Company', investment: 0 },
        { id: 'V3', plate: 'Sharjah 3 80314', capacity: 10000, driver: 'D3', ownership: '50/50 partnership', investment: 90000 }
      ],
      drivers: [{ id: 'D1', name: 'Shabeer', phone: '+971 50 000 0201', vehicle: 'V1' }, { id: 'D2', name: 'Rafiq', phone: '+971 50 000 0202', vehicle: 'V2' }, { id: 'D3', name: 'Niyas', phone: '+971 50 000 0203', vehicle: 'V3' }],
      sources: [{ id: 'S1', name: 'Government Filling Station 01', account: 'GW-483921', location: 'Al Qusais, Dubai', rate: 0.042, opening: 15000 }, { id: 'S2', name: 'Northern Water Station 02', account: 'NW-208416', location: 'Industrial Area, Sharjah', rate: 0.04, opening: 6000 }],
      partners: [{ id: 'P1', name: 'Abdul Rahman', vehicle: 'V3', share: 0.5 }],
      trips: [], receipts: [], ledger: [], expenses: []
    };
    for (let i = 0; i < 36; i++) {
      const vehicle = s.vehicles[i % 3], customer = s.customers[i % 9];
      const date = i < 14 ? '2026-09-' + String(12 + i).padStart(2, '0') : '2026-10-' + String(Math.min(5, 1 + Math.floor((i - 14) / 5))).padStart(2, '0');
      const qty = vehicle.capacity, source = vehicle.id === 'V3' ? 'S2' : 'S1';
      s.trips.push({ id: 'TR-' + (1023 + i), date, time: `${String(7 + i % 10).padStart(2, '0')}:30`, customer: customer.id, vehicle: vehicle.id, driver: vehicle.driver, source, destination: customer.location, quantity: qty, rate: qty === 5000 ? 110 : 90, amount: qty === 5000 ? 550 : 900, waterCost: round(qty * s.sources.find(x => x.id === source).rate), fuelEstimate: qty === 5000 ? 95 : 150, fuelLitres: qty === 5000 ? 32 : 50, fuelCost: qty === 5000 ? 95 : 150, driverCost: qty === 5000 ? 40 : 60, otherCost: i % 6 === 0 ? 15 : 0, paymentType: customer.type, paid: 0, due: due(date, customer.type === 'Cash' ? 0 : customer.days), status: 'Completed', loaded: true, costsRecorded: true, notes: 'Delivery acknowledged by the site supervisor.' });
    }
    Object.assign(s.trips[31], { date: TODAY, status: 'Scheduled', loaded: false, costsRecorded: false, fuelLitres: 0, fuelCost: 0, driverCost: 0, otherCost: 0, time: '16:00' });
    Object.assign(s.trips[32], { date: TODAY, vehicle: 'V3', driver: 'D3', source: 'S2', status: 'Assigned', loaded: false, costsRecorded: false, fuelLitres: 0, fuelCost: 0, driverCost: 0, otherCost: 0, time: '13:30', quantity: 10000, waterCost: 400 });
    Object.assign(s.trips[33], { date: TODAY, vehicle: 'V2', driver: 'D2', source: 'S1', status: 'In Transit', quantity: 10000, amount: 900, rate: 90, waterCost: 420, fuelEstimate: 150, fuelCost: 150, fuelLitres: 50, driverCost: 60, time: '11:45' });
    Object.assign(s.trips[34], { date: TODAY, vehicle: 'V1', driver: 'D1', source: 'S1', customer: 'CU-102', destination: locations[1], quantity: 5000, amount: 550, rate: 110, waterCost: 210, fuelEstimate: 95, fuelCost: 95, fuelLitres: 32, driverCost: 40, otherCost: 0, paymentType: 'Cash', due: TODAY, time: '09:00' });
    Object.assign(s.trips[35], { date: TODAY, vehicle: 'V1', driver: 'D1', source: 'S1', customer: 'CU-101', destination: locations[0], quantity: 5000, rate: 110, amount: 550, waterCost: 210, fuelCost: 95, fuelLitres: 32, driverCost: 40, otherCost: 0, paymentType: 'Credit', due: '2026-11-04', time: '07:30', notes: 'Walkthrough example: 5,000 L delivered to the east gate. AED 205 trip profit; AED 550 remains on credit.' });
    // Ledger order is chronological, including recharge before October loads.
    for (const t of s.trips) {
      if (t.date === '2026-10-01' && !s.ledger.some(l => l.type === 'Recharge')) addLedger(s, 'S1', 5000, { date: t.date, type: 'Recharge', reference: 'RC-1001', notes: 'Monthly account top-up', trip: '', vehicle: '', quantity: 0 });
      if (t.loaded) addLedger(s, t.source, -t.waterCost, { date: t.date, type: 'Load', trip: t.id, vehicle: t.vehicle, quantity: t.quantity, reference: t.id });
      if (delivered(t)) {
        t.paid = t.paymentType === 'Cash' || Number(t.id.slice(3)) % 3 === 0 ? t.amount : Number(t.id.slice(3)) % 4 === 0 ? 200 : 0;
        if (t.id === 'TR-1058') t.paid = 0;
        if (t.paid) s.receipts.push({ id: 'RCPT-' + (s.receipts.length + 1001), trip: t.id, customer: t.customer, amount: t.paid, date: t.date, reference: 'DEMO-' + t.id });
      }
    }
    s.expenses = [{ id: 'EX-1001', date: '2026-10-02', vehicle: 'V1', category: 'Maintenance', amount: 180, description: 'Pump seal replacement', trip: '' }, { id: 'EX-1002', date: '2026-10-03', vehicle: 'V2', category: 'Salik/Toll', amount: 48, description: 'Tanker route tolls', trip: '' }, { id: 'EX-1003', date: '2026-10-04', vehicle: 'V3', category: 'Parking', amount: 30, description: 'Filling station parking', trip: '' }, { id: 'EX-1004', date: '2026-09-18', vehicle: 'V3', category: 'Maintenance', amount: 240, description: 'Hose inspection', trip: '' }];
    return s;
  }
  function metrics(s, month = MONTH, predicate = () => true) {
    const trips = s.trips.filter(t => t.date.startsWith(month) && predicate(t));
    const extra = s.expenses.filter(e => e.date.startsWith(month) && predicate(e));
    const revenue = sum(trips.filter(delivered), t => t.amount), operating = sum(trips, cost) + sum(extra, e => e.amount);
    return { trips: trips.length, completed: trips.filter(t => t.status === 'Completed').length, revenue, operating: round(operating), profit: round(revenue - operating), fuel: sum(trips, t => t.fuelCost), litres: sum(trips, t => t.fuelLitres), water: sum(trips.filter(incurred), t => t.waterCost), driver: sum(trips, t => t.driverCost), other: sum(trips, t => t.otherCost) + sum(extra, e => e.amount), outstanding: sum(s.trips.filter(predicate), outstanding) };
  }
  function fail(message) { throw new Error(message); }
  const positive = (n, label, allowZero = false) => { if (!Number.isFinite(n) || (allowZero ? n < 0 : n <= 0) || n > 10000000) fail('Enter a valid ' + label + '.'); };
  const validDate = date => { if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date + 'T12:00:00Z').toISOString().slice(0, 10) !== date) fail('Enter a valid date.'); };
  function createTrip(s, data) {
    const customer = s.customers.find(x => x.id === data.customer), v = s.vehicles.find(x => x.id === data.vehicle), source = s.sources.find(x => x.id === data.source), driver = s.drivers.find(x => x.id === data.driver);
    if (!customer || !v || !source || !driver) fail('Choose a customer, vehicle, driver and source.');
    if (vehicleStatus(s, v.id) !== 'Available' || driverStatus(s, driver.id) !== 'Available') fail('That vehicle or driver is already assigned.');
    positive(data.quantity, 'water quantity'); positive(data.amount, 'trip amount'); positive(data.fuelEstimate, 'fuel estimate', true);
    if (data.quantity > v.capacity) fail('Water quantity exceeds the tanker capacity.');
    if (!data.destination.trim()) fail('Enter the delivery location.');
    if (!['Cash', 'Credit'].includes(data.paymentType)) fail('Select Cash or Credit.');
    validDate(data.date);
    if (data.date < TODAY) fail('New demo trips must be dated 5 October 2026 or later.');
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) fail('Enter a valid trip time.');
    const id = 'TR-' + (Math.max(...s.trips.map(t => Number(t.id.slice(3)))) + 1);
    const trip = { ...data, id, rate: round(data.amount / (data.quantity / 1000)), waterCost: round(data.quantity * source.rate), fuelLitres: 0, fuelCost: 0, driverCost: 0, otherCost: 0, paid: 0, loaded: false, costsRecorded: false, status: 'Assigned', due: due(data.date, data.paymentType === 'Cash' ? 0 : customer.days) };
    s.trips.push(trip); return trip;
  }
  function advance(s, id) {
    const t = s.trips.find(x => x.id === id); if (!t) fail('Trip not found.');
    const index = STATUSES.indexOf(t.status), next = STATUSES[index + 1];
    if (!next) fail('This trip is already completed.');
    if (t.date > TODAY) fail('This is a future booking. Operational steps are available on its delivery date.');
    if (next === 'Assigned' && (vehicleStatus(s, t.vehicle) !== 'Available' || driverStatus(s, t.driver) !== 'Available')) fail('Finish the current vehicle and driver assignment first.');
    if (next === 'Loading' && !t.loaded) {
      if (sourceBalance(s, t.source) < t.waterCost) fail('Insufficient water-source balance. Recharge the account before loading.');
      addLedger(s, t.source, -t.waterCost, { date: t.date, type: 'Load', trip: t.id, vehicle: t.vehicle, quantity: t.quantity, reference: t.id });
      t.loaded = true;
    }
    if (next === 'In Transit' && !t.costsRecorded) fail('Record the actual fuel and trip costs before dispatch.');
    if (next === 'Completed' && t.paymentType === 'Cash' && outstanding(t) > 0) fail('Collect the cash balance before closing this trip.');
    t.status = next; return t;
  }
  function recordCosts(s, id, data) {
    const t = s.trips.find(x => x.id === id);
    if (!t || t.status !== 'Loading' || t.costsRecorded) fail('Costs can be recorded once while the trip is loading.');
    ['fuelLitres', 'fuelCost', 'driverCost', 'otherCost'].forEach(key => positive(data[key], key, true));
    if ((data.fuelLitres > 0) !== (data.fuelCost > 0)) fail('Fuel litres and fuel cost must both be recorded.');
    Object.assign(t, data, { costsRecorded: true }); return t;
  }
  function collect(s, id, amount, reference, date = TODAY) {
    const t = s.trips.find(x => x.id === id); if (!t || !delivered(t)) fail('Only delivered trips can receive payment.');
    positive(amount, 'collection amount'); validDate(date);
    if (date < t.date || date > TODAY) fail('Collection date must be between delivery and the demo date.');
    if (amount > outstanding(t)) fail('The collection exceeds the outstanding balance.');
    if (!reference.trim()) fail('Enter a receipt reference.');
    t.paid = round(t.paid + amount);
    s.receipts.push({ id: 'RCPT-' + (s.receipts.length + 1001), trip: id, customer: t.customer, amount, reference, date });
  }
  function recharge(s, id, data) {
    if (!s.sources.some(x => x.id === id)) fail('Select a water-source account.');
    positive(data.amount, 'recharge amount'); validDate(data.date);
    const lastDate = s.ledger.filter(l => l.source === id).at(-1)?.date || '2026-09-01';
    if (data.date < lastDate) fail('Recharge date must follow the latest account transaction (' + lastDate + ').');
    if (data.date > TODAY) fail('Recharge cannot be posted after the demo date.');
    if (!data.reference.trim()) fail('Enter a recharge reference.');
    addLedger(s, id, data.amount, { ...data, type: 'Recharge', trip: '', vehicle: '', quantity: 0 });
  }
  function addExpense(s, data) {
    if (!s.vehicles.some(v => v.id === data.vehicle)) fail('Select a vehicle.');
    if (!['Maintenance', 'Salik/Toll', 'Parking', 'Other'].includes(data.category)) fail('Use the trip workflow to record fuel, water and driver costs.');
    positive(data.amount, 'expense amount'); validDate(data.date);
    if (data.date > TODAY) fail('Expenses cannot be posted after the demo date.');
    if (!data.description.trim()) fail('Enter an expense description.');
    s.expenses.push({ ...data, trip: '', id: 'EX-' + (s.expenses.length + 1001) });
  }
  function expenseRows(s) {
    return s.expenses.concat(s.trips.flatMap(t => [
      ...(t.loaded ? [{ category: 'Water Source', amount: t.waterCost }] : []),
      ...(t.fuelCost ? [{ category: 'Fuel', amount: t.fuelCost }] : []),
      ...(t.driverCost ? [{ category: 'Driver Payment', amount: t.driverCost }] : []),
      ...(t.otherCost ? [{ category: 'Other', amount: t.otherCost }] : [])
    ].map((e, i) => ({ ...e, id: t.id + '-' + i, date: t.date, trip: t.id, vehicle: t.vehicle, description: 'Actual cost · ' + t.id })))).sort((a, b) => b.date.localeCompare(a.date));
  }
  return { TODAY, MONTH, PREVIOUS, STATUSES, round, sum, cost, profit, outstanding, delivered, due, paymentStatus, seed, metrics, sourceBalance, vehicleStatus, driverStatus, createTrip, advance, recordCosts, collect, recharge, addExpense, expenseRows };
});
