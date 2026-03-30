import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const quickTags = ["Hedging", "Arabica", "Futures", "SCA Score", "Washed", "FOB"];

const guides = [
  {
    category: "Botanik & Agronomi",
    title: "Arabica - Robusta: Genetik Fark ve Gelecekteki Melezler",
    desc: "Yukselen kahve cesitlerinde iklim dayanikliligi ve verim faktorlerinin analizi.",
    svgBg: "#1a2a12",
    svgFill: "#1f3318",
  },
  {
    category: "Lojistik & Tedarik",
    title: "Yesil Kahve Depolama: Bozulmayi ve Kalite Dususunu Onlemek",
    desc: "Nakliye ve depolamada nem kontrolu ve atmosfer yonetimi.",
    svgBg: "#1a2535",
    svgFill: "#162030",
  },
  {
    category: "Ekonomi",
    title: "Direkt Ticaret Paradoksu: Etik, Verimlilik ve Gerceklik",
    desc: "Gercek anlamda surdurulebilir kahve tedariki ve seffaflik metriklerinin tanimlanmasi.",
    svgBg: "#1a1008",
    svgFill: "#2d1a0a",
  },
];

const glossaryItems = [
  {
    term: "Cuval (Standart)",
    definition: "Bir kahve olcu birimi. \"Standart Cuval\" Arabica ticaretinde genellikle 60 kg'dir.",
  },
  {
    term: "Q-Grader",
    definition: "Arabica kahveyi derecelendirmek icin Coffee Quality Institute (CQI) tarafindan sertifikalandirilmis profesyonel tadimci.",
  },
  {
    term: "Diferansiyeller",
    definition: "C-Piyasa fiyatina gore kalitenin, menseinin ve sertifikasyon durumuna gore kahveye uygulanan fiyat primi veya indirimi.",
  },
  {
    term: "Gumus Deri (Silverskin)",
    definition: "Kahve cekirdegini orten ince zar; kavurma sirasinda \"kepek\" olarak salinir.",
  },
];

export default function BilgiMerkezi() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">

          {/* ═══ HEADER ═══ */}
          <section className="mb-12 md:mb-16 grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-7">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-bold mb-4 block">
                Bilgi Merkezi
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
                Mastering the <span className="italic font-normal">Global Bean</span>
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Kahve ureticileri, kurumsal traderlar ve ciddi meraklilar icin derinlemesine egitim kaynaklari.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="w-full bg-surface-container-low p-6">
                <h3 className="font-headline text-xl font-bold text-primary mb-4">
                  Hizli Terimler Arama
                </h3>
                <div className="relative w-full">
                  <input
                    className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary px-4 py-3 text-sm outline-none"
                    placeholder="e.g. 'Short Position' or 'Honey Process'"
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">
                    search
                  </span>
                </div>
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
          <section className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 lg:col-span-8 group relative overflow-hidden bg-primary-container min-h-[360px] md:min-h-[440px] flex items-end p-6 md:p-10">
              {/* SVG arka plan */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 700 440"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="700" height="440" fill="#2d1508" />
                <g opacity="0.2">
                  <rect x="20" y="280" width="120" height="160" rx="8" fill="#5a3018" />
                  <rect x="155" y="300" width="120" height="140" rx="8" fill="#4d2814" />
                  <rect x="290" y="290" width="120" height="150" rx="8" fill="#5a3018" />
                  <rect x="425" y="295" width="120" height="145" rx="8" fill="#4d2814" />
                  <rect x="560" y="280" width="140" height="160" rx="8" fill="#5a3018" />
                  <line x1="20" y1="320" x2="140" y2="320" stroke="#7a4a28" strokeWidth="1.5" />
                  <line x1="20" y1="350" x2="140" y2="350" stroke="#7a4a28" strokeWidth="1.5" />
                  <line x1="290" y1="330" x2="410" y2="330" stroke="#7a4a28" strokeWidth="1.5" />
                  <line x1="290" y1="360" x2="410" y2="360" stroke="#7a4a28" strokeWidth="1.5" />
                </g>
                <g opacity="0.08">
                  <rect x="0" y="80" width="700" height="6" fill="white" />
                  <rect x="0" y="180" width="700" height="6" fill="white" />
                  <rect x="0" y="250" width="700" height="6" fill="white" />
                </g>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="relative z-10 max-w-2xl">
                <span className="bg-tertiary text-on-tertiary-fixed font-bold text-[10px] px-3 py-1 uppercase tracking-widest mb-4 inline-block">
                  Ozel Seri
                </span>
                <h2 className="font-headline text-3xl md:text-5xl text-white font-bold mb-4 leading-tight">
                  Kahve Vadeli Islemleri 101: Emtia Borsasinda Yol Haritasi
                </h2>
                <p className="text-on-primary-container mb-6 leading-relaxed text-sm">
                  New York Ticaret Borsasi&rsquo;nin mekanizmalarini anlayin. Fiyat oynakligina karsi nasil korunacaginizi ve dalgali kuresel piyasada riski nasil yonetecginizi ogrenin.
                </p>
                <button className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-xs border-b border-white pb-1 group-hover:gap-4 transition-all">
                  Okumaya Basla
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* İşleme Yöntemleri kartı */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
              <div className="bg-surface-container-lowest p-6 md:p-8 flex-grow flex flex-col shadow-sm">
                <span className="text-tertiary-container font-bold text-[10px] tracking-widest uppercase mb-4">
                  Temel Bilgi
                </span>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  Isleme Yontemleri: Bilim &amp; Lezzet
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Dogal ve Yikamali&rsquo;dan Anaerobik fermantasyona — hasat sonrasi teknikler fincan profilini nasil belirler.
                </p>
                <div className="mt-auto">
                  <div className="w-full h-36 bg-surface-container-low mb-4 flex items-center justify-center">
                    <svg width="120" height="110" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="60" cy="88" rx="38" ry="7" fill="#d5c3bd" opacity="0.35" />
                      <path d="M26,44 L36,88 Q60,98 84,88 L94,44 Z" fill="#e8e0dc" />
                      <path d="M26,44 Q60,54 94,44" fill="none" stroke="#d5c3bd" strokeWidth="2" />
                      <ellipse cx="60" cy="44" rx="34" ry="9" fill="#ddd5d0" />
                      <ellipse cx="60" cy="43" rx="27" ry="7" fill="#6f4e37" />
                      <path d="M94,55 Q112,55 112,70 Q112,84 94,84" fill="none" stroke="#e8e0dc" strokeWidth="8" strokeLinecap="round" />
                      <path d="M48,35 Q44,24 50,14" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                      <path d="M60,32 Q56,21 62,11" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                      <path d="M72,35 Q68,24 74,14" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                    </svg>
                  </div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                    Modulu Kesfet
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ İLERİ TEKNİK REHBERLER ═══ */}
          <section className="mb-12 md:mb-16">
            <div className="flex justify-between items-baseline mb-10 border-b border-outline-variant/30 pb-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                Ileri Teknik Rehberler
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary cursor-pointer">
                Tum Moduller
              </span>
            </div>
            <div className="grid grid-cols-12 gap-8">
              {guides.map((guide, i) => (
                <div key={i} className="col-span-12 md:col-span-4">
                  <div className="mb-5 aspect-[4/5] overflow-hidden bg-surface-container flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
                      <rect width="200" height="250" fill={guide.svgBg} />
                      <rect x="0" y="170" width="200" height="80" fill={guide.svgFill} />
                      <ellipse cx="100" cy="120" rx="60" ry="80" fill={guide.svgFill} opacity="0.6" />
                      <text
                        x="100"
                        y="130"
                        fontFamily="Inter,sans-serif"
                        fontSize="40"
                        fill="white"
                        opacity="0.1"
                        textAnchor="middle"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </text>
                    </svg>
                  </div>
                  <span className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2 block">
                    {guide.category}
                  </span>
                  <h4 className="font-headline text-xl mb-2">{guide.title}</h4>
                  <p className="text-xs text-secondary leading-normal">{guide.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ SEKTÖR SÖZLÜĞÜ ═══ */}
          <section className="mb-12 md:mb-16 bg-surface-container-low p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <h3 className="font-headline text-3xl font-bold text-primary mb-4">
                Sektor Sozlugu
              </h3>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                Botanik siniflandirmalardan finansal ticaret jargonuna kahve terminolojisinin kapsamli dizini.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest">
                  A-Z Index
                </button>
                <button className="px-4 py-2 border border-outline-variant text-xs font-bold uppercase tracking-widest text-secondary">
                  Populer
                </button>
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
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Faydali Kaynaklar</h2>
              <div className="h-px flex-1 bg-outline-variant/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <a href="http://www.intracen.org/itc/sectors/coffee/" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">public</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">ITC Coffee Guide</h4>
                <p className="text-xs text-secondary leading-relaxed">Uluslararasi Ticaret Merkezi kahve sektor rehberi ve pazar analizi.</p>
              </a>
              <a href="https://www.fas.usda.gov/commodities/coffee" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">agriculture</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">USDA Coffee Data</h4>
                <p className="text-xs text-secondary leading-relaxed">ABD Tarim Bakanligi kahve uretim, tuketim ve ticaret verileri.</p>
              </a>
              <a href="https://www.searates.com/" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">sailing</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">SeaRates</h4>
                <p className="text-xs text-secondary leading-relaxed">Kuresel navlun oranlari, konteyner takibi ve lojistik hesaplayici.</p>
              </a>
              <a href="http://www.supremo.be/en/continent/coffee-encyclopedia" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">auto_stories</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">Coffee Encyclopedia</h4>
                <p className="text-xs text-secondary leading-relaxed">Kapsamli kahve ansiklopedisi: cesitler, bolgeler, isleme yontemleri.</p>
              </a>
            </div>
          </section>

          {/* ═══ SEKTÖR DERNEKLERİ & SERTİFİKALAR ═══ */}
          <section className="mb-12 md:mb-16 bg-surface-container-low p-6 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-primary mb-8">Sektor Dernekleri &amp; Sertifikalar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "SCA", full: "Specialty Coffee Association", url: "https://sca.coffee/", icon: "coffee" },
                { name: "ICO", full: "International Coffee Organization", url: "http://www.ico.org/", icon: "public" },
                { name: "WCR", full: "World Coffee Research", url: "https://worldcoffeeresearch.org/", icon: "biotech" },
                { name: "Rainforest Alliance", full: "Surdurulebilirlik Sertifikasi", url: "https://www.rainforest-alliance.org/", icon: "forest" },
                { name: "Fair Trade", full: "Adil Ticaret Sertifikasi", url: "https://www.fairtrade.net/", icon: "handshake" },
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
              Daha Derin Analiz mi Istiyorsunuz?
            </h2>
            <p className="text-secondary text-sm mb-8 max-w-lg mx-auto">
              Haftalik teknik raporlar, piyasa tahminleri ve sektor onculeriyle ozel roportajlar icin premium bultenimize katilin.
            </p>
            <div className="flex max-w-md mx-auto gap-0">
              <input
                className="flex-1 border border-outline-variant px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder="professional@email.com"
                type="email"
              />
              <button className="bg-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-container">
                Abone Ol
              </button>
            </div>
          </section>

        </div>
        <Footer />
      </div>
    </>
  );
}
