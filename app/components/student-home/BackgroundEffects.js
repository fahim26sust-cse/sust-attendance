'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import Footer from '../Footer';
import { Box } from '@mui/material';

const SplashCursor = dynamic(() => import('@/app/components/animation/SplashCursor/SplashCursor'), { ssr: false });
const LightRays = dynamic(() => import('@/app/components/LightRays/LightRays'), { ssr: false });

export default function BackgroundEffects() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: 'black',
      }}
    >
      <SplashCursor />
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      <Box sx={{ mt: '100px',  }}>
        <Footer />
      </Box>
    </div>
  );
}
