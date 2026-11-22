import fs from "fs";
import path from "path";
import { prisma } from "../lib/prisma";

const schema = fs.readFileSync("prisma/schema.prisma", "utf8");
const models = [...schema.matchAll(/^model\s+(\w+)\s*{/gm)].map((m) => m[1]);

async function main() {
  const out: Record<string, unknown[]> = {};

  for (const name of models) {
    const key = name.charAt(0).toLowerCase() + name.slice(1);
    // @ts-expect-error دسترسی پویا به مدل
    out[name] = await prisma[key].findMany();
    console.log(`${name}: ${out[name].length} رکورد`);
  }

  const dir = path.resolve("..", "db-backups");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(
    dir,
    `backup-${new Date().toISOString().slice(0, 10)}.json`
  );
  fs.writeFileSync(
    file,
    JSON.stringify(out, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)
  );
  console.log("ذخیره شد:", file);
}

main().finally(() => prisma.$disconnect());