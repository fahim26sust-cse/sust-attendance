'use client';

import { useState, useMemo } from 'react';
import {
  Box, Paper, Grid, Button, Typography, Snackbar, Alert, Stack, Divider, Chip, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { calculateDistance } from './geo-fence-attendance/calculateDistance';
import AdminLocationCard from './geo-fence-attendance/AdminLocationCard';
import UserLocationCard from './geo-fence-attendance/UserLocationCard';
import StartTimerButton from './geo-fence-attendance/StartTimerButton';
import PinEntry from './geo-fence-attendance/PinEntry';
import SnackbarGlobal from './geo-fence-attendance/SnackbarGlobal';
import TimerHeader from './geo-fence-attendance/TimerHeader';
import useCountdown from './geo-fence-attendance/useCountdown';

const GeoFenceAttendance = ({ userLocation, geoLocation, studentId, courses, }) => {
  const theme = useTheme();
  const isXs = theme.breakpoints.down('sm') ? true : false;
  const [pin, setPin] = useState('');
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [error, setError] = useState('');
  const [isPinInputDisabled, setIsPinInputDisabled] = useState(true);   
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const openSnack = (message, severity = 'info') => setSnackbar({ open: true, message, severity });
  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((p) => ({ ...p, open: false }));
  };

  const {
    timeLeft,
    isActive: isTimerActive,
    start: startTimer,
    stop: stopTimerInternal,
    reset: resetTimer,
  } = useCountdown({
    initial: 10,
    onExpire: () => {
      openSnack('Time expired. PIN entry disabled.', 'info');
      setIsPinInputDisabled(true);
      setIsStartButtonDisabled(true); 
      
    },
  });

  const stopTimer = () => {
    stopTimerInternal();
    setIsPinInputDisabled(true);
    setIsStartButtonDisabled(false);
  };

  const distanceToAdmin = useMemo(() => {
    if (!userLocation || !geoLocation?.geoLocation) return Infinity;
    return calculateDistance(
      userLocation.lat, userLocation.lng,
      geoLocation.geoLocation.lat, geoLocation.geoLocation.lng
    );
  }, [userLocation, geoLocation]);

  const insideFence = useMemo(() => {
    const maxDist = geoLocation?.distance ?? 0;
    return Number.isFinite(distanceToAdmin) && distanceToAdmin <= maxDist;
  }, [distanceToAdmin, geoLocation]);

  const showPinUI = insideFence && !attendanceSaved && isTimerActive && timeLeft > 0; 

  const handleStartTimer = () => {
    setIsStartButtonDisabled(true);
    setIsPinInputDisabled(false);
    resetTimer(10);
    startTimer();
  };

  const handleSubmitPin = async () => {
    setError('');
    if (!pin) { openSnack('Pin is required.', 'warning'); return; }
    if (!geoLocation?.geoLocation) { openSnack('Location data unavailable.', 'error'); return; }

    const adminPin = geoLocation.pin;
    const maxDistance = geoLocation.distance;

    if (distanceToAdmin > maxDistance) {
      openSnack('You are too far from the geo-fence.', 'warning');
      return;
    }
    if (pin !== adminPin) {
      openSnack('The pin you entered is incorrect.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/attendance/create', {
        method: 'POST',
        body: JSON.stringify({
          studentId,
          studentName: courses?.studentName,
          courseCode: courses?.courseCode,
          courseName: courses?.courseName,
          pin,
          adminPin,
          timestamp: new Date().toISOString(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.success) {
        setAttendanceSaved(true);
        stopTimer();
        setPin('');
        openSnack('Attendance saved successfully!', 'success');
      } else {
        openSnack(data?.message || 'Failed to save attendance.', 'error');
      }
    } catch (err) {
      console.error(err);
      openSnack('Error while saving attendance.', 'error');
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 1.5, sm: 3 },
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.06) 100%)',
        borderRadius: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 780,
          mx: 'auto',
          borderRadius: { xs: 2, sm: 3 },
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        <TimerHeader
          isXs={isXs}
          isTimerActive={isTimerActive}
          attendanceSaved={attendanceSaved}
          timeLeft={timeLeft}
          total={10}
        />

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            <Grid item xs={12} md={6}>
              <AdminLocationCard isXs={isXs} geoLocation={geoLocation} />
            </Grid>

            <Grid item xs={12} md={6}>
              <UserLocationCard
                isXs={isXs}
                userLocation={userLocation}
                distanceToAdmin={distanceToAdmin}
                insideFence={insideFence}
                courses={courses}
              />
            </Grid>

            <StartTimerButton
              visible={insideFence && !isTimerActive && !attendanceSaved}
              disabled={isStartButtonDisabled}
              onStart={handleStartTimer}
              isXs={isXs}
            />

            <PinEntry
              visible={showPinUI}
              isXs={isXs}
              timeLeft={timeLeft}
              pin={pin}
              setPin={setPin}
              disabled={isPinInputDisabled}
              onSubmit={handleSubmitPin}
            />

            {attendanceSaved && (
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    bgcolor: (t) => t.palette.success.light + '22',
                    borderColor: 'success.light',
                  }}
                >
                  <Typography variant={isXs ? 'body2' : 'body1'} sx={{ color: 'success.main', fontWeight: 700 }}>
                    Attendance has been saved successfully!
                  </Typography>
                  {courses?.studentName && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {courses.studentName} · {courses?.courseCode} {courses?.courseName ?? ''}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>

      <SnackbarGlobal snackbar={snackbar} onClose={handleCloseSnackbar} />
    </Box>
  );
};

export default GeoFenceAttendance;
