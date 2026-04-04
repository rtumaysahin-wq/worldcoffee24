import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isAuth(req: NextRequest) {
  return req.cookies.get("wc24_admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { data } = await supabase
    .from("site_content")
    .select("*")
    .order("page")
    .order("key");

  return NextResponse.json({ items: data || [] });
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { items } = await req.json();

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
  }

  for (const item of items) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key: item.key, value: item.value }, { onConflict: "key" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
