'use client';
import { Button } from '@mui/material';
import { VscCheckAll, VscCircleSlash } from 'react-icons/vsc';
import ShinyText from '../../animation/Text/ShinyText/ShinyText';
const baseSx = {
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
};
const ActionButtons = ({ onAccept, onDecline }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
    <Button variant="outlined" size="large" endIcon={<VscCheckAll />} onClick={onAccept} sx={baseSx}>
      <ShinyText text="Accept Geo-Fence" disabled={false} speed={3} className="custom-class" />
    </Button>

    <Button variant="outlined" size="large" endIcon={<VscCircleSlash />} onClick={onDecline} sx={baseSx}>
      <ShinyText text="Decline Geo-Fence" disabled={false} speed={3} className="custom-class" />
    </Button>
  </div>
);

export default ActionButtons;
