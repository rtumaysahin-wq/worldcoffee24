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
import { fetchArabicaHistory, type PricePoint } from "@/lib/api/fred";

interface PriceChartProps {
  title: string;
  subtitle?: string;
  symbol?: string;
}

const periods = ["1M", "1Y", "5Y"] as const;

export default function PriceChart({ title, subtitle }: PriceChartProps) {
  const [period, setPeriod] = useState<"1M" | "1Y" | "5Y">("1Y");
  const [data, setData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArabicaHistory(period).then((points) => {
      setData(points);
      setLoading(false);
    });
  }, [period]);

  const lastPrice = data.length > 0 ? data[data.length - 1].price : 0;
  const firstPrice = data.length > 1 ? data[0].price : lastPrice;
  const change = lastPrice - firstPrice;
  const changePct = firstPrice > 0 ? (change / firstPrice) * 100 : 0;
  const isUp = change >= 0;

  return (
    <div>
      {/* Başlık + dönem seçici */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary mb-1 block">
            {subtitle || "Canli Veri"}
          </span>
          <h3 className="font-headline text-2xl md:text-3xl font-bold">{title}</h3>
        </div>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                period === p
                  ? "bg-primary text-white"
                  : "bg-surface-container-high text-secondary hover:bg-surface-container-highest"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Fiyat özeti */}
      <div className="flex items-end gap-4 mb-4">
        <span className="font-headline text-4xl font-bold text-primary">
          {lastPrice.toFixed(2)}
        </span>
        <span className="text-xs text-secondary">USD/lb</span>
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
      </div>

      {/* Grafik */}
      <div className="h-72 w-full">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin">
              progress_activity
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
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
                tick={{ fontSize: 10, fill: "#5f5e58" }}
                tickFormatter={(d: string) => {
                  const date = new Date(d);
                  if (period === "1M")
                    return date.toLocaleDateString("tr", { day: "numeric", month: "short" });
                  return date.toLocaleDateString("tr", { month: "short", year: "2-digit" });
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#5f5e58" }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                width={50}
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
                formatter={(value) => [`${Number(value).toFixed(2)} USD/lb`, "Fiyat"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#4b2c20"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
