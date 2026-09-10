import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import styles from "../creators.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Profil Kreator", robots: { index: false } };

export default async function CreatorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const creator = await prisma.creator.findFirst({ where: { id, status: "ACTIVE" } });
  if (!creator) notFound();

  return <main id="main-content" className={styles.page}>
    <div className={styles.detail}>
      <Link href="/content-creator" className={styles.back}><ArrowLeft size={18} aria-hidden="true" />Semua kreator</Link>
      <article className={styles.profile}>
        <div className={styles.portrait}><Image src={creator.foto_url} alt={`Potret ilustrasi ${creator.nama}`} fill priority sizes="(max-width: 599px) 100vw, 440px" /></div>
        <div><span className={styles.niche}>{creator.niche}</span><h1>{creator.nama}</h1><p className={styles.followers}><strong>{new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(creator.followers / 1000)}rb</strong> followers di {creator.platform_utama}</p><p className={styles.bio}>{creator.bio}</p><p className={styles.disclaimer}>Profil dan angka followers ini adalah data demonstrasi. Foto merupakan ilustrasi, bukan identitas talent resmi Vistara.</p></div>
      </article>
    </div>
  </main>;
}