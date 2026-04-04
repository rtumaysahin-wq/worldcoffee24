import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Agent API key ile doğrulama
function isAgent(req: NextRequest) {
  const key = req.headers.get("x-agent-key");
  return key === process.env.AGENT_API_KEY;
}

export async function POST(req: NextRequest) {
  if (!isAgent(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { action, data } = await req.json();

  // İçerik güncelle (site_content)
  if (action === "update_content") {
    const { key, value } = data;
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // Toplu içerik güncelle
  if (action === "bulk_update_content") {
    const { items } = data;
    for (const item of items) {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key: item.key, value: item.value }, { onConflict: "key" });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  // İçerik kuyruğuna ekle
  if (action === "add_to_queue") {
    const { error } = await supabase.from("content_queue").insert(data);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // İçerik kuyruğunu güncelle
  if (action === "update_queue") {
    const { id, ...updates } = data;
    updates.updated_at = new Date().toISOString();
    const { error } = await supabase.from("content_queue").update(updates).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // QA raporu ekle
  if (action === "add_qa_report") {
    const { error } = await supabase.from("qa_reports").insert(data);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // Agent log ekle
  if (action === "log") {
    const { error } = await supabase.from("agent_logs").insert(data);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // İçerik kuyruğunu oku
  if (action === "get_queue") {
    const status = data?.status;
    let query = supabase.from("content_queue").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    const { data: items, error } = await query.limit(20);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ items });
  }

  // Site içeriğini oku
  if (action === "get_content") {
    const { data: items, error } = await supabase.from("site_content").select("key, value");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const content: Record<string, string> = {};
    items.forEach((row) => { content[row.key] = row.value; });
    return NextResponse.json({ content });
  }

  // QA raporlarını oku
  if (action === "get_qa_reports") {
    const { data: reports, error } = await supabase
      .from("qa_reports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ reports });
  }

  return NextResponse.json({ error: "Bilinmeyen action" }, { status: 400 });
}
