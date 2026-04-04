"use client";

import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
  title: string;
  subtitle?: string;
  height?: number;
}

export default function TradingViewChart({
  symbol,
  title,
  subtitle,
  height = 400,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Europe/Istanbul",
      theme: "light",
      style: "3",
      locale: "tr",
      allow_symbol_change: false,
      hide_top_toolbar: true,
      hide_legend: true,
      hide_side_toolbar: true,
      hide_volume: true,
      save_image: false,
      calendar: false,
      backgroundColor: "rgba(255, 255, 255, 1)",
      gridColor: "rgba(213, 195, 189, 0.15)",
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-1 block">
            {subtitle || "TradingView"}
          </span>
          <h3 className="font-headline text-2xl md:text-3xl font-bold">
            {title}
          </h3>
        </div>
      </div>
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height, width: "100%" }}
      />
    </div>
  );
}
