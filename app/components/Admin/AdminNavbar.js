'use client';

import { Box, useTheme, useMediaQuery } from '@mui/material'; // CHANGED
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSignIn,
  VscSignOut,
  VscMortarBoard,
  VscLock,
  VscGitPullRequestGoToChanges,
} from 'react-icons/vsc';
const Dock = dynamic(() => import('@/app/components/animation/Dock/Dock'), { ssr: false });
export default function AdminNavbar({ adminEmail }) {
  const router = useRouter();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'), { noSsr: true });
  const isSm = useMediaQuery(theme.breakpoints.only('sm'), { noSsr: true });
  const isMd = useMediaQuery(theme.breakpoints.only('md'), { noSsr: true });
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });

  const { panelHeight, baseItemSize, magnification, panelRadius, itemRadius, gap, iconSize } = useMemo(() => {
    if (isXs) return { panelHeight: 50, baseItemSize: 34, magnification: 50, panelRadius: 12, itemRadius: 8, gap: 0.3, iconSize: 15 };
    if (isSm) return { panelHeight: 62, baseItemSize: 46, magnification: 70, panelRadius: 14, itemRadius: 9, gap: 1, iconSize: 20  };
    if (isMd) return { panelHeight: 66, baseItemSize: 50, magnification: 72, panelRadius: 16, itemRadius: 10, gap: 1, iconSize: 24 };
    if (isLgUp) return { panelHeight: 72, baseItemSize: 56, magnification: 75, panelRadius: 18, itemRadius: 12, gap: 1, iconSize: 28 };
    return { panelHeight: 66, baseItemSize: 50, magnification: 72, panelRadius: 16, itemRadius: 10, gap: 16, iconSize: 24 };
  }, [isXs, isSm, isMd, isLgUp]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-token');
    }
    router.push('/admin/login');
  };

  const isLoggedIn = Boolean(adminEmail);

  const items = useMemo(
    () => [
      { icon: <VscHome size={iconSize} color="#fff" />, label: 'Dashboard', onClick: () => router.push('/admin/dashboard') },
      { icon: <VscLock size={iconSize} color="#fff" />, label: 'Show Pin', onClick: () => router.push('/admin/dashboard/pin') },
      { icon: <VscMortarBoard size={iconSize} color="#fff" />, label: 'Mark Entry', onClick: () => router.push('/admin/mark/entry') },
      { icon: <VscArchive size={iconSize} color="#fff" />, label: 'Attendance Archive', onClick: () => router.push('/admin/attendance/record/archieve') },
      { icon: <VscGitPullRequestGoToChanges size={iconSize} color="#fff" />, label: 'Attendance Entry', onClick: () => router.push('/admin/attendance/record/entry') },
      {
        icon: <VscAccount size={iconSize} color="#fff" />,
        label: adminEmail || 'Login',
        onClick: () => (isLoggedIn ? router.push('/admin/dashboard') : router.push('/admin/login')),
      },
      {
        icon: isLoggedIn ? <VscSignOut size={iconSize} color="#fff" /> : <VscSignIn size={iconSize} color="#fff" />,
        label: isLoggedIn ? 'Logout' : 'Login',
        onClick: () => (isLoggedIn ? handleLogout() : router.push('/admin/login')),
      },
    ],
    [adminEmail, isLoggedIn, router, iconSize]
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 10,
        left: 0,
        width: '100%',
        height: panelHeight, 
        pt: {xs: '90px', sm: '110px', md: '120px' , lg: '120px', xl: '120px'},
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: (t) => t.zIndex.appBar + 2,
        pointerEvents: 'none',
      }}
    >
      <Box sx={{ pointerEvents: 'auto' }}>
        <Dock
          items={items}
          panelHeight={panelHeight}
          baseItemSize={baseItemSize}
          magnification={magnification}
          panelRadius={panelRadius} 
          itemRadius={itemRadius}   
          gap={gap}                 
        />
      </Box>
    </Box>
  );
}
