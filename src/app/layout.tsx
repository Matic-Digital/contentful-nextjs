import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Matic - Contentful Next.js Starter",
  description: "Contentful Next.js Starter",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
