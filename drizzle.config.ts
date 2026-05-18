import 'dotenv/config';

import type { Config } from 'drizzle-kit';
import { readFileSync } from 'node:fs';

const rdsCa = readFileSync('./certs/rds-global-bundle.pem', 'utf8');

const dbUrl = new URL(process.env.DATABASE_URL_MONOREPO!);

export default {
  schema: './src/db.ts',
  out: './drizzle',
  dialect: 'postgresql',
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
