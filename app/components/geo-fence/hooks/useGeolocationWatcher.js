'use client';
import { useEffect, useRef, useState } from 'react';
import {
  averageFixes,
  describeGeoError,
  haversine,
  REJECT_ACCURACY_M,
  MAX_SPEED_MPS,
  WINDOW_FIXES,
} from '../utils/geoutils';
export default function useGeolocationWatcher() {
  const [userLocation, setUserLocation] = useState(null);
  const [geoPermissionState, setGeoPermissionState] = useState('unknown'); 
  const [coarse, setCoarse] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const watchIdRef = useRef(null);
  const lastFixRef = useRef(null);
  const windowFixesRef = useRef([]);
  const fallbackTimerRef = useRef(null);

  const clearWatcher = () => {
    if (watchIdRef.current !== null && typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const clearFallback = () => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };
  const onGeoSuccess = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords;
    const ts = pos.timestamp || Date.now();
    if (!Number.isFinite(accuracy)) return;
    const incoming = { lat: latitude, lng: longitude, accuracy, timestamp: ts };
    if (accuracy > REJECT_ACCURACY_M) {
      setUserLocation(incoming);
      setCoarse(true);
      setGeoError(null);           
      return;
    }
    if (lastFixRef.current) {
      const dt = Math.max(1, (ts - lastFixRef.current.timestamp) / 1000);
      const dist = haversine(lastFixRef.current, incoming);
      if (dist / dt > MAX_SPEED_MPS) return;
    }

    windowFixesRef.current.push(incoming);
    if (windowFixesRef.current.length > WINDOW_FIXES) windowFixesRef.current.shift();
    lastFixRef.current = incoming;

    const avg = averageFixes(windowFixesRef.current);
    setUserLocation(avg);
    setCoarse(false);
    setGeoError(null);
    clearFallback();              
  };
  const onGeoError = (err) => {
    const msg = describeGeoError(err);
    setGeoError(`Location error: ${msg}`);

    if (err?.code === 1) {
      clearWatcher();
    }
  };
  const armFallback = () => {
    clearFallback();
    fallbackTimerRef.current = setTimeout(() => {
      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) return;
      if (!userLocation) {
        navigator.geolocation.getCurrentPosition(
          onGeoSuccess,
          (e) => console.warn('Fallback getCurrentPosition failed:', e),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 } 
        );
      }
    }, 8000);
  };

  const startWatcher = () => {
    clearWatcher();
    try {
      const httpsOk = (typeof window !== 'undefined' && typeof window.isSecureContext !== 'undefined')
        ? window.isSecureContext
        : true; 
      if (!httpsOk) { setGeoError('Geolocation requires HTTPS (or localhost).'); return; }
      if (!('geolocation' in navigator)) { setGeoError('Geolocation API is not available in this browser.'); return; }
      if (geoPermissionState === 'denied') {
        setGeoError('Location permission is blocked. Enable it in Site Settings and reload.');
        return;
      }
      watchIdRef.current = navigator.geolocation.watchPosition(
        onGeoSuccess,
        onGeoError,
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
        }
      );
      armFallback();
    } catch (e) {
      console.error(e);
      setGeoError('Error starting geolocation updates: ' + e.message);
    }
  };

  const primeOneShot = () => {
    const httpsOk = (typeof window !== 'undefined' && typeof window.isSecureContext !== 'undefined')
      ? window.isSecureContext
      : true;

    if (!httpsOk || !('geolocation' in navigator)) return;
    if (geoPermissionState === 'denied') {
      setGeoError('Location permission is blocked. Enable it in Site Settings and reload.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      onGeoSuccess,
      onGeoError,
      {
        enableHighAccuracy: true,
        timeout: 15000,  
        maximumAge: 15000
      }
    );
    armFallback();
  };

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(' Diagnostic Info:', {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            source: pos.coords.altitudeAccuracy !== null ? 'GPS' : 'Network-based',
          });
        },
        (err) => console.warn('Diagnostic geolocation error:', err),
        { enableHighAccuracy: true }
      );
    }

    const httpsOk = (typeof window !== 'undefined' && typeof window.isSecureContext !== 'undefined')
      ? window.isSecureContext
      : true;

    if (!httpsOk) setGeoError('Geolocation requires HTTPS (or localhost).');
    else if (!('geolocation' in navigator)) setGeoError('Geolocation API is not available in this browser.');

    if (navigator.permissions?.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((res) => {
        setGeoPermissionState(res.state);
        res.onchange = () => {
          setGeoPermissionState(res.state);
          if (res.state === 'denied') {
            setGeoError('Location permission is blocked. Enable it in Site Settings and reload.');
            clearWatcher();
            setUserLocation(null);
            setCoarse(false);
          } else if (res.state === 'granted') {
            setGeoError(null);
            primeOneShot();
            startWatcher();
          }
        };
      }).catch(() => setGeoPermissionState('unknown'));
    }
    primeOneShot();
    startWatcher();
    return () => {
      clearFallback();
      clearWatcher();
    };
  }, []);
  const resetTrack = () => {
    windowFixesRef.current = [];
    lastFixRef.current = null;
    setUserLocation(null);
    setCoarse(false);
  };

  return {
    userLocation,
    geoPermissionState,
    coarse,
    geoError,
    setGeoError,
    startWatcher,
    primeOneShot,
    clearWatcher,
    resetTrack,
  };
}
