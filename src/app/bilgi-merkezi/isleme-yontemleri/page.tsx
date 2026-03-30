import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Isleme Yontemleri — Washed, Natural, Honey",
  description:
    "Kahve isleme yontemleri rehberi: Yikamali (Washed), Dogal (Natural), Honey, Anaerobik fermantasyon. Her yontemin lezzet profiline etkisi.",
  keywords: [
    "kahve isleme yontemi",
    "washed process",
    "natural process",
    "honey process",
    "anaerobik fermantasyon",
    "kahve isleme",
    "coffee processing",
  ],
};

const methods = [
  {
    name: "Yikamali (Washed / Wet Process)",
    color: "border-tertiary",
    steps: [
      "Hasat edilen kiraz soyulur (depulping)",
      "Musilaj tabakasi fermantasyon tanklarinda 12-72 saat bekletilerek ayristirilir",
      "Temiz suyla yikanir",
      "Gunes altinda veya mekanik kurutucuda %11-12 neme kadar kurutulur",
    ],
    flavor: "Temiz fincan, parlak asidite, ciceksi/meyvemsi notalar. Terroir (toprak/iklim) etkisi on plandadir.",
    regions: "Kolombiya, Kenya, Etiyopya (Yirgacheffe), Orta Amerika",
    pros: "Tutarli kalite, temiz lezzet profili, kalite kontrol kolayligi",
    cons: "Yuksek su tuketimi (islem basina ~15-20 litre), cevresel etki, yuksek maliyet",
  },
  {
    name: "Dogal (Natural / Dry Process)",
    color: "border-primary",
    steps: [
      "Kirazlar olgunlasinca daldan toplanir",
      "Kiraz butun haliyle (kabuk + meyve eti ile birlikte) kurutma yataginina serilir",
      "2-4 hafta boyunca gunes altinda duzenli cevrilerek kurutulur",
      "Kuruyan kabuk mekanik olarak soyulur (hulling)",
    ],
    flavor: "Yogun govde, dusuk asidite, cilek/yabanmersini/tropik meyve tatliligi, sarapsi/fermente notalar.",
    regions: "Etiyopya (Sidamo, Guji), Brezilya, Yemen",
    pros: "Dusuk su tuketimi, cevre dostu, benzersiz tatlilik ve meyve karakteri",
    cons: "Fermantasyon riski, tutarsiz kalite, mantar/kuf tehlikesi, iscilik yogun",
  },
  {
    name: "Honey (Bal) Process",
    color: "border-on-tertiary-container",
    steps: [
      "Kiraz soyulur (depulping) ancak musilaj tabakasi birakilir",
      "Birakilan musilaj miktarina gore siniflandirilir: Yellow, Red, Black Honey",
      "Musilaj uzerinde kurutulur — yapiskan (bal gibi) bir doku olusur",
      "%11-12 neme ulasinca kabuk soyulur",
    ],
    flavor: "Washed ve Natural arasinda bir yerde. Tatli, govdeli, orta asidite. Karamel/bal notlari.",
    regions: "Kosta Rika, El Salvador, Brezilya",
    pros: "Daha az su kullanimi, benzersiz tatlilik, farklilastirma firsati",
    cons: "Iscilik yogun, iklim bagimli, kurutma sureci hassas",
  },
  {
    name: "Anaerobik Fermantasyon",
    color: "border-error",
    steps: [
      "Kirazlar veya soyulmus cekirdekler hava gecirmez tanklara yerlestirilir",
      "Oksijensiz ortamda kontollu fermantasyon (24-120+ saat)",
      "Sicaklik, pH ve fermantasyon suresi hassas olarak izlenir",
      "Fermantasyon sonrasi yikama veya dogal kurutma uygulanir",
    ],
    flavor: "Egzotik, yogun, tropik meyve, sarap/bira benzeri kompleks notalar. Bazen tursu/sirke asiditeleri.",
    regions: "Kolombiya, Kosta Rika, Brezilya (specialty segment)",
    pros: "Son derece benzersiz ve degerli fincan profilleri, yarisma kahveleri",
    cons: "Cok yuksek risk, uzmanlik gerektirir, tutarsizlik potansiyeli, yuksek maliyet",
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
            Kahve Isleme Yontemleri
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Kahve cekirdeginin lezzet profilini belirleyen en onemli faktorlerden biri hasat sonrasi
            isleme yontemidir. Ayni ciftlikten, ayni cesit cekirdek farkli yontemlerle islenerek
            tamamen farkli lezzet profilleri olusturabilir.
          </p>

          {methods.map((method, i) => (
            <section key={i} className={`mb-10 bg-surface-container-lowest p-6 md:p-8 editorial-shadow border-l-4 ${method.color}`}>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-6">
                {method.name}
              </h2>

              <h3 className="font-bold text-sm uppercase tracking-widest text-secondary mb-3">Islem Adimlari</h3>
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
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Yaygin Bolgeler</h4>
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
