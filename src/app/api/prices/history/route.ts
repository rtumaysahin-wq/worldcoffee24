import { NextRequest, NextResponse } from "next/server";

const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";

const YAHOO_SYMBOLS: Record<string, string> = {
  arabica: "KC=F",
  sugar: "SB=F",
};

const FRED_SERIES: Record<string, string> = {
  robusta: "PCOFFROBUSDM",
};

function getPeriodDates(period: string): { start: Date; end: Date; interval: string } {
  const end = new Date();
  const start = new Date();
  let interval = "1d";

  if (period === "1M") {
    start.setMonth(end.getMonth() - 1);
    interval = "1d";
  } else if (period === "1Y") {
    start.setFullYear(end.getFullYear() - 1);
    interval = "1d";
  } else if (period === "5Y") {
    start.setFullYear(end.getFullYear() - 5);
    interval = "1wk";
  } else {
    start.setFullYear(end.getFullYear() - 1);
    interval = "1d";
  }

  return { start, end, interval };
}

async function fetchYahooHistory(symbol: string, period: string) {
  try {
    const YahooFinance = (await import("yahoo-finance2")).default;
    const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

    const { start, end, interval } = getPeriodDates(period);
    const result = await yf.chart(symbol, {
      period1: start,
      period2: end,
      interval: interval as "1d" | "1wk" | "1mo",
    });

    return (result.quotes || []).map((q: { date: Date; close: number | null }) => ({
      date: q.date instanceof Date ? q.date.toISOString().split("T")[0] : String(q.date),
      price: q.close !== null ? Math.round(q.close * 100) / 100 : null,
    })).filter((p: { price: number | null }) => p.price !== null);
  } catch {
    return [];
  }
}


async function fetchFredHistory(seriesId: string, period: string) {
  try {
    const { start, end } = getPeriodDates(period);
    const params = new URLSearchParams({
      series_id: seriesId,
      api_key: FRED_KEY,
      file_type: "json",
      observation_start: start.toISOString().split("T")[0],
      observation_end: end.toISOString().split("T")[0],
      sort_order: "asc",
    });
    const res = await fetch(`https://api.stlouisfed.org/fred/series/observations?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.observations || [])
      .filter((obs: { value: string }) => obs.value !== ".")
      .map((obs: { date: string; value: string }) => ({
        date: obs.date,
        price: Math.round(parseFloat(obs.value) * 100) / 100,
      }));
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const symbol = searchParams.get("symbol") || "arabica";
  const period = searchParams.get("period") || "1Y";

  let points: { date: string; price: number | null }[] = [];

  if (YAHOO_SYMBOLS[symbol]) {
    points = await fetchYahooHistory(YAHOO_SYMBOLS[symbol], period);
  } else if (FRED_SERIES[symbol]) {
    points = await fetchFredHistory(FRED_SERIES[symbol], period);
  } else {
    return NextResponse.json({ error: `Bilinmeyen sembol: ${symbol}` }, { status: 400 });
  }

  if (points.length === 0) {
    return NextResponse.json({ error: "Veri bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ symbol, period, points, fetchedAt: new Date().toISOString() });
}
