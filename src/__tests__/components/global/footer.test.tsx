import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Footer } from '@/components/global/Footer';

// Mock the Logo component
vi.mock('@/components/global/Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

// Mock the current year for consistent testing
const mockDate = new Date(2025, 2, 19);
const originalDate = global.Date;

describe('Footer', () => {
  beforeEach(() => {
    // Mock Date constructor to return fixed date
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
      
      // Mock getFullYear to return consistent year for testing
      getFullYear() {
        return 2025;
      }
    } as typeof global.Date;
  });

  afterEach(() => {
    // Restore original Date
    global.Date = originalDate;
  });

  it('renders the footer with logo', () => {
    render(<Footer />);
    
    // Check for logo
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('displays the company description', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Modern blog platform built with Next.js, Contentful and Mux/i)).toBeInTheDocument();
  });

  it('renders all footer sections', () => {
    render(<Footer />);
    
    // Check for section headings
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    
    // Check for specific links
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
  });

  it('displays the current year in the copyright notice', () => {
    render(<Footer />);
    
    expect(screen.getByText(/2025 Matic. All rights reserved./i)).toBeInTheDocument();
  });
});
