import { describe, it, expect } from 'vitest';
import {
  ContentfulError,
  NetworkError,
  GraphQLError,
  ValidationError,
  ResourceNotFoundError,
  isContentfulError,
  isNetworkError,
  isGraphQLError,
  isValidationError,
  isResourceNotFoundError
} from '@/lib/errors';

describe('Custom error classes', () => {
  describe('ContentfulError', () => {
    it('creates a ContentfulError instance with correct properties', () => {
      const error = new ContentfulError('Content fetch failed', { code: 404 });
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ContentfulError);
      expect(error.name).toBe('ContentfulError');
      expect(error.message).toBe('Content fetch failed');
      expect(error.details).toEqual({ code: 404 });
    });
  });

  describe('NetworkError', () => {
    it('creates a NetworkError instance with correct properties', () => {
      const mockResponse = { status: 500 } as Response;
      const error = new NetworkError('Network request failed', mockResponse);
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NetworkError);
      expect(error.name).toBe('NetworkError');
      expect(error.message).toBe('Network request failed');
      expect(error.response).toBe(mockResponse);
    });
  });

  describe('GraphQLError', () => {
    it('creates a GraphQLError instance with correct properties', () => {
      const graphqlErrors = [{ message: 'Invalid query' }];
      const error = new GraphQLError('GraphQL request failed', graphqlErrors);
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error.name).toBe('GraphQLError');
      expect(error.message).toBe('GraphQL request failed');
      expect(error.errors).toEqual(graphqlErrors);
    });
  });

  describe('ValidationError', () => {
    it('creates a ValidationError instance with correct properties', () => {
      const error = new ValidationError('Invalid email format', 'email');
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe('Invalid email format');
      expect(error.field).toBe('email');
    });
  });

  describe('ResourceNotFoundError', () => {
    it('creates a ResourceNotFoundError instance with correct properties', () => {
      const error = new ResourceNotFoundError('Article not found', 'article');
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ResourceNotFoundError);
      expect(error.name).toBe('ResourceNotFoundError');
      expect(error.message).toBe('Article not found');
      expect(error.resource).toBe('article');
    });
  });
});

describe('Error type guards', () => {
  it('isContentfulError correctly identifies ContentfulError instances', () => {
    const contentfulError = new ContentfulError('Content error');
    const otherError = new Error('Generic error');
    
    expect(isContentfulError(contentfulError)).toBe(true);
    expect(isContentfulError(otherError)).toBe(false);
    expect(isContentfulError(null)).toBe(false);
    expect(isContentfulError(undefined)).toBe(false);
  });

  it('isNetworkError correctly identifies NetworkError instances', () => {
    const networkError = new NetworkError('Network error');
    const otherError = new Error('Generic error');
    
    expect(isNetworkError(networkError)).toBe(true);
    expect(isNetworkError(otherError)).toBe(false);
    expect(isNetworkError(null)).toBe(false);
  });

  it('isGraphQLError correctly identifies GraphQLError instances', () => {
    const graphqlError = new GraphQLError('GraphQL error', [{ message: 'Error' }]);
    const otherError = new Error('Generic error');
    
    expect(isGraphQLError(graphqlError)).toBe(true);
    expect(isGraphQLError(otherError)).toBe(false);
    expect(isGraphQLError(null)).toBe(false);
  });

  it('isValidationError correctly identifies ValidationError instances', () => {
    const validationError = new ValidationError('Validation error');
    const otherError = new Error('Generic error');
    
    expect(isValidationError(validationError)).toBe(true);
    expect(isValidationError(otherError)).toBe(false);
    expect(isValidationError(null)).toBe(false);
  });

  it('isResourceNotFoundError correctly identifies ResourceNotFoundError instances', () => {
    const notFoundError = new ResourceNotFoundError('Not found', 'article');
    const otherError = new Error('Generic error');
    
    expect(isResourceNotFoundError(notFoundError)).toBe(true);
    expect(isResourceNotFoundError(otherError)).toBe(false);
    expect(isResourceNotFoundError(null)).toBe(false);
  });
});
