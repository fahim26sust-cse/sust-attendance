'use client';

import { Grid, Paper, Typography, Chip, Stack, TextField, Button } from '@mui/material';

const PinEntry = ({ visible, isXs, timeLeft, pin, setPin, disabled, onSubmit }) => {
  if (!visible) return null;

  return (
    <Grid item xs={12}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.5, sm: 2.5 },
          borderRadius: 2,
          bgcolor: (t) => (disabled ? t.palette.action.hover : 'transparent'),
        }}
      >
        <Typography variant={isXs ? 'subtitle2' : 'subtitle1'} fontWeight={700} gutterBottom>
          Enter PIN to Confirm Attendance
        </Typography>

        <Chip
          label={`You have ${timeLeft} seconds left.`}
          color="success"
          variant="filled"
          size={isXs ? 'small' : 'medium'}
          sx={{ mb: { xs: 1.25, sm: 2 }, fontWeight: 700 }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            label="Enter Pin"
            variant="outlined"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={disabled}
            fullWidth
            inputProps={{ inputMode: 'numeric', 'aria-label': 'Attendance PIN' }}
            size={isXs ? 'small' : 'medium'}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={disabled}
            sx={{ minWidth: { xs: '100%', sm: 160 }, fontWeight: 700 }}
            size={isXs ? 'small' : 'medium'}
          >
            Submit Pin
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default PinEntry;
