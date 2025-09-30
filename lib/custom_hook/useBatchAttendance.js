'use client';
import { useState, useEffect, useCallback } from 'react';
import { fetchCourses, fetchEnrolledStudents, submitAttendanceBatch } from '@/lib/services/attendanceApi';

const todayStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export function useBatchAttendance() {
  const [courses, setCourses] = useState([]);            
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [date, setDate] = useState(todayStr);
  const [rows, setRows] = useState([]);                  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCourses();
        setCourses(Array.isArray(data) ? data : []);    
      } catch (e) {
        setMessage({ type: 'error', text: e.message || 'Failed to load courses' });
        setCourses([]);                                
      }
    })();
  }, []);

  const handleCourseChange = useCallback((code) => {
    setSelectedCourseCode(code);
    const found = (courses || []).find((c) => c.courseCode === code);
    setSelectedCourseName(found ? found.courseName : '');
    setRows([]); 
  }, [courses]);

  const handleFetchStudents = useCallback(async () => {
    if (!selectedCourseCode) return;
    setLoading(true);
    setMessage(null);
    try {
      const data = await fetchEnrolledStudents(selectedCourseCode);
      const list = Array.isArray(data) ? data : [];
      const mapped = list.map((s) => ({
        studentId: s.studentId,
        studentName: s.studentName,
        courseCode: s.courseCode,
        courseName: s.courseName,
        present: false,
      }));
      setRows(mapped);
    } catch (e) {
      setMessage({ type: 'error', text: e.message || 'Failed to fetch students' });
      setRows([]); 
    } finally {
      setLoading(false);
    }
  }, [selectedCourseCode]);

  const onToggle = useCallback((studentId, present) => {
    setRows((prev = []) => prev.map((r) => (r.studentId === studentId ? { ...r, present } : r)));
  }, []);

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        courseCode: selectedCourseCode,
        courseName: selectedCourseName,
        date,
        rows: (rows || []).map((r) => ({
          studentId: r.studentId,
          studentName: r.studentName,
          present: r.present,
        })),
      };
      const data = await submitAttendanceBatch(payload);
      setMessage({
        type: 'success',
        text: `Saved: ${data.inserted}, Skipped (existing): ${data.skippedExisting} on ${data.date}`,
      });
    } catch (e) {
      setMessage({ type: 'error', text: e.message || 'Failed to save attendance' });
    } finally {
      setSaving(false);
    }
  }, [selectedCourseCode, selectedCourseName, date, rows]);

  const canSubmit = (rows || []).length > 0 && !!selectedCourseCode && !!date && !saving;

  return {
    courses, selectedCourseCode, selectedCourseName, date, rows, loading, saving, message, canSubmit,
    setDate, setMessage, handleCourseChange, handleFetchStudents, onToggle, handleSubmit,
  };
}
