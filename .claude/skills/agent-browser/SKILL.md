---
name: agent-browser
description: Skill untuk otomasi browser khusus AI agent dengan Vercel agent-browser CLI (navigasi, klik, isi form, screenshot, snapshot aksesibilitas via perintah sederhana). Browser automation CLI for AI agents. Use when asked to "browse as agent", "agent browser", "otomasi browser via CLI", or agentic web interaction tasks.
license: Apache-2.0
metadata:
  author: vercel-labs/agent-browser
  version: "1.0"
---

# Agent Browser (Browser Automation CLI untuk AI Agent)

Sumber: https://github.com/vercel-labs/agent-browser (Apache-2.0). Instal via npm — tidak perlu clone repo.

## Apa ini

CLI otomasi browser native (Rust) yang dirancang untuk AI agent: satu perintah per aksi (buka URL, klik, isi form, screenshot, snapshot aksesibilitas, baca halaman sebagai markdown) tanpa menulis skrip. Mengendalikan Chrome via CDP — tidak membutuhkan Playwright/Node untuk daemon-nya.

## Instalasi

```bash
npm install -g agent-browser
agent-browser install --with-deps   # unduh Chrome for Testing + dependensi Linux (sekali saja)
```

Chrome/Brave/Playwright/Puppeteer yang sudah terpasang akan terdeteksi otomatis.

## Pemakaian

```bash
agent-browser open example.com             # buka halaman
agent-browser snapshot                     # accessibility tree dengan ref (@e1, @e2, ...)
agent-browser click @e2                    # klik berdasarkan ref dari snapshot
agent-browser fill @e3 "test@example.com"  # kosongkan lalu isi input
agent-browser get text @e1                 # ambil teks elemen
agent-browser read https://example.com     # baca halaman sebagai teks/markdown (tanpa Chrome)
agent-browser screenshot page.png          # tangkap layar (--full untuk seluruh halaman)
agent-browser eval "document.title"        # jalankan JavaScript
agent-browser close                        # tutup sesi
```

Selector CSS tradisional juga didukung (`agent-browser click "#submit"`), plus locator semantik (`find role button click --name "Submit"`). Jalankan `agent-browser --help` untuk daftar lengkap.

## Aturan kerja

- Alur utama: `snapshot` dulu → pakai `ref` (`@eN`) untuk `click`/`fill` → `snapshot` ulang setelah halaman berubah.
- Klik gagal jika elemen tertutup banner/modal — tutup elemen penutup yang dilaporkan, snapshot ulang, baru coba lagi.
- Sesi browser persisten antar perintah — selalu `close` setelah selesai.
- Untuk test E2E terstruktur, gunakan skill `playwright`; skill ini untuk interaksi agentic ad-hoc dari CLI.
