"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "@/lib/i18n/context";

interface RegionWeather {
  name: string;
  country: string;
  temp: number | null;
  humidity: number | null;
  rain7d: number | null;
}

interface MarkerData {
  name: string;
  country: { tr: string; en: string };
  flag: string;
  lat: number;
  lng: number;
  type: string;
  harvest: { tr: string; en: string };
  priceNote: { tr: string; en: string };
}

const regions: MarkerData[] = [
  {
    name: "Minas Gerais",
    country: { tr: "Brezilya", en: "Brazil" },
    flag: "\u{1F1E7}\u{1F1F7}",
    lat: -21.2,
    lng: -45.0,
    type: "Arabica",
    harvest: { tr: "May\u0131s \u2013 Eyl\u00FCl", en: "May \u2013 September" },
    priceNote: { tr: "K\u00FCresel arz\u0131n %35'i. Hasat d\u00F6ng\u00FCs\u00FC fiyatlar\u0131 do\u011Frudan etkiler.", en: "35% of global supply. Harvest cycle directly impacts prices." },
  },
  {
    name: "Dak Lak",
    country: { tr: "Vietnam", en: "Vietnam" },
    flag: "\u{1F1FB}\u{1F1F3}",
    lat: 12.7,
    lng: 108.0,
    type: "Robusta",
    harvest: { tr: "Kas\u0131m \u2013 Mart", en: "November \u2013 March" },
    priceNote: { tr: "D\u00FCnya Robusta \u00FCretiminin %40'\u0131. London ICE fiyatlar\u0131n\u0131 belirler.", en: "40% of world Robusta production. Determines London ICE prices." },
  },
  {
    name: "Huila",
    country: { tr: "Kolombiya", en: "Colombia" },
    flag: "\u{1F1E8}\u{1F1F4}",
    lat: 2.5,
    lng: -75.7,
    type: "Specialty Arabica",
    harvest: { tr: "Ekim \u2013 Ocak (Ana), Nisan \u2013 Haziran (Mitaca)", en: "Oct \u2013 Jan (Main), Apr \u2013 Jun (Mitaca)" },
    priceNote: { tr: "Y\u00FCksek SCA puanl\u0131 lotlar. Premium diferansiyel +30-60 c/lb.", en: "High SCA scoring lots. Premium differential +30-60 c/lb." },
  },
  {
    name: "Yirgacheffe",
    country: { tr: "Etiyopya", en: "Ethiopia" },
    flag: "\u{1F1EA}\u{1F1F9}",
    lat: 6.2,
    lng: 38.2,
    type: "Arabica (Heirloom)",
    harvest: { tr: "Kas\u0131m \u2013 \u015Eubat", en: "November \u2013 February" },
    priceNote: { tr: "Kahvenin anavatan\u0131. Do\u011Fal i\u015Fleme ile benzersiz \u00E7i\u00E7eksi profil.", en: "Birthplace of coffee. Unique floral profile with natural processing." },
  },
  {
    name: "Sumatra",
    country: { tr: "Endonezya", en: "Indonesia" },
    flag: "\u{1F1EE}\u{1F1E9}",
    lat: 2.5,
    lng: 99.0,
    type: "Arabica / Robusta",
    harvest: { tr: "Ekim \u2013 Mart", en: "October \u2013 March" },
    priceNote: { tr: "Wet-hulled (Giling Basah) i\u015Fleme. Mandheling d\u00FC\u015F\u00FCk asidite.", en: "Wet-hulled (Giling Basah) processing. Mandheling low acidity." },
  },
  {
    name: "Copan",
    country: { tr: "Honduras", en: "Honduras" },
    flag: "\u{1F1ED}\u{1F1F3}",
    lat: 14.8,
    lng: -88.8,
    type: "Arabica",
    harvest: { tr: "Kas\u0131m \u2013 Mart", en: "November \u2013 March" },
    priceNote: { tr: "Orta Amerika'n\u0131n en b\u00FCy\u00FCk \u00FCreticisi. SHG kalite s\u0131n\u0131f\u0131.", en: "Central America's largest producer. SHG quality grade." },
  },
  {
    name: "Mt. Elgon",
    country: { tr: "Uganda", en: "Uganda" },
    flag: "\u{1F1FA}\u{1F1EC}",
    lat: 1.1,
    lng: 34.5,
    type: "Robusta & Arabica",
    harvest: { tr: "Ekim \u2013 \u015Eubat", en: "October \u2013 February" },
    priceNote: { tr: "Afrika'n\u0131n 2. b\u00FCy\u00FCk \u00FCreticisi. Robusta ihracat\u0131nda b\u00FCy\u00FCme.", en: "Africa's 2nd largest producer. Growth in Robusta exports." },
  },
];

const coffeeBeltCoords: [number, number][] = [
  [23.5, -180],
  [23.5, 180],
  [-23.5, 180],
  [-23.5, -180],
];

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
      <span style="color: #fff; font-size: 13px;">\u2615</span>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

export default function CoffeeMap() {
  const [weather, setWeather] = useState<RegionWeather[]>([]);
  const { locale } = useTranslation();

  const beltLabel = locale === "tr" ? "Kahve Ku\u015Fa\u011F\u0131 (23.5\u00B0N \u2014 23.5\u00B0S)" : "Coffee Belt (23.5\u00B0N \u2014 23.5\u00B0S)";
  const liveWeatherLabel = locale === "tr" ? "CANLI HAVA" : "LIVE WEATHER";
  const harvestLabel = locale === "tr" ? "Hasat:" : "Harvest:";

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
      center={[10, 20]}
      zoom={3}
      minZoom={3}
      maxZoom={8}
      scrollWheelZoom={true}
      maxBounds={[[-60, -180], [70, 180]]}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%", borderRadius: "4px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
          {beltLabel}
        </Tooltip>
      </Polygon>

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
                  {region.flag} {region.name}, {region.country[locale]}
                </div>
                <div style={{ fontSize: 11, color: "#5f5e58", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  {region.type}
                </div>

                {w && w.temp !== null && (
                  <div style={{ background: "#f4fafe", padding: "8px 10px", marginBottom: 8, borderLeft: "3px solid #32170d" }}>
                    <div style={{ fontSize: 11, color: "#5f5e58", marginBottom: 4, fontWeight: 600 }}>{liveWeatherLabel}</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
                      <span>🌡 {w.temp}\u00B0C</span>
                      {w.humidity !== null && <span>💧 {w.humidity}%</span>}
                      {w.rain7d !== null && <span>🌧 {w.rain7d}mm</span>}
                    </div>
                  </div>
                )}

                <div style={{ fontSize: 12, marginBottom: 4 }}>
                  <strong style={{ color: "#32170d" }}>{harvestLabel}</strong> {region.harvest[locale]}
                </div>
                <div style={{ fontSize: 11, color: "#5f5e58", fontStyle: "italic", marginTop: 4, borderTop: "1px solid #e5e2da", paddingTop: 6 }}>
                  📈 {region.priceNote[locale]}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
