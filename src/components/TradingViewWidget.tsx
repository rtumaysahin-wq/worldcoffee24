"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol: string;
  height?: number;
  mini?: boolean;
}

export default function TradingViewWidget({
  symbol,
  height = 400,
  mini = false,
}: TradingViewWidgetProps) {
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
      style: "1",
      locale: "tr",
      hide_top_toolbar: mini,
      hide_legend: mini,
      allow_symbol_change: !mini,
      save_image: false,
      calendar: false,
      height,
      width: "100%",
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, [symbol, height, mini]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ height, width: "100%" }}
    />
  );
}
