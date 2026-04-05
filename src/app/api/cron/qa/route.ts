import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://worldcoffee24.com";

function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

// Sayfa sağlık kontrolü
const PAGES = [
  "/",
  "/fiyat-merkezi",
  "/piyasa-faktorleri",
  "/hava-radari",
  "/haberler",
  "/bilgi-merkezi",
  "/bilgi-merkezi/futures-101",
  "/bilgi-merkezi/kahve-kusagi",
  "/bilgi-merkezi/isleme-yontemleri",
  "/bilgi-merkezi/grafik-okuma",
  "/bilgi-merkezi/terimler-sozlugu",
];

const API_ENDPOINTS = [
  "/api/prices",
  "/api/weather",
  "/api/news",
  "/api/content",
];

interface QAResult {
  category: string;
  item: string;
  status: "pass" | "warning" | "fail";
  details: string;
  severity: "info" | "warning" | "critical";
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const results: QAResult[] = [];

  // 1. Sayfa sağlık kontrolü
  for (const page of PAGES) {
    try {
      const res = await fetch(`${BASE_URL}${page}`, { method: "HEAD" });
      results.push({
        category: "site_health",
        item: page,
        status: res.ok ? "pass" : "fail",
        details: `HTTP ${res.status}`,
        severity: res.ok ? "info" : "critical",
      });
    } catch (err) {
      results.push({
        category: "site_health",
        item: page,
        status: "fail",
        details: `Bağlantı hatası: ${err instanceof Error ? err.message : "bilinmeyen"}`,
        severity: "critical",
      });
    }
  }

  // 2. API sağlık kontrolü + veri doğrulama
  for (const endpoint of API_ENDPOINTS) {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) {
        results.push({
          category: "api_health",
          item: endpoint,
          status: "fail",
          details: `HTTP ${res.status}`,
          severity: "critical",
        });
        continue;
      }

      const data = await res.json();
      results.push({
        category: "api_health",
        item: endpoint,
        status: "pass",
        details: `HTTP 200, veri mevcut`,
        severity: "info",
      });

      // Fiyat doğrulama
      if (endpoint === "/api/prices" && data.prices) {
        for (const p of data.prices) {
          if (p.price === null) continue;

          let valid = true;
          let range = "";

          if (p.label === "Arabica Coffee") {
            valid = p.price >= 100 && p.price <= 500;
            range = "100-500 ¢/lb";
          } else if (p.label === "Robusta Coffee") {
            valid = p.price >= 50 && p.price <= 300;
            range = "50-300 ¢/lb";
          } else if (p.label === "USD/TRY") {
            valid = p.price >= 20 && p.price <= 60;
            range = "20-60";
          }

          if (range) {
            results.push({
              category: "data_validation",
              item: p.label,
              status: valid ? "pass" : "warning",
              details: valid
                ? `${p.price} (aralık: ${range})`
                : `${p.price} aralık dışında! (beklenen: ${range})`,
              severity: valid ? "info" : "warning",
            });
          }
        }
      }

      // Hava durumu doğrulama
      if (endpoint === "/api/weather" && data.regions) {
        for (const r of data.regions) {
          if (r.temp === null || r.temp === undefined) continue;
          const valid = r.temp >= -10 && r.temp <= 50;
          results.push({
            category: "data_validation",
            item: `Hava: ${r.name || r.region}`,
            status: valid ? "pass" : "warning",
            details: `${r.temp}°C (aralık: -10 ile 50°C)`,
            severity: valid ? "info" : "warning",
          });
        }
      }
    } catch (err) {
      results.push({
        category: "api_health",
        item: endpoint,
        status: "fail",
        details: `Bağlantı hatası: ${err instanceof Error ? err.message : "bilinmeyen"}`,
        severity: "critical",
      });
    }
  }

  // 3. İçerik kuyruğu kontrolü — designed haberleri onayla
  try {
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

        if (hasTitle && hasImage) {
          // Onayla — published yap
          await supabase
            .from("content_queue")
            .update({
              status: "published",
              reviewed_by: "cron-qa",
              notes: `${item.notes || ""} | QA onaylandı`,
              updated_at: new Date().toISOString(),
            })
            .eq("id", item.id);

          results.push({
            category: "content_check",
            item: `Haber: ${item.title?.substring(0, 50)}`,
            status: "pass",
            details: "Başlık ve görsel mevcut, published yapıldı",
            severity: "info",
          });
        } else {
          results.push({
            category: "content_check",
            item: `Haber: ${item.title?.substring(0, 50) || "başlıksız"}`,
            status: "warning",
            details: `Eksik: ${!hasTitle ? "başlık " : ""}${!hasImage ? "görsel" : ""}`,
            severity: "warning",
          });
        }
      }
    }
  } catch {
    // devam et
  }

  // 4. Sonuçları Supabase'e yaz
  const passCount = results.filter((r) => r.status === "pass").length;
  const warnCount = results.filter((r) => r.status === "warning").length;
  const failCount = results.filter((r) => r.status === "fail").length;

  // QA raporlarını batch insert
  if (results.length > 0) {
    await supabase.from("qa_reports").insert(results);
  }

  // Log yaz
  await supabase.from("agent_logs").insert({
    agent: "cron-qa",
    action: "QA testi tamamlandı",
    details: `${results.length} test: ${passCount} pass, ${warnCount} warning, ${failCount} fail`,
    status: failCount > 0 ? "warning" : "success",
  });

  return NextResponse.json({
    success: true,
    total: results.length,
    pass: passCount,
    warning: warnCount,
    fail: failCount,
  });
}
