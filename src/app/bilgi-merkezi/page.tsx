import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const quickTags = ["Hedging", "Arabica", "Futures", "SCA Score", "Washed", "FOB"];

const guides = [
  {
    category: "Coğrafya",
    title: "Kahve Kuşağı: Üretim Ülkeleri ve Bölgesel Lezzet Profilleri",
    desc: "Brezilya'dan Etiyopya'ya, başlıca üretim ülkeleri, iklim koşulları ve kahve çeşitleri.",
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=400&q=80",
    href: "/bilgi-merkezi/kahve-kusagi",
  },
  {
    category: "Teknik Analiz",
    title: "Grafik Okuma Rehberi: Candlestick, Destek/Direnç, Hareketli Ortalamalar",
    desc: "Emtia grafiği okuma temelleri. Kahve traderları için teknik analiz aracı.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    href: "/bilgi-merkezi/grafik-okuma",
  },
  {
    category: "Sözlük",
    title: "Kahve Terimler Sözlüğü: A'dan Z'ye 33 Temel Terim",
    desc: "Arabica'dan Washed Process'e, kahve ticaretinde kullanılan tüm terimlerin açıklaması.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80",
    href: "/bilgi-merkezi/terimler-sozlugu",
  },
];

const glossaryItems = [
  {
    term: "Çuval (Standart)",
    definition: "Bir kahve ölçü birimi. \"Standart Çuval\" Arabica ticaretinde genellikle 60 kg'dir.",
  },
  {
    term: "Q-Grader",
    definition: "Arabica kahveyi derecelendirmek için Coffee Quality Institute (CQI) tarafından sertifikalandırılmış profesyonel tadımcı.",
  },
  {
    term: "Diferansiyeller",
    definition: "C-Piyasa fiyatına göre kalitenin, menşeinin ve sertifikasyon durumuna göre kahveye uygulanan fiyat primi veya indirimi.",
  },
  {
    term: "Gümüş Deri (Silverskin)",
    definition: "Kahve çekirdeğini örten ince zar; kavurma sırasında \"kepek\" olarak salınır.",
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
                Küresel Kahve Ticaretinde <span className="italic font-normal">Uzmanlaşın</span>
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Kahve üreticileri, kurumsal traderlar ve ciddi meraklılar için derinlemesine eğitim kaynakları.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="w-full bg-surface-container-low p-6">
                <h3 className="font-headline text-xl font-bold text-primary mb-4">
                  Hızlı Terimler Arama
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
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=1200&q=80"
                alt="Kahve vadeli işlemler"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="relative z-10 max-w-2xl">
                <span className="bg-tertiary text-on-tertiary-fixed font-bold text-[10px] px-3 py-1 uppercase tracking-widest mb-4 inline-block">
                  Özel Seri
                </span>
                <h2 className="font-headline text-3xl md:text-5xl text-white font-bold mb-4 leading-tight">
                  Kahve Vadeli İşlemleri 101: Emtia Borsasında Yol Haritası
                </h2>
                <p className="text-on-primary-container mb-6 leading-relaxed text-sm">
                  New York Ticaret Borsası&rsquo;nın mekanizmalarını anlayın. Fiyat oynaklığına karşı nasıl korunacağınızı ve dalgalı küresel piyasada riski nasıl yöneteceğinizi öğrenin.
                </p>
                <Link href="/bilgi-merkezi/futures-101" className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-xs border-b border-white pb-1 group-hover:gap-4 transition-all">
                  Okumaya Başla
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* İşleme Yöntemleri kartı */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
              <div className="bg-surface-container-lowest p-6 md:p-8 flex-grow flex flex-col shadow-sm">
                <span className="text-tertiary-container font-bold text-[10px] tracking-widest uppercase mb-4">
                  Temel Bilgi
                </span>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  İşleme Yöntemleri: Bilim &amp; Lezzet
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Doğal ve Yıkamalı&rsquo;dan Anaerobik fermantasyona — hasat sonrası teknikler fincan profilini nasıl belirler.
                </p>
                <div className="mt-auto">
                  <div className="w-full h-36 bg-surface-container-low mb-4 relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"
                      alt="Kahve işleme yöntemleri"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Link href="/bilgi-merkezi/isleme-yontemleri" className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    Modülü Keşfet
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
                İleri Teknik Rehberler
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary cursor-pointer">
                Tüm Modüller
              </span>
            </div>
            <div className="grid grid-cols-12 gap-8">
              {guides.map((guide, i) => (
                <Link key={i} href={guide.href} className="col-span-12 md:col-span-4 group">
                  <div className="mb-5 aspect-[4/5] overflow-hidden bg-surface-container relative">
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
          <section className="mb-12 md:mb-16 bg-surface-container-low p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <h3 className="font-headline text-3xl font-bold text-primary mb-4">
                Sektör Sözlüğü
              </h3>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                Botanik sınıflandırmalardan finansal ticaret jargonuna kahve terminolojisinin kapsamlı dizini.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest">
                  A-Z Index
                </button>
                <button className="px-4 py-2 border border-outline-variant text-xs font-bold uppercase tracking-widest text-secondary">
                  Popüler
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
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Faydalı Kaynaklar</h2>
              <div className="h-px flex-1 bg-outline-variant/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <a href="http://www.intracen.org/itc/sectors/coffee/" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">public</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">ITC Coffee Guide</h4>
                <p className="text-xs text-secondary leading-relaxed">Uluslararası Ticaret Merkezi kahve sektör rehberi ve pazar analizi.</p>
              </a>
              <a href="https://www.fas.usda.gov/commodities/coffee" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">agriculture</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">USDA Coffee Data</h4>
                <p className="text-xs text-secondary leading-relaxed">ABD Tarım Bakanlığı kahve üretim, tüketim ve ticaret verileri.</p>
              </a>
              <a href="https://www.searates.com/" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">sailing</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">SeaRates</h4>
                <p className="text-xs text-secondary leading-relaxed">Küresel navlun oranları, konteyner takibi ve lojistik hesaplayıcı.</p>
              </a>
              <a href="http://www.supremo.be/en/continent/coffee-encyclopedia" target="_blank" rel="noopener noreferrer" className="p-6 bg-surface-container-lowest editorial-shadow hover:-translate-y-1 transition-all group">
                <span className="material-symbols-outlined text-3xl text-primary mb-3 block">auto_stories</span>
                <h4 className="font-headline text-lg font-bold mb-2 group-hover:text-primary">Coffee Encyclopedia</h4>
                <p className="text-xs text-secondary leading-relaxed">Kapsamlı kahve ansiklopedisi: çeşitler, bölgeler, işleme yöntemleri.</p>
              </a>
            </div>
          </section>

          {/* ═══ SEKTÖR DERNEKLERİ & SERTİFİKALAR ═══ */}
          <section className="mb-12 md:mb-16 bg-surface-container-low p-6 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-primary mb-8">Sektör Dernekleri &amp; Sertifikalar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "SCA", full: "Specialty Coffee Association", url: "https://sca.coffee/", icon: "coffee" },
                { name: "ICO", full: "International Coffee Organization", url: "http://www.ico.org/", icon: "public" },
                { name: "WCR", full: "World Coffee Research", url: "https://worldcoffeeresearch.org/", icon: "biotech" },
                { name: "Rainforest Alliance", full: "Sürdürülebilirlik Sertifikası", url: "https://www.rainforest-alliance.org/", icon: "forest" },
                { name: "Fair Trade", full: "Adil Ticaret Sertifikası", url: "https://www.fairtrade.net/", icon: "handshake" },
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
              Daha Derin Analiz mi İstiyorsunuz?
            </h2>
            <p className="text-secondary text-sm mb-8 max-w-lg mx-auto">
              Haftalık teknik raporlar, piyasa tahminleri ve sektör öncüleriyle özel röportajlar için premium bültenimize katılın.
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
