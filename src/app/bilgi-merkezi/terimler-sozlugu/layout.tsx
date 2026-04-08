import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Glossary — A to Z",
  description: "Comprehensive glossary of 30+ coffee trading and production terms. Arabica, Robusta, futures, hedging, cupping, SCA, differentials and more.",
  alternates: { canonical: "/bilgi-merkezi/terimler-sozlugu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
