/* Use tailwind.config.ts for:
 * Complex utilities that need variants
 * Custom color schemes
 * Theme extensions
 * Reusable utility patterns */

/* Use globals.css for:
 * Base element styles
 * Simple component classes
 * CSS reset/normalization
 * Global CSS variables */

/** @type {import('tailwindcss').Config} */
import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              fontWeight: '500',
              borderBottom: '1px solid transparent',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: 'hsl(var(--primary))',
                borderBottomColor: 'hsl(var(--primary))',
              },
              '&:active': {
                color: 'hsl(var(--primary-foreground))',
                backgroundColor: 'hsl(var(--primary))',
                borderBottomColor: 'transparent',
                borderRadius: '0.25rem',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              color: 'hsl(var(--muted-foreground))',
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            kbd: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
            },
            th: {
              color: 'hsl(var(--foreground))',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              padding: '0.2rem 0.4rem',
            },
            'ol > li::marker': {
              color: 'hsl(var(--primary))',
              fontWeight: '600',
            },
          },
        },
        dark: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              fontWeight: '500',
              borderBottom: '1px solid transparent',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: 'hsl(var(--primary))',
                borderBottomColor: 'hsl(var(--primary))',
              },
              '&:active': {
                color: 'hsl(var(--primary-foreground))',
                backgroundColor: 'hsl(var(--primary))',
                borderBottomColor: 'transparent',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              color: 'hsl(var(--muted-foreground))',
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            kbd: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
            },
            th: {
              color: 'hsl(var(--foreground))',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted))',
            },
            'ol > li::marker': {
              color: 'hsl(var(--primary))',
            },
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    typography,
    tailwindcssAnimate,
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        ".text-gradient-pink": {
          "@apply bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent":
            "",
        },
        ".text-gradient-cyan": {
          "@apply bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent":
            "",
        },
        ".text-gradient-emerald": {
          "@apply bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent":
            "",
        },
        ".text-gradient-orange": {
          "@apply bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent":
            "",
        },
      });
    },
  ],
} satisfies Config;
