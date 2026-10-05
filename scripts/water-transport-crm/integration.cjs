const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BASE = process.env.SITE_URL || 'http://127.0.0.1:3210';
const root = path.resolve(__dirname, '../..'), evidence = process.env.EVIDENCE_DIR || path.join(os.tmpdir(), 'aquafleet-evidence');
function projects(text) { const module = { exports: {} }; new Function('exports', 'module', ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(module.exports, module); return module.exports.softwareProjects; }
let browser;
(async () => {
  fs.mkdirSync(evidence, { recursive: true });
  const current = projects(fs.readFileSync(path.join(root, 'app/business-software/softwareProjects.ts'), 'utf8'));
  // Works both before and after committing this feature.
  const previous = projects(execFileSync('git', ['show', 'codex/emerald-interlink-demo:app/business-software/softwareProjects.ts'], { cwd: root, encoding: 'utf8' }));
  assert.deepEqual(current.filter(p => p.slug !== 'water-transport-crm'), previous);
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto(BASE + '/CRM', { waitUntil: 'networkidle' }); await page.waitForURL('**/business-software');
  assert.equal(await page.locator('#projects article').count(), current.length);
  await page.getByRole('heading', { name: current.length + ' interactive CRM demos.', exact: true }).waitFor();
  const card = page.locator('#projects article').filter({ has: page.getByRole('heading', { name: 'AquaFleet CRM', exact: true }) });
  assert.equal(await card.count(), 1);
  const cta = card.getByRole('link', { name: 'View Demo', exact: true });
  assert.equal(await cta.getAttribute('href'), '/water-transport-crm/index.html');
  assert.equal(await card.locator('[data-demo-preview]').getAttribute('href'), '/water-transport-crm/index.html');
  await card.scrollIntoViewIfNeeded(); const img = card.locator('img'); await img.waitFor(); await page.waitForFunction(() => { const image = document.querySelector('[data-demo-preview=water-transport-crm] img'); return image && image.complete && image.naturalWidth > 0; }); assert.ok(await img.evaluate(el => el.complete && el.naturalWidth > 0));
  await card.scrollIntoViewIfNeeded(); await card.screenshot({ path: path.join(evidence, 'portfolio-desktop.png') });
  await card.getByRole('button', { name: 'Explore Platform', exact: true }).click();
  const details = page.getByRole('dialog'); await details.getByRole('heading', { name: 'AquaFleet CRM', exact: true }).waitFor();
  assert.equal(await details.getByRole('link', { name: 'View Demo', exact: true }).getAttribute('href'), '/water-transport-crm/index.html');
  await page.getByRole('button', { name: 'Close software project details', exact: true }).click();
  const popup = page.waitForEvent('popup'); await cta.click(); const demo = await popup;
  await demo.waitForLoadState('networkidle'); await demo.getByRole('heading', { name: 'Operations overview', exact: true }).waitFor();
  assert.equal(await demo.locator('.kpi-grid .kpi').count(), 8); await demo.close();
  for (const width of [430, 390]) {
    await page.setViewportSize({ width, height: width === 430 ? 932 : 844 }); await card.scrollIntoViewIfNeeded();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await card.screenshot({ path: path.join(evidence, `portfolio-${width}.png`) });
    await card.getByRole('button', { name: 'Explore Platform', exact: true }).click(); await details.getByRole('heading', { name: 'AquaFleet CRM', exact: true }).waitFor();
    assert.ok(await details.getByRole('link', { name: 'View Demo', exact: true }).isVisible());
    await page.getByRole('button', { name: 'Close software project details', exact: true }).click();
  }
  // Existing website and demo routes continue to serve their original content.
  for (const url of ['/', '/about', '/web-portfolio', '/blastline-crm/index.html', '/advertising-crm/index.html', '/medical-supply-crm/index.html', '/demo/emerald-interlink']) assert.ok((await page.request.get(BASE + url)).ok(), url);
  assert.deepEqual(errors, []);
  const result = { site: BASE, portfolioCount: current.length, unchangedExistingEntries: previous.length, redirect: '/CRM → /business-software', image: 'Loaded WebP preview', cta: 'View Demo opens actual working demo', widths: [1440, 430, 390], browserErrors: errors, existingRoutes: '7 passed' };
  fs.writeFileSync(path.join(evidence, 'integration.json'), JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch(async error => { console.error(error); if (browser) await browser.close(); process.exitCode = 1; });
