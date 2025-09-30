'use client';

import { useEffect, useState } from 'react';

/** Reads session user from /api/auth/me using sessionStorage accessToken */
export function useSessionUser() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    (async () => {
      try {
        const token = typeof window !== 'undefined'
          ? sessionStorage.getItem('accessToken')
          : null;
        if (!token) return;

        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (!res.ok) return;

        const data = await res.json();
        setUser(data && data.id ? data : null);
      } catch {
        setUser(null);
      }
    })();
  }, [mounted]);

  return { mounted, user };
}
