import Navbar from "@/components/Navbar";
import TickerBand from "@/components/TickerBand";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import PriceChart from "@/components/charts/PriceChart";

export default function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Navbar (h-16) + Sidebar (w-64) kadar boşluk bırak */}
      <div className="pt-16 md:ml-64">
        <TickerBand />
        <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-12">

          {/* ═══ HERO + EDİTÖR NOTU ═══ */}
          <section className="grid grid-cols-12 gap-6">

            {/* Hero — Öne Çıkan Haber */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest editorial-shadow overflow-hidden group">
              <div className="relative h-[340px] md:h-[500px]">
                {/* Arka plan: kahve plantasyonu illüstrasyonu */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 900 500"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d1f14" />
                      <stop offset="60%" stopColor="#1a3a22" />
                      <stop offset="100%" stopColor="#204530" />
                    </linearGradient>
                    <radialGradient id="glow" cx="22%" cy="28%" r="30%">
                      <stop offset="0%" stopColor="#ffd166" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="900" height="500" fill="url(#sky)" />
                  <rect width="900" height="500" fill="url(#glow)" />
                  {/* Ay */}
                  <ellipse cx="200" cy="150" rx="50" ry="50" fill="#ffd166" opacity="0.12" />
                  <ellipse cx="200" cy="150" rx="25" ry="25" fill="#ffd166" opacity="0.2" />
                  {/* Tepeler */}
                  <ellipse cx="450" cy="600" rx="700" ry="280" fill="#0e2a16" />
                  <ellipse cx="100" cy="560" rx="320" ry="220" fill="#112e19" />
                  <ellipse cx="820" cy="580" rx="280" ry="200" fill="#0f2b17" />
                  {/* Ağaç sıraları */}
                  <g opacity="0.78">
                    <ellipse cx="30" cy="352" rx="27" ry="40" fill="#0e2714" />
                    <ellipse cx="170" cy="314" rx="27" ry="40" fill="#0e2714" />
                    <ellipse cx="310" cy="300" rx="27" ry="40" fill="#0e2714" />
                    <ellipse cx="450" cy="299" rx="27" ry="40" fill="#0e2714" />
                    <ellipse cx="590" cy="312" rx="27" ry="40" fill="#0e2714" />
                    <ellipse cx="730" cy="337" rx="27" ry="40" fill="#0e2714" />
                    <ellipse cx="865" cy="370" rx="24" ry="35" fill="#0e2714" />
                  </g>
                  <g>
                    <ellipse cx="86" cy="388" rx="31" ry="46" fill="#122c18" />
                    <ellipse cx="238" cy="358" rx="31" ry="46" fill="#122c18" />
                    <ellipse cx="390" cy="349" rx="31" ry="46" fill="#122c18" />
                    <ellipse cx="542" cy="356" rx="31" ry="46" fill="#122c18" />
                    <ellipse cx="694" cy="377" rx="31" ry="46" fill="#122c18" />
                    <ellipse cx="846" cy="411" rx="31" ry="46" fill="#122c18" />
                  </g>
                  {/* Kahve meyveleri */}
                  <g fill="#c0392b" opacity="0.85">
                    <circle cx="162" cy="363" r="4.5" />
                    <circle cx="314" cy="345" r="4.5" />
                    <circle cx="390" cy="342" r="4.5" />
                    <circle cx="466" cy="343" r="4.5" />
                    <circle cx="542" cy="349" r="4.5" />
                    <circle cx="694" cy="370" r="4.5" />
                  </g>
                </svg>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary/25 to-transparent opacity-92" />
                {/* İçerik */}
                <div className="absolute bottom-0 p-6 md:p-10 text-white max-w-2xl">
                  <span className="bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold mb-5 inline-block">
                    Analiz
                  </span>
                  <h1 className="font-headline text-3xl md:text-5xl leading-tight mb-5">
                    The Resilience of Arabica: Why Supply Constraints are Redefining 2024 Yield Expectations.
                  </h1>
                  <p className="text-on-primary-container/80 text-sm md:text-base mb-8">
                    As climate volatility hits Brazilian Highlands, exporters look towards Colombian varietals to stabilize the global morning cup.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <button className="bg-[#f4fafe] text-primary-container px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
                      Raporu Oku
                    </button>
                    <span className="text-xs uppercase tracking-widest opacity-60">
                      12 Dk Okuma &bull; Elara Vance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ kolon: Editör Notu + Piyasa Duyarlılığı */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

              {/* Editörün Günlük Notu */}
              <div className="flex-1 bg-surface-container-low p-6 md:p-8 border-l-4 border-primary relative overflow-hidden">
                <span className="material-symbols-outlined absolute -right-4 -top-4 text-9xl opacity-5 text-primary">
                  format_quote
                </span>
                <h4 className="font-headline text-xl md:text-2xl text-primary mb-4 italic">
                  Editörün Günlük Notu
                </h4>
                <p className="text-sm leading-relaxed text-secondary italic mb-6">
                  &ldquo;The shift we&rsquo;re seeing in the Vietnamese Robusta market isn&rsquo;t just a pricing spike; it&rsquo;s a structural realignment. Investors who ignore the moisture levels in the Central Highlands are trading in the dark.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center font-bold text-primary text-sm">
                    JT
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Julian Thorne
                    </p>
                    <p className="text-[10px] text-secondary">
                      Baş Emtia Stratejisti
                    </p>
                  </div>
                </div>
              </div>

              {/* Piyasa Duyarlılığı */}
              <div className="bg-primary-container text-white p-6 md:p-8 editorial-shadow">
                <h4 className="font-label text-[10px] uppercase tracking-[0.2em] opacity-60 mb-5">
                  Piyasa Duyarlılığı
                </h4>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-4xl font-headline font-light italic">Bullish</span>
                  <span className="text-tertiary-fixed text-xl font-bold">78%</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-5">
                  <div className="bg-tertiary-fixed w-[78%] h-full" />
                </div>
                <p className="text-xs text-on-primary-container leading-loose">
                  Endeks, Minas Gerais&rsquo;deki hasat gecikmelerine rağmen uzun pozisyonlara güçlü bir eğilim gösteriyor.
                </p>
              </div>
            </div>
          </section>

          {/* ═══ GRAFİK + HAVA DURUMU ═══ */}
          <section className="grid grid-cols-12 gap-8 items-start">

            {/* Haftalık Fiyat Grafiği (Placeholder) */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 editorial-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h3 className="font-headline text-2xl md:text-3xl text-primary">
                    KC1! Arabica Futures
                  </h3>
                  <p className="text-xs text-secondary font-label uppercase tracking-widest mt-1">
                    7 Günlük Teknik Trend (ICE NY)
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-surface-container-high text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container">
                    1D
                  </button>
                  <button className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                    1W
                  </button>
                  <button className="px-4 py-1.5 bg-surface-container-high text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container">
                    1M
                  </button>
                </div>
              </div>
              <PriceChart title="KC1! Arabica Futures" subtitle="7 Gunluk Teknik Trend (ICE NY)" />
            </div>

            {/* Üretici Bölge Havaları */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <h3 className="font-headline text-2xl text-primary border-b border-outline-variant/30 pb-3">
                Üretici Bölge Havaları
              </h3>

              {/* Brezilya */}
              <div className="flex items-center justify-between p-5 bg-surface-container-high border-r-4 border-tertiary">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">
                    Minas Gerais, Brezilya
                  </p>
                  <p className="font-headline text-2xl text-primary">24°C</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-tertiary">rainy</span>
              </div>

              {/* Vietnam */}
              <div className="flex items-center justify-between p-5 bg-surface-container-high border-r-4 border-secondary">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">
                    Orta Yaylalar, Vietnam
                  </p>
                  <p className="font-headline text-2xl text-primary">31°C</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-secondary">sunny</span>
              </div>

              {/* Kolombiya */}
              <div className="flex items-center justify-between p-5 bg-surface-container-high border-r-4 border-on-tertiary-container">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">
                    Huila, Kolombiya
                  </p>
                  <p className="font-headline text-2xl text-primary">19°C</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-on-tertiary-container">cloud</span>
              </div>
            </div>
          </section>

          {/* ═══ BÜLTEN KAYIT FORMU ═══ */}
          <section className="bg-[#f4fafe] p-8 md:p-12 flex flex-col items-center text-center border border-outline-variant/15 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              Haftalık Derin Analiz, Her Pazar
            </h2>
            <p className="max-w-xl text-secondary text-sm leading-relaxed mb-8">
              12.000&rsquo;den fazla emtia traderi ve sektör profesyoneli haftalık piyasa özetimize abone.
            </p>
            <div className="flex w-full max-w-md border-b-2 border-primary">
              <input
                className="flex-1 bg-transparent border-none py-3 px-0 focus:ring-0 text-primary text-sm placeholder:text-outline-variant outline-none"
                placeholder="professional@email.com"
                type="email"
              />
              <button className="text-primary font-bold text-xs uppercase tracking-widest px-4 hover:opacity-70">
                Abone Ol
              </button>
            </div>
            <p className="mt-4 text-[10px] text-outline-variant uppercase tracking-widest">
              Spam yok. Sadece yüksek kaliteli veri.
            </p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
