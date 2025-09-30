'use client'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CourseSelectDropdown = ({ courses, courseCode, setCourseCode }) => {
  return (
    <FormControl
      fullWidth
      sx={{
        mb: 3,
        '& .MuiInputLabel-root': { 
          color: '#00fffb', 
          fontWeight: 'bold',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#00fffb',
          },
          '&:hover fieldset': {
            borderColor: '#00e5ff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#00e5ff',
          },
        },
      }}
    >
      <InputLabel>Course Code</InputLabel>
      <Select
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        label="Course Code"
        sx={{
          backgroundColor: '#1f1f1f',
          color: '#fff',
          fontSize: '1.1rem',
          '& .MuiSelect-icon': {
            color: '#00e5ff',
          },
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        {courses.map((course) => (
          <MenuItem
            key={course.courseCode}
            value={course.courseCode}
            sx={{
              backgroundColor: '#121212',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
              '&.Mui-selected': {
                backgroundColor: '#00e5ff',  
                '&:hover': {
                  backgroundColor: '#00b8d4',  
                },
              },
            }}
          >
            {course.courseCode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CourseSelectDropdown;
