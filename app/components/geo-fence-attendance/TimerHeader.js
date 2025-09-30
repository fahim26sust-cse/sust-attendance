'use client';

import { Box, Stack, Typography, Chip, LinearProgress } from '@mui/material';

const TimerHeader = ({ isXs, isTimerActive, attendanceSaved, timeLeft, total }) => {
  const showTimer = isTimerActive && !attendanceSaved;
  const progress = Math.max(0, Math.min(100, (timeLeft / total) * 100));

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        background: 'linear-gradient(90deg, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.12) 100%)',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} flexWrap="wrap">
        <Typography variant={isXs ? 'subtitle1' : 'h6'} fontWeight={700}>
          Geo-Fence Attendance
        </Typography>
        {showTimer && (
          <Chip
            label={`Time Left: ${timeLeft}s`}
            color={timeLeft <= 5 ? 'error' : 'primary'}
            variant="filled"
            size={isXs ? 'small' : 'medium'}
            sx={{ fontWeight: 700 }}
          />
        )}
      </Stack>

      {showTimer && (
        <Box sx={{ mt: 1.25 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: { xs: 6, sm: 8 }, borderRadius: 999 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default TimerHeader;
