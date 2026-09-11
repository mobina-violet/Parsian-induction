import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",   // یا هر دستوری که داری
  },
  datasource: {
    url: env("DIRECT_URL"),   // ← این خیلی مهمه
  },
});