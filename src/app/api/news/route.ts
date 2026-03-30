import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const revalidate = 1800; // 30 dakika cache

interface NewsItem {
  title: string;
  summary: string;
  link: string;
  date: string;
  source: string;
}

const FEEDS = [
  { name: "Daily Coffee News", url: "https://dailycoffeenews.com/feed/" },
  { name: "Sprudge", url: "https://sprudge.com/feed" },
  { name: "Perfect Daily Grind", url: "https://www.perfectdailygrind.com/feed/" },
  { name: "Google News", url: "https://news.google.com/rss/search?q=coffee+commodity+price&hl=en" },
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

export async function GET() {
  const parser = new Parser();
  const allItems: NewsItem[] = [];

  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).map((item) => {
          const rawSummary = item.contentSnippet || item.content || item.summary || "";
          const summary = stripHtml(rawSummary).substring(0, 150).trim();
          return {
            title: item.title || "",
            summary: summary + (rawSummary.length > 150 ? "..." : ""),
            link: item.link || "",
            date: item.isoDate || item.pubDate || "",
            source: feed.name,
          };
        });
      } catch {
        return [];
      }
    })
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Tarihe göre sırala (en yeni üstte)
  allItems.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  // Son 20 haberi döndür
  const news = allItems.slice(0, 20);

  return NextResponse.json({
    news,
    count: news.length,
    fetchedAt: new Date().toISOString(),
  });
}
