import ArticleCard, { type ArticleCardData } from "./ArticleCard";
import "./ContentHighlight.css";

export { ARTICLE_LABELS, type ArticleCardData } from "./ArticleCard";
const ARTICLE_LIMIT = 14;

export function ContentHighlightSkeleton() {
  return <section className="content-highlight" aria-busy="true" aria-label="Memuat Sorotan Vistara"><div className="content-inner"><div className="content-grid content-skeleton" aria-hidden="true">{Array.from({ length: ARTICLE_LIMIT }, (_, index) => <div key={index} />)}</div><p className="sr-only" role="status">Memuat artikel...</p></div></section>;
}

export default function ContentHighlight({ articles }: { articles: ArticleCardData[] }) {
  const visible = articles.slice(0, ARTICLE_LIMIT);
  return <section id="sorotan-vistara" className="content-highlight" aria-label="Sorotan Vistara">
    <div className="content-inner">
      <div id="sorotan-grid" className="content-grid">
        {visible.map((article, index) => <ArticleCard key={article.id} article={article} size={index % 9 === 5 ? "large" : "small"} />)}
      </div>
      {!articles.length && <p className="content-empty">Belum ada artikel yang diterbitkan.</p>}
    </div>
  </section>;
}