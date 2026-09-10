"use client";

import { useState } from "react";

/** Fase 1: booking hanya menyimpan record berstatus PENDING, belum ada payment gateway. */
export default function BookingForm({ listingSlug }: { listingSlug: string }) {
  const [terbuka, setTerbuka] = useState(false);

  if (!terbuka) {
    return (
      <button
        type="button"
        onClick={() => setTerbuka(true)}
        className="mt-4 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-deep"
      >
        Booking / Kontak
      </button>
    );
  }

  return (
    <form action="/api/booking" method="post" className="mt-4 space-y-3">
      <input type="hidden" name="listingSlug" value={listingSlug} />
      <input name="nama" required placeholder="Nama" className={inputClass} />
      <input name="noHp" required inputMode="tel" placeholder="Nomor HP" className={inputClass} />
      <input type="date" name="tanggal" aria-label="Tanggal keperluan" className={inputClass} />
      <textarea name="catatan" rows={3} placeholder="Keperluan" className={inputClass} />
      <button
        type="submit"
        className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-deep"
      >
        Kirim
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-primary";
