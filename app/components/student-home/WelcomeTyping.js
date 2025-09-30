'use client';

import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';

// Keep your dynamic load for TextType
const TextType = dynamic(() => import('@/app/components/animation/Text/TextType/TextType'), { ssr: false });

export default function WelcomeTyping({ user }) {
  const lines = [
    `Welcome, ${user.name}!`,
    `Your registered ID is, ${user.id}!`,
    'Submit your attendance through this website',
    'If you are physically present at the designated ',
    'geo location set by your teacher,',
    'then you are eligible to enter the attendance pin.',
    'Please request the pin from your teacher and input it on this website.',
    'Select your course and click the button',
    'to display your current location and the pin input field.',
    'The pin input field will be visible for only 20 seconds,',
    'so enter the pin given by your teacher within this time frame.',
  ];

  return (
    <TextType
      text={lines}
      textColors={['#ffffff', '#c2fcda']}
      as={Typography}
      typingSpeed={100}
      pauseDuration={2300}
      showCursor
      cursorCharacter="_"
      sx={{
        
        fontWeight: { xs: 500, sm: 600, md: 700, lg: 1000 },
        textAlign: 'center',
        width: '100%',
        display: 'block',
        height: { xs: '45px', sm: '80px', md: '120px', lg: '150px' },
        fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem', lg: '3rem' },
      }}
    />
  );
}
