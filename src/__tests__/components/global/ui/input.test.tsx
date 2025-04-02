import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

describe('Input component', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');

    expect(input).toBeDefined();
    expect(input.tagName).toBe('INPUT');
  });

  it('applies custom className correctly', () => {
    render(<Input className="custom-class" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    expect(input.className).toContain('custom-class');
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    await user.type(input, 'Hello, world!');
    expect(input).toHaveValue('Hello, world!');
  });

  it('passes type attribute correctly', () => {
    render(<Input type="password" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    expect(input).toHaveAttribute('type', 'password');
  });
});
