export interface PriceItem {
  label: string;
  symbol: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  unit: string;
  source: string;
}

export interface PricesResponse {
  prices: PriceItem[];
  fetchedAt: string;
}

export async function fetchAllPrices(): Promise<PricesResponse | null> {
  try {
    const res = await fetch("/api/prices");
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
