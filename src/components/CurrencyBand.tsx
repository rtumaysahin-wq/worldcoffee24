"use client";

import { useEffect, useState } from "react";
import { fetchAllPrices, type PriceItem } from "@/lib/api/commodities";
import { useTranslation } from "@/lib/i18n/context";

const coffeeRates = [
  { key: "USD/BRL", flag: "🇧🇷", country: "Brazil" },
  { key: "USD/VND", flag: "🇻🇳", country: "Vietnam" },
  { key: "USD/COP", flag: "🇨🇴", country: "Colombia" },
  { key: "USD/ETB", flag: "🇪🇹", country: "Ethiopia" },
];

function CurrencyItem({ item, flag, country }: { item: PriceItem; flag: string; country: string }) {
  if (item.price === null) return null;

  const isUp = item.changePct !== null && item.changePct >= 0;
  const hasChange = item.changePct !== null;

  const decimals = item.price > 1000 ? 0 : item.price < 1 ? 4 : 2;

  return (
    <div className="flex items-center gap-3 p-3 md:p-4 bg-surface-container-lowest flex-1 min-w-0">
      <span className="text-xl shrink-0">{flag}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-label uppercase tracking-widest text-secondary truncate">
          {country}
        </p>
        <p className="font-headline text-base md:text-lg font-bold text-primary">
          {item.label}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-headline text-base md:text-lg font-bold">
          {item.price.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </p>
        {hasChange && (
          <p
            className={`text-[11px] font-bold flex items-center justify-end gap-0.5 ${
              isUp ? "text-tertiary" : "text-error"
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {isUp ? "trending_up" : "trending_down"}
            </span>
            {isUp ? "+" : ""}
            {item.changePct!.toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
}

export default function CurrencyBand() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllPrices().then((data) => {
      if (data) setPrices(data.prices);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-container-lowest p-3 md:p-4 animate-pulse">
            <div className="h-3 bg-surface-container-high rounded w-20 mb-2" />
            <div className="h-5 bg-surface-container-high rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  const items = coffeeRates
    .map((cr) => {
      const item = prices.find((p) => p.label === cr.key);
      return item ? { item, flag: cr.flag, country: cr.country } : null;
    })
    .filter(Boolean) as { item: PriceItem; flag: string; country: string }[];

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
      {items.map(({ item, flag, country }) => (
        <CurrencyItem key={item.label} item={item} flag={flag} country={country} />
      ))}
    </div>
  );
}
