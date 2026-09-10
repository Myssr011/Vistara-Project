"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight, BedDouble, Building2, CalendarDays, ChevronLeft, ChevronRight,
  Coffee, Compass, LayoutGrid, MapPin, MessageSquare, MoreHorizontal, Search,
  Sparkles, type LucideIcon,
} from "lucide-react";
import { SEMUA, useFilterKategori } from "@/lib/filter-kategori";
import { INSIGHT_KATEGORI, type InsightCardData } from "@/lib/insight-ui";
import type { ListingCardData } from "@/components/ListingCard";
import "./DiscoverFeedSection.css";

type FeedCategory = { slug: string; nama: string };
type FeedItem = {
  id: string;
  href: string;
  title: string;
  image: string | null;
  source: string;
  badge: string;
  tone?: string;
  location?: string;
  price?: number;
};

type DiscoverFeedProps = {
  insights: InsightCardData[];
  categories: FeedCategory[];
  listings?: ListingCardData[];
};

const categoryIcons: Record<string, LucideIcon> = {
  semua: LayoutGrid, hotel: BedDouble, apartemen: Building2, "cafe-restoran": Coffee,
};

function FeedHeader({ id, title, icon: Icon, href }: {
  id: string; title: string; icon: LucideIcon; href?: string;
}) {
  const { pilih } = useFilterKategori();
  return (
    <header className="discover-heading">
      <h2 id={id}><Icon size={18} aria-hidden="true" />{title}</h2>
      <details className="discover-options" onKeyDown={event => {
        if (event.key === "Escape") {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}>
        <summary aria-label={`Opsi ${title}`} title={`Opsi ${title}`}><MoreHorizontal size={20} aria-hidden="true" /></summary>
        <div className="discover-options-menu">
          {href && <Link href={href}>Lihat semua</Link>}
          <button type="button" onClick={event => {
            pilih(SEMUA);
            const menu = event.currentTarget.closest("details");
            if (menu) { menu.open = false; menu.querySelector("summary")?.focus(); }
          }}>Reset filter kategori</button>
        </div>
      </details>
    </header>
  );
}

function FeedReveal({ children, order = 0, className = "" }: {
  children: ReactNode; order?: number; className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={`discover-reveal ${className}`} initial={false}
      whileInView={reducedMotion ? undefined : { opacity: [0, 1], y: [8, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.24, delay: Math.min(order, 3) * 0.035, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export function FeedCard({ item, featured = false }: { item: FeedItem; featured?: boolean }) {
  return (
    <Link href={item.href} className={`discover-card${featured ? " discover-card-featured" : ""}`} title={item.title}>
      <div className="discover-media">
        {item.image ? <Image src={item.image} alt="" fill className="discover-image"
          sizes={featured ? "(max-width: 639px) 100vw, (max-width: 1199px) 75vw, 40vw" : "(max-width: 639px) 85vw, (max-width: 1199px) 40vw, 20vw"} />
          : <Building2 size={36} aria-hidden="true" />}
        <span className="discover-badge" data-tone={item.tone}>{item.badge}</span>
      </div>
      <div className="discover-card-copy">
        <p className="discover-source"><span aria-hidden="true" className="discover-source-mark">V</span>{item.source}</p>
        <h3>{item.title}</h3>
        <div className="discover-card-footer">
          {item.location && <p className="discover-location"><MapPin size={13} aria-hidden="true" />{item.location}</p>}
          {item.price !== undefined ? <p className="discover-price">Mulai <strong>Rp{item.price.toLocaleString("id-ID")}</strong></p>
            : <span className="discover-read">Baca selengkapnya <ArrowUpRight size={15} aria-hidden="true" /></span>}
        </div>
      </div>
    </Link>
  );
}

export function CarouselCard({ items }: { items: FeedItem[] }) {
  const [index, setIndex] = useState(0);
  const slideId = useId();
  if (!items.length) return <p className="discover-empty">Belum ada rekomendasi untuk kategori ini.</p>;
  const currentIndex = index % items.length;
  const current = items[currentIndex];
  const select = (next: number) => setIndex((next + items.length) % items.length);

  return (
    <div className="discover-carousel" role="region" aria-roledescription="carousel" aria-label="Rekomendasi unggulan"
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        const next = { ArrowLeft: currentIndex - 1, ArrowRight: currentIndex + 1, Home: 0, End: items.length - 1 }[event.key];
        if (next !== undefined) { event.preventDefault(); select(next); }
      }}>
      <div id={slideId} className="discover-slide" role="group" aria-roledescription="slide" aria-label={`${currentIndex + 1} dari ${items.length}`}>
        <FeedCard item={current} featured />
      </div>
      {items.length > 1 && <>
        <button className="discover-carousel-arrow discover-prev" type="button" aria-label="Rekomendasi sebelumnya" title="Rekomendasi sebelumnya" aria-controls={slideId} onClick={() => select(currentIndex - 1)}><ChevronLeft aria-hidden="true" /></button>
        <button className="discover-carousel-arrow discover-next" type="button" aria-label="Rekomendasi berikutnya" title="Rekomendasi berikutnya" aria-controls={slideId} onClick={() => select(currentIndex + 1)}><ChevronRight aria-hidden="true" /></button>
        <div className="discover-carousel-bottom">
          <div className="discover-dots" role="group" aria-label="Pilih rekomendasi">
            {items.map((item, slideIndex) => <button key={item.id} type="button" aria-label={`Tampilkan rekomendasi ${slideIndex + 1}`} aria-current={slideIndex === currentIndex ? "true" : undefined} aria-controls={slideId} onClick={() => select(slideIndex)}><span /></button>)}
          </div>
          <span aria-hidden="true">{currentIndex + 1} / {items.length}</span>
        </div>
      </>}
      <span className="sr-only" role="status">{currentIndex + 1} dari {items.length}: {current.title}</span>
    </div>
  );
}

export function SidebarWidget({ categories }: { categories: FeedCategory[] }) {
  const { aktif, pilih } = useFilterKategori();
  const widgetId = useId();
  return (
    <aside className="discover-sidebar" aria-label="Pilihan cepat">
      <section className="discover-widget discover-quick" aria-labelledby={`${widgetId}-quick`}>
        <h2 id={`${widgetId}-quick`}><LayoutGrid size={17} aria-hidden="true" />Filter Cepat</h2>
        <div className="discover-category-grid" role="group" aria-label="Filter kategori feed">
          {[{ slug: SEMUA, nama: "Semua" }, ...categories].map(category => {
            const Icon = categoryIcons[category.slug] ?? LayoutGrid;
            return <button key={category.slug} type="button" data-category={category.slug} aria-pressed={aktif === category.slug} onClick={() => pilih(category.slug)}>
              <span className="discover-category-icon"><Icon size={23} aria-hidden="true" /></span><span>{category.nama}</span>
            </button>;
          })}
        </div>
      </section>
      <section className="discover-widget discover-availability" aria-labelledby={`${widgetId}-availability`}>
        <div className="discover-widget-symbol"><CalendarDays size={23} aria-hidden="true" /></div>
        <h2 id={`${widgetId}-availability`}>Cek Ketersediaan</h2>
        <p className="discover-widget-note">Temukan tempat untuk kunjungan berikutnya.</p>
        <form action="/cari" method="get">
          <label htmlFor={`${widgetId}-location`}>Kota atau nama tempat</label>
          <div className="discover-search-field"><MapPin size={16} aria-hidden="true" /><input id={`${widgetId}-location`} name="q" placeholder="Makassar" maxLength={100} required /></div>
          <button className="discover-search-button" type="submit"><Search size={16} aria-hidden="true" />Cari tempat</button>
        </form>
        <p className="discover-availability-note">Kalender ketersediaan belum tersedia.</p>
      </section>
    </aside>
  );
}

export function DiscoverFeedSkeleton() {
  return <div className="discover-feed" aria-busy="true" aria-label="Memuat Discover Feed">
    <p className="sr-only" role="status">Memuat rekomendasi...</p>
    <div className="discover-shell discover-skeleton" aria-hidden="true">
      <div className="discover-main"><div className="discover-skeleton-heading" /><div className="discover-lead"><div className="discover-featured" /><div className="discover-story-one" /><div className="discover-story-two" /></div></div>
      <div className="discover-sidebar"><div /><div /></div>
    </div>
  </div>;
}

export default function DiscoverFeedSection({ insights, categories, listings = [] }: DiscoverFeedProps) {
  const { aktif } = useFilterKategori();
  const sectionId = useId();
  const [showAll, setShowAll] = useState(false);
  const filteredInsights = insights.filter(insight => aktif === SEMUA || insight.kategoriTerkaitSlug === aktif);
  const editorial: FeedItem[] = filteredInsights.map(insight => ({
    id: insight.slug, href: `/insight/${insight.slug}`, title: insight.judul,
    image: insight.gambarUrl, source: "Vistara Insight", badge: INSIGHT_KATEGORI[insight.kategori].label, tone: insight.kategori,
  }));
  const places: FeedItem[] = listings.filter(listing => aktif === SEMUA || listing.kategoriSlug === aktif).map(listing => ({
    id: listing.slug, href: `/${listing.kategoriSlug}/${listing.slug}`, title: listing.judul,
    image: listing.fotoUtama, source: listing.kategoriNama, badge: listing.kategoriNama,
    location: listing.lokasi, price: listing.harga,
  }));
  const featured = (places.length ? places : editorial).slice(0, 5);
  const leadStories = editorial.slice(0, 2);
  const remainingStories = editorial.slice(places.length ? 2 : 5);
  const editorItems = showAll ? remainingStories : remainingStories.slice(0, 3);

  return (
    <div className="discover-feed">
      <div className="discover-shell">
        <div className="discover-main">
          <section aria-labelledby={`${sectionId}-recommendations`}>
            <FeedHeader id={`${sectionId}-recommendations`} title="Rekomendasi Untukmu" icon={Compass} href="/cari" />
            <div className="discover-lead">
              <FeedReveal className="discover-featured"><CarouselCard key={aktif} items={featured} /></FeedReveal>
              {leadStories.map((item, index) => <FeedReveal key={item.id} order={index + 1} className={index === 0 ? "discover-story-one" : "discover-story-two"}><FeedCard item={item} /></FeedReveal>)}
            </div>
          </section>
          {places.length > 0 && <section aria-labelledby={`${sectionId}-places`}>
            <FeedHeader id={`${sectionId}-places`} title="Temukan Tempat Pilihan" icon={MapPin} href={aktif === SEMUA ? "/cari" : `/${aktif}`} />
            <div className="discover-row">{places.slice(0, 4).map((item, index) => <FeedReveal key={item.id} order={index}><FeedCard item={item} /></FeedReveal>)}</div>
          </section>}
          <section id="rekomendasi-editor" aria-labelledby={`${sectionId}-editor`}>
            <FeedHeader id={`${sectionId}-editor`} title="Rekomendasi Editor" icon={Sparkles} />
            {editorItems.length ? <div className="discover-editor-grid">{editorItems.map((item, index) => <FeedReveal key={item.id} order={index}><FeedCard item={item} featured={index % 3 === 0} /></FeedReveal>)}</div>
              : <p className="discover-empty">Belum ada artikel lainnya untuk kategori ini.</p>}
            {remainingStories.length > 3 && <button className="discover-more" type="button" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? "Tampilkan lebih sedikit" : "Lihat semua Insight"}<ArrowUpRight size={16} aria-hidden="true" /></button>}
          </section>
          <section className="discover-reviews" aria-labelledby={`${sectionId}-reviews`}>
            <FeedHeader id={`${sectionId}-reviews`} title="Ulasan Terbaru" icon={MessageSquare} />
            <p className="discover-empty">Belum ada ulasan terverifikasi.</p>
          </section>
          <p className="sr-only" role="status">{aktif === SEMUA ? "Semua kategori" : categories.find(category => category.slug === aktif)?.nama}: {places.length} tempat dan {editorial.length} Insight.</p>
        </div>
        <SidebarWidget categories={categories} />
      </div>
    </div>
  );
}