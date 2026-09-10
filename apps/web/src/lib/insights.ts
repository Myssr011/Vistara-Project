import { prisma } from "@/lib/db";
import type { InsightCardData, InsightDetail } from "@/lib/insight-ui";

// TODO: saat dashboard admin sudah bisa mengelola insight, tambahkan paginasi di sini.
// Komponen UI tidak perlu berubah.
export async function ambilInsightTerbaru(limit: number): Promise<InsightCardData[]> {
  const rows = await prisma.insight.findMany({
    where: { aktif: true },
    orderBy: { tanggalTerbit: "desc" },
    take: limit,
    select: {
      slug: true,
      judul: true,
      kategori: true,
      gambarUrl: true,
      ringkasan: true,
      tanggalTerbit: true,
      kategoriTerkait: { select: { slug: true } },
    },
  });

  return rows.map(({ kategoriTerkait, ...rest }) => ({
    ...rest,
    kategoriTerkaitSlug: kategoriTerkait?.slug ?? null,
  }));
}

export async function ambilInsight(slug: string): Promise<InsightDetail | null> {
  const row = await prisma.insight.findFirst({
    where: { slug, aktif: true },
    select: {
      slug: true,
      judul: true,
      kategori: true,
      gambarUrl: true,
      ringkasan: true,
      tanggalTerbit: true,
      konten: true,
      sumber: true,
      kategoriTerkait: { select: { slug: true } },
    },
  });
  if (!row) return null;

  const { kategoriTerkait, ...rest } = row;
  return { ...rest, kategoriTerkaitSlug: kategoriTerkait?.slug ?? null };
}
