import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toaster } from '@/components/ui/toaster';

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toasts: [
      {
        id: '1',
        title: 'Test Toast Title',
        description: 'Test Toast Description',
        action: <button>Action</button>
      },
      {
        id: '2',
        title: 'Another Toast',
        variant: 'destructive'
      }
    ]
  })
}));

// Mock the toast components
vi.mock('@/components/ui/toast', () => ({
  Toast: ({ children, ...props }: any) => (
    <div data-testid="toast" className={props.variant ? `toast-${props.variant}` : 'toast'}>
      {children}
    </div>
  ),
  ToastClose: () => <button data-testid="toast-close">Close</button>,
  ToastDescription: ({ children }: any) => <div data-testid="toast-description">{children}</div>,
  ToastTitle: ({ children }: any) => <div data-testid="toast-title">{children}</div>,
  ToastProvider: ({ children }: any) => <div data-testid="toast-provider">{children}</div>,
  ToastViewport: () => <div data-testid="toast-viewport" />
}));

describe('Toaster component', () => {
  it('renders correctly with mocked toasts', () => {
    render(<Toaster />);

    // Check if the provider is rendered
    expect(screen.getByTestId('toast-provider')).toBeDefined();

    // Check if the viewport is rendered
    expect(screen.getByTestId('toast-viewport')).toBeDefined();

    // Check if toasts are rendered with all their parts
    const toasts = screen.getAllByTestId('toast');
    expect(toasts.length).toBe(2);
    expect(screen.getByText('Test Toast Title')).toBeDefined();
    expect(screen.getByText('Test Toast Description')).toBeDefined();
    expect(screen.getByText('Action')).toBeDefined();
    expect(screen.getByText('Another Toast')).toBeDefined();

    // Check if close buttons are rendered for both toasts
    const closeButtons = screen.getAllByTestId('toast-close');
    expect(closeButtons.length).toBe(2);
  });
});
