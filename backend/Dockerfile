# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++ libc6-compat
COPY package.json yarn.lock ./
RUN corepack enable \
 && yarn config set nodeLinker node-modules \
 && yarn install --frozen-lockfile --network-timeout 600000

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++ libc6-compat
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && yarn build

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache curl tini
ENV NODE_ENV=production

COPY --from=builder /app/.medusa/server ./
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
 && corepack enable \
 && yarn config set nodeLinker node-modules \
 && yarn install --production --frozen-lockfile --network-timeout 600000

EXPOSE 9000
ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["yarn", "start"]
