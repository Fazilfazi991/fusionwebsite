// Derive only the new collection previews; preserve every incumbent preview.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const evidence = process.env.EVIDENCE_DIR || path.resolve(root, '../evidence/advertising');
(async () => {
  const directory = path.join(root, 'public/images/business-software/advertising-crm');
  fs.mkdirSync(directory, { recursive: true });
  for (const [source, target] of [['advertising-desktop.png', 'dashboard.webp'], ['advertising-customer.png', 'customer.webp']]) {
    await sharp(path.join(evidence, source)).resize({ width: 1440, height: 900, fit: 'cover', position: 'top' }).webp({ quality: 88 }).toFile(path.join(directory, target));
    console.log('Created AdWorks ' + target);
  }
})().catch(error => { console.error(error); process.exit(1); });
