'use client';

import { Box, Alert, Collapse } from '@mui/material';

export default function AlertsStack({ error, onClearError, successMessage, onClearSuccess }) {
  return (
    <Box sx={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
      <Collapse in={Boolean(error)} unmountOnExit>
        <Alert severity="error" onClose={onClearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <Collapse in={Boolean(successMessage)} unmountOnExit>
        <Alert severity="success" onClose={onClearSuccess} sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}
