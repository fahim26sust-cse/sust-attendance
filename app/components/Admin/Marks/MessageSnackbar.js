'use client';

import { Snackbar, Alert } from '@mui/material';

export default function MessageSnackbar({ message, onClose, autoHideDuration = 3000 }) {
  const open = !!message;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {message ? (
        <Alert
          severity={message.type}
          onClose={onClose}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {message.text}
        </Alert>
      ) : null}
    </Snackbar>
  );
}
