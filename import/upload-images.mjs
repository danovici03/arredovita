#!/usr/bin/env node
// Uploads local WhatsApp images to Medusa via /admin/uploads, then rewrites
// the import CSV with the returned URLs.
//
// Required env:
//   MEDUSA_ADMIN_EMAIL     (default: office@danovicidesign.com)
//   MEDUSA_ADMIN_PASSWORD
//   BACKEND_URL            (default: https://api.arredovita.it)
//
// Resumable: uploads.json caches filename → url so re-runs skip work.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BACKEND_URL = process.env.BACKEND_URL || 'https://api.arredo.danovicidesign.com'
const ADMIN_EMAIL = process.env.MEDUSA_ADMIN_EMAIL || 'office@danovicidesign.com'
const ADMIN_PASSWORD = process.env.MEDUSA_ADMIN_PASSWORD
const SOURCE_CSV = process.env.SOURCE_CSV || '/Users/daniel/Documents/medusa-import-final.csv'
const LOCAL_IMG_DIR = process.env.LOCAL_IMG_DIR || '/Users/daniel/Downloads/Arredo-vita-media'
const CACHE_PATH = path.join(__dirname, 'uploads.json')
const OUT_CSV = path.join(__dirname, 'medusa-import-uploaded.csv')

const PLACEHOLDER_HOST = 'api.arredo.danovicidesign.com'
const URL_RE = new RegExp(
  `https?://${PLACEHOLDER_HOST.replace(/\./g, '\\.')}/static/([a-zA-Z0-9_\\-]+\\.jpe?g)`,
  'gi'
)

if (!ADMIN_PASSWORD) {
  console.error('Missing MEDUSA_ADMIN_PASSWORD env var.')
  process.exit(1)
}

// av-YYYY-MM-DD-HHMMSS[-N].jpeg  →  WhatsApp Image YYYY-MM-DD at HH.MM.SS [(N)].jpeg
function avToWhatsApp(name) {
  const m = name.match(/^av-(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})(\d{2})(?:-(\d+))?\.jpe?g$/i)
  if (!m) return null
  const [, date, h, mi, s, n] = m
  const base = `WhatsApp Image ${date} at ${h}.${mi}.${s}`
  return n ? `${base} (${n}).jpeg` : `${base}.jpeg`
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return {}
  return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
}

function saveCache(cache) {
  const tmp = CACHE_PATH + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(cache, null, 2))
  fs.renameSync(tmp, CACHE_PATH)
}

async function authenticate() {
  const res = await fetch(`${BACKEND_URL}/auth/admin/emailpass`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) {
    throw new Error(`Auth failed: ${res.status} ${await res.text()}`)
  }
  const { token } = await res.json()
  if (!token) throw new Error('Auth returned no token')
  return token
}

async function uploadOne(token, localPath, displayName) {
  const buf = fs.readFileSync(localPath)
  const form = new FormData()
  form.append('files', new Blob([buf], { type: 'image/jpeg' }), displayName)

  const res = await fetch(`${BACKEND_URL}/admin/uploads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  if (!res.ok) {
    throw new Error(`Upload ${displayName} failed: ${res.status} ${await res.text()}`)
  }
  const json = await res.json()
  const file = json.files?.[0]
  if (!file?.url) throw new Error(`Upload ${displayName} returned no URL: ${JSON.stringify(json)}`)
  return file.url
}

async function main() {
  const csv = fs.readFileSync(SOURCE_CSV, 'utf8')

  // Extract unique placeholder filenames
  const filenames = new Set()
  for (const m of csv.matchAll(URL_RE)) filenames.add(m[1])
  console.log(`Found ${filenames.size} unique image filenames in CSV`)

  // Pre-flight: verify every filename has a local file
  const missing = []
  for (const fn of filenames) {
    const wa = avToWhatsApp(fn)
    if (!wa || !fs.existsSync(path.join(LOCAL_IMG_DIR, wa))) missing.push(fn)
  }
  if (missing.length) {
    console.error(`Missing local files for ${missing.length} filenames:`)
    missing.slice(0, 10).forEach(f => console.error(`  ${f}`))
    process.exit(1)
  }

  const cache = loadCache()
  const todo = [...filenames].filter(fn => !cache[fn])
  console.log(`Already uploaded: ${filenames.size - todo.length}. Pending: ${todo.length}.`)

  if (todo.length) {
    console.log(`Authenticating as ${ADMIN_EMAIL}…`)
    const token = await authenticate()

    let i = 0
    for (const fn of todo) {
      i++
      const wa = avToWhatsApp(fn)
      const localPath = path.join(LOCAL_IMG_DIR, wa)
      try {
        const url = await uploadOne(token, localPath, fn)
        cache[fn] = url
        saveCache(cache)
        console.log(`  [${i}/${todo.length}] ${fn} → ${url}`)
      } catch (err) {
        console.error(`  [${i}/${todo.length}] ${fn} FAILED: ${err.message}`)
        process.exit(1)
      }
    }
  }

  // Rewrite CSV with mapped URLs
  const out = csv.replace(URL_RE, (_, fn) => {
    const u = cache[fn]
    if (!u) throw new Error(`No cached URL for ${fn}`)
    return u
  })
  fs.writeFileSync(OUT_CSV, out)
  console.log(`\nWrote ${OUT_CSV}`)
  console.log(`Now import this file via Medusa Admin → Settings → Products → Import.`)
}

main().catch(e => { console.error(e); process.exit(1) })
