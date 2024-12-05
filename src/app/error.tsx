"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container flex min-h-[600px] w-full flex-col items-center justify-center gap-4">
      <div className="flex max-w-md flex-col items-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-red-900">
        <AlertCircle className="h-8 w-8" />
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold">Something went wrong!</h1>
          <p className="text-sm text-red-800">
            {error.message || "An unexpected error occurred"}
          </p>
          {error.digest && (
            <p className="text-xs text-red-700">Error ID: {error.digest}</p>
          )}
        </div>
        <Button onClick={reset} variant="destructive">
          Try again
        </Button>
      </div>
    </div>
  );
}
