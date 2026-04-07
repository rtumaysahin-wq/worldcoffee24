"use client";

import { useEffect, useRef, useState } from "react";

interface PriceChartProps {
  title: string;
  subtitle?: string;
  symbol?: string;
}

const symbolMap: Record<string, string> = {
  arabica: "KC1!",
  robusta: "RC1!",
  sugar: "SB1!",
};

export default function PriceChart({
  title,
  subtitle,
  symbol = "arabica",
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const tvSymbol = symbolMap[symbol] || symbol;

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    setReady(false);

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.style.height = "100%";
    wrapper.style.width = "100%";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "calc(100% - 32px)";
    widgetDiv.style.width = "100%";
    wrapper.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.textContent = JSON.stringify({
      symbols: [[tvSymbol, tvSymbol]],
      chartOnly: false,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: "light",
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "Inter, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "area",
      lineWidth: 2,
      lineType: 0,
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      lineColor: "rgba(75, 44, 32, 1)",
      topColor: "rgba(75, 44, 32, 0.3)",
      bottomColor: "rgba(75, 44, 32, 0.02)",
    });
    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);

    // Wait for notification to auto-dismiss then reveal
    const timer = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(timer);
  }, [tvSymbol]);

  return (
    <div>
      <div className="mb-2">
        <h3 className="font-headline text-2xl md:text-3xl font-bold">{title}</h3>
        {subtitle && (
          <p className="text-xs text-secondary font-label uppercase tracking-widest mt-1">
            {subtitle}
          </p>
        )}
      </div>
      <div className="relative h-[420px] w-full">
        <div ref={containerRef} className="h-full w-full" />
        {!ready && (
          <div className="absolute inset-0 bg-surface-container-lowest flex items-center justify-center z-10">
            <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin">
              progress_activity
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
