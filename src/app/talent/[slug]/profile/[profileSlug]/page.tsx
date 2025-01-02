import { notFound } from 'next/navigation';
import { getTalent, getAllProfiles } from '@/lib/api';
import { Box, Container, Main, Section } from '@/components/global/matic-ds';
import SimplifyCTA from '@/components/profiles/SimplifyCTA';
import { getEducation, getAwards, getLanguages, getWorkSamples, getProfessionalBackground, getTechSpecification } from '@/lib/api';
import ProfileNav from '@/components/profiles/ProfileNav';
import ProfileOverview from '@/components/profiles/ProfileOverview';
import ProfileNotes from '@/components/profiles/ProfileNotes';
import ProfileWorkSamples from '@/components/profiles/ProfileWorkSamples';
import ProfileCareerExperience from '@/components/profiles/ProfileCareerExperience';
import EvalItem from '@/components/profiles/EvalItem';

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

    // Define the state abbreviations as a Record type
    const stateAbbreviations: Record<string, string> = {
      'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
      'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
      'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
      'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
      'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
      'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
      'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
      'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
      'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
      'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY'
    };

    const getLocationName = async (location: string) => {
      if (!location) return '';
      
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`);
        const data = await response.json() as { 
          features: Array<{ 
            context: Array<{ 
              text: string; 
              id: string; 
            }> 
          }> 
        };
        
        if (!data.features || data.features.length === 0) {
          return location;
        }

        const context = data.features[0]?.context;
        if (!context) return location;

        const state = context.find(item => item?.id?.startsWith('region'))?.text;
        if (!state) return location;

        return stateAbbreviations[state.toLowerCase()] ?? state;
      } catch (error) {
        console.error('Error fetching location:', error);
        return location;
      }
    };

    // Format talent location with timezone
    const getTalentLocation = async (lat: number, lon: number) => {
      try {
        const locationName = await getLocationName(`${lat}, ${lon}`);
        // Since we have the timezone offset from the current time (-07:00), we'll use MST
        const timezone = "MST";
        return `${locationName}  •  ${timezone}`;
      } catch (error) {
        console.error('Error formatting talent location:', error);
        return '';
      }
    };

    const talentLocation = await getTalentLocation(talent.location.lat, talent.location.lon);

    const lat = talent.location.lat;
    const lon = talent.location.lon;

    const location = (lat !== undefined && lon !== undefined)
      ? `${lat.toString()}, ${lon.toString()}`
      : 'Location not available';

    const education = await getEducation(talent.sys.id);
    const awards = await getAwards(talent.sys.id);
    const languages = await getLanguages(talent.sys.id);
    const workSamples = await getWorkSamples(talent.sys.id);
    const professionalBackground = await getProfessionalBackground(talent.sys.id);
    const techSpecification = await getTechSpecification(talent.sys.id);

    // Get location names for education institutions
    const educationWithLocations = await Promise.all(education.map(async (edu) => {
      const locationName = await getLocationName(`${edu.location.lat}, ${edu.location.lon}`);
      return {
        ...edu,
        locationName
      };
    }));

    return (
      <Main className="mt-0">
        <Section className="flex flex-col gap-4">
          <ProfileNav
            name={talent.name}
            profileType={profile.profileType}
            headshot={talent.headshot.url}
            rate={profile.rate}
          />
          <ProfileOverview
            name={talent.name}
            tier={talent.tier?.name}
            tags={profile.profileTags}
            type={profile.profileType}
            role={profile.role}
            focus={profile.focus}
            level={profile.level}
            experience={profile.experience}
            engagementType={profile.engagementType}
            availability={profile.availability}
            headshot={talent.headshot.url}
            description={profile.talentBriefDescription}
            location={profile.talentBriefLocation}
            timezone={talentLocation}
          />
          {workSamples.length > 0 && (
            <ProfileWorkSamples
              type={profile.profileType}
              samples={workSamples}
            />
          )}
          {techSpecification.length > 0 && (
            <Container>
              <Box direction="col" className="p-4 md:p-8 shadow-lg rounded-lg bg-white">
                {techSpecification.map((tech, index) => (
                  <Box key={index} direction="col" className="gap-2">
                    <Box className="justify-between items-center">
                      <h1 className="font-bold flex gap-2">
                        {profile.profileType === 'Engineering' ? 'Tech' : ''}
                        {profile.profileType === 'Management' ? 'Management' : ''}
                        <span className={`
                          ${profile.profileType === 'Design' ? 'text-design-purple' : ''}
                          ${profile.profileType === 'Engineering' ? 'text-engineering-blue' : ''}
                          ${profile.profileType === 'Management' ? 'text-management-red' : ''}
                        `}>
                          Evaluation
                        </span>
                      </h1>
                      <h6 className="font-bold">{tech.repo}</h6>
                    </Box>
                    <Box direction="col" gap={2} className="my-4">
                      <p className="uppercase font-bold text-[#a4a7ae] text-[10px] md:text-[12px]">Blended Score</p>
                      <p className="font-semibold text-4xl">{tech.blendedScore}+</p>
                    </Box>
                    <Box cols={{ base: 1, md: 2 }} gap={10} className="">
                      <EvalItem field={tech.field1} score={tech.field1Score} desc={tech.field1Description} />
                      <EvalItem field={tech.field2} score={tech.field2Score} desc={tech.field2Description} />
                      <EvalItem field={tech.field3} score={tech.field3Score} desc={tech.field3Description} />
                      <EvalItem field={tech.field4} score={tech.field4Score} desc={tech.field4Description} />
                      <EvalItem field={tech.field5} score={tech.field5Score} desc={tech.field5Description} />
                      <EvalItem field={tech.field6} score={tech.field6Score} desc={tech.field6Description} />
                      <EvalItem field={tech.field7} score={tech.field7Score} desc={tech.field7Description} />
                      <EvalItem field={tech.field8} score={tech.field8Score} desc={tech.field8Description} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Container>
          )}
          <ProfileCareerExperience
            type={profile.profileType}
            roles={professionalBackground}
            markets={profile.markets}
            sectors={profile.sectors}
            skills={profile.skills}
            tools={profile.tools}
            location={talentLocation}
            education={educationWithLocations}
            awards={awards}
            languages={languages}
          />
        </Section>
        <Section>
          <ProfileNotes
            type={profile.profileType}
            notes={profile.notes}
          />
        </Section>
        <SimplifyCTA />
      </Main>
    )
  } catch (error) {
    console.error('Error fetching profile:', error instanceof Error ? error.message : 'Unknown error');
    return (
      <div>
        <p>Profile not found or an error occurred.</p>
      </div>
    );
  }
} 