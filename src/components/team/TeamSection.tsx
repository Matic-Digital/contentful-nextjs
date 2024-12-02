import { Suspense } from "react";

import { TeamGrid, TeamGridSkeleton } from "@/components/team/TeamGrid";
import { TeamErrorBoundary } from "@/components/team/TeamErrorBoundary";

import type { TeamSection } from "@/lib/types";

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
    <section className="container space-y-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Meet Our Team</h2>
        <p className="mt-4 text-muted-foreground">
          The talented individuals who make it all possible
        </p>
      </div>
      <TeamErrorBoundary>
        <Suspense fallback={<TeamGridSkeleton />}>
          <TeamGrid members={members} />
        </Suspense>
      </TeamErrorBoundary>
    </section>
  );
}
