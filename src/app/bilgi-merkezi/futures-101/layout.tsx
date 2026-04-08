import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Futures 101 — Futures Trading Guide",
  description: "What are coffee futures and how do they work? A beginner's guide to understanding Arabica and Robusta futures contracts on the ICE exchange.",
  alternates: { canonical: "/bilgi-merkezi/futures-101" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
