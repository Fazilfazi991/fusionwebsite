const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
const base = process.env.SITE_URL || 'http://127.0.0.1:3210';
const evidence = process.env.EVIDENCE_DIR || path.resolve(root, '../evidence');
const newDemos = [['ac-parts-crm', 'ColdFlow'], ['medical-supply-crm', 'MedSupply'], ['construction-crm', 'Construction Desk']];
function projects(source) {
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', output)(module.exports, module);
  return module.exports.softwareProjects;
}
(async () => {
  const original = projects(execFileSync('git', ['show', '9e6ed6fded4971c8aac761e48febf18725bf545c:app/business-software/softwareProjects.ts'], { cwd: root, encoding: 'utf8' }));
  const current = projects(fs.readFileSync(path.join(root, 'app/business-software/softwareProjects.ts'), 'utf8'));
  assert.equal(current.length, 10);
  assert.deepEqual(current.slice(3), original, 'All seven original project entries must remain identical');
  const prior = projects(execFileSync('git', ['show', 'e25f54e905c6f2427d1d0eb356ae43c86fe0fa54:app/business-software/softwareProjects.ts'], { cwd: root, encoding: 'utf8' }));
  assert.deepEqual(current.slice(0, 2), prior.slice(0, 2), 'The two newly published trading cards must remain identical');
  fs.mkdirSync(evidence, { recursive: true });
  const browser = process.env.CDP_URL ? await chromium.connectOverCDP(process.env.CDP_URL) : await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const result = { base, at: new Date().toISOString(), originalEntriesUnchanged: true, checks: [], pageErrors };
  const response = await page.goto(base + '/CRM', { waitUntil: 'networkidle' });
  assert(response && [200, 307, 308].includes(response.status()), '/CRM serves a valid collection response or redirect');
  await page.waitForURL('**/business-software');
  assert((await page.request.get(base + '/business-software')).ok(), 'The redirected collection returns 200');
  assert(new URL(page.url()).pathname === '/business-software', '/CRM redirects to the existing collection');
  assert.equal(await page.locator('#projects article').count(), 10);
  await page.getByRole('heading', { name: 'Ten systems. Ten distinct operating realities.' }).waitFor();
  for (const [slug, title] of newDemos) {
    const card = page.locator('#projects article').filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    assert.equal(await card.count(), 1);
    assert.equal(await card.locator('a').getAttribute('href'), '/' + slug + '/index.html');
    await card.getByRole('button', { name: 'Explore Platform' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('heading', { name: title, exact: true }).waitFor();
    assert.equal(await dialog.locator('a[href="/' + slug + '/index.html"]').count(), 1);
    await page.getByRole('button', { name: 'Close software project details' }).click();
    assert.equal(await page.getByRole('dialog').count(), 0);
    result.checks.push('Collection card and detail navigation: ' + title);
  }
  for (const [slug, title] of newDemos) {
    const demoResponse = await page.goto(base + '/' + slug + '/index.html', { waitUntil: 'networkidle' });
    assert(demoResponse && demoResponse.ok(), slug + ' returns 200');
    await page.evaluate(() => document.fonts.ready);
    assert((await page.locator('body').innerText()).toLowerCase().includes(title.toLowerCase()));
    assert((await page.locator('body').innerText()).length > 1000, slug + ' renders real dashboard content');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), slug + ' desktop overflow');
    await page.screenshot({ path: path.join(evidence, slug + '-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(evidence, slug + '-mobile.png'), fullPage: true });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), slug + ' mobile overflow');
    await page.setViewportSize({ width: 1440, height: 1050 });
    result.checks.push('Signed-out desktop/mobile dashboard and overflow: ' + title);
  }
  for (const project of original) {
    const target = new URL(project.demoUrl, base).href;
    const demoResponse = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 60000 });
    assert(demoResponse && demoResponse.ok(), project.title + ' public route returns 200');
    await page.locator('body').waitFor();
    await page.waitForFunction(() => document.body.innerText.trim().length > 120, null, { timeout: 20000 });
    assert((await page.locator('body').innerText()).length > 120, project.title + ' renders content');
    result.checks.push('Existing demo route smoke: ' + project.title);
  }
  assert.deepEqual(pageErrors, []);
  result.passed = true;
  fs.writeFileSync(path.join(evidence, /https:/.test(base) ? 'live-integration.json' : 'local-integration.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
