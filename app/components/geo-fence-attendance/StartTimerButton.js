'use client';

import { Grid, Button } from '@mui/material';

const StartTimerButton = ({ visible, disabled, onStart, isXs }) => {
  if (!visible) return null;
  return (
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        onClick={onStart}
        disabled={disabled}
        fullWidth
        sx={{ fontWeight: 700 }}
        size={isXs ? 'small' : 'medium'}
      >
        Start Timer
      </Button>
    </Grid>
  );
};

export default StartTimerButton;
