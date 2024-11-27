"use client";

/** Contact form component with real-time validation
 * Features:
 * - Real-time field validation using Zod
 * - Accessible form controls with ARIA attributes
 * - Loading and error states
 * - Toast notifications for form submission feedback
 */

import { useState } from "react";
import { type FieldApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Loader2 } from "lucide-react";

/** Props for form field components */
interface FormFieldProps {
  /** Label text displayed above the input */
  label: string;
  /** Field name corresponding to form data structure */
  name: keyof ContactFormData;
  /** Placeholder text for the input */
  placeholder: string;
  /** Type of form control to render */
  component?: "input" | "textarea";
}

/** Displays validation state and error messages for a form field */
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-sm text-destructive">
          {field.state.meta.errors.join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? (
        <em className="text-sm text-primary">Validating...</em>
      ) : null}
    </>
  );
}

/** Zod schema for form validation with custom error messages */
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

/** Type definition for form data based on Zod schema */
type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Contact form component with real-time validation and submission handling
 * Uses @tanstack/react-form for form state management and Zod for validation
 */
export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Initialize form with validation and submission handling */
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    } as ContactFormData,
    onSubmit: async ({ value }) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        // Simulate API call - replace with actual API endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast({
          title: "Message sent",
          description: "We'll get back to you as soon as possible.",
        });

        form.reset();
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "There was a problem sending your message. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: contactSchema,
    },
  });

  /**
   * Renders a form field with label, input/textarea, and validation feedback
   * Handles both text inputs and textareas with shared validation logic
   */
  function FormField({
    label,
    name,
    placeholder,
    component = "input",
  }: FormFieldProps) {
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <form.Field
          name={name}
          children={(field) => (
            <>
              {component === "input" ? (
                <Input
                  id={name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby={`${name}-error`}
                />
              ) : (
                <Textarea
                  id={name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[100px]"
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby={`${name}-error`}
                />
              )}
              <FieldInfo field={field} />
            </>
          )}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* First Name */}
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Your first name"
          />
          {/* Last Name */}
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Your last name"
          />
          {/* Email */}
          <FormField
            label="Email"
            name="email"
            placeholder="your.email@example.com"
          />
          {/* Message Field */}
          <FormField
            label="Message"
            name="message"
            placeholder="Your message..."
            component="textarea"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2">Sending...</span>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
