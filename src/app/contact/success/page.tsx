"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactSuccessPage() {
  return (
    <div className="container mx-auto px-5 py-24">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Message Sent Successfully!</h1>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Thank you for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
