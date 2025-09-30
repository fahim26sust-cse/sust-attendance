'use client';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import AttendanceArchieveTable from "@/app/components/StudentAttendance/AttendanceArchieveTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundEffects from "../components/student-home/BackgroundEffects";
const LightRays = dynamic(() => import("../components/LightRays/LightRays"), { ssr: false });
const SplashCursor = dynamic(() => import("../components/animation/SplashCursor/SplashCursor"), { ssr: false });
const AttendanceArchieve = () => {
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        if (data.id) setUser(data);
        else setUser(null);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/fetch");
        if (response.ok) {
          const data = await response.json();
          setCourses(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleFetchAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAttendance([]);
    try {
      const res = await fetch(
        `/api/attendance/fetch?courseCode=${encodeURIComponent(courseCode)}&courseName=${encodeURIComponent(courseName)}`
      );
      const data = await res.json();
      setAttendance(data);
    } catch (err) {
      alert("Failed to fetch attendance");
    }
    setLoading(false);
  };

  return (
    <>
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
            pointerEvents: 'none'
          }}
        >
          <BackgroundEffects />
          {/* <SplashCursor />
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
            style={{ position: 'absolute', inset: 0 }}
          /> */}
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 900,
            margin: '0 auto',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: 'min(600px, 100%)',
              margin: '0 auto',
              padding: '20px',
              backgroundColor: '#222',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <form onSubmit={handleFetchAttendance}>
              {coursesLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                  <CircularProgress />
                </div>
              ) : (
                <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                  <InputLabel id="course-select-label" style={{ color: 'white' }}>
                    Select Course Code
                  </InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    value={courseCode}
                    onChange={(e) => {
                      const selected = courses.find(c => c.courseCode === e.target.value);
                      setCourseCode(e.target.value);
                      setCourseName(selected?.courseName || "");
                    }}
                    label="Select Course Code"
                    MenuProps={{
                      PaperProps: { style: { backgroundColor: 'black', color: 'white' } },
                    }}
                    style={{ backgroundColor: '#333', color: 'white', borderColor: '#1976d2' }}
                  >
                    <MenuItem value="" disabled>Select Course Code</MenuItem>
                    {courses.map((course) => (
                      <MenuItem key={course._id} value={course.courseCode}>
                        {course.courseCode} - {course.courseName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !courseCode}
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  padding: '10px 0',
                  marginTop: '10px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                {loading ? "Loading..." : "Fetch Attendance"}
              </Button>
            </form>
          </div>
          {user && attendance.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AttendanceArchieveTable attendance={attendance} userId={user.id} />
            </div>
          )}
        </div> 
      </div>
      
    </>
  );
};

export default AttendanceArchieve;
