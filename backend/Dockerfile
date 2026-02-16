# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration files
COPY package.json tsconfig.json ./
# Install dependencies
RUN npm install

# Copy source code
COPY src ./src
COPY prisma ./prisma

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package.json for production dependencies
COPY package.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# We need the generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Expose the API port
EXPOSE 4000

# Start the server (compiled JS)
CMD ["node", "dist/server.js"]
