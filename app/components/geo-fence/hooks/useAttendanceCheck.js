'use client';
import { useRef, useCallback } from 'react';

export default function useAttendanceCheck(studentId) {
  const lastCheckRef = useRef({ key: null, result: false });
  const checkAttendance = useCallback(async (course) => {
    if (!course) return false;
    const today = new Date().toISOString().slice(0, 10);
    const cacheKey = `${today}|${studentId}|${course.courseCode}`;
    if (lastCheckRef.current.key === cacheKey) return lastCheckRef.current.result;
    const url = `/api/attendance/fetch/by_date?studentId=${encodeURIComponent(studentId)}&courseCode=${encodeURIComponent(course.courseCode)}&courseName=${encodeURIComponent(course.courseName || '')}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const exists = !!data.attendanceExists;
    lastCheckRef.current = { key: cacheKey, result: exists };
    return exists;
  }, [studentId]);

  return { checkAttendance };
}
