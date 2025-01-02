'use client';

import { Box, Container } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import OverviewItem from './OverviewItem';

interface Profile {
    name: string;
    profileType: string;
    headshot: string;
    rate: number | undefined;
    role: string;
    focus: string;
    level: string;
    experience: number;
}

export default function ProfileNav({ profile }: { profile: Profile }) {
    return (
        <Container id='overview' className='sticky top-0 z-20 bg-white'>
            <Box direction="col" className="shadow-lg px-4 pt-4 rounded-lg md:hidden">
                <Box className="items-center justify-between">
                    <Box className="items-center">
                        <Image src={profile.headshot} alt={profile.name} width={200} height={200} className="rounded-full w-12 h-12 object-cover" />
                        <h2>{profile.name.split(' ')[0]}</h2>
                        <div className="text-sm text-gray-500">
                            {profile.role} • {profile.focus} • {profile.level} • {profile.experience} years&apos; experience
                        </div>
                    </Box>
                    <Box gap={4} className="items-center">
                        <Button className={`
                            rounded-lg hover:bg-blue-100
                            ${profile.profileType === 'Design' ? 'bg-design-purple' : ''}
                            ${profile.profileType === 'Engineering' ? 'bg-engineering-blue' : ''}
                        `}>
                            Inquire
                        </Button>
                    </Box>
                </Box>
                <Box className="">
                    <Link href="#overview" className={`flex flex-grow items-center justify-center p-4 text-sm`}>Overview</Link>
                    <Link href="#samples" className={`flex flex-grow items-center justify-center p-4 text-sm`}>Samples</Link>
                    <Link href="#experience" className={`flex flex-grow items-center justify-center p-4 text-sm`}>Experience</Link>
                </Box>
            </Box>
            <Box direction="col" className="shadow-lg hidden md:flex">
                <Box className="">
                    <Box className="items-center">
                        <Image src={profile.headshot} alt={profile.name} width={200} height={200} className="rounded-full w-12 h-12 object-cover" />
                        <h2>{profile.name.split(' ')[0]}</h2>
                        <div className="text-sm text-gray-500">
                            {profile.role} • {profile.focus} • {profile.level} • {profile.experience} years&apos; experience
                        </div>
                    </Box>
                    <Link href="#overview" className={`flex flex-grow items-center justify-center p-4 text-sm`}>Overview</Link>
                    <Link href="#samples" className={`flex flex-grow items-center justify-center p-4 text-sm`}>Samples</Link>
                    <Link href="#experience" className={`flex flex-grow items-center justify-center p-4 text-sm`}>Experience</Link>
                    <Box gap={4} className="items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>test</Button>
                            </DialogTrigger>
                            <DialogTitle>
                                We&apos;re here to help
                            </DialogTitle>
                            <DialogContent className="fixed flex w-screen h-screen top-0 left-0 backdrop-blur-sm bg-[#101828]/60">
                                <Container className="w-[39.333rem] m-auto py-8 bg-background rounded-lg">
                                    <Box direction="col" gap={4} className="items-center">
                                        <h2 className="text-2xl font-bold">Let&apos;s connect</h2>
                                        <Box direction="col" gap={2} className="">
                                            <h1>{profile.name.split(' ')[0]}&apos;s <span className={`
                                                ${profile.profileType === 'Design' ? 'text-design-purple' : profile.profileType === 'Engineering' ? 'text-engineering-blue' : ''}
                                            `}>Rate</span></h1>
                                            <p className="">
                                                Matic Teams pays people well to do what they love. Some adjustment is possible based on factors like duration, team scale, and individual considerations.
                                            </p>
                                        </Box>
                                        <Box cols={3} className={`
                                            border rounded-lg flex
                                            ${profile.profileType === 'Design' ? 'border-[#d6bbfb] bg-[#fcfaff]' : ''}
                                        `}>
                                            <OverviewItem label="Individual Hourly" value={`$${profile.rate}`} color={profile.profileType} />
                                            <OverviewItem label="Team Hourly" value={'Contact Us'} color={profile.profileType} />
                                            <OverviewItem label="Full-Time" value={'Contact Us'} color={profile.profileType} />
                                        </Box>
                                        <Box className="justify-between items-center">
                                            <Button>Request Introduction</Button>
                                            <Box gap={2} className="">
                                                <p className="">Ready to discuss?</p>
                                                <Link href="#" className="">
                                                    <p className="">Get in Touch</p>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Container>
                            </DialogContent>
                        </Dialog>
                        <Button className={`
                            ${profile.profileType === 'Design' ? 'bg-design-purple' : ''} 
                            ${profile.profileType === 'Engineering' ? 'bg-engineering-blue' : ''} 
                            rounded-lg hover:bg-blue-100
                        `}>
                            Inquire
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};