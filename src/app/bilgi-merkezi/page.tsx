"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/context";

const quickTags = ["Hedging", "Arabica", "Futures", "SCA Score", "Washed", "FOB"];

export default function BilgiMerkezi() {
  const { t } = useTranslation();

  const guides = [
    {
      category: t.learn.geographyCategory,
      title: t.learn.geographyTitle,
      desc: t.learn.geographyDesc,
      image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=400&q=80",
      href: "/bilgi-merkezi/kahve-kusagi",
    },
    {
      category: t.learn.technicalCategory,
      title: t.learn.technicalTitle,
      desc: t.learn.technicalDesc,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
      href: "/bilgi-merkezi/grafik-okuma",
    },
    {
      category: t.learn.glossaryCategory,
      title: t.learn.glossaryTitle,
      desc: t.learn.glossaryDesc,
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80",
      href: "/bilgi-merkezi/terimler-sozlugu",
    },
  ];

  const glossaryItems = [
    { term: t.learn.bagTerm, definition: t.learn.bagDef },
    { term: "Q-Grader", definition: t.learn.qgraderDef },
    { term: t.learn.diffTerm, definition: t.learn.diffDef },
    { term: t.learn.silverskinTerm, definition: t.learn.silverskinDef },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">

          {/* ═══ HEADER ═══ */}
          <section className="mb-12 md:mb-16 grid grid-cols-12 gap-4 md:gap-8 items-end">
            <div className="col-span-12 md:col-span-7">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-bold mb-4 block">
                {t.learn.headerLabel}
              </span>
              <h1 className="font-headline text-3xl md:text-5xl lg:text-7xl font-bold text-primary leading-none mb-6">
                {t.learn.title}
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                {t.learn.description}
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="w-full bg-surface-container-low p-6">
                <h3 className="font-headline text-xl font-bold text-primary mb-4">
                  {t.learn.searchTitle}
                </h3>
                <a href="/bilgi-merkezi/terimler-sozlugu" className="relative w-full block">
                  <div
                    className="w-full bg-surface-container-lowest border-b-2 border-outline-variant px-4 py-3 text-sm text-secondary cursor-pointer hover:border-primary transition-colors"
                  >
                    {t.learn.searchPlaceholder}
                  </div>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">
                    search
                  </span>
                </a>
                <div className="flex flex-wrap gap-2 mt-4">
                  {quickTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-high px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══ KAHVE FUTURES 101 — HERO KART ═══ */}
          <section className="grid grid-cols-12 gap-4 md:gap-6 mb-12 md:mb-20">
            <div className="col-span-12 lg:col-span-8 group relative overflow-hidden bg-primary-container min-h-[360px] md:min-h-[440px] flex items-end p-6 md:p-10">
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80"
                alt="Coffee futures"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="relative z-10 max-w-2xl">
                <span className="bg-tertiary text-on-tertiary-fixed font-bold text-[10px] px-3 py-1 uppercase tracking-widest mb-4 inline-block">
                  {t.learn.futuresBadge}
                </span>
                <h2 className="font-headline text-3xl md:text-5xl text-white font-bold mb-4 leading-tight">
                  {t.learn.futuresTitle}
                </h2>
                <p className="text-white/70 mb-6 leading-relaxed text-sm">
                  {t.learn.futuresDesc}
                </p>
                <Link href="/bilgi-merkezi/futures-101" className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-xs border-b border-white pb-1 group-hover:gap-4 transition-all">
                  {t.learn.futuresButton}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* İşleme Yöntemleri kartı */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
              <div className="bg-surface-container-lowest p-6 md:p-8 flex-grow flex flex-col shadow-sm">
                <span className="text-tertiary-container font-bold text-[10px] tracking-widest uppercase mb-4">
                  {t.learn.processingCategory}
                </span>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  {t.learn.processingTitle}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {t.learn.processingDesc}
                </p>
                <div className="mt-auto">
                  <div className="w-full h-36 bg-surface-container-low mb-4 relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"
                      alt="Coffee processing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Link href="/bilgi-merkezi/isleme-yontemleri" className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    {t.learn.processingButton}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ İLERİ TEKNİK REHBERLER ═══ */}
          <section className="mb-12 md:mb-16">
            <div className="flex justify-between items-baseline mb-10 border-b border-outline-variant/30 pb-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                {t.learn.guidesTitle}
              </h2>
              <a href="/bilgi-merkezi/terimler-sozlugu" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary">
                {t.learn.guidesAll}
              </a>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              {guides.map((guide, i) => (
                <Link key={i} href={guide.href} className="col-span-12 sm:col-span-6 md:col-span-4 group">
                  <div className="mb-5 aspect-[3/2] md:aspect-[4/5] overflow-hidden bg-surface-container relative">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2 block">
                    {guide.category}
                  </span>
                  <h4 className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{guide.title}</h4>
                  <p className="text-xs text-secondary leading-normal">{guide.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ═══ SEKTÖR SÖZLÜĞÜ ═══ */}
          <section className="mb-12 md:mb-16 bg-surface-container-low p-5 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
            <div>
              <h3 className="font-headline text-3xl font-bold text-primary mb-4">
                {t.learn.sectorGlossary}
              </h3>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                {t.learn.glossaryIndexDesc}
              </p>
              <div className="flex gap-3">
                <a href="/bilgi-merkezi/terimler-sozlugu" className="px-4 py-2 text-xs font-bold uppercase tracking-widest inline-block" style={{ backgroundColor: "#32170d", color: "#ffffff" }}>
                  A-Z Index
                </a>
                <a href="/bilgi-merkezi/terimler-sozlugu" className="px-4 py-2 border border-outline-variant text-xs font-bold uppercase tracking-widest text-secondary inline-block hover:bg-surface-container-high transition-colors">
                  {t.learn.popular}
                </a>
              </div>
            </div>
            <div className="space-y-5">
              {glossaryItems.slice(0, 2).map((item, i) => (
                <div key={i}>
                  <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                    {item.term}
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              {glossaryItems.slice(2).map((item, i) => (
                <div key={i}>
                  <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                    {item.term}
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ FAYDALI KAYNAKLAR ═══ */}
          <section className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.learn.resourcesTitle}</h2>
              <div className="h-px flex-1 bg-outline-variant/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <a href="http://www.intracen.org/itc/sectors/coffee/" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">public</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">ITC Coffee Guide</h4>
                <p className="text-xs text-secondary leading-relaxed">{t.learn.itcDesc}</p>
              </a>
              <a href="https://www.fas.usda.gov/commodities/coffee" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">agriculture</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">USDA Coffee Data</h4>
                <p className="text-xs text-secondary leading-relaxed">{t.learn.usdaDesc}</p>
              </a>
              <a href="https://www.searates.com/" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">sailing</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">SeaRates</h4>
                <p className="text-xs text-secondary leading-relaxed">{t.learn.searatesDesc}</p>
              </a>
              <a href="http://www.supremo.be/en/continent/coffee-encyclopedia" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">auto_stories</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">Coffee Encyclopedia</h4>
                <p className="text-xs text-secondary leading-relaxed">{t.learn.encyclopediaDesc}</p>
              </a>
            </div>
          </section>

          {/* ═══ SEKTÖR DERNEKLERİ & SERTİFİKALAR ═══ */}
          <section className="mb-12 md:mb-16 bg-surface-container-low p-6 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-primary mb-8">{t.learn.orgsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "SCA", full: "Specialty Coffee Association", url: "https://sca.coffee/", icon: "coffee" },
                { name: "ICO", full: "International Coffee Organization", url: "http://www.ico.org/", icon: "public" },
                { name: "WCR", full: "World Coffee Research", url: "https://worldcoffeeresearch.org/", icon: "biotech" },
                { name: "Rainforest Alliance", full: t.learn.rainforestDesc, url: "https://www.rainforest-alliance.org/", icon: "forest" },
                { name: "Fair Trade", full: t.learn.fairtradeDesc, url: "https://www.fairtrade.net/", icon: "handshake" },
                { name: "CQI", full: "Coffee Quality Institute", url: "https://www.coffeeinstitute.org/", icon: "verified" },
                { name: "ACE", full: "Alliance for Coffee Excellence", url: "https://allianceforcoffeeexcellence.org/", icon: "emoji_events" },
              ].map((org) => (
                <a key={org.name} href={org.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-4 bg-surface-container-lowest hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-2xl text-primary mt-0.5">{org.icon}</span>
                  <div>
                    <p className="font-bold text-sm">{org.name}</p>
                    <p className="text-[10px] text-secondary">{org.full}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ═══ PREMIUM BÜLTEN CTA ═══ */}
          <section className="text-center py-12 md:py-16">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              {t.learn.ctaTitle}
            </h2>
            <p className="text-secondary text-sm mb-8 max-w-lg mx-auto">
              {t.learn.ctaDesc}
            </p>
            <NewsletterForm />
          </section>

        </div>
        <Footer />
      </div>
    </>
  );
}
