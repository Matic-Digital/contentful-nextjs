'use client';

import { Box, Container } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { LucideBluetoothConnected } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import OverviewItem from './OverviewItem';

interface ProfileNavProps {
    name: string;
    profileType: string;
    headshot: string;
    rate: number | undefined;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ name, profileType, headshot, rate }) => {
    const [showRate, setShowRate] = useState(false);
    const [isOverviewActive, setIsOverviewActive] = useState(false);
    const [isSamplesActive, setIsSamplesActive] = useState(false);
    const [isExperienceActive, setIsExperienceActive] = useState(false);

    const handleRateClick = () => {
        setShowRate(!showRate);
    };

    return (
        <Container id='overview' className='sticky top-0 z-20 bg-white'>
            <Box direction="col" className="shadow-lg px-4 pt-4 rounded-lg md:hidden">
                <Box className="items-center justify-between">
                    <Box className="items-center">
                        <Image src={headshot} alt={name} width={200} height={200} className="rounded-full w-12 h-12 object-cover" />
                        <h2>{name.split(' ')[0]}</h2>
                    </Box>
                    <Box gap={4} className="items-center">
                        <Button className={`
                            rounded-lg hover:bg-blue-100
                            ${profileType === 'Design' ? 'bg-design-purple' : ''}
                            ${profileType === 'Engineering' ? 'bg-engineering-blue' : ''}
                        `}>
                            Inquire
                        </Button>
                    </Box>
                </Box>
                <Box className="">
                    <Link href="#overview" className={`flex flex-grow items-center justify-center p-4 text-sm ${isOverviewActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Overview</Link>
                    <Link href="#samples" className={`flex flex-grow items-center justify-center p-4 text-sm ${isSamplesActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Samples</Link>
                    <Link href="#experience" className={`flex flex-grow items-center justify-center p-4 text-sm ${isExperienceActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Experience</Link>
                </Box>
            </Box>
            <Box direction="col" className="shadow-lg hidden md:flex">
                <Box className="">
                    <Box className="items-center">
                        <Image src={headshot} alt={name} width={200} height={200} className="rounded-full w-12 h-12 object-cover" />
                        <h2>{name.split(' ')[0]}</h2>
                    </Box>
                    <Link href="#overview" className={`flex flex-grow items-center justify-center p-4 text-sm ${isOverviewActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Overview</Link>
                    <Link href="#samples" className={`flex flex-grow items-center justify-center p-4 text-sm ${isSamplesActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Samples</Link>
                    <Link href="#experience" className={`flex flex-grow items-center justify-center p-4 text-sm ${isExperienceActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Experience</Link>
                    <Box gap={4} className="items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>test</Button>
                            </DialogTrigger>
                            <DialogTitle>
                                <span style={{ display: 'none' }}>Rate</span>
                            </DialogTitle>
                            <DialogContent className="fixed flex w-screen h-screen top-0 left-0 backdrop-blur-sm bg-[#101828]/60">
                                <Container className="w-[39.333rem] m-auto py-8 bg-background rounded-lg">
                                    <DialogClose>Close</DialogClose>
                                    <Box direction="col" gap={4} className="">
                                        <Box direction="col" gap={2} className="">
                                            <h1>{name.split(' ')[0]}'s <span className={`
                                                ${profileType === 'Design' ? 'text-design-purple' : profileType === 'Engineering' ? 'text-engineering-blue' : ''}
                                            `}>Rate</span></h1>
                                            <p className="">
                                                Matic Teams pays people well to do what they love. Some adjustment is possible based on factors like duration, team scale, and individual considerations.
                                            </p>
                                        </Box>
                                        <Box cols={3} className={`
                                            border rounded-lg flex
                                            ${profileType === 'Design' ? 'border-[#d6bbfb] bg-[#fcfaff]' : ''}
                                        `}>
                                            <OverviewItem label="Individual Hourly" value={`$${rate}`} color={profileType} />
                                            <OverviewItem label="Team Hourly" value={'Contact Us'} color={profileType} />
                                            <OverviewItem label="Full-Time" value={'Contact Us'} color={profileType} />
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
                            ${profileType === 'Design' ? 'bg-design-purple' : ''} 
                            ${profileType === 'Engineering' ? 'bg-engineering-blue' : ''} 
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

export default ProfileNav;