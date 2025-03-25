/**
 * Exit Preview API Route Tests
 * 
 * This test suite verifies the functionality of the exit preview API route which disables
 * Contentful's preview mode for the application. The exit preview route is an important
 * component that allows content editors to exit the draft content preview mode and return
 * to the published content view.
 * 
 * Key aspects tested:
 * - Proper disabling of Next.js draft mode
 * - Correct redirection after exiting preview mode
 * - Handling of redirect path parameters
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/exit-preview/route';
import { NextRequest } from 'next/server';

// Mock the next/headers module
vi.mock('next/headers', () => ({
  draftMode: vi.fn(() => ({
    enable: vi.fn(),
    disable: vi.fn(),
  })),
}));

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Import the redirect function after mocking
import { redirect } from 'next/navigation';

describe('Exit Preview API Route', () => {
  // Create a mock request function
  const createMockRequest = (params: Record<string, string> = {}) => {
    const url = new URL('https://example.com/api/exit-preview');
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    return new NextRequest(url);
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('disables draft mode and redirects to home page by default', async () => {
    const request = createMockRequest();
    await GET(request);
    
    // Check that redirect was called with the home page path
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('redirects to the specified slug when provided', async () => {
    const request = createMockRequest({ slug: '/about' });
    await GET(request);
    
    // Check that redirect was called with the specified path
    expect(redirect).toHaveBeenCalledWith('/about');
  });

  it('handles slugs with query parameters correctly', async () => {
    const request = createMockRequest({ slug: '/about?section=team' });
    await GET(request);
    
    // Check that redirect was called with the full path including query parameters
    expect(redirect).toHaveBeenCalledWith('/about?section=team');
  });
});
