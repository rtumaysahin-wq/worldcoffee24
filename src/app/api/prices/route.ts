import { NextResponse } from "next/server";
import { fetchYahooQuotes } from "@/lib/api/yahoo";
import { fetchFredRobusta } from "@/lib/api/fred";

export const revalidate = 300; // 5 min cache

export interface PriceItem {
  label: string;
  symbol: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  unit: string;
  source: string;
}

function push(prices: PriceItem[], data: Record<string, { price: number; change: number | null; changePct: number | null } | undefined>, symbol: string, label: string, unit: string) {
  const d = data[symbol];
  prices.push(d
    ? { label, symbol, price: d.price, change: d.change, changePct: d.changePct, unit, source: "Yahoo Finance" }
    : { label, symbol, price: null, change: null, changePct: null, unit, source: "Yahoo Finance" }
  );
}

export async function GET() {
  const [yahooData, fredRobusta] = await Promise.all([
    fetchYahooQuotes([
      "KC=F", "RC=F", "SB=F",
      "USDBRL=X", "USDVND=X", "USDCOP=X", "USDETB=X",
      "USDTRY=X", "EURTRY=X", "BRLUSD=X", "EURUSD=X",
    ]),
    fetchFredRobusta(),
  ]);

  const prices: PriceItem[] = [];

  // Commodities
  push(prices, yahooData, "KC=F", "Arabica Coffee", "¢/lb");

  // Robusta (Yahoo priority, FRED fallback)
  const rc = yahooData["RC=F"];
  prices.push(rc
    ? { label: "Robusta Coffee", symbol: "RC=F", price: rc.price, change: rc.change, changePct: rc.changePct, unit: "¢/lb", source: "Yahoo Finance" }
    : fredRobusta
      ? { label: "Robusta Coffee", symbol: "RC=F", price: fredRobusta.price, change: fredRobusta.change, changePct: fredRobusta.changePct, unit: "¢/lb", source: "FRED (London ICE)" }
      : { label: "Robusta Coffee", symbol: "RC=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "FRED" }
  );

  push(prices, yahooData, "SB=F", "Sugar #11", "¢/lb");

  // Coffee producer currencies
  push(prices, yahooData, "USDBRL=X", "USD/BRL", "");
  push(prices, yahooData, "USDVND=X", "USD/VND", "");
  push(prices, yahooData, "USDCOP=X", "USD/COP", "");
  push(prices, yahooData, "USDETB=X", "USD/ETB", "");

  // Other currencies (for converter)
  push(prices, yahooData, "USDTRY=X", "USD/TRY", "");
  push(prices, yahooData, "EURTRY=X", "EUR/TRY", "");
  push(prices, yahooData, "BRLUSD=X", "BRL/USD", "");
  push(prices, yahooData, "EURUSD=X", "EUR/USD", "");

  return NextResponse.json({ prices, fetchedAt: new Date().toISOString() });
}
