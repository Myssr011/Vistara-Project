import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();

  // TODO: validasi input, cari listing by slug, lalu prisma.booking.create({ status: PENDING }).
  void form;

  return NextResponse.json({ ok: true, status: "PENDING" }, { status: 501 });
}
