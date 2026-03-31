import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TickerBand from "@/components/TickerBand";
import Footer from "@/components/Footer";

const mainRegions = [
  {
    country: "Brazil",
    city: "Minas Gerais",
    zone: "Ana Arabica Üretim Bölgesi",
    temp: 28,
    icon: "rainy",
    iconColor: "text-tertiary",
    weather: "Hafif Yağmur",
    details: [
      { label: "Nem", value: "82%", highlight: false },
      { label: "Rüzgar", value: "12 km/h NE", highlight: false },
      { label: "Yağış (7 gün)", value: "42mm", highlight: false },
      { label: "Don Riski", value: "%5 — Düşük", highlight: true, color: "text-error" },
    ],
    impact: "Etki: Yüksek nem çiçeklenmeyi destekler ancak mantar hastalığı riskini artırır.",
  },
  {
    country: "Vietnam",
    city: "Dak Lak",
    zone: "Ana Robusta Bölgesi",
    temp: 34,
    icon: "sunny",
    iconColor: "text-yellow-600",
    weather: "Kurak / Yüksek Nem",
    details: [
      { label: "Nem", value: "91%", highlight: true, color: "text-error" },
      { label: "Rüzgar", value: "8 km/h SW", highlight: false },
      { label: "Yağış (7g)", value: "3mm — Kuru", highlight: true, color: "text-error" },
      { label: "ENSO", value: "Notr → La Nina", highlight: false },
    ],
    impact: "Etki: Uzun kuraklık Robusta çerçevesini zorluyor; hafta sonu yağış hasat zamanlamasını etkileyebilir.",
  },
  {
    country: "Colombia",
    city: "Huila / Narino",
    zone: "Specialty Arabica Bölgesi",
    temp: 22,
    icon: "partly_cloudy_day",
    iconColor: "text-secondary",
    weather: "Parçalı Bulutlu",
    details: [
      { label: "Nem", value: "74%", highlight: false },
      { label: "Rüzgar", value: "15 km/h N", highlight: false },
      { label: "Yağış (7g)", value: "28mm — Normal", highlight: true, color: "text-tertiary" },
      { label: "Mitaca", value: "Devam Ediyor", highlight: true, color: "text-tertiary" },
    ],
    impact: "Etki: Hafif yağış mitaca hasadı için ideal. Hafta sonu güneş kurutma operasyonlarını destekleyecek.",
  },
];

const secondaryRegions = [
  { name: "Ethiopia — Yirgacheffe", icon: "cloud", temp: "19°C", rain: "18mm" },
  { name: "Indonesia — Sumatra", icon: "thunderstorm", temp: "30°C", rain: "85mm" },
  { name: "Honduras — Copan", icon: "partly_cloudy_day", temp: "25°C", rain: "12mm" },
  { name: "Uganda — Mt. Elgon", icon: "rainy", temp: "21°C", rain: "34mm" },
];

export default function HavaRadari() {
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
                  Canlı &bull; Son güncelleme: 14:22 GMT
                </span>
              </div>
            </div>
          </header>

          {/* ═══ DON UYARISI ═══ */}
          <div className="mb-8 bg-error/8 border-l-4 border-error p-5 flex items-start gap-4">
            <span className="material-symbols-outlined text-error text-2xl mt-0.5">ac_unit</span>
            <div>
              <p className="text-sm font-bold text-error uppercase tracking-widest mb-1">
                Don Riski Uyarısı — Minas Gerais
              </p>
              <p className="text-sm text-on-surface-variant">
                Güney Minas Gerais bölgesinde bu hafta %5 don riski tespit edildi. Yüksek irtifa bölgeleri saatlik izlemede.
              </p>
            </div>
          </div>

          {/* ═══ 3 ANA BÖLGE KARTLARI ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {mainRegions.map((region, i) => (
              <div key={i} className="bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
                {/* Üst: Ülke + İkon */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1">
                      {region.country}
                    </p>
                    <h3 className="font-headline text-2xl text-primary">{region.city}</h3>
                    <p className="text-xs text-secondary mt-1">{region.zone}</p>
                  </div>
                  <span className={`material-symbols-outlined text-5xl ${region.iconColor}`}>
                    {region.icon}
                  </span>
                </div>
                {/* Sıcaklık */}
                <div className="flex items-end gap-3 mb-6">
                  <span className="font-headline text-6xl text-primary">{region.temp}</span>
                  <div className="pb-2">
                    <span className="font-headline text-2xl text-secondary">°C</span>
                    <p className="text-xs text-secondary">{region.weather}</p>
                  </div>
                </div>
                {/* Detaylar */}
                <div className="space-y-3 border-t border-outline-variant/20 pt-5">
                  {region.details.map((d, j) => (
                    <div key={j} className="flex justify-between text-sm">
                      <span className="text-secondary">{d.label}</span>
                      <b className={d.highlight && d.color ? d.color : ""}>{d.value}</b>
                    </div>
                  ))}
                </div>
                {/* Etki notu */}
                <div className="mt-4 bg-surface-container-low p-3 text-xs text-secondary italic">
                  {region.impact}
                </div>
              </div>
            ))}
          </div>

          {/* ═══ DİĞER ÜRETİM BÖLGELERİ ═══ */}
          <h2 className="font-headline text-2xl font-bold text-primary mb-5">
            Diğer Üretim Bölgeleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 mb-10">
            {secondaryRegions.map((r, i) => (
              <div key={i} className="bg-surface-container-lowest p-6">
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-3">
                  {r.name}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-2xl text-primary">{r.icon}</span>
                  <span className="font-headline text-2xl font-bold">{r.temp}</span>
                </div>
                <p className="text-xs text-secondary">Yağış: {r.rain}</p>
              </div>
            ))}
          </div>

          {/* ═══ ENSO DURUMU ═══ */}
          <div className="bg-primary-container text-white p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-headline text-3xl mb-3">ENSO Durumu</h3>
              <p className="text-on-primary-container text-sm leading-relaxed mb-5">
                El Niño&rsquo;dan nötr koşullara geçiş. La Nina oluşma olasılığı önümüzdeki 6 ay için %65-70 arasında.
              </p>
              <span className="inline-block bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                Nötr → La Nina Geçişi
              </span>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-8">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-primary-container mb-4">
                Beklenen Etki
              </p>
              <ul className="space-y-3 text-sm text-on-primary-container">
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
              <p className="text-[10px] font-label uppercase tracking-widest text-on-primary-container mb-4">
                Fiyat Etkisi
              </p>
              <p className="font-headline text-2xl italic mb-3">Yukarı Yönlü Baskı</p>
              <p className="text-sm text-on-primary-container leading-relaxed">
                La Nina geçişi Arabica arzını kısıtlayarak orta vadede fiyatlarda yukarı yönlü baskı oluşturabilir.
              </p>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
}
