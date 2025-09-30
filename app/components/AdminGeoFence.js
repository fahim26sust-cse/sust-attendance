'use client';
import { useState, useEffect } from 'react';
import {
  Button, MenuItem, Select, InputLabel, FormControl, TextField, Box,
  Typography, Snackbar, Alert
} from '@mui/material';
import FetchAdminGeo from './FetchAdminGeo';
import handleGeoFence from '@/lib/helper_functions/handleGeoFence';
import getAdminLocation from '@/lib/helper_functions/getAdminLocation';
import FuzzyText from './animation/FuzzyText/FuzzyText';
import ShinyText from './animation/Text/ShinyText/ShinyText';
import { VscLocation, VscCheckAll, VscCircleSlash } from "react-icons/vsc";
import GradientText from './animation/Text/GradientText/GradientText';

const AdminGeoFence = ({ safeCourses }) => {
  const [courseCode, setCourseCode] = useState('');
  const [geoLocation, setGeoLocation] = useState(null);
  const [pin, setPin] = useState('FFFFFFF');
  const [success, setSuccess] = useState(false);
  const [geoFenceCreated, setGeoFenceCreated] = useState(false);
  const [distance, setDistance] = useState('');
  const [toast, setToast] = useState({ open: false, type: 'error', msg: '' });
  const openToast = (type, msg) => setToast({ open: true, type, msg });
  const closeToast = () => setToast(prev => ({ ...prev, open: false }));

  useEffect(() => {
    console.log('Courses received in child:', safeCourses);
  }, [safeCourses]);

  const resetForm = () => {
    setSuccess(false);
    setGeoFenceCreated(false);
    setDistance('');
  };

  const validateForm = () => {
    if (!geoLocation) {
      openToast('error', 'Please fetch your current location first.');
      return false;
    }
    if (!courseCode) {
      openToast('error', 'Please select a course code.');
      return false;
    }
    const d = Number(distance);
    if (!distance || Number.isNaN(d) || d <= 0) {
      openToast('error', 'Please enter a valid positive distance (in meters).');
      return false;
    }
    return true;
  };

  const handleGeoFenceAction = (permission) => {
    if (!validateForm()) return;

    try {
      handleGeoFence(
        geoLocation,
        courseCode,
        setPin,
        setSuccess,
        setGeoFenceCreated,
        permission,
        distance
      );
      if (permission === 'YES') {
        openToast('success', 'Geo-fence accepted. Processing…');
      } else {
        openToast('info', 'Geo-fence declined.');
      }
    } catch (e) {
      console.error(e);
      openToast('error', 'Something went wrong while applying geo-fence.');
    }
  };

  if (!safeCourses || safeCourses.length === 0) {
    return <p style={{ color: '#fff' }}>No courses available. Please try again later.</p>;
  }

  return (
    <div
      style={{
        background: 'transparent',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '16px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <FuzzyText baseIntensity={0.15} hoverIntensity={0} enableHover={true}>
          Admin Geo-Fence Setup
        </FuzzyText>
      </Box>

      <Button
        variant="outlined"
        size="large"
        endIcon={<VscLocation />}
        onClick={() => {
          getAdminLocation(setGeoLocation, resetForm);
        }}
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

      {geoLocation && (
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
      )}

      <FormControl
        fullWidth
        sx={{
          mb: 2,
          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.9)' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& .MuiSvgIcon-root': { color: '#fff' },
            '& fieldset': { borderColor: 'rgba(255,255,255,0.24)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
            '&.Mui-focused fieldset': { borderColor: '#fff' },
          },
        }}
      >
        <InputLabel>Course Code</InputLabel>
        <Select
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          label="Course Code"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#0b0b0b',
                color: '#fff',
                border: '1px solid rgba(0, 252, 252, 0.96)',
              },
            },
          }}
        >
          {safeCourses.map((course) => (
            <MenuItem key={course.courseCode} value={course.courseCode} sx={{ color: '#fff' }}>
              {course.courseCode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Distance (meters)"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
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

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <Button
          variant="outlined"
          size="large"
          endIcon={<VscCheckAll />}
          onClick={() => handleGeoFenceAction('YES')}
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
          <ShinyText text="Accept Geo-Fence" disabled={false} speed={3} className="custom-class" />
        </Button>

        <Button
          variant="outlined"
          size="large"
          endIcon={<VscCircleSlash />}
          onClick={() => handleGeoFenceAction('NO')}
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
          <ShinyText text="Decline Geo-Fence" disabled={false} speed={3} className="custom-class" />
        </Button>
      </div>

      {success && geoFenceCreated && (
        <FetchAdminGeo key={`${courseCode}-${geoFenceCreated}`} courseCode={courseCode} />
      )}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.type === 'success' ? 'success' :
            toast.type === 'info' ? 'info' :
              'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminGeoFence;
