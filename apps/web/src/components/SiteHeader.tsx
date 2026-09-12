"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavKategori = { slug: string; nama: string };

export default function SiteHeader({
  kategori,
  loginUrl,
}: {
  kategori: NavKategori[];
  loginUrl: string;
}) {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  // Di homepage navbar mengambang di atas foto hero, di halaman lain jadi bar putih.
  const transparan = pathname === "/";

  useEffect(() => setMenuTerbuka(false), [pathname]);

  useEffect(() => {
    if (!menuTerbuka) return;
    const tutup = (e: KeyboardEvent) => e.key === "Escape" && setMenuTerbuka(false);
    window.addEventListener("keydown", tutup);
    return () => window.removeEventListener("keydown", tutup);
  }, [menuTerbuka]);

  return (
    <header
      className={
        transparan
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur"
      }
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/vistara-mark.png"
            alt=""
            width={30}
            height={28}
            sizes="30px"
            className={`h-7 w-auto ${transparan ? "brightness-0 invert" : ""}`}
          />
          <span
            className={`font-brand text-lg font-semibold tracking-[0.18em] ${
              transparan ? "text-white drop-shadow-sm" : "text-primary-deep"
            }`}
          >
            VISTARA
          </span>
        </Link>

        <nav aria-label="Kategori" className="ml-4 hidden items-center gap-1 md:flex">
          {kategori.map((k) => (
            <Link
              key={k.slug}
              href={`/${k.slug}`}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                transparan
                  ? "text-white/90 hover:bg-white/15 hover:text-white"
                  : "text-primary-deep hover:bg-primary-soft"
              }`}
            >
              {k.nama}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={loginUrl}
            className={`hidden rounded-full px-4 py-2 text-sm font-medium transition sm:block ${
              transparan
                ? "bg-white/95 text-primary hover:bg-white"
                : "bg-primary text-white hover:bg-primary-deep"
            }`}
          >
            Masuk
          </a>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuTerbuka}
            aria-controls="menu-utama"
            onClick={() => setMenuTerbuka((v) => !v)}
            className={`rounded-full p-2 transition ${
              transparan
                ? "text-white hover:bg-white/15"
                : "text-primary-deep hover:bg-primary-soft"
            }`}
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </div>

      {menuTerbuka && (
        <div
          id="menu-utama"
          className="mx-4 mb-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg"
        >
          <nav aria-label="Menu utama" className="flex flex-col">
            {kategori.map((k) => (
              <Link
                key={k.slug}
                href={`/${k.slug}`}
                className="rounded-xl px-3 py-2.5 text-sm text-primary-deep hover:bg-primary-soft"
              >
                {k.nama}
              </Link>
            ))}
            <a
              href={loginUrl}
              className="mt-1 rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-medium text-white"
            >
              Masuk
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
