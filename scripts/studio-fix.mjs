import 'dotenv/config';
import { spawnSync } from 'node:child_process';

const raw = process.env.DATABASE_URL;

if (!raw) {
  console.error('❌ DATABASE_URL توی .env پیدا نشد.');
  process.exit(1);
}

// Prisma Studio با uselibpqcompat=true مشکل داره، پس حذفش می‌کنیم
// (فقط برای اجرای Studio؛ .env اصلی دست‌نخورده می‌مونه)
const cleaned = raw
  .replace(/([?&])uselibpqcompat=true&/, '$1')
  .replace(/[?&]uselibpqcompat=true$/, '');

console.log('در حال اجرای Prisma Studio با connection string تمیز‌شده...');

const result = spawnSync('npx', ['prisma', 'studio', '--url', cleaned], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 0);