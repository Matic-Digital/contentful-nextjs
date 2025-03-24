import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea component', () => {
  it('renders correctly with default props', () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    
    expect(textarea).toBeDefined();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('applies custom className correctly', () => {
    render(<Textarea className="custom-class" data-testid="test-textarea" />);
    const textarea = screen.getByTestId('test-textarea');
    
    expect(textarea.className).toContain('custom-class');
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="test-textarea" />);
    const textarea = screen.getByTestId('test-textarea');
    
    await user.type(textarea, 'Hello, world!');
    expect(textarea).toHaveValue('Hello, world!');
  });

  it('passes additional props correctly', () => {
    render(
      <Textarea 
        data-testid="test-textarea" 
        rows={5} 
        maxLength={100} 
        aria-label="Description"
      />
    );
    const textarea = screen.getByTestId('test-textarea');
    
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('maxlength', '100');
    expect(textarea).toHaveAttribute('aria-label', 'Description');
  });
});
