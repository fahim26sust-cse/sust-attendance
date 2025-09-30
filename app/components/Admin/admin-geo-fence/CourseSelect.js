'use client';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CourseSelect = ({ safeCourses, value, onChange }) => (
  <FormControl
    fullWidth
    sx={{
      mb: 2,
      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.9)' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
      '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& .MuiSvgIcon-root': { color: '#fff' },
        '& fieldset': { borderColor: 'rgba(255,255,255,0.24)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
        '&.Mui-focused fieldset': { borderColor: '#fff' },
      },
    }}
  >
    <InputLabel>Course Code</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label="Course Code"
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: '#0b0b0b',
            color: '#fff',
            border: '1px solid rgba(0, 252, 252, 0.96)',
          },
        },
      }}
    >
      {safeCourses.map((course) => (
        <MenuItem key={course.courseCode} value={course.courseCode} sx={{ color: '#fff' }}>
          {course.courseCode}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CourseSelect;
