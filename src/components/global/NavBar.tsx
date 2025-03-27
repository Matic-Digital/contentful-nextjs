/**
 * NavBar Component
 * 
 * This component renders a responsive navigation bar based on content from Contentful.
 * It displays a logo and navigation links, with support for nested dropdown menus for
 * PageList content types. The component is integrated with Contentful's Live Preview
 * functionality for real-time content updates in the preview environment.
 * 
 * Features:
 * - Responsive design with different layouts for desktop and mobile
 * - Support for nested navigation with dropdowns for PageList items
 * - Active link highlighting based on current route
 * - Contentful Live Preview integration for real-time updates
 * - Theme toggle for light/dark mode
 */

'use client';

import { useContentfulLiveUpdates, useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { PageLinkResolver } from '@/components/global/PageLinkResolver';

import { Container, Box } from '@/components/global/matic-ds';
import type { NavBar as NavBarType, Page, PageList } from '@/types/contentful';

// Navigation menu components from shadcn
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

// Sheet components for mobile menu from shadcn
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from '@/components/ui/sheet';

// Theme toggle component
import { ThemeToggle } from '@/components/global/ThemeToggle';

// No need for an empty interface, just use the NavBarType directly
type NavBarProps = NavBarType;

/**
 * Helper function to determine if a navigation link is a PageList
 */
function isPageList(link: Page | PageList): link is PageList {
  return (link as PageList).pagesCollection !== undefined;
}

/**
 * NavBar component that displays a navigation bar with logo and links
 * Supports Contentful Live Preview for real-time updates
 * Features:
 * - Desktop: Full navigation menu with dropdowns for page lists
 * - Mobile: Hamburger menu with slide-out sheet
 * - Sticky positioning with blur effect
 * - Consistent branding across breakpoints
 */
export function NavBar(props: NavBarProps) {
  // Use the Contentful Live Updates hook to get real-time updates
  const navBar = useContentfulLiveUpdates<NavBarProps>(props);
  
  // Use the Contentful Inspector Mode hook for field tagging
  const inspectorProps = useContentfulInspectorMode({ 
    entryId: navBar?.sys?.id ?? '' 
  });
  
  // Get the current pathname
  const pathname = usePathname();
  
  // Add a check to ensure props has the required structure
  if (!navBar?.sys?.id) {
    console.error('NavBar component received invalid props:', props);
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <Container className="mx-auto">
        <header className="mt-6 w-[95%] rounded-xl border border-b border-slate-400 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-md:py-1.5 lg:w-full">
          <Box className="items-center justify-between">
            {/* Desktop Navigation - Logo */}
            <div {...inspectorProps({ fieldId: 'logo' })}>
              {navBar.logo?.url && (
                <Link href="/" className="flex items-center">
                  <Image 
                    src={navBar.logo.url} 
                    alt={navBar.logo.title ?? navBar.name ?? 'Logo'} 
                    width={navBar.logo.width ?? 150} 
                    height={navBar.logo.height ?? 50}
                    className="h-6 w-auto rounded-none border-none dark:brightness-0 dark:invert"
                  />
                </Link>
              )}
            </div>

            {/* Desktop Navigation - Links */}
            <div className="mr-4 hidden md:flex" {...inspectorProps({ fieldId: 'navLinks' })}>
              <ErrorBoundary>
                <NavigationMenu>
                  <NavigationMenuList>
                    {navBar.navLinksCollection?.items?.map((link, index) => {
                      if (!link) return null;
                      
                      // Check if the link is a PageList
                      if (isPageList(link) && link.pagesCollection?.items?.length) {
                        return (
                          <NavigationMenuItem key={link.sys.id ?? `pagelist-${index}`}>
                            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                              <Link 
                                href={`/${link.slug ?? ''}`}
                                className="flex items-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {link.name}
                              </Link>
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-[200px] gap-1 p-2">
                                {link.pagesCollection?.items.map((page, pageIndex) => (
                                  <li key={page.sys.id ?? `page-${pageIndex}`}>
                                    <Link 
                                      href={`/${link.slug}/${page.slug}`}
                                      className={`block w-full rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                                        pathname === `/${link.slug}/${page.slug}` ? 'font-medium bg-accent/50' : ''
                                      }`}
                                    >
                                      {page.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        );
                      }
                      
                      // Regular Page link - use PageLinkResolver to handle nested routes
                      return (
                        <NavigationMenuItem key={link.sys.id ?? `page-${index}`}>
                          <PageLinkResolver 
                            slug={link.slug}
                            name={link.name}
                            isNavigationLink={true}
                          />
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </ErrorBoundary>
            </div>

            <Box gap={2}>
              <ThemeToggle />

              {/* Mobile Navigation */}
              <div className="md:hidden">
                {/* Hamburger Menu Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium">
                      <Menu className="size-7" />
                      <span className="sr-only">Toggle Menu</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      {navBar.logo?.url && (
                        <Link href="/" className="flex items-center">
                          <Image 
                            src={navBar.logo.url} 
                            alt={navBar.logo.title ?? navBar.name ?? 'Logo'} 
                            width={navBar.logo.width ?? 150} 
                            height={navBar.logo.height ?? 50}
                            className="h-10 w-auto"
                          />
                        </Link>
                      )}
                    </SheetHeader>
                    {/* Mobile Menu Items */}
                    <nav className="mt-8 flex flex-col space-y-4" {...inspectorProps({ fieldId: 'navLinks' })}>
                      {navBar.navLinksCollection?.items?.map((link, index) => {
                        if (!link) return null;
                        
                        // Check if the link is a PageList for mobile
                        if (isPageList(link) && link.pagesCollection?.items?.length) {
                          return (
                            <div key={link.sys.id ?? `mobile-pagelist-${index}`} className="space-y-2">
                              <Link
                                href={`/${link.slug ?? ''}`}
                                className="text-lg font-medium text-foreground hover:text-primary"
                              >
                                {link.name}
                              </Link>
                              <div className="ml-4 flex flex-col space-y-2">
                                {link.pagesCollection?.items.map((page, pageIndex) => (
                                  <SheetClose key={page.sys.id ?? `mobile-page-${pageIndex}`} asChild>
                                    <Link
                                      href={`/${link.slug}/${page.slug}`}
                                      className={`text-base hover:text-primary ${
                                        pathname === `/${link.slug}/${page.slug}` ? 'text-foreground' : 'text-foreground/60'
                                      }`}
                                    >
                                      {page.name}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                              {index < (navBar.navLinksCollection?.items.length ?? 0) - 1 && (
                                <div className="my-2 h-px w-full bg-border"></div>
                              )}
                            </div>
                          );
                        }
                        
                        // Regular Page link for mobile - use PageLinkResolver to handle nested routes
                        return (
                          <SheetClose key={link.sys.id ?? `mobile-page-${index}`} asChild>
                            <PageLinkResolver
                              slug={link.slug}
                              name={link.name}
                              className="text-lg font-medium hover:text-primary"
                            />
                          </SheetClose>
                        );
                      })}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </Box>
          </Box>
        </header>
      </Container>
    </div>
  );
}
