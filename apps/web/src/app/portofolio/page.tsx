import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, MapPin, UsersRound } from "lucide-react";
import type { Prisma } from "@vistara/database";
import { prisma } from "@/lib/db";
import { EmptyCollection, ExplorePage, PageIntro } from "@/components/explore/ExplorePage";
import { CollectionFilters, CollectionPagination, queryPage, queryValue } from "@/components/explore/CollectionTools";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Portofolio Mitra", description: "Kenali mitra Vistara dan koleksi hotel, apartemen, cafe, serta restoran mereka.",
  alternates: { canonical: "/portofolio" },
};

export default async function PortfolioPage({ searchParams }: PageProps<"/portofolio">) {
  const query = await searchParams;
  const search = queryValue(query, "q");
  const category = queryValue(query, "kategori");
  const page = queryPage(query);
  const pageSize = 6;
  const listingWhere: Prisma.ListingWhereInput = {
    status: "PUBLISHED", category: { status: "ACTIVE", ...(category && { slug: category }) },
  };
  const where: Prisma.PartnerWhereInput = {
    statusVerifikasi: "APPROVED",
    listings: { some: listingWhere },
    ...(search && { OR: [
      { namaUsaha: { contains: search, mode: "insensitive" } },
      { listings: { some: { ...listingWhere, lokasi: { contains: search, mode: "insensitive" } } } },
    ] }),
  };
  const [partners, total, categories] = await Promise.all([
    prisma.partner.findMany({ where, orderBy: [{ namaUsaha: "asc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize, select: {
      id: true, namaUsaha: true, deskripsi: true,
      _count: { select: { listings: { where: listingWhere } } },
      listings: { where: listingWhere, orderBy: { slug: "asc" }, take: 3, select: {
        slug: true, judul: true, lokasi: true, category: { select: { nama: true, slug: true } },
        images: { orderBy: { urutan: "asc" }, take: 1, select: { url: true } },
      } },
    } }),
    prisma.partner.count({ where }),
    prisma.category.findMany({ where: { status: "ACTIVE" }, orderBy: { nama: "asc" }, select: { slug: true, nama: true } }),
  ]);

  return <ExplorePage>
    <PageIntro label="Portofolio" title="Portofolio mitra" description="Hotel, apartemen, cafe, dan restoran yang dikelola mitra Vistara."><span className="explore-count"><UsersRound size={20} aria-hidden="true" />{total} mitra ditemukan</span></PageIntro>
    <section className="explore-wrap collection-body" aria-label="Direktori mitra">
      <CollectionFilters key={`${search}:${category}`} action="/portofolio" query={search} placeholder="Nama mitra atau kota">
        <label>Bidang<select aria-label="Bidang" name="kategori" defaultValue={categories.some(item => item.slug === category) ? category : ""}><option value="">Semua bidang</option>{categories.map(item => <option key={item.slug} value={item.slug}>{item.nama}</option>)}</select></label>
      </CollectionFilters>
      <div className="collection-result-heading"><h2>Mitra dan properti</h2><span>{total} mitra dengan listing terbit</span></div>
      {partners.length ? <div className="partner-grid">{partners.map(partner => {
        const first = partner.listings[0];
        const image = first?.images[0]?.url;
        const categoriesLabel = [...new Set(partner.listings.map(listing => listing.category.nama))].join(" / ");
        return <article className="partner-card" key={partner.id}>
          <div className="partner-image">{image ? <Image src={image} alt={`Pilihan tempat ${partner.namaUsaha}`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" /> : <Building2 size={40} aria-hidden="true" />}<span>{categoriesLabel}</span></div>
          <div className="partner-copy"><p className="explore-eyebrow">{partner._count.listings} tempat</p><h3>{partner.namaUsaha}</h3>{partner.deskripsi && <p>{partner.deskripsi}</p>}
            <ul className="partner-places">{partner.listings.map(listing => <li key={listing.slug}><Link href={`/${listing.category.slug}/${listing.slug}`}>{listing.judul}<ArrowUpRight size={16} aria-hidden="true" /></Link><span><MapPin size={13} aria-hidden="true" />{listing.lokasi}</span></li>)}</ul>
            {first && <Link className="explore-text-link" href={`/${first.category.slug}?q=${encodeURIComponent(partner.namaUsaha)}`}>Jelajahi koleksi<ArrowUpRight size={17} aria-hidden="true" /></Link>}
          </div>
        </article>;
      })}</div> : <EmptyCollection resetHref="/portofolio" />}
      <CollectionPagination path="/portofolio" query={query} page={page} total={total} pageSize={pageSize} />
      <p className="collection-disclaimer">Koleksi awal memuat data contoh. Detail penawaran dan ketersediaan perlu dikonfirmasi kepada mitra.</p>
    </section>
  </ExplorePage>;
}