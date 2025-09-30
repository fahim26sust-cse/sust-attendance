'use client'
import { useState } from "react";
import { handleFetchAttendance } from "@/lib/helper_functions/admin/handleFetchAttendance";  // Assuming this is the function that handles the API call

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (courseCode, courseName) => {
    setLoading(true);
    try {
      const fetchedAttendance = await handleFetchAttendance(courseCode, courseName);
      setAttendance(fetchedAttendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  return { attendance, handleSubmit, loading };
};
