'use client';
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import CoursePicker from '@/app/components/Admin/Attendance/CoursePicker';
import AttendanceEntryForm from '@/app/components/Admin/Attendance/AttendanceEntryForm';
import AttendanceModify from '@/app/components/Admin/Attendance/AttendanceModify';
import Aurora from '@/app/components/animation/Aurora/Aurora';
import AdminNavbar from '@/app/components/Admin/AdminNavbar';
import MessageAlert from '@/app/components/Admin/Attendance/MessageAlert';
import { useAuth } from '@/lib/custom_hook/auth';
import { useBatchAttendance } from '@/lib/custom_hook/useBatchAttendance';

export default function AdminAttendancePage() {
  const { isAuthenticated, adminEmail } = useAuth();
  const {
    courses, selectedCourseCode, date, rows, loading, saving, message, canSubmit,
    setDate, setMessage, handleCourseChange, handleFetchStudents, onToggle, handleSubmit,
  } = useBatchAttendance();

  if (!isAuthenticated) return <p>Loading...</p>;

  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          bgcolor: '#000',
          color: '#fff',
          overflow: 'hidden',
          p: { xs: 2, sm: 3 }
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Aurora colorStops={['#ff00ff', '#00ffdd', '#ffe600']} blend={0.7} amplitude={1.0} speed={1} />
        </Box>

        <AdminNavbar adminEmail={adminEmail} />
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, position: 'relative', zIndex: 1, marginTop: '70px' }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5, md: 4 },
              borderRadius: 4,
              backdropFilter: 'blur(14px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              border: '1px solid rgb(13, 247, 255)',
              boxShadow: '0 20px 50px rgb(5, 205, 255)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2.5,
                fontWeight: 700,
                letterSpacing: 0.3,
                lineHeight: 1.2,
                background: 'linear-gradient(90deg, #ffffff, #b3f4ff, #f5d0ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Admin — Attendance Input
            </Typography>

            <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.15)' }} />

            {/* Controls */}
            <Box
              sx={{
                mb: 3,
                p: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                background: 'rgb(225, 235, 202)',
                border: '1px solid rgb(29, 13, 255)'
              }}
            >
              <CoursePicker
                courses={Array.isArray(courses) ? courses : []}
                selectedCourseCode={selectedCourseCode}
                date={date}
                onCourseChange={handleCourseChange}
                onDateChange={setDate}
                onFetchStudents={handleFetchStudents}
                loading={loading}
              />
            </Box>

            <MessageAlert message={message} onClose={() => setMessage(null)} />

            {/* Table/form */}
            <Box
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: 3,
                background: 'rgba(255, 218, 218, 0.94)',
                border: '1px solid rgb(1, 238, 255)',
                maxHeight: { md: '60vh' },
                overflow: 'auto'
              }}
            >
              <AttendanceEntryForm rows={Array.isArray(rows) ? rows : []} onToggle={onToggle} />
            </Box>

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2.5 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!canSubmit}
                sx={{
                  px: 3,
                  py: 1.25,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  background: 'linear-gradient(135deg, #6EE7F9 0%, #A78BFA 50%, #F472B6 100%)',
                  boxShadow: '0 10px 25px rgb(169, 226, 219)',
                  backdropFilter: 'blur(2px)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 16px 30px rgb(181, 168, 240)'
                  }
                }}
              >
                {saving ? 'Saving…' : 'Submit Attendance'}
              </Button>
            </Stack>
          </Paper>
        </Container>

        <AttendanceModify />
      </Box>
    </div>
  );
}







