# WorldCoffee24 — İş Akışı Rehberi
> Bu dosyayı bilgisayarında tut. Claude Code ile çalışırken referans olarak kullan.

---

## 🔧 Nasıl Çalışıyorsun (Genel Akış)

### Her oturumda şunu yap:

1. **VS Code aç** → Terminal aç
2. Terminalde yaz:
   ```
   cd C:\Users\rtuma\worldcoffee24
   claude
   ```
3. Claude Code açılınca ilk mesajın her zaman bu olsun:
   ```
   PROJECTv3.md'yi oku ve projeyi tanı. Kaldığımız yerden devam edelim.
   ```
4. Claude Code sana ne yapacağını söyler, izin isterse **y** de
5. İş bitince Claude Code'a de ki:
   ```
   PROJECTv3.md'yi güncelle, yapılanları işaretle, sıradaki işi yaz.
   ```
6. İşi bitirince:
   ```
   git add . && git commit -m "açıklama" && git push yap
   ```

### Site görüntüleme:
- Claude Code'a `npm run dev çalıştır` de
- Tarayıcıda http://localhost:3000 aç
- npm run dev zaten çalışıyorsa tekrar söyleme

### Takıldığında:
- Claude Code'a Türkçe söyle ne istediğini, o anlar
- Hata alırsan hata metnini kopyala, Claude Code'a yapıştır
- Çözemezse claude.ai'ye gel (bu chat gibi) ekran görüntüsü at

---

## ✅ Tamamlanan İşler

### Faz 0 — Temel Hazırlık ✅
- VS Code, Node.js, Git, GitHub, Claude Code kuruldu

### Faz 1 — Proje İskeleti (DEVAM EDİYOR)
- [x] Next.js projesi (v16.2.1, App Router, Tailwind CSS)
- [x] GitHub repo: https://github.com/rtumaysahin-wq/worldcoffee24
- [x] Tailwind custom config (renkler, fontlar)
- [x] tsconfig.json path alias (@/*)
- [x] Material Symbols font
- [x] Navbar (üst menü)
- [x] Ticker Band (kayan fiyat bandı)
- [x] Sidebar (sol menü)
- [x] Footer (alt bilgi)
- [x] Ana Sayfa layout (Hero, Editör Notu, Grafik, Hava, Bülten) ✅
- [x] Vercel'e deploy ✅ — https://worldcoffee24.vercel.app

---

## 📋 Sıradaki İşler (Sırasıyla)

### ~~1. Ana Sayfa Layout~~ ✅ TAMAMLANDI

### ~~2. Vercel'e Deploy~~ ✅ TAMAMLANDI — https://worldcoffee24.vercel.app

### ~~3. Fiyat Merkezi Sayfası (Faz 2)~~ ✅ TAMAMLANDI
Claude Code'a şunu söyle:
```
Projeyi Vercel'e deploy etmek istiyorum. Adım adım anlat ne yapmam lazım.
```

### ~~4. Piyasa Faktörleri Sayfası (Faz 3)~~ ✅ TAMAMLANDI
```
/piyat-merkezi sayfasını oluştur. kahve_dunyasi_final1.html'deki Price Hub bölümünü (satır 386-504) referans al:
- Arabica Futures placeholder (TradingView widget alanı)
- Robusta Futures placeholder
- Kontrat tablosu (statik örnek veri)
- TRY çeviri hesabı (basit hesap makinesi)
- Tarihsel grafik alanı (placeholder)
PROJECTv3.md'yi güncelle.
```

### 4. Piyasa Faktörleri Sayfası (Faz 3)
```
/piyasa-faktorleri sayfasını oluştur. kahve_dunyasi_final1.html'deki Market Factors bölümünü (satır 289-385) referans al:
- İklim & Üretim bölümü
- Ekonomik & Politik bölümü
- Talep bölümü
Her bölümde placeholder kartlar olsun. PROJECTv3.md'yi güncelle.
```

### 5. Bilgi Merkezi / Learn Sayfası (Faz 3)
```
/bilgi-merkezi sayfasını oluştur. kahve_dunyasi_final1.html'deki Learn bölümünü (satır 505-633) referans al:
- Kahve Futures 101
- Kahve Kuşağı & Coğrafya
- İşleme Yöntemleri
- Grafik Okuma Rehberi
- Terimler Sözlüğü
SEO için SSR önemli. PROJECTv3.md'yi güncelle.
```

### 6. Hava Radarı Sayfası (Faz 3)
```
/hava-radari sayfasını oluştur. kahve_dunyasi_final1.html'deki Weather Radar bölümünü (satır 634-746) referans al. Üretim bölgeleri hava durumu placeholder kartları olsun. PROJECTv3.md'yi güncelle.
```

### 7. Haberler Sayfası (Faz 3)
```
/haberler sayfasını oluştur:
- RSS akışı alanı (placeholder)
- Editör seçimi haberler (placeholder kartlar)
- Kategori filtreleri
- Haftalık özet alanı
PROJECTv3.md'yi güncelle.
```

### 8. Daha sonra (Faz 4-5-6)
- Trade Board / İlan sistemi
- Backend & Admin panel
- SEO optimizasyonu
- Premium içerik
- Mobil uygulama

---

## 📁 Önemli Dosyalar

| Dosya | Ne işe yarıyor |
|-------|----------------|
| `PROJECTv3.md` | Proje hafıza dosyası — Claude Code bunu okuyarak projeyi tanır |
| `kahve_dunyasi_final1.html` | Orijinal tasarım dosyası — referans olarak kullanılıyor |
| `src/components/Navbar.tsx` | Üst menü |
| `src/components/TickerBand.tsx` | Kayan fiyat bandı |
| `src/components/Sidebar.tsx` | Sol menü |
| `src/components/Footer.tsx` | Alt bilgi |
| `src/app/page.tsx` | Ana sayfa |
| `src/app/layout.tsx` | Genel sayfa düzeni + fontlar |
| `src/app/globals.css` | Özel stiller + animasyonlar |
| `tailwind.config.ts` | Renk paleti + font ayarları |

---

## ⚠️ Claude Code'a Söylerken Dikkat Et

- **Net ol:** "Footer yap" yerine "Footer.tsx oluştur, orijinal HTML'deki tasarımı referans al"
- **Dosya belirt:** "kahve_dunyasi_final1.html'deki satır 112-288'i oku"
- **Güncellet:** Her iş bitince "PROJECTv3.md'yi güncelle" de
- **Test ettir:** "npm run dev çalıştır ve hata var mı kontrol et" de
- **Git yaptır:** Her önemli iş bitince "git commit ve push yap" de

---

## 🚨 Sorun Çıkarsa

1. **Site açılmıyorsa:** Claude Code'a `npm run dev çalıştır` de
2. **Hata alıyorsan:** Hata metnini Claude Code'a yapıştır
3. **Claude Code yanıt vermiyorsa:** Terminalde Ctrl+C bas, sonra tekrar `claude` yaz
4. **Her şey karıştıysa:** claude.ai'ye gel, ekran görüntüsü at
