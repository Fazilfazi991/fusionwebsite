const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

const projects = [
  ["harven-llc", "https://harvenllc.com"],
  ["boat-seafood", "https://boatseafood.com"],
  ["pet-basket-store", "https://pet-basket-store.vercel.app/"],
  ["hydrelle-skincare", "https://www.hydrelleskincare.com/"],
  ["vlearns-educations", "https://www.vlearnseducations.com/"],
  ["bwmc", "https://bwmc.ae"],
  ["miracle-designs-boutique", "https://miracledesignsboutique.com/"],
  ["ecom-sigma", "https://ecom-pied-sigma.vercel.app/"],
  ["perfect-line", "https://perfectline-web.vercel.app/"],
  ["lumora", "https://lumora-rho-jet.vercel.app/"],
  ["biznecto", "https://biznecto.com"],
  ["desert-gp", "https://desertgp.com"],
  ["stepvision-hotel-supplies", "https://stepvisionhotelsupplies.com"],
  ["n-universal-yoga", "https://nuniversalyoga.ae"],
  ["taj", "https://taj-xi.vercel.app/"],
  ["aqsa-print", "https://aqsaprint.com"],
  ["worn-soul", "https://worn-soul.vercel.app/"]
];

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "images", "web-portfolio");
const tmpDir = path.join(outputDir, ".tmp");
const viewport = "1440,900";

function findChrome() {
  const chrome = chromeCandidates.find((candidate) => fs.existsSync(candidate));

  if (!chrome) {
    throw new Error(
      "Chrome or Edge was not found. Set CHROME_PATH to a Chromium-based browser executable."
    );
  }

  return chrome;
}

async function captureProject(chromePath, slug, url) {
  const pngPath = path.join(tmpDir, `${slug}.png`);
  const webpPath = path.join(outputDir, `${slug}.webp`);
  const shouldForce = process.env.CAPTURE_FORCE === "1";

  if (!shouldForce && fs.existsSync(webpPath)) {
    const sizeKb = Math.round(fs.statSync(webpPath).size / 1024);
    return { webpPath, sizeKb, skipped: true };
  }

  fs.rmSync(pngPath, { force: true });

  const result = spawnSync(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-default-browser-check",
      "--ignore-certificate-errors",
      "--timeout=20000",
      "--virtual-time-budget=12000",
      `--window-size=${viewport}`,
      `--screenshot=${pngPath}`,
      url
    ],
    { encoding: "utf8", timeout: 35000 }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0 || !fs.existsSync(pngPath)) {
    throw new Error((result.stderr || result.stdout || "Screenshot failed").trim());
  }

  await sharp(pngPath)
    .resize({ width: 1440, height: 900, fit: "cover", position: "top" })
    .webp({ quality: 82, effort: 5 })
    .toFile(webpPath);

  const sizeKb = Math.round(fs.statSync(webpPath).size / 1024);
  return { webpPath, sizeKb };
}

async function main() {
  const chromePath = findChrome();
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const failed = [];
  console.log(`Using browser: ${chromePath}`);
  console.log(`Saving screenshots to: ${outputDir}`);

  for (const [slug, url] of projects) {
    try {
      const { sizeKb, skipped } = await captureProject(chromePath, slug, url);
      console.log(`${skipped ? "skip" : "ok  "} ${slug}.webp (${sizeKb} KB)`);
    } catch (error) {
      failed.push({ slug, url, error: error.message });
      console.log(`fail ${slug}: ${error.message}`);
    }
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });

  if (failed.length) {
    console.log("\nFailed captures:");
    failed.forEach(({ slug, url, error }) => console.log(`- ${slug} (${url}): ${error}`));
    process.exitCode = 1;
  } else {
    console.log("\nAll screenshots captured.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
