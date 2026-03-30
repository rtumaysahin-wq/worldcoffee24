"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NewsItem {
  title: string;
  summary: string;
  link: string;
  date: string;
  source: string;
}

const sourceColors: Record<string, string> = {
  "Daily Coffee News": "bg-primary",
  "Sprudge": "bg-tertiary",
  "Perfect Daily Grind": "bg-secondary",
  "Google News": "bg-on-tertiary-container",
};

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.news) setNews(data.news.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">Son Haberler</h3>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-container-lowest p-5 editorial-shadow animate-pulse">
            <div className="h-3 bg-surface-container-high rounded w-16 mb-3" />
            <div className="h-5 bg-surface-container-high rounded w-3/4 mb-2" />
            <div className="h-3 bg-surface-container-high rounded w-full" />
          </div>
        ))}
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">Son Haberler</h3>
        <Link
          href="/haberler"
          className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary flex items-center gap-1"
        >
          Tum Haberler
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="space-y-3">
        {news.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-surface-container-lowest p-5 editorial-shadow hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white ${
                  sourceColors[item.source] || "bg-primary-container"
                }`}
              >
                {item.source}
              </span>
              {item.date && (
                <span className="text-[10px] text-outline">
                  {new Date(item.date).toLocaleDateString("tr", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>
            <h4 className="font-headline text-base md:text-lg leading-snug hover:text-primary transition-colors">
              {item.title}
            </h4>
          </a>
        ))}
      </div>
    </section>
  );
}
