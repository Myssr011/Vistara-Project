import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Connection string diteruskan eksplisit karena tiap app membaca env dengan cara
 * berbeda (Next: process.env, SvelteKit: $env/dynamic/private).
 */
export function createPrismaClient(connectionString: string | undefined): PrismaClient {
  if (!connectionString) throw new Error("DATABASE_URL belum di-set");

  const client =
    globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;

  return client;
}

export * from "../generated/prisma/client.ts";
