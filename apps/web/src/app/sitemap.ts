import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, listings] = await Promise.all([
    prisma.category.findMany({ where: { status: "ACTIVE" }, select: { slug: true } }),
    prisma.listing.findMany({
      where: { status: "PUBLISHED", category: { status: "ACTIVE" } },
      select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
    }),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...categories.map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...listings.map((l) => ({
      url: `${SITE_URL}/${l.category.slug}/${l.slug}`,
      lastModified: l.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
