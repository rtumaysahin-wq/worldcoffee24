"use client";

import { useState, useEffect } from "react";

export interface CoffeePoint {
  time: string; // "YYYY-MM-DD"
  value: number;
}

interface UseCoffeeDataResult {
  data: CoffeePoint[];
  loading: boolean;
  error: string | null;
}

export function useCoffeeData(
  symbol: string = "arabica",
  period: string = "1Y"
): UseCoffeeDataResult {
  const [data, setData] = useState<CoffeePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/prices/history?symbol=${symbol}&period=${period}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (!json.points || json.points.length === 0) {
          setError("No data available");
          setData([]);
        } else {
          setData(
            json.points.map((p: { date: string; price: number }) => ({
              time: p.date,
              value: p.price,
            }))
          );
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to load data");
        setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [symbol, period]);

  return { data, loading, error };
}
