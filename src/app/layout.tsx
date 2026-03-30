import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WorldCoffee24.com — Küresel Kahve Piyasa Platformu",
  description:
    "Canlı kahve fiyatları, piyasa analizleri, haberler ve eğitim içerikleri. Arabica & Robusta futures, döviz kurları, üretim bölgeleri hava durumu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${newsreader.variable} ${inter.variable}`}>
      <head>
        {/* Material Symbols — ikon fontu */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  );
}
