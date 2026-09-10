import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass } from "lucide-react";
import type { ArticleType, Prisma } from "@vistara/database";
import { prisma } from "@/lib/db";
import { EmptyCollection, ExplorePage, PageIntro } from "@/components/explore/ExplorePage";
import { CollectionFilters, CollectionPagination, queryPage, queryValue } from "@/components/explore/CollectionTools";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Content Creator", description: "Cerita, tips, fakta menarik, berita, dan promosi dalam koleksi editorial Vistara.",
  alternates: { canonical: "/content-creator" },
};
const articleTypes: { value: ArticleType; label: string }[] = [
  { value: "TIPS", label: "Tips" }, { value: "FAKTA_MENARIK", label: "Fakta Menarik" },
  { value: "BERITA", label: "Berita" }, { value: "PROMO", label: "Promosi" },
];

export default async function CreatorPage({ searchParams }: PageProps<"/content-creator">) {
  const query = await searchParams;
  const search = queryValue(query, "q");
  const type = articleTypes.find(item => item.value === queryValue(query, "tipe"));
  const order = queryValue(query, "urutan") === "terlama" ? "asc" : "desc";
  const page = queryPage(query);
  const pageSize = 9;
  const where: Prisma.ArticleWhereInput = {
    published_at: { lte: new Date() }, ...(type && { tipe: type.value }),
    ...(search && { OR: [{ judul: { contains: search, mode: "insensitive" } }, { ringkasan: { contains: search, mode: "insensitive" } }] }),
  };
  const [articles, total] = await Promise.all([
    prisma.article.findMany({ where, orderBy: [{ published_at: order }, { slug: "asc" }], skip: (page - 1) * pageSize, take: pageSize,
      select: { slug: true, judul: true, tipe: true, ringkasan: true, gambar_url: true, published_at: true } }),
    prisma.article.count({ where }),
  ]);
  const [featured, ...remaining] = articles;
  const dateLabel = (date: Date) => date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Makassar" });

  return <ExplorePage>
    <PageIntro label="Content Creator" title="Content Creator" description="Perjalanan, ruang hidup, dan rasa lokal. Temukan inspirasi dari cerita dan panduan dalam koleksi editorial Vistara."><Link className="explore-text-link" href="/bidang">Jelajahi tempatnya<ArrowUpRight size={17} aria-hidden="true" /></Link></PageIntro>
    <section className="explore-wrap collection-body" aria-label="Koleksi editorial">
      <CollectionFilters key={`${search}:${type?.value}:${order}`} action="/content-creator" query={search} placeholder="Topik atau judul artikel">
        <label>Jenis konten<select aria-label="Jenis konten" name="tipe" defaultValue={type?.value ?? ""}><option value="">Semua konten</option>{articleTypes.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label>Urutkan<select aria-label="Urutkan" name="urutan" defaultValue={order === "asc" ? "terlama" : "terbaru"}><option value="terbaru">Terbaru</option><option value="terlama">Terlama</option></select></label>
      </CollectionFilters>
      <div className="collection-result-heading"><h2>{type?.label ?? "Pilihan bacaan"}</h2><span><BookOpen size={16} aria-hidden="true" />{total} artikel</span></div>
      {featured ? <>
        <article className="creator-feature">
          <Link href={`/artikel/${featured.slug}`} className="creator-feature-image" aria-label={`Baca ${featured.judul}`}><Image src={featured.gambar_url} alt="" fill priority sizes="(max-width: 767px) 100vw, 55vw" /></Link>
          <div className="creator-feature-copy"><span className="creator-type" data-type={featured.tipe}>{articleTypes.find(item => item.value === featured.tipe)?.label}</span><h3><Link href={`/artikel/${featured.slug}`}>{featured.judul}</Link></h3><p>{featured.ringkasan}</p><div className="creator-byline"><span>Vistara Editorial</span><time dateTime={featured.published_at.toISOString()}>{dateLabel(featured.published_at)}</time></div><Link className="explore-text-link" href={`/artikel/${featured.slug}`}>Baca cerita<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </article>
        <div className="creator-grid">{remaining.map(article => <article key={article.slug} className="creator-card">
          <Link href={`/artikel/${article.slug}`}><div className="creator-card-image"><Image src={article.gambar_url} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" /><span className="creator-type" data-type={article.tipe}>{articleTypes.find(item => item.value === article.tipe)?.label}</span></div><div className="creator-card-copy"><div className="creator-byline"><span>Vistara Editorial</span><time dateTime={article.published_at.toISOString()}>{dateLabel(article.published_at)}</time></div><h3>{article.judul}</h3><p>{article.ringkasan}</p><span className="explore-text-link">Baca cerita<ArrowUpRight size={17} aria-hidden="true" /></span></div></Link>
        </article>)}</div>
      </> : <EmptyCollection resetHref="/content-creator" />}
      <CollectionPagination path="/content-creator" query={query} page={page} total={total} pageSize={pageSize} />
      <p className="collection-disclaimer">Koleksi editorial awal menggunakan data contoh. Direktori profil kreator dan pengajuan karya belum tersedia.</p>
    </section>
    <section className="explore-wrap explore-section"><div className="explore-crosslink"><div><p className="explore-eyebrow">DARI CERITA KE DESTINASI</p><h2>Temukan tempat untuk cerita berikutnya.</h2><p>Kenali penginapan, hunian, dan kuliner dari mitra Vistara.</p></div><Link href="/portofolio" className="explore-text-link"><Compass size={19} aria-hidden="true" />Kenali mitra Vistara<ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
  </ExplorePage>;
}