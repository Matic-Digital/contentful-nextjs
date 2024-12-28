import { Box, Prose } from "../global/matic-ds";

interface OverviewItemProps {
    label: string;
    value: string | undefined;
}

export default function OverviewItem({ label, value }: OverviewItemProps) {
    return (
        <Box direction="col" gap={0.5} className="items-start">
            <p className="uppercase">{label}</p>
            <h6>{value}</h6>
        </Box>
    )
}