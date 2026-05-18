# digo-labs app template

A Vite + React + TypeScript starter pre-wired with the `@digo-labs/*` ecosystem — UI components, design system, auth, services, and a `defineApp({...})` helper that ties it all together.

Use this template via GitHub's **"Use this template"** button to spawn a new repo, then clone it locally.

## Prerequisites

- Node.js 22+
- An AWS account with CLI credentials configured (only needed if you want to deploy via `npm run provision`; not needed for local dev)

## Fast start

After cloning the repo created from this template:

```bash
npm install   # installs @digo-labs/* at their latest published versions
npm run dev   # http://localhost:8008
```

The `@digo-labs/*` packages live on public npm and are pinned to `"latest"` in `package.json`, so `npm install` always grabs the most recent published version on a fresh install. To bump after a new release lands: `rm package-lock.json && npm install`.

## Naming your app

The template ships with the placeholder name `app-template`. Before you deploy or push any data, rename it in **two files**:

- **`src/app.config.ts`** — change `name: 'app-template'` to your app's name with **hyphens** (e.g. `'cool-tool'`)
- **`src/db.ts`** — change `defineDatabases('app_template', ...)` to your app's name with **underscores** (e.g. `'cool_tool'`)

Both values refer to the same app but use different separators on purpose:

- App names use hyphens to match URL/subdomain conventions (`cool-tool.digo-labs.com`)
- Postgres schema names can't contain hyphens, so the schema uses underscores

The backend handles the translation automatically: when it receives a request from `cool-tool.digo-labs.com`, it looks up tables in the `cool_tool` schema. The two files **must agree** (same app, with the right separator for each) — otherwise the backend can't find your tables and queries will silently fail.

## Declaring tables

Each app owns its own tables, isolated from every other app in a private Postgres schema inside the shared monorepo RDS instance. Declare them in `src/db.ts`:

```ts
import { defineDatabases } from '@digo-labs/app';
import { text, uuid }      from 'drizzle-orm/pg-core';

export const { tables, databases } = defineDatabases('cool_tool', {
  posts: {
    id:      uuid('id').primaryKey().defaultRandom(),
    title:   text('title').notNull(),
    content: text('content').notNull().default(''),
  },
  comments: {
    id:     uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id').notNull(),
    body:   text('body').notNull(),
  },
});

// drizzle-kit only picks up tables exported at the top level
export const { posts, comments } = tables;
```

Then expose them as services in `src/app.config.ts`:

```ts
import { databases } from './db';

defineApp({
  // ...
  services: () => ({
    ...databases,   // posts + comments now available as typed services
    // ...
  }),
});
```

Your React components access them via `services.posts.list()`, `services.comments.create({...})`, etc. — fully typed from the column definitions, no extra typing needed.

### Common tables (shared across apps)

Tables that live in the `common` Postgres schema (defined by the core team and exposed via `@digo-labs/common`) work the same way but use `new Database<RowType>('tableName')` instead. The row type comes from `@digo-labs/common`:

```ts
import { Database }    from '@digo-labs/services';
import { StyleRecord } from '@digo-labs/common';

services: () => ({
  ...databases,
  styles: new Database<StyleRecord>('styles'),
}),
```

The backend looks up table names in the `common` schema first, then in your app's schema. No code change needed to tell them apart — naming a common table the same as one of your app tables is just a collision; pick a different name.

### Pushing changes to the database

After adding or modifying tables in `src/db.ts`:

```bash
npm run db:push
```

This chains three steps:

1. **Create schema** — `CREATE SCHEMA IF NOT EXISTS` for your app's schema (no-op if it already exists)
2. **Push tables** — drizzle-kit compares `src/db.ts` against the live database and applies any missing tables, columns, or constraints. Prompts before destructive changes (drops).
3. **Refresh backend** — POST to the backend's admin endpoint so it re-reads the database and your new tables are queryable immediately, without needing a backend deploy

This requires `.env` to exist with the database credentials — which `provision.sh` writes automatically the first time it runs. See `.env.example` for the shape.

## Provisioning + deploy

To deploy your cloned app to AWS:

```bash
npm run provision -- cool-tool        # creates infrastructure + database
git push origin main                  # Amplify auto-builds and deploys
```

`provision.sh` is idempotent — re-running it is safe — and handles every piece of setup in one shot:

- **Credentials** — fetched from AWS Secrets Manager into a local `.env` (gitignored), so you never type the database password by hand
- Per-app private S3 bucket (`<app-name>-storage`)
- Amplify app connected to your repo's `origin`, with a standard `npm install && npm run build` build spec
- Amplify `main` branch with auto-build on push
- Custom SPA rewrite rule so client-side routing works
- Domain association `<subdomain>.digo-labs.com → main` using the wildcard `*.digo-labs.com` certificate
- Route 53 `CNAME` pointing the subdomain at Amplify's CloudFront distribution
- **Postgres schema + tables** — runs `npm run db:push` at the end, so the database is ready before your first deploy

After the script finishes, push a commit to `main` to trigger the first build (typically 3–5 minutes).

### AWS permissions

The script needs `secretsmanager:GetSecretValue` for the shared `monorepo/*` secrets. If you get a permission error on the credentials step, ask the admin to grant the read on the `Developers` IAM group, or run with the admin profile (`AWS_PROFILE=digo`).

## What's in the box

The template wires together these `@digo-labs/*` packages:

| Package               | What it gives you                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `@digo-labs/common`   | Theme tokens, custom Tailwind utilities (`typo-*`, `cs-focus`, `flex-row-center`, …), curated icon set, schemas, helpers            |
| `@digo-labs/ui`       | React components (Button, Input, Dialog, ToggleTheme, ChatThread, GoogleSignInButton, …) styled with Tailwind v4 + the common theme |
| `@digo-labs/services` | Auth (better-auth), backend API client, websocket client, AI streams, S3 storage helpers                                            |
| `@digo-labs/app`      | `defineApp({...})` + `defineDatabases({...})` — one call each to wire routing, providers, design system, auth, services, and tables |

Fonts (Geist, Clash Grotesk, etc.) are served from `cdn.digo-labs.com` and registered as `@font-face` declarations inside `@digo-labs/common`.

## Local backend development

By default the app talks to the production backend at `https://api.digo-labs.com`. To point it at a local backend, override the URL when calling `defineApp({...})` in `src/app.config.ts`:

```ts
defineApp({
  // ...
  backend:    true,
  backendURL: 'http://localhost:3000',
});
```

To also point `npm run db:push` at a local backend (so the schema refresh hits your local instance instead of production), set the override in `.env` — see `.env.example` for the variable name.

## Editor setup

`.vscode/extensions.json` recommends three extensions; VS Code will offer to install them when you open the folder:

- **Tailwind CSS IntelliSense** — class autocomplete + color preview, including inside `cn(...)` / `clsx(...)` / `cva(...)` calls
- **Prettier** — runs on save (configured in `.vscode/settings.json`), respects `.prettierrc.json` including Tailwind class-sort
- **ESLint** — auto-fix on save, e.g. converts `<X></X>` to `<X />`

## Project structure

```
app-template/
├── src/
│   ├── main.tsx           # entry — render(<App />)
│   ├── index.tsx          # routes
│   ├── index.css          # Tailwind + @digo-labs/ui style imports
│   ├── app.config.ts      # defineApp({...}) — preset, mode, auth, backend, services
│   ├── db.ts              # defineDatabases({...}) — your app's tables
│   └── pages/             # home, login, loading
├── scripts/
│   ├── provision.sh       # AWS infrastructure setup + db:push
│   ├── create-schema.js   # creates the app's Postgres schema (called by db:push)
│   └── refresh-schemas.js # tells backend to re-introspect tables (called by db:push)
├── certs/
│   └── rds-global-bundle.pem  # AWS public CA bundle for RDS TLS verification
├── drizzle.config.ts      # drizzle-kit config (reads ./src/db.ts)
├── .env.example           # documents required env vars (.env is gitignored)
└── (configs: vite, tsconfig, eslint, prettier, .vscode)
```
