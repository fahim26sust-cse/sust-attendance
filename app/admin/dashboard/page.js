'use client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '@/lib/custom_hook/auth';
import Aurora from '@/app/components/animation/Aurora/Aurora';
import AdminNavbar from '@/app/components/Admin/AdminNavbar';
import ParentCourseComp from '@/app/components/ParentCourseComp';
import TextType from '@/app/components/animation/Text/TextType/TextType';
import { useMemo } from 'react';

export default function AdminDashboard() {
  const { isAuthenticated, adminEmail } = useAuth();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'), { noSsr: true });
  const isSm = useMediaQuery(theme.breakpoints.only('sm'), { noSsr: true });
  const isMd = useMediaQuery(theme.breakpoints.only('md'), { noSsr: true });
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const fontSize = useMemo(() => {
    if (isXs) return '1rem';
    if (isSm) return '2rem';
    if (isMd) return '2.5rem';
    if (isLgUp) return '3rem';
    return '2.5rem';
  }, [isXs, isSm, isMd, isLgUp]);

  const textHeight = useMemo(() => {
    if (isXs) return '60px';  
    if (isSm) return '100px';  
    if (isMd) return '150px'; 
    if (isLgUp) return '180px';
    return '150px';           
  }, [isXs, isSm, isMd, isLgUp]);

  if (!isAuthenticated) return <p>Loading...</p>;
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: '#000',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Aurora colorStops={['#ff00ff', '#00ffdd', '#ffe600']} blend={0.7} amplitude={1.0} speed={1} />
      </Box>
      <AdminNavbar adminEmail={adminEmail} />
      <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 4 }, pt: '120px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
          <TextType
            text={[
              `Welcome, ${adminEmail}! to your admin dashboard`,
              'You have admin access',
              'You can add course',
              'You can set Geo-fence Location',
              'First fetch your geo-fence location clicking Get Current Location',
              'Then select course and distance',
              'Then approve or decline student access to entry pin',
            ]}
            textColors={['#ffffff', '#c2fcda']}
            as={Typography}
            typingSpeed={100}
            pauseDuration={2300}
            showCursor
            cursorCharacter="_"
            style={{
              fontSize: fontSize,
              fontWeight: 1000,
              textAlign: 'center',
              width: '100%',
              display: 'block',
              height: textHeight,
            }}
          />
        </Box>
        <ParentCourseComp />
      </Box>
    </Box>
  );
}
