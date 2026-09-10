export const KATEGORI_LAYANAN = [
  { slug: "semua", nama: "Semua", kategori: [] },
  { slug: "properti", nama: "Properti", kategori: ["hotel", "apartemen"] },
  { slug: "kuliner", nama: "Kuliner", kategori: ["cafe-restoran"] },
  { slug: "wisata", nama: "Wisata", kategori: ["wisata", "tempat-hiburan"] },
  { slug: "media-sosial", nama: "Media Sosial", kategori: ["media-sosial", "konten-kreator"] },
] satisfies { slug: string; nama: string; kategori: string[] }[];

export function cocokKategoriLayanan(kategoriSlug: string, pilihan: string) {
  const layanan = KATEGORI_LAYANAN.find(kategori => kategori.slug === pilihan);
  return pilihan === "semua" || (layanan ? layanan.kategori.includes(kategoriSlug) : kategoriSlug === pilihan);
}