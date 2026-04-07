"use client";

import { useEffect, useRef } from "react";

interface PriceCardProps {
  label: string;
  symbol: string;
}

export default function PriceCard({ label, symbol }: PriceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = true;
    script.textContent = JSON.stringify({
      symbol,
      width: "100%",
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="bg-surface-container-lowest editorial-shadow border-l-4 border-primary min-w-[200px]">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
}
