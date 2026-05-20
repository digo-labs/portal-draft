import 'dotenv/config';

import { readFileSync } from 'node:fs';
import pg from 'pg';

const SCHEMA_NAME_REGEX = /^[a-z][a-z0-9_]*$/;
const DEFINE_DATABASES_REGEX = /defineDatabases\(\s*['"]([^'"]+)['"]/;

function readSchemaName() {
  const src = readFileSync('./src/db.ts', 'utf8');
  const match = src.match(DEFINE_DATABASES_REGEX);

  if (!match) {
    throw new Error("verify-tables: could not find defineDatabases('<name>', ...) in ./src/db.ts");
  }

  const name = match[1];

  if (!SCHEMA_NAME_REGEX.test(name)) {
    throw new Error(`verify-tables: invalid schema name '${name}' (must match ${SCHEMA_NAME_REGEX})`);
  }

  return name;
}

async function main() {
  const schemaName = readSchemaName();
  const databaseUrl = process.env.DATABASE_URL_MONOREPO;

  if (!databaseUrl) {
    throw new Error('verify-tables: missing DATABASE_URL_MONOREPO in .env (did provision.sh run?)');
  }

  const rdsCa = readFileSync('./certs/rds-global-bundle.pem', 'utf8');

  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { ca: rdsCa },
  });

  await client.connect();

  try {
    const result = await client.query(
      `SELECT count(*)::int AS count FROM information_schema.tables WHERE table_schema = $1`,
      [schemaName],
    );

    const count = result.rows[0].count;

    if (count === 0) {
      throw new Error(
        `verify-tables: schema '${schemaName}' has 0 tables. ` +
          `drizzle-kit push likely failed silently — scroll up for its error output. ` +
          `Common cause: a package imported from src/db.ts is missing 'default'/'require' in its exports field.`,
      );
    }

    console.log(`Schema '${schemaName}' has ${count} table${count === 1 ? '' : 's'} ✓`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
