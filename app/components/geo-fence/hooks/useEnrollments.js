'use client';
import { useEffect, useMemo, useState } from 'react';

export default function useEnrollments(studentId) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loadingEnroll, setLoadingEnroll] = useState(true);
  const [enrollError, setEnrollError] = useState(null);
  useEffect(() => {
    if (!studentId) return;
    const run = async () => {
      try {
        const res = await fetch(`/api/courses/enroll?studentId=${encodeURIComponent(studentId)}`);
        if (!res.ok) throw new Error('Failed to fetch enrolled courses');
        const json = await res.json();
        if (json.enrollments?.length) {
          setCourses(json.enrollments);
          setSelectedCourse(json.enrollments[0].courseCode);
        } else {
          setEnrollError('No courses found for this student.');
        }
      } catch (e) {
        setEnrollError('Error fetching courses: ' + e.message);
      } finally {
        setLoadingEnroll(false);
      }
    };
    run();
  }, [studentId]);

  const selectedCourseData = useMemo(
    () => courses.find(c => c.courseCode === selectedCourse) || null,
    [courses, selectedCourse]
  );

  return {
    courses,
    selectedCourse,
    setSelectedCourse,
    selectedCourseData,
    loadingEnroll,
    enrollError,
  };
}
