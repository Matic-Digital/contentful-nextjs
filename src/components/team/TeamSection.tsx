import { Suspense } from 'react';

import { Section, Box } from '@/components/global/matic-ds';

import { TeamGrid, TeamGridSkeleton } from '@/components/team/TeamGrid';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

import type { TeamSection } from '@/types';

/**
 * A server component that displays the team section with loading states
 * Features:
 * - Suspense boundary for loading states
 * - Error boundary for error handling
 * - Displays team member grid with skeleton loading
 * - Section header with title and description
 */
export function TeamSection({ members }: TeamSection) {
  return (
    <Section>
      <Box direction="col" wrap={true} gap={12}>
        <div className="space-y-4 text-center">
          <h2>Meet Our Team</h2>
          <p>The talented individuals who make it all possible</p>
        </div>
        <ErrorBoundary>
          <Suspense fallback={<TeamGridSkeleton />}>
            <TeamGrid members={members} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Section>
  );
}
