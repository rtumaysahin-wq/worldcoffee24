"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import Navbar from "@/components/Navbar";
import TickerBand from "@/components/TickerBand";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import PriceChart from "@/components/charts/PriceChart";
import LatestNews from "@/components/LatestNews";
import CurrencyBand from "@/components/CurrencyBand";

// Fallback değerler — Supabase'den veri gelmezse bunlar gösterilir
const DEFAULTS: Record<string, string> = {
  "home.hero.tag": "Analiz",
  "home.hero.title": "Arabica'nın Direnci: Arz Kısıtları 2026 Verim Beklentilerini Nasıl Yeniden Şekillendiriyor?",
  "home.hero.subtitle": "İklim oynaklığı Brezilya Yaylalarını vururken, ihracatçılar küresel sabah kahvesini stabilize etmek için Kolombiya çeşitlerine yöneliyor.",
  "home.hero.image": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80",
  "home.hero.read_time": "12 Dk Okuma • WC24 Analiz Ekibi",
  "home.hero.link": "/bilgi-merkezi/futures-101",
  "home.editor.content": "Vietnam Robusta piyasasında gördüğümüz değişim sadece bir fiyat sıçraması değil; yapısal bir yeniden düzenlenme.",
  "home.editor.author": "WC24 Editör",
  "home.editor.author_title": "Baş Emtia Stratejisti",
  "home.sentiment.direction": "Yükseliş",
  "home.sentiment.percentage": "78",
  "home.sentiment.note": "Endeks, uzun pozisyonlara güçlü bir eğilim gösteriyor.",
  "home.newsletter.title": "Haftalık Derin Analiz, Her Pazar",
  "home.newsletter.subtitle": "12.000'den fazla emtia traderi ve sektör profesyoneli haftalık piyasa özetimize abone.",
};

export default function Home() {
  const [c, setC] = useState<Record<string, string>>(DEFAULTS);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.content) {
          setC((prev) => ({ ...prev, ...data.content }));
        }
      })
      .catch(() => {});
  }, []);

  const get = (key: string) => c[key] || DEFAULTS[key] || "";
  const pct = parseInt(get("home.sentiment.percentage")) || 50;

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-12">

          {/* ═══ DÖVİZ KURU BANDI ═══ */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-lg text-primary">currency_exchange</span>
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
                Döviz Kurları — Canlı
              </h3>
              <div className="h-px flex-1 bg-outline-variant/20" />
            </div>
            <CurrencyBand />
          </section>

          {/* ═══ HERO + EDİTÖR NOTU ═══ */}
          <section className="grid grid-cols-12 gap-6">

            {/* Hero — Öne Çıkan Haber */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest editorial-shadow overflow-hidden group">
              <div className="relative h-[340px] md:h-[500px]">
                <Image
                  src={get("home.hero.image")}
                  alt="Öne çıkan haber"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-10 text-white max-w-2xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                  <span className="bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold mb-5 inline-block">
                    {get("home.hero.tag")}
                  </span>
                  <h1 className="font-headline text-3xl md:text-5xl leading-tight mb-5">
                    {get("home.hero.title")}
                  </h1>
                  <p className="text-white/90 text-sm md:text-base mb-8">
                    {get("home.hero.subtitle")}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <a href={get("home.hero.link")} className="bg-white text-primary px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors inline-block">
                      Raporu Oku
                    </a>
                    <span className="text-xs uppercase tracking-widest text-white/70">
                      {get("home.hero.read_time")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ kolon: Editör Notu + Piyasa Duyarlılığı */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

              {/* Editörün Günlük Notu */}
              <div className="flex-1 bg-surface-container-low p-6 md:p-8 border-l-4 border-primary relative overflow-hidden">
                <span className="material-symbols-outlined absolute -right-4 -top-4 text-9xl opacity-5 text-primary">
                  format_quote
                </span>
                <h4 className="font-headline text-xl md:text-2xl text-primary mb-4 italic">
                  Editörün Günlük Notu
                </h4>
                <p className="text-sm leading-relaxed text-secondary italic mb-6">
                  &ldquo;{get("home.editor.content")}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center font-bold text-primary text-sm">
                    WC
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {get("home.editor.author")}
                    </p>
                    <p className="text-[10px] text-secondary">
                      {get("home.editor.author_title")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Piyasa Duyarlılığı */}
              <div className="bg-primary-container text-white p-6 md:p-8 editorial-shadow">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] opacity-60 mb-5">
                  Piyasa Duyarlılığı
                </h4>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-4xl font-headline font-light italic">{get("home.sentiment.direction")}</span>
                  <span className="text-tertiary-fixed text-xl font-bold">{pct}%</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-5">
                  <div className="bg-tertiary-fixed h-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-white/70 leading-loose">
                  {get("home.sentiment.note")}
                </p>
              </div>
            </div>
          </section>

          {/* ═══ GRAFİK + HAVA DURUMU ═══ */}
          <section className="grid grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h3 className="font-headline text-2xl md:text-3xl text-primary">
                    KC1! Arabica Futures
                  </h3>
                  <p className="text-xs text-secondary font-label uppercase tracking-widest mt-1">
                    7 Günlük Teknik Trend (ICE NY)
                  </p>
                </div>
              </div>
              <PriceChart title="KC1! Arabica Futures" subtitle="7 Gunluk Teknik Trend (ICE NY)" />
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-4">
              <h3 className="font-headline text-2xl text-primary border-b border-outline-variant/30 pb-3">
                Üretici Bölge Havaları
              </h3>

              <div className="flex items-center justify-between p-3 md:p-5 bg-surface-container-high border-r-4 border-tertiary">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">
                    Minas Gerais, Brezilya
                  </p>
                  <p className="font-headline text-2xl text-primary">24°C</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-tertiary">rainy</span>
              </div>

              <div className="flex items-center justify-between p-3 md:p-5 bg-surface-container-high border-r-4 border-secondary">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">
                    Orta Yaylalar, Vietnam
                  </p>
                  <p className="font-headline text-2xl text-primary">31°C</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-secondary">sunny</span>
              </div>

              <div className="flex items-center justify-between p-3 md:p-5 bg-surface-container-high border-r-4 border-on-tertiary-container">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">
                    Huila, Kolombiya
                  </p>
                  <p className="font-headline text-2xl text-primary">19°C</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-on-tertiary-container">cloud</span>
              </div>
            </div>
          </section>

          {/* ═══ SON HABERLER ═══ */}
          <LatestNews />

          {/* ═══ BÜLTEN KAYIT FORMU ═══ */}
          <section className="bg-[#f4fafe] p-5 md:p-12 flex flex-col items-center text-center border border-outline-variant/15 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              {get("home.newsletter.title")}
            </h2>
            <p className="max-w-xl text-secondary text-sm leading-relaxed mb-8">
              {get("home.newsletter.subtitle")}
            </p>
            <NewsletterForm variant="inline" />
            <p className="mt-4 text-[10px] text-outline-variant uppercase tracking-widest">
              Spam yok. Sadece yüksek kaliteli veri.
            </p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
