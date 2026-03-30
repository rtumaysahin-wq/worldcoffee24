import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Terimler Sozlugu — A'dan Z'ye Sektor Terimleri",
  description:
    "Kahve ticareti ve uretiminde kullanilan 30+ terimin aciklamasi. Arabica, Robusta, futures, hedging, cupping, SCA, diferansiyel ve daha fazlasi.",
  keywords: [
    "kahve sozluk",
    "kahve terimleri",
    "coffee glossary",
    "arabica nedir",
    "cupping nedir",
    "hedging nedir",
    "SCA skoru",
    "diferansiyel kahve",
  ],
};

const terms = [
  { term: "Arabica", def: "Coffea arabica turune ait kahve. Dunya uretiminin %60-70'ini olusturur. Yuksek irtifada yetisir, kompleks lezzet profiline sahiptir. Daha az kafeyin (%1.2-1.5) icerir." },
  { term: "Backwardation", def: "Vadeli kontrat fiyatinin spot fiyattan dusuk olmasi durumu. Arz sikintisi veya guclu anlık talep isareti." },
  { term: "Blend", def: "Birden fazla mensei veya cesitten karistirilan kahve. Tutarli lezzet profili olusturmak icin kullanilir." },
  { term: "C-Market (C-Piyasasi)", def: "ICE New York'ta islem goren Arabica kahve vadeli islem kontrati (Coffee C Futures). Kuresel Arabica fiyatlarinin referans noktasi." },
  { term: "Capping (Cupping)", def: "Kahve kalitesini degerlendirmek icin standartlastirilmis tadim yontemi. SCA protokolune gore yapilir: koku, tat, asidite, govde, denge puanlari verilir." },
  { term: "Cherry (Kiraz)", def: "Kahve bitkisinin meyvesi. Ici genellikle iki cekirdek (fasulye) icerir. Peaberry'de tek cekirdek bulunur." },
  { term: "CIF", def: "Cost, Insurance and Freight. Satici navlun ve sigorta dahil fiyat verir. Emtia ticaretinde yaygin kullanilan Incoterm." },
  { term: "COT Raporu", def: "Commitment of Traders. CFTC tarafindan haftalik yayinlanan rapor. Spekulatif ve ticari pozisyonlari gosterir." },
  { term: "Contango", def: "Vadeli kontrat fiyatinin spot fiyattan yuksek olmasi. Normal piyasa kosullarinda depolama ve finansman maliyetini yansitir." },
  { term: "Cuval (Bag)", def: "Kahve olcu birimi. Standart cuval: Arabica 60 kg, Robusta (Vietnam) 60 kg. Brezilya'da bazen 69 kg cuval kullanilir." },
  { term: "Defekt", def: "Yesil kahve cekirdegindeki kusurlar. Bocek hasari, kuf, kirik, fermente cekirdek gibi. SCA derecelendirmesinde defekt sayisi kaliteyi belirler." },
  { term: "Diferansiyel", def: "C-Piyasasi fiyatina gore uygulanan prim (+) veya indirim (-). Mensei, kalite, sertifika durumuna gore belirlenir. Ornek: Kolombiya Supremo +15 cent/lb." },
  { term: "Elek Boyutu (Screen Size)", def: "Cekirdek buyuklugu olcusu. 1/64 inc cinsinden ifade edilir. Ornek: S18 = 18/64 inc. Buyuk cekirdek genellikle daha yuksek fiyat alir." },
  { term: "FOB", def: "Free on Board. Satici malı gemiye yukler, bundan sonraki tum masraf ve risk aliciya aittir. Kahve ticaretinde en yaygin kullanilan Incoterm." },
  { term: "Futures (Vadeli Islem)", def: "Belirli bir emtianin onceden belirlenmis fiyat ve tarihte teslimini iceren standart sozlesme. ICE borsasinda islem gorur." },
  { term: "Green Coffee (Yesil Kahve)", def: "Kavurulmamis kahve cekirdegi. Uluslararasi ticarette kahve yesil haliyle satilir. Dogru depolandığında 12 aya kadar kalitesini korur." },
  { term: "Hedging", def: "Fiyat riskinden korunma stratejisi. Uretici veya alici, futures piyasasinda ters pozisyon alarak fiziksel kahve isleminin riskini dengeler." },
  { term: "Honey Process", def: "Kahve isleme yontemi. Kiraz soyulur ancak musilaj tabakasi birakilarak kurutulur. Washed ve Natural arasinda bir lezzet profili olusturur." },
  { term: "ICE", def: "Intercontinental Exchange. Kahve futures kontratlarinin islem gordugu borsa. New York (Arabica) ve London (Robusta) seksiyonlari var." },
  { term: "ICO", def: "International Coffee Organization. Uluslararasi Kahve Orgutu. Uretici ve tuketici ulkelerin uye oldugu hukumetlerarasi kurum." },
  { term: "Lot", def: "Borsa kontrat birimi. Arabica: 1 lot = 37.500 libre (yaklasik 17 ton). Robusta: 1 lot = 10 ton." },
  { term: "Margin (Teminat)", def: "Futures kontrati acmak icin yatirilan depozito. Kontrat degerinin %5-15'i arasinda degisir." },
  { term: "Natural Process", def: "Kahve isleme yontemi. Kiraz butun haliyle gunes altinda kurutulur. Yogun meyve tatliligi ve guclu govde olusturur." },
  { term: "Parchment (Pergamen)", def: "Kahve cekirdegini saran ince zar. Yikama islemi sonrasi cekirdek pergamen icinde kurutulur. Son asamada soyulur (hulling)." },
  { term: "Peaberry", def: "Kiraz icinde tek cekirdek olusumu (normal: 2 cekirdek). Daha yogun lezzet profiline sahip oldugu kabul edilir. Toplam hasadin %5-10'u." },
  { term: "Q-Grader", def: "Coffee Quality Institute (CQI) tarafindan sertifikalandirilmis profesyonel kahve degerlendirmecisi. Arabica icin Q Arabica, Robusta icin Q Robusta lisanslari var." },
  { term: "Robusta", def: "Coffea canephora turune ait kahve. Dusuk irtifada yetisir, daha fazla kafein icerir (%2.2-2.7). Instant kahve ve espresso harmanlarinda yaygin kullanilir." },
  { term: "SCA Skoru", def: "Specialty Coffee Association derecelendirme sistemi. 100 uzerinden puanlama. 80+ puan: specialty kahve. 85+: excellent. 90+: outstanding." },
  { term: "Silverskin (Gumus Deri)", def: "Kahve cekirdegini saran en ince zar. Kavurma sirasinda ayrisir ve 'chaff' (kepek) olarak ucusar." },
  { term: "Specialty Coffee", def: "SCA standartlarina gore 80+ puan alan kahve. Izlenebilir kaynak, minimal defekt, ayirt edici lezzet profili." },
  { term: "Spot Fiyat", def: "Emtianin aninda teslim edilecegi fiyat. Futures fiyatindan farkli olabilir (contango veya backwardation)." },
  { term: "Spread", def: "Iki farkli futures kontrat vadesi arasindaki fiyat farki. Piyasa kosullarini ve beklentileri yansitir." },
  { term: "Washed Process", def: "Kahve isleme yontemi. Kiraz soyulur, fermantasyonla musilaj ayristirilir, suyla yikanir. Temiz, asidik, terroir-odakli fincan profili." },
];

export default function TerimlerSozlugu() {
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

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
            Kahve Terimler Sozlugu
          </h1>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            Kahve ticareti, uretimi ve degerlendirmesinde kullanilan {terms.length} temel terimin kapsamli aciklamasi.
          </p>

          <p className="text-xs font-label uppercase tracking-widest text-secondary mb-6">
            {terms.length} terim &bull; A&apos;dan Z&apos;ye siralanmis
          </p>

          <div className="divide-y divide-outline-variant/15">
            {terms.map((item, i) => (
              <div key={i} className="py-5 hover:bg-surface-container-low/50 px-4 -mx-4 transition-colors">
                <h3 className="font-headline text-lg font-bold text-primary mb-1">
                  {item.term}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
