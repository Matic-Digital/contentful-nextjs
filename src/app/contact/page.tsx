// Next.js metadata types
import type { Metadata } from "next";

// Components
import { ContactForm } from "@/components/forms/ContactForm";
import { ErrorBoundary } from "@/components/global/ErrorBoundary";

/**
 * Metadata for the contact page
 */
export const metadata: Metadata = {
  title: "Contact Us | Matic",
  description: "Get in touch with our team",
};

/**
 * Contact page component
 * Displays a contact form and company information
 */
export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Header Section */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or want to work with us? Fill out the form below and
          we&apos;ll get back to you soon.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="mx-auto mt-12 max-w-xl">
        <ErrorBoundary>
          <ContactForm />
        </ErrorBoundary>
      </div>
    </div>
  );
}
