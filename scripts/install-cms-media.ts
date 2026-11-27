import 'dotenv/config';
import { Client } from 'pg';
async function main(){const connectionString=process.env.DIRECT_URL || process.env.DATABASE_URL;if(!connectionString)throw new Error('Missing database URL');const client=new Client({connectionString});await client.connect();try{await client.query('CREATE TABLE IF NOT EXISTS cms_media (id text PRIMARY KEY, name text NOT NULL, width integer NOT NULL, height integer NOT NULL, data bytea NOT NULL, created_at timestamptz NOT NULL DEFAULT now())');console.log('CMS media table ready');}finally{await client.end();}}
main().catch(e=>{console.error(e);process.exitCode=1;});
