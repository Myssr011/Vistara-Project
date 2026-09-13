import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Coffee, BedDouble, Compass, type LucideIcon } from "lucide-react";
import { prisma } from "@/lib/db";
import { ExplorePage, PageIntro, EmptyCollection } from "@/components/explore/ExplorePage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Bidang", description: "Jelajahi bidang layanan Vistara: hotel, apartemen, cafe dan restoran, serta inspirasi editorial.", alternates: { canonical: "/bidang" } };
const categoriesInfo: Record<string, { icon: LucideIcon; description: string; label: string }> = {
  hotel: { icon: BedDouble, label: "Penginapan", description: "Hotel untuk perjalanan bisnis, akhir pekan, atau liburan keluarga." },
  apartemen: { icon: Building2, label: "Hunian", description: "Apartemen berdasarkan lokasi dan harga awal." },
  "cafe-restoran": { icon: Coffee, label: "Kuliner", description: "Cafe dan restoran untuk minum kopi, makan, atau bertemu." },
};

export default async function FieldsPage() {
  const categories = await prisma.category.findMany({ where: { status: "ACTIVE" }, orderBy: { nama: "asc" }, select: {
    nama: true, slug: true,
    _count: { select: { listings: { where: { status: "PUBLISHED" } } } },
    listings: { where: { status: "PUBLISHED", images: { some: {} } }, orderBy: { slug: "asc" }, take: 1, select: { images: { orderBy: { urutan: "asc" }, take: 1, select: { url: true } } } },
  } });
  return <ExplorePage>
    <PageIntro label="Bidang" title="Hotel, apartemen, cafe & restoran" description="Properti dan tempat kuliner dari mitra Vistara."><span className="explore-count"><Compass size={20} aria-hidden="true" />{categories.length} bidang aktif</span></PageIntro>
    <section className="explore-wrap fields-list" aria-label="Bidang layanan aktif">
      {categories.length ? categories.map(category => {
        const info = categoriesInfo[category.slug]; const Icon = info?.icon ?? Compass; const image = category.listings[0]?.images[0]?.url;
        return <article key={category.slug} className="field-row">
          <div className="field-image">{image ? <Image src={image} alt={`Pilihan ${category.nama} di Vistara`} fill sizes="(max-width: 639px) 100vw, 45vw" /> : <Icon size={48} aria-hidden="true" />}</div>
          <div className="field-copy"><p className="explore-eyebrow"><Icon size={18} aria-hidden="true" />{info?.label ?? "LAYANAN VISTARA"}</p><h2>{category.nama}</h2><p>{info?.description ?? `Jelajahi pilihan ${category.nama} dari mitra Vistara.`}</p><div className="field-action"><span>{category._count.listings} pilihan tersedia</span><Link href={`/${category.slug}`} className="explore-text-link">Jelajahi {category.nama}<ArrowRight size={18} aria-hidden="true" /></Link></div></div>
        </article>;
      }) : <EmptyCollection resetHref="/bidang" title="Belum ada bidang aktif." />}
    </section>
    <section className="explore-wrap explore-section"><div className="explore-crosslink"><div><h2>Kreator untuk brand Anda</h2><p>Profil kreator di bidang perjalanan, kuliner, properti, dan fashion.</p></div><Link href="/content-creator" className="explore-text-link">Lihat kreator<ArrowUpRight size={19} aria-hidden="true" /></Link></div></section>
  </ExplorePage>;
}