const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
const base = process.env.SITE_URL || 'http://127.0.0.1:3213';
const evidence = process.env.EVIDENCE_DIR || path.resolve(root, '../evidence/crm-collection-followup');
function loadProjects(source) {
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', js)(module.exports, module);
  return module.exports.softwareProjects;
}
(async () => {
  const projects = loadProjects(fs.readFileSync(path.join(root, 'app/business-software/softwareProjects.ts'), 'utf8'));
  const prior = loadProjects(execFileSync('git', ['show', '9eef441:app/business-software/softwareProjects.ts'], { cwd: root, encoding: 'utf8' }));
  assert.deepEqual(projects, prior, 'All ten project records and destinations remain unchanged');
  fs.mkdirSync(evidence, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const report = { base, at: new Date().toISOString(), projectsUnchanged: true, checks: [], parentPageErrors: [] };
  try {
    for (const mode of ['desktop', 'mobile', 'keyboard']) {
      const context = await browser.newContext({ viewport: mode === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 1050 }, hasTouch: mode === 'mobile', reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', e => report.parentPageErrors.push(e.message));
      await page.goto(base + '/CRM', { waitUntil: 'networkidle' });
      await page.waitForURL('**/business-software');
      await page.getByRole('heading', { name: 'Explore our CRM demos.', exact: true }).waitFor();
      await page.getByRole('heading', { name: 'Ten interactive CRM demos.', exact: true }).waitFor();
      assert.equal(await page.locator('#projects article').count(), 10);
      await page.evaluate(() => document.fonts.ready);
      if (mode !== 'keyboard') await page.screenshot({ path: path.join(evidence, 'collection-' + mode + '.png') });
      const launch = async (link, project, surface) => {
        await link.scrollIntoViewIfNeeded();
        const image = link.locator('img');
        assert.equal(await image.count(), 1, project.title + ' has an actual screenshot');
        await image.evaluate(img => img.decode());
        assert.equal(await link.getAttribute('href'), project.demoUrl);
        assert.equal(await link.getAttribute('target'), '_blank');
        assert((await link.getAttribute('rel')).includes('noopener'));
        const target = new URL(project.demoUrl, base);
        if (mode === 'keyboard') {
          await link.focus();
          await page.keyboard.press('Tab');
          await page.keyboard.press('Shift+Tab');
          assert(await link.evaluate(el => el === document.activeElement && el.matches(':focus-visible')), 'Native keyboard focus is visible');
          if (project === projects[0] && surface === 'card') await page.screenshot({ path: path.join(evidence, 'collection-keyboard-focus.png') });
        }
        const opened = page.waitForEvent('popup');
        if (mode === 'keyboard') await page.keyboard.press('Enter');
        else if (mode === 'mobile') await image.tap();
        else await image.click();
        const popup = await opened;
        await popup.waitForLoadState('domcontentloaded');
        await popup.waitForFunction(() => document.body.innerText.trim().length > 120, null, { timeout: 30000 });
        const actual = new URL(popup.url());
        assert.equal(actual.origin, target.origin, project.title + ' destination origin');
        assert(actual.pathname.startsWith(target.pathname.replace(/\/$/, '')), project.title + ' destination route');
        assert.equal(await popup.evaluate(() => window.opener === null), true, 'New tab has no opener access');
        await popup.close();
        report.checks.push({ mode, surface, project: project.title, destination: target.href, passed: true });
      };
      for (const project of projects) {
        const card = page.locator('#projects article').filter({ has: page.getByRole('heading', { name: project.title, exact: true }) });
        await launch(card.locator('a[data-demo-preview]'), project, 'card');
        await card.getByRole('button', { name: 'Explore Platform' }).click();
        const dialog = page.getByRole('dialog');
        await launch(dialog.locator('a[data-demo-preview]'), project, 'detail');
        await page.getByRole('button', { name: 'Close software project details' }).click();
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), mode + ' has no document overflow');
        console.log('PASS ' + mode + ': ' + project.title + ' card/detail screenshot launches');
      }
      await context.close();
    }
    assert.deepEqual(report.parentPageErrors, []);
    assert.equal(report.checks.length, 60);
    report.passed = true;
    fs.writeFileSync(path.join(evidence, 'preview-links-' + (/https:/.test(base) ? 'live' : 'local') + '.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ passed: true, launches: report.checks.length, evidence }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
