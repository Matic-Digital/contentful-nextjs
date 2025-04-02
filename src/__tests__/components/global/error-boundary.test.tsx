import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

// Mock console.error to avoid test output pollution
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders fallback when provided and an error occurs', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    const fallback = <div data-testid="fallback">Fallback Content</div>;

    render(
      <ErrorBoundary fallback={fallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.getByText('Fallback Content')).toBeInTheDocument();
  });

  it('renders default error UI when no fallback is provided and an error occurs', () => {
    const ErrorComponent = () => {
      throw new Error('Test error message');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Refresh page')).toBeInTheDocument();
  });

  it('resets the error state when "Try again" button is clicked', () => {
    let shouldThrow = true;

    const ToggleErrorComponent = () => {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div data-testid="recovered">Recovered Content</div>;
    };

    render(
      <ErrorBoundary>
        <ToggleErrorComponent />
      </ErrorBoundary>
    );

    // Verify error UI is shown
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Simulate fixing the error
    shouldThrow = false;

    // Click the "Try again" button
    fireEvent.click(screen.getByText('Try again'));

    // Verify component recovered
    expect(screen.getByTestId('recovered')).toBeInTheDocument();
    expect(screen.getByText('Recovered Content')).toBeInTheDocument();
  });

  it('refreshes the page when the Refresh page button is clicked', () => {
    // Mock window.location.reload
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true
    });

    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    // Error boundary should show the error UI
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click the refresh page button
    fireEvent.click(screen.getByText('Refresh page'));

    // Verify that window.location.reload was called
    expect(reloadMock).toHaveBeenCalled();
  });

  it('handles window error events', () => {
    // Mock console.error to verify it's called
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockClear(); // Clear previous calls

    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    // Simulate a window error event
    const errorEvent = new ErrorEvent('error', {
      error: new Error('Test window error'),
      message: 'Test window error message'
    });
    window.dispatchEvent(errorEvent);

    // Verify that the error was logged
    expect(errorSpy).toHaveBeenCalledWith('Client error:', expect.any(Error));
  });

  it('logs errors in componentDidCatch', () => {
    // Mock console.error to verify it's called
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockClear(); // Clear previous calls

    const ErrorComponent = () => {
      throw new Error('Test componentDidCatch error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    // Verify that componentDidCatch logged the error
    expect(errorSpy).toHaveBeenCalledWith(
      'Component error:',
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.stringContaining('') })
    );
  });
});
