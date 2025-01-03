// Next.js metadata types
import type { Metadata } from 'next';

// API and types
import { getTalent, getProfile } from '@/lib/api';
import { ResourceNotFoundError } from '@/lib/errors';

// Components
import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { BackButton } from '@/components/ui/back-button';

export const metadata: Metadata = {
    title: 'Talent',
    description: 'Meet our talented team members'
};

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function TalentPage({ params }: PageProps) {
    const { slug } = await params;

    try {
        console.log('Fetching talent data for slug:', slug);
        const talent = await getTalent(slug);

        if (!talent) {
            console.log('No talent found for slug:', slug);
            throw new ResourceNotFoundError(`Talent with slug "${slug}" not found`, 'talent');
        }

        console.log('Fetching related data for talent:', talent.sys.id);
        const profiles = await Promise.resolve(
            getProfile(talent.sys.id).catch(error => {
                console.error('Failed to fetch profiles:', error);
                return [];
            }),
        );

        console.log('Fetched profiles:', JSON.stringify(profiles, null, 2));

        return (
            <ErrorBoundary>
                <Container width="full">
                    <Box className="">
                        <BackButton href="/talent" />
                    </Box>
                    <Section>
                        <Container>
                            <Box gap={12}>
                                <Image
                                    src={talent.headshot.url}
                                    alt={`Cover image for ${talent.name}`}
                                    height={487}
                                    width={487}
                                    className="aspect-square object-cover rounded-lg shadow-lg"
                                    priority={false}
                                />
                                <Box direction="col" gap={2} className="">
                                    <h4 className="text-[16px] text-maticgreen">{talent.primaryTitle}</h4>
                                    <h1 className="font-medium text-6xl">{talent.name}</h1>
                                    <Box direction="row" gap={4} className="flex-wrap">
                                        {profiles.map((profile, index) => (
                                            <Link key={profile.slug ?? index} href={`/talent/${talent.slug}/profile/${profile.slug}`} className="">
                                                <Box direction="col" gap={0} className={`border w-fit p-4 rounded-lg
                                                    ${profile.profileType === 'Design' ? 'border-designpurpleborder bg-designpurplebg' : ''}
                                                    ${profile.profileType === 'Engineering' ? 'border-engblueborder bg-engbluebg' : ''}
                                                    ${profile.profileType === 'Management' ? 'border-manpinkborder bg-manpinkbg' : ''}
                                                `}>
                                                    <h4 className={`
                                                        ${profile.profileType === 'Design' ? 'text-designpurple' : ''}
                                                        ${profile.profileType === 'Engineering' ? 'text-engblue' : ''}
                                                        ${profile.profileType === 'Management' ? 'text-manpink' : ''}
                                                    `}>{profile.profileType}</h4>
                                                    <h3 className="">{profile.role}</h3>
                                                </Box>
                                            </Link>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Section>
                </Container>
            </ErrorBoundary>
        );
    } catch (error) {
        console.error('Error in TalentPage:', error);
        throw error; // Let Next.js error boundary handle it
    }
}