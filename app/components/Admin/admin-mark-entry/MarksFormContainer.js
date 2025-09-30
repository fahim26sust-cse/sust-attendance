'use client';

import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import TheoryMarksForm from '@/app/components/Admin/Marks/TheoryMarksForm';
import LabMarksForm from '@/app/components/Admin/Marks/LabMarksForm';

const MarksFormContainer = ({ selectedCourse, markType, setMessage, }) => {
  if (!selectedCourse) return null;
  return (
    <>
      {markType === 'theory' && (
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            background: 'linear-gradient(180deg, rgba(22,22,22,0.6) 0%, rgba(16,16,16,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <TheoryMarksForm course={selectedCourse} onMessage={setMessage} />
        </Paper>
      )}

      {markType === 'lab' && (
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            background: 'linear-gradient(180deg, rgba(22,22,22,0.6) 0%, rgba(16,16,16,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <LabMarksForm course={selectedCourse} onMessage={setMessage} />
        </Paper>
      )}
    </>
  );
};

export default MarksFormContainer;
