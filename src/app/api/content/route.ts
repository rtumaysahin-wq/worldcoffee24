import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // 1 dakika cache

export async function GET() {
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
