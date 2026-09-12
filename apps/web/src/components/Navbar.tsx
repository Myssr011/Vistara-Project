"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Building2, Camera, ChevronDown, Network, Utensils } from "lucide-react";
import AccountBar from "./AccountBar";
import "./HomepageChrome.css";

const links = [
  { href: "/portofolio", label: "Portofolio" },
  { href: "/aset", label: "Aset" },
  { href: "/content-creator", label: "Content Creator" },
];

const services = [
  { slug: "pemasaran-properti", label: "Pemasaran Properti", Icon: Building2 },
  { slug: "content-creator-management", label: "Content Creator Management", Icon: Camera },
  { slug: "affiliate-marketing", label: "Affiliate Marketing", Icon: Network },
  { slug: "konten-kuliner", label: "Konten Kuliner", Icon: Utensils },
];

export default function Navbar({ kategori }: { kategori: { slug: string; nama: string }[] }) {
  const header = useRef<HTMLElement>(null);
  const bidang = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const bidangAktif = pathname === "/bidang" || pathname.startsWith("/bidang/") || kategori.some(category => pathname === `/${category.slug}`);

  useEffect(() => {
    if (!header.current) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty("--navbar-height", `${entry.target.getBoundingClientRect().height}px`);
    });
    observer.observe(header.current);
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && bidang.current && !bidang.current.contains(event.target)) bidang.current.open = false;
    };
    document.addEventListener("pointerdown", dismiss);
    return () => { observer.disconnect(); document.removeEventListener("pointerdown", dismiss); };
  }, []);

  return (
    <header ref={header} className="vistara-navbar">
      <a href="#main-content" className="skip-link">Lewati navigasi</a>
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand" aria-label="Vistara beranda"><Image src="/vistara-mark.png" alt="" width={28} height={28} sizes="28px" /><span>VISTARA</span></Link>
        <nav aria-label="Navigasi utama" className="navbar-links">
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          <details ref={bidang} className="navbar-bidang" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }} onKeyDown={event => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}>
            <summary data-active={bidangAktif}>Bidang<ChevronDown size={14} aria-hidden="true" /></summary>
            <div className="navbar-category-menu">{services.map(({ slug, label, Icon }) => <Link key={slug} href={`/bidang/${slug}`} aria-current={pathname === `/bidang/${slug}` ? "page" : undefined} onClick={() => { if (bidang.current) bidang.current.open = false; }}><Icon size={18} aria-hidden="true" /><span>{label}</span></Link>)}</div>
          </details>
          {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <AccountBar />
      </div>
    </header>
  );
}