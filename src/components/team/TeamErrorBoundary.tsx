"use client";

import { ErrorBoundary } from "react-error-boundary";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Client component wrapper for error boundary
 * Handles errors in the team section components
 */
interface TeamErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Team Section</AlertTitle>
      <AlertDescription>
        {error.message ||
          "Something went wrong while loading the team section."}
      </AlertDescription>
    </Alert>
  );
}

export function TeamErrorBoundary({ children }: TeamErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}
