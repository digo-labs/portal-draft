import 'dotenv/config';

import { readFileSync } from 'node:fs';
import pg from 'pg';

const SCHEMA_NAME_REGEX = /^[a-z][a-z0-9_]*$/;
const DEFINE_DATABASES_REGEX = /defineDatabases\(\s*['"]([^'"]+)['"]/;

function readSchemaName() {
  const src = readFileSync('./src/db.ts', 'utf8');
  const match = src.match(DEFINE_DATABASES_REGEX);

  if (!match) {
    throw new Error("create-schema: could not find defineDatabases('<name>', ...) in ./src/db.ts");
  }

  const name = match[1];

  if (!SCHEMA_NAME_REGEX.test(name)) {
    throw new Error(`create-schema: invalid schema name '${name}' (must match ${SCHEMA_NAME_REGEX})`);
  }

  return name;
}

async function main() {
  const schemaName = readSchemaName();
  const databaseUrl = process.env.DATABASE_URL_MONOREPO;

  if (!databaseUrl) {
    throw new Error('create-schema: missing DATABASE_URL_MONOREPO in .env (did provision.sh run?)');
  }

  const rdsCa = readFileSync('./certs/rds-global-bundle.pem', 'utf8');

  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { ca: rdsCa },
  });

  await client.connect();

  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    console.log(`Schema '${schemaName}' ready`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
