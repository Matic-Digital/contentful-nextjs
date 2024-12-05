# Contentful Mux Next.js Starter

This is a starter template for building a blog with Next.js, Contentful, and Mux. It includes a Docker-based development workflow for a consistent development experience across teams.

## Prerequisites

- Docker Desktop installed and running
- Git

No other local dependencies are required! Everything runs inside Docker containers.

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

### Docker Development

Our Docker setup provides a consistent development environment with:

- 🔥 Hot-reloading for instant feedback
- 📦 Cached node_modules for faster builds
- 🛠️ Built-in debugging support
- 🔍 Health checks for reliability
- 👤 Secure non-root user setup

#### Docker Commands

```bash
# Start development server
npm run docker:start

# Build the application
npm run docker:build

# Run linting and type checking
npm run docker:check

# Stop the development server
npm run docker:down

# Clean up containers and volumes
npm run docker:clean

# Remove all Matic Docker resources
npm run docker:purge
```

#### Development Features

- **Hot Reloading**: Changes to your code will automatically trigger rebuilds
- **Container Management**: 
  - The container is named `Matic-Docker-App` for easy identification
  - Volumes are prefixed with `matic-docker-` for organization
- **Automatic Cleanup**: 
  - Pressing Ctrl+C during development automatically cleans up resources
  - `docker:check` automatically manages container lifecycle
- **Development Tools**:
  - Access container shell: `./scripts/dev shell`
  - View logs: `./scripts/dev logs`
  - Check status: `./scripts/dev status`

#### Best Practices

1. **Development Workflow**
   - Use `npm run docker:start` for daily development
   - Run `npm run docker:check` before committing changes
   - Keep the logs visible for debugging

2. **Resource Management**
   - Use `npm run docker:clean` to clean up after development
   - Use `npm run docker:purge` when switching branches or for deep cleaning

3. **Troubleshooting**
   - Check container status with `./scripts/dev status`
   - View logs with `./scripts/dev logs`
   - If in doubt, run `npm run docker:purge` and start fresh

### Non-Docker Development

If you prefer to develop without Docker, you'll need:
- Node.js (version specified in package.json)
- npm (version specified in package.json)

Then you can use these commands:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the application
npm run build

# Run linting and type checking
npm run check
```

## Project Structure

```
contentful-mux-nextjs-starter/
├── docker/                    # Docker-related files
│   ├── Dockerfile           # Development Dockerfile
│   └── docker-compose.yml   # Development compose configuration
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

## Project Standards

https://github.com/alan2207/bulletproof-react/blob/master/docs/project-standards.md

- ESlint
  - file naming conventions
- Prettier
- TypeScript
- Husky
  - pre-commit hooks
- absolute imports
  - tsconfig.json

## Project Structure

https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md

## Components and Styling

https://github.com/alan2207/bulletproof-react/blob/master/docs/components-and-styling.md

- shadcn/ui for UI components
  - Radix Primitives
  - TailwindCSS
  - components.json for configuration

## API Layer

https://github.com/alan2207/bulletproof-react/blob/master/docs/api-layer.md

- **Contentful** GraphQL Content Delivery API
  - fetchGraphQL function
  - custom getters
  - custom server side functions
- **Tanstack Query**
  - uses api fucntions custom client hooks
- **Mux** for video streaming
  - the plabackId from the Contentful API
  - the muxData from the Mux API

## Data Fetching

- **React Query** for data fetching
- **React Query DevTools** for debugging

## State Management

https://github.com/alan2207/bulletproof-react/blob/master/docs/state-management.md

- **useState** for component state
- **Jotai** for application state management
- **Jotai DevTools** for debugging

## Form Validation and State Management

- **@tanstack/react-form** for form state management
- **@tanstack/zod-form-adapter** for form validation

## Error Handling

https://github.com/alan2207/bulletproof-react/blob/master/docs/error-handling.md

- **API Errors** for server-side errors
- **React Error Boundary** for component-level error handling
- **ErrorPage** for custom error pages

## Testing

TBD
https://github.com/alan2207/bulletproof-react/blob/master/docs/testing.md

## Security (Authentication and Authorization)

https://github.com/alan2207/bulletproof-react/blob/master/docs/security.md
TBD

## Deployment

https://github.com/alan2207/bulletproof-react/blob/master/docs/deployment.md

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
