"use client";

import { useEffect, useState } from "react";
import { fetchAllPrices, type PriceItem } from "@/lib/api/commodities";
import { useTranslation } from "@/lib/i18n/context";

function CurrencyItem({ item, label }: { item: PriceItem; label: string }) {
  if (item.price === null) return null;

  const isUp = item.changePct !== null && item.changePct >= 0;
  const hasChange = item.changePct !== null;

  return (
    <div className="flex items-center justify-between gap-3 p-3 md:p-4 bg-surface-container-lowest flex-1 min-w-0">
      <div className="min-w-0">
        <p className="text-[10px] font-label uppercase tracking-widest text-secondary truncate">
          {label}
        </p>
        <p className="font-headline text-lg md:text-xl font-bold text-primary">
          {item.label}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-headline text-lg md:text-xl font-bold">
          {item.price.toLocaleString("tr-TR", {
            minimumFractionDigits: item.price < 1 ? 4 : 2,
            maximumFractionDigits: item.price < 1 ? 4 : 2,
          })}
        </p>
        {hasChange && (
          <p
            className={`text-xs font-bold flex items-center justify-end gap-0.5 ${
              isUp ? "text-error" : "text-tertiary"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
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
  const [currencies, setCurrencies] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const currencyLabels: Record<string, string> = {
    "USD/TRY": t.currency.usd,
    "EUR/TRY": t.currency.eur,
    "BRL/USD": t.currency.brl,
  };

  useEffect(() => {
    fetchAllPrices().then((data) => {
      if (data) {
        const currencyKeys = ["USD/TRY", "EUR/TRY", "BRL/USD"];
        setCurrencies(data.prices.filter((p) => currencyKeys.includes(p.label)));
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 bg-surface-container-lowest p-3 md:p-4 animate-pulse">
            <div className="h-3 bg-surface-container-high rounded w-20 mb-2" />
            <div className="h-5 bg-surface-container-high rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (currencies.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
      {currencies.map((item) => (
        <CurrencyItem key={item.label} item={item} label={currencyLabels[item.label] || item.label} />
      ))}
    </div>
  );
}
