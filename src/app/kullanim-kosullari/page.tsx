"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/context";

export default function KullanimKosullari() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8">
            {t.termsOfUse.title}
          </h1>
          <p className="text-sm text-secondary mb-6">{t.termsOfUse.lastUpdate}</p>

          <div className="prose prose-sm max-w-none space-y-6 text-on-surface leading-relaxed">
            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s1Title}</h2>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s1Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s2Title}</h2>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s2Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s3Title}</h2>
              <div className="bg-error/10 border-l-4 border-error p-4 mb-4">
                <p className="text-sm leading-relaxed font-bold text-error">{t.termsOfUse.s3Warning}</p>
              </div>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s3Intro}</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                {t.termsOfUse.s3Items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s4Title}</h2>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s4Intro}</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-secondary mt-2">
                {t.termsOfUse.s4Items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed mt-2">{t.termsOfUse.s4Note}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s5Title}</h2>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s5Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s6Title}</h2>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s6Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s7Title}</h2>
              <p className="text-sm leading-relaxed">{t.termsOfUse.s7Text}</p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-bold text-primary mb-3">{t.termsOfUse.s8Title}</h2>
              <p className="text-sm leading-relaxed">
                {t.termsOfUse.s8Text}
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
