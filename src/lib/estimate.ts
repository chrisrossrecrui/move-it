export type CalcService = "local" | "freight" | "fleet" | "specialty";

export const CALC_SERVICES: { id: CalcService; label: string }[] = [
  { id: "local", label: "Local move" },
  { id: "freight", label: "Freight" },
  { id: "fleet", label: "Fleet support" },
  { id: "specialty", label: "Specialized" },
];

export type Choice = { id: string; label: string };

export const LOCAL_SIZES: Choice[] = [
  { id: "studio", label: "Studio or room" },
  { id: "small", label: "1–2 bedrooms" },
  { id: "family", label: "3–4 bedrooms" },
  { id: "large", label: "Large home" },
];

export const WEIGHTS: Choice[] = [
  { id: "light", label: "Under 1,000 lb" },
  { id: "mid", label: "1,000–8,000 lb" },
  { id: "heavy", label: "Heavy or near-full" },
];

export const DISTANCES: Choice[] = [
  { id: "short", label: "Under 50 miles" },
  { id: "regional", label: "50–150 miles" },
  { id: "long", label: "150–300 miles" },
  { id: "state", label: "Across Colorado" },
];

export const FLEET_SPANS: Choice[] = [
  { id: "day", label: "One day" },
  { id: "week", label: "A week" },
  { id: "lane", label: "Ongoing weekly lane" },
];

export const SPECIALTY_SCOPES: Choice[] = [
  { id: "piece", label: "Single piece" },
  { id: "room", label: "A room of valuables" },
  { id: "full", label: "Full specialty move" },
];

export type Estimate = { low: number; high: number; detail: string };

function round10(value: number) {
  return Math.round(value / 10) * 10;
}

export function estimate(service: CalcService, primary: string, distance: string): Estimate {
  if (service === "local") {
    const table: Record<string, Estimate> = {
      studio: {
        low: 450,
        high: 850,
        detail: "A small Colorado local move. Usually one truck and a short carry.",
      },
      small: {
        low: 750,
        high: 1500,
        detail: "Typical for a 1–2 bedroom home inside one Colorado metro.",
      },
      family: {
        low: 1500,
        high: 2900,
        detail: "Typical for a 3–4 bedroom Colorado move, including a longer load.",
      },
      large: {
        low: 2800,
        high: 5400,
        detail: "Typical for a large Colorado home. Access and packing move this the most.",
      },
    };
    return table[primary] ?? table.small;
  }

  if (service === "freight") {
    const weight: Record<string, [number, number]> = {
      light: [240, 520],
      mid: [560, 1280],
      heavy: [1200, 2700],
    };
    const multiplier: Record<string, number> = {
      short: 1,
      regional: 1.35,
      long: 1.8,
      state: 2.2,
    };
    const band = weight[primary] ?? weight.mid;
    const factor = multiplier[distance] ?? 1.35;
    return {
      low: round10(band[0] * factor),
      high: round10(band[1] * factor),
      detail:
        "Typical for Colorado point-to-point freight at this weight and distance. Waiting time and odd hours change it.",
    };
  }

  if (service === "fleet") {
    const table: Record<string, Estimate> = {
      day: {
        low: 820,
        high: 1400,
        detail: "A dedicated truck and driver for one Colorado day.",
      },
      week: {
        low: 4100,
        high: 6900,
        detail: "A dedicated Colorado week. Extra stops are confirmed on the quote.",
      },
      lane: {
        low: 3600,
        high: 6400,
        detail: "A recurring weekly lane inside Colorado, priced per week.",
      },
    };
    return table[primary] ?? table.day;
  }

  const table: Record<string, Estimate> = {
    piece: {
      low: 240,
      high: 680,
      detail: "One protected piece — piano, glass, or equipment — inside Colorado.",
    },
    room: {
      low: 680,
      high: 1700,
      detail: "A room of items that need blankets, straps, and a slower load.",
    },
    full: {
      low: 1700,
      high: 4400,
      detail: "A full specialty move. Handling is written into the quote.",
    },
  };
  return table[primary] ?? table.piece;
}

export function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
