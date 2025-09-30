'use client';

import { useEffect, useRef, useState } from 'react';

export default function useCountdown({ initial = 10, onExpire = () => {} } = {}) {
  const [timeLeft, setTimeLeft] = useState(initial);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    if (isActive) return;
    setIsActive(true);
    clear();
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          setIsActive(false);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    clear();
    setIsActive(false);
  };

  const reset = (value = initial) => setTimeLeft(value);

  useEffect(() => () => clear(), []);

  return { timeLeft, isActive, start, stop, reset };
}
