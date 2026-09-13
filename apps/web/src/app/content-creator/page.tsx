import type { Metadata } from "next";
import Link from "next/link";
import CreatorCard from "@/components/CreatorCard";
import { prisma } from "@/lib/db";
import styles from "./creators.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Content Creator Vistara", description: "Kreator yang berkolaborasi bersama brand melalui Vistara Media Indonesia. Jelajahi lifestyle, kuliner, properti, dan fashion.",
  alternates: { canonical: "/content-creator" },
};
const NICHES = ["Lifestyle & Travel", "Food & Kuliner", "Properti", "Fashion"];

export default async function CreatorPage({ searchParams }: PageProps<"/content-creator">) {
  const query = await searchParams;
  const niche = typeof query.niche === "string" && NICHES.includes(query.niche) ? query.niche : "";
  const creators = await prisma.creator.findMany({
    where: { status: "ACTIVE", ...(niche && { niche }) },
    orderBy: [{ created_at: "asc" }, { nama: "asc" }],
    select: { id: true, nama: true, niche: true, foto_url: true, followers: true, platform_utama: true },
  });

  return <main id="main-content" className={styles.page}>
    <header className={styles.intro}>
      <p className={styles.eyebrow}>VISTARA MEDIA INDONESIA</p>
      <h1>Content Creator Vistara</h1>
      <p>Profil kreator di bidang perjalanan, kuliner, properti, dan fashion.</p>
    </header>
    <section className={styles.directory} aria-label="Direktori content creator">
      <nav className={styles.filters} aria-label="Filter niche kreator">
        {["", ...NICHES].map(value => <Link key={value} href={value ? `/content-creator?niche=${encodeURIComponent(value)}` : "/content-creator"} aria-current={niche === value ? "page" : undefined} scroll={false}>{value || "Semua"}</Link>)}
      </nav>
      <div className={styles.grid}>
        {creators.map(creator => <CreatorCard key={creator.id} creator={creator} />)}
      </div>
      {!creators.length && <p className={styles.empty}>Belum ada kreator aktif untuk niche ini. <Link href="/content-creator">Lihat semua kreator</Link></p>}
      <p className={styles.disclaimer}>Profil contoh menggunakan identitas fiktif, foto ilustrasi, dan angka followers simulasi; bukan daftar talent terverifikasi.</p>
    </section>
  </main>;
}