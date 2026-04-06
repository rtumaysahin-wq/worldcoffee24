import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Piyasa Faktörleri — İklim, Üretim & Makro Dinamikler",
  description:
    "Kahve piyasasını etkileyen kritik faktörler: ENSO durumu, Brezilya hasat döngüsü, don riski, BRL/USD kur etkisi, COT raporu, ICE stokları.",
  keywords: [
    "kahve piyasa faktörleri",
    "ENSO kahve",
    "brezilya kahve hasat",
    "don riski kahve",
    "COT raporu kahve",
    "ICE certified stocks",
    "kahve arz talep",
  ],
  alternates: { canonical: "/piyasa-faktorleri" },
  openGraph: {
    title: "Piyasa Faktörleri — WorldCoffee24",
    description: "İklim, üretim ve makro ekonomik faktörlerin kahve piyasasına etkisi.",
    url: "https://worldcoffee24.com/piyasa-faktorleri",
  },
};

export default function PiyasaFaktorleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
