// Dependencies
import type { Metadata } from "next";

// API
import { getTeamMembers } from "@/lib/api";

// Components
import { Card, CardContent } from "@/components/ui/card";

import { TeamSection } from "@/components/team/TeamSection";

// Icons
import { Building2, Users, Target } from "lucide-react";

/**
 * Metadata for the About page
 */
export const metadata: Metadata = {
  title: "About Us | Matic",
  description: "Learn more about our company, mission, and team",
};

/**
 * About page component
 * Server component that displays company information and team members
 * Features:
 * - Hero section with company overview
 * - Mission and values cards
 * - Team member grid with loading states
 *
 * Uses Suspense for streaming server rendering and loading states
 * Data is fetched server-side for optimal performance
 */
export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section - Company overview */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About Matic
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We&apos;re building the future of digital experiences through
          innovative solutions and cutting-edge technology.
        </p>
      </div>

      {/* Mission and Values Section - Three card grid */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">Our Company</h3>
              <p className="text-sm text-muted-foreground">
                Founded with a vision to transform digital experiences through
                innovative solutions and cutting-edge technology.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                To empower businesses with seamless content management and
                exceptional user experiences that drive growth.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">Our Values</h3>
              <p className="text-sm text-muted-foreground">
                Innovation, collaboration, and customer success are at the heart
                of everything we do.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <TeamSection members={teamMembers} />
    </div>
  );
}
