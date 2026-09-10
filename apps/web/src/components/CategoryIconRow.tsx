"use client";

import CategoryIconDock, { type DockKategori } from "@/components/CategoryIconDock";
import { SEMUA, useFilterKategori } from "@/lib/filter-kategori";

export type IkonKategori = DockKategori;

export default function CategoryIconRow({ kategori }: { kategori: IkonKategori[] }) {
  const { aktif, pilih } = useFilterKategori();

  return (
    <CategoryIconDock
      kategori={[{ slug: SEMUA, nama: "Semua" }, ...kategori]}
      aktif={aktif}
      onSelect={pilih}
    />
  );
}
