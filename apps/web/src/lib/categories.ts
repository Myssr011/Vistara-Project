/** Tipe filter tidak disimpan di database — hanya menentukan set input di halaman kategori. */
export type FilterType = "penginapan" | "tempat" | "kreator";

const FILTER_TYPE_BY_SLUG: Record<string, FilterType> = {
  hotel: "penginapan",
  apartemen: "penginapan",
  "cafe-restoran": "tempat",
  fashion: "tempat",
  olahraga: "tempat",
  "tempat-hiburan": "tempat",
  "konten-kreator": "kreator",
};

export function getFilterType(slug: string): FilterType {
  return FILTER_TYPE_BY_SLUG[slug] ?? "tempat";
}
