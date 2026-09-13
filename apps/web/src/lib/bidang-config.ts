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
    tagline: "Foto, video, dan pengelolaan listing untuk hotel dan apartemen.",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Arsitektur hotel dan area kolam renang",
    accentColor: "blue",
    deskripsi: "Vistara memproduksi foto dan video tur untuk hotel dan apartemen, menata informasi listing, serta merencanakan konten bersama pengelola properti. Kolaborasi dengan kreator disesuaikan dengan karakter properti dan kebutuhan calon tamu.",
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
    tagline: "Kurasi kreator, brief konten, dan pengelolaan kerja sama dengan brand.",
    heroImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Timeline penyuntingan video dalam proses produksi konten",
    accentColor: "purple",
    deskripsi: "Vistara memilih kreator sesuai kebutuhan brand, menyusun brief, mengatur kontrak, dan mengawasi produksi konten. Kreator mempertahankan gaya bercerita mereka. Brand menerima laporan hasil campaign berdasarkan tujuan yang disepakati.",
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
    tagline: "Perencanaan program afiliasi, pelacakan penjualan, dan skema komisi.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Tim pemasaran meninjau strategi bersama",
    accentColor: "teal",
    deskripsi: "Vistara membantu brand memilih mitra afiliasi, menetapkan cara mencatat penjualan, dan menyusun skema komisi. Brand dan mitra menyepakati pelacakan, jadwal laporan, serta ketentuan pembayaran sebelum program berjalan. Hasil penjualan tidak dijamin.",
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
      { nilai: "Disepakati sebelum program berjalan", label: "Skema komisi" },
      { nilai: "Mengikuti tujuan campaign", label: "Pelacakan penjualan" },
      { nilai: "Sesuai jadwal bersama", label: "Laporan dan pembayaran" },
    ],
  },
  "konten-kuliner": {
    nama: "Konten Kuliner",
    tagline: "Foto menu, video ulasan, dan konten media sosial cafe atau restoran.",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85&auto=format&fit=crop",
    heroAlt: "Suasana restoran dengan penataan meja dan pencahayaan hangat",
    accentColor: "orange",
    deskripsi: "Vistara memproduksi foto hidangan, video ulasan, serta konten menu dan promosi untuk cafe atau restoran. Tim juga mengatur kolaborasi dengan kreator kuliner dan mengelola konten media sosial sesuai karakter usaha.",
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