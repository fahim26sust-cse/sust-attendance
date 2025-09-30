'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const fetchAdminData = async (token) => {
  try {
    const res = await fetch('/api/admin/me', {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    (async () => {
      const data = await fetchAdminData(token);

      if (data && data.email) {
        setIsAuthenticated(true);
        setAdminEmail(data.email);
      } else {
        localStorage.removeItem('admin-token');
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    })();
  }, [router]);

  return { isAuthenticated, adminEmail };
};
