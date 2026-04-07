"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchAllPrices, type PriceItem } from "@/lib/api/commodities";
import { useTranslation } from "@/lib/i18n/context";

/* ── Unit conversion constants ── */
const LB_TO_KG = 0.45359237;
const KG_PER_BAG = 60;
const LB_PER_BAG = KG_PER_BAG / LB_TO_KG; // ~132.28 lb
const LB_PER_TON = 2204.62;

type CoffeeUnit = "cent_lb" | "usd_kg" | "usd_ton" | "usd_bag";

const unitLabels: Record<CoffeeUnit, string> = {
  cent_lb: "¢/lb",
  usd_kg: "$/kg",
  usd_ton: "$/ton",
  usd_bag: "$/60kg bag",
};

type Currency = "USD" | "BRL" | "EUR" | "TRY" | "VND" | "COP" | "ETB";

const currencyInfo: Record<Currency, { flag: string; symbol: string }> = {
  USD: { flag: "🇺🇸", symbol: "$" },
  BRL: { flag: "🇧🇷", symbol: "R$" },
  EUR: { flag: "🇪🇺", symbol: "€" },
  TRY: { flag: "🇹🇷", symbol: "₺" },
  VND: { flag: "🇻🇳", symbol: "₫" },
  COP: { flag: "🇨🇴", symbol: "COP$" },
  ETB: { flag: "🇪🇹", symbol: "Br" },
};

/** Convert input amount+unit to USD cents/lb (the base unit) */
function toBaseCentLb(amount: number, unit: CoffeeUnit): number {
  switch (unit) {
    case "cent_lb": return amount;
    case "usd_kg": return (amount / (1 / LB_TO_KG)) * 100; // $/kg → ¢/lb
    case "usd_ton": return (amount / LB_PER_TON) * 100;
    case "usd_bag": return (amount / LB_PER_BAG) * 100;
  }
}

/** Convert from USD cents/lb to target unit */
function fromBaseCentLb(centLb: number, unit: CoffeeUnit): number {
  switch (unit) {
    case "cent_lb": return centLb;
    case "usd_kg": return (centLb / 100) * (1 / LB_TO_KG);
    case "usd_ton": return (centLb / 100) * LB_PER_TON;
    case "usd_bag": return (centLb / 100) * LB_PER_BAG;
  }
}

export default function CoffeeConverter() {
  const [amount, setAmount] = useState("300");
  const [fromUnit, setFromUnit] = useState<CoffeeUnit>("cent_lb");
  const [toCurrency, setToCurrency] = useState<Currency>("BRL");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllPrices().then((data) => {
      if (data) {
        const r: Record<string, number> = { USD: 1 };
        for (const p of data.prices) {
          if (p.price === null) continue;
          if (p.label === "USD/BRL") r.BRL = p.price;
          if (p.label === "USD/VND") r.VND = p.price;
          if (p.label === "USD/COP") r.COP = p.price;
          if (p.label === "USD/ETB") r.ETB = p.price;
          if (p.label === "USD/TRY") r.TRY = p.price;
          if (p.label === "EUR/USD") r.EUR = 1 / p.price; // EUR/USD → USD/EUR
        }
        setRates(r);
      }
      setLoading(false);
    });
  }, []);

  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return null;
    const centLb = toBaseCentLb(val, fromUnit);
    const usd = centLb / 100; // USD per lb
    const rate = rates[toCurrency];
    if (!rate) return null;

    return {
      cent_lb: (centLb * rate).toFixed(2),
      usd_kg: (fromBaseCentLb(centLb, "usd_kg") * rate).toFixed(2),
      usd_ton: (fromBaseCentLb(centLb, "usd_ton") * rate).toFixed(0),
      usd_bag: (fromBaseCentLb(centLb, "usd_bag") * rate).toFixed(2),
    };
  }, [amount, fromUnit, toCurrency, rates]);

  const sym = currencyInfo[toCurrency]?.symbol || "$";

  return (
    <div>
      <h3 className="font-headline text-2xl font-bold mb-4" style={{ color: "#f5ebe7" }}>
        {t.prices.converterTitle}
      </h3>

      {/* Amount input */}
      <div className="mb-4">
        <label className="text-[11px] uppercase tracking-widest mb-1.5 block font-semibold" style={{ color: "#c9a898" }}>
          Amount
        </label>
        <div className="flex items-center p-3" style={{ backgroundColor: "#2a1610", borderBottom: "2px solid #5a3d30" }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent border-none text-2xl font-headline w-full outline-none"
            style={{ color: "#f5ebe7" }}
            placeholder="300"
          />
        </div>
      </div>

      {/* Unit selector */}
      <div className="mb-4">
        <label className="text-[11px] uppercase tracking-widest mb-1.5 block font-semibold" style={{ color: "#c9a898" }}>
          Unit
        </label>
        <div className="grid grid-cols-2 gap-1">
          {(Object.keys(unitLabels) as CoffeeUnit[]).map((u) => (
            <button
              key={u}
              onClick={() => setFromUnit(u)}
              className="py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              style={
                fromUnit === u
                  ? { backgroundColor: "#7fb3ab", color: "#2a1610" }
                  : { backgroundColor: "#2a1610", color: "#c9a898", border: "1px solid #5a3d30" }
              }
            >
              {unitLabels[u]}
            </button>
          ))}
        </div>
      </div>

      {/* Currency selector */}
      <div className="mb-5">
        <label className="text-[11px] uppercase tracking-widest mb-1.5 block font-semibold" style={{ color: "#c9a898" }}>
          Target Currency
        </label>
        <div className="grid grid-cols-4 gap-1">
          {(Object.keys(currencyInfo) as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setToCurrency(c)}
              className="py-2 text-[10px] font-bold transition-colors flex flex-col items-center gap-0.5"
              style={
                toCurrency === c
                  ? { backgroundColor: "#7fb3ab", color: "#2a1610" }
                  : { backgroundColor: "#2a1610", color: "#c9a898", border: "1px solid #5a3d30" }
              }
            >
              <span className="text-sm">{currencyInfo[c].flag}</span>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-4">
          <span className="material-symbols-outlined text-2xl animate-spin" style={{ color: "#c9a898" }}>progress_activity</span>
        </div>
      ) : result ? (
        <div className="space-y-2">
          {([
            ["cent_lb", "¢/lb"],
            ["usd_kg", "/kg"],
            ["usd_ton", "/ton"],
            ["usd_bag", "/60kg bag"],
          ] as [string, string][]).map(([key, label]) => (
            <div
              key={key}
              className="flex justify-between items-center p-2.5"
              style={{
                backgroundColor: key === fromUnit ? "#5a3d30" : "#2a1610",
                borderLeft: key === fromUnit ? "3px solid #7fb3ab" : "3px solid transparent",
              }}
            >
              <span className="text-xs" style={{ color: "#a8877a" }}>{label}</span>
              <span className="font-headline text-lg font-bold" style={{ color: "#f5ebe7" }}>
                {sym} {Number(result[key as keyof typeof result]).toLocaleString("en-US")}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs italic" style={{ color: "#a8877a" }}>Enter an amount to convert</p>
      )}

      {/* Reference */}
      <div className="mt-5 pt-4 space-y-1" style={{ borderTop: "1px solid #5a3d30" }}>
        <p className="text-[10px]" style={{ color: "#a8877a" }}>1 lb = 0.4536 kg</p>
        <p className="text-[10px]" style={{ color: "#a8877a" }}>1 bag = 60 kg = 132.28 lb</p>
        <p className="text-[10px]" style={{ color: "#a8877a" }}>1 ton = 1,000 kg = 2,204.62 lb</p>
        <p className="text-[10px] italic mt-2" style={{ color: "#a8877a" }}>{t.prices.converterNote}</p>
      </div>
    </div>
  );
}
