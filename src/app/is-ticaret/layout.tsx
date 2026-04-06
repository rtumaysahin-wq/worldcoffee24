import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İş & Ticaret — Kahve Alım Satım Platformu",
  description:
    "Kahve alıcı ve satıcıları için ilan panosu, tedarikçi dizini, Incoterms rehberi, sertifika bilgileri. Rainforest, Fair Trade, Organic.",
  keywords: [
    "kahve ticaret",
    "coffee trade",
    "kahve alım satım",
    "kahve tedarikçi",
    "green coffee trade",
    "Incoterms kahve",
    "FOB kahve",
    "Rainforest Alliance",
    "Fair Trade coffee",
  ],
  alternates: { canonical: "/is-ticaret" },
  openGraph: {
    title: "İş & Ticaret — WorldCoffee24",
    description: "Kahve alım satım ilanları, tedarikçi dizini ve ticaret rehberi.",
    url: "https://worldcoffee24.com/is-ticaret",
  },
};

export default function IsTicaretLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
