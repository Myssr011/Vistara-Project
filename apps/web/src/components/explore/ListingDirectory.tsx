import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Prisma } from "@vistara/database";
import { prisma } from "@/lib/db";
import ListingCard from "@/components/ListingCard";
import { EmptyCollection, ExplorePage, PageIntro } from "./ExplorePage";
import { CollectionFilters, CollectionPagination, queryPage, queryValue, type CollectionQuery } from "./CollectionTools";

export default async function ListingDirectory({ title, description, path, categorySlug, query }: {
  title: string; description: string; path: string; categorySlug?: string; query: CollectionQuery;
}) {
  const search = queryValue(query, "q");
  const location = queryValue(query, "lokasi");
  const order = queryValue(query, "urutan");
  const page = queryPage(query);
  const pageSize = 12;
  const selectedCategory = queryValue(query, "kategori");
  const allowedCategories = categorySlug ? [categorySlug] : ["hotel", "apartemen"];
  const selected = allowedCategories.includes(selectedCategory) ? selectedCategory : "";
  const where: Prisma.ListingWhereInput = {
    status: "PUBLISHED",
    category: { status: "ACTIVE", slug: { in: selected ? [selected] : allowedCategories } },
    ...(location && { lokasi: { contains: location, mode: "insensitive" } }),
    ...(search && { OR: [
      { judul: { contains: search, mode: "insensitive" } },
      { lokasi: { contains: search, mode: "insensitive" } },
      { partner: { namaUsaha: { contains: search, mode: "insensitive" } } },
    ] }),
  };
  const orderBy: Prisma.ListingOrderByWithRelationInput[] = order === "harga-asc" ? [{ harga: "asc" }, { slug: "asc" }]
    : order === "harga-desc" ? [{ harga: "desc" }, { slug: "asc" }] : [{ createdAt: "desc" }, { slug: "asc" }];
  const [listings, total, categories] = await Promise.all([
    prisma.listing.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize, select: {
      slug: true, judul: true, lokasi: true, harga: true,
      images: { orderBy: { urutan: "asc" }, take: 1, select: { url: true } },
      category: { select: { slug: true, nama: true } },
    } }),
    prisma.listing.count({ where }),
    prisma.category.findMany({ where: { status: "ACTIVE", slug: { in: allowedCategories } }, select: { slug: true, nama: true }, orderBy: { nama: "asc" } }),
  ]);
  return <ExplorePage>
    <PageIntro label={categorySlug ? title : "Aset"} title={title} description={description}><Link href="/portofolio" className="explore-text-link">Kenali mitranya<ArrowUpRight size={17} aria-hidden="true" /></Link></PageIntro>
    <div className="explore-wrap collection-body">
      <CollectionFilters key={`${search}:${location}:${selected}:${order}`} action={path} query={search} placeholder="Nama tempat, mitra, atau kota">
        {!categorySlug && <label>Kategori<select aria-label="Kategori" name="kategori" defaultValue={selected}><option value="">Semua properti</option>{categories.map(category => <option key={category.slug} value={category.slug}>{category.nama}</option>)}</select></label>}
        <label>Lokasi<input name="lokasi" defaultValue={location} placeholder="Kota atau kawasan" maxLength={120} /></label>
        <label>Urutkan<select aria-label="Urutkan" name="urutan" defaultValue={order === "harga-asc" || order === "harga-desc" ? order : "terbaru"}><option value="terbaru">Terbaru</option><option value="harga-asc">Harga terendah</option><option value="harga-desc">Harga tertinggi</option></select></label>
      </CollectionFilters>
      <div className="collection-result-heading"><h2>{total} {categorySlug === "cafe-restoran" ? "tempat" : "properti"} ditemukan</h2><span><MapPin size={15} aria-hidden="true" />{location || "Semua lokasi"}</span></div>
      {listings.length ? <div className="explore-listing-grid">{listings.map(listing => <ListingCard key={listing.slug} listing={{
        slug: listing.slug, judul: listing.judul, lokasi: listing.lokasi, harga: Number(listing.harga),
        fotoUtama: listing.images[0]?.url ?? null, kategoriNama: listing.category.nama, kategoriSlug: listing.category.slug,
      }} />)}</div> : <EmptyCollection resetHref={path} />}
      <CollectionPagination path={path} query={query} page={page} total={total} pageSize={pageSize} />
      <p className="collection-disclaimer">Harga awal dapat memiliki satuan dan ketentuan berbeda. Konfirmasikan rincian harga serta ketersediaan kepada mitra.</p>
    </div>
  </ExplorePage>;
}