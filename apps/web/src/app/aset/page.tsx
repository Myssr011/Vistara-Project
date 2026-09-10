import type { Metadata } from "next";
import ListingDirectory from "@/components/explore/ListingDirectory";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Aset", description: "Telusuri katalog hotel dan apartemen Vistara berdasarkan lokasi, kategori, dan harga awal.", alternates: { canonical: "/aset" } };

export default async function AssetPage({ searchParams }: PageProps<"/aset">) {
  return <ListingDirectory title="Aset & Properti" description="Dari singgah semalam hingga menemukan ruang tinggal. Kenali pilihan hotel dan apartemen, lalu bandingkan sesuai kebutuhan Anda." path="/aset" query={await searchParams} />;
}