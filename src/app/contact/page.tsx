// Next.js metadata types
import type { Metadata } from 'next';

// Components
import { Container, Box } from '@/components/global/matic-ds';
import { ContactForm } from '@/components/forms/ContactForm';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

/**
 * Metadata for the contact page
 */
export const metadata: Metadata = {
  title: 'Contact Us | Matic',
  description: 'Get in touch with our team'
};

/**
 * Contact page component
 * Displays a contact form and company information
 */
export default function ContactPage() {
  return (
    <Container className="space-y-12">
      {/* Header Section */}
      <Box direction="col" gap={4} className="text-center">
        <h1>Contact Us</h1>
        <p className="mx-auto max-w-lg">
          Have a question or want to work with us? Fill out the form below and we&apos;ll get back
          to you soon.
        </p>
      </Box>

      {/* Contact Form Section */}
      <div className="mx-auto max-w-xl">
        <ErrorBoundary>
          <ContactForm />
        </ErrorBoundary>
      </div>
    </Container>
  );
}
