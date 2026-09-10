import { env } from '$env/dynamic/private';
import { createPrismaClient } from '@vistara/database';

export const prisma = createPrismaClient(env.DATABASE_URL);
