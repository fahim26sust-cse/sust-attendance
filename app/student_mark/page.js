'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Divider,
} from '@mui/material';
import Navbar from '@/app/components/Navbar';
import dynamic from 'next/dynamic';
import { NeoButton } from '../components/DropInComponent';
import Footer from '../components/Footer';
import BackgroundEffects from '../components/student-home/BackgroundEffects';

export default function TheoryMarksStudentPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [allMarks, setAllMarks] = useState([]);
  const [loadingMarks, setLoadingMarks] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) return;
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.id || data?.studentId) setUser(data);
          else setUser(null);
        }
      } catch (e) {
        console.error(e);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const res = await fetch('/api/courses/fetch');
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const calculateGrade = (totalMarks) => {
    if (totalMarks >= 90) return 'A+';
    if (totalMarks >= 80) return 'A';
    if (totalMarks >= 70) return 'B+';
    if (totalMarks >= 60) return 'B';
    if (totalMarks >= 50) return 'C';
    if (totalMarks >= 40) return 'D';
    return 'F';
  };

  const handleLoadMarks = async () => {
    if (!selectedCourseCode) return;
    setError(null);
    setLoadingMarks(true);
    setAllMarks([]);
    try {
      const res = await fetch(
        `/api/admin/theory-marks/by-course?courseCode=${encodeURIComponent(selectedCourseCode)}`
      );
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid marks response');
      setAllMarks(data);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to load marks');
    } finally {
      setLoadingMarks(false);
    }
  };

  const myStudentId = user?.studentId ?? user?.id ?? null;

  const myMarks = useMemo(() => {
    if (!myStudentId) return [];
    return allMarks.filter((m) => String(m.studentId) === String(myStudentId));
  }, [allMarks, myStudentId]);

  const selectedCourse = useMemo(
    () => courses.find((c) => c.courseCode === selectedCourseCode),
    [courses, selectedCourseCode]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '140px',
        position: 'relative',
        backgroundColor: 'black',
      }}
    >
      <Navbar />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <BackgroundEffects />
      </div>

      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'white' }}>
          My Theory Marks
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            bgcolor: 'rgba(16,16,16,0.65)',
            color: 'white',
            borderRadius: 3,
            border: '1px solid rgba(0,255,255,0.45)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <FormControl size="small" sx={{ minWidth: 260 }}>
              <InputLabel
                id="course-label"
                sx={{
                  color: 'rgba(0, 255, 191, 0.47)',
                  '&.Mui-focused': { color: '#00ffff' },
                }}
              >
                Course
              </InputLabel>

              <Select
                labelId="course-label"
                label="Course"
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
                displayEmpty
                sx={{
                  color: 'rgba(45, 144, 168, 0.71)',
                  bgcolor: 'rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  backdropFilter: 'blur(6px)',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.18)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.32)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00ffff' },
                  '& .MuiSvgIcon-root': { color: '#00ffff' },
                }}
              >
                {courses.map((c) => (
                  <MenuItem key={c.courseCode} value={c.courseCode}>
                    {c.courseCode} — {c.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleLoadMarks}
              disabled={!selectedCourseCode || loadingMarks}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: 'none',
                bgcolor: '#00ffff',
                color: '#00151a',
                boxShadow: '0 6px 20px rgba(0,255,255,0.25)',
                '&:hover': {
                  bgcolor: '#00e6e6',
                  boxShadow: '0 8px 28px rgba(0,255,255,0.35)',
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(0,255,255,0.25)',
                  color: 'rgba(0,0,0,0.6)',
                },
              }}
            >
              {loadingMarks ? 'Loading…' : 'View My Marks'}
            </Button>

            <Stack direction="row" alignItems="center" spacing={1}>
              {loadingCourses && <CircularProgress size={18} sx={{ color: '#00ffff' }} />}
              {selectedCourse && (
                <Typography variant="body2" sx={{ opacity: 0.9, color: 'rgba(255,255,255,0.8)' }}>
                  {selectedCourse.courseName}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {selectedCourseCode && !loadingMarks && (
          <>
            {myMarks.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid rgba(0,255,255,0.3)',
                  bgcolor: 'rgba(0,0,0,0.85)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.25)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <Typography variant="body1">
                  {user ? 'No marks found for your ID in this course.' : 'Please log in to view your marks.'}
                </Typography>
              </Paper>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  borderRadius: 3,
                  border: '1px solid rgba(0,255,255,0.4)',
                  bgcolor: 'rgba(0,0,0,0.85)',   
                  color: 'white',                 
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0, 255, 255, 0.35)', 
                  backdropFilter: 'blur(6px)',
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid rgba(255,255,255,0.3)',
                    bgcolor: 'rgba(0,0,0,0.95)',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                    {selectedCourse?.courseCode} — {selectedCourse?.courseName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Student ID: {myStudentId}
                  </Typography>
                </Box>

                <TableContainer>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={{ fontSize: '20px', fontFamily: 'cursive', fontWeight: 1000, color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 5, 73)' }}>
                          Assessment Type
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '20px', fontFamily: 'cursive', fontWeight: 1000, color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 5, 73)' }}>
                          Marks
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myMarks.map((m, i) => (
                        <React.Fragment key={i}>
                          <TableRow
                            hover
                            sx={{
                              '& td': { color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
                              '&:hover': { backgroundColor: 'rgba(0,255,255,0.08)' },
                            }}
                          >
                            <TableCell align="center">TT1</TableCell>
                            <TableCell align="center">{m.TT1 ?? '—'}</TableCell>
                          </TableRow>
                          <TableRow
                            hover
                            sx={{
                              '& td': { color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
                              '&:hover': { backgroundColor: 'rgba(0,255,255,0.08)' },
                            }}
                          >
                            <TableCell align="center">TT2</TableCell>
                            <TableCell align="center">{m.TT2 ?? '—'}</TableCell>
                          </TableRow>
                          <TableRow
                            hover
                            sx={{
                              '& td': { color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
                              '&:hover': { backgroundColor: 'rgba(0,255,255,0.08)' },
                            }}
                          >
                            <TableCell align="center">Attendance</TableCell>
                            <TableCell align="center">{m.attendance ?? '—'}</TableCell>
                          </TableRow>
                          <TableRow
                            hover
                            sx={{
                              '& td': { color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
                              '&:hover': { backgroundColor: 'rgba(0,255,255,0.08)' },
                            }}
                          >
                            <TableCell align="center">Final</TableCell>
                            <TableCell align="center">{m.finalMarks ?? '—'}</TableCell>
                          </TableRow>
                          {Array.isArray(m.assignments) && m.assignments.length > 0 ? (
                            m.assignments.map((a, idx) => (
                              <TableRow
                                key={idx}
                                hover
                                sx={{
                                  '& td': { color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
                                  '&:hover': { backgroundColor: 'rgba(0,255,255,0.08)' },
                                }}
                              >
                                <TableCell align="center">{a?.name}</TableCell>
                                <TableCell align="center">{a?.score ?? '—'}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} align="center">
                                No Assignments
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}


          </>
        )}
        {selectedCourseCode && !loadingMarks && myMarks.length > 0 &&
          <Box sx={{ p: 3 }}>
            <NeoButton>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid rgba(0,255,255,0.3)',
                  bgcolor: 'rgba(0,0,0,0.85)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.35)', 
                  backdropFilter: 'blur(6px)',
                  marginTop: 2, 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2, 
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.5)', 
                    paddingBottom: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#00ffff', 
                      fontSize: '1.2rem',
                      textShadow: '0 0 10px rgba(0, 255, 255, 0.8)', 
                    }}
                  >
                    Total Marks
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#fff',
                    }}
                  >
                    {myMarks.reduce((total, mark) => {
                      return total + (mark.TT1 || 0) + (mark.TT2 || 0) + (mark.attendance || 0) + (mark.finalMarks || 0) + mark.assignments?.reduce((sum, assignment) => sum + (assignment.score || 0), 0) || 0;
                    }, 0)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#00ffff', 
                      fontSize: '1.2rem',
                      textShadow: '0 0 10px rgba(0, 255, 255, 0.8)', 
                    }}
                  >
                    Grade
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#fff',
                    }}
                  >
                    {calculateGrade(
                      myMarks.reduce((total, mark) => {
                        return total + (mark.TT1 || 0) + (mark.TT2 || 0) + (mark.attendance || 0) + (mark.finalMarks || 0) + mark.assignments?.reduce((sum, assignment) => sum + (assignment.score || 0), 0) || 0;
                      }, 0)
                    )}
                  </Typography>
                </Box>
              </Paper>

            </NeoButton>
          </Box>
        }
      </Box>
    </div>
  );
}
