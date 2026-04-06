import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Terimler Sözlüğü",
  description:
    "Kahve ticareti ve üretiminde kullanılan 30+ terimin açıklaması. Arabica, Robusta, futures, hedging, cupping, SCA, diferansiyel ve daha fazlası.",
  keywords: [
    "kahve sözlük",
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
  { term: "Arabica", def: "Coffea arabica türüne ait kahve. Dünya üretiminin %60-70'ini oluşturur. Yüksek irtifada yetişir, kompleks lezzet profiline sahiptir. Daha az kafein (%1.2-1.5) içerir." },
  { term: "Backwardation", def: "Vadeli kontrat fiyatının spot fiyattan düşük olması durumu. Arz sıkıntısı veya güçlü anlık talep işareti." },
  { term: "Blend", def: "Birden fazla menşei veya çeşitten karıştırılan kahve. Tutarlı lezzet profili oluşturmak için kullanılır." },
  { term: "C-Market (C-Piyasası)", def: "ICE New York'ta işlem gören Arabica kahve vadeli işlem kontratı (Coffee C Futures). Küresel Arabica fiyatlarının referans noktası." },
  { term: "Cupping", def: "Kahve kalitesini değerlendirmek için standartlaştırılmış tadım yöntemi. SCA protokolüne göre yapılır: koku, tat, asidite, gövde, denge puanları verilir." },
  { term: "Cherry (Kiraz)", def: "Kahve bitkisinin meyvesi. İçi genellikle iki çekirdek (fasulye) içerir. Peaberry'de tek çekirdek bulunur." },
  { term: "CIF", def: "Cost, Insurance and Freight. Satıcı navlun ve sigorta dahil fiyat verir. Emtia ticaretinde yaygın kullanılan Incoterm." },
  { term: "COT Raporu", def: "Commitment of Traders. CFTC tarafından haftalık yayınlanan rapor. Spekülatif ve ticari pozisyonları gösterir." },
  { term: "Contango", def: "Vadeli kontrat fiyatının spot fiyattan yüksek olması. Normal piyasa koşullarında depolama ve finansman maliyetini yansıtır." },
  { term: "Çuval (Bag)", def: "Kahve ölçü birimi. Standart çuval: Arabica 60 kg, Robusta (Vietnam) 60 kg. Brezilya'da bazen 69 kg çuval kullanılır." },
  { term: "Defekt", def: "Yeşil kahve çekirdeğindeki kusurlar. Böcek hasarı, küf, kırık, fermente çekirdek gibi. SCA derecelendirmesinde defekt sayısı kaliteyi belirler." },
  { term: "Diferansiyel", def: "C-Piyasası fiyatına göre uygulanan prim (+) veya indirim (-). Menşei, kalite, sertifika durumuna göre belirlenir. Örnek: Kolombiya Supremo +15 cent/lb." },
  { term: "Elek Boyutu (Screen Size)", def: "Çekirdek büyüklüğü ölçüsü. 1/64 inç cinsinden ifade edilir. Örnek: S18 = 18/64 inç. Büyük çekirdek genellikle daha yüksek fiyat alır." },
  { term: "FOB", def: "Free on Board. Satıcı malı gemiye yükler, bundan sonraki tüm masraf ve risk alıcıya aittir. Kahve ticaretinde en yaygın kullanılan Incoterm." },
  { term: "Futures (Vadeli İşlem)", def: "Belirli bir emtianın önceden belirlenmiş fiyat ve tarihte teslimini içeren standart sözleşme. ICE borsasında işlem görür." },
  { term: "Green Coffee (Yeşil Kahve)", def: "Kavurulmamış kahve çekirdeği. Uluslararası ticarette kahve yeşil haliyle satılır. Doğru depolandığında 12 aya kadar kalitesini korur." },
  { term: "Hedging", def: "Fiyat riskinden korunma stratejisi. Üretici veya alıcı, futures piyasasında ters pozisyon alarak fiziksel kahve işleminin riskini dengeler." },
  { term: "Honey Process", def: "Kahve işleme yöntemi. Kiraz soyulur ancak müsilaj tabakası bırakılarak kurutulur. Washed ve Natural arasında bir lezzet profili oluşturur." },
  { term: "ICE", def: "Intercontinental Exchange. Kahve futures kontratlarının işlem gördüğü borsa. New York (Arabica) ve London (Robusta) seksiyonları var." },
  { term: "ICO", def: "International Coffee Organization. Uluslararası Kahve Örgütü. Üretici ve tüketici ülkelerin üye olduğu hükümetlerarası kurum." },
  { term: "Lot", def: "Borsa kontrat birimi. Arabica: 1 lot = 37.500 libre (yaklaşık 17 ton). Robusta: 1 lot = 10 ton." },
  { term: "Margin (Teminat)", def: "Futures kontratı açmak için yatırılan depozito. Kontrat değerinin %5-15'i arasında değişir." },
  { term: "Natural Process", def: "Kahve işleme yöntemi. Kiraz bütün haliyle güneş altında kurutulur. Yoğun meyve tatlılığı ve güçlü gövde oluşturur." },
  { term: "Parchment (Pergamen)", def: "Kahve çekirdeğini saran ince zar. Yıkama işlemi sonrası çekirdek pergamen içinde kurutulur. Son aşamada soyulur (hulling)." },
  { term: "Peaberry", def: "Kiraz içinde tek çekirdek oluşumu (normal: 2 çekirdek). Daha yoğun lezzet profiline sahip olduğu kabul edilir. Toplam hasadın %5-10'u." },
  { term: "Q-Grader", def: "Coffee Quality Institute (CQI) tarafından sertifikalandırılmış profesyonel kahve değerlendirmecisi. Arabica için Q Arabica, Robusta için Q Robusta lisansları var." },
  { term: "Robusta", def: "Coffea canephora türüne ait kahve. Düşük irtifada yetişir, daha fazla kafein içerir (%2.2-2.7). Instant kahve ve espresso harmanlarında yaygın kullanılır." },
  { term: "SCA Skoru", def: "Specialty Coffee Association derecelendirme sistemi. 100 üzerinden puanlama. 80+ puan: specialty kahve. 85+: excellent. 90+: outstanding." },
  { term: "Silverskin (Gümüş Deri)", def: "Kahve çekirdeğini saran en ince zar. Kavurma sırasında ayrışır ve 'chaff' (kepek) olarak uçuşur." },
  { term: "Specialty Coffee", def: "SCA standartlarına göre 80+ puan alan kahve. İzlenebilir kaynak, minimal defekt, ayırt edici lezzet profili." },
  { term: "Spot Fiyat", def: "Emtianın anında teslim edileceği fiyat. Futures fiyatından farklı olabilir (contango veya backwardation)." },
  { term: "Spread", def: "İki farklı futures kontrat vadesi arasındaki fiyat farkı. Piyasa koşullarını ve beklentileri yansıtır." },
  { term: "Washed Process", def: "Kahve işleme yöntemi. Kiraz soyulur, fermantasyonla müsilaj ayrıştırılır, suyla yıkanır. Temiz, asidik, terroir-odaklı fincan profili." },
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
            Kahve Terimler Sözlüğü
          </h1>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            Kahve ticareti, üretimi ve değerlendirmesinde kullanılan {terms.length} temel terimin kapsamlı açıklaması.
          </p>

          <p className="text-xs font-label uppercase tracking-widest text-secondary mb-6">
            {terms.length} terim &bull; A&apos;dan Z&apos;ye sıralanmış
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
