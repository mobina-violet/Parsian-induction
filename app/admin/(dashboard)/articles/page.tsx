import { CmsSection } from "@/components/admin/CmsSection";
export const dynamic = "force-dynamic";
export default async function Page({searchParams}:{searchParams:Promise<{edit?:string}>}) { const {edit}=await searchParams;return <CmsSection kind="articles" edit={edit}/>; }
