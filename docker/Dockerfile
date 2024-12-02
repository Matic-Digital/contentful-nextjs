# Development Dockerfile
# This Dockerfile is optimized for development with hot-reloading and debugging capabilities

# Base Node.js image for development
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install development dependencies
RUN apk add --no-cache \
    # Required for node-gyp
    python3 \
    make \
    g++ \
    # Required for health checks
    wget

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Create non-root user for better security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Note: The rest of the setup (installing dependencies, etc.) is handled by
# the docker-compose.yml file and mounted volumes for development efficiency
