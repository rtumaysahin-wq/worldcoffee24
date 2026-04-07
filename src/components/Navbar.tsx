"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/context";

export default function Navbar() {
  const { locale, t, setLocale } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/fiyat-merkezi", label: t.nav.prices },
    { href: "/piyasa-faktorleri", label: t.nav.market },
    { href: "/hava-radari", label: t.nav.weather },
    { href: "/bilgi-merkezi", label: t.nav.learn },
    { href: "/haberler", label: t.nav.news },
  ];

  const toggleLang = () => setLocale(locale === "tr" ? "en" : "tr");

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
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sağ: Arama, butonlar */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Arama kutusu - sadece geniş ekran */}
          <a href="/bilgi-merkezi/terimler-sozlugu" className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
              search
            </span>
            <div className="bg-surface-variant/50 border-none rounded pl-10 pr-4 py-1.5 text-sm w-52 text-secondary cursor-pointer hover:bg-surface-variant transition-colors">
              {t.nav.search}
            </div>
          </a>

          {/* Dil Değiştirme */}
          <button
            onClick={toggleLang}
            className="text-xs font-bold text-primary-container border border-outline-variant/50 px-3 py-1.5 hover:bg-surface-container transition-colors rounded"
          >
            {locale === "tr" ? "EN" : "TR"}
          </button>

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
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
