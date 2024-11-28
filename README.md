# Contentful Next.js Starter

This is a starter template for building a blog with Next.js and Contentful. It includes a modern Docker-based development workflow for a consistent development experience across teams.

## Prerequisites

- Docker Desktop installed and running
- Git

No other local dependencies are required!

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contentful-nextjs-starter
   ```

2. Run the setup script:
   ```bash
   ./dev setup
   ```

3. Update `.env.development` with your Contentful credentials:
   ```
   CONTENTFUL_SPACE_ID="your Space ID"
   CONTENTFUL_ACCESS_TOKEN="Content Delivery API token"
   CONTENTFUL_PREVIEW_ACCESS_TOKEN="Content Preview API token"
   CONTENTFUL_PREVIEW_SECRET="any URL friendly value of your choice"
   ```

4. The application will be running at [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Available Commands

```bash
./dev setup     # First-time setup (creates .env.development, builds containers)
./dev start     # Start the development environment
./dev stop      # Stop the development environment
./dev restart   # Restart the development environment
./dev logs      # Show logs (with optional container name)
./dev status    # Show status of containers
./dev shell     # Open a shell in the web container
./dev clean     # Remove all containers, volumes, and images
./dev help      # Show help message
```

### Development Features

- 🔥 Hot-reloading enabled for rapid development
- 🐳 Containerized environment with Node.js 20
- 📦 Volume mounts for persistent development
- 🛠️ Streamlined commands for common tasks
- 🔍 Built-in logging and debugging tools

### Best Practices

1. **Environment Variables**:
   - Never commit `.env.development` to version control
   - Keep `.env.example` updated with all required variables
   - Use `NEXT_PUBLIC_` prefix for client-side variables

2. **Docker Workflow**:
   - Use `./dev shell` to run commands inside the container
   - Check logs with `./dev logs` when troubleshooting
   - Use `./dev clean` to reset your environment if needed

### Troubleshooting

1. **Container won't start**:
   - Check if Docker Desktop is running
   - Run `./dev clean` followed by `./dev setup`
   - Verify your Contentful credentials in `.env.development`

2. **Changes not reflecting**:
   - Ensure you're editing files in your local directory
   - Check logs with `./dev logs` for errors
   - Try `./dev restart` to restart the development server

3. **Port conflicts**:
   - Ensure no other service is using port 3000
   - Stop other Docker containers that might use the same port

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
