// Robusta data providers — adapter pattern with fallback chain
// Each provider returns the same normalized format

export interface RobustaPoint {
  time: string; // YYYY-MM-DD
  value: number;
}

export interface RobustaResult {
  source: string;
  data: RobustaPoint[];
}

type Provider = (start: Date, end: Date) => Promise<RobustaResult | null>;

// ── Provider 1: Yahoo Finance (RC=F) ──
async function yahooProvider(start: Date, end: Date): Promise<RobustaResult | null> {
  try {
    const { fetchYahooHistory } = await import("./yahoo");
    const points = await fetchYahooHistory("RC=F", start, end, "1d");
    if (points.length === 0) return null;
    return {
      source: "Yahoo Finance (RC=F)",
      data: points.map((p: { date: string; price: number | null }) => ({ time: p.date, value: p.price! })),
    };
  } catch {
    return null;
  }
}

// ── Provider 2: Stooq (RM.F) ──
async function stooqProvider(start: Date, end: Date): Promise<RobustaResult | null> {
  try {
    const fmt = (d: Date) => d.toISOString().split("T")[0].replace(/-/g, "");
    const url = `https://stooq.com/q/d/l/?s=rm.f&d1=${fmt(start)}&d2=${fmt(end)}&i=d`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const csv = await res.text();
    const lines = csv.trim().split("\n").slice(1); // skip header
    const data: RobustaPoint[] = [];
    for (const line of lines) {
      const cols = line.split(",");
      if (cols.length >= 5) {
        const close = parseFloat(cols[4]);
        if (!isNaN(close) && close > 0) {
          data.push({ time: cols[0], value: close });
        }
      }
    }
    if (data.length === 0) return null;
    return { source: "Stooq (RM.F)", data };
  } catch {
    return null;
  }
}

// ── Provider 3: FRED (PCOFFROBUSDM — monthly, last resort) ──
async function fredProvider(start: Date, end: Date): Promise<RobustaResult | null> {
  try {
    const { fetchFredHistory } = await import("./fred");
    const points = await fetchFredHistory("PCOFFROBUSDM", start, end);
    if (points.length === 0) return null;
    return {
      source: "FRED (PCOFFROBUSDM)",
      data: points.map((p: { date: string; price: number | null }) => ({ time: p.date, value: p.price! })),
    };
  } catch {
    return null;
  }
}

// ── Fallback chain ──
const providers: Provider[] = [yahooProvider, stooqProvider, fredProvider];

export async function fetchRobustaWithFallback(
  start: Date,
  end: Date
): Promise<RobustaResult> {
  for (const provider of providers) {
    const result = await provider(start, end);
    if (result && result.data.length > 0) return result;
  }
  return { source: "none", data: [] };
}
