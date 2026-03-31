import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 dakika cache

interface RegionConfig {
  name: string;
  country: string;
  zone: string;
  lat: number;
  lon: number;
  type: "main" | "secondary";
}

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

const REGIONS: RegionConfig[] = [
  { name: "Minas Gerais", country: "Brezilya", zone: "Ana Arabica Üretim Bölgesi", lat: -21.2, lon: -45.0, type: "main" },
  { name: "Dak Lak", country: "Vietnam", zone: "Ana Robusta Bölgesi", lat: 12.7, lon: 108.0, type: "main" },
  { name: "Huila / Nariño", country: "Kolombiya", zone: "Specialty Arabica Bölgesi", lat: 2.5, lon: -75.7, type: "main" },
  { name: "Yirgacheffe", country: "Etiyopya", zone: "Specialty Arabica", lat: 6.2, lon: 38.2, type: "secondary" },
  { name: "Sumatra", country: "Endonezya", zone: "Robusta & Arabica", lat: 2.5, lon: 99.0, type: "secondary" },
  { name: "Copán", country: "Honduras", zone: "Arabica", lat: 14.8, lon: -88.8, type: "secondary" },
  { name: "Mt. Elgon", country: "Uganda", zone: "Robusta", lat: 1.1, lon: 34.5, type: "secondary" },
];

async function fetchRegionWeather(region: RegionConfig): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=precipitation_sum&timezone=auto&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();

    const rain7d = (data.daily?.precipitation_sum as number[] || []).reduce(
      (sum: number, v: number) => sum + v,
      0
    );

    return {
      name: region.name,
      country: region.country,
      zone: region.zone,
      temp: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      rain7d: Math.round(rain7d * 10) / 10,
      type: region.type,
      updatedAt: data.current.time,
    };
  } catch {
    return {
      name: region.name,
      country: region.country,
      zone: region.zone,
      temp: null,
      humidity: null,
      windSpeed: null,
      rain7d: null,
      type: region.type,
      updatedAt: null,
    };
  }
}

export async function GET() {
  const results = await Promise.all(REGIONS.map(fetchRegionWeather));

  return NextResponse.json({
    regions: results,
    fetchedAt: new Date().toISOString(),
  });
}
