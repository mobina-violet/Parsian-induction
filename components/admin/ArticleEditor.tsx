"use client";
import { useRef, useState } from "react";
import { MediaUpload } from "./MediaUpload";
export function ArticleEditor({initial}:{initial:string}) {
 const ref=useRef<HTMLTextAreaElement>(null);
 const [value,setValue]=useState(initial);
 const [link,setLink]=useState("");
 const [alt,setAlt]=useState("");
 function insert(before:string,after="",fallback="متن") {
  const el=ref.current;if(!el)return;
  const start=el.selectionStart,end=el.selectionEnd;
  const selected=el.value.slice(start,end)||fallback;
  const next=el.value.slice(0,start)+before+selected+after+el.value.slice(end);
  setValue(next);
  requestAnimationFrame(()=>{el.focus();el.setSelectionRange(start+before.length,start+before.length+selected.length);});
 }
 const cls="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:border-orange-500";
 return <div className="space-y-3 rounded-xl border border-gray-200 p-3" dir="rtl">
 <div className="flex flex-wrap gap-2" role="toolbar" aria-label="ابزارهای مقاله">
 {[["عنوان بخش","\n\n## ","\n","عنوان"],["عنوان فرعی","\n\n### ","\n","عنوان"],["پررنگ","**","**","متن"],["فهرست","\n- ","\n","مورد"],["جدول","\n\n","\n\n","| پارامتر | شرح |\n| --- | --- |\n| توان | مقدار |"],["پرسش متداول","\n\n## پرسش‌های متداول\n\n### ","\nپاسخ پرسش\n","سوال"]].map(([label,b,a,f])=><button key={label} type="button" className={cls} onMouseDown={e=>e.preventDefault()} onClick={()=>insert(b,a,f)}>{label}</button>)}
 </div>
 <div className="flex flex-wrap gap-2"><input aria-label="آدرس لینک" dir="ltr" value={link} onChange={e=>setLink(e.target.value)} placeholder="https://... یا /products" className="min-w-0 flex-1 rounded-lg border p-2"/><button type="button" className={cls} disabled={!/^(https:\/\/[^\s()]+|\/(?!\/)[^\s()]*)$/.test(link)} onClick={()=>insert("[",`](${link})`,"عنوان لینک")}>افزودن لینک</button></div>
 <textarea ref={ref} name="content" required value={value} onChange={e=>setValue(e.target.value)} rows={18} className="w-full rounded-xl border border-gray-200 p-3 leading-8 focus:border-orange-500 focus:outline-none"/>
 <div className="space-y-2"><p>افزودن تصویر به مقاله</p><input aria-label="توضیح تصویر" value={alt} onChange={e=>setAlt(e.target.value)} placeholder="توضیح تصویر برای SEO" className="w-full rounded-lg border p-2"/><MediaUpload onSelect={url=>{if(!/^\/api\/media\/[a-zA-Z0-9-]+$/.test(url))return;setValue(old=>old+`\n\n![${alt.replace(/[\[\]\n\r]/g,"")||"تصویر مقاله"}](${url})\n`);}}/></div>
 <p className="text-xs text-gray-500">متن با قالب فعلی سایت ذخیره می‌شود. برای افزودن قالب، متن را انتخاب کنید و ابزار موردنظر را بزنید.</p>
 </div>;
}
