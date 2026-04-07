"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { tr } from "./locales/tr";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { pt } from "./locales/pt";
import { zh } from "./locales/zh";
import { ar } from "./locales/ar";

export type Locale = "en" | "tr" | "es" | "pt" | "zh" | "ar";
type Translations = typeof en;

export interface LocaleOption {
  code: Locale;
  label: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const localeOptions: LocaleOption[] = [
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "pt", label: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "zh", label: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
];

const allLocales: Locale[] = localeOptions.map((o) => o.code);

interface I18nContextType {
  locale: Locale;
  t: Translations;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
}

const translations: Record<Locale, Translations> = { en, tr, es, pt, zh, ar };

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  t: en,
  dir: "ltr",
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("wc24-lang") as Locale | null;
    if (saved && allLocales.includes(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = localeOptions.find((o) => o.code === saved)?.dir || "ltr";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("wc24-lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = localeOptions.find((o) => o.code === l)?.dir || "ltr";
  }, []);

  const dir = localeOptions.find((o) => o.code === locale)?.dir || "ltr";

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], dir, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
