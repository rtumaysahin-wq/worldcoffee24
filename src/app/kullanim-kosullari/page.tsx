import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "WorldCoffee24.com kullanım koşulları — site kullanım şartları, sorumluluk reddi ve yasal bilgilendirme.",
};

export default function KullanimKosullari() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8">
            Kullanım Koşulları
          </h1>
          <p className="text-sm text-secondary mb-6">Son güncelleme: 1 Nisan 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-on-surface leading-relaxed">
            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">1. Kabul</h2>
              <p className="text-sm leading-relaxed">
                WorldCoffee24.com&apos;u (&ldquo;Site&rdquo;) kullanarak bu kullanım koşullarını kabul etmiş sayılırsınız.
                Bu koşulları kabul etmiyorsanız siteyi kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">2. Hizmet Tanımı</h2>
              <p className="text-sm leading-relaxed">
                WorldCoffee24.com, küresel kahve piyasası hakkında bilgi, analiz, fiyat verileri ve eğitim
                içerikleri sunan bir platformdur. Site üzerindeki veriler çeşitli üçüncü taraf kaynaklardan
                (FRED, Yahoo Finance, Open-Meteo, RSS beslemeleri) otomatik olarak çekilmektedir.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">3. Sorumluluk Reddi</h2>
              <div className="bg-error/10 border-l-4 border-error p-4 mb-4">
                <p className="text-sm leading-relaxed font-bold text-error">
                  ÖNEMLİ: Bu site yatırım tavsiyesi vermez.
                </p>
              </div>
              <p className="text-sm leading-relaxed">
                Site üzerindeki fiyat verileri, analizler ve yorumlar yalnızca bilgilendirme amaçlıdır.
                Yatırım kararlarınız tamamen kendi sorumluluğunuzdadır. WorldCoffee24.com:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                <li>Yatırım danışmanlığı hizmeti vermez</li>
                <li>Fiyat verilerinin doğruluğunu garanti etmez</li>
                <li>Gecikmiş, hatalı veya eksik verilerden kaynaklanan zararlardan sorumlu değildir</li>
                <li>Üçüncü taraf veri kaynaklarının kesintilerinden sorumlu değildir</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">4. Veri Kaynakları</h2>
              <p className="text-sm leading-relaxed">
                Sitemizde gösterilen veriler aşağıdaki kaynaklardan alınmaktadır:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                <li><strong>Fiyat verileri:</strong> Yahoo Finance, FRED (Federal Reserve Economic Data)</li>
                <li><strong>Hava durumu:</strong> Open-Meteo API</li>
                <li><strong>Haberler:</strong> RSS beslemeleri (Daily Coffee News, Sprudge, Perfect Daily Grind, Google News)</li>
                <li><strong>Döviz kurları:</strong> Yahoo Finance</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                Veriler periyodik olarak güncellenir ve gerçek zamanlı olmayabilir.
                Yatırım kararları için doğrudan borsa verilerini kullanınız.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">5. Fikri Mülkiyet</h2>
              <p className="text-sm leading-relaxed">
                Site tasarımı, logosu, içerikleri ve yazılımı WorldCoffee24.com&apos;a aittir.
                İzinsiz kopyalama, dağıtma veya değiştirme yasaktır.
                Üçüncü taraf içerikler (haberler, fiyat verileri) ilgili kaynaklarına aittir.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">6. Bülten Hizmeti</h2>
              <p className="text-sm leading-relaxed">
                E-posta bültenimize abone olduğunuzda, haftalık piyasa özeti ve içerik güncellemeleri
                alırsınız. İstediğiniz zaman abonelikten çıkabilirsiniz. E-posta adresiniz üçüncü
                taraflarla paylaşılmaz.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">7. Değişiklikler</h2>
              <p className="text-sm leading-relaxed">
                Bu kullanım koşulları önceden bildirim yapılmaksızın güncellenebilir.
                Güncel koşullar her zaman bu sayfada yayınlanır.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">8. İletişim</h2>
              <p className="text-sm leading-relaxed">
                Sorularınız için:
                <br />
                <strong>E-posta:</strong> info@worldcoffee24.com
              </p>
            </section>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
