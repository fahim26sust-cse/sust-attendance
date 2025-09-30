'use client'
import { useState, useEffect } from "react";
import { fetchCourses } from "@/lib/helper_functions/admin/fetchCourses";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { courses, loading };
};