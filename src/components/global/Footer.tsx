// Next.js imports
import Link from 'next/link';

import { Container, Box } from '@/components/global/matic-ds';

import { Button } from '../ui/button';

/**
 * Footer component
 * Responsive footer with multiple columns of links and company information
 * Features:
 * - Responsive grid layout (2 columns on mobile, 4 on desktop)
 * - Company branding and description
 * - Organized link sections
 * - Copyright notice
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t bg-[#000227] py-12">
      <Container width="full">
        <Box className="justify-between">
          <Box gap={4}>
            <div className="h-full aspect-square border border-white"></div>
            <div className="text-white text-2xl font-bold">Teams</div>
          </Box>
          <Button variant="green">Build your team</Button>
        </Box>
      </Container>
      <Container width="full">
        <Box wrap={true} gap={8} className="mt-12">
          <Box direction="col" gap={4} className="items-start w-fit flex-grow">
            <div className="text-[#32d583] uppercase font-bold">Resources</div>
            <Link href="#" className='text-white'>Services</Link>
            <Link href="#" className='text-white'>About</Link>
            <Link href="#" className='text-white'>Blog</Link>
            <Link href="#" className='text-white'>Contact</Link>
          </Box>
          <Box direction="col" gap={4} className="items-start max-w-[45vw]">
            <div className="text-[#32d583] uppercase font-bold">Contact</div>
            <div className="text-white">(303) 248-6385</div>
            <div className="font-bold text-white">hello@maticteams.com</div>
            <div className="text-white">3456 Ringsby Court, 205 Denver, CO 80216</div>
          </Box>
          <Box direction="col" gap={4} className="items-start">
            <div className="text-[#32d583] uppercase font-bold">Who we are</div>
            <p className="text-white">We are a business transformation agency solving the toughest brand, digital and talent challenges next generation business faces.</p>
            <p className="text-white">See our full capabilities at <Link href="https://maticdigital.com" className="text-white font-bold">MaticDigital.com</Link></p>
          </Box>
          <Box gap={8}>
            <Link href=''>
              <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.32812 4.31939C1.32812 3.60324 1.61261 2.91642 2.11901 2.41003C2.62541 1.90363 3.31223 1.61914 4.02838 1.61914H20.2299C20.946 1.61914 21.6329 1.90363 22.1393 2.41003C22.6456 2.91642 22.9301 3.60324 22.9301 4.31939V20.5209C22.9301 21.2371 22.6456 21.9239 22.1393 22.4303C21.6329 22.9367 20.946 23.2212 20.2299 23.2212H4.02838C3.31223 23.2212 2.62541 22.9367 2.11901 22.4303C1.61261 21.9239 1.32813 21.2371 1.32812 20.5209V4.31939Z" stroke="white" strokeWidth="1.51889" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.12891 11.0703V17.8209" stroke="white" strokeWidth="1.51889" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.12891 7.01953V7.03325" stroke="white" strokeWidth="1.51889" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5312 17.8209V11.0703" stroke="white" strokeWidth="1.51889" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.9318 17.8209V13.7706C17.9318 13.0544 17.6473 12.3676 17.1409 11.8612C16.6345 11.3548 15.9477 11.0703 15.2315 11.0703C14.5154 11.0703 13.8285 11.3548 13.3221 11.8612C12.8157 12.3676 12.5312 13.0544 12.5312 13.7706" stroke="white" strokeWidth="1.51889" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href=''>
              <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7432 22.98H5.00825C2.97207 22.98 1.30859 21.3165 1.30859 19.2803V4.54535C1.30859 2.50918 2.97207 0.845703 5.00825 0.845703H19.7432C20.946 0.845703 21.6329 1.90363 22.1393 2.41003C22.6456 2.91642 22.9301 3.60324 22.9301 4.31939V19.2803C22.9301 21.3256 21.7885 22.98 19.7432 22.98Z" stroke="white" strokeWidth="1.51889" />
                <path d="M8.3627 15.9354C9.43532 17.008 10.8625 17.5989 12.3805 17.5989C13.8985 17.5989 15.3166 17.008 16.3983 15.9354C17.4709 14.8628 18.0618 13.4356 18.0618 11.9176C18.0618 10.3996 17.4709 8.97243 16.3983 7.89981C15.3257 6.82718 13.8985 6.23633 12.3805 6.23633C10.8625 6.23633 9.43532 6.82718 8.3627 7.89981C7.29007 8.97243 6.69922 10.3996 6.69922 11.9176C6.69922 13.4356 7.29007 14.8628 8.3627 15.9354Z" stroke="white" strokeWidth="1.51889" />
                <path d="M19.169 6.05081C19.7714 6.05081 20.2598 5.56243 20.2598 4.95997C20.2598 4.35752 19.7714 3.86914 19.169 3.86914C18.5665 3.86914 18.0781 4.35752 18.0781 4.95997C18.0781 5.56243 18.5665 6.05081 19.169 6.05081Z" stroke="white" strokeWidth="1.51889" />
              </svg>
            </Link>
            <Link href=''>
              <svg width="2rem" height="2rem" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.7846 14.4159V23.9811H4.37888V14.4159H0.71875V10.5375H4.37888V9.12633C4.37888 3.88745 6.57327 1.13281 11.2162 1.13281C12.6396 1.13281 12.9954 1.36096 13.7749 1.54685V5.38307C12.9022 5.23097 12.6565 5.14647 11.75 5.14647C10.674 5.14647 10.0978 5.45067 9.57254 6.0506C9.04724 6.65054 8.7846 7.68986 8.7846 9.17703V10.5459H13.7749L12.4363 14.4244H8.7846V14.4159Z" stroke="white" strokeWidth="1.26574" />
              </svg>
            </Link>
            <Link href=''>
              <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5215 21.512C19.6715 19.3713 19.6125 16.7012 18.9086 15.0649C18.4098 13.906 17.4469 12.9592 16.1239 12.3268C16.0281 12.2811 15.93 12.2366 15.832 12.1945L15.4147 12.0159L15.39 11.564C15.3059 10.021 14.8661 8.82612 14.0824 8.01258C13.3141 7.21508 12.2266 6.80624 10.8495 6.79749H10.8109C9.98069 6.79749 9.22556 6.96861 8.56604 7.30598C8.12652 7.53106 7.73725 7.82614 7.4031 8.18758L7.96018 8.56847C8.2936 8.23547 8.68726 7.97587 9.13653 7.79284C9.6402 7.5877 10.2039 7.48366 10.8119 7.48366C10.8239 7.48366 10.8358 7.48366 10.8475 7.48366C12.1154 7.49217 13.0905 7.88083 13.7461 8.63945C14.2066 9.17225 14.5137 9.89124 14.6588 10.7762L14.8242 11.7838L13.8142 11.6126C12.9419 11.4649 11.9851 11.4194 10.9705 11.4775C9.65483 11.5531 8.56409 11.9503 7.81603 12.6265C7.11139 13.2635 6.76651 14.1143 6.81846 15.087C6.87212 16.0899 7.37554 16.954 8.23579 17.5201C9.00068 18.0233 9.9963 18.269 11.0395 18.2124C11.7292 18.1747 12.3461 18.0262 12.8732 17.7707C13.3876 17.5214 13.832 17.1619 14.1939 16.702C14.7732 15.9662 15.1356 15.008 15.302 13.7725L15.4503 12.671L16.4052 13.2453C17.3098 13.7895 17.9547 14.4976 18.3215 15.3503C18.9367 16.7795 18.9806 19.1198 17.0805 21.0118C16.2769 21.8117 15.3878 22.3793 14.362 22.7468C13.3607 23.1056 12.1924 23.285 10.7902 23.2952H10.7848H10.7795C9.24068 23.2837 7.86481 23.0263 6.69016 22.53C5.48966 22.0227 4.48233 21.2605 3.69622 20.2644C2.25962 18.4443 1.51742 15.8532 1.4901 12.5633V12.5572V12.5511C1.51717 9.26121 2.25938 6.67012 3.69622 4.85003C4.48257 3.85395 5.48966 3.09169 6.69016 2.58441C7.86481 2.08807 9.24068 1.83066 10.7795 1.81923H10.7848H10.7902C13.9373 1.84257 16.3564 2.86369 17.9801 4.85441C18.633 5.65507 19.1552 6.62345 19.5371 7.74083L20.1772 7.57068C19.7696 6.36045 19.1964 5.29825 18.4681 4.40522C17.5993 3.3401 16.5178 2.52461 15.2532 1.9816C13.97 1.43008 12.468 1.14472 10.7887 1.13281H10.7805C9.10629 1.14448 7.61505 1.43057 6.34845 1.98306C5.10161 2.5268 4.04257 3.34326 3.20085 4.40935C1.664 6.35632 0.870824 9.09666 0.84375 12.554V12.5567V12.5579C0.870824 16.0173 1.664 18.7576 3.20085 20.7048C4.04257 21.7709 5.10136 22.5874 6.34845 23.1311C7.61481 23.6833 9.1058 23.9694 10.7797 23.9811H10.7895C12.3017 23.9704 13.5676 23.7689 14.6593 23.3647C15.7322 22.9675 16.6686 22.3615 17.5218 21.5118L17.5215 21.512ZM14.7188 13.151C14.5895 14.7591 14.1488 15.8947 13.3715 16.6232C12.5849 17.3602 11.6446 17.4919 11.0058 17.5269C10.9188 17.5318 10.8319 17.5342 10.7458 17.5342C9.7724 17.5342 8.85775 17.2282 8.25969 16.6942C7.77286 16.2593 7.49725 15.6901 7.46286 15.0481C7.397 13.8146 8.28506 12.319 11.0049 12.1627C11.2653 12.1476 11.5271 12.1401 11.7824 12.1401C12.6185 12.1401 13.4137 12.221 14.1454 12.3805L14.7695 12.5164L14.7186 13.151H14.7188Z" fill="white" stroke="white" strokeWidth="1.01259" />
              </svg>
            </Link>
          </Box>

        </Box>
      </Container>
      {/* Copyright section */}
      <div className="mt-8 pt-8">
        <Container width="full" className='flex justify-between'>
          <Box gap={4} className='items-center'>
            <p className=" text-sm text-white">
              &copy; Matic Digital, {new Date().getFullYear()}
            </p>
            <Link href='#' className="text-white">Privacy Policy</Link>
          </Box>
        </Container>
      </div>
    </footer>
  );
}
