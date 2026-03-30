"use client";

interface PriceCardProps {
  label: string;
  price: number;
  change: number;
  changePct: number;
  currency?: string;
}

export default function PriceCard({
  label,
  price,
  change,
  changePct,
  currency = "",
}: PriceCardProps) {
  const isUp = change >= 0;

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
        {currency && (
          <span className="text-xs text-secondary mb-1">{currency}</span>
        )}
      </div>
      <div
        className={`flex items-center gap-1 text-sm font-bold ${
          isUp ? "text-tertiary" : "text-error"
        }`}
      >
        <span className="material-symbols-outlined text-base">
          {isUp ? "trending_up" : "trending_down"}
        </span>
        {isUp ? "+" : ""}
        {change.toFixed(change < 1 ? 4 : 2)} ({isUp ? "+" : ""}
        {changePct.toFixed(2)}%)
      </div>
    </div>
  );
}
