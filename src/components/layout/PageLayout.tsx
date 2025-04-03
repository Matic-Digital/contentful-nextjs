'use client';

import { useEffect } from 'react';
import type { NavBar, Footer } from '@/types/contentful';

// Import the layout CSS
import '@/styles/layout.css';

interface PageLayoutProps {
  header?: NavBar | null;
  footer?: Footer | null;
  children: React.ReactNode;
}

/**
 * PageLayout component
 *
 * This client component handles adding CSS classes to the body element
 * when page-specific header and footer are present, which helps hide
 * the default header and footer in the root layout.
 */
export function PageLayout({ header, footer, children }: PageLayoutProps) {
  useEffect(() => {
    // Add classes to body when header or footer are present
    if (header) {
      document.body.classList.add('page-has-header');
    }
    if (footer) {
      document.body.classList.add('page-has-footer');
    }

    // Clean up function to remove classes when component unmounts
    return () => {
      document.body.classList.remove('page-has-header', 'page-has-footer');
    };
  }, [header, footer]);

  return <>{children}</>;
}
