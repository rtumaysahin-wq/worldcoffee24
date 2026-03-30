import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Kusagi & Cografya — Uretim Ulkeleri Rehberi",
  description:
    "Dunya kahve kusagi haritasi, baslica uretim ulkeleri, iklim kosullari ve bolgesel lezzet profilleri. Brezilya, Kolombiya, Etiyopya, Vietnam.",
  keywords: [
    "kahve kusagi",
    "coffee belt",
    "kahve uretim ulkeleri",
    "arabica bolgeler",
    "robusta bolgeler",
    "brezilya kahve",
    "etiyopya kahve",
    "vietnam kahve",
  ],
};

const regions = [
  {
    name: "Brezilya",
    role: "Dunyanin 1 numarali ureticisi",
    production: "~55M cuval/yil",
    type: "Arabica & Robusta",
    regions: "Minas Gerais, Sao Paulo, Espirito Santo, Bahia",
    altitude: "600-1.400m",
    flavor: "Cikolatamsi, findiksi, dusuk asidite, genis govdeli",
    notes: "Dunya uretiminin yaklasik %35'ini saglar. Cift yillik uretim dongusu (on/off year) fiyatlari dogrudan etkiler.",
  },
  {
    name: "Kolombiya",
    role: "Specialty Arabica lideri",
    production: "~12M cuval/yil",
    type: "Sadece Arabica",
    regions: "Huila, Narino, Antioquia, Tolima",
    altitude: "1.200-2.000m",
    flavor: "Parlak asidite, karamel tatlilik, meyve notalar",
    notes: "Yilda iki hasat (ana hasat + mitaca). Yuksek irtifa ve vulkanik toprak specialty kaliteyi destekler.",
  },
  {
    name: "Etiyopya",
    role: "Kahvenin anavatani",
    production: "~7.5M cuval/yil",
    type: "Sadece Arabica",
    regions: "Yirgacheffe, Sidamo, Guji, Harrar",
    altitude: "1.500-2.200m",
    flavor: "Ciceksi, narenciye, yaban mersini, cay benzeri",
    notes: "Dunya uzerindeki en buyuk genetik cesitlilik. Binlerce yabani cesit. Kahve kulturunun kokeni.",
  },
  {
    name: "Vietnam",
    role: "Dunyanin 1 numarali Robusta ureticisi",
    production: "~30M cuval/yil",
    type: "Cogunlukla Robusta",
    regions: "Dak Lak, Lam Dong, Gia Lai (Orta Yaylalar)",
    altitude: "400-800m",
    flavor: "Guclu, aci, ahsumsu, dusuk asidite",
    notes: "Instant kahve endustrisinin temel hammadde kaynagi. Son yillarda Arabica uretimi de artiyor.",
  },
  {
    name: "Endonezya",
    role: "Cesitlilik ulkesi",
    production: "~10M cuval/yil",
    type: "Robusta & Arabica",
    regions: "Sumatra, Java, Sulawesi, Bali",
    altitude: "800-1.500m (Arabica), 200-800m (Robusta)",
    flavor: "Topraksi, baharatli, dusuk asidite, agir govde",
    notes: "Giling basah (wet-hulling) isleme yontemi benzersiz lezzet profili olusturur. Kopi Luwak'in anavatani.",
  },
  {
    name: "Honduras",
    role: "Orta Amerika'nin buyuyen gucu",
    production: "~6M cuval/yil",
    type: "Sadece Arabica",
    regions: "Copan, Santa Barbara, Lempira, Ocotepeque",
    altitude: "1.000-1.600m",
    flavor: "Dengeli, cikolatamsi, turunce, findiksi",
    notes: "Son 15 yilda uretim hacmi iki katina cikti. Kalite/fiyat oraninda rekabetci. Fair Trade sertifikali uretim yaygin.",
  },
];

export default function KahveKusagi() {
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
            Kahve Kusagi &amp; Cografya
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Kahve, dunya uzerinde Yengec Donencesi ile Oglak Donencesi arasinda kalan tropikal kusak
            bolgede yetisir. Bu bolge &ldquo;Kahve Kusagi&rdquo; (Coffee Belt) olarak bilinir ve yaklasik
            70 ulkede kahve uretimi yapilir.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Kahve Kusagi Nedir?
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Kahve bitkisi (Coffea) tropikal iklimlerde, 600-2.200 metre yukseklikte, yillik 1.500-3.000mm yagis
              alan bolgelerde en iyi sonucu verir. Ideal sicaklik 15-24°C arasindadir. Don kahve bitkisi icin
              oldurucu olabilir — bu nedenle Brezilya&apos;daki don olaylari dunya fiyatlarini dramatik etkiler.
            </p>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Yukseklik, kahve kalitesini dogrudan etkiler. Genel kural: ne kadar yuksek irtifa, o kadar yavas
              olgunlasma, o kadar yogun ve kompleks lezzet profili. Bu nedenle Kolombiya ve Etiyopya gibi
              yuksek irtifa ulkelerinin kahveleri &ldquo;specialty&rdquo; sinifinda deger gorur.
            </p>

            <div className="bg-surface-container-low p-6 my-6 border-l-4 border-tertiary">
              <h4 className="font-headline text-lg font-bold mb-2">Arabica vs Robusta</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-primary mb-1">Arabica (Coffea arabica)</p>
                  <ul className="text-secondary space-y-1">
                    <li>• Dunya uretiminin %60-70&apos;i</li>
                    <li>• Yuksek irtifa (800-2.200m)</li>
                    <li>• Daha az kafein (%1.2-1.5)</li>
                    <li>• Kompleks, asidik, tatli</li>
                    <li>• Hastalik ve don&apos;a hassas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-primary mb-1">Robusta (Coffea canephora)</p>
                  <ul className="text-secondary space-y-1">
                    <li>• Dunya uretiminin %30-40&apos;i</li>
                    <li>• Dusuk irtifa (0-800m)</li>
                    <li>• Daha fazla kafein (%2.2-2.7)</li>
                    <li>• Guclu, aci, ahsumsu</li>
                    <li>• Hastaliga dayanikli</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-6">
              Baslica Uretim Ulkeleri
            </h2>
            <div className="space-y-6">
              {regions.map((r, i) => (
                <div key={i} className="bg-surface-container-lowest p-6 md:p-8 editorial-shadow border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline text-2xl font-bold">{r.name}</h3>
                      <p className="text-sm text-secondary italic">{r.role}</p>
                    </div>
                    <span className="text-[10px] font-label uppercase tracking-widest text-secondary bg-surface-container-high px-3 py-1 mt-2 md:mt-0">
                      {r.production}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Tur</p>
                      <p className="font-bold">{r.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Bolgeler</p>
                      <p className="font-bold">{r.regions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Irtifa</p>
                      <p className="font-bold">{r.altitude}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Lezzet</p>
                      <p className="font-bold">{r.flavor}</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{r.notes}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
        <Footer />
      </div>
    </>
  );
}
