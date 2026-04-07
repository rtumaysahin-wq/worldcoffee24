"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

const regions = [
  {
    name: "Brazil",
    role: "World's #1 producer",
    production: "~55M bags/yr",
    type: "Arabica & Robusta",
    regions: "Minas Gerais, Sao Paulo, Espirito Santo, Bahia",
    altitude: "600-1,400m",
    flavor: "Chocolatey, nutty, low acidity, full-bodied",
    notes: "Accounts for roughly 35% of global production. Biennial production cycles (on/off year) directly affect prices.",
  },
  {
    name: "Colombia",
    role: "Specialty Arabica leader",
    production: "~12M bags/yr",
    type: "Arabica only",
    regions: "Huila, Nariño, Antioquia, Tolima",
    altitude: "1,200-2,000m",
    flavor: "Bright acidity, caramel sweetness, fruity notes",
    notes: "Two harvests per year (main harvest + mitaca). High altitude and volcanic soil support specialty quality.",
  },
  {
    name: "Ethiopia",
    role: "Birthplace of coffee",
    production: "~7.5M bags/yr",
    type: "Arabica only",
    regions: "Yirgacheffe, Sidamo, Guji, Harrar",
    altitude: "1,500-2,200m",
    flavor: "Floral, citrus, blueberry, tea-like",
    notes: "Home to the greatest genetic diversity on Earth. Thousands of wild varieties. The origin of coffee culture.",
  },
  {
    name: "Vietnam",
    role: "World's #1 Robusta producer",
    production: "~30M bags/yr",
    type: "Mostly Robusta",
    regions: "Dak Lak, Lam Dong, Gia Lai (Central Highlands)",
    altitude: "400-800m",
    flavor: "Strong, bitter, woody, low acidity",
    notes: "Key raw material source for the instant coffee industry. Arabica production has also been rising in recent years.",
  },
  {
    name: "Indonesia",
    role: "Country of diversity",
    production: "~10M bags/yr",
    type: "Robusta & Arabica",
    regions: "Sumatra, Java, Sulawesi, Bali",
    altitude: "800-1,500m (Arabica), 200-800m (Robusta)",
    flavor: "Earthy, spicy, low acidity, heavy body",
    notes: "The giling basah (wet-hulling) processing method creates a unique flavor profile. Homeland of Kopi Luwak.",
  },
  {
    name: "Honduras",
    role: "Central America's rising power",
    production: "~6M bags/yr",
    type: "Arabica only",
    regions: "Copán, Santa Barbara, Lempira, Ocotepeque",
    altitude: "1,000-1,600m",
    flavor: "Balanced, chocolatey, citrusy, nutty",
    notes: "Production volume has doubled in the last 15 years. Competitive on quality-to-price ratio. Fair Trade certified production is widespread.",
  },
];

export default function KahveKusagi() {
  const { t } = useTranslation();

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
            {t.learn.headerLabel}
          </Link>

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            The Coffee Belt &amp; Geography
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Coffee grows in the tropical zone between the Tropic of Cancer and the Tropic of Capricorn.
            This region is known as the &ldquo;Coffee Belt&rdquo; and encompasses roughly
            70 countries where coffee is produced.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              What is the Coffee Belt?
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              The coffee plant (Coffea) thrives in tropical climates at elevations of 600-2,200 meters,
              in regions receiving 1,500-3,000mm of annual rainfall. The ideal temperature range is
              15-24°C. Frost can be lethal to coffee plants — which is why frost events in Brazil
              dramatically impact global prices.
            </p>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Altitude directly affects coffee quality. The general rule: the higher the altitude, the
              slower the maturation, and the more intense and complex the flavor profile. This is why
              coffees from high-altitude countries like Colombia and Ethiopia are valued in the
              &ldquo;specialty&rdquo; category.
            </p>

            <div className="bg-surface-container-low p-6 my-6 border-l-4 border-tertiary">
              <h4 className="font-headline text-lg font-bold mb-2">Arabica vs Robusta</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-primary mb-1">Arabica (Coffea arabica)</p>
                  <ul className="text-secondary space-y-1">
                    <li>• 60-70% of global production</li>
                    <li>• High altitude (800-2,200m)</li>
                    <li>• Less caffeine (1.2-1.5%)</li>
                    <li>• Complex, acidic, sweet</li>
                    <li>• Susceptible to disease and frost</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-primary mb-1">Robusta (Coffea canephora)</p>
                  <ul className="text-secondary space-y-1">
                    <li>• 30-40% of global production</li>
                    <li>• Low altitude (0-800m)</li>
                    <li>• More caffeine (2.2-2.7%)</li>
                    <li>• Strong, bitter, woody</li>
                    <li>• Disease resistant</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-6">
              Major Producing Countries
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
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Type</p>
                      <p className="font-bold">{r.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Regions</p>
                      <p className="font-bold">{r.regions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Altitude</p>
                      <p className="font-bold">{r.altitude}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase text-secondary mb-1">Flavor</p>
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
