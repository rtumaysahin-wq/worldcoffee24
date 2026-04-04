"use client";

import { useState, useEffect } from "react";

interface ContentItem {
  key: string;
  value: string;
  label: string;
  page: string;
  content_type: string;
}

interface MailchimpData {
  totalSubscribers: number;
  unsubscribed: number;
  cleaned: number;
  avgOpenRate: string;
  avgClickRate: string;
  listName: string;
  members: { email: string; status: string; joined: string; name: string }[];
  recentActivity: { day: string; subs: number; unsubs: number }[];
}

const PAGES = ["Ana Sayfa", "Fiyat Merkezi", "Piyasa Faktörleri", "Hava Radarı", "Mailchimp"];

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [activePage, setActivePage] = useState("Ana Sayfa");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [changed, setChanged] = useState<Set<string>>(new Set());
  const [mailchimp, setMailchimp] = useState<MailchimpData | null>(null);
  const [mcLoading, setMcLoading] = useState(false);

  async function handleLogin() {
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setLoggedIn(true);
      loadContent();
    } else {
      setLoginError("Geçersiz şifre");
    }
  }

  async function loadContent() {
    const res = await fetch("/api/admin/content");
    if (!res.ok) return;
    const data = await res.json();
    setItems(data.items || []);
  }

  async function loadMailchimp() {
    setMcLoading(true);
    const res = await fetch("/api/admin/mailchimp");
    if (res.ok) {
      const data = await res.json();
      setMailchimp(data);
    }
    setMcLoading(false);
  }

  function updateValue(key: string, value: string) {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, value } : i)));
    setChanged((prev) => new Set(prev).add(key));
    setSaved(false);
  }

  async function saveAll() {
    setSaving(true);
    const toSave = items.filter((i) => changed.has(i.key)).map((i) => ({ key: i.key, value: i.value }));
    if (toSave.length === 0) { setSaving(false); return; }

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: toSave }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setChanged(new Set());
      setTimeout(() => setSaved(false), 3000);
    }
  }

  useEffect(() => {
    fetch("/api/admin/content").then((r) => {
      if (r.ok) { setLoggedIn(true); loadContent(); }
    });
  }, []);

  const pageItems = items.filter((i) => i.page === activePage);

  // ═══ LOGIN ═══
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f4fafe" }}>
        <div className="w-full max-w-sm p-8" style={{ backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-2xl" style={{ color: "#32170d" }}>coffee</span>
            <span className="font-headline font-bold text-lg" style={{ color: "#32170d" }}>
              WC24 <span style={{ color: "#4b2c20" }}>Admin</span>
            </span>
          </div>
          <label className="text-xs uppercase tracking-widest block mb-1.5" style={{ color: "#5f5e58" }}>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border px-4 py-3 text-sm outline-none mb-4"
            style={{ borderColor: "#d5c3bd" }}
            placeholder="Admin şifresi"
          />
          {loginError && <p className="text-sm mb-3" style={{ color: "#ba1a1a" }}>{loginError}</p>}
          <button onClick={handleLogin} className="w-full py-3 text-sm font-bold uppercase tracking-widest" style={{ backgroundColor: "#32170d", color: "#fff" }}>
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  // ═══ ADMIN PANEL ═══
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4fafe" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-3" style={{ backgroundColor: "#32170d" }}>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl" style={{ color: "#ecbcaa" }}>coffee</span>
          <span className="font-headline font-bold" style={{ color: "#fff" }}>
            WC24 <span style={{ color: "#ecbcaa" }}>Admin Panel</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {changed.size > 0 && (
            <span className="text-xs" style={{ color: "#ecbcaa" }}>
              {changed.size} değişiklik kaydedilmedi
            </span>
          )}
          <button
            onClick={saveAll}
            disabled={saving || changed.size === 0}
            className="px-5 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-40 transition-colors"
            style={{ backgroundColor: saved ? "#166534" : "#ecbcaa", color: saved ? "#fff" : "#32170d" }}
          >
            {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Tümünü Kaydet"}
          </button>
          <a href="/" className="text-xs uppercase tracking-widest" style={{ color: "#ecbcaa" }}>
            Siteye Dön
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Sayfa Tabları */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PAGES.map((page) => {
            const count = page === "Mailchimp" ? 0 : items.filter((i) => i.page === page).length;
            const hasChanges = items.filter((i) => i.page === page && changed.has(i.key)).length > 0;
            return (
              <button
                key={page}
                onClick={() => {
                  setActivePage(page);
                  if (page === "Mailchimp" && !mailchimp) loadMailchimp();
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors relative"
                style={
                  activePage === page
                    ? { backgroundColor: page === "Mailchimp" ? "#FFE01B" : "#32170d", color: page === "Mailchimp" ? "#000" : "#fff" }
                    : { backgroundColor: "#e2e9ec", color: "#161d1f" }
                }
              >
                {page === "Mailchimp" ? "📧 Mailchimp" : `${page} (${count})`}
                {hasChanges && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ba1a1a" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* ═══ MAİLCHİMP TAB ═══ */}
        {activePage === "Mailchimp" && (
          <div className="space-y-6">
            {mcLoading ? (
              <div className="p-10 text-center" style={{ backgroundColor: "#fff" }}>
                <span className="material-symbols-outlined text-4xl animate-spin" style={{ color: "#83746f" }}>progress_activity</span>
                <p className="text-sm mt-3" style={{ color: "#5f5e58" }}>Mailchimp verileri yükleniyor...</p>
              </div>
            ) : !mailchimp ? (
              <div className="p-10 text-center" style={{ backgroundColor: "#fff" }}>
                <p className="text-sm" style={{ color: "#5f5e58" }}>Mailchimp verileri yüklenemedi.</p>
              </div>
            ) : (
              <>
                {/* İstatistik Kartları */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Toplam Abone", value: mailchimp.totalSubscribers, icon: "group", color: "#166534" },
                    { label: "Abonelikten Çıkan", value: mailchimp.unsubscribed, icon: "person_remove", color: "#ba1a1a" },
                    { label: "Ort. Açılma Oranı", value: `${mailchimp.avgOpenRate}%`, icon: "mail", color: "#b45309" },
                    { label: "Ort. Tıklama Oranı", value: `${mailchimp.avgClickRate}%`, icon: "ads_click", color: "#1d4ed8" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5" style={{ backgroundColor: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-lg" style={{ color: stat.color }}>{stat.icon}</span>
                        <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#5f5e58" }}>{stat.label}</span>
                      </div>
                      <p className="font-headline text-3xl font-bold" style={{ color: "#32170d" }}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Liste Bilgisi */}
                <div className="p-5" style={{ backgroundColor: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                  <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#5f5e58" }}>Liste Adı</p>
                  <p className="text-sm font-bold" style={{ color: "#32170d" }}>{mailchimp.listName}</p>
                </div>

                {/* Son 7 Gün Aktivite */}
                {mailchimp.recentActivity.length > 0 && (
                  <div className="p-5" style={{ backgroundColor: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                    <h3 className="font-headline text-lg font-bold mb-4" style={{ color: "#32170d" }}>Son 7 Gün Aktivite</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {mailchimp.recentActivity.map((day) => (
                        <div key={day.day} className="text-center p-3" style={{ backgroundColor: "#f4fafe" }}>
                          <p className="text-[10px] mb-1" style={{ color: "#5f5e58" }}>
                            {new Date(day.day).toLocaleDateString("tr", { day: "numeric", month: "short" })}
                          </p>
                          <p className="font-bold text-sm" style={{ color: day.subs > 0 ? "#166534" : "#32170d" }}>
                            +{day.subs}
                          </p>
                          {day.unsubs > 0 && (
                            <p className="text-xs" style={{ color: "#ba1a1a" }}>-{day.unsubs}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Son Aboneler */}
                <div className="p-5" style={{ backgroundColor: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-headline text-lg font-bold" style={{ color: "#32170d" }}>Son Aboneler</h3>
                    <button onClick={loadMailchimp} className="text-xs uppercase tracking-widest font-bold" style={{ color: "#5f5e58" }}>
                      Yenile
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-widest" style={{ color: "#5f5e58", borderBottom: "1px solid #d5c3bd" }}>
                          <th className="pb-3">E-posta</th>
                          <th className="pb-3">Durum</th>
                          <th className="pb-3">Katılma Tarihi</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {mailchimp.members.map((m) => (
                          <tr key={m.email} style={{ borderBottom: "1px solid #eef5f8" }}>
                            <td className="py-3 font-bold" style={{ color: "#32170d" }}>{m.email}</td>
                            <td className="py-3">
                              <span
                                className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5"
                                style={{
                                  backgroundColor: m.status === "subscribed" ? "#dcfce7" : "#fee2e2",
                                  color: m.status === "subscribed" ? "#166534" : "#ba1a1a",
                                }}
                              >
                                {m.status === "subscribed" ? "Aktif" : m.status === "unsubscribed" ? "Çıkmış" : m.status}
                              </span>
                            </td>
                            <td className="py-3" style={{ color: "#5f5e58" }}>
                              {m.joined ? new Date(m.joined).toLocaleDateString("tr", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                            </td>
                          </tr>
                        ))}
                        {mailchimp.members.length === 0 && (
                          <tr>
                            <td colSpan={3} className="py-6 text-center" style={{ color: "#5f5e58" }}>Henüz abone yok.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══ İÇERİK ALANLARI ═══ */}
        {activePage !== "Mailchimp" && <div className="space-y-4">
          {pageItems.map((item) => (
            <div
              key={item.key}
              className="p-5 transition-all"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                borderLeft: changed.has(item.key) ? "3px solid #b45309" : "3px solid transparent",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "#5f5e58" }}>
                  {item.label}
                </label>
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5" style={{ backgroundColor: "#e2e9ec", color: "#5f5e58" }}>
                  {item.content_type === "image" ? "Görsel URL" : item.content_type === "textarea" ? "Uzun Metin" : item.content_type === "number" ? "Sayı" : item.content_type === "select" ? "Seçim" : "Metin"}
                </span>
              </div>

              {/* Görsel önizleme */}
              {item.content_type === "image" && item.value && (
                <div className="mb-3 relative h-32 w-full overflow-hidden" style={{ backgroundColor: "#e2e9ec" }}>
                  <img src={item.value} alt={item.label} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Input türüne göre alan */}
              {item.content_type === "textarea" ? (
                <textarea
                  value={item.value}
                  onChange={(e) => updateValue(item.key, e.target.value)}
                  rows={3}
                  className="w-full border px-4 py-3 text-sm outline-none resize-y"
                  style={{ borderColor: "#d5c3bd" }}
                />
              ) : item.content_type === "select" ? (
                <select
                  value={item.value}
                  onChange={(e) => updateValue(item.key, e.target.value)}
                  className="w-full border px-4 py-3 text-sm outline-none"
                  style={{ borderColor: "#d5c3bd" }}
                >
                  <option>Yükseliş</option>
                  <option>Düşüş</option>
                  <option>Nötr</option>
                </select>
              ) : (
                <input
                  type={item.content_type === "number" ? "number" : "text"}
                  value={item.value}
                  onChange={(e) => updateValue(item.key, e.target.value)}
                  className="w-full border px-4 py-3 text-sm outline-none"
                  style={{ borderColor: "#d5c3bd" }}
                />
              )}

              <p className="mt-1.5 text-[10px]" style={{ color: "#83746f" }}>
                {item.key}
              </p>
            </div>
          ))}

          {pageItems.length === 0 && (
            <div className="p-10 text-center" style={{ backgroundColor: "#fff" }}>
              <p className="text-sm" style={{ color: "#5f5e58" }}>Bu sayfada düzenlenebilir içerik yok.</p>
            </div>
          )}
        </div>}

        {/* Alt Kaydet Butonu */}
        {changed.size > 0 && (
          <div className="sticky bottom-4 mt-6 flex justify-end">
            <button
              onClick={saveAll}
              disabled={saving}
              className="px-8 py-3 text-sm font-bold uppercase tracking-widest shadow-lg disabled:opacity-50"
              style={{ backgroundColor: "#32170d", color: "#fff" }}
            >
              {saving ? "Kaydediliyor..." : `${changed.size} Değişikliği Kaydet`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
