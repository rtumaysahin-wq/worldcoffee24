// Yahoo Finance — server-side only (tek yer, tekrar yazılmaz)

export async function createYahooClient() {
  const YahooFinance = (await import("yahoo-finance2")).default;
  return new YahooFinance({ suppressNotices: ["yahooSurvey"] });
}

export async function fetchYahooQuotes(symbols: string[]) {
  const results: Record<string, {
    price: number;
    change: number | null;
    changePct: number | null;
  }> = {};

  try {
    const yf = await createYahooClient();
    for (const symbol of symbols) {
      try {
        const q = await yf.quote(symbol);
        if (q?.regularMarketPrice !== undefined) {
          results[symbol] = {
            price: q.regularMarketPrice,
            change: q.regularMarketChange ?? null,
            changePct: q.regularMarketChangePercent ?? null,
          };
        }
      } catch { /* sembol hatası — devam */ }
    }
  } catch { /* yahoo modül hatası */ }

  return results;
}

export async function fetchYahooHistory(
  symbol: string,
  start: Date,
  end: Date,
  interval: "1d" | "1wk" | "1mo"
) {
  try {
    const yf = await createYahooClient();
    const result = await yf.chart(symbol, { period1: start, period2: end, interval });
    return (result.quotes || [])
      .map((q: { date: Date; close: number | null }) => ({
        date: q.date instanceof Date ? q.date.toISOString().split("T")[0] : String(q.date),
        price: q.close !== null ? Math.round(q.close * 100) / 100 : null,
      }))
      .filter((p: { price: number | null }) => p.price !== null);
  } catch {
    return [];
  }
}
