// Derive only Blastline's new collection previews from actual acceptance captures.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const evidence = process.env.EVIDENCE_DIR || path.resolve(root, '../evidence/blastline');
(async () => {
  const directory = path.join(root, 'public/images/business-software/blastline-crm');
  fs.mkdirSync(directory, { recursive: true });
  for (const [source, target] of [['blastline-desktop-seed.png', 'dashboard.webp'], ['blastline-customer.png', 'customer.webp']]) {
    await sharp(path.join(evidence, source)).resize({ width: 1440, height: 900, fit: 'cover', position: 'top' }).webp({ quality: 88 }).toFile(path.join(directory, target));
    console.log('Created Blastline ' + target);
  }
})().catch(error => { console.error(error); process.exit(1); });
