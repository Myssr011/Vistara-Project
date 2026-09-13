import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Camera, Network, PenTool, TrendingUp, Users, Utensils } from "lucide-react";
import { prisma } from "@/lib/db";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "About Vistara Media Indonesia",
  description: "Vistara Media Indonesia menyediakan pemasaran properti, pengelolaan kreator, program afiliasi, dan produksi konten kuliner.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  { name: "CREATE", Icon: PenTool, text: "Menyusun ide, foto, dan video berdasarkan karakter brand dan kebutuhan audiens." },
  { name: "CONNECT", Icon: Users, text: "Memilih kreator sesuai bidang usaha dan menyepakati bentuk kerja sama dengan brand." },
  { name: "GROW", Icon: TrendingUp, text: "Meninjau hasil konten bersama mitra untuk menentukan rencana berikutnya." },
];

export default async function AboutPage() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE", slug: { in: ["hotel", "apartemen", "cafe-restoran"] } },
    select: { slug: true, nama: true },
    orderBy: { nama: "asc" },
  });
  return <main id="main-content" className={styles.profile}>
    <section className={styles.hero} aria-labelledby="about-title">
      <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop" alt="Gedung pencakar langit dengan fasad kaca" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={`${styles.wrap} ${styles.heroCopy}`}>
        <div><h1 id="about-title">VISTARA<br />MEDIA INDONESIA</h1><p className={styles.tagline}>Pemasaran properti, pengelolaan kreator, dan produksi konten untuk brand.</p></div>
        <p className={styles.signature}><span>CREATE</span><span aria-hidden="true">|</span><span>CONNECT</span><span aria-hidden="true">|</span><span>GROW</span></p>
      </div>
    </section>
    <section className={`${styles.wrap} ${styles.section} ${styles.story}`} aria-labelledby="siapa-title">
      <div><h2 id="siapa-title">Tentang Vistara</h2></div>
      <div className={styles.prose}><p>Vistara Media Indonesia adalah agensi kreatif dan pengelola content creator. Kami membantu hotel, apartemen, cafe, restoran, dan brand merencanakan serta memproduksi konten.</p><p>Layanan kami mencakup pemasaran properti, pengelolaan kreator, program afiliasi, dan konten kuliner. Tim Vistara menyusun brief, mengatur kerja sama, dan meninjau hasil konten bersama mitra.</p></div>
    </section>
    <section className={styles.philosophy} aria-labelledby="filosofi-title"><div className={`${styles.wrap} ${styles.section}`}>
      <header className={styles.sectionHeading}><h2 id="filosofi-title">Cara kami bekerja</h2></header>
      <div className={styles.valueGrid}>{philosophy.map(({ name, Icon, text }) => <article key={name} className={styles.value}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /><h3>{name}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="layanan-title">
      <header className={styles.sectionHeading}><h2 id="layanan-title">Layanan Vistara</h2></header>
      <div className={styles.serviceGrid}>
        <article className={styles.service}><Building2 size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="pemasaran-properti">Pemasaran Properti</h3><p>Konten untuk hotel dan apartemen yang memperlihatkan karakter ruang, pengalaman menginap, dan nilai properti.</p><div className={styles.serviceLinks}>{categories.filter(category => category.slug !== "cafe-restoran").map(category => <Link key={category.slug} href={`/${category.slug}`}>{category.nama}<ArrowRight size={15} aria-hidden="true" /></Link>)}</div></div></article>
        <article className={styles.service}><Camera size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="content-creator-management">Content Creator Management</h3><p>Kurasi kreator, penyusunan brief, dan pengelolaan kerja sama dengan brand.</p><div className={styles.serviceLinks}><Link href="/content-creator">Content Creator<ArrowRight size={15} aria-hidden="true" /></Link></div></div></article>
        <article className={styles.service}><Network size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="affiliate-marketing">Affiliate Marketing</h3><p>Perencanaan program afiliasi, skema komisi, dan pelaporan hasil untuk brand.</p><div className={styles.serviceLinks}><Link href="/kontak">Diskusikan kolaborasi<ArrowRight size={15} aria-hidden="true" /></Link></div></div></article>
        <article className={styles.service}><Utensils size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="konten-kuliner">Konten Kuliner</h3><p>Foto menu, video ulasan, dan konten suasana cafe atau restoran.</p><div className={styles.serviceLinks}>{categories.filter(category => category.slug === "cafe-restoran").map(category => <Link key={category.slug} href={`/${category.slug}`}>{category.nama}<ArrowRight size={15} aria-hidden="true" /></Link>)}</div></div></article>
      </div>
    </section>
    <section className={styles.closing} aria-labelledby="kolaborasi-title"><div className={styles.wrap}>
      <h2 id="kolaborasi-title">Kerja sama dengan Vistara</h2><Link className={styles.cta} href="/kontak">Informasi kontak<ArrowRight size={18} aria-hidden="true" /></Link>
    </div></section>
  </main>;
}