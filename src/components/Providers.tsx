"use client";

import { ReactNode } from "react";

import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  );
};
