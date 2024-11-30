# Contentful Next.js Starter

This is a starter template for building a blog with Next.js and Contentful. It includes a Docker-based development workflow for a consistent development experience across teams.

## Development Workflow

### Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contentful-mux-nextjs-starter
   ```

2. Copy the environment file:
   ```bash
   cp .env.example .env.development
   ```

3. Update `.env.development` with your credentials:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
   - `MUX_TOKEN_ID`
   - `MUX_TOKEN_SECRET`

### Daily Development

Our Docker setup provides a consistent development environment with:
- 🔥 Hot-reloading for instant feedback
- 📦 Cached node_modules for faster builds
- 🛠️ Built-in debugging support
- 🔍 Health checks for reliability
- 👤 Secure non-root user setup

#### Option A: Docker Development (Recommended)

1. Start the development server:
   ```bash
   npm run dev:docker
   ```
   The app will be available at http://localhost:3000

2. View logs in a separate terminal:
   ```bash
   ./scripts/dev logs
   ```

3. Run commands inside the container:
   ```bash
   ./scripts/dev shell
   ```

#### Option B: Local Development

If you prefer developing without Docker:
```bash
npm install
npm run dev
```

### Development Commands

#### Docker Commands
- `npm run dev:docker` - Start development environment
- `npm run dev:fresh` - Clean start (useful after dependency changes)
- `npm run docker:clean` - Remove containers and volumes
- `./scripts/dev logs` - View container logs
- `./scripts/dev shell` - Open shell in container
- `./scripts/dev status` - Check container status

#### Code Quality Commands
- `npm run format:write` - Format code
- `npm run check` - Run all checks (lint + types)
- `npm run test:types` - Check types with detailed output
- `npm run prepare` - Format and check code (run before committing)

#### Cleanup Commands
- `npm run clean:all` - Remove all build artifacts and dependencies
- `npm run docker:clean` - Clean Docker resources

### Debugging

1. **Container Logs**
   ```bash
   # View all logs
   ./scripts/dev logs
   
   # Follow logs in real-time
   ./scripts/dev logs -f
   ```

2. **Node.js Debugging**
   - Debug port 9229 is exposed by default
   - Use Chrome DevTools or VS Code debugger
   - Connect to `localhost:9229`

3. **Container Shell**
   ```bash
   ./scripts/dev shell
   ```

4. **Health Checks**
   ```bash
   ./scripts/dev status
   ```

### Best Practices

1. **Docker Development**
   - Use `npm run dev:docker` for daily development
   - Run `npm run dev:fresh` after dependency changes
   - Keep the logs open in a separate terminal
   - Use `./scripts/dev shell` for running commands

2. **Code Quality**
   - Run `npm run prepare` before committing
   - Keep TypeScript types strict
   - Format code consistently
   - Fix type errors immediately

3. **Performance**
   - Let Docker cache do its job (avoid unnecessary rebuilds)
   - Use volume mounts for development
   - Keep node_modules in Docker volume

4. **Troubleshooting**
   - Check logs first (`./scripts/dev logs`)
   - Verify container health (`./scripts/dev status`)
   - Try a fresh start (`npm run dev:fresh`)
   - Clean everything as last resort (`npm run clean:all`)

## Project Structure

```
contentful-mux-nextjs-starter/
├── docker/                    # Docker-related files
│   ├── Dockerfile           # Development Dockerfile
│   └── docker-compose.yml   # Development compose configuration
├── scripts/                   # Management scripts
│   └── dev                  # Development environment management
├── src/                      # Application source code
│   ├── app/                 # Next.js app router files
│   ├── components/          # Reusable React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and libraries
│   └── styles/              # CSS and styling files
├── .env.development         # Development environment variables
├── .env.example            # Template for environment variables
├── package.json            # Node.js dependencies and scripts
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

2. Copy the example environment file:
   ```bash
   cp .env.example .env.development
   ```

3. Start the development environment:
   ```bash
   npm run dev:docker
   ```

   Or use the development script:
   ```bash
   ./scripts/dev start
   ```

The application will be available at http://localhost:3000.

## Available npm Scripts

- `npm run dev` - Start the Next.js development server locally
- `npm run dev:docker` - Start the development environment in Docker
- `npm run dev:docker-build` - Build and start the development environment in Docker
- `npm run docker:down` - Stop the Docker containers
- `npm run docker:clean` - Stop and remove Docker containers and volumes
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

The application uses environment variables for configuration. Copy `.env.example` to `.env.development` and update the values:

- `CONTENTFUL_SPACE_ID` - Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Your Contentful access token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` - Your Contentful preview access token
- `MUX_TOKEN_ID` - Your Mux token ID
- `MUX_TOKEN_SECRET` - Your Mux token secret

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Mux Documentation](https://docs.mux.com/)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
