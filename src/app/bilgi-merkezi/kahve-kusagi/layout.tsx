import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Coffee Belt & Geography — Producing Countries Guide",
  description: "World coffee belt map, major producing countries, climate conditions and regional flavor profiles. Brazil, Colombia, Ethiopia, Vietnam.",
  alternates: { canonical: "/bilgi-merkezi/kahve-kusagi" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
