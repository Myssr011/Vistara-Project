import ListingCard, { type ListingCardData } from "@/components/ListingCard";
import TrendingWidget from "@/components/TrendingWidget";

export default function DiscoverSection({
  listings,
  judul,
  deskripsi,
  tampilkanTrending = true,
}: {
  listings: ListingCardData[];
  judul: string;
  deskripsi?: string;
  tampilkanTrending?: boolean;
}) {
  return (
    <section className="listing-section bg-surface" aria-label={judul}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        <h2 className="text-xl font-bold text-primary-deep sm:text-2xl">{judul}</h2>
        {deskripsi && <p className="mt-1 text-sm text-muted">{deskripsi}</p>}

        {/* Mobile: geser horizontal. Desktop: grid 3-4 kolom. */}
        <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-4">
          {tampilkanTrending && (
            <div className="w-64 shrink-0 snap-start sm:w-auto">
              <TrendingWidget />
            </div>
          )}

          {listings.map((listing) => (
            <div key={listing.slug} className="w-64 shrink-0 snap-start sm:w-auto">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <p className="mt-6 text-sm text-muted">Belum ada listing yang cocok.</p>
        )}
      </div>
    </section>
  );
}
