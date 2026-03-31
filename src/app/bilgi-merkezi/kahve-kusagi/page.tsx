import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kahve Kuşağı & Coğrafya — Üretim Ülkeleri Rehberi",
  description:
    "Dünya kahve kuşağı haritası, başlıca üretim ülkeleri, iklim koşulları ve bölgesel lezzet profilleri. Brezilya, Kolombiya, Etiyopya, Vietnam.",
  keywords: [
    "kahve kuşağı",
    "coffee belt",
    "kahve üretim ülkeleri",
    "arabica bölgeler",
    "robusta bölgeler",
    "brezilya kahve",
    "etiyopya kahve",
    "vietnam kahve",
  ],
};

const regions = [
  {
    name: "Brezilya",
    role: "Dünyanın 1 numaralı üreticisi",
    production: "~55M çuval/yıl",
    type: "Arabica & Robusta",
    regions: "Minas Gerais, Sao Paulo, Espirito Santo, Bahia",
    altitude: "600-1.400m",
    flavor: "Çikolataımsı, fındıksı, düşük asidite, geniş gövdeli",
    notes: "Dünya üretiminin yaklaşık %35'ini sağlar. Çift yıllık üretim döngüsü (on/off year) fiyatları doğrudan etkiler.",
  },
  {
    name: "Kolombiya",
    role: "Specialty Arabica lideri",
    production: "~12M çuval/yıl",
    type: "Sadece Arabica",
    regions: "Huila, Nariño, Antioquia, Tolima",
    altitude: "1.200-2.000m",
    flavor: "Parlak asidite, karamel tatlılık, meyve notalar",
    notes: "Yılda iki hasat (ana hasat + mitaca). Yüksek irtifa ve volkanik toprak specialty kaliteyi destekler.",
  },
  {
    name: "Etiyopya",
    role: "Kahvenin anavatanı",
    production: "~7.5M çuval/yıl",
    type: "Sadece Arabica",
    regions: "Yirgacheffe, Sidamo, Guji, Harrar",
    altitude: "1.500-2.200m",
    flavor: "Çiçeksi, narenciye, yaban mersini, çay benzeri",
    notes: "Dünya üzerindeki en büyük genetik çeşitlilik. Binlerce yabani çeşit. Kahve kültürünün kökeni.",
  },
  {
    name: "Vietnam",
    role: "Dünyanın 1 numaralı Robusta üreticisi",
    production: "~30M çuval/yıl",
    type: "Çoğunlukla Robusta",
    regions: "Dak Lak, Lam Dong, Gia Lai (Orta Yaylalar)",
    altitude: "400-800m",
    flavor: "Güçlü, acı, ahşumsı, düşük asidite",
    notes: "Instant kahve endüstrisinin temel hammadde kaynağı. Son yıllarda Arabica üretimi de artıyor.",
  },
  {
    name: "Endonezya",
    role: "Çeşitlilik ülkesi",
    production: "~10M çuval/yıl",
    type: "Robusta & Arabica",
    regions: "Sumatra, Java, Sulawesi, Bali",
    altitude: "800-1.500m (Arabica), 200-800m (Robusta)",
    flavor: "Topraksı, baharatlı, düşük asidite, ağır gövde",
    notes: "Giling basah (wet-hulling) işleme yöntemi benzersiz lezzet profili oluşturur. Kopi Luwak'ın anavatanı.",
  },
  {
    name: "Honduras",
    role: "Orta Amerika'nın büyüyen gücü",
    production: "~6M çuval/yıl",
    type: "Sadece Arabica",
    regions: "Copán, Santa Barbara, Lempira, Ocotepeque",
    altitude: "1.000-1.600m",
    flavor: "Dengeli, çikolataımsı, turunçsu, fındıksı",
    notes: "Son 15 yılda üretim hacmi iki katına çıktı. Kalite/fiyat oranında rekabetçi. Fair Trade sertifikalı üretim yaygın.",
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
            Kahve Kuşağı &amp; Coğrafya
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Kahve, dünya üzerinde Yengeç Dönencesi ile Oğlak Dönencesi arasında kalan tropikal kuşak
            bölgede yetişir. Bu bölge &ldquo;Kahve Kuşağı&rdquo; (Coffee Belt) olarak bilinir ve yaklaşık
            70 ülkede kahve üretimi yapılır.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Kahve Kuşağı Nedir?
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Kahve bitkisi (Coffea) tropikal iklimlerde, 600-2.200 metre yükseklikte, yıllık 1.500-3.000mm yağış
              alan bölgelerde en iyi sonucu verir. İdeal sıcaklık 15-24°C arasındadır. Don kahve bitkisi için
              öldürücü olabilir — bu nedenle Brezilya&apos;daki don olayları dünya fiyatlarını dramatik etkiler.
            </p>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Yükseklik, kahve kalitesini doğrudan etkiler. Genel kural: ne kadar yüksek irtifa, o kadar yavaş
              olgunlaşma, o kadar yoğun ve kompleks lezzet profili. Bu nedenle Kolombiya ve Etiyopya gibi
              yüksek irtifa ülkelerinin kahveleri &ldquo;specialty&rdquo; sınıfında değer görür.
            </p>

            <div className="bg-surface-container-low p-6 my-6 border-l-4 border-tertiary">
              <h4 className="font-headline text-lg font-bold mb-2">Arabica vs Robusta</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-primary mb-1">Arabica (Coffea arabica)</p>
                  <ul className="text-secondary space-y-1">
                    <li>• Dünya üretiminin %60-70&apos;i</li>
                    <li>• Yüksek irtifa (800-2.200m)</li>
                    <li>• Daha az kafein (%1.2-1.5)</li>
                    <li>• Kompleks, asidik, tatlı</li>
                    <li>• Hastalık ve don&apos;a hassas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-primary mb-1">Robusta (Coffea canephora)</p>
                  <ul className="text-secondary space-y-1">
                    <li>• Dünya üretiminin %30-40&apos;ı</li>
                    <li>• Düşük irtifa (0-800m)</li>
                    <li>• Daha fazla kafein (%2.2-2.7)</li>
                    <li>• Güçlü, acı, ahşumsı</li>
                    <li>• Hastalığa dayanıklı</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-6">
              Başlıca Üretim Ülkeleri
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
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Tür</p>
                      <p className="font-bold">{r.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Bölgeler</p>
                      <p className="font-bold">{r.regions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">İrtifa</p>
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
