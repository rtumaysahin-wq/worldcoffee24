const API_NINJAS_KEY = process.env.NEXT_PUBLIC_API_NINJAS_KEY || "";
const API_NINJAS_BASE = "https://api.api-ninjas.com/v1/commodityprice";

export interface CommodityPrice {
  name: string;
  price: number;
  currency: string;
  updated: number;
}

export async function fetchCommodityPrice(
  name: string
): Promise<CommodityPrice | null> {
  if (!API_NINJAS_KEY) return null;

  try {
    const res = await fetch(`${API_NINJAS_BASE}?name=${name}`, {
      headers: { "X-Api-Key": API_NINJAS_KEY },
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data || null;
  } catch {
    return null;
  }
}

// Statik fiyat verileri — API yokken kullanılır
export const fallbackPrices = {
  arabica: { name: "Coffee", price: 214.25, change: 1.85, changePct: 0.87 },
  robusta: { name: "Robusta", price: 3812, change: 42, changePct: 1.11 },
  usdtry: { name: "USD/TRY", price: 38.42, change: 0.05, changePct: 0.13 },
  eurtry: { name: "EUR/TRY", price: 41.85, change: -0.12, changePct: -0.29 },
  brlusd: { name: "BRL/USD", price: 0.1982, change: -0.002, changePct: -1.0 },
  sugar: { name: "Sugar #11", price: 21.45, change: 0.44, changePct: 2.1 },
};
