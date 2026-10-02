const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const evidence = process.env.EVIDENCE_DIR || path.resolve(root, '../evidence');
(async () => {
  for (const slug of ['ac-parts-crm', 'medical-supply-crm']) {
    const directory = path.join(root, 'public/images/business-software', slug);
    fs.mkdirSync(directory, { recursive: true });
    await sharp(path.join(evidence, slug + '-desktop.png')).resize({ width: 1440, height: 900, fit: 'cover', position: 'top' }).webp({ quality: 88 }).toFile(path.join(directory, 'dashboard.webp'));
    console.log('Created ' + slug + ' dashboard preview');
  }
})().catch(error => { console.error(error); process.exit(1); });
