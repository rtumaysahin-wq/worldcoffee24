"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";
import TradingViewWidget from "@/components/TradingViewWidget";

const contracts = [
  { month: "May 2025", exchange: "ICE (KC)", price: "214.25", change: "+1.85", pct: "+0.87%", positive: true },
  { month: "July 2025", exchange: "ICE (KC)", price: "212.90", change: "+1.40", pct: "+0.66%", positive: true },
  { month: "Sept 2025", exchange: "ICE (KC)", price: "211.45", change: "-0.25", pct: "-0.12%", positive: false },
  { month: "May 2025", exchange: "London (RC)", price: "3,812", change: "+42", pct: "+1.11%", positive: true },
];

const scaPremiums = [
  { label: "SCA 86+ (Micro-lot)", range: "+80 / +120" },
  { label: "SCA 84-85 (Estate)", range: "+40 / +60" },
  { label: "SCA 80-83 (Premium)", range: "+10 / +25" },
];

export default function FiyatMerkezi() {
  const [usdAmount, setUsdAmount] = useState("100");
  const rate = 32.415;
  const tryResult = usdAmount ? (parseFloat(usdAmount) * rate).toFixed(2) : "0.00";

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
                Canli Piyasa Verisi: Son guncelleme 14:22 GMT+3
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container-low px-5 py-3 flex flex-col items-end">
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">USD/TRY</span>
                <span className="font-headline text-2xl font-bold text-primary">32.4150</span>
              </div>
              <div className="bg-surface-container-low px-5 py-3 flex flex-col items-end">
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">BRL/USD</span>
                <span className="font-headline text-2xl font-bold text-primary">0.1982</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8">

            {/* ═══ ARABİCA FUTURES GRAFİK (TradingView) ═══ */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <div className="mb-4">
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-1 block">
                  Emtia Alfa
                </span>
                <h3 className="font-headline text-2xl md:text-3xl font-bold">
                  ICE Arabica Futures (KC1!)
                </h3>
              </div>
              <TradingViewWidget symbol="TVC:KC1!" height={420} />
              <div className="mt-6 grid grid-cols-3 gap-8 border-t border-outline-variant/15 pt-6">
                <div>
                  <p className="text-[10px] font-label uppercase text-secondary mb-1">Kontrat Yuksek</p>
                  <p className="font-headline text-xl font-bold">218.40</p>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase text-secondary mb-1">Kontrat Dusuk</p>
                  <p className="font-headline text-xl font-bold">209.15</p>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase text-secondary mb-1">Hacim (Lot)</p>
                  <p className="font-headline text-xl font-bold">42,810</p>
                </div>
              </div>
            </section>

            {/* ═══ KUR ÇEVİRİCİ ═══ */}
            <section className="col-span-12 lg:col-span-4 bg-primary-container text-white p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-7">Kur Cevirici</h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-[#d5c3bd] mb-1 block">
                      Giris (USD)
                    </label>
                    <div className="flex items-center bg-[#32170d] p-4">
                      <span className="text-[#d5c3bd] mr-3 text-lg">$</span>
                      <input
                        type="number"
                        value={usdAmount}
                        onChange={(e) => setUsdAmount(e.target.value)}
                        className="bg-transparent border-none text-white text-2xl font-headline w-full outline-none"
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-primary p-2 rounded-full border border-[#4B2C20]">
                      <span className="material-symbols-outlined">swap_vert</span>
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-[#d5c3bd] mb-1 block">
                      Cikis (TRY)
                    </label>
                    <div className="flex items-center bg-[#32170d] p-4 border-l-4 border-tertiary-fixed">
                      <span className="text-[#d5c3bd] mr-3 text-lg">&#8378;</span>
                      <span className="text-white text-2xl font-headline">{tryResult}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] italic text-[#d5c3bd] leading-relaxed mt-6 pt-5 border-t border-[#d5c3bd]/20">
                Oranlar her 60 saniyede guncellenir. Merkez Bankasi orta piyasa kuruna gore hesaplanir.
              </p>
            </section>

            {/* ═══ AKTİF KONTRATLAR TABLOSU ═══ */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-low p-6 md:p-8">
              <h3 className="font-headline text-2xl font-bold mb-6">Aktif Kontratlar (Futures)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-label uppercase tracking-widest text-secondary border-b border-outline-variant/30">
                      <th className="pb-4">Ay</th>
                      <th className="pb-4">Borsa</th>
                      <th className="pb-4 text-right">Fiyat</th>
                      <th className="pb-4 text-right">Degisim</th>
                      <th className="pb-4 text-right">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-outline-variant/10">
                    {contracts.map((c, i) => (
                      <tr key={i} className="hover:bg-white/50">
                        <td className="py-4 font-bold">{c.month}</td>
                        <td className="py-4 text-secondary">{c.exchange}</td>
                        <td className="py-4 text-right font-headline text-lg">{c.price}</td>
                        <td className={`py-4 text-right font-bold ${c.positive ? "text-tertiary" : "text-error"}`}>
                          {c.change}
                        </td>
                        <td className={`py-4 text-right ${c.positive ? "text-tertiary" : "text-error"}`}>
                          {c.pct}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ═══ SCA PREMİUM + FİZİKSEL REFERANS ═══ */}
            <section className="col-span-12 lg:col-span-4 space-y-5">
              {/* SCA Premium Rehberi */}
              <div className="bg-white p-6 md:p-8 shadow-sm">
                <h3 className="font-headline text-2xl font-bold mb-3">SCA Premium Rehberi</h3>
                <p className="text-sm text-secondary mb-5 italic">
                  NY &apos;C&apos; Piyasa fiyatlarina dayali specialty derecelendirme icin kiyaslama diferansiyelleri.
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

              {/* Fiziksel Referans */}
              <div className="bg-[#dde3e7] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <h4 className="font-headline text-lg font-bold">Fiziksel Referans</h4>
                </div>
                <p className="text-xs text-secondary leading-loose">
                  Fiziksel fiyatlar, Vietnam Robusta arzindaki sikilasmayi yansitiyor. G1 S18 primleri Londra uzerinde +600$ ile tarihi yuksek seviyelerde.
                </p>
                <button className="mt-5 text-xs font-bold text-primary underline underline-offset-4 uppercase tracking-widest">
                  Yerel Fiyatlari Goruntule
                </button>
              </div>
            </section>

            {/* ═══ EDİTÖRYAL ANALİZ ═══ */}
            <section className="col-span-12 bg-surface-container-high p-6 md:p-10 flex flex-col md:flex-row gap-10 items-center">
              {/* SVG kahve taneleri illüstrasyonu */}
              <div className="md:w-1/2 h-72 bg-[#1a1008] flex-shrink-0 relative overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 500 288" xmlns="http://www.w3.org/2000/svg">
                  <rect width="500" height="288" fill="#1a1008" />
                  <g fill="#3d2010" opacity="0.7">
                    <ellipse cx="55" cy="75" rx="22" ry="14" transform="rotate(-20,55,75)" />
                    <ellipse cx="115" cy="140" rx="22" ry="14" transform="rotate(15,115,140)" />
                    <ellipse cx="75" cy="200" rx="22" ry="14" transform="rotate(-35,75,200)" />
                    <ellipse cx="175" cy="55" rx="22" ry="14" transform="rotate(10,175,55)" />
                    <ellipse cx="195" cy="178" rx="22" ry="14" transform="rotate(-25,195,178)" />
                    <ellipse cx="258" cy="96" rx="22" ry="14" transform="rotate(30,258,96)" />
                    <ellipse cx="298" cy="220" rx="22" ry="14" transform="rotate(-10,298,220)" />
                    <ellipse cx="358" cy="65" rx="22" ry="14" transform="rotate(20,358,65)" />
                    <ellipse cx="378" cy="158" rx="22" ry="14" transform="rotate(-30,378,158)" />
                    <ellipse cx="438" cy="115" rx="22" ry="14" transform="rotate(15,438,115)" />
                    <ellipse cx="418" cy="238" rx="22" ry="14" transform="rotate(-20,418,238)" />
                    <ellipse cx="148" cy="238" rx="22" ry="14" transform="rotate(25,148,238)" />
                  </g>
                  <g stroke="#5a3018" strokeWidth="1.5" fill="none" opacity="0.5">
                    <line x1="45" y1="75" x2="65" y2="75" transform="rotate(-20,55,75)" />
                    <line x1="105" y1="140" x2="125" y2="140" transform="rotate(15,115,140)" />
                    <line x1="165" y1="55" x2="185" y2="55" transform="rotate(10,175,55)" />
                    <line x1="248" y1="96" x2="268" y2="96" transform="rotate(30,258,96)" />
                    <line x1="348" y1="65" x2="368" y2="65" transform="rotate(20,358,65)" />
                    <line x1="428" y1="115" x2="448" y2="115" transform="rotate(15,438,115)" />
                  </g>
                </svg>
              </div>
              {/* Analiz metni */}
              <div className="md:w-1/2">
                <span className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary mb-4 block">
                  Editoryal Analiz
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-5">
                  El Nino Gecikmesi: 24/25 Arabica Hasat Dongusune Etkisi
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-7">
                  Vadeli piyasalar kisa vadeli lojistige odaklanirken, Minas Gerais&rsquo;deki son sicaklik anomalilerinin fizyolojik etkisi gelecek hasatta daha dusuk elek boyutlari ve cupping skorlari olarak ortaya cikabilir.
                </p>
                <button className="inline-block px-8 py-4 bg-primary text-white text-xs font-label uppercase tracking-widest hover:translate-x-1 transition-transform">
                  Tam Analizi Oku
                </button>
              </div>
            </section>

            {/* ═══ ROBUSTA FUTURES GRAFİK (TradingView) ═══ */}
            <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <div className="mb-4">
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-1 block">
                  London ICE
                </span>
                <h3 className="font-headline text-2xl md:text-3xl font-bold">
                  Robusta Coffee Futures (RC1!)
                </h3>
              </div>
              <TradingViewWidget symbol="TVC:RC1!" height={380} />
            </section>

            {/* ═══ USD/TRY MİNİ WIDGET ═══ */}
            <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <div className="mb-4">
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-1 block">
                  Doviz Kuru
                </span>
                <h3 className="font-headline text-2xl font-bold">USD/TRY</h3>
              </div>
              <TradingViewWidget symbol="FX:USDTRY" height={380} mini />
            </section>

            {/* ═══ VERİ KAYNAKLARI ═══ */}
            <section className="col-span-12 bg-surface-container-low p-6 md:p-8">
              <h3 className="font-headline text-2xl font-bold mb-6">Veri Kaynaklari</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="https://www.theice.com/products/15/Coffee-C-Futures" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICE Futures</p>
                  <p className="text-xs text-secondary">Arabica & Robusta vadeli islemler</p>
                </a>
                <a href="https://www.barchart.com/futures/quotes/KC*0/futures-prices" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">Barchart</p>
                  <p className="text-xs text-secondary">Futures fiyatlar ve grafikler</p>
                </a>
                <a href="https://www.cepea.esalq.usp.br/en/indicator/coffee.aspx" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">CEPEA</p>
                  <p className="text-xs text-secondary">Brezilya kahve fiyat endeksi</p>
                </a>
                <a href="http://www.ico.org/" target="_blank" rel="noopener noreferrer" className="p-4 bg-surface-container-lowest hover:bg-white transition-colors editorial-shadow">
                  <p className="font-bold text-sm text-primary mb-1">ICO</p>
                  <p className="text-xs text-secondary">Uluslararasi Kahve Orgutu</p>
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
