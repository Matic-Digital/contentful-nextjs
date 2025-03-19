import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from '@/lib/api';
import { ContentfulError, NetworkError, GraphQLError } from '@/lib/errors';

// Mock environment variables
vi.stubEnv('NEXT_PUBLIC_CONTENTFUL_SPACE_ID', 'mock-space-id');
vi.stubEnv('NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN', 'mock-access-token');
vi.stubEnv('NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN', 'mock-preview-token');

// Mock global fetch
const originalFetch = global.fetch;

describe('API Module', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
    
    // Mock fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore original fetch after each test
    global.fetch = originalFetch;
    
    // Clear environment variable stubs
    vi.unstubAllEnvs();
  });

  describe('fetchGraphQL', () => {
    it('makes a request to the correct Contentful endpoint with proper headers', async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { test: 'data' } }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const query = '{ test { field } }';
      const variables = { id: '123' };
      
      await api.fetchGraphQL(query, variables);

      // Verify fetch was called with correct arguments
      expect(global.fetch).toHaveBeenCalledWith(
        'https://graphql.contentful.com/content/v1/spaces/mock-space-id',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-access-token',
          },
          body: JSON.stringify({ query, variables }),
          next: undefined,
        }
      );
    });

    it('uses preview token when preview is true', async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { test: 'data' } }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const query = '{ test { field } }';
      await api.fetchGraphQL(query, {}, true);

      // Verify preview token was used
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-preview-token',
          }),
        })
      );
    });

    it('includes cache configuration when provided', async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { test: 'data' } }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const query = '{ test { field } }';
      const cacheConfig = { next: { revalidate: 60 } };
      
      await api.fetchGraphQL(query, {}, false, cacheConfig);

      // Verify cache config was included
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          next: cacheConfig.next,
        })
      );
    });

    it('returns data when request is successful', async () => {
      const expectedData = { data: { test: 'successful data' } };
      
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(expectedData),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await api.fetchGraphQL('{ test }');
      
      expect(result).toEqual(expectedData);
    });

    it('throws NetworkError when response is not ok', async () => {
      // Mock failed response
      const mockResponse = {
        ok: false,
        statusText: 'Not Found',
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      await expect(api.fetchGraphQL('{ test }')).rejects.toThrow(NetworkError);
      await expect(api.fetchGraphQL('{ test }')).rejects.toThrow('Network error: Not Found');
    });

    it('throws GraphQLError when response contains GraphQL errors', async () => {
      const graphqlErrors = [{ message: 'Invalid field' }];
      
      // Mock response with GraphQL errors
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ 
          errors: graphqlErrors
        }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      await expect(api.fetchGraphQL('{ test }')).rejects.toThrow(GraphQLError);
      await expect(api.fetchGraphQL('{ test }')).rejects.toThrow('GraphQL query execution error');
    });

    it('throws ContentfulError for other errors', async () => {
      // Mock fetch implementation that throws
      (global.fetch as any).mockRejectedValue(new Error('Random error'));

      await expect(api.fetchGraphQL('{ test }')).rejects.toThrow(ContentfulError);
      await expect(api.fetchGraphQL('{ test }')).rejects.toThrow('Failed to fetch data from Contentful');
    });
  });
});
