'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchAllCourses, fetchStudentEnrollments, createEnrollment } from '@/lib/services/enroll-students/enrollApi';

export const REQUIRED_PHRASE = 'no A.league';

export function useEnrollCourses({ studentId, studentName, department, semester }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [enrollments, setEnrollments] = useState([]);
  const [enrollLoading, setEnrollLoading] = useState(true);
  const [enrollError, setEnrollError] = useState(null);

  // confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pendingCourse, setPendingCourse] = useState(null); // { code, name }

  // Load courses
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchAllCourses();
        setCourses(Array.isArray(list) ? list : []);
      } catch (e) {
        setError(e.message || 'Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Keep the same behavior as your original: no filtering by dept/semester.
  // (If you want real filtering later, replace with a filter using department/semester.)
  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses, department, semester]);

  // Load student's enrollments
  const loadEnrollments = useCallback(async () => {
    if (!studentId) return;
    setEnrollLoading(true);
    setEnrollError(null);
    try {
      const list = await fetchStudentEnrollments(studentId);
      setEnrollments(Array.isArray(list) ? list : []);
    } catch (e) {
      setEnrollments([]);
      setEnrollError(e.message || 'Could not load enrolled courses.');
    } finally {
      setEnrollLoading(false);
    }
  }, [studentId]);

  useEffect(() => { loadEnrollments(); }, [loadEnrollments]);

  // Enroll flow
  const openConfirm = useCallback((course) => {
    setPendingCourse({ code: course.courseCode, name: course.courseName });
    setConfirmInput('');
    setConfirmError('');
    setConfirmOpen(true);
  }, []);

  const closeConfirm = useCallback(() => {
    if (!submitting) setConfirmOpen(false);
  }, [submitting]);

  const handleConfirmSubmit = useCallback(async () => {
    const typed = (confirmInput || '').trim().toLowerCase();
    const target = REQUIRED_PHRASE.toLowerCase();

    if (typed !== target) {
      setConfirmError(`Please type exactly: "${REQUIRED_PHRASE}"`);
      return;
    }
    if (!pendingCourse) return;

    setSubmitting(true);
    try {
      await createEnrollment({
        studentId,
        studentName,
        courseCode: pendingCourse.code,
        courseName: pendingCourse.name,
      });
      setSuccessMessage('Successfully enrolled in the course!');
      setError('');
      await loadEnrollments();
      setConfirmOpen(false);
      setPendingCourse(null);
    } catch (e) {
      setError(e.message || 'Failed to enroll in the course.');
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  }, [confirmInput, pendingCourse, studentId, studentName, loadEnrollments]);

  // Public API
  return {
    // data
    courses,
    filteredCourses,
    enrollments,
    loading,
    enrollLoading,
    // messages
    error,
    setError,
    successMessage,
    setSuccessMessage,
    enrollError,
    // confirm dialog
    confirmOpen,
    confirmInput,
    setConfirmInput,
    confirmError,
    submitting,
    pendingCourse,
    openConfirm,
    closeConfirm,
    handleConfirmSubmit,
  };
}
