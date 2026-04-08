import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Processing Methods — Washed, Natural, Honey",
  description: "Coffee processing methods guide: Washed, Natural, Honey, Anaerobic fermentation. How each method affects the flavor profile.",
  alternates: { canonical: "/bilgi-merkezi/isleme-yontemleri" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
