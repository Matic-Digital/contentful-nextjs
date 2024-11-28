# Build dependencies stage
FROM node:20-alpine AS deps
WORKDIR /app

# Install project dependencies based on lockfile
COPY package.json package-lock.json ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build stage - Prepare application files
FROM node:20-alpine AS builder
WORKDIR /app
# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all application files
COPY . .

# Production stage - Final image for running the application
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy application files with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app ./

# Expose Next.js port
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV development

# Start Next.js development server
CMD ["npm", "run", "dev"]
