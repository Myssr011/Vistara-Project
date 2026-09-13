import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, MessageCircle } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import CreatorCard from "@/components/CreatorCard";
import { getBidangConfig, type BidangConfig } from "@/lib/bidang-config";
import { prisma } from "@/lib/db";
import styles from "./bidang.module.css";

type BidangPageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BidangPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bidang = getBidangConfig(slug);
  if (!bidang) notFound();
  return {
    title: bidang.nama,
    description: bidang.tagline,
    alternates: { canonical: `/bidang/${slug}` },
    openGraph: { title: `${bidang.nama} | Vistara Media Indonesia`, description: bidang.tagline, images: [{ url: bidang.heroImage, alt: bidang.heroAlt }] },
  };
}

async function BidangShowcase({ bidang }: { bidang: BidangConfig }) {
  if (bidang.showcaseType === "listing") {
    const listings = await prisma.listing.findMany({
      where: { status: "PUBLISHED", category: { status: "ACTIVE", slug: { in: bidang.kategoriSlugs } } },
      orderBy: [{ createdAt: "desc" }, { slug: "asc" }],
      take: 6,
      select: {
        slug: true, judul: true, lokasi: true, harga: true,
        images: { orderBy: { urutan: "asc" }, take: 1, select: { url: true } },
        category: { select: { nama: true, slug: true } },
      },
    });
    return <>
      <div className={styles.listingGrid}>{listings.map(listing => <ListingCard key={listing.slug} listing={{
        slug: listing.slug, judul: listing.judul, lokasi: listing.lokasi, harga: Number(listing.harga),
        fotoUtama: listing.images[0]?.url ?? null, kategoriNama: listing.category.nama, kategoriSlug: listing.category.slug,
      }} />)}</div>
      {!listings.length && <p className={styles.empty}>Belum ada pilihan yang diterbitkan untuk bidang ini.</p>}
      <div className={styles.collectionLinks}>{bidang.kategoriSlugs.map(category => <Link key={category} href={`/${category}`}>Jelajahi {category === "cafe-restoran" ? "cafe & restoran" : category}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}</div>
      <p className={styles.note}>Pilihan awal menggunakan data contoh. Harga dan ketersediaan perlu dikonfirmasi kepada mitra.</p>
    </>;
  }

  if (bidang.showcaseType === "creator") {
    const creators = await prisma.creator.findMany({
      where: { status: "ACTIVE" }, orderBy: [{ created_at: "asc" }, { nama: "asc" }], take: 8,
      select: { id: true, nama: true, niche: true, foto_url: true, followers: true, platform_utama: true },
    });
    return <>
      <div className={styles.creatorGrid}>{creators.map(creator => <CreatorCard key={creator.id} creator={creator} heading="h3" />)}</div>
      {!creators.length && <p className={styles.empty}>Belum ada kreator aktif yang ditampilkan.</p>}
      <div className={styles.collectionLinks}><Link href="/content-creator">Lihat semua kreator<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <p className={styles.note}>Profil contoh menggunakan identitas fiktif, foto ilustrasi, dan angka followers simulasi; bukan daftar talent terverifikasi.</p>
    </>;
  }

  return <>
    <p className={styles.statsNotice}>Ketentuan program disepakati bersama brand dan mitra afiliasi.</p>
    <dl className={styles.stats}>{bidang.stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.nilai}</dd></div>)}</dl>
    <p className={styles.note}>Hasil setiap program bergantung pada produk, audiens, dan pelaksanaannya.</p>
  </>;
}

export default async function BidangPage({ params }: BidangPageProps) {
  const { slug } = await params;
  const bidang = getBidangConfig(slug);
  if (!bidang) notFound();

  return <main id="main-content" className={styles.page} data-accent={bidang.accentColor}>
    <header className={styles.hero}>
      <Image src={bidang.heroImage} alt={bidang.heroAlt} fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroInner}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><ol>
          <li><Link href="/">Beranda</Link><ChevronRight size={14} aria-hidden="true" /></li>
          <li><Link href="/bidang">Bidang</Link><ChevronRight size={14} aria-hidden="true" /></li>
          <li aria-current="page">{bidang.nama}</li>
        </ol></nav>
        <p className={styles.eyebrow}>VISTARA MEDIA INDONESIA</p>
        <h1>{bidang.nama}</h1>
        <p className={styles.tagline}>{bidang.tagline}</p>
      </div>
    </header>

    <section className={`${styles.wrap} ${styles.description}`} aria-labelledby="bidang-description-title">
      <div><h2 id="bidang-description-title">Tentang layanan</h2><p>{bidang.deskripsi}</p></div>
      <div className={styles.supportingPhoto}><Image src={bidang.supportingImage} alt={bidang.supportingAlt} fill sizes="(max-width: 767px) 100vw, 50vw" /></div>
    </section>

    <section className={styles.services} aria-labelledby="bidang-services-title"><div className={styles.wrap}>
      <h2 id="bidang-services-title">Layanan Kami</h2>
      <div className={styles.serviceGrid}>{bidang.layananList.map(({ nama, icon: Icon }) => <article key={nama} className={styles.serviceCard}><Icon size={24} aria-hidden="true" /><h3>{nama}</h3></article>)}</div>
    </div></section>

    <section className={`${styles.wrap} ${styles.showcase}`} aria-labelledby="bidang-showcase-title" data-showcase={bidang.showcaseType}>
      <h2 id="bidang-showcase-title">{bidang.showcaseTitle}</h2>
      <BidangShowcase bidang={bidang} />
    </section>

    <section className={styles.closing} aria-labelledby="bidang-cta-title"><div className={`${styles.wrap} ${styles.closingInner}`}>
      <div><h2 id="bidang-cta-title">Kerja sama {bidang.nama}</h2></div>
      <Link href="/kontak" className={styles.cta}><MessageCircle size={19} aria-hidden="true" />Informasi kontak<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div></section>
  </main>;
}