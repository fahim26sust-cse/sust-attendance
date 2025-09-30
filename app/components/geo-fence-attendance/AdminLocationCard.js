'use client';

import { Card, CardContent, Typography, Divider, Stack, Chip } from '@mui/material';

const AdminLocationCard = ({ isXs, geoLocation }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Admin Location
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {geoLocation?.geoLocation?.lat ?? '—'}, {geoLocation?.geoLocation?.lng ?? '—'}
        </Typography>
        <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            size={isXs ? 'small' : 'medium'}
            label={`Radius: ${geoLocation?.distance ?? '—'} m`}
            variant="outlined"
          />
          <Chip
            size={isXs ? 'small' : 'medium'}
            label={`PIN: ${geoLocation?.pin ? '• • • •' : '—'}`}
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AdminLocationCard;
