import React from 'react';
import { Stack, Typography, Button, Chip } from '@mui/material';

export function FormHeader({ 
  title, 
  loading, 
  saving, 
  modifiedCount, 
  onFetchStudents, 
  onSaveAll, 
  hasRows 
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Button variant="outlined" onClick={onFetchStudents} disabled={loading}>
        {loading ? 'Loading…' : 'Load Students'}
      </Button>
      <Button 
        variant="contained" 
        onClick={onSaveAll} 
        disabled={saving || !hasRows || modifiedCount === 0}
      >
        {saving ? 'Saving…' : `Save ${modifiedCount} Changes`}
      </Button>
      {modifiedCount > 0 && (
        <Chip 
          label={`${modifiedCount} modified`} 
          color="primary" 
          variant="outlined" 
          size="small" 
        />
      )}
    </Stack>
  );
}