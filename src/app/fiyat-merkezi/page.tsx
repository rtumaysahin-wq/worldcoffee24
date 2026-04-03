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

const scaPremiums = [
  { label: "SCA 86+ (Micro-lot)", range: "+80 / +120" },
  { label: "SCA 84-85 (Estate)", range: "+40 / +60" },
  { label: "SCA 80-83 (Premium)", range: "+10 / +25" },
];

export default function FiyatMerkezi() {
  const [usdAmount, setUsdAmount] = useState("100");
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);

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
                Fiyat Merkezi
              </h1>
              <p className="text-secondary text-sm md:text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">update</span>
                Canlı Piyasa Verisi
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
                title="ICE Arabica Futures (KC1!)"
                subtitle="FRED / ICE New York"
                symbol="arabica"
              />
            </section>

            {/* ═══ KUR ÇEVİRİCİ ═══ */}
            <section className="col-span-12 lg:col-span-4 p-6 md:p-8 flex flex-col justify-between" style={{ backgroundColor: "#4b2c20", color: "#ffffff" }}>
              <div>
                <h3 className="font-headline text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>Kur Çevirici</h3>
                {rate > 0 && (
                  <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
                    1 USD = {rate.toFixed(4)} TRY (canlı kur)
                  </p>
                )}
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-label uppercase tracking-widest mb-1.5 block" style={{ color: "#ffffff" }}>
                      Giriş (USD)
                    </label>
                    <div className="flex items-center p-4" style={{ backgroundColor: "#1a0b06", border: "1px solid rgba(255,255,255,0.25)" }}>
                      <span className="mr-3 text-lg font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>$</span>
                      <input
                        type="number"
                        value={usdAmount}
                        onChange={(e) => setUsdAmount(e.target.value)}
                        className="bg-transparent border-none text-2xl font-headline w-full outline-none"
                        style={{ color: "#ffffff" }}
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="p-2 rounded-full transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.5)", color: "#ffffff" }}>
                      <span className="material-symbols-outlined">swap_vert</span>
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-label uppercase tracking-widest mb-1.5 block" style={{ color: "#ffffff" }}>
                      Çıkış (TRY)
                    </label>
                    <div className="flex items-center p-4" style={{ backgroundColor: "#1a0b06", border: "1px solid rgba(255,255,255,0.25)", borderLeft: "4px solid #c6eae5" }}>
                      <span className="mr-3 text-lg font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>&#8378;</span>
                      <span className="text-2xl font-headline" style={{ color: "#ffffff" }}>{tryResult}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs italic leading-relaxed mt-6 pt-5" style={{ color: "rgba(255,255,255,0.8)", borderTop: "1px solid rgba(255,255,255,0.3)" }}>
                Kur verileri ExchangeRate API&apos;den saatlik güncellenir.
              </p>
            </section>

            {/* ═══ ROBUSTA GRAFİK ═══ */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <PriceChart
                title="Robusta Coffee Futures (RC1!)"
                subtitle="FRED / London ICE"
                symbol="robusta"
              />
            </section>

            {/* ═══ SCA PREMİUM + FİZİKSEL REFERANS ═══ */}
            <section className="col-span-12 lg:col-span-4 space-y-5">
              <div className="bg-white p-6 md:p-8 shadow-sm">
                <h3 className="font-headline text-2xl font-bold mb-3">SCA Premium Rehberi</h3>
                <p className="text-sm text-secondary mb-5 italic">
                  NY &apos;C&apos; Piyasa fiyatlarına dayalı specialty derecelendirme için kıyaslama diferansiyelleri.
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
                  <h4 className="font-headline text-lg font-bold">Fiziksel Referans</h4>
                </div>
                <p className="text-xs text-secondary leading-loose">
                  Fiziksel fiyatlar, Vietnam Robusta arzındaki sıkılaşmayı yansıtıyor. G1 S18 primleri Londra üzerinde +600$ ile tarihi yüksek seviyelerde.
                </p>
              </div>
            </section>

            {/* ═══ EDİTÖRYAL ANALİZ ═══ */}
            <section className="col-span-12 bg-surface-container-high p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              <div className="md:w-1/2 h-48 md:h-72 flex-shrink-0 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80"
                  alt="Kahve çekirdekleri"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <span className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary mb-4 block">
                  Editöryal Analiz
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-5">
                  El Niño Gecikmesi: 25/26 Arabica Hasat Döngüsüne Etkisi
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-7">
                  Vadeli piyasalar kısa vadeli lojistiğe odaklanırken, Minas Gerais&rsquo;deki son sıcaklık anomalilerinin fizyolojik etkisi gelecek hasatta daha düşük elek boyutları ve cupping skorları olarak ortaya çıkabilir.
                </p>
                <button className="inline-block px-8 py-4 bg-primary text-white text-xs font-label uppercase tracking-widest hover:translate-x-1 transition-transform">
                  Tam Analizi Oku
                </button>
              </div>
            </section>

            {/* ═══ VERİ KAYNAKLARI ═══ */}
            <section className="col-span-12 bg-surface-container-low p-6 md:p-8">
              <h3 className="font-headline text-2xl font-bold mb-6">Veri Kaynakları</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <a href="https://www.theice.com/products/15/Coffee-C-Futures" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICE Coffee C Futures</p>
                  <p className="text-xs text-secondary">Arabica vadeli işlemler (NY)</p>
                </a>
                <a href="https://www.theice.com/products/37089079/Robusta-Coffee-Futures" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICE Robusta Futures</p>
                  <p className="text-xs text-secondary">Robusta vadeli işlemler (London)</p>
                </a>
                <a href="https://www.barchart.com/futures/quotes/KC*0/futures-prices" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">Barchart Arabica</p>
                  <p className="text-xs text-secondary">KC futures fiyatlar ve grafikler</p>
                </a>
                <a href="https://www.barchart.com/futures/quotes/RM*0/futures-prices" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">Barchart Robusta</p>
                  <p className="text-xs text-secondary">RM futures fiyatlar ve grafikler</p>
                </a>
                <a href="https://www.cepea.esalq.usp.br/en/indicator/coffee.aspx" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">CEPEA Kahve</p>
                  <p className="text-xs text-secondary">Brezilya kahve fiyat endeksi</p>
                </a>
                <a href="http://www.ico.org/" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICO</p>
                  <p className="text-xs text-secondary">Uluslararası Kahve Örgütü</p>
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
