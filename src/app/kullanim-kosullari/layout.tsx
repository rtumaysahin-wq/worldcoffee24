import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "WorldCoffee24.com terms of use — site usage conditions, disclaimer and legal information.",
  alternates: { canonical: "/kullanim-kosullari" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
