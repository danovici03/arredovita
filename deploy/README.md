# Deploy — Hetzner VPS

Production stack: Caddy (HTTPS) → Next.js storefront + Medusa backend, backed by Postgres + Redis. Everything in Docker Compose.

## DNS (before first deploy)

Point these A records at the VPS IP:

| Host                 | Purpose             |
|----------------------|---------------------|
| `arredovita.it`      | storefront          |
| `www.arredovita.it`  | redirects to apex   |
| `api.arredovita.it`  | Medusa API + `/app` |

Caddy fetches certs from Let's Encrypt on first hit — DNS must resolve first.

## VPS prereqs (Ubuntu 24.04 LTS on Hetzner CX22 or similar)

```bash
# SSH in as root, then:
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg ufw git

# Docker + compose plugin
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp    # HTTP/3
ufw --force enable

# Non-root user for the deploy
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

## First deploy

```bash
# As `deploy` user
sudo mkdir -p /opt/arredovita && sudo chown deploy:deploy /opt/arredovita
cd /opt/arredovita
git clone <your-repo-url> .     # or: scp -r the project from your laptop

cd deploy
cp .env.production.example .env
# Generate real secrets
sed -i "s|REPLACE_ME_openssl_rand_hex_32|$(openssl rand -hex 32)|" .env   # run twice: JWT + COOKIE
openssl rand -hex 16            # paste into REVALIDATE_SECRET
# Edit .env and set: POSTGRES_PASSWORD, ADMIN_PASSWORD, and leave NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_REPLACE_ME for now

docker compose up -d --build postgres redis backend caddy
docker compose logs -f backend    # wait for "Server is ready on port: 9000"
```

At this point:
- `https://api.arredovita.it/app` → Medusa admin, log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
- Go to **Settings → Publishable API Keys**, create one bound to the default sales channel, copy the `pk_...` value
- Put it in `.env` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

Then build and start the storefront:

```bash
docker compose up -d --build storefront
```

`https://arredovita.it` should now load.

## Everyday commands

```bash
# Pull + rebuild + restart after code changes
cd /opt/arredovita && git pull
cd deploy
docker compose up -d --build backend storefront

# Logs
docker compose logs -f backend
docker compose logs -f storefront
docker compose logs -f caddy

# DB shell
docker compose exec postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"

# Medusa CLI inside the container
docker compose exec backend yarn medusa db:migrate
docker compose exec backend yarn medusa user -e new@admin.com -p <pw>

# Restart a single service
docker compose restart backend
```

## Backups

```bash
# One-off
./backup-db.sh

# Daily at 03:15 (as deploy user)
crontab -e
# 15 3 * * * /opt/arredovita/deploy/backup-db.sh >> /var/log/arredovita-backup.log 2>&1
sudo touch /var/log/arredovita-backup.log && sudo chown deploy:deploy /var/log/arredovita-backup.log
```

Offsite: either `rclone` to a Hetzner Storage Box / S3, or add a second cron that `scp`s the latest dump somewhere else.

Restore:

```bash
gunzip -c /var/backups/arredovita/medusa-YYYY...sql.gz \
  | docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

## Notes / gotchas

- **Publishable key rotation** rebuilds the storefront image (`NEXT_PUBLIC_*` are baked in at build time).
- **First admin user**: once you've logged in once, you can remove `CREATE_ADMIN_*` env vars and restart backend — the entrypoint silently skips if the user already exists anyway, so it's also safe to leave.
- **Redis**: `REDIS_URL` is set for the backend, so `medusa-config.ts` loads cache/event-bus/workflow-engine/locking Redis modules. Remove the var to fall back to in-memory.
- **Caddy certs** live in the `caddy_data` volume — don't delete it or you'll hit Let's Encrypt rate limits when re-issuing.
- **Resource sizing**: CX22 (2 vCPU / 4 GB) handles this stack with headroom for small traffic. For image-heavy catalogs consider CX32 (4 vCPU / 8 GB).
