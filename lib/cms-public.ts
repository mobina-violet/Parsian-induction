import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { defaults, type PublicSettings } from "./cms-public-fields";
export const getPublicSettings = cache(async (): Promise<PublicSettings> => {
 try { const rows = await prisma.$queryRaw<{key:string;value:string}[]>`SELECT key,value FROM cms_public_settings`;
 const result = {...defaults}; for(const row of rows) if(Object.prototype.hasOwnProperty.call(defaults,row.key)) result[row.key as keyof PublicSettings]=row.value; return result;
 } catch(error) { console.error("CMS settings read failed",error); return {...defaults}; }
});
