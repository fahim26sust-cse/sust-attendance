import { useState, useEffect, useRef, useMemo } from 'react';

const useGeoFence = (userLocation, geoLocation, studentId, courses) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); 
  const [isPinInputDisabled, setIsPinInputDisabled] = useState(true); 
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', 
  });
  const intervalRef = useRef(null);

  const openSnack = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // meters
  };

  const distanceToAdmin = useMemo(() => {
    if (!userLocation || !geoLocation?.geoLocation) return Infinity;
    return calculateDistance(
      userLocation.lat,
      userLocation.lng,
      geoLocation.geoLocation.lat,
      geoLocation.geoLocation.lng
    );
  }, [userLocation, geoLocation]);

  const insideFence = useMemo(() => {
    const maxDist = geoLocation?.distance ?? 0;
    return Number.isFinite(distanceToAdmin) && distanceToAdmin <= maxDist;
  }, [distanceToAdmin, geoLocation]);

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTimerActive(false);
    setIsPinInputDisabled(true);
  };

  const handleSubmitPin = async () => {
    setError('');
    if (!pin) {
      setError('Pin is required.');
      openSnack('Pin is required.', 'warning');
      return;
    }
    if (!geoLocation?.geoLocation) {
      const msg = 'Location data unavailable.';
      setError(msg);
      openSnack(msg, 'error');
      return;
    }

    const adminPin = geoLocation.pin;
    const maxDistance = geoLocation.distance;

    if (distanceToAdmin > maxDistance) {
      openSnack('You are too far from the geo-fence.', 'warning');
      return;
    }
    if (pin !== adminPin) {
      openSnack('The pin you entered is incorrect.', 'error'); 
      return;
    }

    try {
      const res = await fetch('/api/attendance/create', {
        method: 'POST',
        body: JSON.stringify({
          studentId,
          studentName: courses?.studentName,
          courseCode: courses?.courseCode,
          courseName: courses?.courseName,
          pin,
          adminPin,
          timestamp: new Date().toISOString(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.success) {
        setAttendanceSaved(true);
        stopTimer(); 
        setPin('');
        openSnack('Attendance saved successfully!', 'success'); 
      } else {
        const msg = 'Failed to save attendance.';
        setError(msg);
        openSnack(msg, 'error'); 
      }
    } catch (err) {
      console.error(err);
      const msg = 'Error while saving attendance.';
      setError(msg);
      openSnack(msg, 'error'); 
    }
  };

  return {
    pin,
    setPin,
    error,
    timeLeft,
    isPinInputDisabled,
    attendanceSaved,
    insideFence,
    handleSubmitPin,
    stopTimer,
    openSnack,
    snackbar
  };
};

export default useGeoFence;
