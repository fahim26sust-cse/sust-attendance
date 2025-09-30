'use client';

import { Button, Stack } from '@mui/material';
import { toAccuracyBadge, toAgeSec } from './utils/geoutils';

export default function StatusRow({
  userLocation,
  geoPermissionState,
  coarse,
  fetchingGeo,
  onFetch,
}) {
  const accuracyBadge = toAccuracyBadge(userLocation);
  const ageSec = toAgeSec(userLocation);

  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2, color: 'white' }}>
      <Button
        variant="contained"
        onClick={onFetch}
        disabled={fetchingGeo}
        sx={{ color: 'white', backgroundColor: '#03fcbe', '&:hover': { backgroundColor: '#019b86' } }}
      >
        {fetchingGeo ? 'Fetching...' : 'Fetch Geo-Fence'}
      </Button>

      <span style={{ fontSize: 12, opacity: 0.9 }}>
        Permission: <b>{geoPermissionState}</b> · Accuracy: <b>{accuracyBadge}</b> · Freshness:{' '}
        <b>{ageSec != null ? `${ageSec}s` : '—'}</b>
        {coarse && ' · (coarse fix)'}
      </span>
    </Stack>
  );
}
