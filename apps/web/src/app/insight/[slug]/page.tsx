import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  INSIGHT_KATEGORI,
  formatTanggal,
} from "@/lib/insight-ui";
import { ambilInsight } from "@/lib/insights";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/insight/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = await ambilInsight(slug);
  if (!insight) return {};

  return {
    title: insight.judul,
    description: insight.ringkasan,
    alternates: { canonical: `/insight/${insight.slug}` },
    openGraph: {
      type: "article",
      title: `${insight.judul} | ${SITE_NAME}`,
      description: insight.ringkasan,
      images: [insight.gambarUrl],
      publishedTime: insight.tanggalTerbit.toISOString(),
    },
  };
}

export default async function InsightDetailPage({
  params,
}: PageProps<"/insight/[slug]">) {
  const { slug } = await params;
  const insight = await ambilInsight(slug);
  if (!insight) notFound();

  const kategori = INSIGHT_KATEGORI[insight.kategori];

  return (
    <main id="main-content" className="detail-page mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft size={17} aria-hidden="true" />Kembali ke beranda
      </Link>

      <span
        className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold ${kategori.badgeClass}`}
      >
        {kategori.label}
      </span>

      <h1 className="mt-3 text-2xl font-bold text-primary-deep sm:text-3xl">
        {insight.judul}
      </h1>

      <p className="mt-2 text-sm text-muted">
        <time dateTime={insight.tanggalTerbit.toISOString()}>
          {formatTanggal(insight.tanggalTerbit)}
        </time>
        {insight.sumber && ` · ${insight.sumber}`}
      </p>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-soft">
        <Image
          src={insight.gambarUrl}
          alt={insight.judul}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <p className="mt-6 text-base font-medium text-primary-deep">{insight.ringkasan}</p>

      {insight.konten && (
        <p className="mt-4 leading-relaxed whitespace-pre-line text-neutral-700">
          {insight.konten}
        </p>
      )}
    </main>
  );
}
