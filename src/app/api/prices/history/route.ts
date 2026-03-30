import { NextRequest, NextResponse } from "next/server";

const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";

const SERIES_MAP: Record<string, string> = {
  arabica: "PCOFFOTMUSDM",
  robusta: "PCOFFROBUSDM",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const symbol = searchParams.get("symbol") || "arabica";
  const period = searchParams.get("period") || "1Y";

  const seriesId = SERIES_MAP[symbol];
  if (!seriesId) {
    return NextResponse.json(
      { error: `Bilinmeyen sembol: ${symbol}. Gecerli: arabica, robusta` },
      { status: 400 }
    );
  }

  const now = new Date();
  const start = new Date(now);

  if (period === "1M") start.setMonth(now.getMonth() - 1);
  else if (period === "1Y") start.setFullYear(now.getFullYear() - 1);
  else if (period === "5Y") start.setFullYear(now.getFullYear() - 5);
  else start.setFullYear(now.getFullYear() - 1);

  try {
    const params = new URLSearchParams({
      series_id: seriesId,
      api_key: FRED_KEY,
      file_type: "json",
      observation_start: start.toISOString().split("T")[0],
      observation_end: now.toISOString().split("T")[0],
      sort_order: "asc",
    });

    const res = await fetch(`https://api.stlouisfed.org/fred/series/observations?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "FRED API'ye ulasilamadi", status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();
    const observations = data.observations || [];

    const points = observations
      .filter((obs: { value: string }) => obs.value !== ".")
      .map((obs: { date: string; value: string }) => ({
        date: obs.date,
        price: parseFloat(obs.value),
      }));

    if (points.length === 0) {
      return NextResponse.json(
        { error: "Bu donem icin veri bulunamadi" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      symbol,
      period,
      seriesId,
      points,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Veri cekilirken hata olustu" },
      { status: 500 }
    );
  }
}
