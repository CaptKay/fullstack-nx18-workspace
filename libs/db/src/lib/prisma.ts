import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['error', 'warn'],
})

const nodeEnv = process.env['NODE_ENV']

if (nodeEnv !== 'production'){
    globalForPrisma.prisma = prisma
}