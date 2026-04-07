"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Coffee Futures 101 — A Beginner's Guide to Futures Trading",
    description: "What are coffee futures and how do they work? A beginner's guide to understanding Arabica and Robusta futures contracts on the ICE exchange.",
    author: { "@type": "Organization", name: "WorldCoffee24" },
    publisher: { "@type": "Organization", name: "WorldCoffee24", logo: { "@type": "ImageObject", url: "https://worldcoffee24.com/favicon.ico" } },
    mainEntityOfPage: "https://worldcoffee24.com/bilgi-merkezi/futures-101",
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldcoffee24.com" },
      { "@type": "ListItem", position: 2, name: "Knowledge Center", item: "https://worldcoffee24.com/bilgi-merkezi" },
      { "@type": "ListItem", position: 3, name: "Futures 101", item: "https://worldcoffee24.com/bilgi-merkezi/futures-101" },
    ],
  },
];

export default function Futures101() {
  const { t } = useTranslation();

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
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

          <span className="bg-tertiary text-on-tertiary-fixed font-bold text-[10px] px-3 py-1 uppercase tracking-widest mb-4 inline-block">
            {t.learn.futuresBadge}
          </span>

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            Coffee Futures 101: A Beginner&apos;s Guide to Futures Trading
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Understanding futures contracts — the most important price-setting mechanism in the coffee world —
            provides a significant advantage whether you are a producer, trader, or industry professional.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              What Is a Futures Contract?
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              A futures contract is a standardized agreement to deliver a specific commodity (in this case, coffee)
              at a predetermined price on a specified date. These contracts are traded on exchanges and offer both
              producers and buyers a way to hedge against price risk.
            </p>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              For example, if a Brazilian coffee farmer is worried that prices will fall before the harvest season,
              they can lock in today&apos;s price by selling a futures contract. Similarly, a roasting company that
              wants to know its costs in advance can buy a futures contract to secure its supply price.
            </p>

            <div className="bg-surface-container-low p-6 md:p-8 my-6 border-l-4 border-primary">
              <h4 className="font-headline text-lg font-bold mb-2">Simple Example</h4>
              <p className="text-sm text-secondary leading-relaxed">
                A roasting company needs 100 tons of coffee in 6 months. Today&apos;s price is 300 cents/lb.
                The company buys a futures contract at this price. Even if the price rises to 350 cents/lb
                in 6 months, the company still gets its coffee at 300 cents/lb — saving 50 cents/lb.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Coffee Exchanges
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-6">
              There are two major exchanges in the world where coffee futures contracts are traded:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-surface-container-lowest p-6 editorial-shadow border-l-4 border-primary">
                <h3 className="font-headline text-xl font-bold mb-2">ICE New York (ICEUS)</h3>
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  Symbol: KC &bull; Unit: US cent/lb
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  The world&apos;s benchmark exchange for Arabica coffee. Known as the &ldquo;C Contract.&rdquo;
                  Contract size is 37,500 pounds (approximately 17 metric tons). Arabica coffees from
                  Colombia, Brazil, Guatemala, Costa Rica, and other origins are traded here.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 editorial-shadow border-l-4 border-primary-container">
                <h3 className="font-headline text-xl font-bold mb-2">ICE London (ICEEUR)</h3>
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  Symbol: RC &bull; Unit: USD/ton
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  The benchmark exchange for Robusta coffee. Contract size is 10 metric tons. Robusta
                  coffees from Vietnam, Indonesia, Uganda, and other origins are traded here.
                  Robusta is the primary raw material for the instant coffee industry.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Factors That Influence Price
            </h2>
            <div className="space-y-4">
              {[
                { icon: "thermostat", title: "Climate & Weather", desc: "Weather events such as frost, drought, and excessive rainfall directly impact production. A frost event in Brazil can push global prices up by 30–50%." },
                { icon: "currency_exchange", title: "Exchange Rates", desc: "A weakening Brazilian Real against the US dollar incentivizes Brazilian producers to export more, increasing supply and potentially lowering prices." },
                { icon: "inventory_2", title: "Stock Levels", desc: "Declining ICE-certified stocks signal supply tightness. During 2024–2026, stocks fell to historically low levels." },
                { icon: "bar_chart", title: "Speculative Positions", desc: "Net long or short positions held by speculators in the COT (Commitment of Traders) report can indicate price direction." },
                { icon: "local_shipping", title: "Logistics & Freight", desc: "Container costs, port congestion, and shipping times affect the flow of coffee from producing countries to consuming markets." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-2xl text-primary mt-1">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Key Terms
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[10px] font-label uppercase tracking-widest text-secondary">
                    <th className="pb-3">Term</th>
                    <th className="pb-3">Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    ["Long Position", "Buying a contract — a bet that the price will rise"],
                    ["Short Position", "Selling a contract — a bet that the price will fall"],
                    ["Margin", "The collateral required to open a contract position"],
                    ["Settlement", "Physical delivery or cash settlement when the contract expires"],
                    ["Spread", "The price difference between two different contract expiry dates"],
                    ["Contango", "When the forward contract price is higher than the spot price"],
                    ["Backwardation", "When the forward contract price is lower than the spot price"],
                    ["Open Interest", "The number of outstanding positions — an indicator of market depth"],
                  ].map(([term, desc], i) => (
                    <tr key={i}>
                      <td className="py-3 font-bold text-primary">{term}</td>
                      <td className="py-3 text-secondary">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="bg-primary-container text-white p-8 text-center">
            <h3 className="font-headline text-2xl mb-3">Track Live Prices</h3>
            <p className="text-sm text-white/70 mb-5">
              Monitor Arabica and Robusta futures prices in real time on our Price Hub page.
            </p>
            <Link
              href="/fiyat-merkezi"
              className="inline-block bg-[#f4fafe] text-primary-container px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Go to Price Hub
            </Link>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
