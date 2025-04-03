import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '@/components/global/Header';

// Mock next/navigation
const usePathnameMock = vi.fn(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock()
}));

// Mock the ThemeToggle component
vi.mock('@/components/global/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

// Mock the Logo component
vi.mock('@/components/global/Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>
}));

describe('Header', () => {
  it('renders the header with logo', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    render(<Header />);

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('renders navigation menu on desktop', () => {
    render(<Header />);

    // Check for navigation menu
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check for Home link
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    // Check that it has active state when on home page
    expect(homeLink).toHaveAttribute('data-active', 'true');
  });

  it('renders hamburger menu on mobile', () => {
    // Mock window.innerWidth to simulate mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Header />);

    // Check for hamburger menu button
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    // Mock window.innerWidth to simulate mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Header />);

    // Click the hamburger menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // Check that mobile menu is now visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Check for mobile navigation links
    // Note: We can't easily test the mobile menu content due to the SheetClose component
    // wrapping the links, so we'll just verify the dialog is open
  });

  it('changes active link based on current path', () => {
    // Update the mock to return a different path
    usePathnameMock.mockReturnValue('/different-page');

    render(<Header />);

    // Check that Home link is not active
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).not.toHaveAttribute('data-active');
  });
});
