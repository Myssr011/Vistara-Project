import { BarChart3, Camera, ClipboardList, FileCheck2, Handshake, Megaphone, Network, SearchCheck, Target, Utensils, Video, Wallet, type LucideIcon } from "lucide-react";

type BidangBase = {
  nama: string;
  tagline: string;
  heroImage: string;
  heroAlt: string;
  accentColor: "blue" | "purple" | "teal" | "orange";
  deskripsi: string;
  supportingImage: string;
  supportingAlt: string;
  layananList: { nama: string; icon: LucideIcon }[];
  showcaseTitle: string;
};

export type BidangConfig = BidangBase & (
  | { showcaseType: "listing"; kategoriSlugs: string[] }
  | { showcaseType: "creator" }
  | { showcaseType: "stats"; stats: { nilai: string; label: string }[] }
);

export const bidangConfig = {
  "pemasaran-properti": {
    nama: "Pemasaran Properti",
    tagline: "Menghadirkan hotel & apartemen ke audiens yang tepat melalui konten yang menjual",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Arsitektur hotel dan area kolam renang",
    accentColor: "blue",
    deskripsi: "Setiap properti memiliki cerita, mulai dari suasana kamar hingga pengalaman di sekitarnya. Vistara Media Indonesia membantu hotel dan apartemen menyampaikan cerita itu melalui strategi konten yang relevan, foto profesional, dan video tur virtual. Kami menghubungkan keunggulan properti dengan kebutuhan calon tamu, menata informasi listing, serta merancang kolaborasi kreator yang sesuai dengan karakter brand.",
    supportingImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=85&auto=format&fit=crop",
    supportingAlt: "Interior apartemen terang dengan ruang duduk dan area makan",
    layananList: [
      { nama: "Strategi konten properti", icon: Target },
      { nama: "Foto & video profesional", icon: Camera },
      { nama: "Optimasi listing di platform booking", icon: SearchCheck },
      { nama: "Kolaborasi dengan content creator niche properti", icon: Handshake },
    ],
    showcaseTitle: "Pilihan Hotel & Apartemen",
    showcaseType: "listing",
    kategoriSlugs: ["hotel", "apartemen"],
  },
  "content-creator-management": {
    nama: "Content Creator Management",
    tagline: "Menghubungkan brand dengan kreator yang tepat untuk cerita yang autentik",
    heroImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Timeline penyuntingan video dalam proses produksi konten",
    accentColor: "purple",
    deskripsi: "Kolaborasi yang bermakna dimulai dari kecocokan antara brand, kreator, dan audiensnya. Vistara mendampingi proses tersebut melalui kurasi kreator, penyusunan brief, negosiasi kerja sama, serta pengawasan produksi konten. Kreator tetap memiliki ruang untuk bercerita dengan gayanya sendiri, sementara brand memperoleh alur kerja yang jelas dan laporan performa campaign sesuai tujuan yang disepakati.",
    supportingImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=85&auto=format&fit=crop",
    supportingAlt: "Tim kreatif berdiskusi dan menyusun rencana kolaborasi",
    layananList: [
      { nama: "Kurasi & matching kreator", icon: SearchCheck },
      { nama: "Manajemen kontrak kolaborasi", icon: FileCheck2 },
      { nama: "Brief & pengawasan konten", icon: ClipboardList },
      { nama: "Laporan performa campaign", icon: BarChart3 },
    ],
    showcaseTitle: "Kenali Kreator Vistara",
    showcaseType: "creator",
  },
  "affiliate-marketing": {
    nama: "Affiliate Marketing",
    tagline: "Perluas jangkauan penjualan lewat jaringan afiliasi yang terukur",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Tim pemasaran meninjau strategi bersama",
    accentColor: "teal",
    deskripsi: "Vistara membantu brand merancang program afiliasi dengan tujuan, atribusi, dan skema komisi yang transparan. Mulai dari memilih jaringan yang relevan hingga meninjau hasil campaign, setiap tahap diarahkan agar kontribusi mitra dapat dipahami dan dievaluasi. Integrasi pelacakan, jadwal laporan, serta ketentuan pembayaran ditentukan bersama sebelum program berjalan, tanpa menjanjikan tingkat konversi tertentu.",
    supportingImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85&auto=format&fit=crop",
    supportingAlt: "Laptop menampilkan laporan dan analitik pemasaran",
    layananList: [
      { nama: "Program komisi terstruktur", icon: Wallet },
      { nama: "Tracking & reporting real-time", icon: BarChart3 },
      { nama: "Rekrutmen jaringan afiliasi", icon: Network },
      { nama: "Konsultasi strategi affiliate", icon: Target },
    ],
    showcaseTitle: "Gambaran Program Afiliasi",
    showcaseType: "stats",
    stats: [
      { nilai: "150+", label: "Mitra afiliasi aktif" },
      { nilai: "35%", label: "Rata-rata peningkatan konversi" },
      { nilai: "Rp2,5 M+", label: "Komisi tersalurkan" },
    ],
  },
  "konten-kuliner": {
    nama: "Konten Kuliner",
    tagline: "Membuat cafe & restoran Anda tampil menggugah selera di mata audiens",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Suasana restoran dengan penataan meja dan pencahayaan hangat",
    accentColor: "orange",
    deskripsi: "Dari tekstur hidangan hingga suasana meja, detail kecil dapat menjadi awal cerita yang kuat. Vistara membantu cafe dan restoran mengemas cerita tersebut melalui food photography, video review, serta kolaborasi dengan food content creator. Kami menyusun konten menu, promosi, dan media sosial yang sesuai karakter usaha, dengan informasi yang jujur dan visual yang memperlihatkan pengalaman kuliner sebenarnya.",
    supportingImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&q=85&auto=format&fit=crop",
    supportingAlt: "Interior cafe dan area sajian untuk pengunjung",
    layananList: [
      { nama: "Food photography & videography", icon: Camera },
      { nama: "Kolaborasi food content creator", icon: Utensils },
      { nama: "Konten promosi menu & event", icon: Video },
      { nama: "Manajemen media sosial kuliner", icon: Megaphone },
    ],
    showcaseTitle: "Pilihan Cafe & Restoran",
    showcaseType: "listing",
    kategoriSlugs: ["cafe-restoran"],
  },
} satisfies Record<string, BidangConfig>;

export function getBidangConfig(slug: string): BidangConfig | undefined {
  return Object.hasOwn(bidangConfig, slug) ? bidangConfig[slug as keyof typeof bidangConfig] : undefined;
}