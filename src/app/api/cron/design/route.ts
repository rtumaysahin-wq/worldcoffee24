import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

// Haber konusuna göre Unsplash görsel eşleştirme
const IMAGE_MAP: Record<string, string> = {
  fiyat:   "photo-1611974789855-9c2a0a7236a3",
  piyasa:  "photo-1611974789855-9c2a0a7236a3",
  borsa:   "photo-1611974789855-9c2a0a7236a3",
  hasat:   "photo-1501004318855-e4cca44a0e498",
  üretim:  "photo-1501004318855-e4cca44a0e498",
  iklim:   "photo-1470071459604-3b5ec3a7fe05",
  kuraklık:"photo-1470071459604-3b5ec3a7fe05",
  sürdürülebilir: "photo-1524350876685-274059332603",
  organik: "photo-1524350876685-274059332603",
  lojistik:"photo-1494412574643-ff11b0a5eb95",
  ihracat: "photo-1494412574643-ff11b0a5eb95",
  brezilya:"photo-1516306580123-e6e52b1b7b5f",
  vietnam: "photo-1509042239860-f550ce710b93",
  çekirdek:"photo-1447933601403-0c6688de566e",
  kavurma: "photo-1442512595331-e89e73853f31",
  barista: "photo-1442512595331-e89e73853f31",
};

const DEFAULT_IMAGES = [
  "photo-1495474472287-4d71bcdd2085",
  "photo-1447933601403-0c6688de566e",
  "photo-1442512595331-e89e73853f31",
  "photo-1501004318855-e4cca44a0e498",
];

function pickImage(title: string, content: string, index: number): string {
  const text = `${title} ${content}`.toLocaleLowerCase("tr");
  for (const [keyword, photoId] of Object.entries(IMAGE_MAP)) {
    if (text.includes(keyword)) {
      return `https://images.unsplash.com/${photoId}?w=1200&q=80`;
    }
  }
  return `https://images.unsplash.com/${DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]}?w=1200&q=80`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  // Draft haberleri çek
  const { data: drafts, error: fetchErr } = await supabase
    .from("content_queue")
    .select("*")
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(10);

  if (fetchErr) {
    await logAgent("Tasarım hatası: draft çekme başarısız", fetchErr.message, "fail");
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }

  if (!drafts || drafts.length === 0) {
    await logAgent("Tasarım: draft yok", "İşlenecek draft haber bulunamadı", "success");
    return NextResponse.json({ success: true, designed: 0, message: "Draft yok" });
  }

  let designedCount = 0;
  let heroImageUrl = "";

  for (let i = 0; i < drafts.length; i++) {
    const item = drafts[i];
    const imageUrl = pickImage(item.title || "", item.content || "", i);

    // İlk haber = hero image
    if (i === 0) heroImageUrl = imageUrl;

    const { error: updateErr } = await supabase
      .from("content_queue")
      .update({
        image_url: imageUrl,
        status: "designed",
        notes: `Görsel otomatik seçildi (cron-design)`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (!updateErr) designedCount++;
  }

  // Hero image güncelle
  if (heroImageUrl) {
    await supabase
      .from("site_content")
      .upsert({ key: "home.hero.image", value: heroImageUrl }, { onConflict: "key" });
  }

  await logAgent(
    "Tasarım tamamlandı",
    `${designedCount} habere görsel eklendi, hero image güncellendi`,
    "success"
  );

  return NextResponse.json({
    success: true,
    designed: designedCount,
    heroImage: heroImageUrl,
  });
}

async function logAgent(action: string, details: string, status: string) {
  await supabase.from("agent_logs").insert({
    agent: "cron-design",
    action,
    details,
    status,
  });
}
