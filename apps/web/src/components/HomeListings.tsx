"use client";

import DiscoverSection from "./DiscoverSection";
import type { ListingCardData } from "./ListingCard";
import { SEMUA, useFilterKategori } from "@/lib/filter-kategori";
import { cocokKategoriLayanan, KATEGORI_LAYANAN } from "@/lib/kategori-layanan";

export default function HomeListings({ listings }: { listings: ListingCardData[] }) {
  const { aktif } = useFilterKategori();
  const filtered = listings.filter(listing => cocokKategoriLayanan(listing.kategoriSlug, aktif));
  const label = KATEGORI_LAYANAN.find(kategori => kategori.slug === aktif)?.nama ?? aktif;
  return <div id="rekomendasi-untukmu">
    <DiscoverSection listings={filtered} judul="Rekomendasi Untukmu" tampilkanTrending={false} />
    <p className="sr-only" role="status">{filtered.length} rekomendasi tempat untuk {aktif === SEMUA ? "semua kategori" : label}.</p>
  </div>;
}