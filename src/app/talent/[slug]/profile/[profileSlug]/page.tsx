import { notFound } from 'next/navigation';
import { getTalent, getAllProfiles } from '@/lib/api';
import { Box, Container, Main, Prose, Section } from '@/components/global/matic-ds';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import OverviewList from '@/components/profiles/OverviewList';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface PageProps {
  params: {
    slug: string;
    profileSlug: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug, profileSlug } = params;

  try {
    const talent = await getTalent(slug);
    if (!talent) {
      notFound();
    }

    const profiles = await getAllProfiles();
    const profile = profiles.find(
      (p) => p.slug === profileSlug && p.talent?.sys?.id === talent.sys.id
    );

    if (!profile) {
      notFound();
    }

    return (
      <Section>
        <Container>
          <Prose>
            <Box direction='col' className='shadow-lg p-4'>
              <Box className='border-b border-foreground items-center justify-between'>
                <h1>Meet <span className='text-[#7f56d9]'>{talent.name.split(' ')[0]}</span></h1>
                <p>Availability</p>
              </Box>
            </Box>
          </Prose>
        </Container>
        <Container>
          <Prose>
            <Box direction='col' className='shadow-lg p-4'>
              <Box className='items-center justify-between'>
                <h1>Work <span className='text-[#7f56d9]'>Samples</span></h1>
              </Box>
            </Box>
          </Prose>
        </Container>
        <Container>
          <Prose>
            <Box direction='col' className='shadow-lg p-4'>
              <Box className='items-center justify-between'>
                <h1>Career <span className='text-[#7f56d9]'>Experience</span></h1>
              </Box>
            </Box>
          </Prose>
        </Container>
      </Section>
    );
  } catch (error) {
    console.error('Error fetching profile:', error);
    notFound();
  }
}
