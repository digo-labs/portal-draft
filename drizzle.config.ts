import 'dotenv/config';

import type { Config } from 'drizzle-kit';
import { readFileSync } from 'node:fs';

const rdsCa = readFileSync('./certs/rds-global-bundle.pem', 'utf8');

const dbUrl = new URL(process.env.DATABASE_URL_MONOREPO!);

const schemaName = readFileSync('./src/db.ts', 'utf8').match(/defineDatabases\(\s*['"]([^'"]+)['"]/)?.[1];

if (!schemaName) throw new Error('drizzle.config: schema name not found in ./src/db.ts');

export default {
  schema: './src/db.ts',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: [schemaName],
  dbCredentials: {
    host: dbUrl.hostname,
    port: Number(dbUrl.port),
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.slice(1),
    ssl: { ca: rdsCa },
  },
  strict: true,
  verbose: true,
} satisfies Config;
