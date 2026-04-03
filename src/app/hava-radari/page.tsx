"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const CoffeeMap = dynamic(() => import("@/components/CoffeeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[500px] bg-surface-container-low flex items-center justify-center">
      <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin">progress_activity</span>
    </div>
  ),
});

interface WeatherData {
  name: string;
  country: string;
  zone: string;
  temp: number | null;
  humidity: number | null;
  windSpeed: number | null;
  rain7d: number | null;
  type: "main" | "secondary";
  updatedAt: string | null;
}

function getWeatherIcon(temp: number | null, rain7d: number | null): string {
  if (temp === null) return "cloud";
  if (rain7d !== null && rain7d > 50) return "thunderstorm";
  if (rain7d !== null && rain7d > 20) return "rainy";
  if (temp > 30) return "sunny";
  if (rain7d !== null && rain7d > 10) return "partly_cloudy_day";
  return "partly_cloudy_day";
}

function getWeatherLabel(temp: number | null, rain7d: number | null): string {
  if (temp === null) return "—";
  if (rain7d !== null && rain7d > 50) return "Şiddetli Yağış";
  if (rain7d !== null && rain7d > 20) return "Yağışlı";
  if (temp > 30 && rain7d !== null && rain7d < 10) return "Sıcak / Kurak";
  if (rain7d !== null && rain7d > 10) return "Parçalı Bulutlu";
  return "Açık";
}

function getIconColor(icon: string): string {
  if (icon === "sunny") return "text-yellow-600";
  if (icon === "rainy" || icon === "thunderstorm") return "text-tertiary";
  return "text-secondary";
}

export default function HavaRadari() {
  const [regions, setRegions] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedAt, setFetchedAt] = useState("");

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.regions && data.regions.length > 0) {
          setRegions(data.regions);
          setFetchedAt(data.fetchedAt);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const mainRegions = regions.filter((r) => r.type === "main");
  const secondaryRegions = regions.filter((r) => r.type === "secondary");

  const updatedTime = fetchedAt
    ? new Date(fetchedAt).toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })
    : "—";

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10 md:py-12">

          {/* ═══ HEADER ═══ */}
          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-3 block">
                  Canlı İzleme
                </span>
                <h1 className="font-headline text-4xl md:text-5xl font-light text-primary leading-none mb-3">
                  Hava Radarı &amp; İklim
                </h1>
                <p className="text-secondary text-sm md:text-base">
                  Başlıca kahve üretim bölgelerinin anlık hava durumu ve tahminleri.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3">
                <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">
                  Canlı &bull; Son güncelleme: {updatedTime}
                </span>
              </div>
            </div>
          </header>
        </div>

        {/* ═══ İNTERAKTİF HARİTA — TAM GENİŞLİK ═══ */}
        <section className="mb-10">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-primary">map</span>
              <h2 className="font-headline text-2xl font-bold text-primary">Üretim Bölgeleri Haritası</h2>
              <div className="h-px flex-1 bg-outline-variant/20" />
            </div>
            <p className="text-sm text-secondary mt-2">
              Marker&apos;lara tıklayarak bölge detaylarını ve canlı hava durumunu görün.
            </p>
          </div>
          <div className="w-full h-[300px] md:h-[500px]">
            <CoffeeMap />
          </div>
        </section>

        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-10 md:pb-12">
          {loading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-surface-container-lowest p-8 editorial-shadow animate-pulse">
                    <div className="h-4 bg-surface-container-high rounded w-16 mb-4" />
                    <div className="h-6 bg-surface-container-high rounded w-32 mb-6" />
                    <div className="h-12 bg-surface-container-high rounded w-20 mb-6" />
                    <div className="space-y-3">
                      <div className="h-4 bg-surface-container-high rounded w-full" />
                      <div className="h-4 bg-surface-container-high rounded w-full" />
                      <div className="h-4 bg-surface-container-high rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="bg-surface-container-lowest p-10 text-center editorial-shadow">
              <span className="material-symbols-outlined text-4xl text-error mb-3 block">error</span>
              <p className="text-sm text-error font-bold mb-1">Hava durumu verileri yüklenemedi</p>
              <p className="text-xs text-secondary">Lütfen daha sonra tekrar deneyin.</p>
            </div>
          ) : (
            <>
              {/* ═══ 3 ANA BÖLGE KARTLARI ═══ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {mainRegions.map((region, i) => {
                  const icon = getWeatherIcon(region.temp, region.rain7d);
                  const weatherLabel = getWeatherLabel(region.temp, region.rain7d);
                  return (
                    <div key={i} className="bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1">
                            {region.country}
                          </p>
                          <h3 className="font-headline text-2xl text-primary">{region.name}</h3>
                          <p className="text-xs text-secondary mt-1">{region.zone}</p>
                        </div>
                        <span className={`material-symbols-outlined text-5xl ${getIconColor(icon)}`}>
                          {icon}
                        </span>
                      </div>
                      {region.temp !== null ? (
                        <>
                          <div className="flex items-end gap-3 mb-6">
                            <span className="font-headline text-5xl md:text-6xl text-primary">{region.temp}</span>
                            <div className="pb-2">
                              <span className="font-headline text-2xl text-secondary">°C</span>
                              <p className="text-xs text-secondary">{weatherLabel}</p>
                            </div>
                          </div>
                          <div className="space-y-3 border-t border-outline-variant/20 pt-5">
                            <div className="flex justify-between text-sm">
                              <span className="text-secondary">Nem</span>
                              <b className={region.humidity !== null && region.humidity > 85 ? "text-error" : ""}>
                                {region.humidity !== null ? `${region.humidity}%` : "—"}
                              </b>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-secondary">Rüzgar</span>
                              <b>{region.windSpeed !== null ? `${region.windSpeed} km/h` : "—"}</b>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-secondary">Yağış (7 gün)</span>
                              <b className={region.rain7d !== null && region.rain7d > 40 ? "text-tertiary" : ""}>
                                {region.rain7d !== null ? `${region.rain7d}mm` : "—"}
                              </b>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-error">Veri yüklenemedi</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ═══ DİĞER ÜRETİM BÖLGELERİ ═══ */}
              <h2 className="font-headline text-2xl font-bold text-primary mb-5">
                Diğer Üretim Bölgeleri
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 mb-10">
                {secondaryRegions.map((r, i) => {
                  const icon = getWeatherIcon(r.temp, r.rain7d);
                  return (
                    <div key={i} className="bg-surface-container-lowest p-6">
                      <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                        {r.country} — {r.name}
                      </p>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`material-symbols-outlined text-2xl ${getIconColor(icon)}`}>{icon}</span>
                        <span className="font-headline text-2xl font-bold">
                          {r.temp !== null ? `${r.temp}°C` : "—"}
                        </span>
                      </div>
                      <p className="text-xs text-secondary">
                        Yağış: {r.rain7d !== null ? `${r.rain7d}mm` : "—"}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* ═══ ENSO DURUMU ═══ */}
              <div className="bg-primary-container text-white p-5 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                <div>
                  <h3 className="font-headline text-3xl mb-3">ENSO Durumu</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    El Niño&rsquo;dan nötr koşullara geçiş. La Niña oluşma olasılığı önümüzdeki 6 ay için %65-70 arasında.
                  </p>
                  <span className="inline-block bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                    Nötr → La Niña Geçişi
                  </span>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-8">
                  <p className="text-[10px] font-label uppercase tracking-widest text-white/70 mb-4">
                    Beklenen Etki
                  </p>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm mt-0.5">arrow_right</span>
                      Brezilya: Artan yağış, çiçeklenme gecikmesi
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm mt-0.5">arrow_right</span>
                      Vietnam: Kuraklık riskinde azalma
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm mt-0.5">arrow_right</span>
                      Kolombiya: Mitaca hasadında olumlu koşullar
                    </li>
                  </ul>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-8">
                  <p className="text-[10px] font-label uppercase tracking-widest text-white/70 mb-4">
                    Fiyat Etkisi
                  </p>
                  <p className="font-headline text-2xl italic mb-3">Yukarı Yönlü Baskı</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    La Niña geçişi Arabica arzını kısıtlayarak orta vadede fiyatlarda yukarı yönlü baskı oluşturabilir.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
        <Footer />
      </div>
    </>
  );
}
