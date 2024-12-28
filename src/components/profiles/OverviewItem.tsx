import { Box } from "../global/matic-ds";

interface OverviewItemProps {
    label: string;
    value: string | number | undefined;
    color: string;
}

export default function OverviewItem({ label, value, color }: OverviewItemProps) {
    return (
        <Box direction="col" gap={0.5} className={`
            items-start border p-4 h-full justify-center
            ${color === 'Design' ? 'border-[#d6bbfb]' : ''}
        `}>
            <p className="uppercase font-medium">{label}</p>
            <div className="font-semibold">{value}</div>
        </Box>
    )
}