"use client";

import { useState, useEffect } from "react";

interface ContentItem {
  key: string;
  value: string;
  label: string;
  page: string;
  content_type: string;
}

const PAGES = ["Ana Sayfa", "Fiyat Merkezi", "Piyasa Faktörleri", "Hava Radarı"];

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [activePage, setActivePage] = useState("Ana Sayfa");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [changed, setChanged] = useState<Set<string>>(new Set());

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
            const count = items.filter((i) => i.page === page).length;
            const hasChanges = items.filter((i) => i.page === page && changed.has(i.key)).length > 0;
            return (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors relative"
                style={
                  activePage === page
                    ? { backgroundColor: "#32170d", color: "#fff" }
                    : { backgroundColor: "#e2e9ec", color: "#161d1f" }
                }
              >
                {page} ({count})
                {hasChanges && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ba1a1a" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* İçerik Alanları */}
        <div className="space-y-4">
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
        </div>

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
