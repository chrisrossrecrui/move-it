import { readFileSync } from "node:fs";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node scripts/lighthouse-budget.mjs <report.json> [more.json]");
  process.exit(1);
}

const floors = {
  performance: 0.9,
  accessibility: 0.95,
  "best-practices": 0.95,
  seo: 0.95,
};

const budgets = { lcp: 2500, cls: 0.1, inp: 200 };
let failed = false;

for (const file of files) {
  const report = JSON.parse(readFileSync(file, "utf8"));
  const url = report.finalUrl || report.requestedUrl || file;
  console.log(`\n${url}`);
  for (const [id, floor] of Object.entries(floors)) {
    const score = report.categories?.[id]?.score;
    const ok = typeof score === "number" && score >= floor;
    console.log(`  ${id}: ${score ?? "missing"} (floor ${floor})`);
    if (!ok) failed = true;
  }
  const audits = report.audits || {};
  const metrics = {
    lcp: audits["largest-contentful-paint"]?.numericValue,
    cls: audits["cumulative-layout-shift"]?.numericValue,
    inp: audits["interaction-to-next-paint"]?.numericValue ?? audits["experimental-interaction-to-next-paint"]?.numericValue,
  };
  for (const [id, ceiling] of Object.entries(budgets)) {
    const value = metrics[id];
    if (typeof value !== "number") {
      console.log(`  ${id}: missing`);
      continue;
    }
    const ok = value < ceiling;
    console.log(`  ${id}: ${Math.round(value)} (ceiling ${ceiling})`);
    if (!ok) failed = true;
  }
}

if (failed) process.exit(1);
