'use client';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function MessageAlert({ message, onClose }) {
  if (!message) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Alert
        severity={message.type}
        variant="outlined"
        sx={{
          color: '#fff',
          bgcolor: 'rgba(5, 255, 243, 0.97)',
          borderColor: 'rgb(12, 248, 217)',
          '& .MuiAlert-icon': { color: '#fff' },
          alignItems: 'center'
        }}
        action={
          onClose ? (
            <IconButton aria-label="close" size="small" onClick={onClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
      >
        {message.text}
      </Alert>
    </Box>
  );
}
