import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

// Montserrat dipakai khusus wordmark, sesuai spesifikasi logo Vistara.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Properti dan kreator`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const kategori = await prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { nama: "asc" },
    select: { slug: true, nama: true },
  });

  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#0A66C2" height={3} showSpinner={false} crawlSpeed={180} zIndex={200} />
        <Navbar kategori={kategori} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
