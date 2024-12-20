'use client';
// Next.js and icon imports
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

import { Container, Box } from '@/components/global/matic-ds';

// Navigation menu components from shadcn
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

// Sheet components for mobile menu from shadcn
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from '@/components/ui/sheet';

import { Logo } from '@/components/global/Logo';

// Theme toggle component
import { ThemeToggle } from '@/components/global/ThemeToggle';

/**
 * Navigation menu items configuration
 * Each item has a URL and display label
 */
const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/template', label: 'Templates' }
];

/**
 * Header component with responsive navigation
 * Features:
 * - Desktop: Full navigation menu
 * - Mobile: Hamburger menu with slide-out sheet
 * - Sticky positioning with blur effect
 * - Consistent branding across breakpoints
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-6 z-50 m-auto w-[95%] rounded-3xl border border-b border-slate-400 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:w-max">
      <Container className="max-md:py-1.5 md:px-8">
        <Box className="items-center">
          {/* Desktop Navigation */}
          <Logo />
          <div className="mr-4 hidden md:flex">
            {/* Desktop Menu Items */}
            <ErrorBoundary>
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          {...(pathname === item.href && { 'data-active': true })}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </ErrorBoundary>
          </div>

          <div className="ml-auto mr-4">
            <ThemeToggle />
          </div>

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
                  <Logo />
                </SheetHeader>
                {/* Mobile Menu Items */}
                <nav className="mt-8 flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={`text-lg font-medium hover:text-primary ${
                          pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </Box>
      </Container>
    </header>
  );
}
