'use client';
import { Typography } from '@mui/material';
import GradientText from '../../animation/Text/GradientText/GradientText';

const LocationDisplay = ({ geoLocation }) => {
  if (!geoLocation) return null;
  return (
    <div style={{ marginBottom: '12px', color: '#fff' }}>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class"
      >
        <Typography variant="h4" gutterBottom>
          Admin Location: {geoLocation.lat}, {geoLocation.lng}
        </Typography>
      </GradientText>
      {typeof geoLocation.accuracy === 'number' && (
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Accuracy: ±{Math.round(geoLocation.accuracy)} m
        </Typography>
      )}
    </div>
  );
};

export default LocationDisplay;
