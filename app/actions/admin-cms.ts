"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { categories, industries, serviceCategories } from "@/lib/cms-fields";
const slugSchema = z.string().min(1).max(150).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const imageSchema = z.string().refine(v => /^\/(?!\/)[a-zA-Z0-9_./% -]+$/.test(v) && !v.includes(".."));
export async function saveCms(kind: string, id: string, form: FormData) {
 if (!(await requireAdmin())) return {success:false,error:"دسترسی ندارید"};
 const t = (key:string) => String(form.get(key) ?? "").trim();
 const n = (key:string) => t(key) ? z.coerce.number().int().min(0).max(2147483647).parse(t(key)) : null;
 const b = (key:string) => form.get(key) === "on";
 try {
  const slug = slugSchema.parse(t("slug"));
  const title = z.string().min(1).max(300).parse(t("title"));
  if (kind === "articles") {
   const data = {slug,title,excerpt:z.string().min(1).max(2000).parse(t("excerpt")),content:z.string().min(1).max(150000).parse(t("content")),coverImage:t("coverImage") ? imageSchema.parse(t("coverImage")) : null,published:b("published")};
   if(id) {const old=await prisma.article.findUniqueOrThrow({where:{id}}); await prisma.article.update({where:{id},data:{...data,...(!old.published && data.published ? {publishedAt:new Date()} : {})}}); revalidatePath(`/articles/${old.slug}`);}
   else await prisma.article.create({data});
   revalidatePath("/articles"); revalidatePath(`/articles/${slug}`);
  } else if(kind === "products" || kind === "services") {
   const category = z.enum(categories).parse(t("category"));
   if ((kind === "services") !== serviceCategories.some(c=>c===category)) throw new Error("category");
   const images = z.array(imageSchema).parse(t("images").split(/\r?\n/).map(s=>s.trim()).filter(Boolean));
   const data = {slug,name:title,category,description:t("description")||null,subCategory:t("subCategory")||null,capacityKg:n("capacityKg"),powerKw:n("powerKw"),frequencyHz:n("frequencyHz"),images,featured:b("featured"),order:n("order")??0};
   // Preserve existing technical JSON unless explicitly edited.
   const components = t("components") ? z.array(z.object({title:z.string(),description:z.string()})).parse(JSON.parse(t("components"))) : undefined;
   const variants = t("variants") ? z.array(z.record(z.string(),z.json())).parse(JSON.parse(t("variants"))) : undefined;
   const values={...data, ...(components!==undefined?{components}:{}), ...(variants!==undefined?{variants}:{})};
   if(id){const old=await prisma.product.findUniqueOrThrow({where:{id}}); if((kind === "services") !== serviceCategories.some(c=>c===old.category)) throw new Error("category"); await prisma.product.update({where:{id},data:values}); for(const route of ["products","services"]) revalidatePath(`/${route}/${old.slug}`,"layout");}
   else await prisma.product.create({data:values});
   for(const route of ["products","services"]) {revalidatePath(`/${route}`);revalidatePath(`/${route}/${slug}`,"layout");}
  } else if(kind === "projects") {
   const video=t("videoUrl");
   if(video && !/^https:\/\/[^\s]+$/.test(video) && !/^\/(?!\/)[^\s]+$/.test(video)) throw new Error("video");
   const data={slug,title,industry:z.enum(industries).parse(t("industry")),capacityKg:n("capacityKg")??0,image:imageSchema.parse(t("image")),videoUrl:video||null,featured:b("featured"),order:n("order")??0,completedAt:t("completedAt")?z.coerce.date().parse(t("completedAt")):null};
   if(id) await prisma.project.update({where:{id},data}); else await prisma.project.create({data});
   revalidatePath("/projects");
  } else return {success:false,error:"بخش نامعتبر"};
  revalidatePath("/"); revalidatePath("/sitemap.xml"); revalidatePath("/admin"); revalidatePath(`/admin/${kind}`);
  return {success:true};
 } catch(error){console.error("CMS save failed",error);return {success:false,error:"ذخیره انجام نشد؛ فیلدها، مسیر تصاویر، JSON و یکتا بودن slug را بررسی کنید."};}
}
