// Next.js metadata types
import type { Metadata } from 'next';

import { Container, Box } from '@/components/global/matic-ds';

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
          <span className="text-foreground">Matic Digital</span>
          <span className="text-gradient-pink">Starter</span>
        </Box>
        <Box cols={{ base: 2, sm: 3 }} gap={6} className="w-full">
          <a
            href="https://app.contentful.com/sign-up/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-orange-500 p-4 text-foreground hover:bg-orange-500/50 hover:text-foreground"
          >
            <h3>Contentful →</h3>
            <p>Headless CMS</p>
          </a>

          <a
            href="https://github.com/withgeist/nextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-foreground p-4 text-background hover:bg-foreground/50 hover:text-background"
          >
            <h3>Next.js →</h3>
            <p className="text-background">React framework for the web</p>
          </a>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-blue-500 p-4 text-foreground hover:bg-blue-500/50 hover:text-foreground"
          >
            <h3>TypeScript →</h3>
            <p>Typed JavaScript</p>
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-sky-400 p-4 text-foreground hover:bg-sky-400/50 hover:text-foreground"
          >
            <h3>Tailwind CSS →</h3>
            <p>Utility-firsh3CSS</p>
          </a>

          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-foreground p-4 text-background hover:bg-foreground/50 hover:text-background"
          >
            <h3>Shadcn UI →</h3>
            <p className="text-background">Radix Primith3es and Tailwind</p>
          </a>
          <a
            href="https://mux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-pink-500 p-4 text-foreground hover:bg-pink-500/50 hover:text-foreground"
          >
            <h3>Mux →</h3>
            <p>Video APIs, h3ta and players</p>
          </a>
          <a
            href="https://jotai.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-foreground p-4 text-background hover:bg-foreground/50 hover:text-background"
          >
            <h3>Jotai →</h3>
            <p className="text-background">Global stateh3anagement</p>
          </a>
          <a
            href="https://tanstack.com/query/v4/docs/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-red-500 p-4 text-foreground hover:bg-red-500/50 hover:text-foreground"
          >
            <h3>Tanstack Query →</h3>
            <p>Data fetchinh3and caching</p>
          </a>
          <a
            href="https://tanstack.com/query/v4/docs/react-query-overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-xl bg-amber-500 p-4 text-foreground hover:bg-amber-500/50 hover:text-foreground"
          >
            <h3>Tanstack Form →</h3>
            <p>Form managemh3t and validation</p>
          </a>
        </Box>
      </Box>
    </Container>
  );
}
