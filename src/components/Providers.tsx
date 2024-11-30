"use client";

// Types
import { type ReactNode } from "react";

// State Management
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Global providers wrapper component
 * Configures React Query for data fetching and Jotai for state management
 *
 * @param children - Child components to be wrapped with providers
 */
export const Providers = ({ children }: { children: ReactNode }) => {
  // Initialize React Query client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  );
};
