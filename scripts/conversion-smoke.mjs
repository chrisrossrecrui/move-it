#!/usr/bin/env node
import { chromium } from "playwright";

const args = process.argv.slice(2);
const urlFlag = args.indexOf("--url");
const base = (urlFlag >= 0 ? args[urlFlag + 1] : "http://127.0.0.1:8080").replace(/\/$/, "");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const failures = [];

function fail(message) {
  failures.push(message);
  console.error("FAIL", message);
}

try {
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const home = await page.evaluate(() => ({
    wordmark: [...document.querySelectorAll("a")].some((link) => link.textContent?.trim() === "Move it"),
    h1: document.querySelector("h1")?.textContent ?? "",
    tel: document.querySelectorAll('a[href^="tel:"]').length,
    name: Boolean(document.querySelector('input[name="name"]')),
    phone: Boolean(document.querySelector('input[name="phone"]')),
    service: Boolean(document.querySelector('select[name="service"]')),
    submit: Boolean(document.querySelector('button[type="submit"]')),
  }));
  if (!home.wordmark) fail("wordmark is not Move it");
  if (!home.h1.includes("Colorado")) fail("H1 is missing Colorado");
  if (!home.name || !home.phone || !home.service || !home.submit) fail("quote fields missing");
  if (home.tel) fail("tel: link present");

  await page.fill('input[name="name"]', "Ada Rivera");
  await page.fill('input[name="phone"]', "3035550142");
  await page.selectOption('select[name="service"]', "Local Move");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/thank-you");
  await page.getByRole("heading", { level: 1 }).waitFor();
  const thanks = await page.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent ?? "",
    tel: document.querySelectorAll('a[href^="tel:"]').length,
    windows: document.querySelectorAll('button[aria-pressed]').length,
  }));
  if (!/thanks/i.test(thanks.h1)) fail(`thank-you heading missing: ${thanks.h1}`);
  if (thanks.tel) fail("tel: link on thank-you");
  if (thanks.windows < 4) fail("consult windows missing");
  await page.getByRole("button", { name: /^Morning/ }).click();
  await page.getByRole("button", { name: /save this window/i }).click();
  await page.getByText(/Consult held/i).waitFor({ timeout: 5000 });
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, url: base }));
