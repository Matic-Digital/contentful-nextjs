// Dependencies
import type { Metadata } from 'next';

// API
import { getTeamMembers } from '@/lib/api';

// Components
import { Card, CardContent } from '@/components/ui/card';

import { Container, Box } from '@/components/global/matic-ds';

import { TeamSection } from '@/components/team/TeamSection';

import { Building2, Target, Users } from 'lucide-react';

const ABOUT_CARDS = [
  {
    id: 'company',
    title: 'Our Company',
    description:
      'Founded with a vision to transform digital experiences through innovative solutions and cutting-edge technology.',
    icon: Building2
  },
  {
    id: 'mission',
    title: 'Our Mission',
    description:
      'To empower businesses with seamless content management and exceptional user experiences that drive growth.',
    icon: Target
  },
  {
    id: 'values',
    title: 'Our Values',
    description:
      'Innovation, collaboration, and customer success are at the heart of everything we do.',
    icon: Users
  }
] as const;

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company, mission, and team'
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
    <Container className="space-y-12">
      {/* Hero Section - Company overview */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1>About Matic</h1>
        <p className="mx-auto max-w-lg">
          We&apos;re building the future of digital experiences through innovative solutions and
          cutting-edge technology.
        </p>
      </div>

      {/* Mission and Values Section - Three card grid */}
      <Box cols={{ sm: 1, md: 2, lg: 3 }} gap={8}>
        {ABOUT_CARDS.map(({ id, title, description, icon: Icon }) => (
          <Card key={id}>
            <CardContent>
              <Box direction="col" gap={4} className="items-center pt-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 text-center">
                  <h3>{title}</h3>
                  <p className="text-sm">{description}</p>
                </div>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Team Section */}
      <TeamSection members={teamMembers} />
    </Container>
  );
}
