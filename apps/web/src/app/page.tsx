import { Suspense } from "react";
import HeroSearch from "@/components/HeroSearch";
import ContentHighlight, { ContentHighlightSkeleton } from "@/components/ContentHighlight";
import HomeListings from "@/components/HomeListings";
import type { ListingCardData } from "@/components/ListingCard";
import { prisma } from "@/lib/db";
import { FilterKategoriProvider } from "@/lib/filter-kategori";

export const dynamic = "force-dynamic";

async function HomeArticles() {
  const articles = await prisma.article.findMany({
    where: { published_at: { lte: new Date() } },
    orderBy: [{ published_at: "desc" }, { slug: "asc" }],
    take: 8,
    select: { id: true, judul: true, slug: true, tipe: true, ringkasan: true, gambar_url: true, published_at: true },
  });
  return <ContentHighlight articles={articles.map(article => ({ ...article, published_at: article.published_at.toISOString() }))} />;
}

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { nama: "asc" },
    select: {
      slug: true,
      nama: true,
      listings: {
        where: { status: "PUBLISHED" },
        orderBy: [{ createdAt: "desc" }, { slug: "asc" }],
        take: 4,
        select: {
          slug: true, judul: true, lokasi: true, harga: true,
          images: { orderBy: { urutan: "asc" }, take: 1, select: { url: true } },
        },
      },
    },
  });
  const listingGroups = categories.map(category => category.listings.map(listing => ({
    slug: listing.slug,
    judul: listing.judul,
    lokasi: listing.lokasi,
    harga: Number(listing.harga),
    fotoUtama: listing.images[0]?.url ?? null,
    kategoriNama: category.nama,
    kategoriSlug: category.slug,
  })));
  const listings: ListingCardData[] = [0, 1, 2, 3].flatMap(index => listingGroups.flatMap(group => group[index] ? [group[index]] : []));

  return (
    <FilterKategoriProvider>
      <main id="main-content">
        <HeroSearch />
        <Suspense fallback={<ContentHighlightSkeleton />}><HomeArticles /></Suspense>
        <HomeListings listings={listings} />
      </main>
    </FilterKategoriProvider>
  );
}
