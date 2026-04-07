"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/context";

export default function IsTicaret() {
  const [formType, setFormType] = useState<"seller" | "buyer">("seller");
  const { t } = useTranslation();

  const sampleListings = [
    {
      type: t.trade.seller,
      origin: "Brezilya — Minas Gerais",
      grade: "SCA 84 — Specialty",
      process: "Washed",
      quantity: "2 Containers (37.5 ton)",
      price: "FOB Santos +45 c/lb",
      contact: "Silva Exports Ltd.",
      cert: ["Rainforest", "UTZ"],
    },
    {
      type: t.trade.buyer,
      origin: "Kolombiya — Huila",
      grade: "SCA 86+ — Micro-lot",
      process: "Natural / Honey",
      quantity: "1 Container (18.75 ton)",
      price: "FOB +80 c/lb",
      contact: "Nordic Roasters AB",
      cert: ["Organic", "Fair Trade"],
    },
    {
      type: t.trade.seller,
      origin: "Vietnam — Dak Lak",
      grade: "G1 S18 — Robusta",
      process: "Washed",
      quantity: "5 Containers (93.75 ton)",
      price: "London +600 $/ton",
      contact: "Viet Harvest Co.",
      cert: ["UTZ"],
    },
  ];

  const certifications = [
    { name: "Rainforest Alliance", desc: t.trade.rainforestCertDesc, color: "#002321" },
    { name: "Fair Trade", desc: t.trade.fairtradeCertDesc, color: "#32170d" },
    { name: "UTZ (RA)", desc: t.trade.utzCertDesc, color: "#5f5e58" },
    { name: "Organic (USDA/EU)", desc: t.trade.organicCertDesc, color: "#81a39e" },
  ];

  const incoterms = [
    { term: "FOB", full: "Free on Board", desc: t.trade.fobDesc },
    { term: "CIF", full: "Cost, Insurance & Freight", desc: t.trade.cifDesc },
    { term: "EXW", full: "Ex Works", desc: t.trade.exwDesc },
    { term: "FCA", full: "Free Carrier", desc: t.trade.fcaDesc },
  ];

  const suppliers = [
    { name: "Silva Exports Ltd.", country: "Brazil", type: "Arabica", volume: "50K+ bags/yr", contact: "info@silvaexports.com" },
    { name: "Viet Harvest Co.", country: "Vietnam", type: "Robusta", volume: "120K+ bags/yr", contact: "trade@vietharvest.vn" },
    { name: "Huila Direct", country: "Colombia", type: "Specialty", volume: "5K bags/yr", contact: "hello@huiladirect.co" },
    { name: "Yirgacheffe Union", country: "Ethiopia", type: "Specialty", volume: "8K bags/yr", contact: "export@yirgaunion.et" },
  ];

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
              {t.trade.headerLabel}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-light text-primary leading-none mb-3">
              {t.trade.title}
            </h1>
            <p className="text-secondary text-sm md:text-base max-w-2xl">
              {t.trade.description}
            </p>
          </header>

          <div className="grid grid-cols-12 gap-8">

            {/* ═══ SOL: İLANLAR + İLAN FORMU ═══ */}
            <section className="col-span-12 lg:col-span-8 space-y-8">

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-headline text-2xl font-bold">{t.trade.activeListings}</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                  <span className="text-[10px] font-label uppercase tracking-widest text-secondary">
                    {t.trade.listingCount.replace("{count}", String(sampleListings.length))}
                  </span>
                </div>

                <div className="space-y-4">
                  {sampleListings.map((listing, i) => (
                    <div key={i} className={`bg-surface-container-lowest p-6 md:p-8 editorial-shadow border-l-4 ${listing.type === t.trade.seller ? "border-primary" : "border-tertiary"}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${listing.type === t.trade.seller ? "bg-primary text-white" : "bg-tertiary text-on-tertiary-fixed"}`}>
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
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">{t.trade.grade}</p>
                          <p className="text-sm font-bold">{listing.grade}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">{t.trade.process}</p>
                          <p className="text-sm font-bold">{listing.process}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">{t.trade.quantity}</p>
                          <p className="text-sm font-bold">{listing.quantity}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-label uppercase text-secondary mb-1">{t.trade.price}</p>
                          <p className="text-sm font-bold text-primary">{listing.price}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-outline-variant/15 flex justify-between items-center">
                        <span className="text-xs text-secondary">{listing.contact}</span>
                        <a href={`mailto:${listing.contact.includes('@') ? listing.contact : 'info@worldcoffee24.com'}`} className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                          {t.trade.contact}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* İlan Formu */}
              <div className="bg-surface-container-low p-6 md:p-8">
                <h3 className="font-headline text-2xl font-bold mb-6">{t.trade.postListing}</h3>
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setFormType("seller")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${formType === "seller" ? "bg-primary text-white" : "bg-surface-container-high text-secondary"}`}
                  >
                    {t.trade.seller}
                  </button>
                  <button
                    onClick={() => setFormType("buyer")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${formType === "buyer" ? "bg-tertiary text-on-tertiary-fixed" : "bg-surface-container-high text-secondary"}`}
                  >
                    {t.trade.buyer}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">{t.trade.origin}</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder={t.trade.originPlaceholder} />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">{t.trade.coffeeType}</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder={t.trade.typePlaceholder} />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">{t.trade.quantity}</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder={t.trade.quantityPlaceholder} />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">{t.trade.conditions}</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder={t.trade.pricePlaceholder} />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">{t.trade.contactInfo}</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder={t.trade.contactPlaceholder} />
                  </div>
                  <div>
                    <label className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1 block">{t.trade.certificates}</label>
                    <input className="w-full border border-outline-variant px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder={t.trade.certPlaceholder} />
                  </div>
                </div>
                <a href="mailto:info@worldcoffee24.com?subject=New Listing" className="mt-6 inline-block px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors" style={{ backgroundColor: "#32170d", color: "#ffffff" }}>
                  {t.trade.publishButton}
                </a>
                <p className="text-xs text-secondary mt-2 italic">{t.trade.publishNote}</p>
              </div>

              {/* Incoterms Rehberi */}
              <div className="bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
                <h3 className="font-headline text-2xl font-bold mb-2">{t.trade.incotermsTitle}</h3>
                <p className="text-sm text-secondary mb-6">{t.trade.incotermsDesc}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-label uppercase tracking-widest text-secondary border-b border-outline-variant/30">
                        <th className="pb-4">{t.trade.termCol}</th>
                        <th className="pb-4">{t.trade.fullName}</th>
                        <th className="pb-4">{t.trade.descCol}</th>
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

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-headline text-2xl font-bold">{t.trade.certGuide}</h2>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="bg-surface-container-lowest p-6 editorial-shadow border-l-4" style={{ borderLeftColor: cert.color }}>
                      <h4 className="font-headline text-lg font-bold mb-2">{cert.name}</h4>
                      <p className="text-xs text-secondary leading-relaxed">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-headline text-2xl font-bold">{t.trade.supplierDir}</h2>
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
              </div>
            </aside>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
