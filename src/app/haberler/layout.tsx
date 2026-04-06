import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haberler — Kahve Piyasası Güncel Gelişmeler",
  description:
    "Küresel kahve piyasasından son haberler, editör seçimi analizler, haftalık piyasa özeti. Reuters, Bloomberg, ICO kaynaklı güncel akış.",
  keywords: [
    "kahve haberleri",
    "coffee news",
    "kahve piyasa haberleri",
    "arabica haber",
    "kahve analiz",
    "haftalık kahve özet",
    "coffee market news",
  ],
  alternates: { canonical: "/haberler" },
  openGraph: {
    title: "Haberler — WorldCoffee24",
    description: "Kahve piyasasından güncel haberler ve analizler.",
    url: "https://worldcoffee24.com/haberler",
  },
};

export default function HaberlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
