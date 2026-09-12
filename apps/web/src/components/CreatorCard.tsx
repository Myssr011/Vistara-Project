import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Music2, Video } from "lucide-react";
import type { Creator } from "@vistara/database";
import styles from "@/app/content-creator/creators.module.css";

export type CreatorCardData = Pick<Creator, "id" | "nama" | "niche" | "foto_url" | "followers" | "platform_utama">;

const platformIcons = { Instagram: Camera, TikTok: Music2, YouTube: Video };

export default function CreatorCard({ creator, heading = "h2" }: { creator: CreatorCardData; heading?: "h2" | "h3" }) {
  const Platform = platformIcons[creator.platform_utama as keyof typeof platformIcons] ?? Music2;
  const Heading = heading;

  return <article className={styles.card}>
    <Link className={styles.portrait} href={`/content-creator/${creator.id}`} aria-label={`Lihat profil ${creator.nama}`}><Image src={creator.foto_url} alt={`Potret ilustrasi ${creator.nama}`} fill sizes="(max-width: 599px) 100vw, (max-width: 1099px) 50vw, 25vw" /></Link>
    <div className={styles.copy}>
      <span className={styles.niche}>{creator.niche}</span>
      <Heading>{creator.nama}</Heading>
      <p className={styles.followers}><strong>{new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(creator.followers / 1000)}rb</strong> followers <span className={styles.platform} title={creator.platform_utama}><Platform size={18} aria-hidden="true" /><span className="sr-only">{creator.platform_utama}</span></span></p>
      <Link className={styles.profileLink} href={`/content-creator/${creator.id}`}>Lihat Profil<ArrowUpRight size={17} aria-hidden="true" /></Link>
    </div>
  </article>;
}