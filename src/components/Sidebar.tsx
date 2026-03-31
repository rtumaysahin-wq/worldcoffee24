"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/", icon: "home", labelTR: "Ana Sayfa", labelEN: "Home" },
  { href: "/fiyat-merkezi", icon: "payments", labelTR: "Fiyat Merkezi", labelEN: "Price Hub" },
  { href: "/piyasa-faktorleri", icon: "account_tree", labelTR: "Piyasa Faktörleri", labelEN: "Market Factors" },
  { href: "/hava-radari", icon: "cloudy_snowing", labelTR: "Hava Radarı", labelEN: "Weather Radar" },
  { href: "/bilgi-merkezi", icon: "menu_book", labelTR: "Bilgi Merkezi", labelEN: "Learn" },
  { href: "/haberler", icon: "newspaper", labelTR: "Haberler", labelEN: "News" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 pt-16 bg-[#4B2C20] flex-col z-40">
      {/* Logo / Brand */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-primary-fixed-dim text-2xl">coffee</span>
        <div>
          <span className="font-headline text-white font-bold text-sm leading-tight">
            World<span className="text-primary-fixed-dim">Coffee</span>24
          </span>
          <div className="text-[9px] uppercase tracking-[0.12em] text-[rgba(213,195,189,0.6)] mt-0.5">
            Market Intelligence
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sb-item rounded-sm ${isActive ? "active" : ""}`}
            >
              <span className="material-symbols-outlined text-xl">{link.icon}</span>
              <span className="font-label text-xs uppercase tracking-widest">
                {link.labelTR}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Alt boşluk */}
      <div className="p-4" />
    </aside>
  );
}
