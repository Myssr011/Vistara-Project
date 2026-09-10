"use client";

import { BedDouble, Building2, Coffee, LayoutGrid, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import "./CategoryIconDock.css";

export type DockKategori = { slug: string; nama: string };

type CategoryIconDockProps = {
  kategori: DockKategori[];
  aktif: string;
  onSelect: (slug: string) => void;
};

const ICONS: Record<string, LucideIcon> = {
  semua: LayoutGrid,
  apartemen: Building2,
  "cafe-restoran": Coffee,
  hotel: BedDouble,
};

export default function CategoryIconDock({ kategori, aktif, onSelect }: CategoryIconDockProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div role="group" aria-label="Filter kategori" className="category-icon-dock">
      {kategori.map(({ slug, nama }) => {
        const Icon = ICONS[slug] ?? LayoutGrid;

        return (
          <motion.button
            key={slug}
            type="button"
            aria-pressed={aktif === slug}
            onClick={() => onSelect(slug)}
            className="category-dock-button"
            data-category={slug}
            initial={false}
            animate="rest"
            whileHover={reducedMotion ? undefined : "hover"}
            whileTap={reducedMotion ? undefined : "pressed"}
          >
            <motion.span
              className="category-dock-tile"
              variants={reducedMotion ? undefined : {
                rest: { scale: 1, y: 0, transition: { type: "spring", stiffness: 450, damping: 20, mass: 0.5 } },
                hover: { scale: 1.07, y: -3, transition: { duration: 0.18, ease: [0.2, 0, 0, 1] } },
                pressed: { scale: 0.94, y: 1, transition: { duration: 0.1, ease: "easeOut" } },
              }}
            >
              <Icon aria-hidden="true" strokeWidth={1.75} className="size-7 sm:size-8" />
            </motion.span>
            <span className="category-dock-label">{nama}</span>
            <span aria-hidden="true" className="category-dock-indicator" />
          </motion.button>
        );
      })}
    </div>
  );
}