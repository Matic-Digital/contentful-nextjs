/**
 * NavBar Component Tests
 * 
 * This test suite verifies the functionality of the NavBar component which displays
 * navigation menus from Contentful. It tests the component's rendering behavior with
 * different prop configurations and ensures it correctly integrates with Contentful's
 * Live Preview functionality.
 * 
 * The NavBar component is a critical part of the site's navigation system, displaying
 * a structured menu of links to pages and page lists defined in Contentful. It supports
 * both simple links and nested dropdown menus for page lists.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NavBar } from '@/components/global/NavBar';
import type { NavBar as NavBarType, Page, PageList } from '@/types/contentful';

/**
 * Mock Next.js hooks
 * 
 * Mocks the usePathname hook to simulate the current URL path for testing
 * active link highlighting in the navigation.
 */
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
}));

/**
 * Mock Contentful Live Preview hooks
 * 
 * These mocks simulate the behavior of Contentful's Live Preview functionality,
 * which allows real-time content updates in the preview environment. The mocks
 * ensure tests can run without requiring an actual connection to Contentful.
 */
vi.mock('@contentful/live-preview/react', () => ({
  useContentfulLiveUpdates: vi.fn(<T extends Record<string, unknown>>(props: T): T => props),
  useContentfulInspectorMode: vi.fn(() => (fieldProps: { fieldId: string }): { fieldId: string } => ({ fieldId: fieldProps.fieldId })),
}));

/**
 * Mock Next.js Link component
 * 
 * Provides a simplified version of the Next.js Link component for testing.
 * This allows tests to verify link behavior without requiring the full Next.js
 * router implementation.
 */
vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

/**
 * Mock Next.js Image component
 * 
 * Replaces the Next.js Image component with a standard img element for testing.
 * This simplifies testing by avoiding the complexity of Next.js image optimization.
 */
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
      data-testid="next-image"
    />
  ),
}));

/**
 * Mock ErrorBoundary component
 * 
 * Provides a simplified version of the ErrorBoundary component for testing.
 * This allows tests to focus on the NavBar component's behavior without
 * being affected by error handling logic.
 */
vi.mock('@/components/global/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('NavBar Component', () => {
  /**
   * Create a mock NavBar with minimal required props
   * 
   * This function generates a mock NavBar object with the minimum required properties
   * for testing. It can be extended with additional props as needed for specific tests.
   */
  const createMockNavBar = (overrides = {}): NavBarType => ({
    sys: { id: 'test-navbar-id' },
    name: 'Test NavBar',
    logo: {
      sys: { id: 'logo-id' },
      url: 'https://example.com/logo.png',
      title: 'Test Logo',
      width: 150,
      height: 50,
    },
    navLinksCollection: {
      items: [],
    },
    ...overrides,
  });

  /**
   * Create mock Page and PageList items
   * 
   * These functions generate mock Page and PageList objects for testing. They can be
   * extended with additional props as needed for specific tests.
   */
  const createMockPage = (overrides = {}): Page => ({
    sys: { id: `page-${Math.random()}` },
    name: 'Test Page',
    slug: 'test-page',
    ...overrides,
  });

  const createMockPageList = (overrides = {}): PageList => ({
    sys: { id: `pagelist-${Math.random()}` },
    name: 'Test Page List',
    slug: 'test-page-list',
    pagesCollection: {
      items: [
        createMockPage({ name: 'Page 1', slug: 'page-1' }),
        createMockPage({ name: 'Page 2', slug: 'page-2' }),
      ],
    },
    ...overrides,
  });

  it('renders the NavBar with logo', () => {
    const mockNavBar = createMockNavBar();
    render(<NavBar {...mockNavBar} />);
    
    // Check for logo
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByTestId('next-link')).toHaveAttribute('href', '/');
  });

  it('renders navigation links', () => {
    const mockNavBar = createMockNavBar({
      navLinksCollection: {
        items: [
          createMockPage({ name: 'About', slug: 'about' }),
          createMockPage({ name: 'Contact', slug: 'contact' }),
        ],
      },
    });
    
    render(<NavBar {...mockNavBar} />);
    
    // Check for navigation links
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders page lists with dropdown', () => {
    const mockNavBar = createMockNavBar({
      navLinksCollection: {
        items: [
          createMockPageList({
            name: 'Services',
            slug: 'services',
          }),
        ],
      },
    });
    
    render(<NavBar {...mockNavBar} />);
    
    // Check for the page list trigger
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('handles null or undefined items in navLinksCollection', () => {
    const mockNavBar = createMockNavBar({
      navLinksCollection: {
        items: [null, undefined, createMockPage({ name: 'Valid Page', slug: 'valid' })],
      },
    });
    
    render(<NavBar {...mockNavBar} />);
    
    // Should render the valid page without errors
    expect(screen.getByText('Valid Page')).toBeInTheDocument();
  });

  it('returns null when sys.id is missing', () => {
    // Create a NavBar without sys.id
    const invalidNavBar = {
      name: 'Invalid NavBar',
      logo: {
        url: 'https://example.com/logo.png',
      },
      navLinksCollection: {
        items: [],
      },
    } as unknown as NavBarType;
    
    const { container } = render(<NavBar {...invalidNavBar} />);
    
    // Component should render nothing
    expect(container.firstChild).toBeNull();
  });
});
