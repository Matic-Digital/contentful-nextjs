// Next.js imports
import Link from "next/link";

/**
 * Footer navigation configuration
 * Organized into sections with titles and links
 * Includes:
 * - Company information and legal pages
 * - Resource links for users
 * - Social media profiles
 */
const footerLinks = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Resources",
    links: [{ href: "/articles", label: "Articles" }],
  },
  {
    title: "Social",
    links: [
      { href: "https://twitter.com", label: "Twitter" },
      { href: "https://github.com", label: "GitHub" },
      { href: "https://linkedin.com", label: "LinkedIn" },
    ],
  },
];

/**
 * Footer component
 * Responsive footer with multiple columns of links and company information
 * Features:
 * - Responsive grid layout (2 columns on mobile, 4 on desktop)
 * - Company branding and description
 * - Organized link sections
 * - Copyright notice
 */
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        {/* Main footer content grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company information */}
          <div>
            {/* Logo */}
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="text-gradient-pink text-lg font-extrabold">
                |||
              </span>
              <span className="text-xl font-bold">Matic</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Modern blog platform built with Next.js, Contentful and Mux
            </p>
          </div>

          {/* Footer sections with links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright section */}
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Matic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
