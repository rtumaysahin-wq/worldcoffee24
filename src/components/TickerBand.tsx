"use client";

// Şimdilik statik veriler — Faz 2'de API'den canlı gelecek
const tickerItems = [
  { label: "Arabica Coffee", value: "184.25", change: "+1.24%", up: true },
  { label: "Robusta Coffee", value: "2,412.00", change: "-0.85%", up: false },
  { label: "USD/TRY", value: "32.44", change: "+0.05%", up: true },
  { label: "Sugar #11", value: "21.45", change: "+2.10%", up: true },
  { label: "BRL/USD", value: "5.12", change: "-0.45%", up: false },
];

function TickerItem({ label, value, change, up }: (typeof tickerItems)[0]) {
  return (
    <span className="flex items-center gap-2 shrink-0">
      <span className="font-label uppercase tracking-widest text-secondary text-[11px]">
        {label}
      </span>
      <span className="font-bold text-[11px]">{value}</span>
      <span
        className={`font-bold text-[11px] flex items-center gap-0.5 ${
          up ? "text-tertiary" : "text-error"
        }`}
      >
        <span className="material-symbols-outlined text-sm">
          {up ? "trending_up" : "trending_down"}
        </span>
        {change}
      </span>
    </span>
  );
}

export default function TickerBand() {
  // Bandı iki kez tekrarlıyoruz — sonsuz kayma efekti için
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
