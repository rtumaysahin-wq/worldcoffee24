"use client";

import { useEffect, useRef, useState } from "react";

interface PriceChartProps {
  title: string;
  subtitle?: string;
  symbol?: string;
}

const symbolMap: Record<string, string> = {
  arabica: "ICEUS:KC1!",
  robusta: "ICEEUR:RC1!",
  sugar: "ICEUS:SB1!",
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
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(255, 255, 255, 1)",
      gridColor: "rgba(213, 195, 189, 0.15)",
    });
    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);

    // Overlay hides the TradingView notification popup during load
    const timer = setTimeout(() => setReady(true), 5000);
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
      <div className="relative h-[400px] w-full overflow-hidden">
        <div ref={containerRef} className="h-full w-full" />
        {!ready && (
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10">
            <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin mb-3">
              progress_activity
            </span>
            <p className="text-xs text-secondary">Loading chart...</p>
          </div>
        )}
      </div>
    </div>
  );
}
