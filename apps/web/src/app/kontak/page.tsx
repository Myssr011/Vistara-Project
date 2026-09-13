import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../about/profile.module.css";

export const metadata: Metadata = {
  title: "Kontak Vistara Media Indonesia",
  description: "Informasi kolaborasi dengan Vistara Media Indonesia.",
  alternates: { canonical: "/kontak" },
};

export default function ContactPage() {
  return <main id="main-content" className={`${styles.profile} ${styles.contact}`}><div className={styles.wrap}>
    <p className={styles.eyebrow}>Vistara Media Indonesia</p>
    <h1>Kontak dan kerja sama</h1>
    <p>Kontak resmi Vistara belum tersedia. Tim Vistara akan mencantumkannya di sini setelah dikonfirmasi.</p>
    <Link href="/about" className={styles.cta}><ArrowLeft size={18} aria-hidden="true" />Tentang Vistara</Link>
  </div></main>;
}