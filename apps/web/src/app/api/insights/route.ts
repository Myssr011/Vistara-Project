import { NextResponse } from "next/server";
import { ambilInsightTerbaru } from "@/lib/insights";

// Endpoint ini dipakai dashboard admin nanti; homepage memanggil query-nya langsung
// lewat server component agar tidak ada round-trip HTTP yang tidak perlu.
export async function GET(request: Request) {
  const limit = Number(new URL(request.url).searchParams.get("limit") ?? 8);

  // TODO: tambahkan filter kategori + paginasi begitu admin bisa mengelola insight.
  const insights = await ambilInsightTerbaru(Number.isFinite(limit) ? limit : 8);

  return NextResponse.json({ data: insights });
}
