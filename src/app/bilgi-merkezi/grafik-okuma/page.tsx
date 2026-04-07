"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

export default function GrafikOkuma() {
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
            Chart Reading Guide
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10">
            Price charts allow us to visually understand market movements.
            This guide covers the fundamental technical analysis tools used in the coffee commodity market.
          </p>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              1. Candlestick Charts
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Candlestick charts display the open, close, high, and low prices within a given time period
              as a single &ldquo;candle.&rdquo; They were developed in 18th-century Japan for rice trading.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary editorial-shadow">
                <h4 className="font-bold text-tertiary mb-2">Green / Hollow Candle (Bullish)</h4>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  The closing price is higher than the opening price. Buyers are dominant.
                </p>
                <div className="text-xs text-secondary space-y-1">
                  <p>• Upper wick = highest price reached during the period</p>
                  <p>• Top of body = closing price</p>
                  <p>• Bottom of body = opening price</p>
                  <p>• Lower wick = lowest price reached during the period</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 border-l-4 border-error editorial-shadow">
                <h4 className="font-bold text-error mb-2">Red / Filled Candle (Bearish)</h4>
                <p className="text-sm text-secondary leading-relaxed mb-3">
                  The closing price is lower than the opening price. Sellers are dominant.
                </p>
                <div className="text-xs text-secondary space-y-1">
                  <p>• Upper wick = highest price reached during the period</p>
                  <p>• Top of body = opening price</p>
                  <p>• Bottom of body = closing price</p>
                  <p>• Lower wick = lowest price reached during the period</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 border-l-4 border-primary my-6">
              <h4 className="font-headline text-lg font-bold mb-3">Key Candlestick Patterns</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-bold mb-1">Doji</p>
                  <p className="text-secondary">Open and close are nearly identical. A signal of indecision. May herald a trend reversal.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Hammer</p>
                  <p className="text-secondary">Long lower wick, small body. When seen in a downtrend, it signals a potential reversal.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Engulfing</p>
                  <p className="text-secondary">One candle completely engulfs the previous candle. A strong trend reversal signal.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              2. Support and Resistance Levels
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Support and resistance are horizontal levels that price repeatedly tests and typically bounces from.
              These levels represent zones where supply and demand are concentrated.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-6 bg-surface-container-lowest editorial-shadow">
                <h4 className="font-bold text-primary mb-2">Support</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  The level where price stops falling and buyers step in.
                  Example: The 280 cent/lb level may serve as strong support for Arabica KC1! &mdash; every time
                  price drops to this level, buyers emerge and price recovers.
                </p>
              </div>
              <div className="p-6 bg-surface-container-lowest editorial-shadow">
                <h4 className="font-bold text-primary mb-2">Resistance</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  The level where price stops rising and sellers step in.
                  Example: Arabica price unable to break the 320 cent/lb level falls back each time
                  it tests this level &mdash; until sufficient buying pressure finally breaks through.
                </p>
              </div>
            </div>

            <div className="bg-primary-container text-white p-6 my-6">
              <h4 className="font-headline text-lg font-bold mb-2">Breakout</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                When price breaks above a resistance level, the old resistance becomes new support. The reverse is also true.
                Breakouts typically occur with high volume and can mark the beginning of strong trend moves.
                In the coffee market, climate events (frost, drought) often trigger resistance breakouts.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              3. Trend Lines
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Trend lines are used to identify the overall direction of price movement.
              An uptrend line is drawn by connecting successive lows, while a downtrend line
              is drawn by connecting successive highs.
            </p>
            <div className="space-y-3 text-sm">
              {[
                { label: "Uptrend", desc: "Successive higher lows and higher highs. Each low is higher than the previous one." },
                { label: "Downtrend", desc: "Successive lower highs and lower lows. Each high is lower than the previous one." },
                { label: "Sideways (Range)", desc: "Price moves within a defined range. Neither buyers nor sellers are dominant." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary mt-0.5">show_chart</span>
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              4. Moving Averages
            </h2>
            <p className="text-base text-on-surface leading-relaxed mb-4">
              Moving averages are indicators that smooth out price data by averaging values over a specified period.
              They filter out noise and make the underlying trend easier to see.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[10px] font-label uppercase tracking-widest text-secondary">
                    <th className="pb-3">Indicator</th>
                    <th className="pb-3">Period</th>
                    <th className="pb-3">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr><td className="py-3 font-bold">SMA 20</td><td className="py-3">20 days</td><td className="py-3 text-secondary">Short-term trend. Scalping and day trading.</td></tr>
                  <tr><td className="py-3 font-bold">SMA 50</td><td className="py-3">50 days</td><td className="py-3 text-secondary">Medium-term trend. Ideal for swing trading.</td></tr>
                  <tr><td className="py-3 font-bold">SMA 200</td><td className="py-3">200 days</td><td className="py-3 text-secondary">Long-term trend. Followed by institutional investors.</td></tr>
                  <tr><td className="py-3 font-bold">Golden Cross</td><td className="py-3">50/200</td><td className="py-3 text-tertiary">When SMA 50 crosses above SMA 200 &mdash; strong buy signal.</td></tr>
                  <tr><td className="py-3 font-bold">Death Cross</td><td className="py-3">50/200</td><td className="py-3 text-error">When SMA 50 crosses below SMA 200 &mdash; strong sell signal.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              5. Volume
            </h2>
            <p className="text-base text-on-surface leading-relaxed">
              Volume is the number of contracts traded during a given period. It measures the &ldquo;strength&rdquo; of a price move.
              Price movement accompanied by high volume is more reliable. Movement on low volume may be a &ldquo;trap.&rdquo;
              In the coffee market, CFTC COT reports in particular support volume analysis by showing
              the direction of speculative positions.
            </p>
          </section>
        </article>
        <Footer />
      </div>
    </>
  );
}
