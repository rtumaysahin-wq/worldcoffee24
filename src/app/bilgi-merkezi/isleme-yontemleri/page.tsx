"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

const methods = [
  {
    name: "Washed (Wet Process)",
    color: "border-tertiary",
    steps: [
      "Harvested cherries are depulped (outer skin removed)",
      "Mucilage layer is broken down in fermentation tanks for 12-72 hours",
      "Beans are washed with clean water",
      "Dried in the sun or mechanical dryers to 11-12% moisture content",
    ],
    flavor: "Clean cup, bright acidity, floral/fruity notes. Terroir (soil/climate) influence is prominent.",
    regions: "Colombia, Kenya, Ethiopia (Yirgacheffe), Central America",
    pros: "Consistent quality, clean flavor profile, ease of quality control",
    cons: "High water consumption (~15-20 liters per batch), environmental impact, higher cost",
  },
  {
    name: "Natural (Dry Process)",
    color: "border-primary",
    steps: [
      "Ripe cherries are picked from the tree",
      "Whole cherries (with skin and fruit pulp intact) are spread on drying beds",
      "Dried in the sun for 2-4 weeks, turned regularly",
      "Dried husk is mechanically removed (hulling)",
    ],
    flavor: "Heavy body, low acidity, strawberry/blueberry/tropical fruit sweetness, winey/fermented notes.",
    regions: "Ethiopia (Sidamo, Guji), Brazil, Yemen",
    pros: "Low water consumption, eco-friendly, unique sweetness and fruit character",
    cons: "Fermentation risk, inconsistent quality, mold/fungus danger, labor-intensive",
  },
  {
    name: "Honey Process",
    color: "border-on-tertiary-container",
    steps: [
      "Cherries are depulped but the mucilage layer is left on",
      "Classified by the amount of mucilage remaining: Yellow, Red, Black Honey",
      "Dried with the mucilage on — a sticky (honey-like) texture develops",
      "Husk is removed once moisture reaches 11-12%",
    ],
    flavor: "Sits between Washed and Natural. Sweet, full-bodied, medium acidity. Caramel/honey notes.",
    regions: "Costa Rica, El Salvador, Brazil",
    pros: "Lower water usage, unique sweetness, differentiation opportunity",
    cons: "Labor-intensive, climate-dependent, delicate drying process",
  },
  {
    name: "Anaerobic Fermentation",
    color: "border-error",
    steps: [
      "Cherries or depulped beans are placed in airtight tanks",
      "Controlled fermentation in an oxygen-free environment (24-120+ hours)",
      "Temperature, pH, and fermentation time are closely monitored",
      "Post-fermentation washing or natural drying is applied",
    ],
    flavor: "Exotic, intense, tropical fruit, wine/beer-like complex notes. Sometimes pickled/vinegar acidities.",
    regions: "Colombia, Costa Rica, Brazil (specialty segment)",
    pros: "Extremely unique and valuable cup profiles, competition-winning coffees",
    cons: "Very high risk, requires expertise, inconsistency potential, high cost",
  },
];

export default function IslemeYontemleri() {
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
            Coffee Processing Methods
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            One of the most important factors that determines a coffee bean&apos;s flavor profile is
            the post-harvest processing method. The same variety of bean from the same farm can
            produce entirely different flavor profiles when processed using different methods.
          </p>

          {methods.map((method, i) => (
            <section key={i} className={`mb-10 bg-surface-container-lowest p-6 md:p-8 editorial-shadow border-l-4 ${method.color}`}>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-6">
                {method.name}
              </h2>

              <h3 className="font-bold text-sm uppercase tracking-widest text-secondary mb-3">Processing Steps</h3>
              <ol className="list-decimal list-inside space-y-2 mb-6 text-sm text-on-surface leading-relaxed">
                {method.steps.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Flavor Profile</h4>
                  <p className="text-sm text-on-surface leading-relaxed">{method.flavor}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Common Regions</h4>
                  <p className="text-sm text-on-surface leading-relaxed">{method.regions}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Advantages</h4>
                  <p className="text-sm text-tertiary leading-relaxed">{method.pros}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Challenges</h4>
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
