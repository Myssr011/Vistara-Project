import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.inner}>
      <Link href="/" className={styles.brand} aria-label="Vistara beranda"><Image src="/vistara-mark.png" alt="" width={28} height={28} /><span>VISTARA</span></Link>
      <p>Copyright &copy; 2023 CodebyTeam. All rights reserved.</p>
    </div>
  </footer>;
}