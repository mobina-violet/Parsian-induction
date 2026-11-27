import {getPublicSettings} from "@/lib/cms-public";
import {pageFields,type PublicSettings} from "@/lib/cms-public-fields";
import {SettingsForm} from "@/components/admin/SettingsForm";
export const dynamic="force-dynamic";
export default async function Page(){const values=await getPublicSettings();return <section className="space-y-4"><h1 className="text-xl font-bold">محتوای صفحات</h1><SettingsForm group="pages" fields={Object.entries(pageFields).map(([key,label])=>({key,label,value:values[key as keyof PublicSettings]}))}/></section>}
