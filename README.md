# Vistara Project

Platform multi-sektor "search-first" — hotel, apartemen, dan cafe/restoran dalam satu pencarian.
Monorepo Turborepo berisi situs publik (Next.js) dan dashboard mitra/admin (SvelteKit) yang berbagi
satu skema database Prisma.

| Paket | Lokasi | Teknologi | Peran |
|---|---|---|---|
| `@vistara/web` | `apps/web` | Next.js 16 (App Router, SSR) | Situs publik, dioptimasi SEO |
| `@vistara/dashboard` | `apps/dashboard` | SvelteKit 2 (CSR) | Dashboard mitra & admin |
| `@vistara/database` | `packages/database` | Prisma 7 + PostgreSQL | Skema, client, dan seed bersama |

---

## Prasyarat

- **Node.js** >= 20 (`node -v`)
- **pnpm** 10.x — `corepack enable && corepack prepare pnpm@10.32.1 --activate`
- **Docker** (untuk PostgreSQL lokal) atau PostgreSQL 16+ yang sudah berjalan

---

## Cara cepat — satu perintah

```bash
cd Vistara-Project
npm run dev
```

Perintah ini menyiapkan semuanya secara otomatis lalu menjalankan kedua aplikasi:

1. Membuat `.env` di tiap app dari `.env.example` bila belum ada
2. Menjalankan `pnpm install` bila dependency belum terpasang
3. Menyalakan container PostgreSQL (`vistara-pg`) dan menunggu sampai siap menerima koneksi
4. Menjalankan `prisma generate` dan menyinkronkan skema ke database
5. Mengisi data contoh **hanya jika database masih kosong** (data Anda tidak akan tertimpa)
6. Menjalankan `@vistara/web` dan `@vistara/dashboard` secara paralel

| Aplikasi | URL |
|---|---|
| Situs publik (Next.js) | http://localhost:3000 |
| Dashboard (SvelteKit) | http://localhost:5173 |

Perintah pendukung:

| Perintah | Kegunaan |
|---|---|
| `npm run setup` | Hanya menjalankan persiapan, tanpa menyalakan aplikasi |
| `npm run dev:only` | Langsung menjalankan aplikasi, melewati persiapan |

> Skrip persiapan ada di [`scripts/dev.mjs`](scripts/dev.mjs) dan aman dijalankan berulang kali.
> Jika `DATABASE_URL` menunjuk ke host selain `localhost`, pengelolaan container dilewati dan
> database eksternal Anda yang dipakai.

Bagian di bawah menjelaskan langkah yang sama secara manual — berguna saat perlu memahami atau
men-debug tiap tahap.

---

## Langkah manual

### Langkah 1 — Install dependency

```bash
cd Vistara-Project
pnpm install
```

Perintah ini meng-install seluruh workspace sekaligus. Jangan menjalankan `pnpm install` di dalam
`apps/*` atau `packages/*` secara terpisah.

---

### Langkah 2 — Jalankan database PostgreSQL

```bash
docker run -d --name vistara-pg \
  -e POSTGRES_USER=vistara \
  -e POSTGRES_PASSWORD=vistara \
  -e POSTGRES_DB=vistara \
  -p 5433:5432 \
  postgres:17-alpine
```

> Port host sengaja **5433** agar tidak bentrok dengan PostgreSQL lain yang mungkin sudah memakai 5432.
> Jika 5432 Anda kosong, silakan ganti ke `-p 5432:5432` dan sesuaikan `DATABASE_URL` di Langkah 3.

Cek container sudah jalan:

```bash
docker ps --filter name=vistara-pg
```

Menjalankan ulang setelah komputer di-restart cukup dengan `docker start vistara-pg`.

---

### Langkah 3 — Siapkan environment variable

Setiap aplikasi punya `.env` sendiri, tetapi semuanya menunjuk ke `DATABASE_URL` yang sama.

```bash
cp packages/database/.env.example packages/database/.env
cp apps/web/.env.example          apps/web/.env
cp apps/dashboard/.env.example    apps/dashboard/.env
```

Isi default sudah cocok dengan container di Langkah 2:

```env
DATABASE_URL="postgresql://vistara:vistara@localhost:5433/vistara?schema=public"
```

`apps/web/.env` punya satu variabel tambahan yang dipakai untuk `sitemap.xml` dan canonical URL:

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

### Langkah 4 — Generate Prisma client

```bash
pnpm db:generate
```

Client di-generate ke `packages/database/generated/prisma` (tidak masuk git). Wajib dijalankan ulang
setiap kali `packages/database/prisma/schema.prisma` berubah.

---

### Langkah 5 — Buat tabel di database

```bash
pnpm db:push
```

`db:push` menyinkronkan skema langsung tanpa file migrasi — cocok untuk fase pengembangan.
Untuk migrasi bersejarah (menuju staging/production) gunakan:

```bash
pnpm --filter @vistara/database db:migrate
```

---

### Langkah 6 — Isi data contoh

```bash
pnpm db:seed
```

Pada database kosong, seed membuat **7 kategori, 5 mitra, 10 listing, 4 booking,
12 Insight, dan 8 Article**. Pada database yang sudah berisi data, seed hanya
menambahkan Article berdasarkan slug yang belum ada. Data existing tidak dihapus
atau ditimpa. Article mencakup Promosi, Fakta Menarik, Tips, dan Berita.

Homepage menampilkan Sorotan Vistara (Article), lalu Rekomendasi Untukmu (listing).
Filter kategori berlaku untuk listing; Article belum memiliki relasi kategori layanan.
AccountBar menggunakan state demo lokal untuk login, bahasa, dan tema, bukan autentikasi nyata.

Untuk preview paralel tanpa berbagi cache dengan server development utama:

```bash
NEXT_DIST_DIR=.next/preview pnpm --filter @vistara/web dev --port 3001
```

---

### Langkah 7 — Jalankan aplikasi

Kedua aplikasi sekaligus, tanpa mengulang tahap persiapan di atas:

```bash
pnpm dev:only
```

Hanya salah satu:

```bash
pnpm turbo dev --filter=@vistara/web
pnpm turbo dev --filter=@vistara/dashboard
```

---

## Perintah harian

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Persiapan otomatis + jalankan semua app |
| `npm run setup` | Hanya persiapan (env, database, skema, seed) |
| `pnpm dev:only` | Jalankan semua app tanpa persiapan |
| `pnpm build` | Build produksi seluruh workspace |
| `pnpm check-types` | Type-check (`tsc` untuk web, `svelte-check` untuk dashboard) |
| `pnpm lint` | Jalankan ESLint |
| `pnpm db:generate` | Generate ulang Prisma client |
| `pnpm db:push` | Sinkronkan skema ke database |
| `pnpm db:seed` | Isi ulang data contoh |
| `pnpm --filter @vistara/database db:studio` | Buka Prisma Studio untuk melihat isi database |

---

## Struktur folder

```
Vistara-Project/
├── apps/
│   ├── web/                        # Next.js — situs publik
│   │   └── src/
│   │       ├── app/
│   │       │   ├── page.tsx        # Homepage
│   │       │   ├── [category]/     # Listing per kategori + detail listing
│   │       │   ├── cari/           # Hasil pencarian global
│   │       │   ├── api/booking/    # Endpoint form booking
│   │       │   ├── sitemap.ts
│   │       │   └── robots.ts
│   │       ├── components/
│   │       └── lib/
│   └── dashboard/                  # SvelteKit — dashboard
│       └── src/routes/
│           ├── (auth)/             # login, register
│           ├── (app)/              # listing & booking milik mitra
│           └── (admin)/            # moderasi listing, mitra, kategori
├── packages/
│   └── database/
│       ├── prisma/schema.prisma    # Sumber kebenaran skema
│       ├── prisma/seed.ts
│       ├── prisma.config.ts
│       └── src/index.ts            # createPrismaClient()
├── turbo.json
├── scripts/dev.mjs                 # Persiapan otomatis untuk `npm run dev`
└── pnpm-workspace.yaml
```

---

## Catatan penting

**Prisma 7 tidak lagi menerima `url` di dalam blok `datasource`.** Connection string berada di
`packages/database/prisma.config.ts` (dipakai Prisma CLI), sedangkan client aplikasi dibuat lewat
factory `createPrismaClient(connectionString)` dengan driver adapter `@prisma/adapter-pg`. Pola
factory dipilih karena tiap app membaca env dengan cara berbeda: Next.js lewat `process.env`,
SvelteKit lewat `$env/dynamic/private`.

**Tailwind CSS v4 tidak memakai `tailwind.config.js`.** Token warna Vistara didefinisikan di blok
`@theme` pada `apps/web/src/app/globals.css`:

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `primary` | `#0A66C2` | Tombol utama, border focus search bar |
| `primary-soft` | `#E8F1FB` | Background pill nonaktif, hover |
| `primary-deep` | `#063970` | Judul & heading |
| `surface` | `#F5F7FA` | Background section di luar hero |
| `muted` | `#6B7280` | Teks sekunder |
| `badge-warning` | `#FEF3C7` / `#92400E` | Badge "Segera Hadir" |

**Dashboard sengaja tanpa SSR** (`export const ssr = false` di `src/routes/+layout.ts`) karena tidak
membutuhkan SEO.

---

## Troubleshooting

| Gejala | Penyebab & solusi |
|---|---|
| Apa pun yang berkaitan dengan env, container, atau skema | Coba `npm run setup` lebih dulu — sebagian besar masalah di bawah diperbaiki otomatis |
| `DATABASE_URL belum di-set` | File `.env` belum dibuat di app yang bersangkutan — ulangi Langkah 3 |
| `Can't reach database server at localhost:5433` | Container mati. Jalankan `docker start vistara-pg` |
| `Cannot find module '../generated/prisma/client'` | Prisma client belum di-generate. Jalankan `pnpm db:generate` |
| Port berikut masih dipakai proses lain | Ada `npm run dev` lain yang belum dihentikan. Ctrl+C di terminal tersebut, atau `lsof -ti tcp:3000,5173 \| xargs -r kill` |
| Homepage kosong tanpa listing | Data belum di-seed. Jalankan `pnpm db:seed` |

> Jangan menjalankan `pnpm build` di direktori app yang dev server-nya sedang aktif — keduanya menulis
> ke folder cache yang sama dan bisa saling merusak.

---

## Status pengembangan

Fase 1 (MVP) sedang berjalan. Kategori aktif: **Hotel, Apartemen, Cafe/Restoran**. Kategori
Fashion, Olahraga, Tempat Hiburan, dan Konten Kreator masih berstatus "Segera Hadir".

| Bagian | Status |
|---|---|
| Struktur monorepo & skema database | Selesai |
| Homepage (hero, kategori, rekomendasi) | Selesai |
| Halaman kategori & detail listing | Kerangka halaman, query belum diimplementasi |
| Autentikasi & CRUD dashboard mitra | Kerangka rute, belum diimplementasi |
| Dashboard admin (moderasi) | Kerangka rute, belum diimplementasi |

Rincian ruang lingkup produk ada di [Vistara-Project-Product-Document.md](Vistara-Project-Product-Document.md).
