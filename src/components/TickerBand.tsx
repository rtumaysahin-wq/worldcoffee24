"use client";

import { useEffect, useRef } from "react";

export default function TickerBand() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.textContent = JSON.stringify({
      symbols: [
        { proName: "ICEUS:KC1!", title: "Arabica" },
        { proName: "ICEEUR:RC1!", title: "Robusta" },
        { proName: "ICEUS:SB1!", title: "Sugar" },
        { proName: "FX_IDC:USDBRL", title: "USD/BRL" },
        { proName: "FX_IDC:USDVND", title: "USD/VND" },
        { proName: "FX_IDC:USDCOP", title: "USD/COP" },
        { proName: "FX_IDC:USDTRY", title: "USD/TRY" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="border-b border-outline-variant/10 overflow-hidden flex-shrink-0">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
}
