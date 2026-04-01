import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "WorldCoffee24.com gizlilik politikası — kişisel verilerin korunması ve çerez kullanımı hakkında bilgilendirme.",
};

export default function GizlilikPolitikasi() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8">
            Gizlilik Politikası
          </h1>
          <p className="text-sm text-secondary mb-6">Son güncelleme: 1 Nisan 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-on-surface leading-relaxed">
            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">1. Genel Bakış</h2>
              <p className="text-sm leading-relaxed">
                WorldCoffee24.com (&ldquo;Site&rdquo;), kullanıcılarının gizliliğine saygı gösterir.
                Bu politika, siteyi ziyaret ettiğinizde hangi bilgilerin toplandığını, nasıl kullanıldığını
                ve nasıl korunduğunu açıklar.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">2. Toplanan Bilgiler</h2>
              <p className="text-sm leading-relaxed mb-3">Sitemiz aşağıdaki bilgileri toplayabilir:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary">
                <li><strong>E-posta adresi:</strong> Bülten aboneliği için gönüllü olarak verdiğiniz e-posta adresi (Mailchimp üzerinden)</li>
                <li><strong>Kullanım verileri:</strong> Sayfa görüntüleme, ziyaret süresi, cihaz tipi (Vercel Analytics üzerinden, anonim)</li>
                <li><strong>Çerezler:</strong> Site performansı ve analiz için temel çerezler kullanılır</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">3. Bilgilerin Kullanımı</h2>
              <p className="text-sm leading-relaxed">Toplanan bilgiler yalnızca şu amaçlarla kullanılır:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                <li>Haftalık bülten göndermek (e-posta aboneliği)</li>
                <li>Site performansını iyileştirmek (anonim analiz verileri)</li>
                <li>İçerik kalitesini artırmak</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">4. Üçüncü Taraf Hizmetler</h2>
              <p className="text-sm leading-relaxed">Sitemiz aşağıdaki üçüncü taraf hizmetleri kullanır:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                <li><strong>Vercel:</strong> Barındırma ve analiz</li>
                <li><strong>Mailchimp:</strong> E-posta bülten yönetimi</li>
                <li><strong>Google Fonts:</strong> Yazı tipi sunumu</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                Bu hizmetlerin kendi gizlilik politikaları geçerlidir.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">5. Veri Güvenliği</h2>
              <p className="text-sm leading-relaxed">
                Kişisel verileriniz SSL şifreleme ile korunur. E-posta adresiniz yalnızca Mailchimp
                sunucularında saklanır ve üçüncü taraflarla paylaşılmaz.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">6. Haklarınız</h2>
              <p className="text-sm leading-relaxed">Aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                <li>Bülten aboneliğinden istediğiniz zaman çıkabilirsiniz (her e-postada &ldquo;Abonelikten Çık&rdquo; linki bulunur)</li>
                <li>Kişisel verilerinizin silinmesini talep edebilirsiniz</li>
                <li>Hangi verilerinizin toplandığını öğrenme hakkınız vardır</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">7. İletişim</h2>
              <p className="text-sm leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için bize ulaşabilirsiniz:
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
