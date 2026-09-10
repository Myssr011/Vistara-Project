import Image from "next/image";
import Link from "next/link";
import {
  INSIGHT_KATEGORI,
  formatTanggal,
  type InsightCardData,
} from "@/lib/insight-ui";

export default function InsightCard({ insight }: { insight: InsightCardData }) {
  const kategori = INSIGHT_KATEGORI[insight.kategori];

  return (
    <Link
      href={`/insight/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-primary-soft">
        <Image
          src={insight.gambarUrl}
          alt={insight.judul}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${kategori.badgeClass}`}
        >
          {kategori.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-semibold text-primary-deep group-hover:text-primary">
          {insight.judul}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-muted">{insight.ringkasan}</p>
        <time
          dateTime={insight.tanggalTerbit.toISOString()}
          className="mt-auto pt-3 text-xs text-muted"
        >
          {formatTanggal(insight.tanggalTerbit)}
        </time>
      </div>
    </Link>
  );
}
