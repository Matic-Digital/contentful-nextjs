// Import jest-dom matchers
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Set up any global test environment configuration here
global.ResizeObserver = class ResizeObserver {
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
};

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/mock-path',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID = 'mock-space-id';
process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN = 'mock-access-token';
process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN = 'mock-preview-token';
