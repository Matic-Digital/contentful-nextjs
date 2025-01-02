import { Document } from '@contentful/rich-text-types';
import { Box, Container } from '@/components/global/matic-ds';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import OverviewList from './OverviewList';

interface ProfileOverviewProps {
    name: string;
    tags: string[] | undefined;
    type: string | undefined;
    role: string | undefined;
    tier: string;
    focus: string | undefined;
    level: string | undefined;
    experience: number | undefined;
    engagementType: ("Full-Time" | "Dedicated" | "Fractional")[] | undefined;
    availability: string | undefined;
    headshot: string;
    description: { json: Document; } | undefined;
    location: string | undefined;
    timezone: string | undefined;   
}

// Level abbreviation mapping
export const levelMapping = {
    'Junior': 'Jr.',
    'Mid': 'Mid',
    'Senior': 'Sr.',
    'Director': 'Dir.'
} as const;

type LevelKey = keyof typeof levelMapping;

const options = {
    renderNode: {
        'paragraph': (node: any) => {
            return (
                <p style={{ margin: '1em 0' }}>
                    {node.content.map((content: any) => {
                        if (content.nodeType === 'text') {
                            // Split the text by newline characters and render with <br />
                            return content.value.split('\n').map((line: string, index: number) => (
                                <span key={index}>{line}<br /></span>
                            ));
                        }
                        return null;
                    })}
                </p>
            );
        },
        // Add other node types as needed
    },
};

export default function ProfileOverview({ name, tags, tier, type, availability, headshot, description, location, role, focus, level, experience, engagementType, timezone }: ProfileOverviewProps) {
    const profileLevel = level ? (levelMapping[level as LevelKey] ?? 'Unknown') : 'Unknown';
    return (
        <Container>
            <Box direction="col" className="px-4 py-6 md:p-8 shadow-lg rounded-lg bg-white">
                <Box gap={6} className="items-center justify-between border-b border-[#a4a7ae] pb-2">
                    <h1 className="flex gap-2">
                        Meet
                        <span className={`
                            ${type === 'Design' ? 'text-[#7756C9]' : ''}
                            ${type === 'Engineering' ? 'text-[#157DEF]' : ''}

                        `}>
                            {name.split(' ')[0]}
                        </span>
                    </h1>
                    <Box direction="row" gap={2} className="flex-grow hidden md:flex">
                        {tags?.map((tag: string, index: number) => (
                            <p
                                key={index}
                                className="bg-[#f5f5f5] w-fit px-2 py-1 rounded-full text-xs font-light"
                            >
                                {tag}
                            </p>
                        ))}
                    </Box>
                    <p className="">
                        Available <span className="font-semibold">
                            {availability ? new Date(availability).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Not specified'}
                        </span>
                    </p>
                </Box>
                <Box className='relative my-6 flex-col md:flex-row' gap={4}>
                    <Box gap={4} className="">
                        <Image
                            src={headshot}
                            alt={name}
                            width={300}
                            height={300}
                            className="w-[175px] md:min-w-[211px] h-[200px] md:h-[241px] rounded-[0.8rem] z-10"
                        />
                        <div className={`
                        w-[175px] md:w-[211px] h-[200px] md:h-[241px] rounded-[0.8rem] absolute top-1.5 left-1.5
                        ${type === 'Design' ? 'bg-[#7756C9]' : ''}
                        ${type === 'Engineering' ? 'bg-[#157DEF]' : ''}
                    `}>
                        </div>
                        <Box direction="col" gap={2} className="flex-grow flex md:hidden">
                            {tags?.map((tag: string, index: number) => (
                                <p
                                    key={index}
                                    className="bg-[#f5f5f5] w-fit px-2 py-1 rounded-full text-xs font-light"
                                >
                                    {tag}
                                </p>
                            ))}
                        </Box>
                    </Box>
                    <Box direction="col" className="mx-auto">
                        {description?.json ? documentToReactComponents(description.json, options) : <p>No description available.</p>}
                        <p className="font-semibold">{location}</p>
                    </Box>
                </Box>
                <OverviewList
                    role={role || ''}
                    focus={focus}
                    tier={tier.toString() || ''}
                    level={profileLevel || ''}
                    color={type || ''}
                    location={timezone || ''}
                    experience={`${Number(experience)}+ Years`}
                    engagementType={engagementType}
                />
            </Box>
        </Container>
    );
}