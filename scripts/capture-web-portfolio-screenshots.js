const { spawn } = require("node:child_process");
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
const cardsDir = path.join(outputDir, "cards");
const fullDir = path.join(outputDir, "full");
const tmpDir = path.join(outputDir, ".tmp");

function findChrome() {
  const chrome = chromeCandidates.find((candidate) => fs.existsSync(candidate));
  if (!chrome) throw new Error("Chrome or Edge was not found. Set CHROME_PATH to its executable.");
  return chrome;
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForEndpoint(port) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await delay(100);
  }
  throw new Error("Browser debugging endpoint did not start.");
}

async function openTarget(port, url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, {
    method: "PUT"
  });
  if (!response.ok) throw new Error(`Unable to open browser target (${response.status}).`);
  return response.json();
}

function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  socket.binaryType = "arraybuffer";
  const pending = new Map();
  const listeners = new Map();
  let requestId = 0;

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", ({ data }) => {
    const payload = typeof data === "string" ? data : Buffer.from(data).toString("utf8");
    const message = JSON.parse(payload);
    if (message.method && listeners.has(message.method)) {
      listeners.get(message.method).forEach((listener) => listener(message.params ?? {}));
    }
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  return {
    ready,
    send(method, params = {}) {
      requestId += 1;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(requestId);
          reject(new Error(`${method} timed out.`));
        }, 30000);
        pending.set(requestId, {
          resolve: (result) => { clearTimeout(timer); resolve(result); },
          reject: (error) => { clearTimeout(timer); reject(error); }
        });
        socket.send(JSON.stringify({ id: requestId, method, params }));
      });
    },
    on(method, listener) {
      if (!listeners.has(method)) listeners.set(method, new Set());
      listeners.get(method).add(listener);
      return () => listeners.get(method)?.delete(listener);
    },
    close: () => socket.close()
  };
}

async function evaluate(cdp, expression, awaitPromise = true) {
  return cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true
  });
}

async function waitForNetworkIdle(cdp, idleTime = 1200, timeout = 60000) {
  let inflight = 0;
  let idleTimer;
  let timeoutTimer;
  let cleanup = () => {};

  return new Promise((resolve, reject) => {
    const finish = (callback) => {
      clearTimeout(idleTimer);
      clearTimeout(timeoutTimer);
      cleanup();
      callback();
    };
    const maybeIdle = () => {
      clearTimeout(idleTimer);
      if (inflight <= 0) idleTimer = setTimeout(() => finish(resolve), idleTime);
    };

    const offStarted = cdp.on("Network.requestWillBeSent", () => {
      inflight += 1;
      clearTimeout(idleTimer);
    });
    const offFinished = cdp.on("Network.loadingFinished", () => {
      inflight = Math.max(0, inflight - 1);
      maybeIdle();
    });
    const offFailed = cdp.on("Network.loadingFailed", () => {
      inflight = Math.max(0, inflight - 1);
      maybeIdle();
    });

    cleanup = () => {
      offStarted();
      offFinished();
      offFailed();
    };
    timeoutTimer = setTimeout(() => finish(resolve), timeout);
    maybeIdle();
  });
}

async function preparePageForCapture(cdp) {
  await evaluate(cdp, `(() => {
    const style = document.createElement("style");
    style.textContent = \`
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
      iframe[src*="chat"], iframe[src*="whatsapp"], [class*="chat"], [id*="chat"],
      [class*="cookie"], [id*="cookie"], [class*="whatsapp"], [id*="whatsapp"],
      [aria-label*="chat" i], [aria-label*="cookie" i] {
        display: none !important;
        visibility: hidden !important;
      }
    \`;
    document.head.appendChild(style);
  })();`);
}

async function triggerLazyLoading(cdp) {
  const heightResult = await evaluate(cdp, "Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)");
  const totalHeight = Math.min(Math.max(Math.ceil(heightResult.result.value || 900), 900), 12000);

  for (let y = 0; y < totalHeight; y += 700) {
    await evaluate(cdp, `window.scrollTo(0, ${y})`, false);
    await delay(250);
  }
  await evaluate(cdp, "window.scrollTo(0, 0)", false);
  await delay(800);
  return totalHeight;
}

async function captureProject(chromePath, slug, url, index) {
  const cardPath = path.join(cardsDir, `${slug}.webp`);
  const fullPath = path.join(fullDir, `${slug}.webp`);
  const shouldForce = process.env.CAPTURE_FORCE === "1";

  if (!shouldForce && fs.existsSync(cardPath) && fs.existsSync(fullPath)) {
    return { skipped: true };
  }

  const port = 9322 + index;
  const profileDir = path.join(tmpDir, `profile-${slug}`);
  const browserProcess = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--ignore-certificate-errors",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: "ignore" });

  let cdp;
  try {
    await waitForEndpoint(port);
    const target = await openTarget(port, url);
    cdp = createCdpClient(target.webSocketDebuggerUrl);
    await cdp.ready;
    await cdp.send("Page.enable");
    await cdp.send("Network.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `
        (() => {
          const style = document.createElement("style");
          style.textContent = "*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}";
          document.addEventListener("DOMContentLoaded", () => document.head.appendChild(style));
        })();
      `
    });
    await cdp.send("Page.navigate", { url });
    await waitForNetworkIdle(cdp, 1200, 60000);
    await delay(2500);
    await preparePageForCapture(cdp);

    const cardCapture = await cdp.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
    await sharp(Buffer.from(cardCapture.data, "base64"))
      .webp({ quality: 82, effort: 5 })
      .toFile(cardPath);

    const lazyLoadedHeight = await triggerLazyLoading(cdp);
    const metrics = await cdp.send("Page.getLayoutMetrics");
    const fullHeight = Math.min(Math.max(Math.ceil(metrics.cssContentSize.height), lazyLoadedHeight, 900), 12000);
    const fullCapture = await cdp.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: 1440, height: fullHeight, scale: 1 }
    });
    await sharp(Buffer.from(fullCapture.data, "base64"))
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(fullPath);

    return { fullHeight };
  } finally {
    try {
      await cdp?.send("Browser.close");
    } catch {}
    cdp?.close();
    browserProcess.kill();
    await delay(750);
    try {
      fs.rmSync(profileDir, { recursive: true, force: true });
    } catch {}
  }
}

async function main() {
  const chromePath = findChrome();
  [cardsDir, fullDir, tmpDir].forEach((directory) => fs.mkdirSync(directory, { recursive: true }));
  const failed = [];

  console.log(`Using browser: ${chromePath}`);
  for (let index = 0; index < projects.length; index += 1) {
    const [slug, url] = projects[index];
    try {
      const result = await captureProject(chromePath, slug, url, index);
      console.log(`${result.skipped ? "skip" : "ok  "} ${slug}${result.fullHeight ? ` (${result.fullHeight}px)` : ""}`);
    } catch (error) {
      failed.push({ slug, error: error.message });
      const cardPath = path.join(cardsDir, `${slug}.webp`);
      const fullPath = path.join(fullDir, `${slug}.webp`);
      if (fs.existsSync(cardPath) && !fs.existsSync(fullPath)) fs.copyFileSync(cardPath, fullPath);
      console.log(`fail ${slug}: ${error.message}`);
    }
  }

  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
  if (failed.length) {
    console.log("\nFailed captures (card image copied as the full-preview fallback):");
    failed.forEach(({ slug, error }) => console.log(`- ${slug}: ${error}`));
    process.exitCode = 1;
  } else {
    console.log("\nAll card and full-page screenshots captured.");
  }
}

const keepAlive = setInterval(() => {}, 1000);

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => clearInterval(keepAlive));
