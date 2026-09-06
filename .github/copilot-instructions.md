# Instruksi Repo MyCopilot

Instruksi ini berlaku otomatis untuk SEMUA sesi chat di repo ini.

## Bahasa

- Balas dalam Bahasa Indonesia, kecuali pengguna memakai bahasa lain.

## Pedoman perilaku

- Ikuti 4 prinsip di [AGENTS.md](../AGENTS.md) (Karpathy guidelines): Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution.

## Agent Skills (wajib)

- Repo ini punya 46 skill di `.claude/skills/<nama>/SKILL.md`.
- Sebelum mengerjakan tugas yang cocok dengan domain sebuah skill (desain, GSAP, Three.js, SEO, performa, aksesibilitas, keamanan/Semgrep, testing Playwright, agent-browser, whisper, dll.), BACA file SKILL.md terkait terlebih dahulu dan ikuti instruksinya.
- Daftar lengkap skill + kategorinya ada di [README.md](../README.md).
- Skill juga bisa dipanggil eksplisit lewat slash command `/<nama-skill>` (prompt file di `.github/prompts/`).

## Konvensi repo

- Jangan mengubah isi `SKILL.md` skill pihak ketiga; atribusi lisensi dicatat di `.claude/skills/THIRD-PARTY-SKILLS.md` (sumber + SHA snapshot) — pertahankan file ini saat memperbarui skill.
- Skill wrapper clone-on-demand (whisper, open-seo, open-notebook, ai-job-search, playwright, agent-browser): instal via package manager saat dibutuhkan, jangan clone repo sumbernya ke repo ini.
- Saat menambah skill baru: sertakan LICENSE per skill, tambahkan baris atribusi di THIRD-PARTY-SKILLS.md, buat prompt file `.github/prompts/<nama>.prompt.md`, dan perbarui tabel di README.md.
