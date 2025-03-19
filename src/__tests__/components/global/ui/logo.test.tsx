import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/global/Logo';

// Mock the next/link component
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ href, children, className }: any) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  };
});

describe('Logo component', () => {
  it('renders correctly', () => {
    render(<Logo />);
    
    // Check for the Matic text
    const logoText = screen.getByText('Matic');
    expect(logoText).toBeDefined();
    
    // Check for the decorative text
    const decorativeElement = screen.getByText('|||');
    expect(decorativeElement).toBeDefined();
    
    // Check that it's wrapped in a link to the homepage
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
