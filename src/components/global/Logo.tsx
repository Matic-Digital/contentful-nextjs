import Link from 'next/link';

import { Box } from '@/components/global/matic-ds';

export function Logo() {
  return (
    <Link href="/" className="mr-6">
      <Box gap={2} className="items-center">
        <span className="text-lg font-extrabold text-gradient-pink">|||</span>
        <h1 className="text-2xl">Matic</h1>
      </Box>
    </Link>
  );
}
