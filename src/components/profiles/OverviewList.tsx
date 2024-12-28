import { Box } from "@/components/global/matic-ds";
import OverviewItem from "@/components/profiles/OverviewItem";

interface OverviewListProps {
    role: string;
    focus: string | undefined;
    tier: string;
    location: string;
    experience: string | undefined;
    engagementType: ("Full-Time" | "Dedicated" | "Fractional")[] | undefined;
}

export default function OverviewList({ role, focus, tier, location, experience, engagementType}: OverviewListProps) {
    return (
        <Box cols={{ sm: 1, md: 3 }}>
            <OverviewItem label="Role" value={role} />
            <OverviewItem label="Focus" value={focus} />
            <OverviewItem label="Tier" value={tier} />
            <OverviewItem label="Location & Timezone" value={location} />
            <OverviewItem label="Experience" value={experience} />
            <OverviewItem label="Engagement Types" value={engagementType?.join(', ')} />
        </Box>
    );
}