import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class');
    expect(result).toBe('base-class additional-class');
  });

  it('handles conditional class names', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('filters out falsy values', () => {
    const result = cn(
      'base-class',
      false && 'should-not-appear',
      null,
      undefined,
      0,
      'should-appear'
    );
    expect(result).toBe('base-class should-appear');
  });
});
