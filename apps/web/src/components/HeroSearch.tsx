"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CategoryPills from "./CategoryPills";
import SearchBar from "./SearchBar";

const HERO_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop";

export default function HeroSearch() {
  const anchor = useRef<HTMLSpanElement>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const navbar = document.querySelector(".vistara-navbar");
    if (!anchor.current || !navbar) return;
    let intersection: IntersectionObserver;
    const observe = () => {
      intersection?.disconnect();
      const height = navbar.getBoundingClientRect().height;
      intersection = new IntersectionObserver(([entry]) => {
        setSticky(!entry.isIntersecting && entry.boundingClientRect.top < height);
      }, { rootMargin: `-${height}px 0px 0px 0px`, threshold: 0 });
      if (anchor.current) intersection.observe(anchor.current);
    };
    const resize = new ResizeObserver(observe);
    resize.observe(navbar);
    observe();
    return () => { resize.disconnect(); intersection.disconnect(); };
  }, []);

  return (
    <section className="hero-search" aria-label="Pencarian Vistara">
      <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="hero-photo" />
      <div className="hero-shade" />
      <div className="hero-content">
        <h1>Vistara</h1>
        <p className="hero-subtitle">Cari properti dan kreator untuk kebutuhan brand Anda.</p>
        <div className="hero-toolbar-slot">
          <span ref={anchor} className="hero-toolbar-anchor" aria-hidden="true" />
          <div className="hero-toolbar transition-all duration-300" data-sticky={sticky}>
            <div className="hero-toolbar-inner"><SearchBar compact={sticky} /></div>
          </div>
        </div>
        <CategoryPills />
      </div>
    </section>
  );
}
