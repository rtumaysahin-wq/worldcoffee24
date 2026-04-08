"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, AreaSeries, type IChartApi, ColorType, LineType, CrosshairMode } from "lightweight-charts";
import { useCoffeeData } from "@/hooks/useCoffeeData";
import { useTranslation } from "@/lib/i18n/context";

interface CoffeeChartProps {
  title: string;
  subtitle?: string;
  symbol?: string;
  height?: number;
}

const periods = ["1M", "1Y", "5Y"] as const;

export default function CoffeeChart({
  title,
  subtitle,
  symbol = "arabica",
  height = 400,
}: CoffeeChartProps) {
  const [period, setPeriod] = useState<"1M" | "1Y" | "5Y">("1Y");
  const { data, loading, error } = useCoffeeData(symbol, period);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seriesRef = useRef<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
        fontFamily: "Inter, sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(213, 195, 189, 0.15)" },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: { color: "rgba(75, 44, 32, 0.3)", width: 1, style: 2 },
        horzLine: { color: "rgba(75, 44, 32, 0.3)", width: 1, style: 2 },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, timeVisible: false },
      handleScroll: { vertTouchDrag: false },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#4b2c20",
      lineWidth: 2,
      lineType: LineType.Curved,
      topColor: "rgba(75, 44, 32, 0.28)",
      bottomColor: "rgba(75, 44, 32, 0.02)",
      crosshairMarkerRadius: 5,
      crosshairMarkerBorderColor: "#4b2c20",
      crosshairMarkerBackgroundColor: "#fff",
      priceFormat: { type: "price", precision: 2, minMove: 0.01 },
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!seriesRef.current || data.length === 0) return;
    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  const lastPrice = data.length > 0 ? data[data.length - 1].value : null;
  const prevPrice = data.length > 1 ? data[data.length - 2].value : null;
  const change = lastPrice !== null && prevPrice !== null ? lastPrice - prevPrice : null;
  const changePct = change !== null && prevPrice ? (change / prevPrice) * 100 : null;
  const isUp = change !== null && change >= 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h3 className="font-headline text-2xl md:text-3xl font-bold">{title}</h3>
          {subtitle && (
            <p className="text-xs text-secondary font-label uppercase tracking-widest mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-1.5">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm"
              style={period === p ? { backgroundColor: "#32170d", color: "#fff" } : { backgroundColor: "#eee", color: "#333" }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {lastPrice !== null && (
        <div className="flex items-end gap-4 mb-3">
          <span className="font-headline text-4xl font-bold text-primary">{lastPrice.toFixed(2)}</span>
          <span className="text-xs text-secondary mb-1">{symbol === "robusta" ? "$/ton" : "¢/lb"}</span>
          {change !== null && changePct !== null && (
            <span className={`text-sm font-bold flex items-center gap-1 mb-0.5 ${isUp ? "text-tertiary" : "text-error"}`}>
              <span className="material-symbols-outlined text-base">{isUp ? "trending_up" : "trending_down"}</span>
              {isUp ? "+" : ""}{change.toFixed(2)} ({isUp ? "+" : ""}{changePct.toFixed(2)}%)
            </span>
          )}
        </div>
      )}

      <div className="relative" style={{ height }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80">
            <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin">progress_activity</span>
          </div>
        )}
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="material-symbols-outlined text-4xl text-error mb-2">error</span>
            <p className="text-sm text-error">{t.common.error}</p>
            <p className="text-xs text-secondary mt-1">{t.common.retry}</p>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
