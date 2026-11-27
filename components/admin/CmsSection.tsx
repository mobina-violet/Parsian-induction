import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { categories, industries, serviceCategories } from "@/lib/cms-fields";
import { CmsForm, type Field } from "./CmsForm";
type Kind="articles"|"products"|"services"|"projects";
const labels={articles:"مقالات",products:"محصولات",services:"قطعات و خدمات",projects:"پروژه‌ها"};
const isService=(category:string)=>serviceCategories.some(c=>c===category);
export async function CmsSection({kind,edit}:{kind:Kind;edit?:string}) {
 if(!(await requireAdmin())) redirect("/admin/login");
 const rows=kind==="articles"?await prisma.article.findMany({orderBy:{updatedAt:"desc"},select:{id:true,title:true,slug:true,published:true}}):kind==="projects"?await prisma.project.findMany({orderBy:{order:"asc"},select:{id:true,title:true,slug:true}}):(await prisma.product.findMany({orderBy:{order:"asc"},select:{id:true,name:true,slug:true,category:true}})).filter(p=>isService(p.category)===(kind==="services")).map(p=>({...p,title:p.name}));
 const id=edit&&edit!=="new"?edit:"";
 if(id&&!rows.some(r=>r.id===id)) notFound();
 const fields:Field[]=[];
 if(edit){
  const a=kind==="articles"&&id?await prisma.article.findUniqueOrThrow({where:{id}}):null;
  const p=(kind==="products"||kind==="services")&&id?await prisma.product.findUniqueOrThrow({where:{id}}):null;
  const j=kind==="projects"&&id?await prisma.project.findUniqueOrThrow({where:{id}}):null;
  const add=(name:string,label:string,value:unknown,type?:Field["type"],options?:readonly string[],required=false)=>fields.push({name,label,value:typeof value==="boolean"?value:String(value??""),type,options,required});
  add("title","عنوان",a?.title??p?.name??j?.title,undefined,undefined,true);add("slug","شناسه URL انگلیسی",a?.slug??p?.slug??j?.slug,id?"hidden":undefined,undefined,true);
  if(kind==="articles"){add("excerpt","خلاصه و توضیح SEO",a?.excerpt,"textarea",undefined,true);add("content","متن مقاله (فرمت فعلی Markdown)",a?.content,"textarea",undefined,true);add("coverImage","مسیر تصویر کاور",a?.coverImage);add("published","انتشار عمومی",a?.published??false,"checkbox");}
  else if(kind==="projects"){add("industry","صنعت",j?.industry,"select",industries);add("capacityKg","ظرفیت کیلوگرم",j?.capacityKg??0,"number");add("image","مسیر تصویر",j?.image,undefined,undefined,true);add("videoUrl","آدرس ویدیو",j?.videoUrl);add("completedAt","تاریخ تکمیل",j?.completedAt?.toISOString().slice(0,10),"date");add("featured","ویژه",j?.featured??false,"checkbox");add("order","ترتیب",j?.order??0,"number");}
  else {add("category","دسته‌بندی",p?.category??(kind==="services"?serviceCategories[0]:categories[0]),"select",kind==="services"?serviceCategories:categories.filter(c=>!isService(c)));add("subCategory","زیر دسته",p?.subCategory);add("description","توضیحات",p?.description,"textarea");add("images","مسیر تصاویر (هر خط یک مسیر)",p?.images.join("\n"),"textarea");add("capacityKg","ظرفیت کیلوگرم",p?.capacityKg,"number");add("powerKw","توان کیلووات",p?.powerKw,"number");add("frequencyHz","فرکانس هرتز",p?.frequencyHz,"number");add("featured","ویژه",p?.featured??false,"checkbox");add("order","ترتیب",p?.order??0,"number");}
 }
 return <div className="space-y-5"><div className="flex items-center justify-between"><h1 className="text-xl font-bold text-slate-900">مدیریت {labels[kind]}</h1><Link className="rounded-xl bg-orange-600 px-4 py-2 text-sm text-white" href={`/admin/${kind}${edit?"":"?edit=new"}`}>{edit?"بازگشت":"افزودن"}</Link></div>{edit?<section className="rounded-2xl border border-gray-100 bg-white p-5"><CmsForm key={edit} kind={kind} id={id} fields={fields}/></section>:<div className="space-y-2">{rows.map(r=><div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4"><div><p className="font-medium text-slate-900">{r.title}</p><p dir="ltr" className="text-xs text-gray-500">{r.slug}</p>{"published" in r&&<p className="text-xs text-gray-500">{r.published?"منتشر شده":"پیش‌نویس"}</p>}</div><Link className="text-sm text-orange-600" href={`/admin/${kind}?edit=${r.id}`}>ویرایش</Link></div>)}</div>}</div>;
}
