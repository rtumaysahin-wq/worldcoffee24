import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Parser from "rss-parser";

export const maxDuration = 60;

function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

// ─── Fiyat çekme (direkt Yahoo + FRED, self-fetch yok) ───

const FRED_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY || "";

async function fetchPricesDirect() {
  const prices: Record<string, { price: number; changePct: number }> = {};

  try {
    const YahooFinance = (await import("yahoo-finance2")).default;
    const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

    for (const symbol of ["KC=F", "RC=F", "USDTRY=X"]) {
      try {
        const q = await yf.quote(symbol);
        if (q?.regularMarketPrice !== undefined) {
          const label = symbol === "KC=F" ? "Arabica Coffee"
            : symbol === "RC=F" ? "Robusta Coffee"
            : "USD/TRY";
          prices[label] = {
            price: q.regularMarketPrice,
            changePct: q.regularMarketChangePercent ?? 0,
          };
        }
      } catch { /* sembol hatası — devam */ }
    }
  } catch { /* yahoo modül hatası */ }

  // Robusta FRED fallback
  if (!prices["Robusta Coffee"]) {
    try {
      const url = `https://api.stlouisfed.org/fred/series/observations?series_id=PCOFFROBUSDM&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=2`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const obs = data.observations;
        if (obs?.length >= 2) {
          const price = parseFloat(obs[0].value);
          const prev = parseFloat(obs[1].value);
          if (!isNaN(price) && !isNaN(prev)) {
            prices["Robusta Coffee"] = { price, changePct: ((price - prev) / prev) * 100 };
          }
        }
      }
    } catch { /* FRED hatası */ }
  }

  return prices;
}

// ─── Haber çekme (direkt RSS, self-fetch yok) ───

const FEEDS = [
  { name: "Daily Coffee News", url: "https://dailycoffeenews.com/feed/" },
  { name: "Sprudge", url: "https://sprudge.com/feed" },
  { name: "Perfect Daily Grind", url: "https://www.perfectdailygrind.com/feed/" },
  { name: "Google News", url: "https://news.google.com/rss/search?q=coffee+commodity+price&hl=en" },
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

async function fetchNewsDirect() {
  const parser = new Parser();
  const news: { title: string; summary: string; source: string; url: string }[] = [];

  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const parsed = await parser.parseURL(feed.url);
      return (parsed.items || []).map((item) => {
        const raw = item.contentSnippet || item.content || item.summary || "";
        const summary = stripHtml(raw).substring(0, 150).trim();
        return {
          title: item.title || "",
          summary: summary + (raw.length > 150 ? "..." : ""),
          source: feed.name,
          url: item.link || "",
          date: item.isoDate || item.pubDate || "",
        };
      });
    })
  );

  for (const r of results) {
    if (r.status === "fulfilled") news.push(...r.value);
  }

  // Tarihe göre sırala, son 5
  news.sort((a, b) => {
    const da = "date" in a ? new Date((a as { date: string }).date).getTime() : 0;
    const db = "date" in b ? new Date((b as { date: string }).date).getTime() : 0;
    return db - da;
  });

  return news.slice(0, 5);
}

// ─── Görsel eşleştirme ───

const IMAGE_MAP: Record<string, string> = {
  fiyat: "photo-1611974789855-9c2a0a7236a3",
  piyasa: "photo-1611974789855-9c2a0a7236a3",
  price: "photo-1611974789855-9c2a0a7236a3",
  hasat: "photo-1501004318855-e4cca44a0e498",
  üretim: "photo-1501004318855-e4cca44a0e498",
  harvest: "photo-1501004318855-e4cca44a0e498",
  iklim: "photo-1470071459604-3b5ec3a7fe05",
  climate: "photo-1470071459604-3b5ec3a7fe05",
  drought: "photo-1470071459604-3b5ec3a7fe05",
  sürdürülebilir: "photo-1524350876685-274059332603",
  organic: "photo-1524350876685-274059332603",
  lojistik: "photo-1494412574643-ff11b0a5eb95",
  export: "photo-1494412574643-ff11b0a5eb95",
  shipping: "photo-1494412574643-ff11b0a5eb95",
  brazil: "photo-1516306580123-e6e52b1b7b5f",
  brezilya: "photo-1516306580123-e6e52b1b7b5f",
  vietnam: "photo-1509042239860-f550ce710b93",
  bean: "photo-1447933601403-0c6688de566e",
  çekirdek: "photo-1447933601403-0c6688de566e",
  roast: "photo-1442512595331-e89e73853f31",
  kavurma: "photo-1442512595331-e89e73853f31",
};

const DEFAULT_IMAGES = [
  "photo-1495474472287-4d71bcdd2085",
  "photo-1447933601403-0c6688de566e",
  "photo-1442512595331-e89e73853f31",
  "photo-1501004318855-e4cca44a0e498",
];

function pickImage(title: string, content: string, index: number): string {
  const text = `${title} ${content}`.toLowerCase();
  for (const [keyword, photoId] of Object.entries(IMAGE_MAP)) {
    if (text.includes(keyword)) {
      return `https://images.unsplash.com/${photoId}?w=1200&q=80`;
    }
  }
  return `https://images.unsplash.com/${DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]}?w=1200&q=80`;
}

// ═══════════════════════════════════════════════
// ANA PIPELINE: Editör → Tasarım → QA
// ═══════════════════════════════════════════════

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const log: string[] = [];

  // ━━━ ADIM 1: EDİTÖR ━━━
  const [news, prices] = await Promise.all([fetchNewsDirect(), fetchPricesDirect()]);

  const arabica = prices["Arabica Coffee"];
  const robusta = prices["Robusta Coffee"];
  const usdtry = prices["USD/TRY"];

  const priceInfo = arabica
    ? `Arabica ${arabica.price.toFixed(2)} ¢/lb (${arabica.changePct >= 0 ? "+" : ""}${arabica.changePct.toFixed(2)}%)`
    : "";
  const robustaInfo = robusta ? `, Robusta ${robusta.price.toFixed(2)} ¢/lb` : "";
  const kurInfo = usdtry ? `. USD/TRY ${usdtry.price.toFixed(2)}` : "";

  // Duyarlılık hesapla
  let direction = "Nötr";
  let percentage = 50;
  if (arabica) {
    if (arabica.changePct > 1) {
      direction = "Yükseliş";
      percentage = Math.min(85, 60 + Math.round(arabica.changePct * 5));
    } else if (arabica.changePct < -1) {
      direction = "Düşüş";
      percentage = Math.max(15, 40 - Math.round(Math.abs(arabica.changePct) * 5));
    } else {
      percentage = 50 + Math.round(arabica.changePct * 3);
    }
  }

  // Supabase güncelle
  const contentUpdates = [
    { key: "home.sentiment.direction", value: direction },
    { key: "home.sentiment.percentage", value: String(percentage) },
    { key: "home.sentiment.note", value: `${priceInfo}${robustaInfo}${kurInfo}` },
    { key: "home.editor.content", value: `Piyasa ${direction.toLowerCase()} eğilimde. ${priceInfo}${robustaInfo}${kurInfo}.` },
  ];

  if (news.length > 0) {
    contentUpdates.push(
      { key: "home.hero.title", value: news[0].title },
      { key: "home.hero.subtitle", value: news[0].summary },
    );
  }

  for (const item of contentUpdates) {
    await supabase.from("site_content").upsert({ key: item.key, value: item.value }, { onConflict: "key" });
  }

  // Haberleri kuyruğa ekle (aynı başlık varsa ekleme — duplikasyon önle)
  let newsAdded = 0;
  for (const item of news.slice(0, 3)) {
    const { data: existing } = await supabase
      .from("content_queue")
      .select("id")
      .eq("title", item.title)
      .limit(1);

    if (!existing || existing.length === 0) {
      await supabase.from("content_queue").insert({
        type: "haber",
        title: item.title,
        content: item.summary,
        source_url: item.url,
        created_by: "cron-editor",
        status: "draft",
      });
      newsAdded++;
    }
  }

  log.push(`Editör: ${priceInfo}${robustaInfo} | ${news.length} haber bulundu, ${newsAdded} yeni eklendi | Duyarlılık: ${direction} ${percentage}%`);

  await supabase.from("agent_logs").insert({
    agent: "cron-editor",
    action: "Tarama tamamlandı",
    details: log[0],
    status: "success",
  });

  // ━━━ ADIM 2: TASARIM ━━━
  const { data: drafts } = await supabase
    .from("content_queue")
    .select("*")
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(10);

  let designedCount = 0;
  let heroImageUrl = "";

  if (drafts && drafts.length > 0) {
    for (let i = 0; i < drafts.length; i++) {
      const item = drafts[i];
      const imageUrl = pickImage(item.title || "", item.content || "", i);
      if (i === 0) heroImageUrl = imageUrl;

      const { error } = await supabase
        .from("content_queue")
        .update({
          image_url: imageUrl,
          status: "designed",
          notes: "Görsel otomatik seçildi (pipeline)",
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (!error) designedCount++;
    }

    if (heroImageUrl) {
      await supabase.from("site_content").upsert(
        { key: "home.hero.image", value: heroImageUrl },
        { onConflict: "key" }
      );
    }
  }

  log.push(`Tasarım: ${designedCount} habere görsel eklendi`);

  await supabase.from("agent_logs").insert({
    agent: "cron-design",
    action: "Görseller güncellendi",
    details: `${designedCount} habere görsel eklendi${heroImageUrl ? ", hero güncellendi" : ""}`,
    status: designedCount > 0 ? "success" : "warning",
  });

  // ━━━ ADIM 3: QA ━━━
  const qaResults: { category: string; item: string; status: string; details: string; severity: string }[] = [];

  // Fiyat doğrulama (zaten elimizde var, tekrar fetch yok)
  if (arabica) {
    const valid = arabica.price >= 100 && arabica.price <= 500;
    qaResults.push({
      category: "data_validation",
      item: "Arabica fiyat",
      status: valid ? "pass" : "warning",
      details: `${arabica.price.toFixed(2)} ¢/lb (aralık: 100-500)`,
      severity: valid ? "info" : "warning",
    });
  }

  if (robusta) {
    const valid = robusta.price >= 50 && robusta.price <= 300;
    qaResults.push({
      category: "data_validation",
      item: "Robusta fiyat",
      status: valid ? "pass" : "warning",
      details: `${robusta.price.toFixed(2)} ¢/lb (aralık: 50-300)`,
      severity: valid ? "info" : "warning",
    });
  }

  if (usdtry) {
    const valid = usdtry.price >= 20 && usdtry.price <= 60;
    qaResults.push({
      category: "data_validation",
      item: "USD/TRY kur",
      status: valid ? "pass" : "warning",
      details: `${usdtry.price.toFixed(2)} (aralık: 20-60)`,
      severity: valid ? "info" : "warning",
    });
  }

  // Haber verisi kontrolü
  qaResults.push({
    category: "data_validation",
    item: "Haber akışı",
    status: news.length > 0 ? "pass" : "fail",
    details: `${news.length} haber bulundu`,
    severity: news.length > 0 ? "info" : "critical",
  });

  // Designed haberleri onayla → published
  let publishedCount = 0;
  const { data: designed } = await supabase
    .from("content_queue")
    .select("*")
    .eq("status", "designed")
    .order("created_at", { ascending: false })
    .limit(10);

  if (designed && designed.length > 0) {
    for (const item of designed) {
      const hasTitle = item.title && item.title.length > 5;
      const hasImage = item.image_url && item.image_url.startsWith("https://");
      const hasContent = item.content && item.content.length > 10;

      if (hasTitle && hasImage && hasContent) {
        await supabase
          .from("content_queue")
          .update({
            status: "published",
            reviewed_by: "cron-qa",
            notes: `${item.notes || ""} | QA onaylandı`,
            updated_at: new Date().toISOString(),
          })
          .eq("id", item.id);

        publishedCount++;
        qaResults.push({
          category: "content_check",
          item: `Onay: ${(item.title || "").substring(0, 40)}`,
          status: "pass",
          details: "Başlık, içerik ve görsel mevcut — published",
          severity: "info",
        });
      } else {
        qaResults.push({
          category: "content_check",
          item: `Red: ${(item.title || "başlıksız").substring(0, 40)}`,
          status: "warning",
          details: `Eksik: ${!hasTitle ? "başlık " : ""}${!hasContent ? "içerik " : ""}${!hasImage ? "görsel" : ""}`,
          severity: "warning",
        });
      }
    }
  }

  // QA raporlarını yaz
  const passCount = qaResults.filter((r) => r.status === "pass").length;
  const warnCount = qaResults.filter((r) => r.status === "warning").length;
  const failCount = qaResults.filter((r) => r.status === "fail").length;

  if (qaResults.length > 0) {
    await supabase.from("qa_reports").insert(qaResults);
  }

  log.push(`QA: ${qaResults.length} test — ${passCount} pass, ${warnCount} warning, ${failCount} fail | ${publishedCount} haber onaylandı`);

  await supabase.from("agent_logs").insert({
    agent: "cron-qa",
    action: "QA testi tamamlandı",
    details: log[2],
    status: failCount > 0 ? "warning" : "success",
  });

  return NextResponse.json({
    success: true,
    pipeline: log,
    summary: {
      editor: { prices: Object.keys(prices).length, news: news.length, newsAdded },
      design: { designed: designedCount, heroUpdated: !!heroImageUrl },
      qa: { tests: qaResults.length, pass: passCount, warning: warnCount, fail: failCount, published: publishedCount },
    },
  });
}
