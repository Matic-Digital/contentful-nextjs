/**
 * Dynamic Page Layout Component
 *
 * This layout component wraps all dynamically routed pages based on their slug.
 * It provides a consistent layout structure for all content pages fetched from Contentful.
 *
 * Currently, this layout is minimal and simply renders its children, but it can be
 * extended to include common elements that should appear on all dynamic pages,
 * such as navigation, headers, footers, or other shared UI components.
 *
 * This component is part of Next.js's nested layout system, where layouts can be
 * composed to create consistent UI across different routes.
 */

import React from 'react';

export default async function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
