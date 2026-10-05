const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const M = require('../../public/water-transport-crm/model.js');
const BASE = process.env.AQUAFLEET_URL || 'http://127.0.0.1:3211/water-transport-crm/index.html';
const evidence = process.env.EVIDENCE_DIR || path.join(os.tmpdir(), 'aquafleet-evidence');
const KEY = 'fusion-aquafleet-crm-v1';
let browser;
(async () => {
  fs.mkdirSync(evidence, { recursive: true });
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
  const page = await context.newPage(), errors = [], checks = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto(BASE, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready);
  const nav = async name => {
    if (await page.locator('.sidebar').isVisible()) await page.locator('.sidebar').getByRole('button', { name, exact: true }).click();
    else { await page.getByRole('button', { name: 'Menu', exact: true }).click(); await page.locator('#dialog').getByRole('button', { name, exact: true }).click(); }
  };
  const read = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);
  const dialog = page.locator('#dialog');
  const close = async () => page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  assert.equal(await page.locator('.kpi-grid .kpi').count(), 8);
  assert.equal(await page.locator('[role=img]').count(), 4);
  await page.screenshot({ path: path.join(evidence, 'dashboard-desktop.png'), fullPage: true });
  checks.push('Dashboard: eight KPIs, five daily trips, four data charts');
  await page.getByRole('button', { name: 'Open walkthrough', exact: true }).click();
  assert.match(await dialog.innerText(), /AED 205/); assert.match(await dialog.innerText(), /AED 345/); await close();

  // Create a credit trip through actual UI controls and complete its operating lifecycle.
  await page.getByRole('button', { name: 'New trip', exact: true }).click();
  assert.equal(await dialog.locator('[name=driver]').inputValue(), 'D1');
  await dialog.locator('[name=notes]').fill('Acceptance <script>window.bad=true</script> · east gate');
  await dialog.getByRole('button', { name: 'Create & assign trip', exact: true }).click();
  await dialog.getByRole('heading', { name: 'TR-1059 · Water delivery' }).waitFor();
  let s = await read(), initial = M.seed();
  assert.equal(s.trips.length, 37); assert.equal(M.metrics(s).revenue, M.metrics(initial).revenue);
  const source0 = M.sourceBalance(s, 'S1');
  await dialog.getByRole('button', { name: 'Load water & debit source', exact: true }).click();
  s = await read(); assert.equal(M.sourceBalance(s, 'S1'), source0 - 210);
  await dialog.getByRole('button', { name: 'Dispatch tanker', exact: true }).click();
  await dialog.locator('.form-error').getByText(/actual fuel/).waitFor();
  await dialog.getByRole('button', { name: 'Record fuel & costs', exact: true }).click();
  await dialog.locator('[name=fuelLitres]').fill('32'); await dialog.locator('[name=fuelCost]').fill('95'); await dialog.locator('[name=driverCost]').fill('40');
  await dialog.getByRole('button', { name: 'Save actual costs', exact: true }).click();
  await dialog.getByRole('button', { name: 'Dispatch tanker', exact: true }).click();
  await dialog.getByRole('button', { name: 'Confirm delivery', exact: true }).click();
  await dialog.getByRole('button', { name: 'Complete trip', exact: true }).click();
  s = await read(); assert.equal(M.metrics(s).revenue - M.metrics(initial).revenue, 550); assert.equal(M.metrics(s).profit - M.metrics(initial).profit, 205);
  assert.equal(M.outstanding(s.trips.at(-1)), 550); assert.equal(s.ledger.filter(l => l.trip === 'TR-1059').length, 1);
  assert.equal(await page.evaluate(() => window.bad), undefined);
  await dialog.getByRole('button', { name: 'Record collection', exact: true }).click();
  await dialog.locator('[name=amount]').fill('200'); await dialog.locator('[name=reference]').fill('PARTIAL-UI');
  await dialog.getByRole('button', { name: 'Save collection', exact: true }).click();
  assert.match(await dialog.innerText(), /Partially Paid/); assert.equal(M.outstanding((await read()).trips.at(-1)), 350);
  await close(); checks.push('Complete credit journey, once-only source debit, actual costs, partial receipt, escaping');

  await nav('Trips'); await page.getByRole('searchbox', { name: 'Search trips', exact: true }).fill('TR-1059');
  assert.equal(await page.locator('tbody tr').count(), 1);
  await page.locator('[data-filter=status]').selectOption('Scheduled'); assert.match(await page.locator('tbody').innerText(), /No records/);
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  for (const [key, value] of [['vehicle', 'V1'], ['driver', 'D1'], ['customer', 'CU-101'], ['paymentType', 'Credit']]) await page.locator(`[data-filter=${key}]`).selectOption(value);
  await page.locator('[data-filter=date]').fill(M.TODAY);
  assert.equal(await page.locator('tbody tr').count(), 2); checks.push('Trip search and all seven operational filters');
  await nav('Customers'); await page.getByRole('button', { name: 'Al Noor Contracting LLC', exact: true }).click();
  assert.match(await dialog.innerText(), /Credit limit/); assert.match(await dialog.innerText(), /TR-1059/); assert.match(await dialog.innerText(), /PARTIAL-UI/); await close();
  await nav('Vehicles'); await page.getByRole('button', { name: 'Vehicle analytics', exact: true }).first().click();
  assert.match(await dialog.innerText(), /Fuel monitoring/); assert.match(await dialog.innerText(), /TR-1059/); await close();
  await nav('Drivers'); await page.getByRole('button', { name: 'Shabeer', exact: true }).click(); assert.match(await dialog.innerText(), /Driver Payment Earned/); await close();
  checks.push('Customer 360, vehicle analytics and driver details share the updated trip');

  await nav('Water Source'); const balance0 = M.sourceBalance(await read(), 'S1');
  await page.locator('.page-head').getByRole('button', { name: 'Recharge account', exact: true }).click();
  await dialog.locator('[name=amount]').fill('2000'); await dialog.locator('[name=reference]').fill('UI-RECHARGE');
  await dialog.getByRole('button', { name: 'Post recharge', exact: true }).click();
  assert.equal(M.sourceBalance(await read(), 'S1'), balance0 + 2000); assert.match(await page.locator('tbody').innerText(), /UI-RECHARGE/);
  await page.getByRole('button', { name: 'View ledger', exact: true }).nth(1).click(); assert.match(await page.locator('tbody').innerText(), /Sharjah 3 80314/);
  await nav('Payments');
  for (const name of ['Cash', 'Credit', 'Outstanding', 'Paid', 'Overdue', 'All']) {
    await page.locator('.tabs').getByRole('button', { name, exact: true }).click();
    assert.ok(await page.locator('.panel').first().locator('tbody tr').count() > 0);
    if (['Cash', 'Credit'].includes(name)) assert.ok((await page.locator('.panel').first().locator('tbody tr').allTextContents()).every(text => text.includes(name)));
  }
  await nav('Expenses'); await page.locator('[data-filter=category]').selectOption('Fuel');
  assert.ok((await page.locator('tbody tr').allTextContents()).every(text => text.includes('Fuel')));
  await page.locator('.page-head').getByRole('button', { name: 'Add expense', exact: true }).click();
  await dialog.locator('[name=amount]').fill('100'); await dialog.locator('[name=vehicle]').selectOption('V3'); await dialog.locator('[name=description]').fill('Acceptance pump service');
  await dialog.getByRole('button', { name: 'Save fleet expense', exact: true }).click();
  assert.ok((await read()).expenses.some(e => e.description === 'Acceptance pump service'));
  await nav('Partners'); assert.match(await page.locator('main').innerText(), /Partner · 50%/); assert.match(await page.locator('main').innerText(), /Company · 50%/);
  await nav('Reports');
  for (const name of ['Fleet Performance', 'Fuel Report', 'Customer Report', 'Driver Report', 'Financial Report', 'Government Account']) {
    await page.getByRole('button', { name, exact: true }).click();
    const download = page.waitForEvent('download'); await page.getByRole('button', { name: 'Export CSV', exact: true }).click();
    const file = await download; assert.match(file.suggestedFilename(), /^aquafleet-.*\.csv$/);
  }
  checks.push('Water ledger, recharge, collection filters, expenses, 50/50 split and six CSV reports');
  await page.reload({ waitUntil: 'networkidle' }); assert.equal((await read()).trips.length, 37);
  assert.ok((await read()).receipts.some(r => r.reference === 'PARTIAL-UI')); checks.push('Browser-local persistence after reload');

  // All requested widths: every module, contained tables, usable mobile navigation and forms.
  for (const width of [1920, 1440, 1280, 1024, 768, 430, 390]) {
    await page.setViewportSize({ width, height: width === 430 ? 932 : width === 390 ? 844 : 1100 });
    for (const name of ['Dashboard', 'Trips', 'Customers', 'Vehicles', 'Drivers', 'Water Source', 'Payments', 'Expenses', 'Partners', 'Reports']) {
      await nav(name);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name} overflows at ${width}`);
      assert.ok((await page.locator('h1').innerText()).length > 0);
    }
    await nav('Dashboard'); await page.getByRole('button', { name: 'New trip', exact: true }).click();
    assert.ok(await dialog.isVisible());
    assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1), `Trip form overflows at ${width}`);
    if (width <= 430) await page.screenshot({ path: path.join(evidence, `form-${width}.png`) });
    await page.keyboard.press('Escape'); assert.ok(!await dialog.isVisible());
    await page.getByRole('button', { name: 'Open walkthrough', exact: true }).click();
    assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1), `Detail overflows at ${width}`);
    if (width <= 430) await page.screenshot({ path: path.join(evidence, `detail-${width}.png`) });
    await close();
    await page.screenshot({ path: path.join(evidence, `dashboard-${width}.png`), fullPage: true });
  }
  checks.push('All 10 modules at 1920, 1440, 1280, 1024, 768, 430×932, 390×844; modal containment and Escape');
  // Cash journey on mobile: auto-switch customer terms and require collection before closure.
  await page.getByRole('button', { name: 'New trip', exact: true }).click(); await dialog.locator('[name=customer]').selectOption('CU-102');
  assert.equal(await dialog.locator('[name=paymentType]').inputValue(), 'Cash');
  await dialog.getByRole('button', { name: 'Create & assign trip', exact: true }).click();
  await dialog.getByRole('button', { name: 'Load water & debit source', exact: true }).click(); await dialog.getByRole('button', { name: 'Record fuel & costs', exact: true }).click();
  await dialog.getByRole('button', { name: 'Save actual costs', exact: true }).click(); await dialog.getByRole('button', { name: 'Dispatch tanker', exact: true }).click(); await dialog.getByRole('button', { name: 'Confirm delivery', exact: true }).click();
  await dialog.getByRole('button', { name: 'Complete trip', exact: true }).click(); assert.match(await dialog.locator('.form-error').innerText(), /cash balance/);
  await dialog.getByRole('button', { name: 'Record collection', exact: true }).click(); await dialog.locator('[name=reference]').fill('MOBILE-CASH'); await dialog.getByRole('button', { name: 'Save collection', exact: true }).click();
  await dialog.getByRole('button', { name: 'Complete trip', exact: true }).click(); assert.equal((await read()).trips.at(-1).status, 'Completed'); await close();
  checks.push('Mobile cash trip: terms auto-fill, collection gate, receipt and completion');
  await page.getByRole('button', { name: 'Menu', exact: true }).click(); await dialog.getByRole('button', { name: 'Reset demo', exact: true }).click(); await dialog.getByRole('button', { name: 'Reset demo data', exact: true }).click();
  assert.equal((await read()).trips.length, 36); checks.push('Reset restores only AquaFleet seed');
  assert.deepEqual(errors, []);
  const result = { base: BASE, checks, browserErrors: errors, responsiveWidths: [1920, 1440, 1280, 1024, 768, 430, 390] };
  fs.writeFileSync(path.join(evidence, 'acceptance.json'), JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch(async e => { console.error(e); if (browser) await browser.close(); process.exitCode = 1; });
