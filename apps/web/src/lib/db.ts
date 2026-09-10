import { createPrismaClient } from "@vistara/database";

export const prisma = createPrismaClient(process.env.DATABASE_URL);
export type * from "@vistara/database";
