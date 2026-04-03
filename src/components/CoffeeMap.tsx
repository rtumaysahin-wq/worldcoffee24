"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface RegionWeather {
  name: string;
  country: string;
  temp: number | null;
  humidity: number | null;
  rain7d: number | null;
}

interface MarkerData {
  name: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  type: string;
  harvest: string;
  priceNote: string;
}

const regions: MarkerData[] = [
  {
    name: "Minas Gerais",
    country: "Brezilya",
    flag: "🇧🇷",
    lat: -21.2,
    lng: -45.0,
    type: "Arabica",
    harvest: "Mayıs – Eylül",
    priceNote: "Küresel arzın %35'i. Hasat döngüsü fiyatları doğrudan etkiler.",
  },
  {
    name: "Dak Lak",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 12.7,
    lng: 108.0,
    type: "Robusta",
    harvest: "Kasım – Mart",
    priceNote: "Dünya Robusta üretiminin %40'ı. London ICE fiyatlarını belirler.",
  },
  {
    name: "Huila",
    country: "Kolombiya",
    flag: "🇨🇴",
    lat: 2.5,
    lng: -75.7,
    type: "Specialty Arabica",
    harvest: "Ekim – Ocak (Ana), Nisan – Haziran (Mitaca)",
    priceNote: "Yüksek SCA puanlı lotlar. Premium diferansiyel +30-60 c/lb.",
  },
  {
    name: "Yirgacheffe",
    country: "Etiyopya",
    flag: "🇪🇹",
    lat: 6.2,
    lng: 38.2,
    type: "Arabica (Heirloom)",
    harvest: "Kasım – Şubat",
    priceNote: "Kahvenin anavatanı. Doğal işleme ile benzersiz çiçeksi profil.",
  },
  {
    name: "Sumatra",
    country: "Endonezya",
    flag: "🇮🇩",
    lat: 2.5,
    lng: 99.0,
    type: "Arabica / Robusta",
    harvest: "Ekim – Mart",
    priceNote: "Wet-hulled (Giling Basah) işleme. Mandheling düşük asidite.",
  },
  {
    name: "Copan",
    country: "Honduras",
    flag: "🇭🇳",
    lat: 14.8,
    lng: -88.8,
    type: "Arabica",
    harvest: "Kasım – Mart",
    priceNote: "Orta Amerika'nın en büyük üreticisi. SHG kalite sınıfı.",
  },
  {
    name: "Mt. Elgon",
    country: "Uganda",
    flag: "🇺🇬",
    lat: 1.1,
    lng: 34.5,
    type: "Robusta & Arabica",
    harvest: "Ekim – Şubat",
    priceNote: "Afrika'nın 2. büyük üreticisi. Robusta ihracatında büyüme.",
  },
];

// Kahve kuşağı — Yengeç Dönencesi ile Oğlak Dönencesi arası
const coffeeBeltCoords: [number, number][] = [
  [23.5, -180],
  [23.5, 180],
  [-23.5, 180],
  [-23.5, -180],
];

// Custom marker ikonu
function createIcon(type: string) {
  const color = type.includes("Robusta") && !type.includes("Arabica")
    ? "#002321"
    : type.includes("Specialty")
    ? "#b45309"
    : "#32170d";

  return L.divIcon({
    className: "",
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50%;
      background: ${color}; border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    ">
      <span style="color: #fff; font-size: 13px;">☕</span>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

export default function CoffeeMap() {
  const [weather, setWeather] = useState<RegionWeather[]>([]);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.regions) setWeather(data.regions);
      })
      .catch(() => {});
  }, []);

  function getWeather(name: string): RegionWeather | undefined {
    return weather.find((w) =>
      w.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(w.name.toLowerCase())
    );
  }

  return (
    <MapContainer
      center={[5, 30]}
      zoom={2}
      minZoom={2}
      maxZoom={8}
      scrollWheelZoom={true}
      maxBounds={[[-60, -180], [70, 180]]}
      maxBoundsViscosity={1.0}
      worldCopyJump={false}
      style={{ height: "100%", width: "100%", borderRadius: "4px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />

      {/* Kahve Kuşağı */}
      <Polygon
        positions={coffeeBeltCoords}
        pathOptions={{
          color: "#5a3d30",
          weight: 1,
          fillColor: "#8B6914",
          fillOpacity: 0.08,
          dashArray: "6 4",
        }}
      >
        <Tooltip permanent direction="center" className="coffee-belt-label">
          Kahve Kuşağı (23.5°N — 23.5°S)
        </Tooltip>
      </Polygon>

      {/* Bölge Marker'ları */}
      {regions.map((region) => {
        const w = getWeather(region.name);
        return (
          <Marker
            key={region.name}
            position={[region.lat, region.lng]}
            icon={createIcon(region.type)}
          >
            <Popup maxWidth={280} minWidth={220}>
              <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#32170d" }}>
                  {region.flag} {region.name}, {region.country}
                </div>
                <div style={{ fontSize: 11, color: "#5f5e58", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  {region.type}
                </div>

                {w && w.temp !== null && (
                  <div style={{ background: "#f4fafe", padding: "8px 10px", marginBottom: 8, borderLeft: "3px solid #32170d" }}>
                    <div style={{ fontSize: 11, color: "#5f5e58", marginBottom: 4, fontWeight: 600 }}>CANLI HAVA</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
                      <span>🌡 {w.temp}°C</span>
                      {w.humidity !== null && <span>💧 {w.humidity}%</span>}
                      {w.rain7d !== null && <span>🌧 {w.rain7d}mm</span>}
                    </div>
                  </div>
                )}

                <div style={{ fontSize: 12, marginBottom: 4 }}>
                  <strong style={{ color: "#32170d" }}>Hasat:</strong> {region.harvest}
                </div>
                <div style={{ fontSize: 11, color: "#5f5e58", fontStyle: "italic", marginTop: 4, borderTop: "1px solid #e5e2da", paddingTop: 6 }}>
                  📈 {region.priceNote}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
