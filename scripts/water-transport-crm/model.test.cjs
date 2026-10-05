const { test } = require('node:test');
const assert = require('node:assert/strict');
const M = require('../../public/water-transport-crm/model.js');
const input = overrides => ({ customer: 'CU-101', vehicle: 'V1', driver: 'D1', source: 'S1', quantity: 5000, destination: 'Dubai Investment Park', date: M.TODAY, time: '14:30', amount: 550, paymentType: 'Credit', fuelEstimate: 95, notes: 'Test delivery', ...overrides });
const costs = { fuelLitres: 32, fuelCost: 95, driverCost: 40, otherCost: 0 };
function deliver(s, t) { M.advance(s, t.id); M.recordCosts(s, t.id, costs); M.advance(s, t.id); M.advance(s, t.id); }

test('fictional seed contains 36 connected trips and the exact AED 205 walkthrough', () => {
  const s = M.seed(), t = s.trips.find(t => t.id === 'TR-1058');
  assert.equal(s.trips.length, 36); assert.equal(s.customers.length, 9); assert.equal(s.vehicles.length, 3);
  assert.equal(M.cost(t), 345); assert.equal(M.profit(t), 205); assert.equal(M.outstanding(t), 550);
  assert.equal(s.ledger.filter(l => l.trip === t.id).length, 1);
});
test('vehicle results reconcile with financial and expense totals', () => {
  const s = M.seed(), all = M.metrics(s);
  for (const key of ['revenue', 'operating', 'fuel', 'litres', 'water', 'driver', 'other', 'profit']) assert.equal(M.sum(s.vehicles, v => M.metrics(s, M.MONTH, t => t.vehicle === v.id)[key]), all[key], key);
  assert.equal(M.sum(M.expenseRows(s).filter(e => e.date.startsWith(M.MONTH)), e => e.amount), all.operating);
  assert.equal(all.revenue - all.operating, all.profit);
});
test('ledger running balances reconcile and never double debit a load', () => {
  const s = M.seed();
  for (const source of s.sources) {
    let balance = source.opening;
    for (const l of s.ledger.filter(l => l.source === source.id)) { assert.equal(l.before, balance); balance += l.amount; assert.equal(l.after, balance); }
    assert.equal(M.sourceBalance(s, source.id), balance);
  }
  const t = M.createTrip(s, input()), before = M.sourceBalance(s, 'S1');
  M.advance(s, t.id); assert.equal(M.sourceBalance(s, 'S1'), before - 210);
  assert.throws(() => M.advance(s, t.id), /actual fuel/);
  M.recordCosts(s, t.id, costs); M.advance(s, t.id); M.advance(s, t.id); M.advance(s, t.id);
  assert.equal(M.sourceBalance(s, 'S1'), before - 210);
  assert.equal(s.ledger.filter(l => l.trip === t.id).length, 1);
});
test('full credit journey recognizes once, updates all aggregates and releases fleet', () => {
  const s = M.seed(), before = M.metrics(s), c0 = M.metrics(s, M.MONTH, t => t.customer === 'CU-101'), t = M.createTrip(s, input());
  assert.equal(M.vehicleStatus(s, 'V1'), 'Assigned'); assert.equal(M.driverStatus(s, 'D1'), 'On Trip');
  assert.equal(M.metrics(s).revenue, before.revenue); assert.equal(M.metrics(s).outstanding, before.outstanding);
  deliver(s, t); M.advance(s, t.id);
  assert.equal(M.metrics(s).revenue - before.revenue, 550);
  assert.equal(M.metrics(s).operating - before.operating, 345);
  assert.equal(M.metrics(s).profit - before.profit, 205);
  assert.equal(M.metrics(s, M.MONTH, t => t.customer === 'CU-101').outstanding - c0.outstanding, 550);
  assert.equal(M.vehicleStatus(s, 'V1'), 'Available');
  M.collect(s, t.id, 200, 'PART-1'); assert.equal(M.paymentStatus(t), 'Partially Paid'); assert.equal(M.outstanding(t), 350);
  M.collect(s, t.id, 350, 'FINAL-1'); assert.equal(M.paymentStatus(t), 'Paid');
  assert.equal(M.metrics(s).revenue, before.revenue + 550);
  assert.throws(() => M.collect(s, t.id, 1, 'OVER'), /exceeds/);
});
test('cash closure requires a full receipt and overdue status changes after payment', () => {
  const s = M.seed(), t = M.createTrip(s, input({ paymentType: 'Cash', customer: 'CU-102' }));
  deliver(s, t); assert.throws(() => M.advance(s, t.id), /cash balance/);
  M.collect(s, t.id, 550, 'CASH'); M.advance(s, t.id); assert.equal(t.status, 'Completed');
  const late = s.trips.find(t => M.paymentStatus(t) === 'Overdue');
  assert.ok(late); M.collect(s, late.id, M.outstanding(late), 'LATE'); assert.equal(M.paymentStatus(late), 'Paid');
});
test('insufficient balance prevents loading without changing any state', () => {
  const s = M.seed(), t = M.createTrip(s, input());
  s.sources[0].opening -= M.sourceBalance(s, 'S1') - 100;
  const before = JSON.stringify(s); assert.throws(() => M.advance(s, t.id), /Insufficient/); assert.equal(JSON.stringify(s), before);
  M.recharge(s, 'S1', { amount: 1000, date: M.TODAY, reference: 'TOPUP', notes: '' });
  M.advance(s, t.id); assert.equal(M.sourceBalance(s, 'S1'), 890);
});
test('recharge changes prepaid balance without changing earned profit', () => {
  const s = M.seed(), m = M.metrics(s), before = M.sourceBalance(s, 'S2');
  M.recharge(s, 'S2', { amount: 2000, date: M.TODAY, reference: 'RC-TEST', notes: '' });
  assert.equal(M.sourceBalance(s, 'S2'), before + 2000); assert.deepEqual(M.metrics(s), m);
  assert.throws(() => M.recharge(s, 'S2', { amount: 100, date: '2026-10-01', reference: 'BACKDATED' }), /latest/);
});
test('capacity, assignment, dates, expense category and numeric guards reject invalid actions', () => {
  const s = M.seed();
  assert.throws(() => M.createTrip(s, input({ quantity: 10000 })), /capacity/);
  assert.throws(() => M.createTrip(s, input({ vehicle: 'V2', driver: 'D2' })), /assigned/);
  assert.throws(() => M.createTrip(s, input({ date: '2026-10-00' })));
  assert.throws(() => M.createTrip(s, input({ amount: NaN })), /valid/);
  assert.throws(() => M.collect(s, 'TR-1055', 200, 'EARLY'), /delivered/);
  assert.throws(() => M.addExpense(s, { vehicle: 'V1', category: 'Fuel', amount: 10, date: M.TODAY, description: 'Duplicate' }), /trip workflow/);
  const future = M.createTrip(s, input({ date: '2026-10-06' })); assert.throws(() => M.advance(s, future.id), /future booking/);
});
test('actual trip costs are recorded once; fuel litres and amount are consistent', () => {
  const s = M.seed(), t = M.createTrip(s, input()); M.advance(s, t.id);
  assert.throws(() => M.recordCosts(s, t.id, { ...costs, fuelLitres: 0 }), /both/);
  M.recordCosts(s, t.id, costs); assert.throws(() => M.recordCosts(s, t.id, costs), /once/);
  assert.equal(M.expenseRows(s).filter(e => e.trip === t.id).length, 3);
});
test('fleet expense updates tanker and 50/50 allocation without changing trip costs', () => {
  const s = M.seed(), before = M.metrics(s, M.MONTH, t => t.vehicle === 'V3'), tripCost = M.sum(s.trips, M.cost);
  M.addExpense(s, { vehicle: 'V3', category: 'Maintenance', date: M.TODAY, amount: 100, description: 'Pump service' });
  const after = M.metrics(s, M.MONTH, t => t.vehicle === 'V3'); assert.equal(after.profit, before.profit - 100); assert.equal(after.profit * .5, before.profit * .5 - 50);
  assert.equal(M.sum(s.trips, M.cost), tripCost);
});
