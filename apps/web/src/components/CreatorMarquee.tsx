"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./CreatorMarquee.module.css";

type CreatorMarqueeData = {
  id: string;
  nama: string;
  niche: string;
  foto_url: string;
};

export default function CreatorMarquee({ creators }: { creators: CreatorMarqueeData[] }) {
  const [paused, setPaused] = useState(false);
  if (!creators.length) return null;

  return <section className={styles.section} aria-labelledby="creator-marquee-title">
    <div className={styles.inner}>
      <header className={styles.heading}>
        <div><h2 id="creator-marquee-title">Content Creator Vistara</h2><p>Kreator yang berkolaborasi bersama kami</p></div>
        <button type="button" className={styles.pause} aria-label={paused ? "Lanjutkan animasi kreator" : "Jeda animasi kreator"} title={paused ? "Lanjutkan animasi kreator" : "Jeda animasi kreator"} aria-controls="creator-marquee-track" onClick={() => setPaused(value => !value)}>{paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}</button>
      </header>
      <div className={styles.viewport}>
        <div id="creator-marquee-track" className={styles.track} data-paused={paused}>
          {[false, true].map(duplicate => <ul key={String(duplicate)} className={styles.group} aria-hidden={duplicate || undefined}>
            {creators.map(creator => <li key={creator.id} className={styles.item}>
              <Link href={`/content-creator/${creator.id}`} className={styles.card} tabIndex={duplicate ? -1 : undefined} onFocus={event => {
                if (event.currentTarget.matches(":focus-visible")) event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
              }}>
                <div className={styles.photo}><Image src={creator.foto_url} alt="" fill sizes="(max-width: 599px) 100vw, (max-width: 1099px) 33vw, 20vw" /></div>
                <span className={styles.name}>{creator.nama}</span>
                <span className={styles.niche}>{creator.niche}</span>
              </Link>
            </li>)}
          </ul>)}
        </div>
      </div>
      <p className={styles.disclaimer}>Profil contoh dengan identitas fiktif dan foto ilustrasi.</p>
    </div>
  </section>;
}