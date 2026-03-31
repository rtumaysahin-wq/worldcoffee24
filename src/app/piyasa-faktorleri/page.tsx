import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const demandCards = [
  {
    title: "Çin Büyümesi",
    text: "Çin'in yıllık kahve tüketimi %15 büyüyor. 2025 ithalat hacmi 4.2M çuvala ulaşması bekleniyor.",
    stat: "+15%",
    statLabel: "YoY",
  },
  {
    title: "Premium Trend",
    text: "Specialty kahve segmenti küresel piyasanın %12'sine ulaştı. Üçüncü dalga kafelerin büyümesi premium talep yaratmaya devam ediyor.",
    stat: "12%",
    statLabel: "Pazar Payı",
  },
  {
    title: "Sürdürülebilirlik",
    text: "AB ormansızlaşma yönetmeliği 2025 uygulamasının Vietnam ve Endonezya ihracatını etkilemesi bekleniyor.",
    stat: "EU",
    statLabel: "Regulasyon",
  },
];

export default function PiyasaFaktorleri() {
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
                  Piyasa Faktörleri Özeti
                </span>
                <h1 className="font-headline text-4xl md:text-6xl font-light text-primary leading-none mb-5">
                  Piyasa Faktörleri &amp; Makro Dinamikler
                </h1>
                <p className="text-base md:text-lg text-secondary leading-relaxed font-light">
                  Küresel kahve emtia alanını şekillendiren kritik değişkenlerin editöryal analizi.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-low p-5 md:p-6 editorial-shadow">
                <div className="text-right border-r border-outline-variant/30 pr-4">
                  <span className="text-[10px] font-label uppercase text-secondary">Son Güncelleme</span>
                  <p className="font-headline text-lg font-bold">30 Mar 2026</p>
                </div>
                <div>
                  <span className="text-[10px] font-label uppercase text-secondary">Endeks Oynaklığı</span>
                  <p className="font-headline text-lg font-bold text-error">Moderate (1.2%)</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 md:gap-10">

            {/* ═══ SOL KOLON: İKLİM & ÜRETİM + TALEP ═══ */}
            <section className="col-span-12 lg:col-span-8 space-y-8">

              {/* Bölüm başlığı */}
              <div className="flex items-center gap-4">
                <h2 className="font-headline text-2xl font-bold">İklim &amp; Üretim</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ENSO Status */}
                <div className="group bg-surface-container-lowest p-6 md:p-8 editorial-shadow relative overflow-hidden hover:-translate-y-1 transition-all">
                  <span className="text-[10px] font-label uppercase tracking-widest text-secondary block mb-5">
                    Meteoroloji
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl mb-4">
                    ENSO Durumu: La Niña Geçişi
                  </h3>
                  <p className="text-sm text-secondary mb-7 leading-relaxed">
                    La Nina&rsquo;nin Eylül-Kasım arasında oluşma olasılığı %70&rsquo;tir. Kuzey Brezilya&rsquo;da artan yağış, çiçeklenmeyi geciktirebilir.
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
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-primary-container block mb-5">
                    Arz Analizi
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl mb-4">Brezilya Hasat Döngüsü</h3>
                  <p className="text-sm text-on-tertiary-container mb-7 leading-relaxed">
                    2025/26 üretimi için &ldquo;yıldan yıla dönüşüm&rdquo; döngüsü bekleniyor. İlk tahminler çift yıllık döngüler nedeniyle Arabica üretiminde %12 azalma öngörüyor.
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-headline italic">Düşük Verim</p>
                      <p className="text-[10px] uppercase font-label">Tahmini 54.2M Çuval</p>
                    </div>
                    <span className="text-3xl font-headline font-bold">-12%</span>
                  </div>
                </div>

                {/* Don Uyarıları — tam genişlik */}
                <div className="col-span-1 md:col-span-2 bg-surface-container-low p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                      <span className="text-[10px] font-label uppercase tracking-widest text-tertiary font-bold">
                        Canlı İzleme
                      </span>
                    </div>
                    <h3 className="font-headline text-3xl md:text-4xl mb-4">
                      Don Uyarıları: Minas Gerais
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Yüksek irtifa bölgeleri için kritik izleme aşaması. Sıcaklıklar 12°C&rsquo;de stabilize oldu. Bu hafta için risk düşük, ancak polar hava kütlesi hareketleri saatlik takip gerektiriyor.
                    </p>
                  </div>
                  <div className="w-full md:w-64 h-40 bg-surface-container-highest overflow-hidden flex-shrink-0">
                    <svg width="100%" height="100%" viewBox="0 0 256 160" xmlns="http://www.w3.org/2000/svg">
                      <rect width="256" height="160" fill="#c8d8e0" />
                      <polygon points="0,160 60,60 120,110 180,40 256,160" fill="#8aabb8" />
                      <polygon points="60,60 120,110 0,160" fill="#6e96a6" />
                      <polygon points="180,40 256,160 120,110" fill="#7aa3b2" />
                      <polygon points="60,60 75,80 45,80" fill="white" opacity="0.8" />
                      <polygon points="180,40 198,65 162,65" fill="white" opacity="0.8" />
                      <rect x="90" y="125" width="76" height="16" rx="2" fill="white" opacity="0.9" />
                      <text x="128" y="137" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="bold" fill="#32170d" textAnchor="middle">
                        ZONE 4: STABLE
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* ═══ KÜRESEL TALEP TRENDLERİ ═══ */}
              <div>
                <div className="flex items-center gap-4 mb-8 mt-6">
                  <h2 className="font-headline text-2xl font-bold">Küresel Talep Trendleri</h2>
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
                <h2 className="font-headline text-2xl font-bold">Ekonomik Faktörler</h2>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>

              {/* Kur Etkisi */}
              <div className="bg-surface p-6 md:p-8 border-b border-outline-variant/30">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <span className="text-[10px] font-label uppercase tracking-widest text-secondary block mb-2">
                      Kur Etkisi
                    </span>
                    <h3 className="font-headline text-3xl font-bold">BRL/USD</h3>
                  </div>
                  <span className="font-headline text-2xl font-bold text-primary">0.1982</span>
                </div>
                <p className="text-sm text-secondary italic">
                  &ldquo;Zayıflayan Real, Brezilyalı üreticileri daha fazla ihracat yapmaya teşvik ederek New York ICE fiyatları üzerinde aşağı yönlü baskı oluşturuyor.&rdquo;
                </p>
              </div>

              {/* Lojistik & Enerji */}
              <div className="bg-surface-container-high/50 p-6 md:p-8">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-5">
                  Lojistik &amp; Enerji
                </h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Deniz Navlun Endeksi</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-error" />
                      <span className="font-headline font-bold">+18%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Brent Ham Petrol ($/varil)</span>
                    <span className="font-headline font-bold">82.40</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Konteyner Mevcudiyeti</span>
                    <span className="text-xs font-bold uppercase text-secondary">Kısıtlı</span>
                  </div>
                </div>
              </div>

              {/* COT */}
              <div className="bg-surface p-6 md:p-8">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-5">
                  Trader Taahhutleri (COT)
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Spekülatif Uzun Pozisyonlar</span>
                    <span className="font-headline text-2xl font-bold text-tertiary">+52,840</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Spekülatif Kısa Pozisyonlar</span>
                    <span className="font-headline text-2xl font-bold text-error">-18,210</span>
                  </div>
                </div>
                <p className="text-xs text-secondary mt-5 leading-relaxed">
                  Spekülatif net uzun pozisyon tarihsel olarak yüksek seyrediyor; güçlü duyarlılığa işaret ediyor ancak teknik satış baskısına karşı savunmasız.
                </p>
              </div>

              {/* ICE Sertifikalı Stoklar */}
              <div className="bg-surface p-6 md:p-8 border border-error/20">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-3">
                  ICE Sertifikalı Stoklar
                </h4>
                <p className="font-headline text-4xl font-bold text-primary">842K</p>
                <p className="text-secondary text-sm mb-3">Bags</p>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-2">
                  <div className="bg-primary w-[35%] h-full rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-secondary">
                  <span>Mevcut Seviye</span>
                  <span>5 Yıllık Ort. (2.4M)</span>
                </div>
                <p className="text-[10px] font-bold text-error uppercase mt-3 tracking-widest">
                  Stok Uyarısı: 10 Yılın En Düşüğü
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
