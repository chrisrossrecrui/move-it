#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { chromium } from "playwright";

const args = process.argv.slice(2);
function flag(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}
const base = flag("--url", "http://127.0.0.1:8080").replace(/\/$/, "");
const outDir = flag("--out", "/tmp/visual");
const baselineDir = flag("--baseline", ".github/visual");
const enforce = args.includes("--enforce");
const writeBaseline = args.includes("--write-baseline");
const ceiling = 0.003;

const shots = [
  { name: "home-desktop", path: "/", width: 1280, height: 900 },
  { name: "home-mobile", path: "/", width: 390, height: 844 },
  { name: "thanks-desktop", path: "/thank-you", width: 1280, height: 900 },
];

mkdirSync(outDir, { recursive: true });
if (writeBaseline) mkdirSync(baselineDir, { recursive: true });

function maskDates(page, path) {
  return page.evaluate((route) => {
    if (route !== "/thank-you") return;
    document.querySelectorAll("button").forEach((button) => {
      if (/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/.test(button.textContent || "")) {
        button.style.visibility = "hidden";
      }
    });
  }, path);
}

const browser = await chromium.launch({ headless: true });
let failed = false;

for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(`${base}${shot.path}`, { waitUntil: "networkidle" });
  await maskDates(page, shot.path);
  const file = join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  if (writeBaseline) writeFileSync(join(baselineDir, `${shot.name}.png`), readFileSync(file));
  if (enforce) {
    const baseline = join(baselineDir, `${shot.name}.png`);
    if (!existsSync(baseline)) {
      console.error(`missing baseline ${baseline}`);
      failed = true;
    } else {
      const current = PNG.sync.read(readFileSync(file));
      const previous = PNG.sync.read(readFileSync(baseline));
      const width = Math.min(current.width, previous.width);
      const height = Math.min(current.height, previous.height);
      const diff = new PNG({ width, height });
      const mismatched = pixelmatch(previous.data, current.data, diff.data, width, height, { threshold: 0.1 });
      const ratio = mismatched / (width * height);
      writeFileSync(join(outDir, `${shot.name}.diff.png`), PNG.sync.write(diff));
      console.log(`${shot.name}: ${(ratio * 100).toFixed(3)}%`);
      if (ratio > ceiling) failed = true;
    }
  }
  await page.close();
}

await browser.close();
if (failed) process.exit(1);
console.log(JSON.stringify({ ok: true, outDir, enforce }));
