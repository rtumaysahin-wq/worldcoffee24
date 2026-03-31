import { NextResponse } from "next/server";

export const revalidate = 300; // 5 dakika cache

interface PriceItem {
  label: string;
  symbol: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  unit: string;
  source: string;
}

const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";

// Yahoo Finance — server-side only
async function fetchYahooQuotes(symbols: string[]): Promise<Record<string, PriceItem>> {
  const results: Record<string, PriceItem> = {};
  try {
    const YahooFinance = (await import("yahoo-finance2")).default;
    const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

    for (const symbol of symbols) {
      try {
        const q = await yf.quote(symbol);
        if (q && q.regularMarketPrice !== undefined) {
          results[symbol] = {
            label: "",
            symbol,
            price: q.regularMarketPrice,
            change: q.regularMarketChange ?? null,
            changePct: q.regularMarketChangePercent ?? null,
            unit: "",
            source: "Yahoo Finance",
          };
        }
      } catch {
        // Sembol bazlı hata — devam et
      }
    }
  } catch {
    // Yahoo modül hatası
  }
  return results;
}

// FRED — Robusta fallback
async function fetchFredRobusta(): Promise<PriceItem | null> {
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
      label: "Robusta Coffee",
      symbol: "RC=F",
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePct: Math.round(pct * 100) / 100,
      unit: "¢/lb",
      source: "FRED (London ICE)",
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [yahooData, robusta] = await Promise.all([
    fetchYahooQuotes(["KC=F", "SB=F", "USDTRY=X", "EURTRY=X", "BRLUSD=X"]),
    fetchFredRobusta(),
  ]);

  const prices: PriceItem[] = [];

  // Arabica
  const kc = yahooData["KC=F"];
  prices.push(kc
    ? { ...kc, label: "Arabica Coffee", unit: "¢/lb" }
    : { label: "Arabica Coffee", symbol: "KC=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "Yahoo Finance" }
  );

  // Robusta (FRED — Yahoo'da yok)
  prices.push(robusta
    ?? { label: "Robusta Coffee", symbol: "RC=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "FRED" }
  );

  // USD/TRY
  const usdtry = yahooData["USDTRY=X"];
  prices.push(usdtry
    ? { ...usdtry, label: "USD/TRY", unit: "" }
    : { label: "USD/TRY", symbol: "USDTRY=X", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance" }
  );

  // EUR/TRY
  const eurtry = yahooData["EURTRY=X"];
  prices.push(eurtry
    ? { ...eurtry, label: "EUR/TRY", unit: "" }
    : { label: "EUR/TRY", symbol: "EURTRY=X", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance" }
  );

  // BRL/USD
  const brlusd = yahooData["BRLUSD=X"];
  prices.push(brlusd
    ? { ...brlusd, label: "BRL/USD", unit: "" }
    : { label: "BRL/USD", symbol: "BRLUSD=X", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance" }
  );

  // Sugar
  const sb = yahooData["SB=F"];
  prices.push(sb
    ? { ...sb, label: "Sugar #11", unit: "¢/lb" }
    : { label: "Sugar #11", symbol: "SB=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "Yahoo Finance" }
  );

  return NextResponse.json({ prices, fetchedAt: new Date().toISOString() });
}
