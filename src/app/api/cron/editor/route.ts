import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Vercel Cron doğrulama
function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

// Kahve haber kaynaklarını tara
async function fetchCoffeeNews(): Promise<{ title: string; summary: string; source: string; url: string }[]> {
  const news: { title: string; summary: string; source: string; url: string }[] = [];

  try {
    const res = await fetch("https://worldcoffee24.com/api/news");
    if (res.ok) {
      const data = await res.json();
      if (data.news) {
        for (const item of data.news.slice(0, 5)) {
          news.push({
            title: item.title || "",
            summary: item.summary || "",
            source: item.source || "",
            url: item.link || "",
          });
        }
      }
    }
  } catch {
    // devam et
  }

  return news;
}

// Fiyat verilerini çek
async function fetchPrices(): Promise<Record<string, { price: number; changePct: number }>> {
  const prices: Record<string, { price: number; changePct: number }> = {};

  try {
    const res = await fetch("https://worldcoffee24.com/api/prices");
    if (res.ok) {
      const data = await res.json();
      for (const p of data.prices || []) {
        if (p.price !== null) {
          prices[p.label] = { price: p.price, changePct: p.changePct || 0 };
        }
      }
    }
  } catch {
    // devam et
  }

  return prices;
}

// Saat dilimine göre görev türünü belirle
function getTaskType(): "morning" | "midday" | "evening" {
  const hour = new Date().getUTCHours();
  if (hour <= 7) return "morning";    // UTC 06 = TR 09
  if (hour <= 10) return "midday";    // UTC 09 = TR 12
  return "evening";                    // UTC 15 = TR 18
}

export async function GET(req: NextRequest) {
  // Vercel Cron doğrulama
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const taskType = getTaskType();
  const [news, prices] = await Promise.all([fetchCoffeeNews(), fetchPrices()]);

  const arabica = prices["Arabica Coffee"];
  const robusta = prices["Robusta Coffee"];
  const usdtry = prices["USD/TRY"];

  // Editör notu oluştur
  const priceInfo = arabica
    ? `Arabica ${arabica.price.toFixed(2)} ¢/lb (${arabica.changePct >= 0 ? "+" : ""}${arabica.changePct.toFixed(2)}%)`
    : "";
  const robustaInfo = robusta
    ? `, Robusta ${robusta.price.toFixed(2)} ¢/lb`
    : "";
  const kurInfo = usdtry
    ? `. USD/TRY ${usdtry.price.toFixed(2)}`
    : "";

  // Piyasa duyarlılığı hesapla
  let direction = "Nötr";
  let percentage = 50;
  if (arabica) {
    if (arabica.changePct > 1) { direction = "Yükseliş"; percentage = Math.min(85, 60 + Math.round(arabica.changePct * 5)); }
    else if (arabica.changePct < -1) { direction = "Düşüş"; percentage = Math.max(15, 40 - Math.round(Math.abs(arabica.changePct) * 5)); }
    else { direction = "Nötr"; percentage = 50 + Math.round(arabica.changePct * 3); }
  }

  // İçerik güncelle
  const updates = [
    { key: "home.sentiment.direction", value: direction },
    { key: "home.sentiment.percentage", value: String(percentage) },
    { key: "home.sentiment.note", value: `${priceInfo}${robustaInfo}${kurInfo}. ${taskType === "morning" ? "Sabah" : taskType === "midday" ? "Öğle" : "Akşam"} taraması.` },
  ];

  // Sabah taramasında editör notu ve hero da güncelle
  if (taskType === "morning" && news.length > 0) {
    updates.push(
      { key: "home.editor.content", value: `Piyasa ${direction.toLowerCase()} eğilimde. ${priceInfo}${robustaInfo}${kurInfo}.` },
      { key: "home.hero.title", value: news[0].title },
      { key: "home.hero.subtitle", value: news[0].summary },
    );

    // Haberleri kuyruğa ekle
    for (const item of news.slice(0, 3)) {
      await supabase.from("content_queue").insert({
        type: "haber",
        title: item.title,
        content: item.summary,
        source_url: item.url,
        created_by: "cron-editor",
        status: "draft",
      });
    }
  }

  // Supabase güncelle
  for (const item of updates) {
    await supabase.from("site_content").upsert(
      { key: item.key, value: item.value },
      { onConflict: "key" }
    );
  }

  // Log yaz
  await supabase.from("agent_logs").insert({
    agent: "cron-editor",
    action: `${taskType === "morning" ? "Sabah" : taskType === "midday" ? "Öğle" : "Akşam"} taraması tamamlandı`,
    details: `${priceInfo}${robustaInfo} | ${news.length} haber | Duyarlılık: ${direction} ${percentage}%`,
    status: "success",
  });

  return NextResponse.json({
    success: true,
    taskType,
    direction,
    percentage,
    newsCount: news.length,
  });
}
