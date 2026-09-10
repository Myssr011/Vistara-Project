#!/usr/bin/env node
// Menyiapkan semua prasyarat lokal supaya `npm run dev` cukup satu perintah:
// .env → dependency → container Postgres → Prisma client → skema → data contoh.

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DB_DIR = path.join(ROOT, "packages", "database");
const CONTAINER = "vistara-pg";
const POSTGRES_IMAGE = "postgres:17-alpine";

const PORT_APLIKASI = [
  [3000, "@vistara/web"],
  [5173, "@vistara/dashboard"],
];

const ENV_FILES = [
  "packages/database/.env",
  "apps/web/.env",
  "apps/dashboard/.env",
];

function log(pesan) {
  console.log(`\x1b[36m▸\x1b[0m ${pesan}`);
}

function jalankan(cmd, args, opts = {}) {
  const hasil = spawnSync(cmd, args, { stdio: "inherit", cwd: ROOT, ...opts });
  if (hasil.status !== 0) {
    console.error(`\n\x1b[31m✖ Gagal:\x1b[0m ${cmd} ${args.join(" ")}`);
    process.exit(hasil.status ?? 1);
  }
}

function tangkap(cmd, args, opts = {}) {
  return spawnSync(cmd, args, { encoding: "utf8", cwd: ROOT, ...opts });
}

function tidur(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function siapkanEnv() {
  for (const target of ENV_FILES) {
    const tujuan = path.join(ROOT, target);
    if (existsSync(tujuan)) continue;
    copyFileSync(`${tujuan}.example`, tujuan);
    log(`Membuat ${target} dari .env.example`);
  }
}

function bacaDatabaseUrl() {
  const isi = readFileSync(path.join(DB_DIR, ".env"), "utf8");
  const cocok = isi.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
  if (!cocok) {
    console.error("✖ DATABASE_URL tidak ditemukan di packages/database/.env");
    process.exit(1);
  }
  return cocok[1];
}

function siapkanDependency() {
  if (existsSync(path.join(ROOT, "node_modules", ".bin", "turbo"))) return;
  log("Dependency belum terpasang, menjalankan pnpm install…");
  jalankan("pnpm", ["install"]);
}

function siapkanDatabase(url) {
  const koneksi = new URL(url);
  const lokal = ["localhost", "127.0.0.1"].includes(koneksi.hostname);

  if (!lokal) {
    log(`Memakai database eksternal di ${koneksi.hostname} — container dilewati.`);
    return;
  }

  if (tangkap("docker", ["version"]).status !== 0) {
    log("Docker tidak tersedia — pastikan PostgreSQL lokal Anda sudah berjalan.");
    return;
  }

  const daftar = tangkap("docker", [
    "ps",
    "-a",
    "--filter",
    `name=^${CONTAINER}$`,
    "--format",
    "{{.Names}}",
  ]);
  const adaContainer = daftar.stdout.trim() === CONTAINER;

  if (!adaContainer) {
    log(`Membuat container ${CONTAINER} (${POSTGRES_IMAGE})…`);
    jalankan("docker", [
      "run",
      "-d",
      "--name",
      CONTAINER,
      "-e",
      `POSTGRES_USER=${decodeURIComponent(koneksi.username)}`,
      "-e",
      `POSTGRES_PASSWORD=${decodeURIComponent(koneksi.password)}`,
      "-e",
      `POSTGRES_DB=${koneksi.pathname.slice(1)}`,
      "-p",
      `${koneksi.port || 5432}:5432`,
      POSTGRES_IMAGE,
    ]);
  } else {
    const jalan = tangkap("docker", [
      "ps",
      "--filter",
      `name=^${CONTAINER}$`,
      "--format",
      "{{.Names}}",
    ]);
    if (jalan.stdout.trim() !== CONTAINER) {
      log(`Menyalakan container ${CONTAINER}…`);
      jalankan("docker", ["start", CONTAINER]);
    }
  }

  tungguDatabaseSiap(koneksi);
}

function tungguDatabaseSiap(koneksi) {
  const pengguna = decodeURIComponent(koneksi.username);
  const basis = koneksi.pathname.slice(1);

  for (let percobaan = 0; percobaan < 30; percobaan++) {
    const siap = tangkap("docker", [
      "exec",
      CONTAINER,
      "pg_isready",
      "-U",
      pengguna,
      "-d",
      basis,
    ]);
    if (siap.status === 0) return;
    if (percobaan === 0) log("Menunggu PostgreSQL siap…");
    tidur(1000);
  }

  console.error("✖ PostgreSQL tidak kunjung siap setelah 30 detik.");
  process.exit(1);
}

function siapkanSkema() {
  log("Menyiapkan Prisma client & skema database…");
  jalankan("pnpm", ["--filter", "@vistara/database", "db:generate"]);
  jalankan("pnpm", ["--filter", "@vistara/database", "db:push"]);
}

function siapkanDataContoh(url) {
  // Seed menghapus data lama, jadi hanya dijalankan saat database benar-benar kosong.
  const cek = spawnSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--input-type=module",
      "-e",
      `
        import { createPrismaClient } from ${JSON.stringify(path.join(DB_DIR, "src", "index.ts"))};
        const prisma = createPrismaClient(process.env.DATABASE_URL);
        const jumlah = await prisma.category.count();
        await prisma.$disconnect();
        process.exit(jumlah === 0 ? 10 : 0);
      `,
    ],
    { cwd: DB_DIR, env: { ...process.env, DATABASE_URL: url }, stdio: "ignore" },
  );

  if (cek.status === 10) {
    log("Database masih kosong, mengisi data contoh…");
    jalankan("pnpm", ["--filter", "@vistara/database", "db:seed"]);
  }
}

function portTerpakai(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true));
    server.once("listening", () => server.close(() => resolve(false)));
    server.listen(port, "127.0.0.1");
  });
}

async function pastikanPortKosong() {
  const bentrok = [];
  for (const [port, paket] of PORT_APLIKASI) {
    if (await portTerpakai(port)) bentrok.push({ port, paket });
  }
  if (bentrok.length === 0) return;

  console.error("\n\x1b[31m✖ Port berikut masih dipakai proses lain:\x1b[0m");
  for (const { port, paket } of bentrok) console.error(`  - ${port} → dibutuhkan ${paket}`);
  console.error(
    "\nKemungkinan besar ada `npm run dev` lain yang masih berjalan.\n" +
      "Hentikan dulu (Ctrl+C di terminal tersebut), atau matikan paksa dengan:\n" +
      `  lsof -ti tcp:${bentrok.map((b) => b.port).join(",")} | xargs -r kill\n`,
  );
  process.exit(1);
}

siapkanEnv();
siapkanDependency();
const databaseUrl = bacaDatabaseUrl();
siapkanDatabase(databaseUrl);
siapkanSkema();
siapkanDataContoh(databaseUrl);
await pastikanPortKosong();
log("Siap. Menjalankan aplikasi…\n");
