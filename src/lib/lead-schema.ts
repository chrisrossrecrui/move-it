import { z } from "zod";
import { SERVICE_OPTIONS } from "./lead.ts";

export const SERVICE_VALUES = SERVICE_OPTIONS;
export const WINDOW_VALUES = ["morning", "midday", "afternoon", "evening"] as const;

export const leadInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(32),
  service: z.enum(SERVICE_VALUES),
  message: z.string().trim().max(400).optional().default(""),
  submittedAt: z.iso.datetime(),
});

export const consultInputSchema = z.object({
  key: z.string().regex(/^[a-f0-9]{64}$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  window: z.enum(WINDOW_VALUES),
  savedAt: z.iso.datetime(),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(32),
  service: z.enum(SERVICE_VALUES),
});

export type LeadInput = z.infer<typeof leadInputSchema>;
export type ConsultInput = z.infer<typeof consultInputSchema>;

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function phoneLast4(digits: string): string {
  return digits.slice(-4);
}

export function serviceSlug(service: string): string {
  return service
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** YYYY-MM-DDTHH:MM — the idempotency bucket. */
export function truncateToMinute(iso: string): string {
  return iso.slice(0, 16);
}

export async function leadIdempotencyKey(
  name: string,
  digits: string,
  service: string,
  submittedAt: string,
): Promise<string> {
  const material = `${name.trim().toLowerCase()}|${digits}|${service}|${truncateToMinute(submittedAt)}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function assertPhone(digits: string): string | null {
  if (digits.length < 10 || digits.length > 15) return "Phone must contain 10 to 15 digits.";
  return null;
}
