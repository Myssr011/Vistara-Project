import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import "@/components/ContentHighlight.css";

export const dynamic = "force-dynamic";
const getArticle = cache((slug: string) => prisma.article.findFirst({ where: { slug, published_at: { lte: new Date() } } }));

export async function generateMetadata({ params }: PageProps<"/artikel/[slug]">): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return { title: article?.judul ?? "Artikel tidak ditemukan", description: article?.ringkasan };
}

export default async function ArticlePage({ params }: PageProps<"/artikel/[slug]">) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const labels = { PROMO: "Promosi", FAKTA_MENARIK: "Fakta Menarik", TIPS: "Tips", BERITA: "Berita" };
  return <main id="main-content" className="article-detail">
    <Link href="/#sorotan-vistara">Kembali ke Sorotan Vistara</Link>
    <h1>{article.judul}</h1>
    <p className="article-detail-meta">{labels[article.tipe]} | Vistara Editorial | <time dateTime={article.published_at.toISOString()}>{article.published_at.toLocaleDateString("id-ID", { dateStyle: "long", timeZone: "Asia/Makassar" })}</time></p>
    <Image src={article.gambar_url} alt={article.judul} width={1200} height={675} sizes="(max-width: 900px) 100vw, 900px" priority />
    <p>{article.ringkasan}</p>
  </main>;
}