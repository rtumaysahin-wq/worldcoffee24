"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

interface NewsItem {
  title: string;
  summary: string;
  link: string;
  date: string;
  source: string;
}

const categories = ["Tümü", "Daily Coffee News", "Sprudge", "Perfect Daily Grind", "Google News"];

const sourceColors: Record<string, string> = {
  "Daily Coffee News": "bg-primary",
  "Sprudge": "bg-tertiary",
  "Perfect Daily Grind": "bg-secondary",
  "Google News": "bg-on-tertiary-container",
};

const newsSourceCards = [
  { name: "Daily Coffee News", desc: "Specialty kahve sektöründen günlük haberler ve analizler.", url: "https://dailycoffeenews.com/" },
  { name: "Perfect Daily Grind", desc: "Kahve üretiminden tüketimine, sektör profesyonelleri için içerikler.", url: "https://www.perfectdailygrind.com/" },
  { name: "Sprudge", desc: "Küresel kahve kültürü, etkinlikler ve trendler.", url: "https://sprudge.com/" },
  { name: "Global Coffee Report", desc: "Küresel kahve endüstrisi haberleri ve pazar analizi.", url: "http://www.gcrmag.com/" },
  { name: "Roast Magazine", desc: "Kavurma endüstrisi, ekipman ve işletme yönetimi odaklı yayın.", url: "https://www.roastmagazine.com/" },
];

export default function Haberler() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.news && data.news.length > 0) {
          setNews(data.news);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filtered =
    activeCategory === "Tümü"
      ? news
      : news.filter((n) => n.source === activeCategory);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10 md:py-12">

          {/* ═══ HEADER ═══ */}
          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-3 block">
                  Güncel Haberler
                </span>
                <h1 className="font-headline text-4xl md:text-5xl font-light text-primary leading-none mb-3">
                  Haberler &amp; Analiz
                </h1>
                <p className="text-secondary text-sm md:text-base">
                  Küresel kahve piyasasından canlı haber akışı — RSS kaynaklarından otomatik güncellenir.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3">
                <span className="material-symbols-outlined text-sm text-secondary">rss_feed</span>
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">
                  Canlı RSS Akışı &bull; {news.length} haber
                </span>
              </div>
            </div>
          </header>

          {/* ═══ KATEGORİ FİLTRELERİ ═══ */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-outline-variant/20 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-surface-container-high text-secondary hover:bg-surface-container-highest"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">

            {/* ═══ SOL: CANLI HABERLER ═══ */}
            <section className="col-span-12 lg:col-span-8 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="font-headline text-2xl font-bold">Canlı Haber Akışı</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-surface-container-lowest p-6 md:p-8 editorial-shadow animate-pulse">
                      <div className="h-4 bg-surface-container-high rounded w-20 mb-4" />
                      <div className="h-6 bg-surface-container-high rounded w-3/4 mb-3" />
                      <div className="h-4 bg-surface-container-high rounded w-full mb-2" />
                      <div className="h-4 bg-surface-container-high rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-surface-container-lowest p-10 text-center editorial-shadow">
                  <span className="material-symbols-outlined text-4xl text-error mb-3 block">error</span>
                  <p className="text-sm text-error font-bold mb-1">Haberler yüklenemedi</p>
                  <p className="text-xs text-secondary">Lütfen daha sonra tekrar deneyin.</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-surface-container-lowest p-10 text-center editorial-shadow">
                  <p className="text-sm text-secondary">Bu kategoride haber bulunamadı.</p>
                </div>
              ) : (
                filtered.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface-container-lowest editorial-shadow hover:-translate-y-0.5 transition-all"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white ${
                            sourceColors[item.source] || "bg-primary-container"
                          }`}
                        >
                          {item.source}
                        </span>
                        {item.date && (
                          <span className="text-[10px] text-outline">
                            {new Date(item.date).toLocaleDateString("tr", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <h3 className="font-headline text-xl md:text-2xl mb-2 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="text-sm text-secondary leading-relaxed">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </a>
                ))
              )}
            </section>

            {/* ═══ SAĞ: KAYNAKLAR + BÜLTEN ═══ */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">

              {/* Haber Kaynakları */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-headline text-2xl font-bold">Kaynaklar</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="space-y-3">
                  {newsSourceCards.map((source) => (
                    <a
                      key={source.name}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-surface-container-lowest editorial-shadow hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-lg text-primary">newspaper</span>
                        <h4 className="font-bold text-sm">{source.name}</h4>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed">{source.desc}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Bülten CTA */}
              <div className="bg-primary-container text-white p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-on-primary-container">mail</span>
                  <h3 className="font-headline text-xl font-bold">Haftalık Bülten</h3>
                </div>
                <p className="text-xs text-on-primary-container mb-4">
                  Her Pazartesi piyasa özeti ve editör seçimi haberler e-postanızda.
                </p>
                <div className="flex gap-0">
                  <input
                    className="flex-1 border border-white/20 bg-white/10 px-3 py-2.5 text-sm outline-none focus:bg-white/20 placeholder:text-white/50"
                    placeholder="email@adres.com"
                    type="email"
                  />
                  <button className="bg-primary text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#32170d]">
                    Abone
                  </button>
                </div>
              </div>
            </aside>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
