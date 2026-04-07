"use client";

import { useEffect, useRef, useState } from "react";

interface PriceCardProps {
  label: string;
  symbol: string;
}

export default function PriceCard({ label, symbol }: PriceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    setReady(false);

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

    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, [symbol]);

  return (
    <div className="bg-surface-container-lowest editorial-shadow border-l-4 border-primary min-w-[200px] relative overflow-hidden min-h-[80px]">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
      {!ready && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <span className="material-symbols-outlined text-xl text-outline-variant animate-spin">
            progress_activity
          </span>
        </div>
      )}
    </div>
  );
}
