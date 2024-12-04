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
- `npm run clean:all` - Clean everything (node_modules, .next, containers)

### Debugging

1. **Container Logs**

   ```bash
   ./scripts/dev logs
   ```

2. **Container Shell**

   ```bash
   ./scripts/dev shell
   ```

3. **Health Checks**
   ```bash
   docker compose -f docker/docker-compose.yml ps
   ```

### Best Practices

1. **Docker Development**

   - Use `npm run dev:docker` for daily development
   - Run `npm run dev:fresh` after dependency changes
   - Keep the logs open in a separate terminal

2. **Performance**

   - Let Docker cache do its job (avoid unnecessary rebuilds)
   - Use volume mounts for development
   - Keep node_modules in Docker volume

3. **Troubleshooting**
   - Check logs first (`./scripts/dev logs`)
   - Try a fresh start (`npm run dev:fresh`)
   - Clean everything as last resort (`npm run clean:all`)

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
