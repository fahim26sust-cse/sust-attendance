'use client';
import { Button } from '@mui/material';
import { VscLocation } from 'react-icons/vsc';
import ShinyText from '../../animation/Text/ShinyText/ShinyText';

const LocationButton = ({ onClick }) => (
  <Button
    variant="outlined"
    size="large"
    endIcon={<VscLocation />}
    onClick={onClick}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mx: 'auto',
      mb: 2,
      px: 4,
      py: 1.5,
      borderRadius: '50px',
      borderColor: 'rgba(5, 197, 255, 0.9)',
      color: '#fff',
      background: 'linear-gradient(135deg, rgba(5,197,255,0.2), rgba(15,247,84,0.2))',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, rgba(5,197,255,0.4), rgba(15,247,84,0.4))',
        borderColor: 'rgba(15, 247, 85, 0.36)',
        transform: 'scale(1.15)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      },
    }}
  >
    <ShinyText text="Get Current Location" disabled={false} speed={3} className="custom-class" />
  </Button>
);

export default LocationButton;
