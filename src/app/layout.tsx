// Global styles
import '@/styles/globals.css';
import '@/styles/matic.css';
import '@/styles/layout.css';

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
import { getNavBarById, getFooterById } from '@/lib/api';

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
  // Fetch the default NavBar with the specific ID
  const defaultNavBar = await getNavBarById('7jJj6nfURdP2fNPBphcgQH', false);
  
  // Fetch the default Footer with the specific ID
  let defaultFooter = null;
  try {
    defaultFooter = await getFooterById('3s9oXyZvx4Gd0YjdS5exKx', false);
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }
  
  return (
    <Layout className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          {/* 
            The NavBar and Footer components are conditionally rendered in the page component 
            if they are specified in the page content model. Otherwise, we use the default ones here.
            The page component will only render its own NavBar and Footer, not these default ones.
          */}
          <div id="default-navbar" className="default-layout-component">
            {defaultNavBar && <NavBar {...defaultNavBar} />}
          </div>
          
          <Main className="pt-32">{children}</Main>
          
          <div id="default-footer" className="default-layout-component">
            {defaultFooter && <Footer footerData={defaultFooter} />}
          </div>
          
          <Toaster />
        </Providers>
      </body>
    </Layout>
  );
}
