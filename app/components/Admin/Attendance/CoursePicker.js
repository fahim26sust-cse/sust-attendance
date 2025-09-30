'use client';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CoursePicker({
  courses,
  selectedCourseCode,
  date,
  onCourseChange,
  onDateChange,
  onFetchStudents,
  loading,
}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
      <FormControl size="small" sx={{ minWidth: 240 }}>
        <InputLabel id="course-label">Course</InputLabel>
        <Select
          labelId="course-label"
          label="Course"
          value={selectedCourseCode}
          onChange={(e) => onCourseChange(e.target.value)}
        >
          {courses.map((c) => (
            <MenuItem key={c.courseCode} value={c.courseCode}>
              {c.courseCode} — {c.courseName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        size="small"
        type="date"
        label="Date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      />

      <Button variant="contained" onClick={onFetchStudents} disabled={!selectedCourseCode || !date || loading}>
        {loading ? 'Loading…' : 'Load Students'}
      </Button>
    </Stack>
  );
}


