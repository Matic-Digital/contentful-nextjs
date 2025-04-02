import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2 py-1', 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500');
  });

  it('handles conditional class names', () => {
    expect(cn('px-2', true && 'bg-blue-500')).toBe('px-2 bg-blue-500');
    expect(cn('px-2', false && 'bg-blue-500')).toBe('px-2');
  });

  it('resolves conflicting classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    // The exact order may vary based on tailwind-merge implementation
    // So we check that both classes are present instead of exact order
    const result = cn('flex items-center', 'grid');
    expect(result).toContain('grid');
    expect(result).toContain('items-center');
  });

  it('handles null, undefined and boolean values', () => {
    expect(cn('base', null, undefined, false, true, 'active')).toBe('base active');
  });

  it('handles array inputs', () => {
    expect(cn(['px-2', 'py-1'], 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500');
  });

  it('handles object inputs with boolean values', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active');
  });

  it('handles complex combinations', () => {
    const isActive = true;
    const isDisabled = false;

    expect(
      cn('base-class', isActive && 'active', isDisabled && 'disabled', {
        'is-loading': false,
        'is-focused': true
      })
    ).toBe('base-class active is-focused');
  });
});
