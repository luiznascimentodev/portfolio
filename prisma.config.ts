// Prisma 7 config — configura conexão para Migrate e Studio
import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Em produção (Neon.tech), use a URL "direct" (sem pgBouncer) para migrations
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"]!,
  },
});
