// Next.js metadata types
import type { Metadata } from 'next';

// API and types
import { getTalent, getEducation, getAwards, getLanguages, getProfile } from '@/lib/api';
import { ResourceNotFoundError } from '@/lib/errors';
import type { Language } from '@/types/contentful';

// Components
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/global/matic-ds';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
        const [educations, awards, profile] = await Promise.all([
            getEducation(talent.sys.id).catch(error => {
                console.error('Failed to fetch education:', error);
                return [];
            }),
            getAwards(talent.sys.id).catch(error => {
                console.error('Failed to fetch awards:', error);
                return [];
            }),
            getProfile(talent.sys.id).catch(error => {
                console.error('Failed to fetch profile:', error);
                return null;
            })
        ]);

        let languages: Language[] = [];
        try {
            languages = await getLanguages(talent.sys.id);
        } catch (error) {
            console.error('Failed to fetch languages:', error);
        }

        return (
            <Container>
                <h1 className="text-4xl font-bold mb-8">{talent.name}</h1>
                <div className="mt-8">
                    <ErrorBoundary>
                        <Image 
                            src={talent.headshot.url} 
                            alt={talent.name}
                            width={200}
                            height={200}
                            priority
                        />
                        <p>{talent.sys.id}</p>
                        <p>{talent.slug}</p>
                        <p>{talent.location.lat}, {talent.location.lon}</p>
                        <p>{talent.tier.name}</p>

                        {profile && (
                            <div key={profile.sys.id} className="mb-4">
                                <Link 
                                    href={`/talent/${slug}/profile/${profile.slug}`}
                                    className="block hover:bg-gray-50 p-4 rounded-lg transition-colors"
                                >
                                    <p className="font-semibold">{profile.role}</p>
                                    <p className="text-gray-600">{profile.slug}</p>
                                </Link>
                            </div>
                        )}
                        
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold mb-4">Education</h2>
                            {educations.map((education) => (
                                <div key={education.sys.id} className="mb-4">
                                    <p className="font-semibold">{education.institution}</p>
                                    <p>{education.degreeName}</p>
                                    {education.timeframe && (
                                        <p className="text-gray-600">
                                            {education.timeframe}
                                        </p>
                                    )}
                                    {education.location && (
                                        <p className="text-gray-600">
                                            Location: {education.location.lat}, {education.location.lon}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="">
                            <h2>Awards</h2>
                            {awards.map((award) => (
                                <div key={award.sys.id} className="mb-4">
                                    <p className="font-semibold">{award.awardName}</p>
                                    {award.description?.json && (
                                        <div className="prose">
                                            {documentToReactComponents(award.description.json)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2>Languages</h2>
                            {languages.length > 0 ? (
                                languages.map((language) => (
                                    <div key={language.sys.id} className="mb-4">
                                        <p className="font-semibold">{language.name}</p>
                                        <p>{language.type}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No languages listed</p>
                            )}
                        </div>
                    </ErrorBoundary>
                </div>
            </Container>
        );
    } catch (error) {
        console.error('Error in TalentPage:', error);
        throw error; // Let Next.js error boundary handle it
    }
}