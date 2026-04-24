# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Two independent Yarn projects (not a monorepo — no root `package.json`). Each has its own `node_modules`, `yarn.lock`, and Dockerfile.

- `backend/` — Medusa 2 API + Admin UI, served together at port 9000 (admin mounts at `/app`)
- `storefront/` — Next.js 15 (App Router, React 19, Turbopack) on port 8000
- `deploy/` — Docker Compose + Caddy config for the production Hetzner VPS

The two apps talk over HTTP via `MEDUSA_BACKEND_URL`; they do not share code.

## Commands

### Backend (`cd backend`)

```bash
yarn dev                        # medusa develop — hot reload, API + admin on :9000
yarn build                      # medusa build — emits .medusa/server
yarn start                      # medusa start — production (expects build output)
yarn seed                       # medusa exec ./src/scripts/seed.ts — demo regions/products
yarn medusa db:migrate          # apply pending migrations
yarn medusa user -e <email> -p <pw>   # create admin user

# Tests (Jest via @swc/jest, NODE_OPTIONS=--experimental-vm-modules)
yarn test:unit                  # src/**/__tests__/**/*.unit.spec.ts
yarn test:integration:http      # integration-tests/http/*.spec.ts  (spins up a server)
yarn test:integration:modules   # src/modules/*/__tests__/**
# Run one test:
yarn test:integration:http -t "health"
```

Test routing is driven by `TEST_TYPE`; see `jest.config.js`. Integration tests use `@medusajs/test-utils` and load `./integration-tests/setup.js`; `.env.test` is loaded via `loadEnv("test", ...)`.

### Storefront (`cd storefront`)

```bash
yarn dev                        # next dev --turbopack -p 8000
yarn build                      # next build  (NEXT_PUBLIC_* baked in here)
yarn start                      # next start -p 8000
yarn lint                       # next lint
yarn analyze                    # ANALYZE=true next build
```

No test suite is configured in the storefront.

### Deploy (`cd deploy`)

```bash
docker compose up -d --build backend storefront   # rebuild after code changes
docker compose logs -f backend|storefront|caddy
docker compose exec postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
docker compose exec backend yarn medusa db:migrate
./backup-db.sh                  # gzipped pg_dump to /var/backups/arredovita
```

## Architecture

### Backend — Medusa 2

`medusa-config.ts` conditionally loads Redis-backed modules (`cache-redis`, `event-bus-redis`, `workflow-engine-redis`, `locking-redis`) **only when `REDIS_URL` is set**. Local dev runs without Redis and falls back to in-memory implementations; production always sets `REDIS_URL=redis://redis:6379` in Compose. When adding modules, follow this same conditional pattern if the module has an in-memory/Redis fork.

Source layout under `backend/src/` follows Medusa's file-based framework — each folder is a convention, not an import target:

- `api/{store,admin}/<path>/route.ts` — HTTP routes, export `GET`/`POST`/... handlers receiving `MedusaRequest`/`MedusaResponse`. Routes under `store/` need the publishable API key; `admin/` needs an admin session.
- `admin/` — admin-UI customizations (widgets, routes) built via Vite; `i18n/index.ts` is the translation entrypoint for the admin.
- `modules/` — custom commerce modules (empty starter).
- `workflows/`, `subscribers/`, `jobs/`, `links/` — Medusa framework extension points (all empty starters with README stubs).
- `scripts/seed.ts` — ran by `yarn seed`.

The starter ships example no-op routes at `api/store/custom/route.ts` and `api/admin/custom/route.ts` (both return 200). Use them as the template for new routes.

Admin auth on first boot is automated by `docker-entrypoint.sh`: if `CREATE_ADMIN_EMAIL`/`CREATE_ADMIN_PASSWORD` are set it runs `yarn medusa user`, and if `RUN_MIGRATIONS=true` (default) it migrates before starting. Both are idempotent.

### Storefront — Next.js 15 App Router

- `output: "standalone"` in `next.config.js` — production runs `node server.js` from the built output (see `storefront/Dockerfile`).
- TypeScript and ESLint errors **do not fail the build** (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`). Run `yarn lint` explicitly if you want lint feedback; don't rely on `yarn build` catching type errors.
- `check-env-variables.js` runs at the top of `next.config.js` and **exits the process** if `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` is missing — every build/dev/start needs it.

Routing is region-scoped. Everything lives under `src/app/[countryCode]/` with two route groups:

- `(main)/` — public site: `page.tsx` (home), `products/[handle]`, `categories/`, `collections/`, `cart/`, `store/`, `order/`, `account/` (parallel routes `@dashboard`/`@login`)
- `(checkout)/checkout/` — isolated checkout layout

`src/middleware.ts` is the entry gate. On every non-asset request it:
1. Fetches `/store/regions` from the backend (cached 1h) and builds a country-code → region map.
2. Picks a country code from (URL path) → `x-vercel-ip-country` header → `NEXT_PUBLIC_DEFAULT_REGION` (`it`) → first region.
3. 307-redirects to `/<countryCode>/...` if missing and sets a `_medusa_cache_id` cookie used as a Next cache tag.

If regions are empty in the admin, the middleware returns a 500 — seed/create regions before expecting pages to render.

The backend client lives at `src/lib/config.ts`: a `@medusajs/js-sdk` instance wired with `MEDUSA_BACKEND_URL` + publishable key, plus a `fetch` override that injects `x-medusa-locale` from `getLocaleHeader()` so locale propagates to every backend call.

Server-side data fetching lives in `src/lib/data/*.ts` (one file per domain: cart, customer, products, regions, …). UI is organized by feature in `src/modules/<feature>/` — these are Medusa-starter-style feature folders, not Medusa backend modules.

### Deployment — single Hetzner VPS

`deploy/docker-compose.yml` runs five services: `postgres:17-alpine`, `redis:7-alpine`, `backend`, `storefront`, `caddy:2-alpine`. Caddy terminates TLS (auto-Let's-Encrypt) and reverse-proxies `arredovita.it` → storefront and `api.arredovita.it` → backend (with admin at `/app`).

Key deployment facts (see `deploy/README.md`):

- **`NEXT_PUBLIC_*` env vars are baked into the storefront image at build time** — rotating the publishable key, changing the API URL, or swapping Stripe keys all require `docker compose build storefront`. The `docker-compose.yml` wires these through `args:` to the Dockerfile's `ARG`/`ENV` lines.
- **First deploy is two-phase**: start `backend` first, log into `/app`, create a publishable key bound to the default sales channel, paste it into `.env`, then build storefront.
- **Caddy cert volume** (`caddy_data`) must not be deleted — doing so re-requests from Let's Encrypt and risks rate limits.
- The `caddy_data` and `postgres_data` volumes are the only stateful things; everything else is reproducible from git + `.env`.

### Italian-market defaults

- Default region: `it` (not `us` — the starter default). Changing this affects middleware redirects and SSR region resolution.
- Domains: `arredovita.it` (storefront), `api.arredovita.it` (API + admin at `/app`).
- Admin user email: `office@danovicidesign.com`.

## Gotchas

- No root `package.json` — always `cd backend` or `cd storefront` before running yarn commands.
- The storefront's `eslint-config-next` pins `eslint@8.10.0`; newer ESLint will break it.
- `@medusajs/ui` and related packages are pinned to `latest` in `storefront/package.json`; `yarn install` will drift. Prefer `yarn.lock`-consistent installs (`--frozen-lockfile`).
- React/React-DOM are pinned to `19.0.5` via both `resolutions` and `overrides` — don't upgrade one without the other.
- Medusa `build` output lands in `backend/.medusa/server`; the production Dockerfile copies only that directory into the runner stage, so anything outside `src/` (e.g. top-level scripts) won't ship unless explicitly copied.
