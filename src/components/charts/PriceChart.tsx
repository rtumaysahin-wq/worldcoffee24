"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { fetchPriceHistory, type PricePoint } from "@/lib/api/fred";

/* Recharts SVG text — Tailwind v4 global stilleri SVG fill'i eziyor,
   bu yüzden custom tick component ile inline style kullanıyoruz */
function CustomTick({ x, y, payload, isY }: { x: number; y: number; payload: { value: string | number }; isY?: boolean }) {
  return (
    <text
      x={x}
      y={y}
      dy={isY ? 4 : 16}
      textAnchor={isY ? "end" : "middle"}
      style={{ fontSize: 11, fill: "#666666", fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {payload.value}
    </text>
  );
}

interface PriceChartProps {
  title: string;
  subtitle?: string;
  symbol?: string;
}

const periods = ["1M", "1Y", "5Y"] as const;

export default function PriceChart({
  title,
  subtitle,
  symbol = "arabica",
}: PriceChartProps) {
  const [period, setPeriod] = useState<"1M" | "1Y" | "5Y">("1Y");
  const [data, setData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchPriceHistory(symbol, period).then((points) => {
      if (points.length === 0) {
        setError(true);
      } else {
        setData(points);
      }
      setLoading(false);
    });
  }, [symbol, period]);

  const lastPrice = data.length > 0 ? data[data.length - 1].price : null;
  // Son iki veri noktası arasındaki günlük değişim
  const prevPrice = data.length > 1 ? data[data.length - 2].price : null;
  const change =
    lastPrice !== null && prevPrice !== null ? lastPrice - prevPrice : null;
  const changePct =
    change !== null && prevPrice !== null && prevPrice > 0
      ? (change / prevPrice) * 100
      : null;
  const isUp = change !== null && change >= 0;

  return (
    <div>
      {/* Başlık + dönem seçici */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-1 block">
            {subtitle || "Canlı Veri"}
          </span>
          <h3 className="font-headline text-2xl md:text-3xl font-bold">
            {title}
          </h3>
        </div>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
              style={
                period === p
                  ? { backgroundColor: "#32170d", color: "#ffffff" }
                  : { backgroundColor: "#dde3e7", color: "#161d1f" }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Fiyat özeti */}
      {lastPrice !== null && (
        <div className="flex items-end gap-4 mb-4">
          <span className="font-headline text-4xl font-bold text-primary">
            {lastPrice.toFixed(2)}
          </span>
          <span className="text-xs text-secondary">USD/lb</span>
          {change !== null && changePct !== null && (
            <span
              className={`text-sm font-bold flex items-center gap-1 ${
                isUp ? "text-tertiary" : "text-error"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isUp ? "trending_up" : "trending_down"}
              </span>
              {isUp ? "+" : ""}
              {change.toFixed(2)} ({isUp ? "+" : ""}
              {changePct.toFixed(2)}%)
            </span>
          )}
        </div>
      )}

      {/* Grafik */}
      <div className="h-72 w-full">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin">
              progress_activity
            </span>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-4xl text-error mb-2">
              error
            </span>
            <p className="text-sm">Veri yüklenemedi</p>
            <p className="text-xs text-outline mt-1">
              Lütfen daha sonra tekrar deneyin
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`grad-${symbol}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4b2c20" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4b2c20" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#d5c3bd"
                opacity={0.3}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={(props: Record<string, unknown>) => {
                  const d = String(props.payload && typeof props.payload === 'object' && 'value' in props.payload ? (props.payload as {value: string}).value : '');
                  const date = new Date(d);
                  const label = period === "1M"
                    ? date.toLocaleDateString("tr", { day: "numeric", month: "short" })
                    : date.toLocaleDateString("tr", { month: "short", year: "2-digit" });
                  return <CustomTick x={props.x as number} y={props.y as number} payload={{ value: label }} />;
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={(props: Record<string, unknown>) => (
                  <CustomTick x={props.x as number} y={props.y as number} payload={{ value: (props.payload as {value: number}).value }} isY />
                )}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                width={55}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#32170d",
                  border: "none",
                  borderRadius: "2px",
                  color: "white",
                  fontSize: "12px",
                }}
                labelFormatter={(d) =>
                  new Date(String(d)).toLocaleDateString("tr", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }
                formatter={(value) => [
                  `${Number(value).toFixed(2)} USD/lb`,
                  "Fiyat",
                ]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#4b2c20"
                strokeWidth={2}
                fill={`url(#grad-${symbol})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
