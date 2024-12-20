'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/global/matic-ds';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContactSuccessPage() {
  return (
    <Container>
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="items-center space-y-4 text-center">
          <CheckCircle2 className="size-12" />
          <h1>Message Sent Successfully!</h1>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="mx-auto max-w-sm">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
