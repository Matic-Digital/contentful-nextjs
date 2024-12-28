import Link from 'next/link';
import Image from 'next/image';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { type Talent } from '@/types';

interface TalentCardProps {
    talent: Talent;
    onMouseEnter: (slug: string) => void;
}

export function TalentCard({ talent, onMouseEnter }: TalentCardProps) {
    return (
        <Link
            href={`/talent/${talent.slug}`}
            onMouseEnter={() => onMouseEnter(talent.slug)}
            className="group block h-full no-underline"
        >
            <Card className="h-full overflow-hidden transition-colors">
                <CardContent className="overflow-hidden p-0">
                    <Image
                        src={talent.headshot.url}
                        alt={`Cover image for ${talent.name}`}
                        height={263}
                        width={350}
                        className="aspect-[4/3] w-full rounded-none object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={false}
                    />
                </CardContent>
                <CardHeader>
                    <CardTitle className="line-clamp-2">{talent.name}</CardTitle>
                    <CardFooter className="px-0 pt-2">
                        <div className="flex flex-col gap-1 text-xs">
                            <div>ID: {talent.sys.id}</div>
                            <div>Slug: {talent.slug}</div>
                        </div>
                    </CardFooter>
                </CardHeader>
            </Card>
        </Link>
    );
}