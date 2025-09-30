'use client';
import { useEffect, useState } from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import handleGeoFence from '@/lib/helper_functions/handleGeoFence';
import getAdminLocation from '@/lib/helper_functions/getAdminLocation';
import TitleHeader from './TitleHeader';
import LocationButton from './LocationButton';
import LocationDisplay from './LocationDisplay';
import CourseSelect from './CourseSelect';
import DistanceInput from './DistanceInput';
import ActionButtons from './ActionButtons';
import ToastBar from './ToastBar';
import FetchAdminGeo from '../../FetchAdminGeo';

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
        openToast('success', 'Geo-fence accepted. ');
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
        <TitleHeader text="Admin Geo-Fence Setup" />
      </Box>
      <LocationButton onClick={() => getAdminLocation(setGeoLocation, resetForm)} />
      <LocationDisplay geoLocation={geoLocation} />
      <CourseSelect
        safeCourses={safeCourses}
        value={courseCode}
        onChange={(val) => setCourseCode(val)}
      />
      <DistanceInput value={distance} onChange={(val) => setDistance(val)} />
      <ActionButtons
        onAccept={() => handleGeoFenceAction('YES')}
        onDecline={() => handleGeoFenceAction('NO')}
      />
      {success && geoFenceCreated && (
        <FetchAdminGeo key={`${courseCode}-${geoFenceCreated}`} courseCode={courseCode} />
      )}
      <ToastBar
        open={toast.open}
        type={toast.type}
        msg={toast.msg}
        onClose={closeToast}
      />

    </div>
  );
};

export default AdminGeoFence;
