"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  return (
    <form role="search" aria-label="Cari tempat di Vistara" className="vistara-search" data-compact={compact} onSubmit={event => {
      event.preventDefault();
      router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
    }}>
      <Search size={20} aria-hidden="true" />
      <input type="search" name="q" value={query} onChange={event => setQuery(event.target.value)} placeholder="Cari hotel, apartemen, cafe..." aria-label="Kata kunci pencarian" />
      <button type="submit" title="Cari"><Search size={19} aria-hidden="true" /><span className="sr-only">Cari</span></button>
    </form>
  );
}
