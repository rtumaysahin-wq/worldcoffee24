import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bilgi Merkezi — Kahve Eğitim & Teknik Rehberler",
  description:
    "Kahve Futures 101, işleme yöntemleri, Arabica vs Robusta, sektör sözlüğü. Üreticiler, traderlar ve kahve profesyonelleri için derinlemesine eğitim.",
  keywords: [
    "kahve futures 101",
    "kahve eğitim",
    "arabica robusta fark",
    "kahve işleme yöntemleri",
    "washed natural honey process",
    "kahve sözlük",
    "coffee education",
    "Q-grader",
  ],
  alternates: { canonical: "/bilgi-merkezi" },
  openGraph: {
    title: "Bilgi Merkezi — WorldCoffee24",
    description: "Kahve sektörü eğitim kaynakları, teknik rehberler ve sözlük.",
    url: "https://worldcoffee24.com/bilgi-merkezi",
  },
};

export default function BilgiMerkeziLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
