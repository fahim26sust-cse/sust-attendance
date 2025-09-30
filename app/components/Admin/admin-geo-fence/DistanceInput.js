'use client';
import { TextField } from '@mui/material';

const DistanceInput = ({ value, onChange }) => (
  <TextField
    label="Distance (meters)"
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    fullWidth
    sx={{
      mb: 2,
      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.9)' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
      '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': { borderColor: 'rgba(255,255,255,0.24)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
        '&.Mui-focused fieldset': { borderColor: '#fff' },
      },
    }}
    InputProps={{ inputProps: { min: 0, step: 1 } }}
    placeholder="e.g., 50"
  />
);

export default DistanceInput;
