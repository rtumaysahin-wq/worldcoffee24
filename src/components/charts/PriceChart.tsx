"use client";

import { useEffect, useRef } from "react";

interface PriceChartProps {
  title: string;
  subtitle?: string;
  symbol?: string;
}

const symbolMap: Record<string, string> = {
  arabica: "TVC:KC1!",
  robusta: "TVC:RC1!",
  sugar: "TVC:SB1!",
};

export default function PriceChart({
  title,
  subtitle,
  symbol = "arabica",
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tvSymbol = symbolMap[symbol] || symbol;

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

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
      <div ref={containerRef} className="h-[420px] w-full" />
    </div>
  );
}
