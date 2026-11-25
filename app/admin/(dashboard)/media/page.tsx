import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
export const dynamic="force-dynamic";
async function walk(dir:string,prefix:string):Promise<string[]> {const entries=await readdir(dir,{withFileTypes:true});const result=await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name),`${prefix}/${e.name}`):e.isFile()&&/\.(webp|png|jpe?g|avif)$/i.test(e.name)?[`${prefix}/${e.name}`]:[]));return result.flat();}
export default async function Page(){if(!(await requireAdmin()))redirect("/admin/login");let images:string[]=[];try{images=await walk(path.join(process.cwd(),"public"),"");}catch{ /* deployment may omit public files from function */ }return <div className="space-y-4"><h1 className="text-xl font-bold">کتابخانه تصاویر</h1><p className="text-sm text-slate-500">مسیر تصویر موجود را کپی و در فرم محصول یا مقاله وارد کنید. آپلود دائمی پس از انتخاب فضای ذخیره‌سازی اضافه می‌شود.</p>{!images.length&&<p>تصویری در فایل‌های قابل دسترسی سرور یافت نشد.</p>}<div className="grid grid-cols-2 gap-3 md:grid-cols-3">{images.map(src=><div key={src} className="overflow-hidden rounded-xl border bg-white p-2"><div className="relative aspect-video"><Image src={src} alt="" fill sizes="200px" className="object-contain"/></div><input readOnly dir="ltr" defaultValue={src} className="mt-2 w-full rounded border p-1 text-xs"/></div>)}</div></div>}
