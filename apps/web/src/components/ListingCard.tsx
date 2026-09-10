import Image from "next/image";
import Link from "next/link";

export type ListingCardData = {
  slug: string;
  judul: string;
  lokasi: string;
  harga: number;
  fotoUtama: string | null;
  kategoriNama: string;
  kategoriSlug: string;
};

export default function ListingCard({ listing }: { listing: ListingCardData }) {
  return (
    <Link
      href={`/${listing.kategoriSlug}/${listing.slug}`}
      className="listing-card group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-primary-soft">
        {listing.fotoUtama && (
          <Image
            src={listing.fotoUtama}
            alt={listing.judul}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {listing.kategoriNama}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-semibold text-primary-deep">{listing.judul}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{listing.lokasi}</p>
        <p className="mt-auto pt-3 text-sm text-muted">
          Mulai dari{" "}
          <span className="font-semibold text-primary">
            Rp{listing.harga.toLocaleString("id-ID")}
          </span>
        </p>
      </div>
    </Link>
  );
}
