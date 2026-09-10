import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // @vistara/database mengekspor TypeScript mentah, jadi harus ikut di-transpile
  transpilePackages: ["@vistara/database"],
  serverExternalPackages: ["@prisma/client"],
  // Repo sudah punya AGENTS.md sendiri di root, jangan di-generate ulang per app.
  agentRules: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
