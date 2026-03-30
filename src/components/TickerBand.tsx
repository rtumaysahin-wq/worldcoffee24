"use client";

import { fallbackPrices } from "@/lib/api/commodities";

const tickerItems = [
  { label: "Arabica Coffee", ...fallbackPrices.arabica },
  { label: "Robusta Coffee", ...fallbackPrices.robusta },
  { label: "USD/TRY", ...fallbackPrices.usdtry },
  { label: "EUR/TRY", ...fallbackPrices.eurtry },
  { label: "BRL/USD", ...fallbackPrices.brlusd },
  { label: "Sugar #11", ...fallbackPrices.sugar },
];

function TickerItem({
  label,
  price,
  change,
  changePct,
}: {
  label: string;
  price: number;
  change: number;
  changePct: number;
}) {
  const isUp = change >= 0;
  return (
    <span className="flex items-center gap-2 shrink-0">
      <span className="font-label uppercase tracking-widest text-secondary text-[11px]">
        {label}
      </span>
      <span className="font-bold text-[11px]">
        {price.toLocaleString("en-US", {
          minimumFractionDigits: price < 10 ? 4 : 2,
          maximumFractionDigits: price < 10 ? 4 : 2,
        })}
      </span>
      <span
        className={`font-bold text-[11px] flex items-center gap-0.5 ${
          isUp ? "text-tertiary" : "text-error"
        }`}
      >
        <span className="material-symbols-outlined text-sm">
          {isUp ? "trending_up" : "trending_down"}
        </span>
        {isUp ? "+" : ""}
        {changePct.toFixed(2)}%
      </span>
    </span>
  );
}

export default function TickerBand() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-surface-container-low border-b border-outline-variant/10 py-2.5 overflow-hidden flex-shrink-0">
      <div className="ticker-track text-[11px] gap-8 px-8 whitespace-nowrap items-center flex">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <TickerItem {...item} />
            {i < items.length - 1 && (
              <span className="text-outline-variant/40 mx-1">|</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
