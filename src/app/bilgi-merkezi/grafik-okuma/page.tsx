import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Grafik Okuma Rehberi — Teknik Analiz Temelleri",
  description:
    "Emtia grafigi okuma rehberi: Candlestick, destek/direnc, trend cizgileri, hareketli ortalamalar. Kahve traderalari icin teknik analiz.",
  keywords: [
    "grafik okuma",
    "teknik analiz",
    "candlestick",
    "destek direnc",
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
            Fiyat grafikleri, piyasa hareketlerini gorsel olarak anlamamizi saglar.
            Bu rehber, kahve emtia piyasasinda kullanilan temel teknik analiz araclarini kapsar.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              1. Candlestick (Mum) Grafikleri
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Candlestick grafikleri, belirli bir zaman dilimindeki acilis, kapanis, en yuksek ve en dusuk fiyatlari
              tek bir &ldquo;mum&rdquo; seklinde gosterir. Japonya&apos;da 18. yuzyilda pirinc ticaretinde gelistirilmistir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary editorial-shadow">
                <h4 className="font-bold text-tertiary mb-2">Yesil / Bos Mum (Yukselis)</h4>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  Kapanis fiyati acilis fiyatindan yuksektir. Alicilar baskindedir.
                </p>
                <div className="text-xs text-secondary space-y-1">
                  <p>• Ust fitil = donemde ulasilan en yuksek fiyat</p>
                  <p>• Govde ustu = kapanis fiyati</p>
                  <p>• Govde alti = acilis fiyati</p>
                  <p>• Alt fitil = donemde ulasilan en dusuk fiyat</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 border-l-4 border-error editorial-shadow">
                <h4 className="font-bold text-error mb-2">Kirmizi / Dolu Mum (Dusus)</h4>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  Kapanis fiyati acilis fiyatindan dusuktur. Saticilar baskindedir.
                </p>
                <div className="text-xs text-secondary space-y-1">
                  <p>• Ust fitil = donemde ulasilan en yuksek fiyat</p>
                  <p>• Govde ustu = acilis fiyati</p>
                  <p>• Govde alti = kapanis fiyati</p>
                  <p>• Alt fitil = donemde ulasilan en dusuk fiyat</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 border-l-4 border-primary my-6">
              <h4 className="font-headline text-lg font-bold mb-3">Onemli Candlestick Formasyonlari</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-bold mb-1">Doji</p>
                  <p className="text-secondary">Acilis ve kapanis neredeyse ayni. Kararsizlik sinyali. Trend donusu habercisi olabilir.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Hammer (Cekic)</p>
                  <p className="text-secondary">Uzun alt fitil, kucuk govde. Dusus trendinde gorulurse donus sinyali.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Engulfing</p>
                  <p className="text-secondary">Bir mum onceki mumu tamamen kaplar. Guclu trend donusu sinyali.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              2. Destek ve Direnc Seviyeleri
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Destek ve direnc, fiyatin tekrar tekrar test ettigi ve genellikle geri dondugu yatay seviyelerdir.
              Bu seviyeler, arz ve talebin yogunlastigi bolgeleri temsil eder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-6 bg-surface-container-lowest editorial-shadow">
                <h4 className="font-bold text-primary mb-2">Destek (Support)</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Fiyatin dusmeyi durdugu ve alicilarin devreye girdigi seviye.
                  Ornek: Arabica KC1! icin 280 cent/lb seviyesi guclu bir destek olabilir — fiyat bu seviyeye
                  her dustugunde alici gelir ve fiyat geri toparlanir.
                </p>
              </div>
              <div className="p-6 bg-surface-container-lowest editorial-shadow">
                <h4 className="font-bold text-primary mb-2">Direnc (Resistance)</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Fiyatin yukselmeyi durdugu ve saticilarin devreye girdigi seviye.
                  Ornek: 320 cent/lb seviyesini kiramayan Arabica fiyati, bu seviyeyi her test ettiginde
                  geri duser — ta ki yeterli alim baskisi ile kirilana kadar.
                </p>
              </div>
            </div>

            <div className="bg-primary-container text-white p-6 my-6">
              <h4 className="font-headline text-lg font-bold mb-2">Kirilma (Breakout)</h4>
              <p className="text-sm text-on-primary-container leading-relaxed">
                Fiyat direnc seviyesini yukari kirdiginda, eski direnc yeni destek olur. Tersi de gecerlidir.
                Kirilmalar genellikle yuksek hacimle gerceklesir ve guclu trend hareketlerinin baslangici olabilir.
                Kahve piyasasinda iklim olaylari (don, kuraklik) genellikle direnc kirilmalarina neden olur.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              3. Trend Cizgileri
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Trend cizgileri, fiyat hareketinin genel yonunu belirlemek icin kullanilir.
              Ardisik dip noktalari birlestirerek yukselis trendi, ardisik tepe noktalari birlestirerek
              dusus trendi cizgisi olusturulur.
            </p>
            <div className="space-y-3 text-sm">
              {[
                { label: "Yukselis Trendi (Uptrend)", desc: "Ardisik yukselen dipler ve yukselen tepeler. Her dip bir oncekinden yuksektir." },
                { label: "Dusus Trendi (Downtrend)", desc: "Ardisik alcalan tepeler ve alcalan dipler. Her tepe bir oncekinden dusuktur." },
                { label: "Yatay (Sideways / Range)", desc: "Fiyat belirli bir aralikta hareket eder. Ne alicilar ne saticilar baskindir." },
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
              Hareketli ortalamalar, fiyat verisinin belirlenen donem icindeki ortalamasini alarak
              trendi duzlestiren gostergelerdir. Gurultuyu filtreler, ana trendi gormeyi kolaylastirir.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[10px] font-label uppercase tracking-widest text-secondary">
                    <th className="pb-3">Gosterge</th>
                    <th className="pb-3">Donem</th>
                    <th className="pb-3">Kullanim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr><td className="py-3 font-bold">SMA 20</td><td className="py-3">20 gun</td><td className="py-3 text-secondary">Kisa vadeli trend. Scalping ve gunluk islemler.</td></tr>
                  <tr><td className="py-3 font-bold">SMA 50</td><td className="py-3">50 gun</td><td className="py-3 text-secondary">Orta vadeli trend. Swing trading icin ideal.</td></tr>
                  <tr><td className="py-3 font-bold">SMA 200</td><td className="py-3">200 gun</td><td className="py-3 text-secondary">Uzun vadeli trend. Kurumsal yatirimcilar takip eder.</td></tr>
                  <tr><td className="py-3 font-bold">Golden Cross</td><td className="py-3">50/200</td><td className="py-3 text-tertiary">SMA 50, SMA 200'u yukari keserse — guclu alis sinyali.</td></tr>
                  <tr><td className="py-3 font-bold">Death Cross</td><td className="py-3">50/200</td><td className="py-3 text-error">SMA 50, SMA 200'u asagi keserse — guclu satis sinyali.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              5. Hacim (Volume)
            </h2>
            <p className="text-base text-on-surface leading-relaxed">
              Hacim, belirli bir donemde islem goren kontrat sayisidir. Fiyat hareketinin &ldquo;gucunu&rdquo; olcer.
              Yuksek hacimle gelen fiyat hareketi daha guvenilirdir. Dusuk hacimde gelen hareket &ldquo;tuzak&rdquo; olabilir.
              Kahve piyasasinda ozellikle CFTC COT raporlari, spekulatif pozisyonlarin yonunu gostererek
              hacim analizini destekler.
            </p>
          </section>
        </article>
        <Footer />
      </div>
    </>
  );
}
