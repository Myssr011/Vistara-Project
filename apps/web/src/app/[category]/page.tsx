import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingDirectory from "@/components/explore/ListingDirectory";
import { prisma } from "@/lib/db";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  const def = await prisma.category.findUnique({ where: { slug: category } });
  if (!def) return {};

  return {
    title: `${def.nama} — ${SITE_NAME}`,
    description: `Cari dan bandingkan ${def.nama.toLowerCase()} terbaik di Vistara.`,
    alternates: { canonical: `/${def.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/[category]">) {
  const { category } = await params;
  const def = await prisma.category.findUnique({ where: { slug: category } });
  if (!def || def.status !== "ACTIVE") notFound();

  return <ListingDirectory title={def.nama} description={`Temukan pilihan ${def.nama.toLowerCase()} dari mitra Vistara. Telusuri lokasi, lihat suasananya, dan bandingkan harga awal sebelum merencanakan kunjungan.`} path={`/${def.slug}`} categorySlug={def.slug} query={await searchParams} />;
}
