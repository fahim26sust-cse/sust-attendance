'use client';
import React, { useEffect } from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import Aurora from '@/app/components/animation/Aurora/Aurora';
import AdminNavbar from '@/app/components/Admin/AdminNavbar';
import { useAuth } from '@/lib/custom_hook/auth';
import { useMarks } from '@/lib/custom_hook/useMarks';
import MarksControls from '@/app/components/Admin/Marks/MarksControl';
import MessageSnackbar from '@/app/components/Admin/Marks/MessageSnackbar';
import MarksFormContainer from '@/app/components/Admin/admin-mark-entry/MarksFormContainer';

export default function AdminMarksPage() {
  const { isAuthenticated, adminEmail } = useAuth();
  const {
    markType,
    filteredCourses,
    selectedCourseCode,
    selectedCourse,
    loadingCourses,
    message,
    setSelectedCourseCode,
    setMessage,
    handleMarkTypeChange,
  } = useMarks();
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
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 2 }}>
        <Grid
          container
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 900,
            mx: 'auto',
            pt: { xs: 2, sm: 6 },
            marginTop: '10px',
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.2 }}>
            Marks — Admin Entry
          </Typography>
        </Grid>

        <AdminNavbar adminEmail={adminEmail} />

        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            background: 'linear-gradient(180deg, rgba(20,20,20,0.55) 0%, rgba(15,15,15,0.55) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <MarksControls
            markType={markType}
            onChangeMarkType={handleMarkTypeChange}
            loadingCourses={loadingCourses}
            filteredCourses={filteredCourses}
            selectedCourseCode={selectedCourseCode}
            onChangeSelectedCourseCode={setSelectedCourseCode}
            selectedCourse={selectedCourse}
            
          />
        </Paper>

         <MarksFormContainer
          selectedCourse={selectedCourse}
          markType={markType}
          setMessage={setMessage}
        />

        <MessageSnackbar message={message} onClose={() => setMessage(null)} />
      </Box>
    </Box>
  );
}
