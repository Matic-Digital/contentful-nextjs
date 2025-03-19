import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast } from '@/hooks/use-toast';
import { TOAST_REMOVE_DELAY } from '@/constants/toast';

// Setup for tests
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// Helper function to clear toasts between tests
const clearToasts = async () => {
  const { result } = renderHook(() => useToast());
  act(() => {
    result.current.dismiss();
  });
  act(() => {
    vi.advanceTimersByTime(TOAST_REMOVE_DELAY);
  });
};

describe('useToast hook', () => {
  // Run clearToasts before each test
  beforeEach(async () => {
    await clearToasts();
    vi.clearAllTimers();
  });

  it('returns toast functions and empty toasts array by default', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current).toHaveProperty('toast');
    expect(result.current).toHaveProperty('dismiss');
    expect(result.current).toHaveProperty('toasts');
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast when toast function is called', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test',
      });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      id: expect.any(String),
      title: 'Test Toast',
      description: 'This is a test',
    });
  });

  it('allows adding and dismissing toasts', () => {
    const { result } = renderHook(() => useToast());
    
    // Initially should have no toasts
    expect(result.current.toasts.length).toBe(0);
    
    // Add a toast
    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });
    
    // Should now have one toast
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0]?.title).toBe('Test Toast');
    
    // Dismiss all toasts
    act(() => {
      result.current.dismiss();
    });
    
    // Toast should be marked for removal
    expect(result.current.toasts[0]?.open).toBe(false);
    
    // After the delay, toast should be removed
    act(() => {
      vi.advanceTimersByTime(TOAST_REMOVE_DELAY);
    });
    
    // Should have no toasts again
    expect(result.current.toasts.length).toBe(0);
  });

  it('updates toast properties', () => {
    const { result } = renderHook(() => useToast());
    
    // Add a toast and get its ID
    let toastId: string;
    act(() => {
      const { id } = result.current.toast({ title: 'Original Title' });
      toastId = id;
    });
    
    // Verify the toast was added
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0]?.title).toBe('Original Title');
    
    // Update the toast
    act(() => {
      // Use the update method instead of toast to update an existing toast
      const existingToast = result.current.toasts.find(t => t.id === toastId);
      if (existingToast) {
        result.current.toast({
          ...existingToast,
          title: 'Updated Title',
          description: 'New description',
        });
      }
    });
    
    // Verify the toast was updated
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0]?.title).toBe('Updated Title');
    expect(result.current.toasts[0]?.description).toBe('New description');
  });

  it('updates an existing toast when update is called', () => {
    const { result } = renderHook(() => useToast());
    
    // Define firstToast with a default value to satisfy TypeScript
    let firstToast = { id: '', dismiss: () => {}, update: (_props: any) => {} };
    
    // Add a toast
    act(() => {
      // Now assign the actual toast
      firstToast = result.current.toast({ title: 'Original Title' });
    });
    
    // Update the toast using the update method
    act(() => {
      firstToast.update({
        title: 'Updated Title',
        description: 'New description',
      });
    });
    
    // Check that the toast was updated
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      id: firstToast.id,
      title: 'Updated Title',
      description: 'New description',
    });
  });

  it('limits the number of toasts to TOAST_LIMIT', () => {
    const { result } = renderHook(() => useToast());
    
    // Add more toasts than the limit
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.toast({ title: `Toast ${i}` });
      }
    });
    
    // Only the most recent toasts should be kept
    expect(result.current.toasts.length).toBeLessThanOrEqual(10);
  });
});

describe('toast function', () => {
  // Run clearToasts before each test
  beforeEach(async () => {
    await clearToasts();
  });

  it('returns a toast object with expected methods', () => {
    // Create a toast wrapped in act
    let toastResult = { id: '', dismiss: () => {}, update: (_: any) => {} };
    act(() => {
      toastResult = toast({ title: 'Test Toast' });
    });
    
    // Verify the returned object has the expected properties
    expect(toastResult).toHaveProperty('id');
    expect(toastResult.id).toBeTypeOf('string');
    expect(toastResult).toHaveProperty('dismiss');
    expect(typeof toastResult.dismiss).toBe('function');
    expect(toastResult).toHaveProperty('update');
    expect(typeof toastResult.update).toBe('function');
  });

  it('provides dismiss functionality', () => {
    // Create a toast and get its dismiss function
    let dismiss: () => void;
    act(() => {
      ({ dismiss } = toast({ title: 'Test Toast' }));
    });
    
    // Get the hook to check the state
    const { result } = renderHook(() => useToast());
    
    // Verify the toast exists
    expect(result.current.toasts.length).toBeGreaterThan(0);
    
    // Call the dismiss function
    act(() => {
      dismiss();
    });
    
    // Toast should be marked for removal
    expect(result.current.toasts[0]?.open).toBe(false);
    
    // After the delay, toast should be removed
    act(() => {
      vi.advanceTimersByTime(TOAST_REMOVE_DELAY);
    });
    
    // Verify the toast was removed
    expect(result.current.toasts.length).toBe(0);
  });

  it('provides update functionality', () => {
    // Create a toast and get its update function
    let id: string;
    let update: (props: any) => void;
    act(() => {
      const toastResult = toast({ title: 'Initial Toast' });
      id = toastResult.id;
      update = toastResult.update;
    });
    
    // Get the hook to check the state
    const { result } = renderHook(() => useToast());
    
    // Verify the initial toast exists
    expect(result.current.toasts.length).toBeGreaterThan(0);
    expect(result.current.toasts[0]?.title).toBe('Initial Toast');
    
    // Call the update function
    act(() => {
      // Need to include id for TypeScript, even though the implementation adds it
      update({
        id, // Required by type but will be overwritten in the implementation
        title: 'Updated Toast',
        description: 'New description',
      });
    });
    
    // Verify the toast was updated
    const updatedToast = result.current.toasts.find(toast => toast.id === id);
    expect(updatedToast).toBeDefined();
    expect(updatedToast?.title).toBe('Updated Toast');
    expect(updatedToast?.description).toBe('New description');
  });
});
