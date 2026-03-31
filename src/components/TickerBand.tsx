"use client";

import { useEffect, useState } from "react";
import { fetchAllPrices, type PriceItem } from "@/lib/api/commodities";

function TickerItem({ item }: { item: PriceItem }) {
  if (item.price === null) return null;

  const isUp = item.changePct !== null && item.changePct >= 0;
  const hasChange = item.changePct !== null;

  const formatted = item.price.toLocaleString("en-US", {
    minimumFractionDigits: item.price < 10 ? 4 : 2,
    maximumFractionDigits: item.price < 10 ? 4 : 2,
  });

  return (
    <span className="flex items-center gap-2 shrink-0">
      <span className="font-label uppercase tracking-widest text-secondary text-[11px]">
        {item.label}
      </span>
      <span className="font-bold text-[11px]">
        {formatted}
        {item.unit && (
          <span className="text-secondary font-normal ml-0.5">{item.unit}</span>
        )}
      </span>
      {hasChange && (
        <span
          className={`font-bold text-[11px] flex items-center gap-0.5 ${
            isUp ? "text-tertiary" : "text-error"
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isUp ? "trending_up" : "trending_down"}
          </span>
          {isUp ? "+" : ""}
          {item.changePct!.toFixed(2)}%
        </span>
      )}
    </span>
  );
}

export default function TickerBand() {
  const [items, setItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAllPrices().then((data) => {
      if (data && data.prices.length > 0) {
        setItems(data.prices);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-surface-container-low border-b border-outline-variant/10 py-3 overflow-hidden flex-shrink-0">
        <div className="flex items-center justify-center gap-2 text-[11px] text-secondary">
          <span className="material-symbols-outlined text-sm animate-spin">
            progress_activity
          </span>
          Fiyatlar yükleniyor...
        </div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="bg-surface-container-low border-b border-outline-variant/10 py-3 overflow-hidden flex-shrink-0">
        <div className="flex items-center justify-center gap-2 text-[11px] text-error">
          <span className="material-symbols-outlined text-sm">error</span>
          Fiyat verisi yüklenemedi
        </div>
      </div>
    );
  }

  const validItems = items.filter((i) => i.price !== null);
  const doubled = [...validItems, ...validItems];

  return (
    <div className="bg-surface-container-low border-b border-outline-variant/10 py-2.5 overflow-hidden flex-shrink-0">
      <div className="ticker-track text-[11px] gap-8 px-8 whitespace-nowrap items-center flex">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <TickerItem item={item} />
            {i < doubled.length - 1 && (
              <span className="text-outline-variant/40 mx-1">|</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
