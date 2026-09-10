import type { InsightKategori } from "@vistara/database";

// Modul ini sengaja bebas dari Prisma agar aman diimpor client component.
// Query database ada di lib/insights.ts.

export type InsightCardData = {
  slug: string;
  judul: string;
  kategori: InsightKategori;
  gambarUrl: string;
  ringkasan: string;
  tanggalTerbit: Date;
  /** Slug kategori layanan yang dibahas. Null berarti konten umum. */
  kategoriTerkaitSlug: string | null;
};

export type InsightDetail = InsightCardData & {
  konten: string | null;
  sumber: string | null;
};

/** Label & warna badge per kategori insight. */
export const INSIGHT_KATEGORI: Record<
  InsightKategori,
  { label: string; badgeClass: string }
> = {
  BERITA: { label: "Berita", badgeClass: "bg-sky-100 text-sky-800" },
  TIPS: { label: "Tips", badgeClass: "bg-emerald-100 text-emerald-800" },
  PROMO: { label: "Promo", badgeClass: "bg-orange-100 text-orange-800" },
  FAKTA_MENARIK: { label: "Fakta Menarik", badgeClass: "bg-violet-100 text-violet-800" },
};

export function formatTanggal(tanggal: Date): string {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
