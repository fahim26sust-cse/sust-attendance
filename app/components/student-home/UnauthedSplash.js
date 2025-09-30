'use client';

import Link from 'next/link';
import { Typography, Paper, Box, Divider } from '@mui/material';
import Navbar from '@/app/components/Navbar';
import dynamic from 'next/dynamic';
import Footer from '../Footer';

const BackgroundEffects = dynamic(() => import('./BackgroundEffects'), { ssr: false });

export default function UnauthedSplash() {
  return (
    <>
    <div>
      <Navbar />
      <BackgroundEffects />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            maxWidth: 400,
            width: '90%',
            color: 'white',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            No Session Found
          </Typography>
          
          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
            Don't have an account yet?{' '}
            <Link 
              href="/register" 
              style={{ 
                color: '#90caf9', 
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#bbdefb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#90caf9'}
            >
              Sign Up
            </Link>
          </Typography>
          
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Already have an account?{' '}
            <Link 
              href="/login" 
              style={{ 
                color: '#90caf9', 
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#bbdefb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#90caf9'}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
      </div>

    </>
  );
}