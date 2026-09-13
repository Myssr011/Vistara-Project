import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { getFilterType } from "@/lib/categories";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getListing(categorySlug: string, slug: string) {
  return prisma.listing.findFirst({
    where: { slug, status: "PUBLISHED", category: { slug: categorySlug, status: "ACTIVE" } },
    include: {
      category: { select: { nama: true, slug: true } },
      images: { orderBy: { urutan: "asc" } },
    },
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const listing = await getListing(category, slug);
  if (!listing) return {};

  return {
    title: listing.judul,
    description: listing.deskripsi.slice(0, 160),
    alternates: { canonical: `/${listing.category.slug}/${listing.slug}` },
    openGraph: {
      type: "website",
      title: listing.judul,
      description: listing.deskripsi.slice(0, 160),
      images: listing.images[0]?.url ? [listing.images[0].url] : undefined,
    },
  };
}

export default async function ListingDetailPage({
  params,
}: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  const listing = await getListing(category, slug);
  if (!listing) notFound();

  const isTempat = getFilterType(listing.category.slug) === "tempat";

  return (
    <main id="main-content" className="detail-page mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <p className="text-sm text-muted">{listing.category.nama}</p>
      <h1 className="mt-1 text-2xl font-bold text-primary-deep">{listing.judul}</h1>
      <p className="mt-1 text-sm text-muted">{listing.lokasi}</p>

      <section aria-label="Galeri foto" className="mt-6 grid gap-2 sm:grid-cols-3">
        {listing.images.map((img, i) => (
          <div
            key={img.id}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-primary-soft ${
              i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <Image
              src={img.url}
              alt={listing.judul}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-primary-deep">Deskripsi</h2>
            <p className="mt-2 text-sm text-muted">{listing.deskripsi}</p>
          </section>

          {isTempat && listing.jamBuka && (
            <section>
              <h2 className="text-lg font-semibold text-primary-deep">Jam operasional</h2>
              <p className="mt-2 text-sm text-muted">
                {listing.jamBuka} – {listing.jamTutup ?? "selesai"}
              </p>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-primary-deep">Fasilitas</h2>
            {/* TODO: model fasilitas belum ada di skema. */}
            <p className="mt-2 text-sm text-muted">Informasi fasilitas belum tersedia.</p>
          </section>
        </div>

        <aside className="booking-panel h-fit rounded-lg border border-[var(--line)] bg-[var(--panel-bg)] p-5">
          <p className="text-sm text-muted">Mulai dari</p>
          <p className="text-xl font-bold text-primary">
            Rp{Number(listing.harga).toLocaleString("id-ID")}
          </p>
          <p className="mt-2 text-sm text-muted">Konfirmasikan satuan harga dan ketersediaan kepada mitra.</p>
          <BookingForm listingSlug={listing.slug} />
        </aside>
      </div>
    </main>
  );
}
