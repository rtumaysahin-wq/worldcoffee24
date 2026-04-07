"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

const terms = [
  { term: "Arabica", def: "Coffee belonging to the Coffea arabica species. Accounts for 60-70% of global production. Grown at high altitudes with a complex flavor profile. Contains less caffeine (1.2-1.5%)." },
  { term: "Backwardation", def: "A market condition where futures contract prices are lower than the spot price. Signals supply shortages or strong immediate demand." },
  { term: "Blend", def: "Coffee mixed from multiple origins or varieties. Used to create a consistent flavor profile." },
  { term: "C-Market", def: "The Arabica coffee futures contract (Coffee C Futures) traded on ICE New York. The benchmark for global Arabica prices." },
  { term: "Cupping", def: "A standardized tasting method for evaluating coffee quality. Conducted according to SCA protocol: scores are given for aroma, flavor, acidity, body, and balance." },
  { term: "Cherry", def: "The fruit of the coffee plant. Typically contains two seeds (beans) inside. Peaberries contain only one seed." },
  { term: "CIF", def: "Cost, Insurance and Freight. The seller quotes a price including freight and insurance. A widely used Incoterm in commodity trading." },
  { term: "COT Report", def: "Commitment of Traders. A weekly report published by the CFTC. Shows speculative and commercial positions." },
  { term: "Contango", def: "A market condition where futures contract prices are higher than the spot price. Reflects storage and financing costs under normal market conditions." },
  { term: "Bag", def: "A unit of measurement for coffee. Standard bag: Arabica 60 kg, Robusta (Vietnam) 60 kg. In Brazil, 69 kg bags are sometimes used." },
  { term: "Defect", def: "Flaws in green coffee beans. Includes insect damage, mold, breakage, and fermented beans. Defect count determines quality in SCA grading." },
  { term: "Differential", def: "The premium (+) or discount (-) applied relative to the C-Market price. Determined by origin, quality, and certification status. Example: Colombia Supremo +15 cents/lb." },
  { term: "Screen Size", def: "A measure of bean size. Expressed in 1/64 inch increments. Example: S18 = 18/64 inch. Larger beans generally command higher prices." },
  { term: "FOB", def: "Free on Board. The seller loads the goods onto the vessel; all costs and risks thereafter belong to the buyer. The most commonly used Incoterm in coffee trading." },
  { term: "Futures", def: "A standardized contract for the delivery of a specific commodity at a predetermined price and date. Traded on the ICE exchange." },
  { term: "Green Coffee", def: "Unroasted coffee beans. Coffee is traded internationally in its green state. When properly stored, it maintains quality for up to 12 months." },
  { term: "Hedging", def: "A strategy for managing price risk. Producers or buyers take an opposite position in the futures market to offset the risk of their physical coffee transactions." },
  { term: "Honey Process", def: "A coffee processing method. The cherry is depulped but dried with the mucilage layer intact. Produces a flavor profile between washed and natural." },
  { term: "ICE", def: "Intercontinental Exchange. The exchange where coffee futures contracts are traded. Has New York (Arabica) and London (Robusta) sections." },
  { term: "ICO", def: "International Coffee Organization. An intergovernmental body whose members include both producing and consuming countries." },
  { term: "Lot", def: "The exchange contract unit. Arabica: 1 lot = 37,500 pounds (approximately 17 tonnes). Robusta: 1 lot = 10 tonnes." },
  { term: "Margin", def: "The deposit required to open a futures contract. Typically ranges between 5-15% of the contract value." },
  { term: "Natural Process", def: "A coffee processing method. The whole cherry is dried in the sun. Produces intense fruit sweetness and a full body." },
  { term: "Parchment", def: "A thin membrane surrounding the coffee bean. After washing, the bean is dried inside its parchment layer. Removed in the final stage (hulling)." },
  { term: "Peaberry", def: "A single bean formation inside the cherry (normal: 2 beans). Considered to have a more intense flavor profile. Accounts for 5-10% of the total harvest." },
  { term: "Q-Grader", def: "A professional coffee evaluator certified by the Coffee Quality Institute (CQI). Separate licenses exist for Q Arabica and Q Robusta." },
  { term: "Robusta", def: "Coffee belonging to the Coffea canephora species. Grows at lower altitudes and contains more caffeine (2.2-2.7%). Widely used in instant coffee and espresso blends." },
  { term: "SCA Score", def: "The Specialty Coffee Association grading system. Scored out of 100. 80+ points: specialty coffee. 85+: excellent. 90+: outstanding." },
  { term: "Silverskin", def: "The thinnest membrane surrounding the coffee bean. Separates during roasting and floats off as chaff." },
  { term: "Specialty Coffee", def: "Coffee scoring 80+ points according to SCA standards. Traceable origin, minimal defects, and a distinctive flavor profile." },
  { term: "Spot Price", def: "The price for immediate delivery of a commodity. May differ from the futures price (contango or backwardation)." },
  { term: "Spread", def: "The price difference between two different futures contract maturities. Reflects market conditions and expectations." },
  { term: "Washed Process", def: "A coffee processing method. The cherry is depulped, mucilage is removed through fermentation, and the beans are washed with water. Produces a clean, acidic, terroir-focused cup profile." },
];

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: terms.slice(0, 10).map((t) => ({
      "@type": "Question",
      name: `What is ${t.term}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: t.def,
      },
    })),
  };
}

function buildBreadcrumb() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldcoffee24.com" },
      { "@type": "ListItem", position: 2, name: "Knowledge Center", item: "https://worldcoffee24.com/bilgi-merkezi" },
      { "@type": "ListItem", position: 3, name: "Glossary", item: "https://worldcoffee24.com/bilgi-merkezi/terimler-sozlugu" },
    ],
  };
}

export default function TerimlerSozlugu() {
  const { t } = useTranslation();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumb()) }} />
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

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
            Coffee Glossary
          </h1>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            A comprehensive guide to {terms.length} essential terms used in coffee trading, production, and evaluation.
          </p>

          <p className="text-xs font-label uppercase tracking-widest text-secondary mb-6">
            {terms.length} terms &bull; sorted A to Z
          </p>

          <div className="divide-y divide-outline-variant/15">
            {terms.map((item, i) => (
              <div key={i} className="py-5 hover:bg-surface-container-low/50 px-4 -mx-4 transition-colors">
                <h3 className="font-headline text-lg font-bold text-primary mb-1">
                  {item.term}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
