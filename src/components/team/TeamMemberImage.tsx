'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * Props for the TeamMemberImage component
 * @property src - URL of the team member's image
 * @property alt - Alt text for accessibility and SEO
 */
interface TeamMemberImageProps {
  src: string;
  alt: string;
}

/**
 * A client component that displays a team member's image with a loading state
 * Features:
 * - Shows a skeleton loader while the image is loading
 * - Smooth fade-in transition when the image loads
 * - Maintains aspect ratio and proper image sizing
 * - Optimized with Next.js Image component
 *
 * @example
 * ```tsx
 * <TeamMemberImage src="/path/to/image.jpg" alt="Team Member Name" />
 * ```
 */
export function TeamMemberImage({ src, alt }: TeamMemberImageProps) {
  // Track loading state to show/hide skeleton
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative mx-auto h-40 w-40">
      {/* Skeleton loader shown while image is loading */}
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      )}
      {/* Image container with fade-in transition */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="160px"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
