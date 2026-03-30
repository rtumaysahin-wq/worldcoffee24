import Link from "next/link";

const footerLinks = [
  { href: "/gizlilik", labelTR: "Gizlilik Politikasi", labelEN: "Privacy Policy" },
  { href: "/kullanim-kosullari", labelTR: "Kullanim Kosullari", labelEN: "Terms of Service" },
  { href: "/api-docs", labelTR: "API Documentation", labelEN: "API Documentation" },
  { href: "/iletisim", labelTR: "Uzmanla Iletisim", labelEN: "Contact Expert" },
];

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/15 bg-[#f4fafe]">
      <div className="w-full py-10 px-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-screen-2xl mx-auto">
        {/* Sol: Logo + Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">coffee</span>
            <span className="font-headline text-primary font-bold text-base leading-tight">
              World<span className="text-primary-container">Coffee</span>24
            </span>
          </Link>
          <p className="text-slate-400 text-xs mt-1">
            &copy; 2024 WorldCoffee24.com. All rights reserved.
          </p>
        </div>

        {/* Sag: Linkler */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-[#4B2C20] text-xs transition-colors"
            >
              {link.labelTR}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
