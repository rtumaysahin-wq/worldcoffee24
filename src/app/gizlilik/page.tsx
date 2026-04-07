"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/context";

export default function GizlilikPolitikasi() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8">
            {t.privacy.title}
          </h1>
          <p className="text-sm text-secondary mb-6">{t.privacy.lastUpdate}</p>

          <div className="prose prose-sm max-w-none space-y-6 text-on-surface leading-relaxed">
            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s1Title}</h2>
              <p className="text-sm leading-relaxed">{t.privacy.s1Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s2Title}</h2>
              <p className="text-sm leading-relaxed mb-3">{t.privacy.s2Intro}</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary">
                {t.privacy.s2Items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s3Title}</h2>
              <p className="text-sm leading-relaxed">{t.privacy.s3Intro}</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                {t.privacy.s3Items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s4Title}</h2>
              <p className="text-sm leading-relaxed">{t.privacy.s4Intro}</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                {t.privacy.s4Items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed mt-2">{t.privacy.s4Note}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s5Title}</h2>
              <p className="text-sm leading-relaxed">{t.privacy.s5Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s6Title}</h2>
              <p className="text-sm leading-relaxed">{t.privacy.s6Intro}</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                {t.privacy.s6Items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.privacy.s7Title}</h2>
              <p className="text-sm leading-relaxed">
                {t.privacy.s7Text}
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
