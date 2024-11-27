// Dependencies
import { Metadata } from "next";
import Image from "next/image";

// API
import { getTeamMembers } from "@/lib/api";

// Components
import { Card, CardContent } from "@/components/ui/card";

// Icons
import { Building2, Users, Target } from "lucide-react";

/**
 * Metadata for the About page
 */
export const metadata: Metadata = {
  title: "About Us | Matic",
  description: "Learn more about our company, mission, and team",
};

/**
 * About page component
 * Displays information about the company, mission, and team
 */
export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About Matic
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're building the future of digital experiences through innovative
          solutions and cutting-edge technology.
        </p>
      </div>

      {/* Mission and Values Section */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To empower businesses with innovative digital solutions that drive
              growth and create meaningful user experiences.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Our Company</h3>
            <p className="mt-2 text-muted-foreground">
              Founded in 2024, we've grown into a team of passionate individuals
              dedicated to pushing the boundaries of what's possible.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Our Values</h3>
            <p className="mt-2 text-muted-foreground">
              Innovation, collaboration, and user-centric design are at the core
              of everything we do.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Meet the talented individuals who make our vision possible.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image.url}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
