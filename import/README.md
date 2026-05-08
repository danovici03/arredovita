# Catalog import

One-shot scripts for the initial catalog import. The source CSV
(`/Users/daniel/Documents/medusa-import-final.csv`) references images on a
placeholder host that does not serve them. We need to upload the local
WhatsApp originals to Medusa, then rewrite the CSV with the returned URLs.

## Prereqs

- Backend reachable at `https://api.arredo.danovicidesign.com` (the current alias; production target is `api.arredovita.it` once cut over)
- `static/` mounted on a persistent volume (see `deploy/docker-compose.yml`)
- Local images at `/Users/daniel/Downloads/Arredo-vita-media/`
- Node 20+

## Run

```bash
cd import
MEDUSA_ADMIN_PASSWORD='…' node upload-images.mjs
```

Optional env: `MEDUSA_ADMIN_EMAIL`, `BACKEND_URL`, `SOURCE_CSV`, `LOCAL_IMG_DIR`.

The script is **resumable** — it caches `filename → url` in `uploads.json`
after each successful upload, so re-running skips work. If an upload fails
mid-way, fix the issue and re-run.

Output: `medusa-import-uploaded.csv` — same as source, with placeholder URLs
replaced by real ones. Import it via Admin UI → Settings → Products → Import.

## Mapping

CSV references `av-2026-04-30-100633.jpeg`, local file is
`WhatsApp Image 2026-04-30 at 10.06.33.jpeg`. The script derives one from
the other deterministically; no renaming required.
