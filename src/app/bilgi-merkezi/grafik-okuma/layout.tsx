import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chart Reading Guide — Technical Analysis Fundamentals",
  description: "Commodity chart reading guide: Candlestick, support/resistance, trend lines, moving averages. Technical analysis for coffee traders.",
  alternates: { canonical: "/bilgi-merkezi/grafik-okuma" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
