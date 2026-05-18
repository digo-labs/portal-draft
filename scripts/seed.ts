import 'dotenv/config';

import { readFileSync } from 'node:fs';
import { Client }       from 'pg';

import {
  MOCK_ANNOUNCEMENTS,
  MOCK_COLLECTIONS,
  MOCK_COLLECTION_REFERENCES,
  MOCK_MILESTONES,
  MOCK_PROJECTS,
  MOCK_PROJECT_MEMBERS,
  MOCK_REFERENCES,
  MOCK_RESOURCE_LINKS,
  MOCK_SKILLS,
  MOCK_USERS,
  MOCK_WP_SUBMISSIONS,
} from '../src/data';

const SCHEMA = 'portal_draft';

// Tables with jsonb columns — these values get JSON.stringify'd before send.
const JSONB_COLUMNS: Record<string, string[]> = {
  wpSubmissions: ['entries'],
};

async function main() {
  const databaseUrl = process.env.DATABASE_URL_MONOREPO;

  if (!databaseUrl) {
    throw new Error('seed: missing DATABASE_URL_MONOREPO in .env (did provision.sh run?)');
  }

  const rdsCa = readFileSync('./certs/rds-global-bundle.pem', 'utf8');

  const client = new Client({
    connectionString: databaseUrl,
    ssl:              { ca: rdsCa },
  });

  await client.connect();

  try {
    console.log(`Seeding ${SCHEMA}...`);

    // Independent tables (no FKs)
    await seed(client, 'users',          MOCK_USERS);
    await seed(client, 'projects',       MOCK_PROJECTS);
    await seed(client, 'skills',         MOCK_SKILLS);
    await seed(client, 'references',     MOCK_REFERENCES);

    // FK-bearing tables (reference users + projects + references)
    await seed(client, 'projectMembers', MOCK_PROJECT_MEMBERS);
    await seed(client, 'milestones',     MOCK_MILESTONES);
    await seed(client, 'resourceLinks',  MOCK_RESOURCE_LINKS);
    await seed(client, 'wpSubmissions',  MOCK_WP_SUBMISSIONS);
    await seed(client, 'collections',    MOCK_COLLECTIONS);
    await seed(client, 'announcements',  MOCK_ANNOUNCEMENTS);

    // Junction (FK to collections + references)
    await seed(client, 'collectionRefs', MOCK_COLLECTION_REFERENCES);

    console.log('Seed complete.');
  } finally {
    await client.end();
  }
}

async function seed<T extends object>(
  client: Client,
  tableName: string,
  rows: readonly T[],
): Promise<void> {
  if (rows.length === 0) {
    console.log(`  ${tableName}: empty, skipped`);
    return;
  }

  // Union all keys across rows so optional fields are captured.
  const columnNames = Array.from(
    new Set(rows.flatMap(row => Object.keys(row))),
  );

  const jsonbCols   = JSONB_COLUMNS[tableName] ?? [];
  const quotedTable = `"${SCHEMA}"."${tableName}"`;
  const colList     = columnNames.map(c => `"${c}"`).join(', ');

  let inserted = 0;

  for (const row of rows) {
    const record = row as Record<string, unknown>;
    const values = columnNames.map((col) => {
      const raw = record[col];

      if (raw === undefined)         return null;
      if (jsonbCols.includes(col))   return JSON.stringify(raw);

      return raw;
    });

    const placeholders = columnNames.map((_, i) => `$${i + 1}`).join(', ');
    const sql          = `INSERT INTO ${quotedTable} (${colList}) VALUES (${placeholders}) ON CONFLICT ("id") DO NOTHING`;

    const result = await client.query(sql, values);

    if (result.rowCount && result.rowCount > 0) inserted++;
  }

  console.log(`  ${tableName}: ${inserted}/${rows.length} new`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
