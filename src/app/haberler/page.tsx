"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const categories = ["Tumu", "Piyasa", "Uretim", "Iklim", "Regulasyon", "Teknoloji"];

const editorPicks = [
  {
    tag: "Piyasa",
    title: "Arabica Futures 220 Dolarla 18 Ayin Zirvesinde",
    desc: "ICE New York'ta Arabica vadeli islemleri Brezilya hasat endiselerinin ardindan 220.40 dolara yukseldi. Analistler kisa vadede konsolidasyon bekliyor.",
    author: "Elara Vance",
    date: "29 Mar 2026",
    readTime: "5 dk",
    featured: true,
  },
  {
    tag: "Iklim",
    title: "La Nina Gecisi: Kahve Uretim Bolgeleri Icin Ne Anlama Geliyor?",
    desc: "Meteorolojistler La Nina'nin %70 olasilikla olusacagini ongoruyor. Brezilya ve Vietnam uretim bolgeleri farkli etkilenecek.",
    author: "Julian Thorne",
    date: "28 Mar 2026",
    readTime: "8 dk",
    featured: false,
  },
  {
    tag: "Regulasyon",
    title: "AB Ormansizlasma Yonetmeligi 2025'te Yururluge Giriyor",
    desc: "Avrupa Birligi'nin yeni ormansizlasma yonetmeligi kahve ithalatinda izlenebilirlik zorunlulugu getiriyor. Vietnam ve Endonezya en cok etkilenecek ulkeler.",
    author: "Mika Orinova",
    date: "27 Mar 2026",
    readTime: "6 dk",
    featured: false,
  },
];

const rssFeed = [
  { source: "Reuters", title: "Coffee prices surge as Brazil frost fears grow", time: "2 saat once" },
  { source: "Bloomberg", title: "Vietnam robusta exports fall 12% in March", time: "4 saat once" },
  { source: "ICO", title: "Global coffee consumption reaches record 178M bags", time: "6 saat once" },
  { source: "FT", title: "Commodity traders bet on La Nina impact on crops", time: "8 saat once" },
  { source: "Reuters", title: "Colombian coffee federation raises production forecast", time: "12 saat once" },
  { source: "CoffeeNetwork", title: "Specialty coffee demand outpaces supply in Asia-Pacific", time: "1 gun once" },
];

const weeklySummary = {
  title: "Haftalik Piyasa Ozeti — 24-30 Mart 2026",
  points: [
    "Arabica KC1! haftalik %3.2 yukselisle 220.40'ta kapandi",
    "Vietnam Robusta ihracati Mart'ta %12 geriledi",
    "Brezilya Real dolara karsi %1.8 deger kaybetti",
    "ICE sertifikali stoklar 842K cuval ile 10 yilin en dusugunde",
    "La Nina gecis olasiligi %70'e yukseldi",
  ],
};

export default function Haberler() {
  const [activeCategory, setActiveCategory] = useState("Tumu");

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
                  Guncel Haberler
                </span>
                <h1 className="font-headline text-4xl md:text-5xl font-light text-primary leading-none mb-3">
                  Haberler &amp; Analiz
                </h1>
                <p className="text-secondary text-sm md:text-base">
                  Kuresel kahve piyasasindan son gelismeler, editor secimleri ve haftalik ozetler.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3">
                <span className="material-symbols-outlined text-sm text-secondary">rss_feed</span>
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">
                  Canli Akis &bull; Son: 14:22 GMT
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

            {/* ═══ SOL: EDİTÖR SEÇİMİ HABERLER ═══ */}
            <section className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="font-headline text-2xl font-bold">Editor Secimi</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>

              {editorPicks.map((news, i) => (
                <article
                  key={i}
                  className={`bg-surface-container-lowest editorial-shadow overflow-hidden ${
                    news.featured ? "border-l-4 border-primary" : ""
                  }`}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary-container text-on-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                        {news.tag}
                      </span>
                      {news.featured && (
                        <span className="bg-tertiary text-on-tertiary-fixed px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                          One Cikan
                        </span>
                      )}
                    </div>
                    <h3 className={`font-headline mb-3 ${news.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                      {news.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed mb-5">{news.desc}</p>
                    <div className="flex items-center gap-4 text-[10px] font-label uppercase tracking-widest text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">person</span>
                        {news.author}
                      </span>
                      <span>{news.date}</span>
                      <span>{news.readTime} okuma</span>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* ═══ SAĞ: RSS AKIŞI + HAFTALIK ÖZET ═══ */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">

              {/* RSS Akışı */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-headline text-2xl font-bold">Canli Akis</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="space-y-0 divide-y divide-outline-variant/15">
                  {rssFeed.map((item, i) => (
                    <div key={i} className="py-4 hover:bg-surface-container-low px-3 -mx-3 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container">
                          {item.source}
                        </span>
                        <span className="text-[10px] text-outline">{item.time}</span>
                      </div>
                      <p className="text-sm font-medium text-on-surface leading-snug">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Haftalık Özet */}
              <div className="bg-primary-container text-white p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-on-primary-container">summarize</span>
                  <h3 className="font-headline text-xl font-bold">Haftalik Ozet</h3>
                </div>
                <p className="text-[10px] font-label uppercase tracking-widest text-on-primary-container mb-5">
                  {weeklySummary.title}
                </p>
                <ul className="space-y-3">
                  {weeklySummary.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-primary-container">
                      <span className="material-symbols-outlined text-sm mt-0.5 text-tertiary-fixed">arrow_right</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-primary text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#32170d] transition-colors">
                  Tam Raporu Oku
                </button>
              </div>

              {/* Bülten CTA */}
              <div className="bg-surface-container-low p-6 md:p-8 border border-outline-variant/15">
                <h4 className="font-headline text-lg font-bold text-primary mb-2">
                  Haftalik Bulten
                </h4>
                <p className="text-xs text-secondary mb-4">
                  Her Pazartesi piyasa ozeti ve editor secimi haberler e-postanizda.
                </p>
                <div className="flex gap-0">
                  <input
                    className="flex-1 border border-outline-variant px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder="email@adres.com"
                    type="email"
                  />
                  <button className="bg-primary text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest">
                    Abone
                  </button>
                </div>
              </div>
            </aside>

            {/* ═══ KAHVE HABER KAYNAKLARI ═══ */}
            <section className="col-span-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-headline text-2xl font-bold">Kahve Haber Kaynaklari</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Daily Coffee News", desc: "Specialty kahve sektorunden gunluk haberler ve analizler.", url: "https://dailycoffeenews.com/" },
                  { name: "Perfect Daily Grind", desc: "Kahve uretiminden tuketimine, sektor profesyonelleri icin icerikler.", url: "https://www.perfectdailygrind.com/" },
                  { name: "Sprudge", desc: "Kuresel kahve kulturu, etkinlikler ve trendler.", url: "https://sprudge.com/" },
                  { name: "Global Coffee Report", desc: "Kuresel kahve endustrisi haberleri, is dunyasi ve pazar analizi.", url: "http://www.gcrmag.com/" },
                  { name: "Coffee & Cocoa", desc: "Kahve ve kakao sektorlerinden haberler ve piyasa verileri.", url: "https://www.coffeeandcocoa.net/" },
                  { name: "Roast Magazine", desc: "Kavurma endustrisi, ekipman ve isletme yonetimi odakli yayin.", url: "https://www.roastmagazine.com/" },
                  { name: "Coffee Science", desc: "Kahve bilimi, arastirma ve akademik calismalara erisim.", url: "https://www.coffeescience.org/" },
                ].map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-xl text-primary">newspaper</span>
                      <h4 className="font-bold text-sm group-hover:text-primary">{source.name}</h4>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">{source.desc}</p>
                  </a>
                ))}
              </div>
            </section>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
