import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.inner}>
      <Link href="/" className={styles.brand} aria-label="Vistara beranda"><Image src="/vistara-mark.png" alt="" width={28} height={28} /><span>VISTARA</span></Link>
      <nav aria-label="Navigasi footer"><Link href="/about">Tentang Vistara</Link><Link href="/bidang">Bidang</Link><Link href="/portofolio">Portofolio</Link><Link href="/aset">Aset</Link><Link href="/content-creator">Content Creator</Link><Link href="/kontak">Kontak</Link></nav>
      <p>Copyright &copy; 2023 CodebyTeam. All rights reserved.</p>
    </div>
  </footer>;
}