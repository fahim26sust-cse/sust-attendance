'use client';

import { Box, CardContent, CardActions, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ShinyText from '@/app/components/animation/Text/ShinyText/ShinyText';
import { GlassCard, EnrollButton, Pill } from './EnrollStyles';

export default function CourseCard({ course, semester, onEnroll }) {
  return (
    <GlassCard>
      <CardContent sx={{ p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Pill size="small" label={course?.department || 'Dept'} />
          {semester ? <Pill size="small" label={`${semester}`} /> : null}
        </Box>

        {course ? <Pill size="small" label={course.courseCode || ''} /> : null}

        <Typography
          sx={{
            color: '#ffffff',
            pt: '5px',
            fontSize: { xs: '0.7rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' },
          }}
        >
          {course?.courseName}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 1, pt: 0, justifyContent: 'space-between' }}>
        <EnrollButton
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={() => onEnroll(course)}
        >
          <ShinyText text="Enroll" />
        </EnrollButton>
      </CardActions>
    </GlassCard>
  );
}
