import { describe, it, expect, vi, afterEach } from 'vitest';
// z is used in the mocked environment
// import { z } from 'zod';

// Create a mock implementation of createEnv
vi.mock('@t3-oss/env-nextjs', () => {
  return {
    createEnv: vi.fn((config: {
      server?: Record<string, unknown>;
      client?: Record<string, unknown>;
      runtimeEnv: Record<string, string | undefined>;
      emptyStringAsUndefined?: boolean;
      skipValidation?: boolean;
    }) => {
      // Process the environment variables based on the config
      const env: Record<string, unknown> = {};
      
      // Handle server-side environment variables
      if (config.server) {
        Object.entries(config.server as Record<string, unknown>).forEach(([key, schema]) => {
          try {
            if (config.emptyStringAsUndefined && config.runtimeEnv[key] === '') {
              // Treat empty string as undefined when emptyStringAsUndefined is true
              env[key] = undefined;
            } else if (config.skipValidation) {
              // Skip validation if specified
              env[key] = config.runtimeEnv[key];
            } else {
              // Validate using the schema
              // @ts-expect-error - schema is a Zod schema
              env[key] = schema.parse(config.runtimeEnv[key]);
            }
          } catch (_error) {
            if (!config.skipValidation) {
              throw new Error(`Invalid environment variable: ${key}`);
            }
            env[key] = config.runtimeEnv[key];
          }
        });
      }
      
      // Handle client-side environment variables
      if (config.client) {
        Object.entries(config.client).forEach(([key, schema]) => {
          try {
            if (config.emptyStringAsUndefined && config.runtimeEnv[key] === '') {
              env[key] = undefined;
            } else if (config.skipValidation) {
              env[key] = config.runtimeEnv[key];
            } else {
              // @ts-expect-error - schema is a Zod schema
              env[key] = schema.parse(config.runtimeEnv[key]);
            }
          } catch (_error) {
            if (!config.skipValidation) {
              throw new Error(`Invalid environment variable: ${key}`);
            }
            env[key] = config.runtimeEnv[key];
          }
        });
      }
      
      return env;
    })
  };
});

describe('Environment Configuration', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });
  
  it('validates NODE_ENV correctly', async () => {
    // Set up environment variables
    vi.stubEnv('NODE_ENV', 'development');
    
    // Import the env module (must be done after stubbing)
    const { env } = await import('@/env');
    
    // Verify the env object contains the expected values
    expect(env).toHaveProperty('NODE_ENV', 'development');
  });
  
  it('throws an error for invalid NODE_ENV when validation is not skipped', async () => {
    // Set up invalid environment variable
    vi.stubEnv('NODE_ENV', 'invalid-env');
    vi.stubEnv('SKIP_ENV_VALIDATION', '');
    
    // Expect the import to throw an error
    await expect(async () => {
      await import('@/env');
    }).rejects.toThrow('Invalid environment variable');
  });
  
  it('allows invalid NODE_ENV when validation is skipped', async () => {
    // Set up invalid environment variable but skip validation
    vi.stubEnv('NODE_ENV', 'invalid-env');
    vi.stubEnv('SKIP_ENV_VALIDATION', 'true');
    
    // Import should not throw when validation is skipped
    const envModule = await import('@/env');
    expect(envModule).toBeDefined();
    expect(envModule.env).toHaveProperty('NODE_ENV', 'invalid-env');
  });
  
  it('treats empty strings as undefined when emptyStringAsUndefined is true', async () => {
    // Set up environment with empty string
    vi.stubEnv('NODE_ENV', '');
    vi.stubEnv('SKIP_ENV_VALIDATION', 'true');
    
    // Import the module (with validation skipped to avoid errors)
    const { env } = await import('@/env');
    
    // The empty string should be treated as undefined
    expect(env.NODE_ENV).toBeUndefined();
  });
});
