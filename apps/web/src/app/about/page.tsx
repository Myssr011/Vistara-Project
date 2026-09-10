import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, MapPin, MessagesSquare } from "lucide-react";
import { ExplorePage } from "@/components/explore/ExplorePage";

export const metadata: Metadata = {
  title: "About", description: "Mengenal Vistara: tempat, cerita, dan pilihan lokal untuk perjalanan dan keseharian Anda.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <ExplorePage>
    <div className="explore-wrap"><nav aria-label="Breadcrumb" className="explore-breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span aria-current="page">About</span></nav></div>
    <section className="about-photo" aria-labelledby="about-title">
      <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=85&auto=format&fit=crop" alt="Perahu kayu di danau yang dikelilingi pegunungan dan hutan" fill priority sizes="100vw" />
      <div className="explore-wrap about-photo-copy"><p className="explore-eyebrow">KENALI LEBIH DEKAT</p><h1 id="about-title">Vistara</h1><p>Perjalanan yang berkesan sering dimulai dari satu pilihan kecil: tempat singgah, ruang bertemu, atau cerita yang ingin diikuti.</p><Link className="explore-button explore-button-light" href="/bidang">Temukan pilihan Anda<ArrowRight size={17} aria-hidden="true" /></Link></div>
    </section>
    <section className="explore-wrap explore-section">
      <div className="about-story"><div><p className="explore-eyebrow">TENTANG KAMI</p><h2>Lebih dekat dengan tempat dan cerita lokal.</h2></div><div><p>Vistara mempertemukan pilihan penginapan, hunian, dan kuliner dalam satu ruang penelusuran. Di sini, kebutuhan praktis dan inspirasi berjalan berdampingan.</p><p>Kami ingin membantu Anda mengenal pilihan sebelum mengambil keputusan: melihat suasananya, memahami lokasinya, dan menemukan informasi yang relevan dari mitra maupun konten editorial.</p><Link href="/portofolio" className="explore-text-link">Kenali mitra Vistara<ArrowRight size={17} aria-hidden="true" /></Link></div></div>
      <div className="about-values">
        <div><Compass size={26} aria-hidden="true" /><h3>Pilihan yang relevan</h3><p>Dari perjalanan singkat hingga kebutuhan tempat tinggal, mulai dari apa yang Anda perlukan.</p></div>
        <div><MapPin size={26} aria-hidden="true" /><h3>Konteks lokal</h3><p>Lokasi, suasana, dan karakter setiap tempat ikut menjadi pertimbangan, bukan hanya harga.</p></div>
        <div><MessagesSquare size={26} aria-hidden="true" /><h3>Informasi yang jelas</h3><p>Harga yang ditampilkan adalah acuan awal. Detail penawaran dan ketersediaan tetap dikonfirmasi bersama mitra.</p></div>
      </div>
    </section>
    <section className="about-paths explore-section"><div className="explore-wrap"><div className="explore-section-heading"><div><p className="explore-eyebrow">MULAI DARI SINI</p><h2>Apa yang sedang Anda cari?</h2></div></div><div className="about-path-grid">
      <Link href="/bidang" className="about-path"><h3>Tempat untuk dikunjungi<ArrowUpRight aria-hidden="true" /></h3><p>Jelajahi hotel, apartemen, serta cafe dan restoran.</p></Link>
      <Link href="/aset" className="about-path"><h3>Ruang untuk singgah<ArrowUpRight aria-hidden="true" /></h3><p>Bandingkan properti berdasarkan lokasi dan harga awal.</p></Link>
      <Link href="/content-creator" className="about-path"><h3>Cerita untuk diikuti<ArrowUpRight aria-hidden="true" /></h3><p>Temukan ide, tips, dan perspektif baru dari koleksi editorial.</p></Link>
    </div></div></section>
    <section className="explore-wrap explore-section about-faq"><div className="explore-section-heading"><div><p className="explore-eyebrow">SEBELUM MENJELAJAH</p><h2>Pertanyaan umum</h2></div></div>
      <details><summary>Apakah harga dan ketersediaan sudah final?</summary><p>Belum. Harga pada katalog adalah harga awal, sementara ketersediaan, rincian fasilitas, dan ketentuan penawaran perlu dikonfirmasi kepada mitra.</p></details>
      <details><summary>Apa perbedaan Portofolio dan Aset?</summary><p>Portofolio memperkenalkan mitra beserta pilihan tempatnya. Aset berfokus pada katalog hotel dan apartemen yang dapat Anda telusuri berdasarkan kebutuhan.</p></details>
      <details><summary>Apakah akun dan konten sudah menggunakan data nyata?</summary><p>Vistara saat ini berada dalam tahap pengembangan. Koleksi awal memuat data contoh dan akun menggunakan simulasi lokal, bukan autentikasi atau transaksi sungguhan.</p></details>
    </section>
  </ExplorePage>;
}