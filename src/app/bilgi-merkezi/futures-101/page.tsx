import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Futures 101 — Vadeli Islemler Rehberi",
  description:
    "Kahve vadeli islemleri nedir, nasil calisir? ICE borsasinda Arabica ve Robusta futures kontratlarini anlamak icin yeni baslayanlar rehberi.",
  keywords: [
    "kahve futures nedir",
    "vadeli islem nedir",
    "ICE kahve borsasi",
    "arabica futures",
    "KC kontrat",
    "emtia yatirimi",
    "coffee futures 101",
  ],
};

export default function Futures101() {
  return (
    <>
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
            Ozel Seri
          </span>

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            Kahve Futures 101: Vadeli Islemler Rehberi
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Kahve dunyasinin en onemli fiyat belirleme mekanizmasi olan vadeli islem (futures) kontratlarini
            anlamak, ister uretici ister trader ister sektorde calisan biri olun, buyuk avantaj saglar.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Futures Kontrati Nedir?
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Futures (vadeli islem) kontrati, belirli bir emtianin (bu durumda kahve) onceden belirlenmis bir fiyattan,
              belirli bir tarihte teslim edilmesini iceren standartlastirilmis bir sozlesmedir. Bu kontratlar borsalarda
              islem gorur ve hem ureticilere hem de alicilara fiyat riskinden korunma (hedging) imkani sunar.
            </p>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Ornegin, bir Brezilyali kahve cifticisi hasat doneminden once fiyatlarin duseceginden endise ediyorsa,
              bugunun fiyatindan bir futures kontrati satarak fiyatini sabitleyebilir. Ayni sekilde, bir kavurucu firma
              maliyetlerini onceden bilmek istiyorsa futures kontrati alarak tedarik fiyatini garanti altina alir.
            </p>

            <div className="bg-surface-container-low p-6 md:p-8 my-6 border-l-4 border-primary">
              <h4 className="font-headline text-lg font-bold mb-2">Basit Ornek</h4>
              <p className="text-sm text-secondary leading-relaxed">
                Bir kavurucu firma 6 ay sonra 100 ton kahveye ihtiyac duyuyor. Bugunun fiyati 300 cent/lb.
                Firma bu fiyattan futures kontrati aliyor. 6 ay sonra fiyat 350 cent/lb&apos;ye ciksa bile,
                firma kahvesini 300 cent/lb&apos;den alir. Boylece 50 cent/lb tasarruf etmis olur.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Kahve Borsalari
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-6">
              Dunya uzerinde kahve futures kontratlarinin islem gordugu iki ana borsa vardir:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-surface-container-lowest p-6 editorial-shadow border-l-4 border-primary">
                <h3 className="font-headline text-xl font-bold mb-2">ICE New York (ICEUS)</h3>
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  Sembol: KC &bull; Birim: US cent/lb
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  Arabica kahve icin dunya referans borsasi. &ldquo;C Kontrati&rdquo; olarak bilinir.
                  Kontrat buyuklugu 37.500 libre (yaklasik 17 ton). Kolombiya, Brezilya, Guatemala,
                  Kosta Rika gibi ulkelerin Arabica kahveleri islem gorur.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 editorial-shadow border-l-4 border-primary-container">
                <h3 className="font-headline text-xl font-bold mb-2">ICE London (ICEEUR)</h3>
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  Sembol: RC &bull; Birim: USD/ton
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  Robusta kahve icin referans borsa. Kontrat buyuklugu 10 ton. Vietnam, Endonezya,
                  Uganda gibi ulkelerin Robusta kahveleri islem gorur. Instant kahve endustrisinin
                  temel hammaddesi Robusta&apos;dir.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Fiyati Etkileyen Faktorler
            </h2>
            <div className="space-y-4">
              {[
                { icon: "thermostat", title: "Iklim ve Hava Kosullari", desc: "Don, kuraklik, asiri yagis gibi hava olaylari uretimi dogrudan etkiler. Brezilya'da bir don olayi kuresel fiyatlari %30-50 yukari tasiyabilir." },
                { icon: "currency_exchange", title: "Doviz Kurlari", desc: "Brezilya Real'inin dolara karsi deger kaybetmesi, Brezilyali ureticileri daha fazla ihracata tesvik eder ve arz artisi fiyatlari dusurebilir." },
                { icon: "inventory_2", title: "Stok Seviyeleri", desc: "ICE sertifikali stoklarin azalmasi arz sikintisi sinyali verir. 2024-2026 doneminde stoklar tarihi dusuk seviyelere indi." },
                { icon: "bar_chart", title: "Spekulatif Pozisyonlar", desc: "COT (Commitment of Traders) raporunda spekulatorlerin net uzun veya kisa pozisyonlari fiyat yonunu gosterebilir." },
                { icon: "local_shipping", title: "Lojistik ve Navlun", desc: "Konteyner maliyetleri, liman tikanliklari ve nakliye suresi uretim ulkelerinden tuketim merkezlerine kahve akisini etkiler." },
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
              Onemli Terimler
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[10px] font-label uppercase tracking-widest text-secondary">
                    <th className="pb-3">Terim</th>
                    <th className="pb-3">Aciklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    ["Long Pozisyon", "Kontrat satin almak — fiyatin yukselecegine bahis"],
                    ["Short Pozisyon", "Kontrat satmak — fiyatin dusecegine bahis"],
                    ["Margin", "Kontrat acmak icin gereken teminat tutari"],
                    ["Settlement", "Kontrat vadesi geldiginde fiziksel teslimat veya nakit uzlasma"],
                    ["Spread", "Iki farkli vade arasindaki fiyat farki"],
                    ["Contango", "Ileri vadeli kontrat fiyatinin spot fiyattan yuksek olmasi"],
                    ["Backwardation", "Ileri vadeli kontrat fiyatinin spot fiyattan dusuk olmasi"],
                    ["Open Interest", "Acik pozisyon sayisi — piyasa derinliginin gostergesi"],
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
            <h3 className="font-headline text-2xl mb-3">Canli Fiyatlari Takip Edin</h3>
            <p className="text-sm text-on-primary-container mb-5">
              Arabica ve Robusta futures fiyatlarini canli olarak Fiyat Merkezi sayfamizdan izleyebilirsiniz.
            </p>
            <Link
              href="/fiyat-merkezi"
              className="inline-block bg-[#f4fafe] text-primary-container px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Fiyat Merkezine Git
            </Link>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
