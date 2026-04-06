const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";

export interface PricePoint {
  date: string;
  price: number;
}

// Client-side: tarihçe çek (mevcut API üzerinden)
export async function fetchPriceHistory(
  symbol: string = "arabica",
  period: string = "1Y"
): Promise<PricePoint[]> {
  const res = await fetch(`/api/prices/history?symbol=${symbol}&period=${period}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.points || [];
}

// Server-side: FRED'den son Robusta fiyatı
export async function fetchFredRobusta() {
  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=PCOFFROBUSDM&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=2`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const obs = data.observations;
    if (!obs || obs.length < 2) return null;
    const price = parseFloat(obs[0].value);
    const prev = parseFloat(obs[1].value);
    if (isNaN(price) || isNaN(prev)) return null;
    const change = price - prev;
    const pct = (change / prev) * 100;
    return {
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePct: Math.round(pct * 100) / 100,
    };
  } catch {
    return null;
  }
}

// Server-side: FRED tarihçe
export async function fetchFredHistory(seriesId: string, start: Date, end: Date) {
  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&observation_start=${start.toISOString().split("T")[0]}&observation_end=${end.toISOString().split("T")[0]}&sort_order=asc`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.observations || [])
      .filter((obs: { value: string }) => obs.value !== ".")
      .map((obs: { date: string; value: string }) => ({
        date: obs.date,
        price: Math.round(parseFloat(obs.value) * 100) / 100,
      }));
  } catch {
    return [];
  }
}
