'use client';
import { Snackbar, Alert } from '@mui/material';

const ToastBar = ({ open, type, msg, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={3500}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert
      onClose={onClose}
      severity={type === 'success' ? 'success' : type === 'info' ? 'info' : 'error'}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {msg}
    </Alert>
  </Snackbar>
);

export default ToastBar;
