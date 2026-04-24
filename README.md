# arredovita

Medusa 2 + Next.js storefront for an online furniture store.

```
arredovita/
├── backend/        Medusa 2 (API + Admin at /app on port 9000)
├── storefront/     Next.js 15 storefront (port 8000)
└── deploy/         Docker Compose + Caddy for Hetzner VPS
```

## Local dev

Prereqs: Node 20+, Yarn, Postgres 17 running locally.

```bash
# One-time DB create
createdb arredovita_medusa

# Backend
cd backend
yarn install
yarn medusa db:migrate
yarn medusa user -e office@danovicidesign.com -p <password>
yarn seed                       # demo regions + products
yarn dev                        # http://localhost:9000  (admin at /app)

# Storefront (second terminal)
cd storefront
yarn install
yarn dev                        # http://localhost:8000
```

Env files:
- `backend/.env` — DB URL, CORS, JWT/cookie secrets (Redis disabled locally)
- `storefront/.env.local` — `MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_DEFAULT_REGION=it`

Grab the publishable key from the admin UI (Settings → Publishable API Keys) or directly:

```bash
psql -d arredovita_medusa -t -c "SELECT token FROM api_key WHERE type='publishable' LIMIT 1;"
```

## Deploy

See [`deploy/README.md`](deploy/README.md).
