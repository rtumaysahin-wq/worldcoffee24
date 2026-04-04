import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export async function GET() {
  const { data, error } = await supabase.from("site_content").select("key, value");

  if (error || !data) {
    return NextResponse.json({ content: {} });
  }

  const content: Record<string, string> = {};
  data.forEach((row) => {
    content[row.key] = row.value;
  });

  return NextResponse.json({ content });
}
