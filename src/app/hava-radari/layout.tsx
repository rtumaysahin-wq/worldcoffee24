import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hava Radarı — Kahve Üretim Bölgeleri İklim Verileri",
  description:
    "Brezilya, Vietnam, Kolombiya ve diğer kahve üretim bölgelerinin anlık hava durumu, don riski uyarıları ve ENSO tahminleri.",
  keywords: [
    "kahve hava durumu",
    "coffee weather",
    "Minas Gerais hava",
    "don riski kahve",
    "frost risk coffee",
    "ENSO La Nina kahve",
    "kahve üretim bölgeleri",
  ],
  openGraph: {
    title: "Hava Radarı — WorldCoffee24",
    description: "Kahve üretim bölgelerinin anlık hava durumu ve iklim verileri.",
  },
};

export default function HavaRadariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
