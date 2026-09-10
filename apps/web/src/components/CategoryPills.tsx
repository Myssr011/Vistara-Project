"use client";

import { Building2, Utensils, LayoutGrid, Compass, Share2, type LucideIcon } from "lucide-react";
import { useFilterKategori } from "@/lib/filter-kategori";
import { KATEGORI_LAYANAN } from "@/lib/kategori-layanan";

const icons: Record<string, LucideIcon> = { semua: LayoutGrid, properti: Building2, kuliner: Utensils, wisata: Compass, "media-sosial": Share2 };

export default function CategoryPills() {
  const { aktif, pilih } = useFilterKategori();
  return (
    <div className="quick-categories" role="group" aria-label="Kategori layanan">
      {KATEGORI_LAYANAN.map(category => {
        const Icon = icons[category.slug] ?? LayoutGrid;
        return <button key={category.slug} type="button" aria-pressed={aktif === category.slug} onClick={() => pilih(category.slug)}>
          <span className="quick-category-circle"><Icon size={22} aria-hidden="true" /></span>
          <span className="quick-category-label">{category.nama}</span>
        </button>;
      })}
    </div>
  );
}
