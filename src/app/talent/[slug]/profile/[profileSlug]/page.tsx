import { notFound } from 'next/navigation';
import { getTalent, getAllProfiles } from '@/lib/api';
import { Box, Container, Main, Section } from '@/components/global/matic-ds';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import OverviewList from '@/components/profiles/OverviewList';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SimplifyCTA from '@/components/profiles/SimplifyCTA';
import { getEducation, getAwards, getWorkSamples, getProfessionalBackground } from '@/lib/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ProfileNav from '@/components/profiles/ProfileNav';

interface PageProps {
  params: {
    slug: string;
    profileSlug: string;
  };
}

interface Node {
  content: Array<{ nodeType: string; value?: string }>; 
}

interface Content {
  nodeType: string;
  value?: string;
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

    const levelMapping: Record<string, string> = {
      'Junior': 'Jr.',
      'Mid': 'Mid',
      'Senior': 'Sr.',
      'Director': 'Dir.'
    };

    const profileLevel = profile.level ? levelMapping[profile.level] ?? 'Unknown' : 'Unknown';

    const options = {
      renderNode: {
        'paragraph': (node: Node) => {
          return (
            <p style={{ margin: '1em 0' }}>
              {node.content.map((content: Content) => {
                const value = content?.value;
                if (content.nodeType === 'text') {
                  return value?.split('\n').map((line: string, index: number) => (
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

    const lat = talent.location.lat;
    const lon = talent.location.lon;

    const location = (lat !== undefined && lon !== undefined)
      ? `${lat.toString()}, ${lon.toString()}`
      : 'Location not available';

    const education = await getEducation(talent.sys.id);
    const awards = await getAwards(talent.sys.id);
    const workSamples = await getWorkSamples(talent.sys.id);
    const professionalBackground = await getProfessionalBackground(talent.sys.id);

    return (
      <Main className="mt-0">
        <Section>
          <ProfileNav name={talent.name} profileType={profile.profileType} rate={profile.rate} />
          <Container>
            <Box direction="col" gap={4} className="p-4 shadow-lg rounded-lg">
              <Box className="items-center justify-between">
                <h1 className="flex gap-2">
                  Meet
                  <span className={` ${profile.profileType === 'Design' ? 'text-[#7756C9]' : ''} `}>
                    {talent.name.split(' ')[0]}
                  </span>
                </h1>
              </Box>
              <Box className='relative' gap={8}>
                <Image
                  src={talent.headshot.url}
                  alt={talent.name}
                  width={100}
                  height={100}
                  className=" w-[12.833rem] h-[14.667rem] rounded-[0.8rem] z-10"
                />
                <div className={`
                  w-[12.833rem] h-[14.667rem] rounded-[0.8rem] absolute top-2 left-2
                  ${profile.profileType === 'Design' ? 'bg-[#7756C9]' : ''}
                `}>
                </div>
                <Box direction="col" gap={4} className="flex-grow">
                  {profile.profileTags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className={`bg-[#f5f5f5] w-fit px-2 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </Box>
              </Box>
              {profile.talentBriefDescription?.json ? documentToReactComponents(profile.talentBriefDescription.json, options) : <p>No description available.</p>}
              <p className="font-semibold">{profile.talentBriefLocation}</p>
              <OverviewList
                role={profile.role}
                focus={profile.focus}
                tier={talent.tier.name?.toString() || ''}
                level={profileLevel || ''}
                color={profile.profileType || ''}
                location={location?.toString() || ''}
                experience={Number(profile.experience)}
                engagementType={profile.engagementType}
              />
            </Box>
          </Container>
          <Container id="samples">
            <Box direction="col" className="p-4 shadow-lg rounded-lg">
              <h1 className="flex gap-2">
                Work
                <span className={` ${profile.profileType === 'Design' ? 'text-[#7756C9]' : ''} `}>
                  Samples
                </span>
              </h1>
              <Box direction="col" gap={4}>
                  {workSamples.map((workSample, index) => (
                    <div key={index} className="relative h-[20rem] rounded-lg shadow-lg bg-cover bg-no-repeat flex flex-col justify-end" style={{ backgroundImage: `url(${workSample.featuredImage?.url})` }}>
                      <div className="absolute z-0 inset-0 rounded-lg bg-gradient-to-b from-transparent to-[#000227] to-80%" />
                      <Box direction="col" gap={4} className={`z-20 p-4 shadow-lg rounded-lg text-white`}>
                        <h3>{workSample.sampleName}</h3>
                        <Box gap={2} className="">
                          <p className="text-white">{workSample.sampleType}</p>
                          <p className="text-white">•</p>
                          <p className="text-white">{workSample.title}</p>
                        </Box>
                      </Box>
                    </div>
                  ))}
              </Box>
            </Box>
          </Container>
          <Container id='experience'>
            <Box direction="col" className="p-4 shadow-lg rounded-lg">
              <h1 className="flex gap-2">
                Career
                <span className={` ${profile.profileType === 'Design' ? 'text-[#7756C9]' : ''} `}>
                  Experience
                </span>
              </h1>
              <h3 className="">Roles & Background</h3>
              <Carousel>
                <CarouselContent>
                  {professionalBackground.map((background, index) => (
                    <CarouselItem key={index} className="basis-4/5 shadow-md bg-[#fcfaff] rounded-lg">
                      <Box direction="col">
                        <h3>{background.companyName}</h3>
                        <p className="">{background.startDate ? new Date(background.startDate).getFullYear() : 'N/A'} - {background.endDate ? new Date(background.endDate).getFullYear() : 'Present'}</p>
                        <h4>{background.roleTitle}</h4>
                        {background.roleDescription?.json ? documentToReactComponents(background.roleDescription.json, options) : <p>No description available.</p>}
                      </Box>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <h3 className="">Areas of focus</h3>
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="basis-1/3">
                    <Box direction="col">
                      <div className="uppercase font-medium">Markets</div>
                      {profile.markets?.map((market, index) => (
                        <p key={index}>{market}</p>
                      ))}
                    </Box>
                  </CarouselItem>
                  <CarouselItem className="basis-1/2">
                    <Box direction="col">
                      <div className="uppercase font-medium">Sectors</div>
                      {profile.sectors?.map((sector, index) => (
                        <p key={index}>{sector}</p>
                      ))}
                    </Box>
                  </CarouselItem>
                  <CarouselItem className="basis-1/2">
                    <Box direction="col">
                      <div className="uppercase font-medium">Skills & Methods</div>
                      {profile.skills?.map((skill, index) => (
                        <p key={index}>{skill}</p>
                      ))}
                    </Box>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <h3 className="mt-4">Education & other attributes</h3>
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="basis-1/2">
                    <Box direction="col">
                      <div className="uppercase font-medium">Education</div>
                      {education.map((edu, index) => (
                        <div key={index}>
                          <h4>{edu.institution}</h4>
                          <h5>{edu.degreeName}</h5>
                          <p>{edu.location.lat}, {edu.location.lon}</p>
                          <p className="">{edu.timeframe}</p>
                        </div>
                      ))}
                    </Box>
                  </CarouselItem>
                  <CarouselItem className="basis-1/2">
                    <Box direction="col">
                      <div className="uppercase font-medium">Awards</div>
                      {awards.map((award, index) => (
                        <div key={index} className="">
                          <h4>{award.awardName}</h4>
                          <p className="">{award.awardDate}</p>
                        </div>
                      ))}
                    </Box>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </Box>
          </Container>
        </Section>
        <Section>
          <Container>
            <Box direction="col" className="p-4 shadow-lg rounded-lg">
              <div className="uppercase font-medium">Notes</div>
              {profile.notes?.json ? documentToReactComponents(profile.notes.json, options) : <p>No notes available.</p>}
              <div className="font-bold">Stilian @ Matic Teams</div>
              <Box direction="col" className="p-4 mx-auto min-w-[239px] max-w-[30rem] shadow-lg rounded-lg bg-[#000227] text-white items-center justify-center">
                <h1 className="">Next <span className={` ${profile.profileType === 'Design' ? 'text-[#7756C9]' : ''} `}>Steps</span></h1>
                <p className="text-white">We meet you, you meet them, things get done.</p>
                <Button className="bg-[#7756C9] text-white rounded-lg">Request Introduction</Button>
                <p className="text-white">Questions? <Link href="mailto:hello@maticteams.com" className="text-white font-bold">Get in touch</Link></p>
              </Box>
            </Box>
          </Container>
        </Section>
        <SimplifyCTA />
      </Main>
    );
  } catch (error) {
    console.error('Error fetching profile:', error);
    return <p>Profile not found or an error occurred.</p>;
  }
}
