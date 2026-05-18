import 'dotenv/config';

import { BACKEND_URL as DEFAULT_BACKEND_URL, DIGO_ADMIN_SECRET, ROUTES } from '@digo-labs/common';

async function main() {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    throw new Error('refresh-schemas: missing ADMIN_SECRET in .env (did provision.sh run?)');
  }

  const apiBaseUrl = process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;
  const url = `${apiBaseUrl}/admin/${ROUTES.refreshSchemas}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { [DIGO_ADMIN_SECRET]: adminSecret },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const errorMessage = body?.error ?? `HTTP ${response.status}`;

    throw new Error(`refresh-schemas: ${errorMessage}`);
  }

  const result = await response.json();

  console.log(`Backend refreshed: ${JSON.stringify(result)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
