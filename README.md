# Contentful Mux Next.js Starter

This is a starter template for building a blog with Next.js, Contentful, and Mux. It includes a Docker-based development workflow for a consistent development experience across teams.

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

#### Docker Development

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

### Development Commands

#### Docker Commands
- `npm run dev:docker` - Start development environment
- `npm run dev:fresh` - Clean start (useful after dependency changes)
- `npm run docker:clean` - Remove containers and volumes
- `./scripts/dev logs` - View container logs
- `./scripts/dev shell` - Open shell in container
- `./scripts/dev status` - Check container status

### Debugging

1. **Container Logs**
   ```bash
   # View all logs
   ./scripts/dev logs
   
   # Follow logs in real-time
   ./scripts/dev logs -f
   ```

2. **Container Shell**
   ```bash
   ./scripts/dev shell
   ```

3. **Health Checks**
   ```bash
   ./scripts/dev status
   ```

### Best Practices

1. **Docker Development**
   - Use `npm run dev:docker` for daily development
   - Run `npm run dev:fresh` after dependency changes
   - Keep the logs open in a separate terminal
   - Use `./scripts/dev shell` for running commands

2. **Performance**
   - Let Docker cache do its job (avoid unnecessary rebuilds)
   - Use volume mounts for development
   - Keep node_modules in Docker volume

3. **Troubleshooting**
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

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
