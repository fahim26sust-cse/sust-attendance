import { Button, CircularProgress } from '@mui/material';

const GeoFenceButton = ({ loading, onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={loading || disabled}
      sx={{
        mb: 2,
        width: '100%',
        backgroundColor: '#00E5FF',
        color: '#000',
        fontWeight: 'bold',
        padding: '12px',
        fontSize: '1.1rem',
        borderRadius: '10px',
        boxShadow: '0 0 12px rgba(0,229,255,0.5)',
        '&:hover': {
          backgroundColor: '#00B8D4',
          boxShadow: '0 0 16px rgba(0,229,255,0.7)',
        },
      }}
    >
      {loading ? <CircularProgress size={26} sx={{ color: '#000' }} /> : 'Fetch Geo-Fence Data'}
    </Button>
  );
};

export default GeoFenceButton;
