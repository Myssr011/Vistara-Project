import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Camera, Network, PenTool, Sparkles, TrendingUp, Users, Utensils } from "lucide-react";
import { prisma } from "@/lib/db";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "About Vistara Media Indonesia",
  description: "Creative Agency & Content Creator Management. Menghubungkan Brand, Properti, dan Audiens Melalui Konten Kreatif.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  { name: "CREATE", Icon: PenTool, text: "Merancang konten yang punya cerita dan nilai, bukan sekadar tampil. Setiap ide berangkat dari karakter brand dan kebutuhan audiens." },
  { name: "CONNECT", Icon: Users, text: "Menjembatani brand, properti, dan audiens yang tepat. Kami membangun hubungan melalui cerita yang relevan dan kolaborasi yang bermakna." },
  { name: "GROW", Icon: TrendingUp, text: "Tumbuh bersama melalui strategi konten yang berkelanjutan. Belajar dari setiap kolaborasi untuk menemukan langkah berikutnya." },
];

export default async function AboutPage() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE", slug: { in: ["hotel", "apartemen", "cafe-restoran"] } },
    select: { slug: true, nama: true },
    orderBy: { nama: "asc" },
  });
  return <main id="main-content" className={styles.profile}>
    <section className={styles.hero} aria-labelledby="about-title">
      <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop" alt="Gedung pencakar langit dengan fasad kaca dalam nuansa hitam putih" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={`${styles.wrap} ${styles.heroCopy}`}>
        <div><p className={styles.eyebrow}>Selamat Datang di</p><h1 id="about-title">VISTARA<br />MEDIA INDONESIA</h1><p className={styles.tagline}>Menghubungkan Brand, Properti, dan Audiens Melalui Konten Kreatif.</p></div>
        <p className={styles.signature}><span>CREATE</span><span aria-hidden="true">|</span><span>CONNECT</span><span aria-hidden="true">|</span><span>GROW</span></p>
      </div>
    </section>
    <section className={`${styles.wrap} ${styles.section} ${styles.story}`} aria-labelledby="siapa-title">
      <div><p className={styles.eyebrow}>Tentang Vistara</p><h2 id="siapa-title">Siapa Kami</h2></div>
      <div className={styles.prose}><p>Vistara Media Indonesia adalah Creative Agency &amp; Content Creator Management yang mempertemukan brand, bisnis, properti, dan audiens melalui konten kreatif yang relevan dan berdampak. Kami membantu setiap cerita menemukan bentuk dan audiens yang tepat.</p><p>Layanan kami mencakup pemasaran properti untuk hotel dan apartemen, pengelolaan content creator, affiliate marketing, serta konten kuliner. Kami menghubungkan kebutuhan bisnis dengan perspektif kreator untuk membangun komunikasi yang terasa dekat dan punya arah.</p><blockquote>Karena bagi kami, konten bukan hanya tentang terlihat.</blockquote></div>
    </section>
    <section className={styles.philosophy} aria-labelledby="filosofi-title"><div className={`${styles.wrap} ${styles.section}`}>
      <header className={styles.sectionHeading}><p className={styles.eyebrow}>Cara Kami Berkarya</p><h2 id="filosofi-title">Filosofi Kami</h2></header>
      <div className={styles.valueGrid}>{philosophy.map(({ name, Icon, text }) => <article key={name} className={styles.value}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /><h3>{name}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="layanan-title">
      <header className={styles.sectionHeading}><p className={styles.eyebrow}>Ruang Kolaborasi</p><h2 id="layanan-title">Bidang Layanan Kami</h2></header>
      <div className={styles.serviceGrid}>
        <article className={styles.service}><Building2 size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="pemasaran-properti">Pemasaran Properti</h3><p>Konten untuk hotel dan apartemen yang memperlihatkan karakter ruang, pengalaman menginap, dan nilai properti.</p><div className={styles.serviceLinks}>{categories.filter(category => category.slug !== "cafe-restoran").map(category => <Link key={category.slug} href={`/${category.slug}`}>{category.nama}<ArrowRight size={15} aria-hidden="true" /></Link>)}</div></div></article>
        <article className={styles.service}><Camera size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="content-creator-management">Content Creator Management</h3><p>Menyelaraskan potensi kreator dengan kebutuhan brand, dari arah konten hingga pelaksanaan kolaborasi.</p><div className={styles.serviceLinks}><Link href="/content-creator">Content Creator<ArrowRight size={15} aria-hidden="true" /></Link></div></div></article>
        <article className={styles.service}><Network size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="affiliate-marketing">Affiliate Marketing</h3><p>Menghubungkan rekomendasi kreator dengan kebutuhan audiens melalui kolaborasi afiliasi yang transparan.</p><div className={styles.serviceLinks}><Link href="/kontak">Diskusikan kolaborasi<ArrowRight size={15} aria-hidden="true" /></Link></div></div></article>
        <article className={styles.service}><Utensils size={30} strokeWidth={1.5} aria-hidden="true" /><div><h3 id="konten-kuliner">Konten Kuliner</h3><p>Mengangkat cerita di balik menu dan suasana cafe atau restoran melalui visual yang menggugah dan ulasan yang relevan.</p><div className={styles.serviceLinks}>{categories.filter(category => category.slug === "cafe-restoran").map(category => <Link key={category.slug} href={`/${category.slug}`}>{category.nama}<ArrowRight size={15} aria-hidden="true" /></Link>)}</div></div></article>
      </div>
    </section>
    <section className={styles.closing} aria-labelledby="kolaborasi-title"><div className={styles.wrap}>
      <Sparkles size={28} strokeWidth={1.5} aria-hidden="true" /><p className={styles.eyebrow}>Create. Connect. Grow.</p><h2 id="kolaborasi-title">Mari Tumbuh<br />Bersama Vistara</h2><Link className={styles.cta} href="/kontak">Mulai Kolaborasi<ArrowRight size={18} aria-hidden="true" /></Link>
      <p className={styles.signoff}>Vistara Media Indonesia</p>
    </div></section>
  </main>;
}