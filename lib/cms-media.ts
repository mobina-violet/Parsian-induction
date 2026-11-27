import "server-only";
import { Client } from "pg";
import { mkdir,writeFile,readFile,readdir,rename } from "node:fs/promises";
import path from "node:path";
const folder=()=>process.env.CMS_MEDIA_DIR || (process.env.NODE_ENV!=="production"?path.join(process.cwd(),".cms-media"):null);
const valid=(id:string)=>/^[a-f0-9-]{36}$/i.test(id);

export type MediaRow = { id: string; name: string; width: number; height: number; size: number };

async function withMediaClient<T>(run: (client: Client) => Promise<T>): Promise<T> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL");
  const client = new Client({ connectionString, connectionTimeoutMillis: 10000, query_timeout: 15000, statement_timeout: 12000, keepAlive: true });
  try {
    await client.connect();
    return await run(client);
  } finally {
    await client.end().catch(() => {});
  }
}

export async function listMedia() {
  const dir=folder(); const local:MediaRow[]=[]; if(dir){await mkdir(dir,{recursive:true});for(const name of await readdir(dir)){if(!name.endsWith(".json"))continue;try{local.push(JSON.parse(await readFile(path.join(dir,name),"utf8")));}catch{}}} const remote=await withMediaClient(async client => (await client.query<MediaRow>("SELECT id,name,width,height,octet_length(data) AS size FROM cms_media ORDER BY created_at DESC LIMIT 200")).rows).catch(e=>{console.error("Legacy media list failed",e);return [];});return [...local.reverse(),...remote].slice(0,200);
}

export async function saveMedia(id: string, name: string, width: number, height: number, data: Buffer) {
  const dir=folder(); if(dir){if(!valid(id))throw new Error("Invalid media ID");await mkdir(dir,{recursive:true});await writeFile(path.join(dir,id+".webp"),data,{flag:"wx"});await writeFile(path.join(dir,id+".tmp"),JSON.stringify({id,name,width,height,size:data.length}),{flag:"wx"});await rename(path.join(dir,id+".tmp"),path.join(dir,id+".json"));return;}
  return withMediaClient(async client => {
    await client.query("INSERT INTO cms_media(id,name,width,height,data) VALUES ($1,$2,$3,$4,$5)", [id,name,width,height,data]);
  });
}

export async function readMedia(id: string) {
  if(!valid(id))return undefined;const dir=folder();if(dir){try{return await readFile(path.join(dir,id+".webp"));}catch(e){if((e as NodeJS.ErrnoException).code!=="ENOENT")throw e;}}
  return withMediaClient(async client => (await client.query<{data: Buffer}>("SELECT data FROM cms_media WHERE id=$1", [id])).rows[0]?.data);
}
