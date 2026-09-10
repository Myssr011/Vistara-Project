# Product Document — Vistara Project

**Versi:** 1.0 (Draft)
**Tanggal:** 6 September 2026
**Status:** Konsep awal — untuk didiskusikan dan divalidasi

---

## 1. Ringkasan Eksekutif

Vistara Project adalah platform multi-sektor yang menyatukan pencarian dan pemesanan properti (hotel, apartemen), gaya hidup (cafe/restoran), rekreasi (wisata, hiburan, olahraga), dan jasa promosi content creator dalam satu website. Desain mengikuti filosofi "search-first" ala Bing.com — simpel, jujur, langsung ke inti, tanpa elemen yang membingungkan pengguna.

Vistara memposisikan diri sebagai **agensi digital lintas sektor**, bukan sekadar direktori. Artinya platform tidak hanya menampilkan listing, tapi juga aktif memfasilitasi transaksi/kolaborasi antara pengguna dan mitra (pemilik usaha, content creator).

---

## 2. Latar Belakang & Masalah yang Diselesaikan

Saat ini pengguna harus membuka banyak platform berbeda untuk kebutuhan berbeda:
- Aplikasi booking hotel terpisah dari aplikasi sewa apartemen
- Rekomendasi cafe/wisata tersebar di berbagai platform review
- Content creator dan brand kesulitan menemukan satu sama lain tanpa perantara agensi formal

**Masalah inti:** tidak ada satu platform lokal yang menyatukan kebutuhan properti, gaya hidup, rekreasi, dan promosi konten dalam satu pengalaman pencarian yang sederhana.

---

## 3. Target Pengguna

| Segmen | Kebutuhan |
|---|---|
| Pencari properti (jangka pendek/panjang) | Cari & booking hotel/apartemen dengan cepat |
| Pencari gaya hidup & rekreasi | Rekomendasi cafe, tempat wisata, hiburan, olahraga terpercaya |
| Brand/UMKM | Menemukan content creator lokal untuk promosi |
| Content creator | Media promosi diri & mendapat tawaran kolaborasi |
| Pemilik usaha (hotel, apartemen, cafe, tempat wisata) | Kanal baru untuk listing & mendapat pelanggan |

---

## 4. Value Proposition

> "Satu pencarian, semua kebutuhan — dari tempat menginap sampai konten promosi, tanpa ribet pindah-pindah platform."

Diferensiasi utama:
- **Kesederhanaan tampilan** — terinspirasi dari Bing.com, fokus ke search bar dan kategori, bukan halaman penuh iklan
- **Cakupan lintas sektor** dalam satu ekosistem (bukan aplikasi vertikal tunggal)
- **Dua sisi platform** — melayani pencari maupun penyedia jasa/produk

---

## 5. Ruang Lingkup Fitur (Ikhtisar)

### 5.1 Kategori Utama (tombol di homepage)
1. Hotel
2. Apartemen
3. Fashion
4. Cafe / Restoran
5. Olahraga
6. Tempat Hiburan
7. Konten Kreator

### 5.2 Fitur Sisi Pengguna (User)
- Search bar utama (global, lintas kategori)
- Filter per kategori (lokasi, harga, tanggal, rating — disesuaikan per jenis)
- Halaman detail listing (foto, deskripsi, harga, ulasan)
- Kontak/booking langsung ke mitra
- (Opsional fase lanjut) Akun user untuk simpan favorit & riwayat

### 5.3 Fitur Sisi Mitra (Partner Dashboard)
- Registrasi & verifikasi mitra (hotel, cafe, content creator, dll)
- Upload & kelola listing (foto, harga, deskripsi, jam operasional)
- Terima & kelola permintaan booking/kolaborasi
- Statistik performa listing (views, klik, konversi)

### 5.4 Fitur Sisi Admin
- Moderasi listing baru (approval sebelum tayang)
- Manajemen kategori & konten homepage (mis. "trending")
- Laporan transaksi/komisi (jika model monetisasi memakai komisi)

---

## 6. Model Monetisasi (Perlu Divalidasi)

Beberapa opsi yang bisa dipilih — tidak eksklusif, bisa dikombinasikan:

| Model | Cara Kerja | Cocok untuk |
|---|---|---|
| Komisi per transaksi | Vistara ambil % dari setiap booking berhasil | Hotel, apartemen |
| Biaya listing bulanan | Mitra bayar untuk tampil di platform | Cafe, tempat wisata |
| Featured/Iklan | Mitra bayar agar listing muncul di posisi atas | Semua kategori |
| Paket kolaborasi | Fee untuk mempertemukan brand & content creator | Konten kreator |

**Catatan:** model ini akan menentukan struktur database, aturan approval mitra, serta elemen UI apa yang perlu ada di homepage (misal apakah perlu slot "featured").

---

## 7. Struktur & Alur Situs

```
User
  └─ Homepage (Search + Kategori)
       ├─ Properti (Hotel, Apartemen)
       ├─ Kuliner (Cafe/Resto)
       ├─ Wisata (Wisata, Hiburan, Olahraga)
       └─ Kreator (Konten Kreator)
             └─ Halaman Detail
                   └─ Booking / Kontak Langsung
```

Setiap kategori punya template halaman detail yang disesuaikan kebutuhan datanya masing-masing (lihat tabel fitur inti di bawah).

### 7.1 Fitur Inti per Kategori

| Kategori | Fitur Wajib di Halaman Detail |
|---|---|
| Hotel / Apartemen | Filter lokasi, tanggal, harga; galeri foto; kontak/booking |
| Cafe / Resto | Lokasi, jam buka, menu & harga, rating |
| Wisata / Hiburan / Olahraga | Lokasi, harga tiket, jam operasional |
| Konten Kreator | Portofolio, niche, engagement, cara kolaborasi |

---

## 8. Prioritas MVP (Minimum Viable Product)

Untuk fase awal peluncuran, disarankan tidak membangun ke-7 kategori sekaligus. Rekomendasi:

**Fase 1 (MVP):**
- Homepage dengan search bar & 7 tombol kategori (tampilan penuh)
- 2-3 kategori aktif penuh dengan data riil (misal: Hotel, Apartemen, Cafe/Resto)
- Kategori lain bisa tampil sebagai "Coming Soon" agar visi lengkap tetap terlihat
- Partner dashboard versi sederhana (upload listing manual, tanpa fitur analitik dulu)

**Fase 2:**
- Aktifkan sisa kategori (Fashion, Olahraga, Hiburan, Konten Kreator)
- Tambahkan sistem booking otomatis (bukan sekadar kontak manual)
- Dashboard analitik untuk mitra

**Fase 3:**
- Akun user, sistem favorit, riwayat
- Model monetisasi penuh (komisi/featured/langganan)
- Ekspansi wilayah/kota

---

## 9. Pertimbangan Teknis (High-Level)

- **SEO:** keyword generik ("hotel", "apartemen") sangat kompetitif — strategi awal harus fokus ke long-tail keyword + lokasi (mis. "sewa apartemen harian Makassar")
- **Skalabilitas data:** setiap kategori punya skema data berbeda — perlu struktur database yang fleksibel sejak awal
- **Verifikasi mitra:** penting untuk menjaga kepercayaan pengguna, terutama kategori yang melibatkan transaksi/pembayaran

---

## 10. Metrik Keberhasilan (Contoh Awal)

- Jumlah listing aktif per kategori
- Jumlah pencarian per kategori (menunjukkan kategori mana yang paling diminati)
- Tingkat konversi dari klik ke booking/kontak
- Jumlah mitra baru per bulan

---

## 11. Hal yang Masih Perlu Diputuskan

- [ ] Model monetisasi final (komisi vs listing fee vs iklan)
- [ ] Kategori mana yang jadi prioritas MVP
- [ ] Cakupan wilayah peluncuran awal (satu kota dulu atau nasional?)
- [ ] Nama & identitas visual (logo, warna, tone brand)
- [ ] Kebutuhan legal (perjanjian dengan mitra, kebijakan pembayaran)

---

*Dokumen ini adalah draft awal untuk mendukung diskusi. Setiap bagian bisa dan sebaiknya direvisi seiring validasi ide.*
