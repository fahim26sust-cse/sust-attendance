'use client';

import { AppBar, Toolbar, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
  VscSignIn,   
  VscSignOut,  
  VscMortarBoard,
  VscCircleSlash,
  VscFlame,
} from 'react-icons/vsc';
import dynamic from 'next/dynamic';
const Dock = dynamic(() => import('@/app/components/animation/Dock/Dock'), { ssr: false });

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    setMounted(true);
  }, []);

  const { panelHeight, baseItemSize, magnification, panelRadius, itemRadius, gap, iconSize } = useMemo(() => {
    if (!mounted) {
      return { panelHeight: 66, baseItemSize: 50, magnification: 72, panelRadius: 16, itemRadius: 10, gap: 1, iconSize: 24 };
    }
    
    if (isXs) return { panelHeight: 50, baseItemSize: 34, magnification: 50, panelRadius: 12, itemRadius: 8, gap: 0.3, iconSize: 15 };
    if (isSm) return { panelHeight: 62, baseItemSize: 46, magnification: 70, panelRadius: 14, itemRadius: 9, gap: 1, iconSize: 20  };
    if (isMd) return { panelHeight: 66, baseItemSize: 50, magnification: 72, panelRadius: 16, itemRadius: 10, gap: 1, iconSize: 24 };
    if (isLgUp) return { panelHeight: 72, baseItemSize: 56, magnification: 75, panelRadius: 18, itemRadius: 12, gap: 1, iconSize: 28 };
    return { panelHeight: 66, baseItemSize: 50, magnification: 72, panelRadius: 16, itemRadius: 10, gap: 1, iconSize: 24 };
  }, [isXs, isSm, isMd, isLgUp, mounted]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) return;

    (async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data?.id ? data : null);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    })();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const items = useMemo(
    () => [
      {
        icon: <VscHome size={iconSize} color="#fff" />,
        label: 'Home',
        onClick: () => (window.location.href = '/'),
      },
      {
        icon: user
          ? <VscArchive size={iconSize} color="#fff" />
          : <VscCircleSlash  size={iconSize} color="#fff" />,
        label: user ? 'Attendance Archive' : 'Login First',
        onClick: () => (user ? (window.location.href = '/attendance_archieve') : (window.location.href = '/login')),
      },
      {
        icon: user
          ? <VscMortarBoard size={iconSize} color="#fff" />
          : <VscCircleSlash  size={iconSize} color="#fff" />,
        label: user ? 'Marks' : 'Login First',
        onClick: () => (user ? (window.location.href = '/student_mark') : (window.location.href = '/login')),
      },
      {
        icon: user
          ? <VscFlame size={iconSize} color="#fff" />
          : <VscCircleSlash  size={iconSize} color="#fff" />,
        label: user ? 'attendance-entry' : 'Login First',
        onClick: () => (user ? (window.location.href = '/attendance-entry') : (window.location.href = '/login')),
      },
      {
        icon: user
          ? <VscSignOut size={iconSize} color="#fff" />
          : <VscSignIn  size={iconSize} color="#fff" />,
        label: user ? 'Logout' : 'Login',
        onClick: () => (user ? handleLogout() : (window.location.href = '/login')),
      },
    ],
    [user, iconSize]
  );

  if (!mounted) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 10,
          left: 0,
          width: '100%',
          height: 66,
          pt: {xs: '90px', sm: '110px', md: '120px' , lg: '120px', xl: '120px'},
          backgroundColor: 'transparent',
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      />
    );
  }

  return (
    <>
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
          zIndex: (theme) => theme.zIndex.appBar + 1,
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
    </>
  );
}