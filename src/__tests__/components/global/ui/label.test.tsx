import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label component', () => {
  it('renders correctly with default props', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    
    expect(label).toBeDefined();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className correctly', () => {
    render(<Label className="custom-class" data-testid="test-label">Test Label</Label>);
    const label = screen.getByTestId('test-label');
    
    expect(label.className).toContain('custom-class');
  });

  it('works with form controls', () => {
    render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" data-testid="test-input" />
      </>
    );
    
    const label = screen.getByText('Test Label');
    const input = screen.getByTestId('test-input');
    
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });
});
