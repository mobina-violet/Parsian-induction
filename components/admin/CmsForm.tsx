"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCms } from "@/app/actions/admin-cms";
export type Field = {name:string;label:string;type?:"textarea"|"number"|"checkbox"|"select"|"date";options?:readonly string[];value?:string|boolean;required?:boolean};
export function CmsForm({kind,id,fields}:{kind:string;id:string;fields:Field[]}) {
 const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");const router=useRouter();
 const cls="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none";
 return <form className="space-y-4" onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);setBusy(true);setMessage("");try{const r=await saveCms(kind,id,data);if(r.success){setMessage("ذخیره شد");router.refresh();if(!id)router.push(`/admin/${kind}`);}else setMessage(r.error??"خطا");}catch{setMessage("خطای ارتباط با سرور");}finally{setBusy(false);}}}>
 {fields.map(f=><label key={f.name} className="block space-y-1 text-sm text-slate-700"><span>{f.label}</span>{f.type==="checkbox"?<input className="mr-3 accent-orange-600" type="checkbox" name={f.name} defaultChecked={Boolean(f.value)}/>:f.type==="textarea"?<textarea className={cls} name={f.name} defaultValue={String(f.value??"")} rows={f.name==="content"?18:5} required={f.required}/>:f.type==="select"?<select className={cls} name={f.name} defaultValue={String(f.value??f.options?.[0]??"")}>{f.options?.map(o=><option key={o}>{o}</option>)}</select>:<input className={cls} name={f.name} type={f.type??"text"} defaultValue={String(f.value??"")} required={f.required}/>}</label>)}
 <button disabled={busy} className="rounded-xl bg-orange-600 px-6 py-3 text-sm text-white disabled:opacity-50">{busy?"در حال ذخیره…":"ذخیره تغییرات"}</button><p role="status" className="text-sm text-slate-600">{message}</p></form>;
}
