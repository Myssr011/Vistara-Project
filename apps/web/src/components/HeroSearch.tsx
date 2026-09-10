"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CategoryPills from "./CategoryPills";
import SearchBar from "./SearchBar";

const HERO_IMAGE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80&auto=format&fit=crop";

export default function HeroSearch() {
  const anchor = useRef<HTMLSpanElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (sticky || !toolbar.current) return;
    const reserve = () => {
      if (slot.current && toolbar.current) slot.current.style.minHeight = `${toolbar.current.getBoundingClientRect().height}px`;
    };
    const resize = new ResizeObserver(reserve);
    resize.observe(toolbar.current);
    reserve();
    return () => resize.disconnect();
  }, [sticky]);

  return (
    <section className="hero-search" aria-label="Pencarian Vistara">
      <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="hero-photo" />
      <div className="hero-shade" />
      <div className="hero-content">
        <h1>Vistara</h1>
        <p className="hero-subtitle">Satu pencarian, semua kebutuhan.</p>
        <div ref={slot} className="hero-toolbar-slot">
          <span ref={anchor} className="hero-toolbar-anchor" aria-hidden="true" />
          <div ref={toolbar} className="hero-toolbar" data-sticky={sticky}>
            <div className="hero-toolbar-inner"><SearchBar compact={sticky} /><CategoryPills /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
