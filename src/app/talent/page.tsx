// Next.js metadata types
import type { Metadata } from 'next';

// API and types
import { getAllTalent } from '@/lib/api';
import type { Talent } from '@/types';

// Components
import Image from 'next/image';
import { Container } from '@/components/global/matic-ds';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Our Talent',
  description: 'Meet our talented team members'
};

/**
 * TalentGrid component to display talent in a grid layout
 */
function TalentGrid({ talents }: { talents: Talent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {talents.map((talent) => (
        <div key={talent.sys.id} className="">
          <h3 className="">{talent.name}</h3>
          <p className="">{talent.slug}</p>
          <Image 
            src={talent.headshot.url} 
            alt={talent.name}
            width={200}
            height={200}
            priority
          />
          <p>{talent.location.lat}, {talent.location.lon}</p>
          <p>{talent.tier.name}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Talent page displaying all team members
 */
export default async function TalentPage() {
  const talents = await getAllTalent();
  console.log('Talent page data:', talents);

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Our Talent</h1>
      <div className="mt-8">
        <ErrorBoundary>
          <TalentGrid talents={talents} />
        </ErrorBoundary>
      </div>
    </Container>
  );
}