'use client';

import { Card, CardContent, Typography, Divider, Stack, Chip } from '@mui/material';

const UserLocationCard = ({ isXs, userLocation, distanceToAdmin, insideFence, courses }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Your Location
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {userLocation?.lat ?? '—'}, {userLocation?.lng ?? '—'}
        </Typography>
        <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Chip
            size={isXs ? 'small' : 'medium'}
            color={insideFence ? 'success' : 'default'}
            label={`Distance: ${Number.isFinite(distanceToAdmin) ? `${distanceToAdmin.toFixed(2)} m` : '—'}`}
          />
          {courses?.courseCode && (
            <Chip
              size={isXs ? 'small' : 'medium'}
              variant="outlined"
              label={`${courses?.courseCode} — ${courses?.courseName ?? ''}`}
            />
          )}
        </Stack>

        <Chip
          label={insideFence ? 'Inside Geo-Fence' : 'Outside Geo-Fence'}
          color={insideFence ? 'success' : 'error'}
          variant="outlined"
          size={isXs ? 'small' : 'medium'}
          sx={{ mt: 1, fontWeight: 700 }}
        />
      </CardContent>
    </Card>
  );
};

export default UserLocationCard;
