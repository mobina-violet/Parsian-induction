import "dotenv/config";
import { Client } from "pg";
async function main(){const connectionString=process.env.DIRECT_URL||process.env.DATABASE_URL;if(!connectionString)throw new Error("Missing database URL");const c=new Client({connectionString,connectionTimeoutMillis:15000});await c.connect();try{await c.query("CREATE TABLE IF NOT EXISTS cms_public_settings (key text PRIMARY KEY, value text NOT NULL)");console.log("CMS settings ready");}finally{await c.end();}}
main().catch(e=>{console.error(e);process.exitCode=1;});
