import { PrismaClient } from "@prisma/client";

// Singleton para evitar múltiplas instâncias em desenvolvimento (hot-reload)
// Prisma 7: lê DATABASE_URL do ambiente automaticamente (sem passar no constructor)
// https://pris.ly/d/prisma7-client-config

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
