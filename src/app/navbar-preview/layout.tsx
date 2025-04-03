/**
 * NavBar Preview Layout Component
 *
 * This layout component is specifically designed for the NavBar preview functionality.
 * Unlike the main application layout, this layout is minimal and doesn't include any
 * of the standard site structure, allowing the NavBar component to be previewed in
 * isolation without interference from other UI elements.
 *
 * Key features:
 * - Completely replaces the root layout for the preview route
 * - Provides a clean environment for previewing NavBar components
 * - Passes through children without adding additional structure
 * - Optimized for Contentful's preview environment
 *
 * This specialized layout is part of the Contentful preview system that allows
 * content editors to see real-time updates to navigation menus before publishing.
 */

// This is a server component layout

/**
 * Special layout for NavBar preview pages
 * This layout completely replaces the root layout
 */
export default function NavBarPreviewLayout({ children }: { children: React.ReactNode }) {
  // This is an empty layout that doesn't add any structure
  // It allows the page component to handle all the layout needs
  return children;
}
