# Contentful Next.js Starter

This is a starter template for building a blog with Next.js and Contentful. It includes a modern Docker-based development workflow for a consistent development experience across teams.

## Project Structure

```
contentful-mux-nextjs-starter/
├── config/                    # Configuration files
│   ├── .env.development      # Development environment variables
│   ├── .env.staging         # Staging environment variables
│   ├── .env.production      # Production environment variables
│   └── .env.example         # Template for environment variables
├── docker/                    # Docker-related files
│   ├── Dockerfile           # Development Dockerfile
│   ├── Dockerfile.prod      # Production-optimized Dockerfile
│   ├── docker-compose.yml   # Development compose configuration
│   ├── docker-compose.staging.yml  # Staging compose configuration
│   └── docker-compose.prod.yml     # Production compose configuration
├── scripts/                   # Management scripts
│   ├── dev                  # Development environment management
│   ├── staging             # Staging environment management
│   └── prod                # Production environment management
├── src/                      # Application source code
├── dev -> scripts/dev        # Convenience symlink
├── staging -> scripts/staging # Convenience symlink
├── prod -> scripts/prod      # Convenience symlink
├── package.json             # Node.js dependencies and scripts
└── README.md               # Project documentation
```

## Prerequisites

- Docker Desktop installed and running
- Git

No other local dependencies are required! Everything runs inside Docker containers.

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contentful-mux-nextjs-starter
   ```

2. Run the setup script:
   ```bash
   ./dev setup
   ```

3. Update `config/.env.development` with your Contentful credentials:
   ```
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID="your Space ID"
   NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN="Content Delivery API token"
   NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN="Content Preview API token"
   ```

4. The application will be running at [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Available Commands

All development commands run inside Docker containers for consistency:

```bash
# Development Environment
./dev setup     # First-time setup (creates .env.development, builds containers)
./dev start     # Start the development environment
./dev stop      # Stop the development environment
./dev restart   # Restart the development environment
./dev logs      # Show logs (with optional container name)
./dev status    # Show status of containers
./dev shell     # Open a shell in the app container
./dev clean     # Remove all containers, volumes, and images

# NPM Scripts (all run inside Docker)
npm run dev         # Start development server
npm run dev:build   # Rebuild and start containers
npm run dev:clean   # Full reset of environment
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run typecheck   # Run TypeScript checks
npm run format:write # Format code with Prettier
npm run format:check # Check code formatting
npm run check       # Run all checks (lint + typecheck)
npm run build       # Build for production
npm run start       # Start production server
```

### Development Features

- 🐳 Fully Dockerized - consistent environment across all machines
- 🔥 Hot-reloading enabled for rapid development
- 📦 Volume mounts for persistent development
- 🛠️ All tools (ESLint, Prettier, TypeScript) run in containers
- 🔍 Built-in logging and debugging tools
- 🚀 Production-ready Docker configuration

### Best Practices

1. **Environment Variables**:
   - Never commit environment files from `config/` directory
   - Keep `config/.env.example` updated with all required variables
   - Use `NEXT_PUBLIC_` prefix for client-side variables

2. **Docker Workflow**:
   - Always use `./dev shell` to run commands inside the container
   - Check logs with `./dev logs` when troubleshooting
   - Use `./dev clean` to reset your environment if needed

3. **Code Quality**:
   - Run `npm run check` before committing to ensure code quality
   - Use `npm run format:write` to maintain consistent code style
   - Keep TypeScript types up to date with `npm run typecheck`

### File Organization

1. **Configuration Files** (`/config`):
   - Environment-specific variables
   - Separate files for development, staging, and production
   - Example templates for setup

2. **Docker Files** (`/docker`):
   - Environment-specific Dockerfiles and compose configurations
   - Optimized for different deployment scenarios
   - Consistent build and runtime settings

3. **Management Scripts** (`/scripts`):
   - Environment management tools
   - Consistent interface across environments
   - Helper utilities for common tasks

### Troubleshooting

1. **Container won't start**:
   - Check if Docker Desktop is running
   - Run `./dev clean` followed by `./dev setup`
   - Verify your Contentful credentials in `config/.env.development`

2. **Changes not reflecting**:
   - Ensure you're editing files in your local directory
   - Check logs with `./dev logs` for errors
   - Try `./dev restart` to restart the development server

3. **Port conflicts**:
   - Check if port 3000 is already in use
   - Stop other Docker containers that might use the same port
   - Use `docker ps` to check for running containers

## Environments

This project supports three environments: Development, Staging, and Production.

### Development Environment

Use the `./dev` script for local development:

```bash
./dev setup     # First-time setup
./dev start     # Start development
./dev logs      # View logs
```

### Staging Environment

Use the `./staging` script for staging deployment:

```bash
./staging start    # Start staging environment
./staging stop     # Stop staging environment
./staging restart  # Restart staging environment
./staging logs     # View staging logs
```

Configuration:
- Uses `docker-compose.staging.yml`
- Environment variables in `config/.env.staging`
- Single container deployment
- Includes health checks

### Production Environment

Use the `./prod` script for production deployment:

```bash
./prod start      # Start production environment
./prod stop       # Stop production environment
./prod restart    # Restart production environment
./prod logs       # View production logs
```

Configuration:
- Uses `docker-compose.prod.yml`
- Environment variables in `config/.env.production`
- Multi-container deployment (2 replicas)
- Rolling updates for zero-downtime deployments
- Advanced health checks and restart policies

### Environment Configuration

1. **Development** (`config/.env.development`):
   - Used for local development
   - Hot-reloading enabled
   - Debug tools available

2. **Staging** (`config/.env.staging`):
   - Staging-specific variables
   - Mimics production setup
   - Used for testing before production

3. **Production** (`config/.env.production`):
   - Production-grade configuration
   - Enhanced security settings
   - Performance optimizations

### Deployment Best Practices

1. **Testing Flow**:
   - Develop locally using `./dev`
   - Test in staging using `./staging`
   - Deploy to production using `./prod`

2. **Environment Variables**:
   - Never commit environment files
   - Keep different credentials for each environment
   - Validate all variables before deployment

3. **Monitoring**:
   - Use `logs` command to monitor each environment
   - Check health status regularly
   - Monitor resource usage in production

### Security Considerations

1. **Environment Files**:
   - Keep `config/.env.staging` and `config/.env.production` secure
   - Use different API keys for each environment
   - Regularly rotate production credentials

2. **Docker Security**:
   - Production containers run as non-root
   - Images are multi-stage built for minimal attack surface
   - Regular security updates via Docker base images

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
