'use client';

import { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Chip, Alert, Collapse
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { NeoButton } from './DropInComponent';

const GradientText = dynamic(() => import('./animation/Text/GradientText/GradientText'), { ssr: false });
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const GridWrap = styled(Grid)(({ theme }) => ({
  maxWidth: 1200,
  width: '100%',
  margin: '0 auto',
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: 18,
  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
  animation: `${floatUp} 420ms ease both`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
    borderColor: 'rgba(64,121,255,0.45)',
  },
}));

const Pill = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: 0.4,
  background: 'rgba(255,255,255,0.10)',
  border: '1px solid rgba(255,255,255,0.20)',
  color: '#e9eefb',
}));

export default function UserEnrolledCourses({
  enrollments = [],
  loading = false,
  error = null,
}) {
  const [showError, setShowError] = useState(true);

  if (loading) {
    return (
      <Box p={3} display="flex" flexDirection="column" alignItems="center" gap={1.5}>
        <Typography variant="h6" sx={{ color: '#bbb' }}>Loading...</Typography>
        {error && (
          <Collapse in={Boolean(error) && showError} unmountOnExit>
            <Alert
              severity="error"
              onClose={() => setShowError(false)}
              sx={{
                borderRadius: 2,
                background: 'rgba(255,0,0,0.06)',
                border: '1px solid rgba(255,0,0,0.25)',
                color: '#ffd9d9',
              }}
            >
              {error}
            </Alert>
          </Collapse>
        )}
      </Box>
    );
  }

  return (
    <NeoButton>
      <Box sx={{ px: 4, py: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 3, width: '100%' }}>
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            <Typography variant="h4">
              Your Enrolled Courses
            </Typography>
          </GradientText>

          {error && showError && (
            <Box sx={{ maxWidth: 900, mx: 'auto', mt: 1.5 }}>
              <Collapse in={Boolean(error)} unmountOnExit>
                <Alert
                  severity="error"
                  onClose={() => setShowError(false)}
                  sx={{
                    borderRadius: 2,
                    background: 'rgba(255,0,0,0.06)',
                    border: '1px solid rgba(255,0,0,0.25)',
                    color: '#ffd9d9',
                  }}
                >
                  {error}
                </Alert>
              </Collapse>
            </Box>
          )}
        </Box>

        {enrollments.length === 0 ? (
          <Box sx={{ textAlign: 'center', color: 'rgba(234,242,255,0.7)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              You haven’t enrolled in any courses yet.
            </Typography>
            <Typography variant="body2">
              Enroll in a course to see it listed here.
            </Typography>
          </Box>
        ) : (
          <GridWrap container spacing={3}>
            {enrollments.map((enrollment, idx) => (
              <Grid item xs={12} sm={6} md={4} key={`${enrollment.courseCode}-${idx}`}>
                <GlassCard>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                      <Pill size="small" label="Enrolled" />
                      {enrollment.instructor && (
                        <Pill size="small" label={`Instructor: ${enrollment.instructor}`} />
                      )}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ color: '#ffffff', fontWeight: 800, letterSpacing: 0.2, lineHeight: 1.2, mb: 0.5 }}
                    >
                      {enrollment.courseName}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(234,242,255,0.75)', fontWeight: 500, letterSpacing: 0.4 }}
                    >
                      Code: {enrollment.courseCode}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
            ))}
          </GridWrap>
        )}
      </Box>
    </NeoButton>


  );
}
