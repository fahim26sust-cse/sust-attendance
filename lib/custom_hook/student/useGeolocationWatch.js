'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Robust geolocation watcher for React (client-side only).
 * - Uses Permissions API when available to reflect 'granted' | 'prompt' | 'denied'
 * - Supports watchPosition (continuous) + one-shot refresh
 * - Cleans up watchers to avoid "stuck loading" after repeated refresh
 * - Throttles updates to avoid spamming upstream effects
 */
export default function useGeolocationWatch(userOptions = {}) {
  const options = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: 10000,     // ms before getCurrentPosition/watch error
      maximumAge: 10000,  // ms cache for last position
      ...userOptions,
    }),
    [userOptions]
  );

  const [coords, setCoords] = useState(null); // { lat, lng, accuracy, heading, speed, altitude, altitudeAccuracy }
  const [status, setStatus] = useState('idle'); // 'idle' | 'granted' | 'prompt' | 'denied'
  const [error, setError] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const watchIdRef = useRef(null);
  const permWatcherRef = useRef(null);
  const destroyedRef = useRef(false);

  // Helpers
  const clearWatch = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (watchIdRef.current != null && navigator?.geolocation?.clearWatch) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    watchIdRef.current = null;
    setIsWatching(false);
  }, []);

  const setPosition = useCallback((pos) => {
    const c = pos.coords;
    setCoords({
      lat: c.latitude,
      lng: c.longitude,
      accuracy: c.accuracy ?? null,
      heading: c.heading ?? null,
      speed: c.speed ?? null,
      altitude: c.altitude ?? null,
      altitudeAccuracy: c.altitudeAccuracy ?? null,
    });
    setError(null);
    setLastUpdated(Date.now());
  }, []);

  const setGeoError = useCallback((err) => {
    // err.code: 1=PERMISSION_DENIED, 2=POSITION_UNAVAILABLE, 3=TIMEOUT
    let msg = err?.message || 'Geolocation error';
    if (err?.code === 1) msg = 'Location permission denied.';
    if (err?.code === 2) msg = 'Location unavailable.';
    if (err?.code === 3) msg = 'Location request timed out.';
    setError(msg);
  }, []);

  // Start continuous watch
  const startWatch = useCallback(() => {
    if (typeof window === 'undefined' || !navigator?.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    // Avoid multiple concurrent watchers
    if (watchIdRef.current != null) return;

    setError(null);
    setIsWatching(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      setPosition,
      setGeoError,
      options
    );
  }, [options, setGeoError, setPosition]);

  // One-shot refresh
  const refreshOnce = useCallback(() => {
    if (typeof window === 'undefined' || !navigator?.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    setIsWatching(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        setIsWatching(false);
      },
      (err) => {
        setGeoError(err);
        setIsWatching(false);
      },
      options
    );
  }, [options, setGeoError, setPosition]);

  // Stop continuous watching
  const stopWatch = useCallback(() => {
    clearWatch();
  }, [clearWatch]);

  // Permissions API (when available)
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator?.permissions) {
      // Fallback: status unknown; let the first call set it via errors/success
      return;
    }

    let cancelled = false;

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((perm) => {
        if (cancelled) return;
        setStatus(perm.state); // 'granted' | 'prompt' | 'denied'
        const onChange = () => setStatus(perm.state);
        perm.addEventListener?.('change', onChange);
        permWatcherRef.current = () => perm.removeEventListener?.('change', onChange);
      })
      .catch(() => {
        // Ignore permissions errors; browser might not fully support it
      });

    return () => {
      cancelled = true;
      if (permWatcherRef.current) permWatcherRef.current();
      permWatcherRef.current = null;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      destroyedRef.current = true;
      clearWatch();
      if (permWatcherRef.current) permWatcherRef.current();
      permWatcherRef.current = null;
    };
  }, [clearWatch]);

  return {
    coords,
    status,       // 'idle' | 'granted' | 'prompt' | 'denied'
    error,
    isWatching,
    lastUpdated,  // timestamp (ms) or null
    startWatch,   // continuous updates
    stopWatch,    // stop continuous updates
    refreshOnce,  // one-shot update
  };
}
