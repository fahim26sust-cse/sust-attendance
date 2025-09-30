'use client'
import { useState, useEffect } from 'react';
import {
  Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import BlurText from './animation/BlurText/BlurText';
import FuzzyText from './animation/FuzzyText/FuzzyText';
import AdminGeoFence from './Admin/admin-geo-fence/AdminGeoFence';

export default function CourseList({ courses }) {
  const [safeCourses, setSafeCourses] = useState([]);

  useEffect(() => {
    setSafeCourses(courses);
  }, [courses]);


  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({
    courseName: '',
    courseCode: '',
    semester: '',
    department: '',
    batch: '',
    courseType: '',
  });

  const API_BASE_URL = '/api/admin/course/';

  const handleOpenDialog = (course) => {
    setSelectedCourse(course);
    setUpdatedCourse({
      courseName: course.courseName || '',
      courseCode: course.courseCode || '',
      semester: course.semester || '',
      department: course.department || '',
      batch: course.batch || '',
      courseType: course.courseType || '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${selectedCourse._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCourse),
      });

      if (!response.ok) throw new Error('Failed to update course');

      setSafeCourses((prev) =>
        prev.map((c) => (c._id === selectedCourse._id ? { ...c, ...updatedCourse } : c))
      );

      alert('Course updated successfully');
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error updating course');
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`${API_BASE_URL}${courseId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete course');

        setSafeCourses((prev) => prev.filter((c) => c._id !== courseId));
        alert('Course deleted successfully');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course');
      }
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'transparent',
        color: '#fff',
        borderRadius: 3,
        border: '1px solid rgba(25, 184, 91, 0.88)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <FuzzyText
          baseIntensity={0.15}
          hoverIntensity={0}
          enableHover={true}
        >
          Course List
        </FuzzyText>
      </Box>
      <TableContainer
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderRadius: 2,
          border: '1px solid rgba(5, 197, 255, 0.94)',
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            '& .MuiTableCell-root': {
              borderColor: 'rgba(5, 197, 255, 0.94)',
            },
            '& .MuiTableCell-head': {
              color: '#fff',
              fontWeight: 600,
              backgroundColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(2px)',
            },
            '& .MuiTableCell-body': {
              color: '#fff',
            },
            '& .MuiTableRow-root:hover': {
              backgroundColor: 'rgba(255,255,255,0.04)',
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Course Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {safeCourses?.map((course) => {
              const fallbackKey = `${course.courseName}-${course.courseCode}-${course.semester}-${course.department}-${course.batch}`;
              return (
                <TableRow key={course._id || fallbackKey}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell>{course.batch}</TableCell>
                  <TableCell>{course.courseType}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(course)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            backgroundColor: '#0b0b0b',
            color: '#fff',
            backgroundImage: 'none',
            border: '1px solid rgba(15, 247, 84, 0.97)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#fff', }}>Update Course</DialogTitle>
        <DialogContent sx={{ overflow: 'visible' }}>
          {[
            { label: 'Course Name', name: 'courseName' },
            { label: 'Course Code', name: 'courseCode' },
            { label: 'Course Type', name: 'courseType' },
            { label: 'Semester', name: 'semester' },
            { label: 'Department', name: 'department' },
            { label: 'Batch', name: 'batch' },
          ].map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={updatedCourse[field.name]}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              InputProps={{
                sx: {
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(16, 199, 223, 0.89)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(13, 224, 196, 0.75)',
                  },
                },
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: 3 }}>
        <AdminGeoFence safeCourses={safeCourses} />
      </Box>
    </Box>
  );
}
