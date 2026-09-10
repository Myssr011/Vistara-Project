"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { ArticleType } from "@vistara/database";
import "./ContentHighlight.css";

export type ArticleCardData = {
  id: string;
  slug: string;
  judul: string;
  tipe: ArticleType;
  ringkasan: string;
  gambar_url: string;
  published_at: string;
};

export const ARTICLE_LABELS: Record<ArticleType, string> = {
  PROMO: "Promosi", FAKTA_MENARIK: "Fakta Menarik", TIPS: "Tips", BERITA: "Berita",
};

function ArticleCard({ article, featured = false }: { article: ArticleCardData; featured?: boolean }) {
  return <Link href={`/artikel/${article.slug}`} className={`article-card${featured ? " article-featured" : ""}`}>
    <div className="article-image"><Image src={article.gambar_url} alt="" fill sizes={featured ? "(max-width: 767px) 100vw, 45vw" : "(max-width: 639px) 100vw, (max-width: 1199px) 45vw, 20vw"} /><span className="article-badge" data-type={article.tipe}>{ARTICLE_LABELS[article.tipe]}</span></div>
    <div className="article-copy">
      <p className="article-source"><span>Vistara Editorial</span><time dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", timeZone: "Asia/Makassar" })}</time></p>
      <h3>{article.judul}</h3>
      {featured && <p className="article-summary">{article.ringkasan}</p>}
    </div>
  </Link>;
}

function ArticleCarousel({ articles }: { articles: ArticleCardData[] }) {
  const [index, setIndex] = useState(0);
  const slideId = useId();
  const current = index % articles.length;
  const select = (next: number) => setIndex((next + articles.length) % articles.length);
  return <div className="article-carousel" role="region" aria-roledescription="carousel" aria-label="Artikel sorotan" onKeyDown={event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const next = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: articles.length - 1 }[event.key];
    if (next !== undefined) { event.preventDefault(); select(next); }
  }}>
    <div id={slideId} className="article-slide" role="group" aria-roledescription="slide" aria-label={`${current + 1} dari ${articles.length}`}><ArticleCard article={articles[current]} featured /></div>
    {articles.length > 1 && <div className="article-controls">
      <button type="button" className="chrome-icon" title="Artikel sebelumnya" aria-label="Artikel sebelumnya" aria-controls={slideId} onClick={() => select(current - 1)}><ChevronLeft aria-hidden="true" /></button>
      <div className="article-dots" role="group" aria-label="Pilih artikel">{articles.map((article, position) => <button key={article.id} type="button" aria-label={`Tampilkan artikel ${position + 1}: ${article.judul}`} aria-current={current === position ? "true" : undefined} aria-controls={slideId} onClick={() => select(position)}><span /></button>)}</div>
      <button type="button" className="chrome-icon" title="Artikel berikutnya" aria-label="Artikel berikutnya" aria-controls={slideId} onClick={() => select(current + 1)}><ChevronRight aria-hidden="true" /></button>
    </div>}
    <p className="sr-only" role="status">{current + 1} dari {articles.length}: {articles[current].judul}</p>
  </div>;
}

export function ContentHighlightSkeleton() {
  return <section className="content-highlight" aria-busy="true" aria-label="Memuat Sorotan Vistara"><div className="content-inner"><div className="content-grid content-skeleton" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <div key={index} />)}</div><p className="sr-only" role="status">Memuat artikel...</p></div></section>;
}

export default function ContentHighlight({ articles }: { articles: ArticleCardData[] }) {
  return <section id="sorotan-vistara" className="content-highlight" aria-labelledby="sorotan-title">
    <div className="content-inner">
      <header className="content-heading"><h2 id="sorotan-title"><Sparkles size={19} aria-hidden="true" />Sorotan Vistara</h2></header>
      {articles.length ? <div className="content-grid">
        <ArticleCarousel articles={articles.slice(0, 2)} />
        {articles.slice(2, 8).map(article => <ArticleCard key={article.id} article={article} />)}
      </div> : <p className="content-empty">Belum ada artikel yang diterbitkan.</p>}
    </div>
  </section>;
}