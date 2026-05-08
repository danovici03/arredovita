import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const redisUrl = process.env.REDIS_URL

// The local file provider builds public URLs for uploads from this base.
// Without it, Medusa defaults to http://localhost:9000/static, which breaks
// any client (storefront, admin) that loads images from a different host.
const fileBackendUrl = `${(process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000').replace(/\/$/, '')}/static`

const modules: any[] = [
  {
    resolve: '@medusajs/medusa/file',
    options: {
      providers: [
        {
          resolve: '@medusajs/medusa/file-local',
          id: 'local',
          is_default: true,
          options: {
            backend_url: fileBackendUrl,
            upload_dir: 'static',
          },
        },
      ],
    },
  },
]

if (redisUrl) {
  modules.push(
    {
      resolve: '@medusajs/medusa/cache-redis',
      options: { redisUrl },
    },
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: { redisUrl },
    },
    {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: { redis: { url: redisUrl } },
    },
    {
      resolve: '@medusajs/medusa/locking',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/locking-redis',
            id: 'locking-redis',
            is_default: true,
            options: { redisUrl },
          },
        ],
      },
    },
  )
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  modules,
})
