"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export const SEMUA = "semua";

type FilterKategoriValue = {
  aktif: string;
  pilih: (slug: string) => void;
};

const FilterKategoriContext = createContext<FilterKategoriValue | null>(null);

/**
 * Ikon kategori ada di hero, sedangkan konten yang difilter ada di section lain.
 * Context dipakai agar keduanya berbagi state tanpa menjadikan seluruh halaman client.
 */
export function FilterKategoriProvider({ children }: { children: ReactNode }) {
  const [aktif, setAktif] = useState(SEMUA);

  const value = useMemo(
    () => ({ aktif, pilih: (slug: string) => setAktif(slug) }),
    [aktif],
  );

  return (
    <FilterKategoriContext.Provider value={value}>{children}</FilterKategoriContext.Provider>
  );
}

export function useFilterKategori(): FilterKategoriValue {
  const konteks = useContext(FilterKategoriContext);
  if (!konteks) {
    throw new Error("useFilterKategori harus dipakai di dalam FilterKategoriProvider");
  }
  return konteks;
}
