"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";
import PriceChart from "@/components/charts/PriceChart";
import PriceCard from "@/components/charts/PriceCard";
import { fetchAllPrices, type PriceItem } from "@/lib/api/commodities";
import { useTranslation } from "@/lib/i18n/context";

const scaPremiums = [
  { label: "SCA 86+ (Micro-lot)", range: "+80 / +120" },
  { label: "SCA 84-85 (Estate)", range: "+40 / +60" },
  { label: "SCA 80-83 (Premium)", range: "+10 / +25" },
];

export default function FiyatMerkezi() {
  const [usdAmount, setUsdAmount] = useState("100");
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllPrices().then((data) => {
      if (data) setPrices(data.prices);
      setLoading(false);
    });
  }, []);

  const getPrice = (label: string) => prices.find((p) => p.label === label);
  const usdTry = getPrice("USD/TRY");
  const brlUsd = getPrice("BRL/USD");
  const rate = usdTry?.price || 0;
  const tryResult = usdAmount && rate ? (parseFloat(usdAmount) * rate).toFixed(2) : "—";

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10">

          {/* ═══ HEADER ═══ */}
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-none mb-2">
                {t.prices.title}
              </h1>
              <p className="text-secondary text-sm md:text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">update</span>
                {t.prices.liveMarket}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PriceCard
                label="USD/TRY"
                price={usdTry?.price ?? null}
                change={usdTry?.change ?? null}
                changePct={usdTry?.changePct ?? null}
                loading={loading}
              />
              <PriceCard
                label="BRL/USD"
                price={brlUsd?.price ?? null}
                change={brlUsd?.change ?? null}
                changePct={brlUsd?.changePct ?? null}
                loading={loading}
              />
            </div>
          </header>

          <div className="grid grid-cols-12 gap-4 md:gap-8">

            {/* ═══ ARABİCA GRAFİK ═══ */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <PriceChart
                title={t.prices.arabicaTitle}
                subtitle={t.prices.arabicaSub}
                symbol="arabica"
              />
            </section>

            {/* ═══ KUR ÇEVİRİCİ ═══ */}
            <section
              className="col-span-12 lg:col-span-4 p-6 md:p-8 flex flex-col justify-between"
              style={{ backgroundColor: "#3c2218" }}
            >
              <div>
                <h3 className="font-headline text-2xl font-bold mb-2" style={{ color: "#f5ebe7" }}>
                  {t.prices.converterTitle}
                </h3>
                {rate > 0 && (
                  <p className="text-sm mb-6" style={{ color: "#c9a898" }}>
                    {t.prices.converterRate.replace("{rate}", rate.toFixed(4))}
                    <span className="ml-1 text-xs" style={{ color: "#a8877a" }}>({t.prices.converterLive})</span>
                  </p>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest mb-1.5 block font-semibold" style={{ color: "#c9a898" }}>
                      {t.prices.converterInput}
                    </label>
                    <div
                      className="flex items-center p-3"
                      style={{ backgroundColor: "#2a1610", borderBottom: "2px solid #5a3d30" }}
                    >
                      <span className="mr-2 text-lg" style={{ color: "#a8877a" }}>$</span>
                      <input
                        type="number"
                        value={usdAmount}
                        onChange={(e) => setUsdAmount(e.target.value)}
                        className="bg-transparent border-none text-2xl font-headline w-full outline-none"
                        style={{ color: "#f5ebe7" }}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        if (rate > 0 && tryResult !== "—") {
                          setUsdAmount((parseFloat(tryResult.replace(/,/g, '')) / rate).toFixed(2));
                        }
                      }}
                      className="p-2 rounded-full transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#5a3d30", color: "#c9a898" }}
                    >
                      <span className="material-symbols-outlined">swap_vert</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-widest mb-1.5 block font-semibold" style={{ color: "#c9a898" }}>
                      {t.prices.converterOutput}
                    </label>
                    <div
                      className="flex items-center p-3"
                      style={{ backgroundColor: "#2a1610", borderBottom: "2px solid #5a3d30", borderLeft: "3px solid #7fb3ab" }}
                    >
                      <span className="mr-2 text-lg" style={{ color: "#a8877a" }}>&#8378;</span>
                      <span className="text-2xl font-headline" style={{ color: "#f5ebe7" }}>{tryResult}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs italic leading-relaxed mt-6 pt-4" style={{ color: "#a8877a", borderTop: "1px solid #5a3d30" }}>
                {t.prices.converterNote}
              </p>
            </section>

            {/* ═══ ROBUSTA GRAFİK ═══ */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <PriceChart
                title={t.prices.robustaTitle}
                subtitle={t.prices.robustaSub}
                symbol="robusta"
              />
            </section>

            {/* ═══ SCA PREMİUM + FİZİKSEL REFERANS ═══ */}
            <section className="col-span-12 lg:col-span-4 space-y-5">
              <div className="bg-white p-6 md:p-8 shadow-sm">
                <h3 className="font-headline text-2xl font-bold mb-3">{t.prices.scaTitle}</h3>
                <p className="text-sm text-secondary mb-5 italic">
                  {t.prices.scaDesc}
                </p>
                <div className="space-y-4">
                  {scaPremiums.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-label uppercase tracking-widest">{item.label}</span>
                        <span className="font-headline text-lg text-primary">{item.range}</span>
                      </div>
                      {i < scaPremiums.length - 1 && <div className="h-px bg-outline-variant/20 mt-4" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#dde3e7] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <h4 className="font-headline text-lg font-bold">{t.prices.physicalTitle}</h4>
                </div>
                <p className="text-xs text-secondary leading-loose">
                  {t.prices.physicalText}
                </p>
              </div>
            </section>

            {/* ═══ EDİTÖRYAL ANALİZ ═══ */}
            <section className="col-span-12 bg-surface-container-high p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              <div className="md:w-1/2 h-48 md:h-72 flex-shrink-0 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80"
                  alt="Coffee beans"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <span className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary mb-4 block">
                  {t.prices.editorialLabel}
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-5">
                  {t.prices.editorialTitle}
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-7">
                  {t.prices.editorialText}
                </p>
                <a href="/piyasa-faktorleri" className="inline-block px-8 py-4 text-xs font-label uppercase tracking-widest hover:translate-x-1 transition-transform" style={{ backgroundColor: "#32170d", color: "#ffffff" }}>
                  {t.prices.editorialButton}
                </a>
              </div>
            </section>

            {/* ═══ VERİ KAYNAKLARI ═══ */}
            <section className="col-span-12 bg-surface-container-low p-6 md:p-8">
              <h3 className="font-headline text-2xl font-bold mb-6">{t.prices.sourcesTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <a href="https://www.theice.com/products/15/Coffee-C-Futures" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICE Coffee C Futures</p>
                  <p className="text-xs text-secondary">{t.prices.sourceICEArabica}</p>
                </a>
                <a href="https://www.theice.com/products/37089079/Robusta-Coffee-Futures" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICE Robusta Futures</p>
                  <p className="text-xs text-secondary">{t.prices.sourceICERobusta}</p>
                </a>
                <a href="https://www.barchart.com/futures/quotes/KC*0/futures-prices" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">Barchart Arabica</p>
                  <p className="text-xs text-secondary">{t.prices.sourceBarchartA}</p>
                </a>
                <a href="https://www.barchart.com/futures/quotes/RM*0/futures-prices" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">Barchart Robusta</p>
                  <p className="text-xs text-secondary">{t.prices.sourceBarchartR}</p>
                </a>
                <a href="https://www.cepea.esalq.usp.br/en/indicator/coffee.aspx" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">CEPEA</p>
                  <p className="text-xs text-secondary">{t.prices.sourceCEPEA}</p>
                </a>
                <a href="http://www.ico.org/" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICO</p>
                  <p className="text-xs text-secondary">{t.prices.sourceICO}</p>
                </a>
              </div>
            </section>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
