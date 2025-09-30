'use client';

import { useState, useEffect } from 'react';
import AdminCourseForm from './AdminCourseForm';
import CourseList from './CourseList';

export default function ParentCourseComp() {
  const [courses, setCourses] = useState([]); 
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/fetch');

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched courses:", data);
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []); 
  useEffect(() => {
    console.log("Courses updated:", courses); 
  }, [courses]);
  const handleCourseAdded = () => {
    fetchCourses(); 
  };

  return (
    <div>
      <AdminCourseForm onCourseAdded={handleCourseAdded} />
      <CourseList courses={courses} /> 
    </div>
  );
}
