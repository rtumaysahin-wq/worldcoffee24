"use client";

import { useEffect, useRef } from "react";

interface PriceCardProps {
  label: string;
  symbol: string;
}

const symbolMap: Record<string, string> = {
  "ICEUS:KC1!": "TVC:KC1!",
  "ICEEUR:RC1!": "TVC:RC1!",
};

export default function PriceCard({ label, symbol }: PriceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tvSymbol = symbolMap[symbol] || symbol;

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = true;
    script.textContent = JSON.stringify({
      symbol: tvSymbol,
      width: "100%",
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, [tvSymbol]);

  return (
    <div className="bg-surface-container-lowest editorial-shadow border-l-4 border-primary min-w-[200px]">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
}
