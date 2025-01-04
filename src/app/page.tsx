// Next.js metadata types
import type { Metadata } from 'next';

import { Container, Box } from '@/components/global/matic-ds';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Contentful Next.js Starter',
  description: 'Contentful Next.js Starter'
};

/**
 * Landing page
 */

export default async function HomePage() {
  return (
    <Container>
      <Box
        direction="col"
        gap={12}
        className="min-h-[calc(100vh-200px)] items-center justify-center"
      >
        <Box
          direction={{ base: 'col', lg: 'row' }}
          gap={4}
          className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem] lg:text-left"
        >
          <span className="text-gradient-pink">A</span>
          {/* <span className="text-gradient-pink">|||</span> */}
          <span className="text-foreground">Matic Teams</span>
          <span className="text-gradient-pink">App</span>
        </Box>
        <Link href="/talent">
          <Button>View Talent</Button>
        </Link>
      </Box>
    </Container>
  );
}
