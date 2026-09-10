const TRENDING = [
  "Apartemen dekat kampus",
  "Cafe aesthetic buka malam",
  "Hotel murah Makassar",
  "Apartemen studio Jakarta",
  "Resto keluarga Surabaya",
];

export default function TrendingWidget() {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-primary-soft p-4 ring-1 ring-primary/10">
      <h3 className="text-sm font-semibold text-primary-deep">Trending Pencarian Hari Ini</h3>

      <ol className="mt-3 flex flex-col gap-2.5">
        {TRENDING.map((keyword, i) => (
          <li key={keyword}>
            <a
              href={`/cari?q=${encodeURIComponent(keyword)}`}
              className="flex items-baseline gap-2.5 text-sm text-primary-deep hover:text-primary"
            >
              <span className="w-4 shrink-0 font-semibold text-primary/60">{i + 1}</span>
              <span className="line-clamp-1">{keyword}</span>
            </a>
          </li>
        ))}
      </ol>
    </article>
  );
}
