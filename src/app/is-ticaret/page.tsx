"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const sampleListings = [
  {
    type: "Satici",
    origin: "Brezilya — Minas Gerais",
    grade: "SCA 84 — Specialty",
    process: "Washed",
    quantity: "2 Konteyner (37.5 ton)",
    price: "FOB Santos +45 c/lb",
    contact: "Silva Exports Ltd.",
    cert: ["Rainforest", "UTZ"],
  },
  {
    type: "Alici",
    origin: "Kolombiya — Huila",
    grade: "SCA 86+ — Micro-lot",
    process: "Natural / Honey",
    quantity: "1 Konteyner (18.75 ton)",
    price: "FOB +80 c/lb uzerine",
    contact: "Nordic Roasters AB",
    cert: ["Organic", "Fair Trade"],
  },
  {
    type: "Satici",
    origin: "Vietnam — Dak Lak",
    grade: "G1 S18 — Robusta",
    process: "Washed",
    quantity: "5 Konteyner (93.75 ton)",
    price: "London +600 $/ton",
    contact: "Viet Harvest Co.",
    cert: ["UTZ"],
  },
];

const certifications = [
  {
    name: "Rainforest Alliance",
    desc: "Cevre, sosyal ve ekonomik surdurulebilirlik standartlari. Ciceklenme haritasi ve ormansizlasma izleme zorunlulugu.",
    color: "bg-tertiary",
  },
  {
    name: "Fair Trade",
    desc: "Ureticilere minimum fiyat garantisi ve sosyal prim. Kooperatif yapisi zorunlu. Prim: +20 c/lb.",
    color: "bg-primary",
  },
  {
    name: "UTZ (RA ile birlesti)",
    desc: "Izlenebilirlik ve iyi tarim uygulamalari odakli. 2023'ten itibaren Rainforest Alliance ile birlestirildi.",
    color: "bg-secondary",
  },
  {
    name: "Organic (USDA/EU)",
    desc: "Kimyasal gubre ve pestisit kullanimi yasak. 3 yillik gecis sureci. Prim: +30-50 c/lb.",
    color: "bg-on-tertiary-container",
  },
];

const incoterms = [
  { term: "FOB", full: "Free on Board", desc: "Satici malı gemiye yukler. Navlun ve sigorta aliciya aittir." },
  { term: "CIF", full: "Cost, Insurance & Freight", desc: "Satici navlun ve sigorta dahil fiyat verir. Varis limanina kadar risk saticide." },
  { term: "EXW", full: "Ex Works", desc: "Alici tum tasima ve riski ustlenir. En dusuk satici sorumlulugu." },
  { term: "FCA", full: "Free Carrier", desc: "Satici malı belirlenen yerde tasiyiciya teslim eder." },
];

const suppliers = [
  { name: "Silva Exports Ltd.", country: "Brezilya", type: "Arabica", volume: "50K+ cuval/yil", contact: "info@silvaexports.com" },
  { name: "Viet Harvest Co.", country: "Vietnam", type: "Robusta", volume: "120K+ cuval/yil", contact: "trade@vietharvest.vn" },
  { name: "Huila Direct", country: "Kolombiya", type: "Specialty", volume: "5K cuval/yil", contact: "hello@huiladirect.co" },
  { name: "Yirgacheffe Union", country: "Etiyopya", type: "Specialty", volume: "8K cuval/yil", contact: "export@yirgaunion.et" },
];

export default function IsTicaret() {
  const [formType, setFormType] = useState<"alici" | "satici">("satici");

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10 md:py-12">

          {/* ═══ HEADER ═══ */}
          <header className="mb-10">
            <span className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-3 block">
              Ticaret Platformu
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-light text-primary leading-none mb-3">
              Is &amp; Ticaret
            </h1>
            <p className="text-secondary text-sm md:text-base max-w-2xl">
              Kahve alici ve saticilari icin ilan panosu, tedarikci dizini, sertifika rehberi ve uluslararasi ticaret kosullari.
            </p>
          </header>

          <div className="grid grid-cols-12 gap-8">

            {/* ═══ SOL: İLANLAR + İLAN FORMU ═══ */}
            <section className="col-span-12 lg:col-span-8 space-y-8">

              {/* Aktif İlanlar */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-headline text-2xl font-bold">Aktif Ilanlar</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                  <span className="text-[10px] font-label uppercase tracking-widest text-secondary">
                    {sampleListings.length} ilan
                  </span>
                </div>

                <div className="space-y-4">
                  {sampleListings.map((listing, i) => (
                    <div key={i} className={`bg-surface-container-lowest p-6 md:p-8 editorial-shadow border-l-4 ${listing.type === "Satici" ? "border-primary" : "border-tertiary"}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${listing.type === "Satici" ? "bg-primary text-white" : "bg-tertiary text-on-tertiary-fixed"}`}>
                          {listing.type}
                        </span>
                        {listing.cert.map((c) => (
                          <span key={c} className="bg-surface-container-high px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
                            {c}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-headline text-xl md:text-2xl mb-2">{listing.origin}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">Derece</p>
                          <p className="text-sm font-bold">{listing.grade}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">Isleme</p>
                          <p className="text-sm font-bold">{listing.process}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">Miktar</p>
                          <p className="text-sm font-bold">{listing.quantity}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">Fiyat</p>
                          <p className="text-sm font-bold text-primary">{listing.price}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-outline-variant/15 flex justify-between items-center">
                        <span className="text-xs text-secondary">{listing.contact}</span>
                        <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                          Iletisime Gec
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* İlan Formu */}
              <div className="bg-surface-container-low p-6 md:p-8">
                <h3 className="font-headline text-2xl font-bold mb-6">Ilan Ver</h3>
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setFormType("satici")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${formType === "satici" ? "bg-primary text-white" : "bg-surface-container-high text-secondary"}`}
                  >
                    Satici
                  </button>
                  <button
                    onClick={() => setFormType("alici")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${formType === "alici" ? "bg-tertiary text-on-tertiary-fixed" : "bg-surface-container-high text-secondary"}`}
                  >
                    Alici
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">Mensei / Bolge</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="orn. Brezilya — Minas Gerais" />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">Kahve Turu / Derece</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="orn. SCA 84 Specialty Arabica" />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">Miktar</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="orn. 2 Konteyner (37.5 ton)" />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">Fiyat / Kosullar</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="orn. FOB Santos +45 c/lb" />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">Iletisim</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Firma adi veya e-posta" />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">Sertifikalar</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="orn. Rainforest, Organic" />
                  </div>
                </div>
                <button className="mt-6 bg-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors">
                  Ilan Yayinla
                </button>
              </div>

              {/* Incoterms Rehberi */}
              <div className="bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
                <h3 className="font-headline text-2xl font-bold mb-2">Sozlesme &amp; Incoterms Rehberi</h3>
                <p className="text-sm text-secondary mb-6">Uluslararasi kahve ticaretinde en cok kullanilan teslimat kosullari.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-label uppercase tracking-widest text-secondary border-b border-outline-variant/30">
                        <th className="pb-4">Terim</th>
                        <th className="pb-4">Tam Adi</th>
                        <th className="pb-4">Aciklama</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-outline-variant/10">
                      {incoterms.map((item, i) => (
                        <tr key={i} className="hover:bg-surface-container-low/50">
                          <td className="py-4 font-headline text-lg font-bold text-primary">{item.term}</td>
                          <td className="py-4 text-secondary">{item.full}</td>
                          <td className="py-4">{item.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ═══ SAĞ: SERTİFİKA REHBERİ + TEDARİKÇİ DİZİNİ ═══ */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">

              {/* Sertifika Rehberi */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-headline text-2xl font-bold">Sertifika Rehberi</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="bg-surface-container-lowest p-6 editorial-shadow border-l-4" style={{ borderLeftColor: cert.color === "bg-tertiary" ? "#002321" : cert.color === "bg-primary" ? "#32170d" : cert.color === "bg-secondary" ? "#5f5e58" : "#81a39e" }}>
                      <h4 className="font-headline text-lg font-bold mb-2">{cert.name}</h4>
                      <p className="text-xs text-secondary leading-relaxed">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tedarikçi Dizini */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-headline text-2xl font-bold">Tedarikci Dizini</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="space-y-0 divide-y divide-outline-variant/15">
                  {suppliers.map((s, i) => (
                    <div key={i} className="py-5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm">{s.name}</h4>
                        <span className="text-[10px] font-label uppercase tracking-widest text-secondary">{s.country}</span>
                      </div>
                      <div className="flex gap-4 text-xs text-secondary">
                        <span>{s.type}</span>
                        <span>{s.volume}</span>
                      </div>
                      <p className="text-xs text-primary mt-1">{s.contact}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full border border-outline-variant py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:bg-surface-container-high transition-colors">
                  Tum Tedarikcileri Gor
                </button>
              </div>
            </aside>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
