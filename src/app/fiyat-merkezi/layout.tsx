import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiyat Merkezi — Canlı Kahve Futures & Kur Çevirici",
  description:
    "ICE Arabica ve London Robusta futures fiyatları, aktif kontrat tablosu, USD/TRY kur çevirici, SCA premium rehberi. Canlı kahve emtia verileri.",
  keywords: [
    "arabica futures fiyat",
    "robusta fiyat",
    "kahve borsa fiyatı",
    "ICE coffee price",
    "kahve kur çevirici",
    "SCA premium",
    "kahve kontrat",
  ],
  openGraph: {
    title: "Fiyat Merkezi — WorldCoffee24",
    description: "Canlı Arabica & Robusta futures, kur çevirici, kontrat tablosu.",
  },
};

export default function FiyatMerkeziLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
