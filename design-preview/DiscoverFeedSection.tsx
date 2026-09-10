"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  BedDouble, Building2, CalendarDays, ChevronLeft, ChevronRight, Coffee,
  Compass, LayoutGrid, MapPin, MessageSquare, MoreHorizontal, Sparkles, Star,
  type LucideIcon,
} from "lucide-react";
import "./DiscoverFeedSection.css";

export type FeedItem = {
  id: string;
  href: string;
  title: string;
  image: string | null;
  source: string;
  categorySlug: string | null;
  badge?: { label: string; tone: "promo" | "new" | "popular" };
  location?: string;
  priceLabel?: string;
  rating?: { value: number; count: number };
  excerpt?: string;
  isDummy?: boolean;
};

export type FeedCategory = { slug: string; nama: string };
export type AvailabilityRequest = {
  category: string;
  location: string;
  checkIn: string;
  checkOut: string;
};

export type DiscoverFeedProps = {
  featured: FeedItem[];
  recommendations: FeedItem[];
  trending: FeedItem[];
  reviews: FeedItem[];
  editor: FeedItem[];
  categories: FeedCategory[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  onCheckAvailability: (request: AvailabilityRequest) => Promise<string>;
  sectionLinks: Record<"recommendations" | "trending" | "reviews" | "editor", string | undefined>;
  locationLabel?: string;
  loading?: boolean;
};

const categoryIcons: Record<string, LucideIcon> = {
  semua: LayoutGrid, apartemen: Building2, hotel: BedDouble, "cafe-restoran": Coffee,
};

function FeedHeader({ id, title, icon: Icon, href }: {
  id: string; title: string; icon: LucideIcon; href?: string;
}) {
  return (
    <header className="feed-header">
      <h2 id={id}><Icon size={18} aria-hidden="true" />{title}</h2>
      {href && (
        <details className="feed-options">
          <summary aria-label={`Opsi ${title}`} title={`Opsi ${title}`}><MoreHorizontal aria-hidden="true" /></summary>
          <Link href={href}>Lihat semua</Link>
        </details>
      )}
    </header>
  );
}

function FeedReveal({ children, order = 0, className = "" }: {
  children: ReactNode; order?: number; className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={`feed-reveal ${className}`} initial={false}
      whileInView={reducedMotion ? undefined : { opacity: [0, 1], y: [8, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.24, delay: Math.min(order, 3) * 0.045, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export function FeedCard({ item, featured = false }: { item: FeedItem; featured?: boolean }) {
  return (
    <Link href={item.href} className={`feed-card ${featured ? "feed-card-featured" : ""}`}>
      <div className="feed-media">
        {item.image ? <Image src={item.image} alt="" fill className="feed-image"
          sizes={featured ? "(max-width: 767px) 100vw, (max-width: 1199px) 65vw, 40vw" : "(max-width: 767px) 100vw, (max-width: 1199px) 35vw, 20vw"} />
          : <Building2 className="feed-image-placeholder" size={40} aria-hidden="true" />}
        <div className="feed-badges">
          {item.badge && <span className="feed-badge" data-tone={item.badge.tone}>{item.badge.label}</span>}
          {item.location && <span className="feed-badge feed-location"><MapPin size={12} aria-hidden="true" />{item.location}</span>}
        </div>
      </div>
      <div className="feed-card-copy">
        <p className="feed-source">{item.source}{item.isDummy && <span> · Data contoh</span>}</p>
        <h3>{item.title}</h3>
        {item.excerpt && <p className="feed-excerpt">{item.excerpt}</p>}
        <div className="feed-card-meta">
          {item.priceLabel && <p>{item.priceLabel}</p>}
          {item.rating && <span className="feed-rating" aria-label={`Rating ${item.rating.value} dari 5, ${item.rating.count} ulasan`}>
            <Star size={14} aria-hidden="true" />{item.rating.value.toLocaleString("id-ID")} ({item.rating.count})
          </span>}
        </div>
      </div>
    </Link>
  );
}

export function CarouselCard({ items }: { items: FeedItem[] }) {
  const [index, setIndex] = useState(0);
  const regionId = useId();
  const currentIndex = index % Math.max(items.length, 1);
  const item = items[currentIndex];
  const select = (nextIndex: number) => setIndex((nextIndex + items.length) % items.length);
  if (!item) return <p className="feed-empty">Belum ada pilihan unggulan untuk kategori ini.</p>;

  return (
    <div className="feed-carousel" role="region" aria-roledescription="carousel" aria-label="Listing unggulan"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const nextIndex = { ArrowLeft: currentIndex - 1, ArrowRight: currentIndex + 1, Home: 0, End: items.length - 1 }[event.key];
        if (nextIndex !== undefined) { event.preventDefault(); select(nextIndex); }
      }}>
      <div id={regionId} className="feed-slide" role="group" aria-roledescription="slide" aria-label={`${currentIndex + 1} dari ${items.length}`}>
        <FeedCard item={item} featured />
      </div>
      {items.length > 1 && <div className="feed-carousel-controls">
        <button type="button" onClick={() => select(currentIndex - 1)} aria-controls={regionId} aria-label="Listing sebelumnya" title="Listing sebelumnya"><ChevronLeft aria-hidden="true" /></button>
        <div className="feed-dots" role="group" aria-label="Pilih listing unggulan">
          {items.map((slide, slideIndex) => <button key={slide.id} type="button" onClick={() => select(slideIndex)}
            aria-label={`Tampilkan listing ${slideIndex + 1}: ${slide.title}`} aria-current={slideIndex === currentIndex ? "true" : undefined} aria-controls={regionId}>
            <span aria-hidden="true" />
          </button>)}
        </div>
        <button type="button" onClick={() => select(currentIndex + 1)} aria-controls={regionId} aria-label="Listing berikutnya" title="Listing berikutnya"><ChevronRight aria-hidden="true" /></button>
      </div>}
      <span className="sr-only" role="status">{currentIndex + 1} dari {items.length}: {item.title}</span>
    </div>
  );
}

type SidebarWidgetProps = {
  categories: FeedCategory[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  onCheckAvailability: DiscoverFeedProps["onCheckAvailability"];
};

export function SidebarWidget({ categories, activeCategory, onCategoryChange, onCheckAvailability }: SidebarWidgetProps) {
  const headingId = useId();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const stays = categories.filter(category => ["hotel", "apartemen"].includes(category.slug));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (checkOut <= checkIn) { setMessage("Tanggal check-out harus setelah check-in."); return; }
    const data = new FormData(event.currentTarget);
    setPending(true);
    setMessage("");
    try {
      setMessage(await onCheckAvailability({
        category: String(data.get("category")), location: String(data.get("location")).trim(), checkIn, checkOut,
      }));
    } catch { setMessage("Pengecekan belum berhasil. Silakan coba lagi."); }
    finally { setPending(false); }
  }

  return (
    <aside className="feed-sidebar" aria-label="Pencarian cepat">
      <section className="feed-widget" aria-labelledby={`${headingId}-filters`}>
        <h2 id={`${headingId}-filters`}><LayoutGrid size={18} aria-hidden="true" />Filter Cepat</h2>
        <div className="feed-category-grid" role="group" aria-label="Filter kategori feed">
          {[{ slug: "semua", nama: "Semua" }, ...categories].map(category => {
            const Icon = categoryIcons[category.slug] ?? LayoutGrid;
            return <button key={category.slug} type="button" aria-pressed={activeCategory === category.slug} onClick={() => onCategoryChange(category.slug)}>
              <Icon size={24} aria-hidden="true" /><span>{category.nama}</span>
            </button>;
          })}
        </div>
      </section>
      <section className="feed-widget" aria-labelledby={`${headingId}-availability`}>
        <h2 id={`${headingId}-availability`}><CalendarDays size={18} aria-hidden="true" />Cek Ketersediaan</h2>
        {stays.length ? <form onSubmit={handleSubmit} aria-busy={pending}>
          <fieldset disabled={pending}>
            <label>Jenis penginapan<select name="category" required>{stays.map(category => <option key={category.slug} value={category.slug}>{category.nama}</option>)}</select></label>
            <label>Kota atau kawasan<input name="location" required maxLength={100} /></label>
            <label>Check-in<input type="date" name="checkIn" value={checkIn} onChange={event => { setCheckIn(event.target.value); setCheckOut(""); setMessage(""); }} required /></label>
            <label>Check-out<input type="date" name="checkOut" value={checkOut} min={checkIn || undefined} onChange={event => setCheckOut(event.target.value)} required /></label>
            <button className="feed-submit" type="submit"><CalendarDays size={16} aria-hidden="true" />{pending ? "Memeriksa..." : "Cek tanggal"}</button>
          </fieldset>
          <p className="feed-feedback" role="status">{message}</p>
        </form> : <p className="feed-empty">Belum ada kategori penginapan aktif.</p>}
      </section>
    </aside>
  );
}

function FeedRow({ id, title, icon, href, items }: { id: string; title: string; icon: LucideIcon; href?: string; items: FeedItem[] }) {
  return (
    <section aria-labelledby={id}>
      <FeedHeader id={id} title={title} icon={icon} href={href} />
      {items.length ? <div className="feed-row">{items.map((item, index) => <FeedReveal key={item.id} order={index}><FeedCard item={item} /></FeedReveal>)}</div>
        : <p className="feed-empty">Belum ada konten untuk kategori ini.</p>}
    </section>
  );
}

export function DiscoverFeedSkeleton() {
  return <div className="discover-feed" aria-busy="true">
    <p className="sr-only" role="status">Memuat rekomendasi Vistara...</p>
    <div className="feed-shell feed-skeleton" aria-hidden="true">
      <div className="feed-main"><div className="feed-lead"><div className="feed-featured" /><div className="feed-story-one" /><div className="feed-story-two" /></div><div className="feed-row">{[0, 1, 2, 3].map(index => <div key={index} />)}</div></div>
      <div className="feed-sidebar"><div /><div /></div>
    </div>
  </div>;
}

export default function DiscoverFeedSection(props: DiscoverFeedProps) {
  const headingId = useId();
  const filter = (items: FeedItem[]) => items.filter(item => props.activeCategory === "semua" || item.categorySlug === props.activeCategory);
  const featured = filter(props.featured).slice(0, 5);
  const recommendations = filter(props.recommendations).slice(0, 2);
  if (props.loading) return <DiscoverFeedSkeleton />;

  return (
    <div className="discover-feed">
      <div className="feed-shell">
        <div className="feed-main">
          <section aria-labelledby={`${headingId}-recommendations`}>
            <FeedHeader id={`${headingId}-recommendations`} title="Rekomendasi Untukmu" icon={Compass} href={props.sectionLinks.recommendations} />
            <div className="feed-lead">
              <FeedReveal className="feed-featured"><CarouselCard key={`${props.activeCategory}:${featured.map(item => item.id).join(",")}`} items={featured} /></FeedReveal>
              {recommendations.map((item, index) => <FeedReveal key={item.id} order={index + 1} className={index === 0 ? "feed-story-one" : "feed-story-two"}><FeedCard item={item} /></FeedReveal>)}
            </div>
          </section>
          <section aria-labelledby={`${headingId}-trending`}>
            <FeedHeader id={`${headingId}-trending`} title="Trending di Sekitarmu" icon={MapPin} href={props.sectionLinks.trending} />
            <p className="feed-region">{props.locationLabel ?? "Pilih kota pada pencarian cepat"}</p>
            {filter(props.trending).length ? <div className="feed-row">{filter(props.trending).slice(0, 4).map((item, index) => <FeedReveal key={item.id} order={index}><FeedCard item={item} /></FeedReveal>)}</div>
              : <p className="feed-empty">Belum ada pilihan untuk lokasi dan kategori ini.</p>}
          </section>
          <FeedRow id={`${headingId}-reviews`} title="Ulasan Terbaru" icon={MessageSquare} href={props.sectionLinks.reviews} items={filter(props.reviews).slice(0, 4)} />
          <FeedRow id={`${headingId}-editor`} title="Rekomendasi Editor" icon={Sparkles} href={props.sectionLinks.editor} items={filter(props.editor).slice(0, 4)} />
        </div>
        <SidebarWidget categories={props.categories} activeCategory={props.activeCategory} onCategoryChange={props.onCategoryChange} onCheckAvailability={props.onCheckAvailability} />
      </div>
    </div>
  );
}