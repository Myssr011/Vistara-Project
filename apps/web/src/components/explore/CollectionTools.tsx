import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";

export type CollectionQuery = Record<string, string | string[] | undefined>;

export function queryValue(query: CollectionQuery, name: string) {
  return typeof query[name] === "string" ? query[name].trim().slice(0, 120) : "";
}

export function queryPage(query: CollectionQuery) {
  const value = Number(queryValue(query, "page"));
  return Number.isSafeInteger(value) && value > 0 ? Math.min(value, 10000) : 1;
}

export function CollectionFilters({ action, query, placeholder, children }: {
  action: string; query: string; placeholder: string; children?: ReactNode;
}) {
  return <form action={action} method="get" className="collection-filters" role="search" aria-label="Filter koleksi">
    <label className="collection-query">Pencarian<div><Search size={18} aria-hidden="true" /><input type="search" name="q" defaultValue={query} placeholder={placeholder} maxLength={120} /></div></label>
    {children}
    <button type="submit" className="explore-button"><SlidersHorizontal size={16} aria-hidden="true" />Terapkan</button>
    <Link href={action} className="collection-reset">Reset</Link>
  </form>;
}

export function CollectionPagination({ path, query, page, total, pageSize }: {
  path: string; query: CollectionQuery; page: number; total: number; pageSize: number;
}) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1 && page === 1) return null;
  const href = (next: number) => {
    const params = new URLSearchParams();
    for (const key of Object.keys(query)) {
      const value = queryValue(query, key);
      if (value && key !== "page") params.set(key, value);
    }
    params.set("page", String(next));
    return `${path}?${params.toString()}`;
  };
  return <nav className="collection-pagination" aria-label="Halaman hasil">
    {page > 1 && <Link href={href(page - 1)}><ArrowLeft size={17} aria-hidden="true" />Sebelumnya</Link>}
    <span>Halaman {page}{pages >= page ? ` dari ${pages}` : ""}</span>
    {page < pages && <Link href={href(page + 1)}>Berikutnya<ArrowRight size={17} aria-hidden="true" /></Link>}
  </nav>;
}