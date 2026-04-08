import { NextRequest, NextResponse } from "next/server";
import { fetchYahooHistory } from "@/lib/api/yahoo";
import { fetchRobustaWithFallback } from "@/lib/api/robusta-providers";

const YAHOO_SYMBOLS: Record<string, string> = {
  arabica: "KC=F",
  sugar: "SB=F",
};

function getPeriodDates(period: string): { start: Date; end: Date; interval: "1d" | "1wk" | "1mo" } {
  const end = new Date();
  const start = new Date();
  let interval: "1d" | "1wk" | "1mo" = "1d";

  if (period === "1M") {
    start.setMonth(end.getMonth() - 1);
  } else if (period === "5Y") {
    start.setFullYear(end.getFullYear() - 5);
    interval = "1wk";
  } else {
    start.setFullYear(end.getFullYear() - 1);
  }

  return { start, end, interval };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const symbol = searchParams.get("symbol") || "arabica";
  const period = searchParams.get("period") || "1Y";

  const { start, end, interval } = getPeriodDates(period);

  // Robusta — multi-provider fallback
  if (symbol === "robusta") {
    const result = await fetchRobustaWithFallback(start, end);
    if (result.data.length === 0) {
      return NextResponse.json({ error: "No robusta data available" }, { status: 404 });
    }
    return NextResponse.json({
      symbol,
      period,
      source: result.source,
      points: result.data.map((d) => ({ date: d.time, price: d.value })),
      fetchedAt: new Date().toISOString(),
    });
  }

  // Yahoo symbols (arabica, sugar)
  if (YAHOO_SYMBOLS[symbol]) {
    const points = await fetchYahooHistory(YAHOO_SYMBOLS[symbol], start, end, interval);
    if (points.length === 0) {
      return NextResponse.json({ error: "No data available" }, { status: 404 });
    }
    return NextResponse.json({
      symbol,
      period,
      source: "Yahoo Finance",
      points,
      fetchedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ error: `Unknown symbol: ${symbol}` }, { status: 400 });
}
