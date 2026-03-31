import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Grafik Okuma Rehberi — Teknik Analiz Temelleri",
  description:
    "Emtia grafiği okuma rehberi: Candlestick, destek/direnç, trend çizgileri, hareketli ortalamalar. Kahve traderları için teknik analiz.",
  keywords: [
    "grafik okuma",
    "teknik analiz",
    "candlestick",
    "destek direnç",
    "hareketli ortalama",
    "emtia grafik",
    "kahve trading",
  ],
};

export default function GrafikOkuma() {
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

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            Grafik Okuma Rehberi
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Fiyat grafikleri, piyasa hareketlerini görsel olarak anlamamızı sağlar.
            Bu rehber, kahve emtia piyasasında kullanılan temel teknik analiz araçlarını kapsar.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              1. Candlestick (Mum) Grafikleri
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Candlestick grafikleri, belirli bir zaman dilimindeki açılış, kapanış, en yüksek ve en düşük fiyatları
              tek bir &ldquo;mum&rdquo; şeklinde gösterir. Japonya&apos;da 18. yüzyılda pirinç ticaretinde geliştirilmiştir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary editorial-shadow">
                <h4 className="font-bold text-tertiary mb-2">Yeşil / Boş Mum (Yükseliş)</h4>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  Kapanış fiyatı açılış fiyatından yüksektir. Alıcılar baskındadır.
                </p>
                <div className="text-xs text-secondary space-y-1">
                  <p>• Üst fitil = dönemde ulaşılan en yüksek fiyat</p>
                  <p>• Gövde üstü = kapanış fiyatı</p>
                  <p>• Gövde altı = açılış fiyatı</p>
                  <p>• Alt fitil = dönemde ulaşılan en düşük fiyat</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 border-l-4 border-error editorial-shadow">
                <h4 className="font-bold text-error mb-2">Kırmızı / Dolu Mum (Düşüş)</h4>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  Kapanış fiyatı açılış fiyatından düşüktür. Satıcılar baskındadır.
                </p>
                <div className="text-xs text-secondary space-y-1">
                  <p>• Üst fitil = dönemde ulaşılan en yüksek fiyat</p>
                  <p>• Gövde üstü = açılış fiyatı</p>
                  <p>• Gövde altı = kapanış fiyatı</p>
                  <p>• Alt fitil = dönemde ulaşılan en düşük fiyat</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 border-l-4 border-primary my-6">
              <h4 className="font-headline text-lg font-bold mb-3">Önemli Candlestick Formasyonları</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-bold mb-1">Doji</p>
                  <p className="text-secondary">Açılış ve kapanış neredeyse aynı. Kararsızlık sinyali. Trend dönüşü habercisi olabilir.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Hammer (Çekiç)</p>
                  <p className="text-secondary">Uzun alt fitil, küçük gövde. Düşüş trendinde görülürse dönüş sinyali.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Engulfing</p>
                  <p className="text-secondary">Bir mum önceki mumu tamamen kaplar. Güçlü trend dönüşü sinyali.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              2. Destek ve Direnç Seviyeleri
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Destek ve direnç, fiyatın tekrar tekrar test ettiği ve genellikle geri döndüğü yatay seviyelerdir.
              Bu seviyeler, arz ve talebin yoğunlaştığı bölgeleri temsil eder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-6 bg-surface-container-lowest editorial-shadow">
                <h4 className="font-bold text-primary mb-2">Destek (Support)</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Fiyatın düşmeyi durdurduğu ve alıcıların devreye girdiği seviye.
                  Örnek: Arabica KC1! için 280 cent/lb seviyesi güçlü bir destek olabilir — fiyat bu seviyeye
                  her düştüğünde alıcı gelir ve fiyat geri toparlanır.
                </p>
              </div>
              <div className="p-6 bg-surface-container-lowest editorial-shadow">
                <h4 className="font-bold text-primary mb-2">Direnç (Resistance)</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Fiyatın yükselmeyi durdurduğu ve satıcıların devreye girdiği seviye.
                  Örnek: 320 cent/lb seviyesini kıramayan Arabica fiyatı, bu seviyeyi her test ettiğinde
                  geri düşer — ta ki yeterli alım baskısı ile kırılana kadar.
                </p>
              </div>
            </div>

            <div className="bg-primary-container text-white p-6 my-6">
              <h4 className="font-headline text-lg font-bold mb-2">Kırılma (Breakout)</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Fiyat direnç seviyesini yukarı kırdığında, eski direnç yeni destek olur. Tersi de geçerlidir.
                Kırılmalar genellikle yüksek hacimle gerçekleşir ve güçlü trend hareketlerinin başlangıcı olabilir.
                Kahve piyasasında iklim olayları (don, kuraklık) genellikle direnç kırılmalarına neden olur.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              3. Trend Çizgileri
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Trend çizgileri, fiyat hareketinin genel yönünü belirlemek için kullanılır.
              Ardışık dip noktaları birleştirerek yükseliş trendi, ardışık tepe noktaları birleştirerek
              düşüş trendi çizgisi oluşturulur.
            </p>
            <div className="space-y-3 text-sm">
              {[
                { label: "Yükseliş Trendi (Uptrend)", desc: "Ardışık yükselen dipler ve yükselen tepeler. Her dip bir öncekinden yüksektir." },
                { label: "Düşüş Trendi (Downtrend)", desc: "Ardışık alçalan tepeler ve alçalan dipler. Her tepe bir öncekinden düşüktür." },
                { label: "Yatay (Sideways / Range)", desc: "Fiyat belirli bir aralıkta hareket eder. Ne alıcılar ne satıcılar baskındır." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary mt-0.5">show_chart</span>
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              4. Hareketli Ortalamalar (Moving Averages)
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Hareketli ortalamalar, fiyat verisinin belirlenen dönem içindeki ortalamasını alarak
              trendi düzleştiren göstergelerdir. Gürültüyü filtreler, ana trendi görmeyi kolaylaştırır.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[10px] font-label uppercase tracking-widest text-secondary">
                    <th className="pb-3">Gösterge</th>
                    <th className="pb-3">Dönem</th>
                    <th className="pb-3">Kullanım</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr><td className="py-3 font-bold">SMA 20</td><td className="py-3">20 gün</td><td className="py-3 text-secondary">Kısa vadeli trend. Scalping ve günlük işlemler.</td></tr>
                  <tr><td className="py-3 font-bold">SMA 50</td><td className="py-3">50 gün</td><td className="py-3 text-secondary">Orta vadeli trend. Swing trading için ideal.</td></tr>
                  <tr><td className="py-3 font-bold">SMA 200</td><td className="py-3">200 gün</td><td className="py-3 text-secondary">Uzun vadeli trend. Kurumsal yatırımcılar takip eder.</td></tr>
                  <tr><td className="py-3 font-bold">Golden Cross</td><td className="py-3">50/200</td><td className="py-3 text-tertiary">SMA 50, SMA 200&apos;ü yukarı keserse — güçlü alış sinyali.</td></tr>
                  <tr><td className="py-3 font-bold">Death Cross</td><td className="py-3">50/200</td><td className="py-3 text-error">SMA 50, SMA 200&apos;ü aşağı keserse — güçlü satış sinyali.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              5. Hacim (Volume)
            </h2>
            <p className="text-base text-on-surface leading-relaxed">
              Hacim, belirli bir dönemde işlem gören kontrat sayısıdır. Fiyat hareketinin &ldquo;gücünü&rdquo; ölçer.
              Yüksek hacimle gelen fiyat hareketi daha güvenilirdir. Düşük hacimde gelen hareket &ldquo;tuzak&rdquo; olabilir.
              Kahve piyasasında özellikle CFTC COT raporları, spekülatif pozisyonların yönünü göstererek
              hacim analizini destekler.
            </p>
          </section>
        </article>
        <Footer />
      </div>
    </>
  );
}
