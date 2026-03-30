import { NextResponse } from "next/server";

const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";
const NINJAS_KEY = process.env.NEXT_PUBLIC_API_NINJAS_KEY || "";

interface PriceItem {
  label: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  source: string;
  updated: string | null;
}

async function fetchFredLatest(
  seriesId: string
): Promise<{ price: number; prevPrice: number; date: string } | null> {
  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=2`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const obs = data.observations;
    if (!obs || obs.length < 2) return null;
    const price = parseFloat(obs[0].value);
    const prevPrice = parseFloat(obs[1].value);
    if (isNaN(price) || isNaN(prevPrice)) return null;
    return { price, prevPrice, date: obs[0].date };
  } catch {
    return null;
  }
}

async function fetchExchangeRates(): Promise<Record<string, number> | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.rates || null;
  } catch {
    return null;
  }
}

async function fetchSugarPrice(): Promise<{
  price: number;
  updated: number;
} | null> {
  try {
    const res = await fetch(
      "https://api.api-ninjas.com/v1/commodityprice?name=sugar",
      {
        headers: { "X-Api-Key": NINJAS_KEY },
        next: { revalidate: 1800 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error) return null;
    return { price: data.price, updated: data.updated };
  } catch {
    return null;
  }
}

export async function GET() {
  const [arabica, robusta, rates, sugar] = await Promise.all([
    fetchFredLatest("PCOFFOTMUSDM"),
    fetchFredLatest("PCOFFROBUSDM"),
    fetchExchangeRates(),
    fetchSugarPrice(),
  ]);

  const prices: PriceItem[] = [];

  // Arabica
  if (arabica) {
    const change = arabica.price - arabica.prevPrice;
    const pct = (change / arabica.prevPrice) * 100;
    prices.push({
      label: "Arabica Coffee",
      price: Math.round(arabica.price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePct: Math.round(pct * 100) / 100,
      source: "FRED (ICE)",
      updated: arabica.date,
    });
  } else {
    prices.push({ label: "Arabica Coffee", price: null, change: null, changePct: null, source: "FRED", updated: null });
  }

  // Robusta
  if (robusta) {
    const change = robusta.price - robusta.prevPrice;
    const pct = (change / robusta.prevPrice) * 100;
    prices.push({
      label: "Robusta Coffee",
      price: Math.round(robusta.price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePct: Math.round(pct * 100) / 100,
      source: "FRED (London)",
      updated: robusta.date,
    });
  } else {
    prices.push({ label: "Robusta Coffee", price: null, change: null, changePct: null, source: "FRED", updated: null });
  }

  // Döviz kurları
  if (rates) {
    const tryRate = rates.TRY;
    const eurRate = rates.EUR;
    const brlRate = rates.BRL;

    if (tryRate) {
      prices.push({
        label: "USD/TRY",
        price: Math.round(tryRate * 10000) / 10000,
        change: null,
        changePct: null,
        source: "ExchangeRate API",
        updated: new Date().toISOString().split("T")[0],
      });
    }
    if (eurRate && tryRate) {
      const eurTry = tryRate / eurRate;
      prices.push({
        label: "EUR/TRY",
        price: Math.round(eurTry * 10000) / 10000,
        change: null,
        changePct: null,
        source: "ExchangeRate API",
        updated: new Date().toISOString().split("T")[0],
      });
    }
    if (brlRate) {
      const brlUsd = 1 / brlRate;
      prices.push({
        label: "BRL/USD",
        price: Math.round(brlUsd * 10000) / 10000,
        change: null,
        changePct: null,
        source: "ExchangeRate API",
        updated: new Date().toISOString().split("T")[0],
      });
    }
  }

  // Sugar
  if (sugar) {
    prices.push({
      label: "Sugar #11",
      price: sugar.price,
      change: null,
      changePct: null,
      source: "API Ninjas",
      updated: new Date(sugar.updated * 1000).toISOString().split("T")[0],
    });
  }

  return NextResponse.json({
    prices,
    fetchedAt: new Date().toISOString(),
  });
}
