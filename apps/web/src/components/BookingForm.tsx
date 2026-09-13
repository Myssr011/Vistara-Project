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
        className="mt-4 min-h-11 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-deep"
      >
        Ajukan booking
      </button>
    );
  }

  return (
    <form action="/api/booking" method="post" className="mt-4 space-y-3">
      <input type="hidden" name="listingSlug" value={listingSlug} />
      <label className="block text-sm">Nama<input name="nama" required autoComplete="name" className={inputClass} /></label>
      <label className="block text-sm">Nomor HP<input name="noHp" required type="tel" autoComplete="tel" className={inputClass} /></label>
      <label className="block text-sm">Tanggal keperluan<input type="date" name="tanggal" className={inputClass} /></label>
      <label className="block text-sm">Catatan<textarea name="catatan" rows={3} className={inputClass} /></label>
      <button
        type="submit"
        className="min-h-11 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-deep"
      >
        Kirim permintaan
      </button>
    </form>
  );
}

const inputClass =
  "mt-2 min-h-11 w-full rounded-md border border-[var(--line)] bg-[var(--panel-bg)] px-3 py-2 text-base focus:border-primary";
