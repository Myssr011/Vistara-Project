import type { FilterType } from "@/lib/categories";

/**
 * Filter per kategori (MVP):
 * - penginapan (hotel/apartemen): lokasi, check-in/out, rentang harga
 * - tempat (cafe/restoran): lokasi, jam buka, rentang harga, rating
 */
export default function CategoryFilters({ tipe }: { tipe: FilterType }) {
  return (
    <form method="get" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input name="lokasi" placeholder="Lokasi" className={inputClass} />

      {tipe === "penginapan" && (
        <>
          <input type="date" name="checkin" aria-label="Check-in" className={inputClass} />
          <input type="date" name="checkout" aria-label="Check-out" className={inputClass} />
        </>
      )}

      {tipe === "tempat" && (
        <>
          <input type="time" name="jam" aria-label="Jam buka" className={inputClass} />
          <select name="rating" aria-label="Rating minimum" className={inputClass}>
            <option value="">Rating apa saja</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>
        </>
      )}

      <div className="flex gap-2">
        <input type="number" name="harga_min" placeholder="Harga min" className={inputClass} />
        <input type="number" name="harga_max" placeholder="Harga max" className={inputClass} />
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-deep"
      >
        Terapkan
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-primary";
