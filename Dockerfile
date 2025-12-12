# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /workspace

# Install dependencies
COPY package*.json ./
COPY nx.json tsconfig.base.json jest.preset.js ./
COPY .eslintrc.json .prettierrc .editorconfig ./

COPY apps ./apps
COPY libs ./libs

RUN npm install

# Prisma needs DATABASE_URL inside the container (builder stage)
ENV DATABASE_URL="file:/workspace/libs/db/prisma/dev.db"

# Generate Prisma client and sync the SQLite schema
RUN npx prisma generate --schema=libs/db/prisma/schema.prisma
RUN npx prisma db push --schema=libs/db/prisma/schema.prisma

# Seed the database
RUN node libs/db/seed.cjs

# Build the Express API with Nx into dist/apps/api-express
RUN npx nx build api-express --configuration=production

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy the whole dist tree so internal requires keep working
COPY --from=builder /workspace/dist ./dist

# Copy prisma DB and node_modules for runtime
COPY --from=builder /workspace/libs/db/prisma ./libs/db/prisma
COPY --from=builder /workspace/node_modules ./node_modules

# Prisma runtime connection string
ENV DATABASE_URL="file:/app/libs/db/prisma/dev.db"

EXPOSE 3000

# Run the same entrypoint you would run locally:
#   node dist/apps/api-express/main.js
CMD ["node", "dist/apps/api-express/main.js"]
