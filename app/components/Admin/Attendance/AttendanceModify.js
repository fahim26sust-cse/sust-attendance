'use client';
import { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function AttendanceModify() {
  const [courses, setCourses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [courseCode, setCourseCode] = useState('');
  const [date, setDate] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/fetch');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        if (data.length > 0) {
          setCourseCode(data[0].courseCode); 
        }
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  const fetchAttendance = async () => {
    if (!courseCode || !date) {
      alert('Please select both course and date.');
      return;
    }
    try {
      const response = await fetch(`/api/attendance/modify/fetch?courseCode=${encodeURIComponent(courseCode)}&date=${encodeURIComponent(date)}`);
      if (response.ok) {
        const data = await response.json();
        const attendanceWithId = data.map((item) => ({
          ...item,
          id: item._id, 
          createdAt: new Date(item.createdAt).toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric',
            month: 'long',  
            day: 'numeric',
            hour: '2-digit',  
            minute: '2-digit',  
            second: '2-digit', 
            hour12: true,  
          }),
        }));

        setAttendanceData(attendanceWithId);
      } else {
        console.error('Failed to fetch attendance');
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleCourseChange = (event) => {
    setCourseCode(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this attendance data?');
    if (confirmed) {
      try {
        const response = await fetch('/api/attendance/modify/delete', {
          method: 'DELETE',
          body: JSON.stringify({ ids: [id] }), 
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to delete attendance');
        }
        fetchAttendance();
        alert('Attendance data deleted successfully');
      } catch (error) {
        console.error('Error deleting attendance:', error);
        alert('Error deleting attendance');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'studentId', headerName: 'Student ID', width: 150 }, 
    { field: 'studentName', headerName: 'Student Name', width: 200 },
    { field: 'courseCode', headerName: 'Course Code', width: 150 },
    { field: 'courseName', headerName: 'Course Name', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 250 }, 
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: 'rgb(55, 0, 255)', color: 'rgb(255, 255, 255)', '&:hover': {
              backgroundColor: 'rgb(255, 9, 234)', 
            },
          }}
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteRow(params.id)}
        >
          Delete
        </Button>
      )
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: 'rgb(18, 18, 18)', color: 'rgb(255, 255, 255)', height: '100vh' }}>
      <Typography variant="h3" sx={{ color: 'rgb(255, 255, 255)', p:4, fontFamily:'cursive' }}>Attendance Data</Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            label="Course Code"
            value={courseCode} 
            onChange={handleCourseChange}
            fullWidth
            select
            SelectProps={{ native: true }}
            sx={{
              mb: 2,
              backgroundColor: 'rgb(0, 255, 213)',  
              borderRadius: '4px',
              color: 'rgb(255, 255, 255)',  
              
            }}
          >
            {courses.map((course) => (
              <option key={course._id} value={course.courseCode}>
                {course.courseName} ({course.courseCode})
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: 'rgb(0, 255, 213)',  
              borderRadius: '4px',
              color: 'rgb(255, 255, 255)',
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={fetchAttendance}
            sx={{
              mr: 2,
              backgroundColor: 'rgb(0, 55, 234)',  
              '&:hover': {
                backgroundColor: 'rgb(9, 255, 161)', 
                transform: 'scale(1.01)',  
                transition: 'all 0.2s ease-in-out',  
                boxShadow: '0px 4px 8px rgb(255, 255, 255)',
                fontWeight: 600,
              },
            }}
          >
            Fetch Attendance
          </Button>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={attendanceData} 
          columns={columns}
          pageSize={5}
          checkboxSelection
          sx={{

            backgroundColor: 'rgb(18, 18, 18)',  
            '& .MuiDataGrid-cell': {
              color: 'rgb(255, 255, 255)',  
            },
            '& .MuiDataGrid-columnHeaders': {
              color: 'rgb(0, 0, 0)',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold', 
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(25, 210, 201, 0.8)',  
              cursor: 'pointer',  
              transform: 'scale(1.01)',  
              transition: 'all 0.5s ease-in-out',  
              boxShadow: '0px 4px 8px rgba(24, 236, 113, 0.7)',  
            },
            '& .MuiDataGrid-footer': {
              backgroundColor: 'rgb(51, 51, 51)',  
            },
            '& .MuiCheckbox-root': {
              color: 'rgb(10, 10, 10)',
            },
          }}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </div>
    </Box>
  );
}
