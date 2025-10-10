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
        raysColor="#0011ff "
        raysSpeed={2}
        lightSpread={1.5}
        rayLength={2}
        followMouse
        mouseInfluence={0.5}
        noiseAmount={0.0}
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
