import Link from "next/link";

/**
 * NotFound component
 * Displayed when a page or resource is not found (404 error)
 * Features:
 * - Centered error message
 * - Link to return to homepage
 * - Responsive layout with minimum height
 * - Tailwind styling for consistent appearance
 */
export default function NotFound() {
  return (
    <div className="container flex min-h-[50vh] flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Not Found</h2>
      <p className="mb-4">Could not find the requested resource</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
