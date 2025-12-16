# ---- Builder stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root config and workspace files
COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps
COPY libs ./libs

# Install deps and build only api-express
RUN npm ci
RUN npx nx build api-express

# ---- Runtime stage ----
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy build output
COPY --from=builder /app/dist/apps/api-express ./dist

# Copy only what runtime needs (for now: package.json + lockfile)
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]
