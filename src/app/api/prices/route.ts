import { NextResponse } from "next/server";

const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";

interface PriceItem {
  label: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  unit: string;
  source: string;
  updated: string | null;
}

// Yahoo Finance — server-side only
async function fetchYahooQuote(symbol: string): Promise<{
  price: number;
  change: number;
  changePct: number;
  name: string;
  currency: string;
} | null> {
  try {
    const YahooFinance = (await import("yahoo-finance2")).default;
    const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });
    const q = await yf.quote(symbol);
    if (!q || q.regularMarketPrice === undefined) return null;
    return {
      price: q.regularMarketPrice,
      change: q.regularMarketChange ?? 0,
      changePct: q.regularMarketChangePercent ?? 0,
      name: q.shortName || q.longName || symbol,
      currency: q.currency || "",
    };
  } catch {
    return null;
  }
}

// FRED — Robusta fallback (Yahoo'da yok)
async function fetchFredLatest(
  seriesId: string
): Promise<{ price: number; prevPrice: number; date: string } | null> {
  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=2`;
    const res = await fetch(url);
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

export const revalidate = 300; // 5 dakika cache

export async function GET() {
  // Paralel fetch
  const [arabica, sugar, usdtry, eurtry, brlusd, robusta] = await Promise.all([
    fetchYahooQuote("KC=F"),
    fetchYahooQuote("SB=F"),
    fetchYahooQuote("USDTRY=X"),
    fetchYahooQuote("EURTRY=X"),
    fetchYahooQuote("BRLUSD=X"),
    fetchFredLatest("PCOFFROBUSDM"),
  ]);

  const now = new Date().toISOString().split("T")[0];
  const prices: PriceItem[] = [];

  // Arabica (Yahoo)
  if (arabica) {
    prices.push({
      label: "Arabica Coffee",
      price: Math.round(arabica.price * 100) / 100,
      change: Math.round(arabica.change * 100) / 100,
      changePct: Math.round(arabica.changePct * 100) / 100,
      unit: "¢/lb",
      source: "Yahoo Finance (ICE)",
      updated: now,
    });
  } else {
    prices.push({ label: "Arabica Coffee", price: null, change: null, changePct: null, unit: "¢/lb", source: "Yahoo Finance", updated: null });
  }

  // Robusta (FRED — Yahoo'da yok)
  if (robusta) {
    const change = robusta.price - robusta.prevPrice;
    const pct = (change / robusta.prevPrice) * 100;
    prices.push({
      label: "Robusta Coffee",
      price: Math.round(robusta.price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePct: Math.round(pct * 100) / 100,
      unit: "¢/lb",
      source: "FRED (London ICE)",
      updated: robusta.date,
    });
  } else {
    prices.push({ label: "Robusta Coffee", price: null, change: null, changePct: null, unit: "¢/lb", source: "FRED", updated: null });
  }

  // USD/TRY
  if (usdtry) {
    prices.push({
      label: "USD/TRY",
      price: Math.round(usdtry.price * 10000) / 10000,
      change: Math.round(usdtry.change * 10000) / 10000,
      changePct: Math.round(usdtry.changePct * 100) / 100,
      unit: "",
      source: "Yahoo Finance",
      updated: now,
    });
  } else {
    prices.push({ label: "USD/TRY", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance", updated: null });
  }

  // EUR/TRY
  if (eurtry) {
    prices.push({
      label: "EUR/TRY",
      price: Math.round(eurtry.price * 10000) / 10000,
      change: Math.round(eurtry.change * 10000) / 10000,
      changePct: Math.round(eurtry.changePct * 100) / 100,
      unit: "",
      source: "Yahoo Finance",
      updated: now,
    });
  } else {
    prices.push({ label: "EUR/TRY", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance", updated: null });
  }

  // BRL/USD
  if (brlusd) {
    prices.push({
      label: "BRL/USD",
      price: Math.round(brlusd.price * 10000) / 10000,
      change: Math.round(brlusd.change * 10000) / 10000,
      changePct: Math.round(brlusd.changePct * 100) / 100,
      unit: "",
      source: "Yahoo Finance",
      updated: now,
    });
  } else {
    prices.push({ label: "BRL/USD", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance", updated: null });
  }

  // Sugar (Yahoo)
  if (sugar) {
    prices.push({
      label: "Sugar #11",
      price: Math.round(sugar.price * 100) / 100,
      change: Math.round(sugar.change * 100) / 100,
      changePct: Math.round(sugar.changePct * 100) / 100,
      unit: "¢/lb",
      source: "Yahoo Finance (ICE)",
      updated: now,
    });
  } else {
    prices.push({ label: "Sugar #11", price: null, change: null, changePct: null, unit: "¢/lb", source: "Yahoo Finance", updated: null });
  }

  return NextResponse.json({ prices, fetchedAt: new Date().toISOString() });
}
