'use client';

import { Box, Typography } from '@mui/material';

export default function Footer({
  companyName = "MD Fahimul Islam, Lecturer, Dept of CSE, SUST",
  showAllRights = true
}) {
  const currentYear = new Date().getFullYear();

  return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          © {currentYear} {companyName}{showAllRights && '. All rights reserved.'}
        </Typography>
      </Box>
  );
}