import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isAuth(req: NextRequest) {
  return req.cookies.get("wc24_admin")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const [queueRes, qaRes, logsRes] = await Promise.all([
    supabase.from("content_queue").select("*").order("created_at", { ascending: false }).limit(20),
    supabase.from("qa_reports").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("agent_logs").select("*").order("created_at", { ascending: false }).limit(30),
  ]);

  return NextResponse.json({
    queue: queueRes.data || [],
    qaReports: qaRes.data || [],
    agentLogs: logsRes.data || [],
  });
}
