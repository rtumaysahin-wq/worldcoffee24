export interface PricePoint {
  date: string;
  price: number;
}

export async function fetchPriceHistory(
  symbol: string = "arabica",
  period: string = "1Y"
): Promise<PricePoint[]> {
  const res = await fetch(`/api/prices/history?symbol=${symbol}&period=${period}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.points || [];
}
