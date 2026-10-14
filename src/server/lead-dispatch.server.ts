import {
  assertPhone,
  leadIdempotencyKey,
  phoneDigits,
  phoneLast4,
  serviceSlug,
  type ConsultInput,
  type LeadInput,
} from "@/lib/lead-schema";

const DEFAULT_REPO = "chrisrossrecrui/move-it";

export type DispatchResult = { ok: boolean; reason?: string };

type Payload = Record<string, string>;

function log(event: string, fields: Record<string, string | number | boolean>) {
  const line = JSON.stringify({ event, ...fields });
  if (event.endsWith(".failed") || event.endsWith(".error")) console.error(line);
  else console.info(line);
}

export async function dispatchGithub(
  eventType: "moveit.lead.created" | "moveit.consult.selected",
  payload: Payload,
): Promise<DispatchResult> {
  const token = process.env.GITHUB_LEAD_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || DEFAULT_REPO;
  if (!token) {
    log("lead.dispatch.skipped", { eventType, key: payload.key ?? "", reason: "missing_token" });
    return { ok: false, reason: "missing_token" };
  }
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "move-it-lead-intake",
      },
      body: JSON.stringify({ event_type: eventType, client_payload: payload }),
    });
    if (!response.ok) {
      log("lead.dispatch.failed", { eventType, key: payload.key ?? "", status: response.status });
      return { ok: false, reason: `github_${response.status}` };
    }
    log("lead.dispatch.accepted", { eventType, key: payload.key ?? "" });
    return { ok: true };
  } catch {
    log("lead.dispatch.error", { eventType, key: payload.key ?? "", reason: "network" });
    return { ok: false, reason: "network" };
  }
}

export async function buildLeadPayload(
  input: LeadInput,
): Promise<{ error: string } | { key: string; payload: Payload }> {
  const digits = phoneDigits(input.phone);
  const phoneError = assertPhone(digits);
  if (phoneError) return { error: phoneError as string };
  const key = await leadIdempotencyKey(input.name, digits, input.service, input.submittedAt);
  const payload: Payload = {
    key,
    name: input.name,
    phone: digits,
    phoneLast4: phoneLast4(digits),
    service: input.service,
    serviceSlug: serviceSlug(input.service),
    message: input.message ?? "",
    submittedAt: input.submittedAt,
  };
  return { key, payload };
}

export function buildConsultPayload(input: ConsultInput): { error: string } | { payload: Payload } {
  const digits = phoneDigits(input.phone);
  const phoneError = assertPhone(digits);
  if (phoneError) return { error: phoneError };
  const payload: Payload = {
    key: input.key,
    name: input.name,
    phone: digits,
    phoneLast4: phoneLast4(digits),
    service: input.service,
    serviceSlug: serviceSlug(input.service),
    date: input.date,
    window: input.window,
    savedAt: input.savedAt,
  };
  return { payload };
}
