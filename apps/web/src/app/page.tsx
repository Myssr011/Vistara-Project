import { Suspense } from "react";
import HeroSearch from "@/components/HeroSearch";
import ContentHighlight, { ContentHighlightSkeleton } from "@/components/ContentHighlight";
import CreatorMarquee from "@/components/CreatorMarquee";
import { prisma } from "@/lib/db";
import { FilterKategoriProvider } from "@/lib/filter-kategori";

export const dynamic = "force-dynamic";

async function HomeArticles() {
  const articles = await prisma.article.findMany({
    where: { published_at: { lte: new Date() } },
    orderBy: [{ published_at: "desc" }, { slug: "asc" }],
    take: 14,
    select: { id: true, judul: true, slug: true, tipe: true, ringkasan: true, gambar_url: true, published_at: true },
  });
  return <ContentHighlight articles={articles.map(article => ({ ...article, published_at: article.published_at.toISOString() }))} />;
}

export default async function Home() {
  const creators = await prisma.creator.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ created_at: "asc" }, { id: "asc" }],
    select: { id: true, nama: true, niche: true, foto_url: true },
  });
  return (
    <FilterKategoriProvider>
      <main id="main-content">
        <HeroSearch />
        <Suspense fallback={<ContentHighlightSkeleton />}><HomeArticles /></Suspense>
        <CreatorMarquee creators={creators} />
      </main>
    </FilterKategoriProvider>
  );
}
