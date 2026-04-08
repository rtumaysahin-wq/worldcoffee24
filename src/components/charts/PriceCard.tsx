"use client";

import { useEffect, useState } from "react";
import { fetchAllPrices, type PriceItem } from "@/lib/api/commodities";

interface PriceCardProps {
  label: string;
  filterKey: string;
  unit?: string;
}

export default function PriceCard({ label, filterKey, unit }: PriceCardProps) {
  const [item, setItem] = useState<PriceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPrices().then((data) => {
      if (data) {
        const found = data.prices.find((p) => p.label === filterKey);
        if (found) setItem(found);
      }
      setLoading(false);
    });
  }, [filterKey]);

  if (loading) {
    return (
      <div className="bg-surface-container-lowest p-5 editorial-shadow border-l-4 border-primary min-w-[180px] animate-pulse">
        <div className="h-3 bg-surface-container-high rounded w-20 mb-2" />
        <div className="h-7 bg-surface-container-high rounded w-24 mb-1" />
        <div className="h-4 bg-surface-container-high rounded w-16" />
      </div>
    );
  }

  if (!item || item.price === null) {
    return (
      <div className="bg-surface-container-lowest p-5 editorial-shadow border-l-4 border-outline-variant min-w-[180px]">
        <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1">{label}</p>
        <p className="text-sm text-error">No data</p>
      </div>
    );
  }

  const isUp = item.changePct !== null && item.changePct >= 0;

  return (
    <div className="bg-surface-container-lowest p-5 editorial-shadow border-l-4 border-primary min-w-[180px]">
      <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1">{label}</p>
      <div className="flex items-end gap-2 mb-1">
        <span className="font-headline text-2xl font-bold text-primary">
          {item.price.toLocaleString("en-US", {
            minimumFractionDigits: item.price < 10 ? 4 : 2,
            maximumFractionDigits: item.price < 10 ? 4 : 2,
          })}
        </span>
        {unit && <span className="text-xs text-secondary mb-0.5">{unit}</span>}
      </div>
      {item.changePct !== null && (
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? "text-tertiary" : "text-error"}`}>
          <span className="material-symbols-outlined text-sm">{isUp ? "trending_up" : "trending_down"}</span>
          {isUp ? "+" : ""}{item.changePct.toFixed(2)}%
        </div>
      )}
    </div>
  );
}
