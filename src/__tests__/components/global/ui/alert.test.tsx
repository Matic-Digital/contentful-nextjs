import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

describe('Alert component', () => {
  it('renders correctly with default props', () => {
    render(<Alert>Alert content</Alert>);
    const alert = screen.getByRole('alert');
    
    expect(alert).toBeDefined();
    expect(alert.textContent).toBe('Alert content');
    expect(alert.className).toContain('bg-background');
  });

  it('applies custom className correctly', () => {
    render(<Alert className="custom-class">Alert content</Alert>);
    const alert = screen.getByRole('alert');
    
    expect(alert.className).toContain('custom-class');
  });

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive">Alert content</Alert>);
    const alert = screen.getByRole('alert');
    
    expect(alert.className).toContain('border-destructive/50');
    expect(alert.className).toContain('text-destructive');
  });

  it('renders with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByRole('alert');
    const title = screen.getByText('Alert Title');
    const description = screen.getByText('Alert Description');
    
    expect(alert).toBeDefined();
    expect(title.tagName).toBe('H5');
    expect(title.className).toContain('font-medium');
    expect(description).toBeDefined();
    expect(description.className).toContain('text-sm');
  });
});
