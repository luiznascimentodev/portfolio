/**
 * Seed script — cria o usuário admin inicial
 *
 * Uso: npm run db:seed
 *
 * ⚠️  Altere ADMIN_EMAIL e ADMIN_PASSWORD no .env.local antes de rodar.
 */

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Prisma 7: driver adapter obrigatório com prisma.config.ts
// DATABASE_URL carregada pelo tsx --env-file .env.local
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@exemplo.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

async function main() {
  console.log("🌱 Iniciando seed...");

  const existingUser = await db.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingUser) {
    console.log(`⚠️  Usuário ${ADMIN_EMAIL} já existe. Pulando criação.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const user = await db.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
    },
  });

  console.log(`✅ Usuário admin criado: ${user.email}`);
  console.log("⚠️  Lembre-se de alterar a senha após o primeiro acesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
