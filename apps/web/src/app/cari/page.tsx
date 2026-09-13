import type { Metadata } from "next";
import DiscoverSection from "@/components/DiscoverSection";
import type { ListingCardData } from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Hasil pencarian", robots: { index: false } };

export default async function SearchPage({ searchParams }: PageProps<"/cari">) {
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim();

  // TODO: ganti dengan full-text search Postgres saat jumlah listing bertambah banyak.
  const listings = query
    ? await prisma.listing.findMany({
        where: {
          status: "PUBLISHED",
          category: { status: "ACTIVE" },
          OR: [
            { judul: { contains: query, mode: "insensitive" } },
            { lokasi: { contains: query, mode: "insensitive" } },
            { deskripsi: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { nama: true, slug: true } },
          images: { orderBy: { urutan: "asc" }, take: 1 },
        },
      })
    : [];

  const cards: ListingCardData[] = listings.map((l) => ({
    slug: l.slug,
    judul: l.judul,
    lokasi: l.lokasi,
    harga: Number(l.harga),
    fotoUtama: l.images[0]?.url ?? null,
    kategoriNama: l.category.nama,
    kategoriSlug: l.category.slug,
  }));

  return (
    <main id="main-content" className="search-page flex-1">
      <div className="mx-auto w-full max-w-3xl px-4 pt-8">
      <h1 className="mb-5 text-2xl font-semibold">Cari di Vistara</h1>
        <SearchBar defaultValue={query} />
      </div>

      {query ? (
        <div className="mt-8">
          <DiscoverSection
            listings={cards}
            judul={`Hasil pencarian "${query}"`}
            deskripsi={`${cards.length} listing ditemukan.`}
            tampilkanTrending={false}
          />
        </div>
      ) : (
        <p className="mx-auto mt-8 w-full max-w-3xl px-4 text-sm text-muted">
          Masukkan kata kunci untuk mulai mencari.
        </p>
      )}
    </main>
  );
}
