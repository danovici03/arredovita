#!/usr/bin/env bash
# Dump the Medusa postgres DB and keep rolling backups.
# Cron example (every day at 03:15):
#   15 3 * * * /opt/arredovita/deploy/backup-db.sh >> /var/log/arredovita-backup.log 2>&1

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/var/backups/arredovita}"
KEEP_DAYS="${KEEP_DAYS:-14}"
COMPOSE_DIR="$(cd "$(dirname "$0")" && pwd)"
TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)

# Load POSTGRES_* from .env next to docker-compose.yml
if [ -f "$COMPOSE_DIR/.env" ]; then
  set -a; . "$COMPOSE_DIR/.env"; set +a
fi

mkdir -p "$BACKUP_DIR"
OUT="$BACKUP_DIR/medusa-$TIMESTAMP.sql.gz"

cd "$COMPOSE_DIR"
docker compose exec -T postgres \
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --clean --if-exists \
  | gzip -9 > "$OUT"

find "$BACKUP_DIR" -name 'medusa-*.sql.gz' -type f -mtime +"$KEEP_DAYS" -delete

echo "[$(date -u +%FT%TZ)] backup ok: $OUT ($(du -h "$OUT" | cut -f1))"
