// Global styles
import '@/styles/globals.css';
import '@/styles/matic.css';

// Dependencies
import { Inter } from 'next/font/google';
import { type Metadata } from 'next';

// Components
import { Providers } from '@/app/providers';

import { Layout } from '@/components/global/matic-ds';

import { Main } from '@/components/global/matic-ds';
import { Footer } from '@/components/global/Footer';
import { Toaster } from '@/components/ui/toaster';
import { NavBar } from '@/components/global/NavBar';
import { getNavBarById } from '@/lib/api';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

/**
 * Metadata for the application
 * This will be used by Next.js for SEO and browser tab information
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: 'Matic - Contentful Next.js Starter',
  description: 'Modern content management and digital experiences',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

/**
 * Root layout component that wraps all pages
 * Features:
 * - Applies Inter font
 * - Sets HTML language
 * - Provides global context via Providers component
 *
 * @param children - Page content to be rendered
 */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Fetch the NavBar with the specific ID
  const navBar = await getNavBarById('s4hTJG3prsPBj4LU4WaSp', false);
  
  return (
    <Layout className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          {navBar ? <NavBar {...navBar} /> : null}
          <Main className="mt-24">{children}</Main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </Layout>
  );
}
