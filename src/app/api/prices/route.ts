import { NextResponse } from "next/server";
import { fetchYahooQuotes } from "@/lib/api/yahoo";
import { fetchFredRobusta } from "@/lib/api/fred";

export const revalidate = 300; // 5 dakika cache

export interface PriceItem {
  label: string;
  symbol: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  unit: string;
  source: string;
}

export async function GET() {
  const [yahooData, fredRobusta] = await Promise.all([
    fetchYahooQuotes(["KC=F", "RC=F", "SB=F", "USDTRY=X", "EURTRY=X", "BRLUSD=X"]),
    fetchFredRobusta(),
  ]);

  const prices: PriceItem[] = [];

  // Arabica
  const kc = yahooData["KC=F"];
  prices.push(kc
    ? { label: "Arabica Coffee", symbol: "KC=F", price: kc.price, change: kc.change, changePct: kc.changePct, unit: "¢/lb", source: "Yahoo Finance" }
    : { label: "Arabica Coffee", symbol: "KC=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "Yahoo Finance" }
  );

  // Robusta (Yahoo öncelikli, FRED fallback)
  const rc = yahooData["RC=F"];
  prices.push(rc
    ? { label: "Robusta Coffee", symbol: "RC=F", price: rc.price, change: rc.change, changePct: rc.changePct, unit: "¢/lb", source: "Yahoo Finance" }
    : fredRobusta
      ? { label: "Robusta Coffee", symbol: "RC=F", price: fredRobusta.price, change: fredRobusta.change, changePct: fredRobusta.changePct, unit: "¢/lb", source: "FRED (London ICE)" }
      : { label: "Robusta Coffee", symbol: "RC=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "FRED" }
  );

  // USD/TRY
  const usdtry = yahooData["USDTRY=X"];
  prices.push(usdtry
    ? { label: "USD/TRY", symbol: "USDTRY=X", price: usdtry.price, change: usdtry.change, changePct: usdtry.changePct, unit: "", source: "Yahoo Finance" }
    : { label: "USD/TRY", symbol: "USDTRY=X", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance" }
  );

  // EUR/TRY
  const eurtry = yahooData["EURTRY=X"];
  prices.push(eurtry
    ? { label: "EUR/TRY", symbol: "EURTRY=X", price: eurtry.price, change: eurtry.change, changePct: eurtry.changePct, unit: "", source: "Yahoo Finance" }
    : { label: "EUR/TRY", symbol: "EURTRY=X", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance" }
  );

  // BRL/USD
  const brlusd = yahooData["BRLUSD=X"];
  prices.push(brlusd
    ? { label: "BRL/USD", symbol: "BRLUSD=X", price: brlusd.price, change: brlusd.change, changePct: brlusd.changePct, unit: "", source: "Yahoo Finance" }
    : { label: "BRL/USD", symbol: "BRLUSD=X", price: null, change: null, changePct: null, unit: "", source: "Yahoo Finance" }
  );

  // Sugar
  const sb = yahooData["SB=F"];
  prices.push(sb
    ? { label: "Sugar #11", symbol: "SB=F", price: sb.price, change: sb.change, changePct: sb.changePct, unit: "¢/lb", source: "Yahoo Finance" }
    : { label: "Sugar #11", symbol: "SB=F", price: null, change: null, changePct: null, unit: "¢/lb", source: "Yahoo Finance" }
  );

  return NextResponse.json({ prices, fetchedAt: new Date().toISOString() });
}
