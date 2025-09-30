'use client';
import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import EnrollCourse from './EnrollCourse';

export default function FetchStudentData() {
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    const fetchStudentData = async () => {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        return; 
      }
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData({
          studentId: data.id,
          studentName: data.name,
          department: data.dept,
          semester: data.semester,
        });
      } else {
        console.error('Error fetching student data:', response.statusText);
      }
    };

    fetchStudentData();
  }, []); 
  if (!studentData) {
    return (
      <Box p={4}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ width: '100%', padding:{
        xs: '16px 10px',
        sm: '16px 80px',
        md: '16px 120px',
        lg: '16px 150px',
        xl: '16px 200px',
      } ,
      }}>
        <EnrollCourse 
          studentId={studentData.studentId} 
          studentName={studentData.studentName}
          department={studentData.department} 
          semester={studentData.semester} 
        />
      </Box>
    </>
  );
}
