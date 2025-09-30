'use client';

import { Box, Typography } from '@mui/material';
import { FlexWrap } from './EnrollStyles';
import CourseCard from './CourseCard';

export default function CoursesGrid({ courses = [], semester, onEnroll }) {
  if (!courses.length) {
    return (
      <Box sx={{ textAlign: 'center', color: 'rgba(234,242,255,0.7)', mt: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          No courses found for the selected department/semester.
        </Typography>
        <Typography variant="body2">
          Try changing the filters or check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <FlexWrap>
      {courses.map((course, idx) => (
        <CourseCard
          key={course?._id || `${course?.courseCode}-${idx}`}
          course={course}
          semester={semester}
          onEnroll={onEnroll}
        />
      ))}
    </FlexWrap>
  );
}
