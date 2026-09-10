"use client";

import { useMemo } from "react";
import InsightCard from "@/components/InsightCard";
import { SEMUA, useFilterKategori } from "@/lib/filter-kategori";
import type { InsightCardData } from "@/lib/insight-ui";

export default function InsightSection({ insights }: { insights: InsightCardData[] }) {
  const { aktif } = useFilterKategori();

  const tampil = useMemo(
    () =>
      aktif === SEMUA ? insights : insights.filter((i) => i.kategoriTerkaitSlug === aktif),
    [insights, aktif],
  );

  if (insights.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-10 sm:pt-8 sm:pb-14">
        {/* Judul disembunyikan secara visual, tetap ada untuk pembaca layar & struktur heading. */}
        <h2 className="sr-only">Fakta &amp; Info Menarik</h2>

        {/* aria-live: filternya ada di hero, jauh dari konten ini, jadi perubahan
            jumlah kartu perlu diumumkan ke pembaca layar. */}
        <div
          aria-live="polite"
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-4"
        >
          {tampil.map((insight) => (
            <div key={insight.slug} className="w-64 shrink-0 snap-start sm:w-auto">
              <InsightCard insight={insight} />
            </div>
          ))}
        </div>

        {tampil.length === 0 && (
          <p className="mt-6 text-sm text-muted">Belum ada konten untuk kategori ini.</p>
        )}
      </div>
    </section>
  );
}
