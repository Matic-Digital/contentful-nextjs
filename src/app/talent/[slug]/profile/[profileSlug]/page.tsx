import { notFound } from 'next/navigation';
import { getTalent, getAllProfiles } from '@/lib/api';

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
        const profile = profiles.find(p => p.slug === profileSlug && p.talent?.sys?.id === talent.sys.id);
        
        if (!profile) {
            notFound();
        }

        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">{profile.role}</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Profile Details</h2>
                            <p className="text-gray-600">{profile.slug}</p>
                        </div>
                        {/* Add more profile details as needed */}
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching profile:', error);
        notFound();
    }
}
