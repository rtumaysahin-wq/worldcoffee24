"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", labelTR: "Dashboard", labelEN: "Dashboard" },
  { href: "/fiyat-merkezi", labelTR: "Fiyat Merkezi", labelEN: "Price Hub" },
  { href: "/piyasa-faktorleri", labelTR: "Piyasa Faktörleri", labelEN: "Market Factors" },
  { href: "/hava-radari", labelTR: "Hava Radarı", labelEN: "Weather Radar" },
  { href: "/bilgi-merkezi", labelTR: "Bilgi Merkezi", labelEN: "Learn" },
  { href: "/haberler", labelTR: "Haberler", labelEN: "News" },
];

export default function Navbar() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleLang = () => setLang(lang === "tr" ? "en" : "tr");

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f4fafe]/90 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-16 max-w-screen-2xl mx-auto">

        {/* Sol: Logo + Nav Linkleri */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-3xl">coffee</span>
            <span className="font-headline text-primary font-bold text-lg leading-tight">
              World<span className="text-primary-container">Coffee</span>24
            </span>
          </Link>

          {/* Desktop Nav Linkleri */}
          <div className="hidden md:flex gap-7 h-full items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm cursor-pointer pb-1 transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary-container font-bold border-b-2 border-primary-container"
                      : "text-[#64748b]"
                  }`}
                >
                  {lang === "tr" ? link.labelTR : link.labelEN}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sağ: Arama, butonlar */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Arama kutusu - sadece geniş ekran */}
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
              search
            </span>
            <input
              className="bg-surface-variant/50 border-none rounded pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary w-52 outline-none"
              placeholder={lang === "tr" ? "Piyasalarda ara..." : "Search markets..."}
              type="text"
            />
          </div>

          {/* Bildirimler */}
          <button className="material-symbols-outlined text-primary-container hover:bg-surface-container p-2 rounded-full transition-all text-xl">
            notifications
          </button>

          {/* Ayarlar */}
          <button className="material-symbols-outlined text-primary-container hover:bg-surface-container p-2 rounded-full transition-all text-xl hidden md:block">
            settings
          </button>

          {/* Dil Değiştirme */}
          <button
            onClick={toggleLang}
            className="text-xs font-bold text-primary-container border border-outline-variant/50 px-3 py-1.5 hover:bg-surface-container transition-colors rounded"
          >
            {lang === "tr" ? "EN" : "TR"}
          </button>

          {/* Kullanıcı Avatarı */}
          <div className="w-8 h-8 rounded-full bg-primary-fixed-dim border border-outline-variant/30 flex items-center justify-center font-bold text-primary text-xs">
            RT
          </div>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="material-symbols-outlined text-primary-container md:hidden p-2"
          >
            {mobileOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/10 px-4 py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 text-sm transition-colors ${
                  isActive
                    ? "text-primary-container font-bold"
                    : "text-[#64748b] hover:text-primary"
                }`}
              >
                {lang === "tr" ? link.labelTR : link.labelEN}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
