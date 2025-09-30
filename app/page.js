'use client';

import { Box, Paper } from '@mui/material';
import Navbar from '@/app/components/Navbar';
import FetchStudentData from '@/app/components/FetchStudentDetail';
import { useSessionUser } from '@/lib/custom_hook/student/useSessionUser';
import dynamic from 'next/dynamic';
import Footer from './components/Footer';
// import UnauthedSplash from './components/student-home/UnauthedSplash';
// import BackgroundEffects from './components/student-home/BackgroundEffects';
// import WelcomeTyping from './components/student-home/WelcomeTyping';

const UnauthedSplash = dynamic(() => import('./components/student-home/UnauthedSplash'), { ssr: false });
const BackgroundEffects = dynamic(() => import('./components/student-home/BackgroundEffects'), { ssr: false });
const WelcomeTyping = dynamic(() => import('./components/student-home/WelcomeTyping'), { ssr: false });

export default function HomePage() {

  const { mounted, user } = useSessionUser();

  if (!mounted) return null;
  if (!user) return <UnauthedSplash />;

  return (
    <>
      <div>
        <Navbar />
        <BackgroundEffects />

        <Box
          sx={{
            pt: '16px',
            pb: '16px',
            px: 0,
            position: 'relative',
            zIndex: 1,
            mt: { xs: '70px', sm: '70px', md: '90px', lg: '100px' },
            marginBottom: '100px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '160px', pt: { xs: '10px', sm: '25px', md: '30px', lg: '35px' }, }}>
            {/* <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 2.5, md: 4 }, pt: '12px' }}> */}
            <WelcomeTyping user={user} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              mt: '20px',

            }}
          >
            <FetchStudentData />
          </Box>

        </Box>

      </div>

    </>
  );
}
