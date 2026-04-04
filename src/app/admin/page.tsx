"use client";

import { useState, useEffect } from "react";

interface EditorNote {
  id: string;
  content: string;
  author: string;
  author_title: string;
}

interface Sentiment {
  id: string;
  direction: string;
  percentage: number;
  note: string;
}

interface FeaturedArticle {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image_url: string;
  read_time: string;
  link: string;
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [saving, setSaving] = useState("");
  const [saved, setSaved] = useState("");

  // Form states
  const [note, setNote] = useState({ content: "", author: "WC24 Editör", author_title: "Baş Emtia Stratejisti" });
  const [sentiment, setSentiment] = useState({ direction: "Yükseliş", percentage: 78, note: "" });
  const [article, setArticle] = useState({ tag: "Analiz", title: "", subtitle: "", image_url: "", read_time: "12 Dk Okuma", link: "/bilgi-merkezi/futures-101" });

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
    if (data.editorNote) setNote({ content: data.editorNote.content, author: data.editorNote.author, author_title: data.editorNote.author_title });
    if (data.sentiment) setSentiment({ direction: data.sentiment.direction, percentage: data.sentiment.percentage, note: data.sentiment.note });
    if (data.featuredArticle) setArticle({
      tag: data.featuredArticle.tag,
      title: data.featuredArticle.title,
      subtitle: data.featuredArticle.subtitle || "",
      image_url: data.featuredArticle.image_url || "",
      read_time: data.featuredArticle.read_time || "12 Dk Okuma",
      link: data.featuredArticle.link || "/bilgi-merkezi/futures-101",
    });
  }

  async function saveContent(type: string, data: Record<string, unknown>) {
    setSaving(type);
    setSaved("");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
    setSaving("");
    if (res.ok) {
      setSaved(type);
      setTimeout(() => setSaved(""), 3000);
    }
  }

  useEffect(() => {
    // Cookie varsa otomatik giriş dene
    fetch("/api/admin/content").then((r) => {
      if (r.ok) { setLoggedIn(true); loadContent(); }
    });
  }, []);

  // ═══ LOGIN EKRANI ═══
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
          <label className="text-xs uppercase tracking-widest block mb-1.5" style={{ color: "#5f5e58" }}>
            Şifre
          </label>
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
          <button
            onClick={handleLogin}
            className="w-full py-3 text-sm font-bold uppercase tracking-widest"
            style={{ backgroundColor: "#32170d", color: "#fff" }}
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full border px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#32170d]";
  const labelClass = "text-[11px] uppercase tracking-widest block mb-1.5 font-semibold";

  // ═══ ADMIN PANEL ═══
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4fafe" }}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4" style={{ backgroundColor: "#32170d" }}>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl" style={{ color: "#ecbcaa" }}>coffee</span>
          <span className="font-headline font-bold" style={{ color: "#fff" }}>
            WC24 <span style={{ color: "#ecbcaa" }}>Admin Panel</span>
          </span>
        </div>
        <a href="/" className="text-xs uppercase tracking-widest" style={{ color: "#ecbcaa" }}>
          ← Siteye Dön
        </a>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">

        {/* ═══ EDİTÖR NOTU ═══ */}
        <section className="p-6" style={{ backgroundColor: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined" style={{ color: "#32170d" }}>edit_note</span>
            <h2 className="font-headline text-xl font-bold" style={{ color: "#32170d" }}>Editörün Günlük Notu</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelClass} style={{ color: "#5f5e58" }}>Not İçeriği</label>
              <textarea
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                rows={4}
                className={inputClass}
                style={{ borderColor: "#d5c3bd" }}
                placeholder="Bugünkü piyasa yorumunuz..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Yazar</label>
                <input value={note.author} onChange={(e) => setNote({ ...note, author: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} />
              </div>
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Ünvan</label>
                <input value={note.author_title} onChange={(e) => setNote({ ...note, author_title: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} />
              </div>
            </div>
            <button
              onClick={() => saveContent("editor_note", note)}
              disabled={saving === "editor_note" || !note.content}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              style={{ backgroundColor: "#32170d", color: "#fff" }}
            >
              {saving === "editor_note" ? "Kaydediliyor..." : saved === "editor_note" ? "✓ Kaydedildi" : "Kaydet"}
            </button>
          </div>
        </section>

        {/* ═══ PİYASA DUYARLILIĞI ═══ */}
        <section className="p-6" style={{ backgroundColor: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined" style={{ color: "#32170d" }}>trending_up</span>
            <h2 className="font-headline text-xl font-bold" style={{ color: "#32170d" }}>Piyasa Duyarlılığı</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Yön</label>
                <select
                  value={sentiment.direction}
                  onChange={(e) => setSentiment({ ...sentiment, direction: e.target.value })}
                  className={inputClass}
                  style={{ borderColor: "#d5c3bd" }}
                >
                  <option>Yükseliş</option>
                  <option>Düşüş</option>
                  <option>Nötr</option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Yüzde (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={sentiment.percentage}
                  onChange={(e) => setSentiment({ ...sentiment, percentage: parseInt(e.target.value) || 0 })}
                  className={inputClass}
                  style={{ borderColor: "#d5c3bd" }}
                />
              </div>
            </div>
            <div>
              <label className={labelClass} style={{ color: "#5f5e58" }}>Açıklama</label>
              <textarea
                value={sentiment.note}
                onChange={(e) => setSentiment({ ...sentiment, note: e.target.value })}
                rows={2}
                className={inputClass}
                style={{ borderColor: "#d5c3bd" }}
                placeholder="Piyasa duyarlılığı hakkında kısa yorum..."
              />
            </div>
            <button
              onClick={() => saveContent("sentiment", sentiment)}
              disabled={saving === "sentiment"}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              style={{ backgroundColor: "#32170d", color: "#fff" }}
            >
              {saving === "sentiment" ? "Kaydediliyor..." : saved === "sentiment" ? "✓ Kaydedildi" : "Kaydet"}
            </button>
          </div>
        </section>

        {/* ═══ ÖNE ÇIKAN HABER ═══ */}
        <section className="p-6" style={{ backgroundColor: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined" style={{ color: "#32170d" }}>newspaper</span>
            <h2 className="font-headline text-xl font-bold" style={{ color: "#32170d" }}>Öne Çıkan Haber (Hero)</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Etiket</label>
                <input value={article.tag} onChange={(e) => setArticle({ ...article, tag: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} placeholder="Analiz" />
              </div>
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Okuma Süresi</label>
                <input value={article.read_time} onChange={(e) => setArticle({ ...article, read_time: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} placeholder="12 Dk Okuma" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={{ color: "#5f5e58" }}>Başlık</label>
              <input value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} placeholder="Ana haber başlığı..." />
            </div>
            <div>
              <label className={labelClass} style={{ color: "#5f5e58" }}>Alt Başlık</label>
              <textarea value={article.subtitle} onChange={(e) => setArticle({ ...article, subtitle: e.target.value })} rows={2} className={inputClass} style={{ borderColor: "#d5c3bd" }} placeholder="Kısa açıklama..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Görsel URL</label>
                <input value={article.image_url} onChange={(e) => setArticle({ ...article, image_url: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} placeholder="https://images.unsplash.com/..." />
              </div>
              <div>
                <label className={labelClass} style={{ color: "#5f5e58" }}>Link</label>
                <input value={article.link} onChange={(e) => setArticle({ ...article, link: e.target.value })} className={inputClass} style={{ borderColor: "#d5c3bd" }} placeholder="/bilgi-merkezi/futures-101" />
              </div>
            </div>
            <button
              onClick={() => saveContent("featured_article", article)}
              disabled={saving === "featured_article" || !article.title}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              style={{ backgroundColor: "#32170d", color: "#fff" }}
            >
              {saving === "featured_article" ? "Kaydediliyor..." : saved === "featured_article" ? "✓ Kaydedildi" : "Kaydet"}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
