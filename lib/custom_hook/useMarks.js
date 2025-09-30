'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { fetchCourses } from '@/lib/services/attendanceApi';
export function useMarks() {
  const [markType, setMarkType] = useState('theory');    
  const [courses, setCourses] = useState([]);             
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setLoadingCourses(true);
        const data = await fetchCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        setCourses([]);
        setMessage({ type: 'error', text: e?.message || 'Failed to load courses' });
      } finally {
        setLoadingCourses(false);
      }
    })();
  }, []);
  const filteredCourses = useMemo(() => {
    const typeWanted = String(markType || '').toLowerCase();
    return (courses || []).filter(
      (c) => String(c?.courseType || '').toLowerCase() === typeWanted
    );
  }, [courses, markType]);
  const selectedCourse = useMemo(
    () => (filteredCourses || []).find((c) => c?.courseCode === selectedCourseCode),
    [filteredCourses, selectedCourseCode]
  );
  const handleMarkTypeChange = useCallback((next) => {
    setMarkType(next);
    setSelectedCourseCode('');
  }, []);

  return {
    markType,
    courses,
    filteredCourses,
    selectedCourseCode,
    selectedCourse,
    loadingCourses,
    message,
    setSelectedCourseCode,
    setMessage,
    handleMarkTypeChange,

  };
}
