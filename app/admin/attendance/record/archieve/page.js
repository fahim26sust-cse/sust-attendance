'use client'
import React, { useState } from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import AdminNavbar from "@/app/components/Admin/AdminNavbar";
import { useCourses } from "@/lib/custom_hook/useCourses";
import { useAttendance } from "@/lib/custom_hook/useAttendance";
import AttendanceTable from "@/app/components/Admin/Attendance/AttendanceTable";
import dynamic from "next/dynamic";
import { useAuth } from "@/lib/custom_hook/auth";
import { handleDownloadExcel } from "@/lib/helper_functions/admin/handleDownloadExcel";
import { ActionExcel } from "@/app/components/ActionExcel";
import { CourseSelect } from "@/app/components/CourseSelect";

const Aurora = dynamic(() => import("@/app/components/animation/Aurora/Aurora"), { ssr: false });


const AttendanceForm = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const { courses, loading: coursesLoading } = useCourses();
  const { attendance, handleSubmit, loading } = useAttendance();
  const { isAuthenticated, adminEmail } = useAuth();

  if (!isAuthenticated) return <p>Loading...</p>;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#000', color: '#fff', overflow: 'hidden', p: { xs: 2, sm: 3 } }}>
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Aurora colorStops={['#ff00ff', '#00ffdd', '#ffe600']} blend={0.7} amplitude={1.0} speed={1} />
      </Box>
      <AdminNavbar adminEmail={adminEmail} />
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.8) 100%)' }} />
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 900, mx: 'auto', pt: { xs: 2, sm: 6 }, marginTop: '80px' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.2 }}>Attendance — Admin View</Typography>

        <Paper sx={{ width: 'min(640px, 100%)', mx: 'auto', p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 3 }}>
          {coursesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress /></Box>
          ) : (
            <>
              <CourseSelect
                courses={courses}
                courseCode={courseCode}
                setCourseCode={setCourseCode}
                setCourseName={setCourseName}
              />
              <ActionExcel
                handleSubmit={handleSubmit}
                loading={loading}
                courseCode={courseCode}
                courseName={courseName}
                handleDownloadExcel={handleDownloadExcel}
                attendance={attendance}
              />
            </>
          )}
        </Paper>
        {attendance.length > 0 && <AttendanceTable attendance={attendance} />}
      </Box>
    </Box>
  );
};

export default AttendanceForm;
