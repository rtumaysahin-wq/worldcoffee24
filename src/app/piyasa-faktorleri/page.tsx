"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/context";

export default function PiyasaFaktorleri() {
  const { t } = useTranslation();

  const demandCards = [
    { title: t.market.chinaTitle, text: t.market.chinaText, stat: "+15%", statLabel: t.market.yoy },
    { title: t.market.premiumTitle, text: t.market.premiumText, stat: "12%", statLabel: t.market.marketShare },
    { title: t.market.sustainTitle, text: t.market.sustainText, stat: "EU", statLabel: t.market.regulation },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10 md:py-12">

          {/* ═══ HEADER ═══ */}
          <header className="mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-3 block">
                  {t.market.headerLabel}
                </span>
                <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-light text-primary leading-none mb-5">
                  {t.market.title}
                </h1>
                <p className="text-base md:text-lg text-secondary leading-relaxed font-light">
                  {t.market.description}
                </p>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-low p-5 md:p-6 editorial-shadow">
                <div className="text-right border-r border-outline-variant/30 pr-4">
                  <span className="text-[10px] font-label uppercase text-secondary">{t.market.lastUpdate}</span>
                  <p className="font-headline text-lg font-bold">30 Mar 2026</p>
                </div>
                <div>
                  <span className="text-[10px] font-label uppercase text-secondary">{t.market.volatility}</span>
                  <p className="font-headline text-lg font-bold text-error">Moderate (1.2%)</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-4 md:gap-8 lg:gap-10">

            {/* ═══ SOL KOLON: İKLİM & ÜRETİM + TALEP ═══ */}
            <section className="col-span-12 lg:col-span-8 space-y-8">

              <div className="flex items-center gap-4">
                <h2 className="font-headline text-2xl font-bold">{t.market.climateTitle}</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ENSO Status */}
                <div className="group bg-surface-container-lowest p-6 md:p-8 editorial-shadow relative overflow-hidden hover:-translate-y-1 transition-all">
                  <span className="text-[10px] font-label uppercase tracking-widest text-secondary block mb-5">
                    {t.market.ensoCategory}
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl mb-4">
                    {t.market.ensoTitle}
                  </h3>
                  <p className="text-sm text-secondary mb-7 leading-relaxed">
                    {t.market.ensoText}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full">
                      <div className="bg-tertiary w-[70%] h-full rounded-full" />
                    </div>
                    <span className="font-headline text-xl font-bold">70%</span>
                  </div>
                  <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-9xl">cyclone</span>
                  </div>
                </div>

                {/* Brazil Harvest */}
                <div className="bg-primary-container p-6 md:p-8 editorial-shadow text-on-primary">
                  <span className="text-[10px] font-label uppercase tracking-widest text-white/70 block mb-5">
                    {t.market.harvestCategory}
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl mb-4">{t.market.harvestTitle}</h3>
                  <p className="text-sm text-white/80 mb-7 leading-relaxed">
                    {t.market.harvestText}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-headline italic">{t.market.yieldLow}</p>
                      <p className="text-[10px] uppercase font-label">{t.market.yieldEstimate}</p>
                    </div>
                    <span className="text-3xl font-headline font-bold">-12%</span>
                  </div>
                </div>

                {/* Don Uyarıları — tam genişlik */}
                <div className="col-span-1 md:col-span-2 bg-surface-container-low p-5 md:p-10 flex flex-col md:flex-row gap-5 md:gap-10 items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                      <span className="text-[10px] font-label uppercase tracking-widest text-tertiary font-bold">
                        {t.market.frostCategory}
                      </span>
                    </div>
                    <h3 className="font-headline text-3xl md:text-4xl mb-4">
                      {t.market.frostTitle}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      {t.market.frostText}
                    </p>
                  </div>
                  <div className="w-full md:w-64 h-40 overflow-hidden flex-shrink-0 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80"
                      alt={t.market.frostAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* ═══ KÜRESEL TALEP TRENDLERİ ═══ */}
              <div>
                <div className="flex items-center gap-4 mb-8 mt-6">
                  <h2 className="font-headline text-2xl font-bold">{t.market.demandTitle}</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {demandCards.map((card, i) => (
                    <div key={i} className="p-6 bg-surface-container-lowest border-l-2 border-primary editorial-shadow">
                      <h4 className="font-headline text-xl mb-2">{card.title}</h4>
                      <p className="text-xs text-secondary leading-relaxed mb-4">{card.text}</p>
                      <div className="flex items-end gap-2">
                        <span className="font-headline text-2xl font-bold text-primary">{card.stat}</span>
                        <span className="text-[10px] font-label uppercase text-secondary">{card.statLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══ SAĞ KOLON: EKONOMİK FAKTÖRLER ═══ */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">

              <div className="flex items-center gap-4">
                <h2 className="font-headline text-2xl font-bold">{t.market.economicTitle}</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>

              {/* Kur Etkisi */}
              <div className="bg-surface p-6 md:p-8 border-b border-outline-variant/30">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <span className="text-[10px] font-label uppercase tracking-widest text-secondary block mb-2">
                      {t.market.fxCategory}
                    </span>
                    <h3 className="font-headline text-3xl font-bold">BRL/USD</h3>
                  </div>
                  <span className="font-headline text-2xl font-bold text-primary">0.1982</span>
                </div>
                <p className="text-sm text-secondary italic">
                  {t.market.fxQuote}
                </p>
              </div>

              {/* Lojistik & Enerji */}
              <div className="bg-surface-container-high/50 p-6 md:p-8">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-5">
                  {t.market.logisticsTitle}
                </h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.market.shippingIndex}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-error" />
                      <span className="font-headline font-bold">+18%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.market.oilLabel}</span>
                    <span className="font-headline font-bold">82.40</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.market.containerLabel}</span>
                    <span className="text-xs font-bold uppercase text-secondary">{t.market.containerStatus}</span>
                  </div>
                </div>
              </div>

              {/* COT */}
              <div className="bg-surface p-6 md:p-8">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-5">
                  {t.market.cotTitle}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">{t.market.cotLong}</span>
                    <span className="font-headline text-2xl font-bold text-tertiary">+52,840</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">{t.market.cotShort}</span>
                    <span className="font-headline text-2xl font-bold text-error">-18,210</span>
                  </div>
                </div>
                <p className="text-xs text-secondary mt-5 leading-relaxed">
                  {t.market.cotNote}
                </p>
              </div>

              {/* ICE Sertifikalı Stoklar */}
              <div className="bg-surface p-6 md:p-8 border border-error/20">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-3">
                  {t.market.stocksTitle}
                </h4>
                <p className="font-headline text-4xl font-bold text-primary">842K</p>
                <p className="text-secondary text-sm mb-3">Bags</p>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-2">
                  <div className="bg-primary w-[35%] h-full rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-secondary">
                  <span>{t.market.stocksCurrent}</span>
                  <span>{t.market.stocks5yr}</span>
                </div>
                <p className="text-[10px] font-bold text-error uppercase mt-3 tracking-widest">
                  {t.market.stocksWarning}
                </p>
              </div>

            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
