import {getPublicSettings} from "@/lib/cms-public";
import {contactFields,type PublicSettings} from "@/lib/cms-public-fields";
import {SettingsForm} from "@/components/admin/SettingsForm";
export const dynamic="force-dynamic";
export default async function Page(){const values=await getPublicSettings();return <section className="space-y-4"><h1 className="text-xl font-bold">اطلاعات تماس</h1><SettingsForm group="settings" fields={Object.entries(contactFields).map(([key,label])=>({key,label,value:values[key as keyof PublicSettings]}))}/></section>}
