import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve İşleme Yöntemleri — Washed, Natural, Honey",
  description:
    "Kahve işleme yöntemleri rehberi: Yıkamalı (Washed), Doğal (Natural), Honey, Anaerobik fermantasyon. Her yöntemin lezzet profiline etkisi.",
  keywords: [
    "kahve işleme yöntemi",
    "washed process",
    "natural process",
    "honey process",
    "anaerobik fermantasyon",
    "kahve işleme",
    "coffee processing",
  ],
};

const methods = [
  {
    name: "Yıkamalı (Washed / Wet Process)",
    color: "border-tertiary",
    steps: [
      "Hasat edilen kiraz soyulur (depulping)",
      "Müsilaj tabakası fermantasyon tanklarında 12-72 saat bekletilerek ayrıştırılır",
      "Temiz suyla yıkanır",
      "Güneş altında veya mekanik kurutucuda %11-12 neme kadar kurutulur",
    ],
    flavor: "Temiz fincan, parlak asidite, çiçeksi/meyvemsi notalar. Terroir (toprak/iklim) etkisi ön plandadır.",
    regions: "Kolombiya, Kenya, Etiyopya (Yirgacheffe), Orta Amerika",
    pros: "Tutarlı kalite, temiz lezzet profili, kalite kontrol kolaylığı",
    cons: "Yüksek su tüketimi (işlem başına ~15-20 litre), çevresel etki, yüksek maliyet",
  },
  {
    name: "Doğal (Natural / Dry Process)",
    color: "border-primary",
    steps: [
      "Kirazlar olgunlaşınca daldan toplanır",
      "Kiraz bütün haliyle (kabuk + meyve eti ile birlikte) kurutma yatağına serilir",
      "2-4 hafta boyunca güneş altında düzenli çevrilerek kurutulur",
      "Kuruyan kabuk mekanik olarak soyulur (hulling)",
    ],
    flavor: "Yoğun gövde, düşük asidite, çilek/yabanmersini/tropik meyve tatlılığı, şarapsı/fermente notalar.",
    regions: "Etiyopya (Sidamo, Guji), Brezilya, Yemen",
    pros: "Düşük su tüketimi, çevre dostu, benzersiz tatlılık ve meyve karakteri",
    cons: "Fermantasyon riski, tutarsız kalite, mantar/küf tehlikesi, işçilik yoğun",
  },
  {
    name: "Honey (Bal) Process",
    color: "border-on-tertiary-container",
    steps: [
      "Kiraz soyulur (depulping) ancak müsilaj tabakası bırakılır",
      "Bırakılan müsilaj miktarına göre sınıflandırılır: Yellow, Red, Black Honey",
      "Müsilaj üzerinde kurutulur — yapışkan (bal gibi) bir doku oluşur",
      "%11-12 neme ulaşınca kabuk soyulur",
    ],
    flavor: "Washed ve Natural arasında bir yerde. Tatlı, gövdeli, orta asidite. Karamel/bal notları.",
    regions: "Kosta Rika, El Salvador, Brezilya",
    pros: "Daha az su kullanımı, benzersiz tatlılık, farklılaştırma fırsatı",
    cons: "İşçilik yoğun, iklim bağımlı, kurutma süreci hassas",
  },
  {
    name: "Anaerobik Fermantasyon",
    color: "border-error",
    steps: [
      "Kirazlar veya soyulmuş çekirdekler hava geçirmez tanklara yerleştirilir",
      "Oksijensiz ortamda kontrollü fermantasyon (24-120+ saat)",
      "Sıcaklık, pH ve fermantasyon süresi hassas olarak izlenir",
      "Fermantasyon sonrası yıkama veya doğal kurutma uygulanır",
    ],
    flavor: "Egzotik, yoğun, tropik meyve, şarap/bira benzeri kompleks notalar. Bazen turşu/sirke asiditeleri.",
    regions: "Kolombiya, Kosta Rika, Brezilya (specialty segment)",
    pros: "Son derece benzersiz ve değerli fincan profilleri, yarışma kahveleri",
    cons: "Çok yüksek risk, uzmanlık gerektirir, tutarsızlık potansiyeli, yüksek maliyet",
  },
];

export default function IslemeYontemleri() {
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
            Kahve İşleme Yöntemleri
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Kahve çekirdeğinin lezzet profilini belirleyen en önemli faktörlerden biri hasat sonrası
            işleme yöntemidir. Aynı çiftlikten, aynı çeşit çekirdek farklı yöntemlerle işlenerek
            tamamen farklı lezzet profilleri oluşturabilir.
          </p>

          {methods.map((method, i) => (
            <section key={i} className={`mb-10 bg-surface-container-lowest p-6 md:p-8 editorial-shadow border-l-4 ${method.color}`}>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-6">
                {method.name}
              </h2>

              <h3 className="font-bold text-sm uppercase tracking-widest text-secondary mb-3">İşlem Adımları</h3>
              <ol className="list-decimal list-inside space-y-2 mb-6 text-sm text-on-surface leading-relaxed">
                {method.steps.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Lezzet Profili</h4>
                  <p className="text-sm text-on-surface leading-relaxed">{method.flavor}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Yaygın Bölgeler</h4>
                  <p className="text-sm text-on-surface leading-relaxed">{method.regions}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Avantajlar</h4>
                  <p className="text-sm text-tertiary leading-relaxed">{method.pros}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Zorluklar</h4>
                  <p className="text-sm text-error leading-relaxed">{method.cons}</p>
                </div>
              </div>
            </section>
          ))}
        </article>
        <Footer />
      </div>
    </>
  );
}
