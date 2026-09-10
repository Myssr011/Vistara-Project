import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@vistara/database";

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
  PROMO: "Promo", FAKTA_MENARIK: "Fakta Menarik", TIPS: "Tips", BERITA: "Berita",
};

export default function ArticleCard({ article, size }: { article: ArticleCardData; size: "small" | "large" }) {
  return <Link href={`/artikel/${article.slug}`} className="article-card" data-size={size}>
    <div className="article-image"><Image src={article.gambar_url} alt="" fill sizes={`(max-width: 599px) 100vw, (max-width: 1099px) ${size === "large" ? "67vw" : "33vw"}, ${size === "large" ? "40vw" : "20vw"}`} /><span className="article-badge" data-type={article.tipe}>{ARTICLE_LABELS[article.tipe]}</span></div>
    <div className="article-copy">
      <p className="article-source"><span>Vistara Editorial</span><time dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", timeZone: "Asia/Makassar" })}</time></p>
      <h3>{article.judul}</h3>
      {size === "large" && <p className="article-summary">{article.ringkasan}</p>}
    </div>
  </Link>;
}