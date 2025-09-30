'use client';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CourseSelect({ courses, selectedCourse, onChange }) {
  return (
    <FormControl 
      fullWidth 
      margin="normal" 
      sx={{ 
        backgroundColor: '#333', 
        borderRadius: 1,
        margin: { xs: '8px 0', sm: '16px 0' }
      }}
    >
      <InputLabel sx={{ color: '#03fcbe', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
        Course
      </InputLabel>
      <Select
        value={selectedCourse}
        onChange={(e) => onChange(e.target.value)}
        label="Course"
        sx={{
          color: '#03fcbe',
          backgroundColor: '#222',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#03fcbe' },
          '&:hover': { backgroundColor: '#444' },
          '& .MuiSelect-select': {
            padding: { xs: '10px 14px', sm: '12px 16px' },
            fontSize: { xs: '0.875rem', sm: '1rem' }
          },
          height: { xs: '48px', sm: '56px' }
        }}
        MenuProps={{ 
          PaperProps: { 
            style: { 
              backgroundColor: 'black',
              maxHeight: '300px'
            } 
          } 
        }}
      >
        {courses.map((course) => (
          <MenuItem 
            key={course.courseCode} 
            value={course.courseCode} 
            sx={{ 
              color: '#03fcbe',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              padding: { xs: '8px 12px', sm: '12px 16px' },
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }}
          >
            {course.courseCode} - {course.courseName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}