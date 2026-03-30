# WorldCoffee24.com — Proje Hafıza Dosyası
> Bu dosyayı her yeni Claude sohbetine yükleyin. Claude projeyi buradan tanır.

---

## 🎯 Proje Özeti
**Ad:** WorldCoffee24.com (kesinleşmedi, alternatifler: KahvePiyasa.com, CoffeePriceHub.com)
**Slogan:** Küresel Kahve Piyasa Platformu / Market Intelligence
**Kurucu:** Recep Tümay Şahin
**Başlangıç:** Mart 2026
**Durum:** TradingView widget'ları + kaynak linkleri eklendi → canlı API entegrasyonu sırada

---

## 📌 Vizyon & Strateji
**Tek cümle:** Kahve piyasasının investing.com'u olmak.
**Faz 1 hedefi:** Canlı veriler, haberler, analizler, eğitim içerikleri ile organik trafik ve marka bilinirliği oluşturmak. Mail listesi toplamak.
**Faz 2 hedefi:** Premium bültenler, detaylı analizler, sponsorlu içerik, ücretli ilan sistemi.
**Model:** Önce kitleselleş, sonra monetize et.

---

## 👥 Hedef Kitle
- ☕ Kafe Sahipleri
- 🌱 Üreticiler / Çiftçiler
- 📈 Traderlar / Emtia Yatırımcıları
- 🚚 Dağıtımcılar / İthalatçılar

---

## 💰 Gelir Modeli (Aşamalı)
1. **Faz 1:** Ücretsiz içerik → trafik → marka → reklam/sponsorluk potansiyeli
2. **Faz 2:** Premium içerik aboneliği, sponsorlu bülten, ücretli ticaret ilanları, affiliate linkler

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (SSR — SEO kritik olduğu için)
- **Styling:** Tailwind CSS
- **Backend:** (Faz 2'de belirlenecek)
- **Veritabanı:** (Faz 2'de belirlenecek)
- **Deploy:** Vercel (Next.js ile doğal entegrasyon)
- **E-posta:** Mailchimp (ücretsiz 500 aboneye kadar)
- **Mobil:** (Web tamamlandıktan sonra)

---

## 📁 Site Yapısı (İçerik Haritasından)

### 1. Ana Sayfa (Homepage)
- Site başlığı & slogan (TR+EN)
- 📊 Canlı fiyat özet bandı (Arabica, Robusta) → CANLI
- 💱 Döviz kuru bandı (USD/TRY, EUR/TRY) → CANLI
- 📰 Öne çıkan haber (editör seçimi) → MANUEL
- 📝 Günlük editör notu (2-3 cümle piyasa yorumu) → MANUEL
- 🌦️ Üretici bölgesi havası (Brezilya, Kolombiya, Vietnam) → CANLI
- 📈 Haftalık fiyat grafiği (TradingView embed) → CANLI
- 🔔 Bülten kayıt formu (e-posta toplama) → STATİK

### 2. Fiyat Merkezi (Price Hub) — "Sitenin kalbi"
- ☕ Arabica Futures (KC) — TradingView widget → CANLI
- 🫘 Robusta Futures (RC) — TradingView widget → CANLI
- 📆 Kontrat tablosu (spread) → CANLI
- 💵 TRY çeviri hesabı → STATİK
- 📊 Tarihsel grafik (1h/1ay/1yıl) → CANLI
- 🏷️ Fiziksel fiyat rehberi → MANUEL
- ⚖️ Kalite primleri (SCA puan farkı) → STATİK

### 3. Piyasa Faktörleri (Market Factors) — SEO değerli
**3a. İklim & Üretim:**
- El Niño/La Niña durumu, Brezilya hasat takvimi, çiçeklenme haberleri, Vietnam/Endonezya durumu, frost riski izleme

**3b. Ekonomik & Politik:**
- BRL/USD kuru, enerji/navlun maliyetleri, COT raporu özeti, ICO üretim tahminleri, liman & stok verileri

**3c. Talep:**
- Küresel tüketim trendi, Çin talep büyümesi, perakende veriler

### 4. Haberler (News) — YENİ SAYFA (MVP'de yoktu)
- 📡 Otomatik RSS akışı (Reuters, Google News) → CANLI
- ✍️ Editör seçimi haberler → MANUEL
- 📂 Kategori filtreleri → STATİK
- 📰 Haftalık özet (her Pazartesi) → MANUEL
- 📧 E-posta bülteni (Mailchimp) → MANUEL

### 5. İş & Ticaret (Trade Board) — YENİ SAYFA (MVP'de yoktu)
- 📋 Basit ilan formu (alıcı/satıcı) → STATİK
- 🌍 Ülke bazlı fiyat haritası → MANUEL
- 📄 Sözleşme & Incoterms rehberi → STATİK
- 🏷️ Sertifika rehberi (Rainforest, Fair Trade, UTZ, Organic) → STATİK
- 📞 Tedarikçi dizini → MANUEL

### 6. Bilgi Merkezi / Eğitim (Learn) — SEO trafik kaynağı
- Kahve Futures 101
- Kahve Kuşağı & Coğrafya haritası
- İşleme yöntemleri (Washed/Natural/Honey)
- Grafik okuma rehberi (trader kitlesi)
- Glossary / Terimler sözlüğü

### 7. Hava Radarı (Weather Radar) — MVP'den mevcut
- Üretim bölgeleri hava durumu

---

## 🎨 Tasarım Kararları (MVP'den)
- Renk paleti: Koyu kahve tonları (#32170d, #4b2c20)
- Fontlar: Newsreader (başlıklar), Inter (gövde)
- İkonlar: Material Symbols Outlined
- TR/EN dil desteği
- Ticker band (canlı fiyat bandı) üstte

---

## 📋 Yapılacaklar Sırası

### Faz 0 — Temel Hazırlık ✅
- [x] Ürün vizyonu ve strateji belirlendi
- [x] İçerik haritası oluşturuldu
- [x] Windows geliştirme ortamı kuruldu
  - [x] VS Code
  - [x] Node.js v24.14.1
  - [x] Git 2.53.0
  - [x] GitHub hesabı (rtumaysahin-wq)
  - [x] Claude Code 2.1.87

### Faz 1 — Proje İskeleti & Temel Yapı
- [x] Next.js projesi oluşturma (v16.2.1, App Router, Tailwind CSS)
- [x] Proje yeri: C:\Users\rtuma\worldcoffee24
- [x] GitHub repo: https://github.com/rtumaysahin-wq/worldcoffee24
- [x] İlk push yapıldı
- [x] Tailwind custom config (renk paleti, fontlar) ✅
  - tailwind.config.ts: renk paleti (#32170d, #4b2c20, surface, accent vb.)
  - globals.css: custom CSS değişkenleri
  - layout.tsx: Newsreader + Inter fontları (Next.js font optimizasyonu)
  - TypeScript bağımlılıkları otomatik kuruldu
- [x] MVP tasarımının component'lere taşınması ✅
  - [x] Navbar (üst menü) — src/components/Navbar.tsx ✅
  - [x] tsconfig.json path alias eklendi ✅
  - [x] layout.tsx'e Material Symbols font linki eklendi ✅
  - [x] Sol Sidebar — src/components/Sidebar.tsx ✅
  - [x] Ticker Band (canlı fiyat bandı) — src/components/TickerBand.tsx ✅
  - [x] Footer — src/components/Footer.tsx ✅
  - [x] Ana Sayfa layout — src/app/page.tsx ✅
    - Hero (öne çıkan haber kartı, SVG plantasyon illüstrasyonu)
    - Editörün Günlük Notu
    - Piyasa Duyarlılığı göstergesi
    - Haftalık Fiyat Grafiği (placeholder bar chart)
    - Üretici Bölge Havaları (3 bölge)
    - Bülten Kayıt Formu
- [x] Vercel'e deploy ✅ — https://worldcoffee24.vercel.app

### Faz 2 — Ana Sayfa & Fiyat Merkezi
- [x] Ana sayfa layout + hero ✅ (statik placeholder, canlı veriye geçilecek)
- [x] TradingView widget entegrasyonu ✅ — TradingViewWidget.tsx component
  - Fiyat Merkezi: ICEUS:KC1! (Arabica), ICEEUR:RC1! (Robusta), FX_IDC:USDTRY
  - Ana Sayfa: ICEUS:KC1! canlı grafik
  - Veri Kaynakları bölümü (ICE Arabica/Robusta, Barchart KC/RM, CEPEA, ICO)
- [x] Canlı fiyat bandı ✅ — TradingView Ticker Tape widget (6 sembol canlı)
- [ ] Döviz kuru bandı
- [x] Bülten kayıt formu ✅ (UI hazır, Mailchimp entegrasyonu yapılacak)
- [x] Fiyat Merkezi sayfası ✅ — src/app/fiyat-merkezi/page.tsx
  - Arabica Futures grafik (placeholder bar chart)
  - Kur Çevirici (USD→TRY, çalışan hesap makinesi)
  - Aktif Kontratlar tablosu (4 satır örnek veri)
  - SCA Premium Rehberi
  - Fiziksel Referans kartı
  - Editöryal Analiz bölümü (SVG illüstrasyon)
- [x] TRY çeviri hesabı ✅ (Kur Çevirici olarak Fiyat Merkezi'nde)

### Faz 3 — İçerik Sayfaları
- [x] Piyasa Faktörleri sayfası ✅ — src/app/piyasa-faktorleri/page.tsx
  - İklim & Üretim: ENSO Status, Brazil Harvest, Don Uyarıları
  - Küresel Talep Trendleri: Çin, Premium, Sürdürülebilirlik
  - Ekonomik Faktörler: BRL/USD, Lojistik, COT, ICE Stoklar
- [x] Bilgi Merkezi / Learn sayfası ✅ — src/app/bilgi-merkezi/page.tsx
  - Kahve Futures 101 hero kartı (SVG illüstrasyon)
  - İşleme Yöntemleri kartı (SVG kahve fincanı)
  - İleri Teknik Rehberler (3 kart: Botanik, Lojistik, Ekonomi)
  - Sektör Sözlüğü (4 terim + A-Z/Popüler butonları)
  - Hızlı Terimler Arama + tag'ler
  - Faydalı Kaynaklar (ITC, USDA, SeaRates, Coffee Encyclopedia)
  - Sektör Dernekleri & Sertifikalar (SCA, ICO, WCR, Rainforest, Fair Trade, CQI, ACE)
  - Premium Bülten CTA
- [x] Hava Radarı sayfası ✅ — src/app/hava-radari/page.tsx
  - Don Riski Uyarısı banner
  - 3 Ana Bölge kartı (Brezilya, Vietnam, Kolombiya) — sıcaklık, nem, rüzgar, yağış
  - 4 İkincil Bölge (Etiyopya, Endonezya, Honduras, Uganda)
  - ENSO Durumu paneli (Beklenen Etki + Fiyat Etkisi)
- [x] Haberler sayfası ✅ — src/app/haberler/page.tsx
  - Editör Seçimi haberler (3 makale kartı, öne çıkan vurgulu)
  - Kategori filtreleri (6 kategori, aktif state)
  - Canlı RSS Akışı (6 haber placeholder)
  - Haftalık Özet paneli (5 madde)
  - Bülten kayıt formu
  - Kahve Haber Kaynakları (7 kaynak kartı, yeni sekmede açılır)
  - Navbar ve Sidebar'a "Haberler" linki eklendi

### Faz 4 — İş & Ticaret + Backend
- [x] Trade Board sayfası ✅ — src/app/is-ticaret/page.tsx
  - Aktif İlanlar (3 örnek: Satıcı/Alıcı, sertifika badge'leri)
  - İlan Formu (Alıcı/Satıcı toggle, 6 input alanı)
  - Incoterms Rehberi (FOB, CIF, EXW, FCA tablosu)
  - Sertifika Rehberi (Rainforest, Fair Trade, UTZ, Organic)
  - Tedarikçi Dizini (4 firma)
  - Sidebar'a "İş & Ticaret" linki eklendi
- [ ] İlan sistemi (backend — Faz 5'te)
- [ ] Tedarikçi dizini (backend — Faz 5'te)
- [ ] Admin panel (içerik yönetimi)

### Faz 5 — Büyüme & Monetizasyon
- [x] SEO optimizasyonu ✅
  - Global metadata: title template, 10 keyword, Open Graph, Twitter Card
  - 7 sayfaya özel metadata (title, description, keywords, OG)
  - sitemap.xml (7 sayfa, priority + changeFrequency)
  - robots.txt (tüm sayfalara izin + sitemap referansı)
  - metadataBase: https://worldcoffee24.vercel.app
- [ ] Mail listesi büyütme
- [ ] Premium içerik sistemi
- [ ] Reklam/sponsorluk alanları

### Faz 6 — Mobil Uygulama
- [ ] (Web tamamlandıktan sonra planlanacak)

---

## 📝 Sohbet Geçmişi / Notlar
- **Sohbet 1 (29 Mart 2026):** MVP incelendi. Proje hafıza dosyası oluşturuldu. Geliştirme ortamı kuruldu (VS Code, Node.js, Git, GitHub, Claude Code). Ürün stratejisi belirlendi: "kahve piyasasının investing.com'u". İçerik haritası dokümanı entegre edildi. Tech stack: Next.js + Tailwind + Vercel.
- **Sohbet 2 (29 Mart 2026):** Context window sorunu çözüldü (603KB HTML dosyasını her seferinde okumamaya karar verildi). Next.js projesi kuruldu (v16.2.1, App Router, Tailwind CSS, Turbopack). PowerShell execution policy sorunu çözüldü. GitHub repo oluşturuldu ve ilk push yapıldı. Proje çalışır durumda: localhost:3000.
- **Sohbet 3 (30 Mart 2026):** HTML dosya haritası çıkarıldı (790 satır, hangi bölüm nerede). Tailwind custom config tamamlandı: tailwind.config.ts (renk paleti + fontlar), globals.css (custom stiller), layout.tsx (Newsreader + Inter fontları, Next.js font optimizasyonu). TypeScript bağımlılıkları otomatik kuruldu. Eski layout.js silindi, yeni layout.tsx aktif. Proje localhost:3000'de çalışıyor, arka plan rengi doğru (#f4fafe). Sıradaki: Navbar component.
- **Sohbet 4 (30 Mart 2026):** HTML dosyası component parçalarına bölündü. Navbar içindeki 210KB inline SVG logo tespit edildi (şişkinliğin kaynağı). Navbar.tsx component'i oluşturuldu ve src/components/ klasörüne yerleştirildi. page.tsx oluşturuldu. Sorun: tsconfig.json'da `@/*` path alias tanımlı değil — bu yüzden Navbar import'u çalışmıyor. Çözüm aşağıda.
- **Sohbet 5 (30 Mart 2026):** Footer, Ana Sayfa layout, Fiyat Merkezi, Piyasa Faktörleri, Bilgi Merkezi, Hava Radarı, Haberler sayfaları oluşturuldu. Vercel deploy + GitHub otomatik deploy bağlantısı. İş & Ticaret (Trade Board) sayfası: İlanlar, Form, Incoterms, Sertifikalar, Tedarikçi Dizini. SEO optimizasyonu: her sayfaya metadata, sitemap.xml, robots.txt, Open Graph, Twitter Card. Faz 1-4 + SEO tamamlandı.

---

## ⚠️ Claude İçin Notlar
- Kurucu yazılımcı değil, finans/girişimcilik arka planı var
- Terminal deneyimi yok, **HER komutu tek tek, adım adım ver**
- **Her komuttan önce "cd C:\Users\rtuma\worldcoffee24" hatırlat**
- Windows kullanıyor (PowerShell)
- Kısa yola kaçma, doğru temeller at
- Her sohbet sonunda bu dosyayı güncelle
- SEO çok kritik — SSR ve içerik odaklı yapı şart
- İçerik türleri: CANLI (API/widget), MANUEL (editör girer), STATİK (bir kez yazılır)
- Referans model: investing.com
- Orijinal MVP dosyası: kahve_dunyasi_final1.html (tek dosya, 790 satır, 603KB)
- ⚠️ MVP HTML dosyası 603KB — context window'u dolduruyor. Tümünü okuma, sadece gerekli bölümleri oku.
- GitHub kullanıcı adı: rtumaysahin-wq
- Proje yolu: C:\Users\rtuma\worldcoffee24

### 🚨 SONRAKİ CHAT'TE İLK YAPILACAK İŞ
Mailchimp bülten entegrasyonu, responsive/mobil test, backend planlama.

### 📍 HTML Dosya Haritası (kahve_dunyasi_final1.html — 790 satır)
| Satırlar | Bölüm | Boyut (SVG'siz) |
|----------|-------|-----------------|
| 1-31 | Head + Tailwind config | 3.2KB |
| 34-58 | Üst Navbar | 2.5KB (210KB SVG logo ayrıldı) |
| 60-82 | Sol Sidebar | SVG ayırılacak |
| 87-111 | Ticker Band | 2.8KB |
| 112-288 | Dashboard (Ana Sayfa) | 125KB (SVG ayırılacak) |
| 289-385 | Market Factors | 13KB |
| 386-504 | Price Hub | 14KB |
| 505-633 | Learn | 18KB |
| 634-746 | Weather Radar | 13KB |
| 747+ | FAB + JavaScript | 1.6KB |

> **Kural:** Hangi component üzerinde çalışılıyorsa sadece o bölüm okunacak. HTML dosyasının tamamı asla okunmayacak.

### 📁 Mevcut Dosya Yapısı
```
C:\Users\rtuma\worldcoffee24\
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css      (custom CSS değişkenleri + ticker animasyonu)
│   │   ├── layout.tsx        (Newsreader + Inter fontları + Material Symbols)
│   │   ├── page.tsx          (Ana Sayfa: Hero, Editör Notu, Grafik, Hava, Bülten)
│   │   ├── fiyat-merkezi/
│   │   │   └── page.tsx      (Fiyat Merkezi: Grafik, Kur Çevirici, Kontratlar, SCA)
│   │   ├── piyasa-faktorleri/
│   │   │   └── page.tsx      (Piyasa Faktörleri: İklim, Talep, Ekonomik)
│   │   ├── bilgi-merkezi/
│   │   │   └── page.tsx      (Bilgi Merkezi: Futures 101, Rehberler, Sözlük)
│   │   ├── hava-radari/
│   │   │   └── page.tsx      (Hava Radarı: 7 bölge, ENSO, Don Uyarısı)
│   │   ├── haberler/
│   │   │   └── page.tsx      (Haberler: Editör Seçimi, RSS, Haftalık Özet)
│   │   └── is-ticaret/
│   │       └── page.tsx      (Trade Board: İlanlar, Form, Incoterms, Sertifikalar)
│   └── components/
│       ├── Navbar.tsx        (üst menü, dil desteği, aktif sayfa takibi)
│       ├── Sidebar.tsx       (sol sidebar, sayfa navigasyonu)
│       ├── TickerBand.tsx    (canlı fiyat bandı, kayan ticker)
│       ├── Footer.tsx        (alt bilgi, linkler)
│       └── TradingViewWidget.tsx (TradingView embed component)
├── tailwind.config.ts        (renk paleti, fontlar)
├── tsconfig.json             (path alias: @/* → ./src/*)
├── package.json
└── ...
```
