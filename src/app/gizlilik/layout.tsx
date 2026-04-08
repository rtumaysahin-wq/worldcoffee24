import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "WorldCoffee24.com privacy policy — personal data protection and cookie usage information.",
  alternates: { canonical: "/gizlilik" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
