// Next.js metadata types
import type { Metadata } from "next";

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: "Contentful Next.js Starter",
  description: "Contentful Next.js Starter",
};

/**
 * Landing page
 */
export default async function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-gradient-to-b from-background to-background/50 text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <div className="stack gap-4 text-center lg:flex lg:flex-row lg:text-left">
            <span className="text-gradient-pink">A</span>
            {/* <span className="text-gradient-pink">|||</span> */}
            <span className="text-foreground">Matic Digital</span>
            <span className="text-gradient-pink">Starter</span>
          </div>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
          <a
            href="https://app.contentful.com/sign-up/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-orange-500 p-4 text-foreground hover:bg-orange-500/50"
          >
            <h3 className="text-2xl font-bold">Contentful →</h3>
            <p className="text-lg">Headless CMS</p>
          </a>

          <a
            href="https://github.com/withgeist/nextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-foreground p-4 text-background hover:bg-foreground/50"
          >
            <h3 className="text-2xl font-bold">Next.js →</h3>
            <p className="text-lg">React framework for the web</p>
          </a>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-blue-500 p-4 text-foreground hover:bg-blue-500/50"
          >
            <h3 className="text-2xl font-bold">TypeScript →</h3>
            <p className="text-lg">Typed JavaScript</p>
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-sky-400 p-4 text-foreground hover:bg-sky-400/50"
          >
            <h3 className="text-2xl font-bold">Tailwind CSS →</h3>
            <p className="text-lg">Utility-first CSS</p>
          </a>

          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-foreground p-4 text-background hover:bg-foreground/50"
          >
            <h3 className="text-2xl font-bold">Shadcn UI →</h3>
            <p className="text-lg">Radix Primitives and Tailwind</p>
          </a>
          <a
            href="https://mux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-pink-500 p-4 text-foreground hover:bg-pink-500/50"
          >
            <h3 className="text-2xl font-bold">Mux →</h3>
            <p className="text-lg">Video APIs, data and players</p>
          </a>
          <a
            href="https://jotai.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-foreground p-4 text-background hover:bg-foreground/50"
          >
            <h3 className="text-2xl font-bold">Jotai →</h3>
            <p className="text-lg">Global state management</p>
          </a>
          <a
            href="https://tanstack.com/query/v4/docs/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-red-500 p-4 text-foreground hover:bg-red-500/50"
          >
            <h3 className="text-2xl font-bold">Tanstack Query →</h3>
            <p className="text-lg">Data fetching and caching</p>
          </a>
          <a
            href="https://tanstack.com/query/v4/docs/react-query-overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-amber-500 p-4 text-foreground hover:bg-amber-500/50"
          >
            <h3 className="text-2xl font-bold">Tanstack Form →</h3>
            <p className="text-lg">Form management and validation</p>
          </a>
        </div>
      </div>
    </div>
  );
}
