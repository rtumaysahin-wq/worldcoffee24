import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Futures 101 — Vadeli İşlemler Rehberi",
  description:
    "Kahve vadeli işlemleri nedir, nasıl çalışır? ICE borsasında Arabica ve Robusta futures kontratlarını anlamak için yeni başlayanlar rehberi.",
  keywords: [
    "kahve futures nedir",
    "vadeli işlem nedir",
    "ICE kahve borsası",
    "arabica futures",
    "KC kontrat",
    "emtia yatırımı",
    "coffee futures 101",
  ],
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Kahve Futures 101 — Vadeli İşlemler Rehberi",
    description: "Kahve vadeli işlemleri nedir, nasıl çalışır? ICE borsasında Arabica ve Robusta futures kontratlarını anlamak için yeni başlayanlar rehberi.",
    author: { "@type": "Organization", name: "WorldCoffee24" },
    publisher: { "@type": "Organization", name: "WorldCoffee24", logo: { "@type": "ImageObject", url: "https://worldcoffee24.com/favicon.ico" } },
    mainEntityOfPage: "https://worldcoffee24.com/bilgi-merkezi/futures-101",
    inLanguage: "tr",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://worldcoffee24.com" },
      { "@type": "ListItem", position: 2, name: "Bilgi Merkezi", item: "https://worldcoffee24.com/bilgi-merkezi" },
      { "@type": "ListItem", position: 3, name: "Futures 101", item: "https://worldcoffee24.com/bilgi-merkezi/futures-101" },
    ],
  },
];

export default function Futures101() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <Link
            href="/bilgi-merkezi"
            className="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary mb-6 inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Bilgi Merkezi
          </Link>

          <span className="bg-tertiary text-on-tertiary-fixed font-bold text-[10px] px-3 py-1 uppercase tracking-widest mb-4 inline-block">
            Özel Seri
          </span>

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            Kahve Futures 101: Vadeli İşlemler Rehberi
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Kahve dünyasının en önemli fiyat belirleme mekanizması olan vadeli işlem (futures) kontratlarını
            anlamak, ister üretici ister trader ister sektörde çalışan biri olun, büyük avantaj sağlar.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Futures Kontratı Nedir?
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Futures (vadeli işlem) kontratı, belirli bir emtianın (bu durumda kahve) önceden belirlenmiş bir fiyattan,
              belirli bir tarihte teslim edilmesini içeren standartlaştırılmış bir sözleşmedir. Bu kontratlar borsalarda
              işlem görür ve hem üreticilere hem de alıcılara fiyat riskinden korunma (hedging) imkanı sunar.
            </p>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Örneğin, bir Brezilyalı kahve çiftçisi hasat döneminden önce fiyatların düşeceğinden endişe ediyorsa,
              bugünün fiyatından bir futures kontratı satarak fiyatını sabitleyebilir. Aynı şekilde, bir kavurucu firma
              maliyetlerini önceden bilmek istiyorsa futures kontratı alarak tedarik fiyatını garanti altına alır.
            </p>

            <div className="bg-surface-container-low p-6 md:p-8 my-6 border-l-4 border-primary">
              <h4 className="font-headline text-lg font-bold mb-2">Basit Örnek</h4>
              <p className="text-sm text-secondary leading-relaxed">
                Bir kavurucu firma 6 ay sonra 100 ton kahveye ihtiyaç duyuyor. Bugünün fiyatı 300 cent/lb.
                Firma bu fiyattan futures kontratı alıyor. 6 ay sonra fiyat 350 cent/lb&apos;ye çıksa bile,
                firma kahvesini 300 cent/lb&apos;den alır. Böylece 50 cent/lb tasarruf etmiş olur.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Kahve Borsaları
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-6">
              Dünya üzerinde kahve futures kontratlarının işlem gördüğü iki ana borsa vardır:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-surface-container-lowest p-6 editorial-shadow border-l-4 border-primary">
                <h3 className="font-headline text-xl font-bold mb-2">ICE New York (ICEUS)</h3>
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  Sembol: KC &bull; Birim: US cent/lb
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  Arabica kahve için dünya referans borsası. &ldquo;C Kontratı&rdquo; olarak bilinir.
                  Kontrat büyüklüğü 37.500 libre (yaklaşık 17 ton). Kolombiya, Brezilya, Guatemala,
                  Kosta Rika gibi ülkelerin Arabica kahveleri işlem görür.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 editorial-shadow border-l-4 border-primary-container">
                <h3 className="font-headline text-xl font-bold mb-2">ICE London (ICEEUR)</h3>
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  Sembol: RC &bull; Birim: USD/ton
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  Robusta kahve için referans borsa. Kontrat büyüklüğü 10 ton. Vietnam, Endonezya,
                  Uganda gibi ülkelerin Robusta kahveleri işlem görür. Instant kahve endüstrisinin
                  temel hammaddesi Robusta&apos;dır.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Fiyatı Etkileyen Faktörler
            </h2>
            <div className="space-y-4">
              {[
                { icon: "thermostat", title: "İklim ve Hava Koşulları", desc: "Don, kuraklık, aşırı yağış gibi hava olayları üretimi doğrudan etkiler. Brezilya'da bir don olayı küresel fiyatları %30-50 yukarı taşıyabilir." },
                { icon: "currency_exchange", title: "Döviz Kurları", desc: "Brezilya Real'inin dolara karşı değer kaybetmesi, Brezilyalı üreticileri daha fazla ihracata teşvik eder ve arz artışı fiyatları düşürebilir." },
                { icon: "inventory_2", title: "Stok Seviyeleri", desc: "ICE sertifikalı stokların azalması arz sıkıntısı sinyali verir. 2024-2026 döneminde stoklar tarihi düşük seviyelere indi." },
                { icon: "bar_chart", title: "Spekülatif Pozisyonlar", desc: "COT (Commitment of Traders) raporunda spekülatörlerin net uzun veya kısa pozisyonları fiyat yönünü gösterebilir." },
                { icon: "local_shipping", title: "Lojistik ve Navlun", desc: "Konteyner maliyetleri, liman tıkanıklıkları ve nakliye süresi üretim ülkelerinden tüketim merkezlerine kahve akışını etkiler." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-2xl text-primary mt-1">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Önemli Terimler
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[10px] font-label uppercase tracking-widest text-secondary">
                    <th className="pb-3">Terim</th>
                    <th className="pb-3">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    ["Long Pozisyon", "Kontrat satın almak — fiyatın yükseleceğine bahis"],
                    ["Short Pozisyon", "Kontrat satmak — fiyatın düşeceğine bahis"],
                    ["Margin", "Kontrat açmak için gereken teminat tutarı"],
                    ["Settlement", "Kontrat vadesi geldiğinde fiziksel teslimat veya nakit uzlaşma"],
                    ["Spread", "İki farklı vade arasındaki fiyat farkı"],
                    ["Contango", "İleri vadeli kontrat fiyatının spot fiyattan yüksek olması"],
                    ["Backwardation", "İleri vadeli kontrat fiyatının spot fiyattan düşük olması"],
                    ["Open Interest", "Açık pozisyon sayısı — piyasa derinliğinin göstergesi"],
                  ].map(([term, desc], i) => (
                    <tr key={i}>
                      <td className="py-3 font-bold text-primary">{term}</td>
                      <td className="py-3 text-secondary">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="bg-primary-container text-white p-8 text-center">
            <h3 className="font-headline text-2xl mb-3">Canlı Fiyatları Takip Edin</h3>
            <p className="text-sm text-white/70 mb-5">
              Arabica ve Robusta futures fiyatlarını canlı olarak Fiyat Merkezi sayfamızdan izleyebilirsiniz.
            </p>
            <Link
              href="/fiyat-merkezi"
              className="inline-block bg-[#f4fafe] text-primary-container px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Fiyat Merkezi'ne Git
            </Link>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
