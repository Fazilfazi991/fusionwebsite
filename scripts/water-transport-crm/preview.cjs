const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('sharp');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1360 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(process.env.AQUAFLEET_URL || 'http://127.0.0.1:3211/water-transport-crm/index.html', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const output = path.resolve(__dirname, '../../public/images/business-software/water-transport-crm/dashboard-preview.webp');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    await sharp(await page.screenshot()).webp({ quality: 90 }).toFile(output);
    console.log(output);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
