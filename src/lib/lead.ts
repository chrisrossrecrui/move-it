export const SERVICE_OPTIONS = [
  "Local Move",
  "Long-Haul Freight",
  "Fleet Support",
  "Other",
] as const;

export type ServiceNeed = (typeof SERVICE_OPTIONS)[number];

export type Lead = {
  name: string;
  phone: string;
  service: ServiceNeed;
  message: string;
  submittedAt: string;
};

export type WindowId = "morning" | "midday" | "afternoon" | "evening";

export type Consult = {
  date: string;
  window: WindowId;
  savedAt: string;
};

export const WINDOWS: { id: WindowId; label: string; hours: string }[] = [
  { id: "morning", label: "Morning", hours: "8–11 AM" },
  { id: "midday", label: "Midday", hours: "11 AM–2 PM" },
  { id: "afternoon", label: "Afternoon", hours: "2–5 PM" },
  { id: "evening", label: "Evening", hours: "5–7 PM" },
];

const LEAD_KEY = "moveit.lead";
const LEAD_ID_KEY = "moveit.leadKey";
const CONSULT_KEY = "moveit.consult";

export function saveLead(lead: Lead) {
  localStorage.setItem(LEAD_KEY, JSON.stringify(lead));
}

export function readLead(): Lead | null {
  try {
    const raw = localStorage.getItem(LEAD_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Lead>;
    if (!data.name || !data.phone || !data.service) return null;
    if (!SERVICE_OPTIONS.includes(data.service as ServiceNeed)) return null;
    return data as Lead;
  } catch {
    return null;
  }
}

export function saveLeadKey(key: string) {
  localStorage.setItem(LEAD_ID_KEY, key);
}

export function readLeadKey(): string | null {
  try {
    const key = localStorage.getItem(LEAD_ID_KEY);
    return key && /^[a-f0-9]{64}$/.test(key) ? key : null;
  } catch {
    return null;
  }
}

export function saveConsult(consult: Consult) {
  localStorage.setItem(CONSULT_KEY, JSON.stringify(consult));
}

export function readConsult(): Consult | null {
  try {
    const raw = localStorage.getItem(CONSULT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Consult>;
    if (!data.date || !data.window) return null;
    if (!WINDOWS.some((item) => item.id === data.window)) return null;
    return data as Consult;
  } catch {
    return null;
  }
}

export function upcomingDays(count = 6) {
  const days: string[] = [];
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() + 1);
  for (let i = 0; i < count; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    days.push(`${date.getFullYear()}-${month}-${day}`);
  }
  return days;
}

export function formatDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    monthDay: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
}

export function greetingName(full: string) {
  const first = full.trim().split(/\s+/)[0] ?? "";
  if (first.length < 2 || first.length > 24) return null;
  return first;
}
