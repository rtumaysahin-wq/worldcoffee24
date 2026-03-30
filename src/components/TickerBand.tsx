"use client";

import { useEffect, useRef } from "react";

export default function TickerBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptAppended = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptAppended.current) return;
    scriptAppended.current = true;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.textContent = JSON.stringify({
      symbols: [
        { proName: "ICEUS:KC1!", title: "Arabica Coffee" },
        { proName: "ICEEUR:RC1!", title: "Robusta Coffee" },
        { proName: "FX_IDC:USDTRY", title: "USD/TRY" },
        { proName: "FX_IDC:EURTRY", title: "EUR/TRY" },
        { proName: "FX_IDC:BRLUSD", title: "BRL/USD" },
        { proName: "NYMEX:SI1!", title: "Sugar #11" },
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
    <div className="tradingview-widget-container border-b border-outline-variant/10 flex-shrink-0" ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
