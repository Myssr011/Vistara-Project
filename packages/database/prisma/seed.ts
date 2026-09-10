import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL belum di-set");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

const CATEGORIES = [
  { slug: "hotel", nama: "Hotel", status: "ACTIVE" },
  { slug: "apartemen", nama: "Apartemen", status: "ACTIVE" },
  { slug: "cafe-restoran", nama: "Cafe / Restoran", status: "ACTIVE" },
  { slug: "fashion", nama: "Fashion", status: "COMING_SOON" },
  { slug: "olahraga", nama: "Olahraga", status: "COMING_SOON" },
  { slug: "tempat-hiburan", nama: "Tempat Hiburan", status: "COMING_SOON" },
  { slug: "konten-kreator", nama: "Konten Kreator", status: "COMING_SOON" },
] as const;

const PARTNERS = [
  { email: "cendana@vistara.test", namaUsaha: "Hotel Cendana Makassar" },
  { email: "greenvalley@vistara.test", namaUsaha: "Apartemen Green Valley Residence" },
  { email: "kopisenja@vistara.test", namaUsaha: "Kopi Senja Cafe" },
  { email: "skyline@vistara.test", namaUsaha: "Apartemen Skyline Tower" },
  { email: "nusantara@vistara.test", namaUsaha: "Warung Nusantara Resto" },
] as const;

type SeedListing = {
  slug: string;
  judul: string;
  deskripsi: string;
  harga: number;
  lokasi: string;
  kategori: string;
  partner: string;
  jamBuka?: string;
  jamTutup?: string;
  foto: string;
};

const LISTINGS: SeedListing[] = [
  {
    slug: "hotel-cendana-makassar-kamar-deluxe",
    judul: "Hotel Cendana Makassar - Kamar Deluxe",
    deskripsi:
      "Kamar deluxe dengan pemandangan Pantai Losari, sarapan prasmanan, dan akses cepat ke pusat kota Makassar.",
    harga: 450_000,
    lokasi: "Makassar, Sulawesi Selatan",
    kategori: "hotel",
    partner: "cendana@vistara.test",
    foto: UNSPLASH("photo-1566073771259-6a8506099945"),
  },
  {
    slug: "hotel-cendana-makassar-suite-losari",
    judul: "Hotel Cendana Makassar - Suite Losari",
    deskripsi:
      "Suite luas dengan ruang tamu terpisah, bathtub, dan balkon menghadap laut. Cocok untuk perjalanan bisnis.",
    harga: 800_000,
    lokasi: "Makassar, Sulawesi Selatan",
    kategori: "hotel",
    partner: "cendana@vistara.test",
    foto: UNSPLASH("photo-1611892440504-42a792e24d32"),
  },
  {
    slug: "hotel-cendana-bandung-superior",
    judul: "Cendana Bandung - Kamar Superior Dago",
    deskripsi:
      "Menginap di kawasan Dago dengan udara sejuk, dekat factory outlet dan wisata kuliner Bandung.",
    harga: 350_000,
    lokasi: "Bandung, Jawa Barat",
    kategori: "hotel",
    partner: "cendana@vistara.test",
    foto: UNSPLASH("photo-1445019980597-93fa8acb246c"),
  },
  {
    slug: "apartemen-studio-green-valley-dekat-kampus",
    judul: "Apartemen Studio Green Valley dekat Kampus",
    deskripsi:
      "Unit studio full furnished, 5 menit ke kampus, sudah termasuk WiFi dan keamanan 24 jam.",
    harga: 2_500_000,
    lokasi: "Makassar, Sulawesi Selatan",
    kategori: "apartemen",
    partner: "greenvalley@vistara.test",
    foto: UNSPLASH("photo-1560448204-e02f11c3d0e2"),
  },
  {
    slug: "apartemen-green-valley-2br-keluarga",
    judul: "Green Valley Residence - Unit 2BR Keluarga",
    deskripsi:
      "Dua kamar tidur dengan dapur bersih dan balkon. Akses kolam renang dan taman bermain anak.",
    harga: 3_800_000,
    lokasi: "Surabaya, Jawa Timur",
    kategori: "apartemen",
    partner: "greenvalley@vistara.test",
    foto: UNSPLASH("photo-1502672260266-1c1ef2d93688"),
  },
  {
    slug: "apartemen-skyline-tower-1br-city-view",
    judul: "Skyline Tower - 1BR City View",
    deskripsi:
      "Lantai tinggi dengan pemandangan kota, dekat stasiun MRT dan pusat perbelanjaan.",
    harga: 5_000_000,
    lokasi: "Jakarta Selatan, DKI Jakarta",
    kategori: "apartemen",
    partner: "skyline@vistara.test",
    foto: UNSPLASH("photo-1522708323590-d24dbb6b0267"),
  },
  {
    slug: "apartemen-skyline-tower-studio-minimalis",
    judul: "Skyline Tower - Studio Minimalis",
    deskripsi:
      "Unit studio siap huni untuk pekerja muda, sudah termasuk biaya maintenance bulanan.",
    harga: 3_200_000,
    lokasi: "Jakarta Pusat, DKI Jakarta",
    kategori: "apartemen",
    partner: "skyline@vistara.test",
    foto: UNSPLASH("photo-1600585154340-be6161a56a0c"),
  },
  {
    slug: "kopi-senja-cafe-aesthetic-24-jam",
    judul: "Kopi Senja - Cafe Aesthetic 24 Jam",
    deskripsi:
      "Cafe bernuansa hangat yang buka 24 jam, cocok untuk kerja malam. Menu kopi manual brew dan pastry.",
    harga: 15_000,
    lokasi: "Makassar, Sulawesi Selatan",
    kategori: "cafe-restoran",
    partner: "kopisenja@vistara.test",
    jamBuka: "00:00",
    jamTutup: "23:59",
    foto: UNSPLASH("photo-1554118811-1e0d58224f24"),
  },
  {
    slug: "kopi-senja-bandung-rooftop",
    judul: "Kopi Senja Bandung - Rooftop Sunset",
    deskripsi:
      "Rooftop dengan pemandangan matahari terbenam, live music setiap akhir pekan.",
    harga: 25_000,
    lokasi: "Bandung, Jawa Barat",
    kategori: "cafe-restoran",
    partner: "kopisenja@vistara.test",
    jamBuka: "15:00",
    jamTutup: "23:00",
    foto: UNSPLASH("photo-1559925393-8be0ec4767c8"),
  },
  {
    slug: "warung-nusantara-resto-masakan-rumahan",
    judul: "Warung Nusantara - Resto Masakan Rumahan",
    deskripsi:
      "Masakan rumahan khas Nusantara dengan porsi besar. Tersedia ruang keluarga dan area parkir luas.",
    harga: 30_000,
    lokasi: "Surabaya, Jawa Timur",
    kategori: "cafe-restoran",
    partner: "nusantara@vistara.test",
    jamBuka: "09:00",
    jamTutup: "22:00",
    foto: UNSPLASH("photo-1517248135467-4c7edcad34c4"),
  },
];

const BOOKINGS = [
  {
    listingSlug: "hotel-cendana-makassar-kamar-deluxe",
    namaPemesan: "Rizky Ramadhan",
    noHp: "081234567890",
    catatan: "Check-in malam sekitar jam 21.00.",
    status: "PENDING",
  },
  {
    listingSlug: "apartemen-studio-green-valley-dekat-kampus",
    namaPemesan: "Siti Nurhaliza",
    noHp: "085612345678",
    catatan: "Ingin survei unit dulu sebelum sewa.",
    status: "DIHUBUNGI",
  },
  {
    listingSlug: "kopi-senja-cafe-aesthetic-24-jam",
    namaPemesan: "Andi Pratama",
    noHp: "087812345678",
    catatan: "Reservasi 10 orang untuk acara komunitas.",
    status: "SELESAI",
  },
  {
    listingSlug: "apartemen-skyline-tower-1br-city-view",
    namaPemesan: "Dewi Lestari",
    noHp: "081298765432",
    catatan: "Tanya ketersediaan mulai bulan depan.",
    status: "PENDING",
  },
] as const;

const ADMIN_EMAIL = "admin@vistara.test";

type SeedInsight = {
  slug: string;
  judul: string;
  kategori: "FAKTA_MENARIK" | "BERITA" | "TIPS" | "PROMO";
  /** Slug kategori layanan yang dibahas. Kosong berarti konten umum. */
  kategoriSlug?: "hotel" | "apartemen" | "cafe-restoran";
  ringkasan: string;
  konten: string;
  sumber?: string;
  tanggalTerbit: string;
  foto: string;
};

const INSIGHTS: SeedInsight[] = [
  {
    slug: "5-ciri-apartemen-ramah-kerja-remote",
    judul: "5 Ciri Apartemen Ramah untuk Kerja Remote",
    kategori: "TIPS",
    kategoriSlug: "apartemen",
    ringkasan:
      "Internet stabil saja tidak cukup. Ada lima hal lain yang menentukan betah tidaknya Anda bekerja dari apartemen.",
    konten:
      "Bekerja dari apartemen menuntut lebih dari sekadar meja dan kursi. Pertama, pastikan ada jalur internet fiber dengan opsi lebih dari satu provider. Kedua, perhatikan arah jendela — cahaya alami dari sisi timur membuat ruangan terang tanpa panas berlebih di sore hari. Ketiga, cek kedap suara antar unit, terutama jika Anda sering melakukan panggilan video. Keempat, keberadaan area bersama seperti coworking lounge sangat membantu saat butuh suasana berbeda. Kelima, pastikan ada gerai kebutuhan harian dalam radius jalan kaki agar jam istirahat tidak habis di perjalanan.",
    tanggalTerbit: "2026-08-28",
    foto: UNSPLASH("photo-1522708323590-d24dbb6b0267"),
  },
  {
    slug: "tren-cafe-aesthetic-bandung-2026",
    judul: "Tren Cafe Aesthetic yang Lagi Hits di Bandung 2026",
    kategori: "BERITA",
    kategoriSlug: "cafe-restoran",
    ringkasan:
      "Konsep ruang terbuka dengan material kayu daur ulang mendominasi kafe baru di Bandung sepanjang tahun ini.",
    konten:
      "Sepanjang paruh pertama 2026, kafe baru di Bandung bergerak menjauh dari gaya industrial yang sempat mendominasi. Material kayu daur ulang, tanaman gantung, dan bukaan besar tanpa dinding kaca menjadi ciri utama. Pemilik kafe menyebut alasannya sederhana: biaya pendingin ruangan turun drastis dan pengunjung cenderung tinggal lebih lama. Kawasan Dago Atas dan Cigadung menjadi dua titik dengan pertumbuhan tercepat.",
    sumber: "Redaksi Vistara",
    tanggalTerbit: "2026-08-22",
    foto: UNSPLASH("photo-1554118811-1e0d58224f24"),
  },
  {
    slug: "sejarah-singkat-hotel-butik-indonesia",
    judul: "Tahukah Kamu? Ini Sejarah Singkat Hotel Butik di Indonesia",
    kategori: "FAKTA_MENARIK",
    kategoriSlug: "hotel",
    ringkasan:
      "Hotel butik pertama di Indonesia lahir dari rumah kolonial yang dialihfungsikan, bukan dari bangunan baru.",
    konten:
      "Konsep hotel butik masuk ke Indonesia pada akhir 1980-an, dibawa oleh pengelola properti yang mengalihfungsikan rumah-rumah peninggalan kolonial di Bandung dan Yogyakarta. Jumlah kamarnya jarang lebih dari dua puluh, dan justru keterbatasan itu yang menjadi daya tarik: setiap kamar punya tata letak berbeda. Model ini kemudian menyebar ke Bali pada 1990-an dengan sentuhan arsitektur lokal, dan kini menjadi salah satu segmen dengan pertumbuhan tercepat di industri perhotelan nasional.",
    tanggalTerbit: "2026-08-15",
    foto: UNSPLASH("photo-1445019980597-93fa8acb246c"),
  },
  {
    slug: "promo-diskon-20-persen-booking-apartemen",
    judul: "Promo Spesial: Diskon 20% untuk Booking Apartemen Bulan Ini",
    kategori: "PROMO",
    kategoriSlug: "apartemen",
    ringkasan:
      "Berlaku untuk sewa minimal tiga bulan di seluruh unit mitra Vistara, tanpa biaya administrasi tambahan.",
    konten:
      "Selama bulan ini, seluruh unit apartemen dari mitra Vistara mendapat potongan 20 persen untuk kontrak sewa minimal tiga bulan. Promo berlaku otomatis saat Anda mengirim permintaan booking melalui halaman detail listing — tidak perlu kode kupon. Biaya administrasi juga dibebaskan untuk penyewa pertama kali. Syarat dan ketentuan lengkap dapat dilihat pada halaman masing-masing unit.",
    tanggalTerbit: "2026-09-01",
    foto: UNSPLASH("photo-1560448204-e02f11c3d0e2"),
  },
  {
    slug: "cara-membaca-harga-sewa-apartemen-harian",
    judul: "Cara Membaca Harga Sewa Apartemen Harian Tanpa Terkecoh",
    kategori: "TIPS",
    kategoriSlug: "apartemen",
    ringkasan:
      "Harga yang tertera sering belum termasuk listrik, kebersihan, dan deposit. Ini cara menghitung biaya sebenarnya.",
    konten:
      "Angka yang ditampilkan pada iklan sewa harian umumnya adalah harga dasar. Tiga komponen yang kerap terpisah adalah token listrik, biaya kebersihan sekali menginap, dan deposit yang ditahan selama masa sewa. Sebelum menyetujui, minta rincian tertulis dari pemilik unit dan pastikan Anda tahu siapa yang menanggung perbaikan bila ada kerusakan. Untuk sewa di atas satu minggu, banyak pemilik bersedia menegosiasikan biaya kebersihan menjadi sekali di akhir.",
    tanggalTerbit: "2026-08-10",
    foto: UNSPLASH("photo-1502672260266-1c1ef2d93688"),
  },
  {
    slug: "makassar-jadi-tujuan-workation-baru",
    judul: "Makassar Masuk Daftar Tujuan Workation Baru di Indonesia Timur",
    kategori: "BERITA",
    ringkasan:
      "Kombinasi biaya hidup dan akses penerbangan langsung membuat Makassar naik peringkat sebagai kota workation.",
    konten:
      "Makassar mencatat kenaikan jumlah penyewa jangka menengah sepanjang 2026, sebagian besar pekerja jarak jauh dari Jawa. Faktor pendorongnya adalah biaya sewa yang masih di bawah rata-rata kota besar, penerbangan langsung ke sebagian besar ibu kota provinsi, dan bertambahnya ruang kerja bersama di sekitar Panakkukang. Pengelola apartemen mulai menyesuaikan penawaran dengan menyediakan paket sewa satu hingga tiga bulan.",
    sumber: "Redaksi Vistara",
    tanggalTerbit: "2026-07-30",
    foto: UNSPLASH("photo-1518998053901-5348d3961a04"),
  },
  {
    slug: "fakta-kopi-specialty-indonesia",
    judul: "Tahukah Kamu? Indonesia Punya Lebih dari 20 Kopi Specialty Bersertifikat",
    kategori: "FAKTA_MENARIK",
    kategoriSlug: "cafe-restoran",
    ringkasan:
      "Dari Gayo sampai Toraja, tiap daerah punya profil rasa yang diakui secara resmi lewat indikasi geografis.",
    konten:
      "Indikasi geografis adalah tanda hukum yang menyatakan bahwa suatu produk berasal dari daerah tertentu dan punya karakter khas karena faktor alam di sana. Untuk kopi, Indonesia telah mendaftarkan lebih dari dua puluh nama, termasuk Kopi Arabika Gayo, Kopi Arabika Toraja, dan Kopi Robusta Temanggung. Artinya, ketika sebuah kafe menuliskan asal biji pada menu, informasi itu bukan sekadar label pemasaran — ada standar yang menaunginya.",
    tanggalTerbit: "2026-07-18",
    foto: UNSPLASH("photo-1495474472287-4d71bcdd2085"),
  },
  {
    slug: "promo-gratis-satu-malam-hotel-mitra",
    judul: "Promo Akhir Pekan: Menginap 2 Malam, Gratis 1 Malam di Hotel Mitra",
    kategori: "PROMO",
    kategoriSlug: "hotel",
    ringkasan:
      "Berlaku untuk check-in Jumat sampai Minggu di hotel mitra Vistara wilayah Makassar dan Surabaya.",
    konten:
      "Paket akhir pekan ini berlaku untuk pemesanan dengan check-in pada Jumat hingga Minggu. Setelah dua malam berbayar, malam ketiga diberikan gratis pada properti yang sama. Penawaran hanya berlaku di hotel mitra wilayah Makassar dan Surabaya, dan tidak dapat digabungkan dengan promo lain. Kirim permintaan booking melalui halaman detail hotel, lalu sebutkan paket akhir pekan pada kolom keperluan.",
    tanggalTerbit: "2026-09-04",
    foto: UNSPLASH("photo-1551882547-ff40c63fe5fa"),
  },
  {
    slug: "checklist-sebelum-check-in-hotel",
    judul: "Checklist Sebelum Check-in Hotel: 6 Hal yang Sering Terlewat",
    kategori: "TIPS",
    kategoriSlug: "hotel",
    ringkasan:
      "Dari jam check-out sampai kebijakan deposit, enam hal ini sebaiknya dipastikan sebelum Anda tiba.",
    konten:
      "Sebagian besar keluhan tamu hotel berawal dari hal yang sebenarnya bisa ditanyakan sebelum berangkat. Pastikan jam check-in dan check-out, karena selisih satu jam saja bisa berarti biaya tambahan satu malam. Tanyakan apakah deposit ditahan tunai atau lewat kartu, dan berapa lama pengembaliannya. Konfirmasi apakah sarapan sudah termasuk dan sampai pukul berapa disajikan. Cek kebijakan pembatalan, ketersediaan parkir, serta apakah ada biaya layanan yang belum tercantum pada harga awal.",
    tanggalTerbit: "2026-08-06",
    foto: UNSPLASH("photo-1566073771259-6a8506099945"),
  },
  {
    slug: "cafe-24-jam-diminati-pekerja-shift",
    judul: "Cafe Buka 24 Jam Makin Diminati Pekerja Shift Malam",
    kategori: "BERITA",
    kategoriSlug: "cafe-restoran",
    ringkasan:
      "Permintaan ruang kerja alternatif di luar jam kantor mendorong kafe memperpanjang jam operasional.",
    konten:
      "Kafe dengan jam operasional penuh mulai bertambah di kota-kota besar sepanjang 2026. Pendorong utamanya adalah pekerja dengan jadwal mengikuti zona waktu lain, yang membutuhkan tempat kerja di luar jam kantor. Pengelola menyebut jam sibuk baru muncul pada pukul sepuluh malam hingga dua dini hari. Sebagai penyesuaian, sebagian kafe mengubah tata letak dengan menambah stopkontak dan meja tunggal, serta menyediakan menu ringan porsi kecil.",
    sumber: "Redaksi Vistara",
    tanggalTerbit: "2026-07-25",
    foto: UNSPLASH("photo-1521017432531-fbd92d768814"),
  },
  {
    slug: "panduan-memilih-lokasi-hunian-dekat-transportasi",
    judul: "Panduan Memilih Lokasi Hunian Dekat Transportasi Umum",
    kategori: "TIPS",
    ringkasan:
      "Jarak ke halte bukan satu-satunya ukuran. Perhatikan juga frekuensi armada dan jalur pejalan kaki.",
    konten:
      "Banyak iklan hunian menuliskan jarak ke stasiun atau halte dalam satuan meter, padahal angka itu belum menggambarkan pengalaman harian. Yang lebih menentukan adalah frekuensi armada pada jam sibuk, ketersediaan trotoar yang aman, dan apakah rute tersebut terhubung langsung ke tujuan Anda atau perlu berpindah moda. Cobalah menempuh rute itu sekali pada jam berangkat kerja sebelum memutuskan — sepuluh menit di peta bisa terasa jauh berbeda di lapangan.",
    tanggalTerbit: "2026-07-12",
    foto: UNSPLASH("photo-1544620347-c4fd4a3d5957"),
  },
  {
    slug: "promo-pengguna-baru-potongan-booking-pertama",
    judul: "Promo Pengguna Baru: Potongan Biaya Booking Pertama",
    kategori: "PROMO",
    ringkasan:
      "Berlaku sekali untuk setiap pengguna baru, di seluruh kategori aktif Vistara.",
    konten:
      "Pengguna yang mengirim permintaan booking pertama kalinya melalui Vistara mendapat potongan biaya layanan, berlaku di seluruh kategori aktif — hotel, apartemen, maupun cafe dan restoran. Potongan diterapkan otomatis saat mitra mengonfirmasi permintaan Anda. Penawaran berlaku sekali per pengguna dan tidak dapat dipindahtangankan.",
    tanggalTerbit: "2026-09-05",
    foto: UNSPLASH("photo-1607083206869-4c7672e72a8a"),
  },
];

async function seedInitialData() {
  await prisma.category.createMany({ data: [...CATEGORIES] });
  const categories = await prisma.category.findMany();
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  const partnerByEmail = new Map<string, string>();
  for (const p of PARTNERS) {
    const partner = await prisma.partner.create({
      data: {
        namaUsaha: p.namaUsaha,
        deskripsi: `${p.namaUsaha} adalah mitra resmi Vistara.`,
        statusVerifikasi: "APPROVED",
        user: {
          create: {
            email: p.email,
            // Placeholder — auth belum diimplementasikan, bukan hash asli.
            passwordHash: "seed-placeholder",
            role: "PARTNER",
          },
        },
      },
    });
    partnerByEmail.set(p.email, partner.id);
  }

  const listingIdBySlug = new Map<string, string>();
  for (const l of LISTINGS) {
    const categoryId = categoryBySlug.get(l.kategori);
    const partnerId = partnerByEmail.get(l.partner);
    if (!categoryId || !partnerId) throw new Error(`Relasi tidak ditemukan untuk ${l.slug}`);

    const listing = await prisma.listing.create({
      data: {
        slug: l.slug,
        judul: l.judul,
        deskripsi: l.deskripsi,
        harga: l.harga,
        lokasi: l.lokasi,
        jamBuka: l.jamBuka ?? null,
        jamTutup: l.jamTutup ?? null,
        status: "PUBLISHED",
        categoryId,
        partnerId,
        images: { create: [{ url: l.foto, urutan: 0 }] },
      },
    });
    listingIdBySlug.set(l.slug, listing.id);
  }

  for (const b of BOOKINGS) {
    const listingId = listingIdBySlug.get(b.listingSlug);
    if (!listingId) throw new Error(`Listing tidak ditemukan: ${b.listingSlug}`);

    await prisma.booking.create({
      data: {
        listingId,
        namaPemesan: b.namaPemesan,
        noHp: b.noHp,
        catatan: b.catatan,
        status: b.status,
      },
    });
  }

  const admin = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      // Placeholder — auth belum diimplementasikan, bukan hash asli.
      passwordHash: "seed-placeholder",
      role: "ADMIN",
    },
  });

  await prisma.insight.createMany({
    data: INSIGHTS.map((i) => ({
      slug: i.slug,
      judul: i.judul,
      kategori: i.kategori,
      gambarUrl: i.foto,
      ringkasan: i.ringkasan,
      konten: i.konten,
      sumber: i.sumber ?? null,
      tanggalTerbit: new Date(i.tanggalTerbit),
      aktif: true,
      dibuatOlehId: admin.id,
      kategoriTerkaitId: i.kategoriSlug ? (categoryBySlug.get(i.kategoriSlug) ?? null) : null,
      isDummy: true,
    })),
  });

  console.log(
    `Seed selesai: ${CATEGORIES.length} kategori, ${PARTNERS.length} mitra, ${LISTINGS.length} listing, ${BOOKINGS.length} booking, ${INSIGHTS.length} insight.`,
  );
}

const ARTICLES = [
  { slug: "promo-staycation-september", judul: "Program Booking Hotel Mitra Vistara Bulan Ini", tipe: "PROMO", ringkasan: "Contoh promo: kolaborasi hotel dan kreator untuk memperkenalkan pengalaman menginap. Diskon, periode, serta ketersediaan belum berlaku dan perlu konfirmasi mitra.", foto: "photo-1566073771259-6a8506099945" },
  { slug: "fakta-danau-dan-pegunungan", judul: "Video Pendek Bisa Memperlihatkan Pengalaman, Bukan Sekadar Kamar", tipe: "FAKTA_MENARIK", ringkasan: "Contoh editorial: room tour dapat menunjukkan alur ruang dan suasana hotel yang sulit dirangkum dalam satu foto. Dampaknya pada booking perlu diukur, bukan diasumsikan.", foto: "photo-1492691527719-9d1e07e534b4" },
  { slug: "tips-memilih-penginapan", judul: "5 Tips Memilih Content Creator untuk Brand Properti Anda", tipe: "TIPS", ringkasan: "Kenali profil audiens, pelajari portofolio, cek kualitas interaksi, sepakati brief, lalu tentukan ukuran keberhasilan. Panduan contoh untuk memulai kolaborasi properti yang terarah.", foto: "photo-1522071820081-009f0129c71c" },
  { slug: "berita-ruang-kreatif-kota", judul: "Ruang Kolaborasi: Mempertemukan Kreator Makassar dan Brand", tipe: "BERITA", ringkasan: "Simulasi liputan Vistara Media Indonesia tentang diskusi antara kreator lokal dan pelaku usaha. Agenda dan peserta dalam tema ini belum merupakan acara yang diumumkan.", foto: "photo-1524758631624-e2822e304c36" },
  { slug: "promo-jelajah-kuliner", judul: "Kolaborasi Konten Kuliner untuk Cafe dan Restoran", tipe: "PROMO", ringkasan: "Contoh promo: konsep produksi konten menu, suasana ruang, dan cerita pemilik usaha kuliner. Paket serta ketentuan kolaborasi akan dikonfirmasi sebelum penawaran diterbitkan.", foto: "photo-1554118811-1e0d58224f24" },
  { slug: "fakta-kopi-nusantara", judul: "Cerita di Balik Kopi Bisa Menjadi Identitas Konten Cafe", tipe: "FAKTA_MENARIK", ringkasan: "Contoh editorial: asal biji, proses seduh, dan cara penyajian memberi sudut cerita yang berbeda. Detail yang nyata membantu konten kuliner terasa khas tanpa klaim berlebihan.", foto: "photo-1442512595331-e89e73853f31" },
  { slug: "tips-apartemen-nyaman", judul: "Cara Membuat Room Tour Apartemen yang Informatif", tipe: "TIPS", ringkasan: "Mulai dari tata ruang, tunjukkan ukuran dengan konteks, gunakan cahaya alami, dan sebutkan fasilitas secara akurat. Panduan contoh untuk konten pemasaran apartemen.", foto: "photo-1522708323590-d24dbb6b0267" },
  { slug: "berita-jelajah-lokal-vistara", judul: "Mengenal Arah Layanan Vistara Media Indonesia", tipe: "BERITA", ringkasan: "Contoh berita profil: pemasaran properti, content creator management, affiliate marketing, dan konten kuliner dalam satu arah kreatif. Bukan pengumuman peluncuran layanan baru.", foto: "photo-1497366754035-f200968a6e72" },
  { slug: "promo-kreator-umkm", judul: "Program Kolaborasi Content Creator untuk UMKM", tipe: "PROMO", ringkasan: "Contoh promo: ide kolaborasi untuk membantu UMKM menyusun cerita produk bersama kreator. Biaya, jadwal, dan ruang lingkup belum ditetapkan sebagai penawaran resmi.", foto: "photo-1552664730-d307ca884978" },
  { slug: "fakta-kreator-lokal-brand", judul: "Kreator Lokal Membawa Konteks yang Dekat dengan Audiens", tipe: "FAKTA_MENARIK", ringkasan: "Contoh editorial: bahasa, kebiasaan, dan pengetahuan tempat memberi kreator lokal sudut pandang tersendiri. Kecocokan audiens tetap lebih penting daripada lokasi kreator semata.", foto: "photo-1519389950473-47ba0277781c" },
  { slug: "tips-konten-kuliner", judul: "Cara Membuat Konten Kuliner yang Menarik Perhatian Audiens", tipe: "TIPS", ringkasan: "Perlihatkan tekstur makanan, rekam proses penyajian, dan ceritakan rasa dengan spesifik. Panduan contoh ini mengutamakan visual jujur serta informasi menu yang jelas.", foto: "photo-1414235077428-338989a2e8c0" },
  { slug: "berita-affiliate-properti-2026", judul: "Affiliate Marketing Properti 2026: Transparansi Jadi Bahasan", tipe: "BERITA", ringkasan: "Simulasi agenda editorial tentang tautan afiliasi, atribusi booking, dan keterbukaan komisi. Materi diskusi untuk brand properti, bukan laporan riset atau proyeksi pasar.", foto: "photo-1516321318423-f06f85e504b3" },
  { slug: "promo-produksi-konten-hotel", judul: "Sesi Produksi Konten untuk Cerita Hotel Anda", tipe: "PROMO", ringkasan: "Contoh promo: rancangan sesi foto dan video yang mengangkat kamar, fasilitas, serta pengalaman tamu. Ketersediaan produksi dan rincian paket harus dikonfirmasi lebih dahulu.", foto: "photo-1611892440504-42a792e24d32" },
  { slug: "fakta-affiliate-transparan", judul: "Tautan Afiliasi dan Konten Sponsor Bukan Hal yang Sama", tipe: "FAKTA_MENARIK", ringkasan: "Contoh editorial: afiliasi biasanya terkait hasil yang terlacak, sementara sponsor mengikuti kesepakatan kerja sama. Keduanya perlu disampaikan dengan jelas kepada audiens.", foto: "photo-1556742049-0cfed4f6a45d" },
  { slug: "tips-brief-kolaborasi-brand", judul: "Brief Kolaborasi yang Jelas, Ruang Kreatif yang Tetap Luas", tipe: "TIPS", ringkasan: "Tuliskan tujuan, pesan utama, batas klaim, hasil kerja, hak penggunaan, dan jadwal. Panduan contoh untuk menyatukan ekspektasi brand dengan cara bercerita kreator.", foto: "photo-1455390582262-044cdead277a" },
  { slug: "berita-diskusi-konten-kuliner", judul: "Dari Dapur ke Layar: Percakapan Brand Kuliner dan Kreator", tipe: "BERITA", ringkasan: "Simulasi liputan diskusi tentang pengambilan gambar makanan, izin produksi, dan penyampaian ulasan. Tema ini merupakan materi contoh, bukan dokumentasi acara yang telah berlangsung.", foto: "photo-1517248135467-4c7edcad34c4" },
  { slug: "promo-konten-apartemen", judul: "Konsep Kampanye Kreatif untuk Apartemen Mitra", tipe: "PROMO", ringkasan: "Contoh promo: rangkaian room tour dan cerita lingkungan untuk memperkenalkan apartemen. Tidak mencakup diskon sewa atau jaminan hasil; ketentuan menunggu kesepakatan mitra.", foto: "photo-1560448204-e02f11c3d0e2" },
  { slug: "fakta-metrik-konten", judul: "Jumlah Tayangan Tidak Sama dengan Jumlah Calon Pelanggan", tipe: "FAKTA_MENARIK", ringkasan: "Contoh editorial: tayangan, klik, pertanyaan, dan booking menggambarkan tindakan yang berbeda. Memilih metrik sesuai tujuan membantu brand membaca hasil konten dengan lebih tepat.", foto: "photo-1515378791036-0648a3ef77b2" },
  { slug: "tips-kalender-konten-properti", judul: "Menyusun Kalender Konten Properti yang Berkelanjutan", tipe: "TIPS", ringkasan: "Seimbangkan informasi fasilitas, cerita sekitar, jawaban pertanyaan tamu, dan kolaborasi kreator. Panduan contoh untuk membangun ritme publikasi yang realistis bagi tim.", foto: "photo-1432888622747-4eb9a8efeb07" },
  { slug: "berita-create-connect-grow", judul: "Create, Connect, Grow: Arah Cerita di Sorotan Vistara", tipe: "BERITA", ringkasan: "Contoh kabar redaksi: ruang editorial untuk mempertemukan gagasan kreatif dan kebutuhan brand properti. Seluruh artikel dalam koleksi awal ini adalah materi demonstrasi.", foto: "photo-1522071820081-009f0129c71c" },
] as const;

const CREATORS = [
  { id: "demo-creator-nadia", nama: "Nadia Prameswari", niche: "Lifestyle & Travel", followers: 125_000, platform_utama: "Instagram", foto: "photo-1534528741775-53994a69daeb", bio: "Menceritakan perjalanan kota dan pengalaman menginap melalui foto serta video pendek yang hangat." },
  { id: "demo-creator-raka", nama: "Raka Adiputra", niche: "Food & Kuliner", followers: 240_000, platform_utama: "TikTok", foto: "photo-1500648767791-00dcc994a43e", bio: "Mengangkat cerita di balik menu, dari dapur usaha rumahan hingga cafe lokal." },
  { id: "demo-creator-ayu", nama: "Ayu Lestari", niche: "Properti", followers: 68_000, platform_utama: "YouTube", foto: "photo-1580489944761-15a19d654956", bio: "Menyajikan room tour apartemen dan hotel dengan perhatian pada fungsi ruang dan detail fasilitas." },
  { id: "demo-creator-dimas", nama: "Dimas Pratama", niche: "Fashion", followers: 92_000, platform_utama: "Instagram", foto: "photo-1506794778202-cad84cf45f1d", bio: "Merangkai gaya sehari-hari dan cerita label lokal melalui editorial foto yang sederhana." },
  { id: "demo-creator-salsabila", nama: "Salsabila Putri", niche: "Lifestyle & Travel", followers: 480_000, platform_utama: "TikTok", foto: "photo-1524504388940-b1c1722653e1", bio: "Berbagi keseharian, destinasi kota, dan ide perjalanan akhir pekan lewat video bercerita." },
  { id: "demo-creator-fajar", nama: "Fajar Ramadhan", niche: "Food & Kuliner", followers: 18_000, platform_utama: "Instagram", foto: "photo-1517841905240-472988babdf9", bio: "Mendokumentasikan proses seduh kopi, menu musiman, dan orang-orang di balik usaha kuliner." },
  { id: "demo-creator-intan", nama: "Intan Permata", niche: "Properti", followers: 156_000, platform_utama: "Instagram", foto: "photo-1531123897727-8f129e1688ce", bio: "Menghubungkan cerita hunian dengan kebutuhan audiens melalui konten interior dan tur properti." },
  { id: "demo-creator-bagas", nama: "Bagas Mahendra", niche: "Fashion", followers: 315_000, platform_utama: "YouTube", foto: "photo-1506794778202-cad84cf45f1d", bio: "Membahas padu padan, detail material, dan proses kreatif di balik koleksi brand lokal." },
] as const;

async function main() {
  const existing = await Promise.all([
    prisma.category.count(), prisma.user.count(), prisma.partner.count(),
    prisma.listing.count(), prisma.booking.count(), prisma.insight.count(),
  ]);
  if (existing.every(count => count === 0)) await seedInitialData();
  else console.log("Data existing dipertahankan; seed data awal dilewati.");

  await prisma.$transaction(ARTICLES.map((article, index) => {
    const data = {
      slug: article.slug, judul: article.judul, tipe: article.tipe,
      ringkasan: article.ringkasan, gambar_url: UNSPLASH(article.foto),
      published_at: new Date(Date.UTC(2026, 8, 9 - index, 0)),
    };
    return prisma.article.upsert({ where: { slug: article.slug }, update: data, create: data });
  }));
  console.log(`Seed Article selesai: ${ARTICLES.length} artikel, tanpa menghapus data existing.`);
  await prisma.$transaction(CREATORS.map(({ foto, ...creator }) => {
    const data = { ...creator, foto_url: UNSPLASH(foto), bio: `Profil fiktif untuk demonstrasi. ${creator.bio}` };
    return prisma.creator.upsert({ where: { id: creator.id }, update: data, create: data });
  }));
  console.log(`Seed Creator selesai: ${CREATORS.length} profil contoh, tanpa menghapus data existing.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
