import { NextRequest, NextResponse } from "next/server";
import { fetchYahooHistory } from "@/lib/api/yahoo";
import { fetchFredHistory } from "@/lib/api/fred";

const YAHOO_SYMBOLS: Record<string, string> = {
  arabica: "KC=F",
  sugar: "SB=F",
};

const FRED_SERIES: Record<string, string> = {
  robusta: "PCOFFROBUSDM",
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

  let points: { date: string; price: number | null }[] = [];

  if (YAHOO_SYMBOLS[symbol]) {
    points = await fetchYahooHistory(YAHOO_SYMBOLS[symbol], start, end, interval);
  } else if (FRED_SERIES[symbol]) {
    points = await fetchFredHistory(FRED_SERIES[symbol], start, end);
  } else {
    return NextResponse.json({ error: `Bilinmeyen sembol: ${symbol}` }, { status: 400 });
  }

  if (points.length === 0) {
    return NextResponse.json({ error: "Veri bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ symbol, period, points, fetchedAt: new Date().toISOString() });
}
