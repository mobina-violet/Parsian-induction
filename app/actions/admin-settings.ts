"use server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { pageFields,contactFields } from "@/lib/cms-public-fields";
import { revalidatePath } from "next/cache";
export async function saveSettings(group:string,form:FormData){
 if(!await requireAdmin())return {success:false,error:"دسترسی غیرمجاز"};
 const fields=group==="pages"?pageFields:group==="settings"?contactFields:null;
 if(!fields)return {success:false,error:"بخش نامعتبر"};
 try{const entries=Object.keys(fields).map(key=>{const value=String(form.get(key)??"").trim();if(!value||value.length>2000)throw new Error("invalid");if(/Image$/.test(key)&&!/^(\/api\/media\/[0-9a-f-]{36}|\/images\/[\w\-\/.]+\.(webp|jpe?g|png))$/i.test(value))throw new Error("image");if(key==="phone"&&!/^09\d{9}$/.test(value))throw new Error("phone");if(key==="whatsapp"&&!/^\d{10,15}$/.test(value))throw new Error("whatsapp");if(key==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))throw new Error("email");if(key==="instagram"&&!/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/.test(value))throw new Error("instagram");return {key,value};});
 await prisma.$transaction(entries.map(({key,value})=>prisma.$executeRaw`INSERT INTO cms_public_settings(key,value) VALUES (${key},${value}) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value`));revalidatePath("/","layout");return {success:true};
 }catch(e){console.error("Settings save failed",e);return {success:false,error:"ذخیره ناموفق؛ مقادیر و اتصال دیتابیس را بررسی کنید."};}
}
