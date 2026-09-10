import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import "./explore.css";

const links = [
  { href: "/about", label: "About" },
  { href: "/bidang", label: "Bidang" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/aset", label: "Aset" },
  { href: "/content-creator", label: "Content Creator" },
];

export function ExplorePage({ children }: { children: ReactNode }) {
  return <div className="explore-page"><main id="main-content">{children}</main><ExploreFooter /></div>;
}

export function PageIntro({ label, title, description, children }: {
  label: string; title: string; description: string; children?: ReactNode;
}) {
  return <header className="explore-intro explore-wrap">
    <nav aria-label="Breadcrumb" className="explore-breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span></nav>
    <div className="explore-intro-row"><div><p className="explore-eyebrow">VISTARA / {label}</p><h1>{title}</h1><p className="explore-description">{description}</p></div>{children}</div>
  </header>;
}

export function EmptyCollection({ resetHref, title = "Belum ada hasil yang cocok." }: { resetHref: string; title?: string }) {
  return <div className="explore-empty"><SearchX size={32} aria-hidden="true" /><h2>{title}</h2><p>Coba kata kunci lain atau tampilkan seluruh pilihan.</p><Link href={resetHref} className="explore-text-link">Reset pencarian<ArrowRight size={17} aria-hidden="true" /></Link></div>;
}

function ExploreFooter() {
  return <footer className="explore-footer"><div className="explore-wrap explore-footer-inner">
    <div><Link href="/" className="explore-footer-brand"><Compass size={22} aria-hidden="true" />VISTARA</Link><p>Tempat, cerita, dan pilihan untuk keseharian.</p></div>
    <nav aria-label="Navigasi footer">{links.map(link => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</nav>
    <p className="explore-footer-note">Harga dan ketersediaan dikonfirmasi oleh mitra.</p>
  </div></footer>;
}