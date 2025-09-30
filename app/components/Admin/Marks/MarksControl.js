'use client';

import {
  Box, Stack, Typography, FormControl, InputLabel,
  Select, MenuItem, CircularProgress
} from '@mui/material';
export default function MarksControls({
  markType,
  onChangeMarkType,
  loadingCourses,
  filteredCourses = [],
  selectedCourseCode,
  onChangeSelectedCourseCode,
  selectedCourse,
}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
      <FormControl
        size="small"
        sx={{
          minWidth: 160,
          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.85)' },
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.18)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#7cf7e6' },
          },
          '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.9)' },
        }}
      >
        <InputLabel id="marktype-label">Marks Type</InputLabel>
        <Select
          labelId="marktype-label"
          label="Marks Type"
          value={markType}
          onChange={(e) => onChangeMarkType(e.target.value)}
        >
          <MenuItem value="theory">Theory</MenuItem>
          <MenuItem value="lab">Lab</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        disabled={loadingCourses}
        sx={{
          minWidth: 280,
          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.85)' },
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.18)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#7cf7e6' },
          },
          '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.9)' },
        }}
      >
        <InputLabel id="course-label">Course</InputLabel>
        <Select
          labelId="course-label"
          label="Course"
          value={selectedCourseCode}
          onChange={(e) => onChangeSelectedCourseCode(e.target.value)}
        >
          {(filteredCourses ?? []).map((c) => (
            <MenuItem key={c.courseCode} value={c.courseCode}>
              {c.courseCode} — {c.courseName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loadingCourses && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <CircularProgress size={18} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Loading…
          </Typography>
        </Box>
      )}

      {selectedCourse && (
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          {selectedCourse.courseName}
        </Typography>
      )}
    </Stack>
  );
}
