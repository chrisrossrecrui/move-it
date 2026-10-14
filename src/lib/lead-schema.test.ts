import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  assertPhone,
  consultInputSchema,
  leadIdempotencyKey,
  leadInputSchema,
  phoneDigits,
  phoneLast4,
  serviceSlug,
  truncateToMinute,
} from "./lead-schema.ts";

const valid = JSON.parse(readFileSync(new URL("../../fixtures/lead.valid.json", import.meta.url), "utf8"));
const invalid = JSON.parse(readFileSync(new URL("../../fixtures/lead.invalid.json", import.meta.url), "utf8"));

test("accepts the valid lead fixture", () => {
  const parsed = leadInputSchema.safeParse(valid);
  assert.equal(parsed.success, true);
  if (!parsed.success) return;
  assert.equal(assertPhone(phoneDigits(parsed.data.phone)), null);
  assert.equal(phoneLast4(phoneDigits(parsed.data.phone)), "0142");
  assert.equal(serviceSlug(parsed.data.service), "local-move");
});

test("rejects the invalid lead fixture", () => {
  const parsed = leadInputSchema.safeParse(invalid);
  assert.equal(parsed.success, false);
});

test("idempotency key is stable inside a minute and changes across minutes", async () => {
  const first = await leadIdempotencyKey("Ada Rivera", "3035550142", "Local Move", "2026-10-14T15:04:11.000Z");
  const same = await leadIdempotencyKey("ada rivera", "3035550142", "Local Move", "2026-10-14T15:04:59.000Z");
  const next = await leadIdempotencyKey("Ada Rivera", "3035550142", "Local Move", "2026-10-14T15:05:00.000Z");
  assert.equal(first, same);
  assert.notEqual(first, next);
  assert.equal(first.length, 64);
  assert.equal(truncateToMinute("2026-10-14T15:04:11.000Z"), "2026-10-14T15:04");
});

test("consult schema accepts a keyed window", () => {
  const parsed = consultInputSchema.safeParse({
    key: "a".repeat(64),
    date: "2026-10-16",
    window: "morning",
    savedAt: "2026-10-14T15:10:00.000Z",
    name: "Ada Rivera",
    phone: "3035550142",
    service: "Local Move",
  });
  assert.equal(parsed.success, true);
});
