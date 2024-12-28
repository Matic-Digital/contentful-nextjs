'use client';

import { Box, Container } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ProfileNavProps {
    name: string;
    profileType: string;
    rate: number | undefined;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ name, profileType, rate }) => {
    const [showRate, setShowRate] = useState(false);
    const [isOverviewActive, setIsOverviewActive] = useState(false);
    const [isSamplesActive, setIsSamplesActive] = useState(false);
    const [isExperienceActive, setIsExperienceActive] = useState(false);

    const handleRateClick = () => {
        setShowRate(!showRate);
    };

    useEffect(() => {
        const overviewElement = document.getElementById('overview');
        const samplesElement = document.getElementById('samples');
        const experienceElement = document.getElementById('experience');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= 0.75) {
                    if (entry.target.id === 'experience') {
                        setIsExperienceActive(true);
                        setIsSamplesActive(false);
                        setIsOverviewActive(false);
                    } else if (entry.target.id === 'samples') {
                        setIsSamplesActive(true);
                        setIsOverviewActive(false);
                        setIsExperienceActive(false);
                    } else if (entry.target.id === 'overview') {
                        setIsOverviewActive(true);
                        setIsSamplesActive(false);
                        setIsExperienceActive(false);
                    }
                } else {
                    // Reset active state if the section is not visible
                    if (entry.target.id === 'experience') {
                        setIsExperienceActive(false);
                    } else if (entry.target.id === 'samples') {
                        setIsSamplesActive(false);
                    } else if (entry.target.id === 'overview') {
                        setIsOverviewActive(false);
                    }
                }
                // Reactivate the previous section if it comes back into view
                if (entry.isIntersecting) {
                    if (entry.target.id === 'experience') {
                        setIsExperienceActive(true);
                    } else if (entry.target.id === 'samples') {
                        setIsSamplesActive(true);
                    } else if (entry.target.id === 'overview') {
                        setIsOverviewActive(true);
                    }
                }
            });
        }, { threshold: 0.75 });

        if (overviewElement) observer.observe(overviewElement);
        if (samplesElement) observer.observe(samplesElement);
        if (experienceElement) observer.observe(experienceElement);

        return () => {
            if (overviewElement) observer.unobserve(overviewElement);
            if (samplesElement) observer.unobserve(samplesElement);
            if (experienceElement) observer.unobserve(experienceElement);
        };
    }, []);

    return (
        <Container id='overview' className='sticky top-0 z-20 bg-white'>
            <Box direction="col" className="shadow-lg px-4 pt-4 rounded-lg">
                <Box className="items-center justify-between">
                    <h2>{name.split(' ')[0]}</h2>
                    <Box gap={4} className="items-center">
                        <div className={`${profileType === 'Design' ? 'text-[#7756C9] bg-[#e9D7fe] border-[#b692f6]' : ''} border px-4 py-2 rounded-full`} onClick={handleRateClick}>
                            {showRate ? `$${rate} / hr` : '$'}
                        </div>
                        <Button className={`${profileType === 'Design' ? 'bg-[#7756C9]' : ''}`}>Request Introduction</Button>
                    </Box>
                </Box>
                <Box className="">
                    <Link href="#overview" className={`flex flex-grow items-center justify-center p-4 text-sm ${isOverviewActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Overview</Link>
                    <Link href="#samples" className={`flex flex-grow items-center justify-center p-4 text-sm ${isSamplesActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Samples</Link>
                    <Link href="#experience" className={`flex flex-grow items-center justify-center p-4 text-sm ${isExperienceActive ? 'font-bold border-b-2 border-[#7756C9]' : ''}`}>Experience</Link>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfileNav;