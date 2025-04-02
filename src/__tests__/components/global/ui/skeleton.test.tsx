import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton component', () => {
  it('renders correctly with default props', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toBeDefined();
    expect(skeleton.className).toContain('animate-pulse');
    expect(skeleton.className).toContain('rounded-md');
    expect(skeleton.className).toContain('bg-primary/10');
  });

  it('applies custom className correctly', () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton.className).toContain('custom-class');
    expect(skeleton.className).toContain('animate-pulse');
  });

  it('passes additional props correctly', () => {
    render(<Skeleton data-testid="skeleton" aria-label="Loading" />);
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveAttribute('aria-label', 'Loading');
  });
});
