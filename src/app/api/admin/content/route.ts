import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isAuth(req: NextRequest) {
  return req.cookies.get("wc24_admin")?.value === "authenticated";
}

// GET — tüm içeriği çek
export async function GET(req: NextRequest) {
  if (!isAuth(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const [notes, sentiment, article] = await Promise.all([
    supabase.from("editor_notes").select("*").order("created_at", { ascending: false }).limit(1),
    supabase.from("market_sentiment").select("*").order("updated_at", { ascending: false }).limit(1),
    supabase.from("featured_article").select("*").order("updated_at", { ascending: false }).limit(1),
  ]);

  return NextResponse.json({
    editorNote: notes.data?.[0] || null,
    sentiment: sentiment.data?.[0] || null,
    featuredArticle: article.data?.[0] || null,
  });
}

// POST — içerik güncelle
export async function POST(req: NextRequest) {
  if (!isAuth(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await req.json();
  const { type, data } = body;

  if (type === "editor_note") {
    const { error } = await supabase.from("editor_notes").insert({
      content: data.content,
      author: data.author || "WC24 Editör",
      author_title: data.author_title || "Baş Emtia Stratejisti",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (type === "sentiment") {
    const { error } = await supabase.from("market_sentiment").insert({
      direction: data.direction,
      percentage: data.percentage,
      note: data.note,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (type === "featured_article") {
    const { error } = await supabase.from("featured_article").insert({
      tag: data.tag || "Analiz",
      title: data.title,
      subtitle: data.subtitle,
      image_url: data.image_url,
      read_time: data.read_time || "12 Dk Okuma",
      link: data.link || "/bilgi-merkezi/futures-101",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
