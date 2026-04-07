"use client";

import { useTranslation } from "@/lib/i18n/context";

interface PriceCardProps {
  label: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  currency?: string;
  unit?: string;
  loading?: boolean;
}

export default function PriceCard({
  label,
  price,
  change,
  changePct,
  currency = "",
  unit = "",
  loading = false,
}: PriceCardProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="bg-surface-container-lowest p-5 editorial-shadow border-l-4 border-primary animate-pulse">
        <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">
          {label}
        </p>
        <div className="h-8 bg-surface-container-high rounded w-24 mb-1" />
        <div className="h-4 bg-surface-container-high rounded w-16" />
      </div>
    );
  }

  if (price === null) {
    return (
      <div className="bg-surface-container-lowest p-5 editorial-shadow border-l-4 border-outline-variant">
        <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">
          {label}
        </p>
        <p className="text-sm text-error">{t.common.error}</p>
      </div>
    );
  }

  const isUp = change !== null && change >= 0;

  return (
    <div className="bg-surface-container-lowest p-5 editorial-shadow border-l-4 border-primary">
      <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">
        {label}
      </p>
      <div className="flex items-end gap-2 mb-1">
        <span className="font-headline text-3xl font-bold text-primary">
          {price.toLocaleString("en-US", {
            minimumFractionDigits: price < 10 ? 4 : 2,
            maximumFractionDigits: price < 10 ? 4 : 2,
          })}
        </span>
        {(currency || unit) && (
          <span className="text-xs text-secondary mb-1">{unit || currency}</span>
        )}
      </div>
      {change !== null && changePct !== null ? (
        <div
          className={`flex items-center gap-1 text-sm font-bold ${
            isUp ? "text-tertiary" : "text-error"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {isUp ? "trending_up" : "trending_down"}
          </span>
          {isUp ? "+" : ""}
          {change.toFixed(Math.abs(change) < 1 ? 4 : 2)} ({isUp ? "+" : ""}
          {changePct.toFixed(2)}%)
        </div>
      ) : (
        <p className="text-[10px] text-outline">{t.common.noChangeData}</p>
      )}
    </div>
  );
}
