"use client";

import { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  symbol: string;
  height?: number;
  mini?: boolean;
}

function TradingViewWidgetInner({
  symbol,
  height = 400,
  mini = false,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = `${height}px`;
    widgetDiv.style.width = "100%";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: false,
      height,
      width: "100%",
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
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, height, mini]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div
        className="tradingview-widget-container__widget"
        style={{ height, width: "100%" }}
      />
    </div>
  );
}

const TradingViewWidget = memo(TradingViewWidgetInner);
export default TradingViewWidget;
