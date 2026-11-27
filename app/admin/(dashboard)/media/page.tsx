import { requireAdmin } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { listMedia } from '@/lib/cms-media';
import { MediaUpload } from '@/components/admin/MediaUpload';
export const dynamic='force-dynamic';
export default async function Page(){if(!await requireAdmin())redirect('/admin/login');const rows=await listMedia();return <div className="space-y-4"><h1 className="text-xl font-bold">تصاویر آپلودشده</h1><MediaUpload/><p className="text-sm">برای مشاهده تصاویر جدید صفحه را تازه‌سازی کنید. تصاویر قبلی سایت همچنان در مسیرهای اصلی خود باقی می‌مانند.</p><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{rows.map(r=><div key={r.id} className="rounded-xl border bg-white p-3"><img loading="lazy" src={`/api/media/${r.id}`} alt={r.name} className="aspect-video w-full object-contain"/><p className="truncate text-xs">{r.name}</p><input readOnly dir="ltr" value={`/api/media/${r.id}`} className="w-full rounded border p-1 text-xs"/></div>)}</div></div>}
