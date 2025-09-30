'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SpotlightCard from './animation/SpotlightCard/SpotlightCard';
import GradientText from './animation/Text/GradientText/GradientText';

export default function AdminCourseForm({ onCourseAdded }) {
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseType, setCourseType] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!semester || !department || !batch || !courseName || !courseCode || !courseType) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ semester, department, batch, courseName, courseCode, courseType }),
      });

      if (response.ok) {
        setSuccessMessage('Course added successfully!');
        setError('');
        setSemester('');
        setDepartment('');
        setBatch('');
        setCourseName('');
        setCourseCode('');
        setCourseType('');
        onCourseAdded && onCourseAdded();
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong!');
        setSuccessMessage('');
      }
    } catch {
      setError('An error occurred while saving the course.');
      setSuccessMessage('');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 600,
        width: '100%',
        mx: 'auto',
        minHeight: { xs: '75vh', md: '80vh' },
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <SpotlightCard
        className="custom-spotlight-card"
        spotlightColor="rgba(89, 0, 255, 0.53)"
      >
        <GradientText
          colors={["#000000", "#ffffff",]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            Add New Course
          </Typography>
        </GradientText>
        {error && (
          <Typography sx={{ color: '#ff6b6b', mb: 1.5 }}>{error}</Typography>
        )}
        {successMessage && (
          <Typography sx={{ color: '#4ade80', mb: 1.5 }}>{successMessage}</Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            InputLabelProps={{ sx: { color: '#cbd5e1' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e2e8f0',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(148,163,184,0.25)' },
                '&:hover fieldset': { borderColor: 'rgba(148,163,184,0.45)' },
                '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
              },
            }}
          />

          <TextField
            label="Course Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            InputLabelProps={{ sx: { color: '#cbd5e1' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e2e8f0',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(148,163,184,0.25)' },
                '&:hover fieldset': { borderColor: 'rgba(148,163,184,0.45)' },
                '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
              },
            }}
          />

          <TextField
            label="Semester"
            variant="outlined"
            fullWidth
            margin="normal"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            InputLabelProps={{ sx: { color: '#cbd5e1' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e2e8f0',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(148,163,184,0.25)' },
                '&:hover fieldset': { borderColor: 'rgba(148,163,184,0.45)' },
                '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
              },
            }}
          />

          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            margin="normal"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            InputLabelProps={{ sx: { color: '#cbd5e1' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e2e8f0',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(148,163,184,0.25)' },
                '&:hover fieldset': { borderColor: 'rgba(148,163,184,0.45)' },
                '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
              },
            }}
          />

          <TextField
            label="Batch"
            variant="outlined"
            fullWidth
            margin="normal"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            InputLabelProps={{ sx: { color: '#cbd5e1' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e2e8f0',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(148,163,184,0.25)' },
                '&:hover fieldset': { borderColor: 'rgba(148,163,184,0.45)' },
                '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
              },
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { color: '#cbd5e1' },
              '& .MuiOutlinedInput-root': {
                color: '#e2e8f0',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(148,163,184,0.25)' },
                '&:hover fieldset': { borderColor: 'rgba(148,163,184,0.45)' },
                '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
              },
              '& .MuiSvgIcon-root': { color: '#e2e8f0' },
            }}
          >
            <InputLabel>Course Type</InputLabel>
            <Select
              value={courseType}
              label="Course Type"
              onChange={(e) => setCourseType(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: { bgcolor: '#0b0f14', color: '#e2e8f0' },
                },
              }}
            >
              <MenuItem value="Theory">Theory</MenuItem>
              <MenuItem value="Lab">Lab</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: 700,
              textTransform: 'none',
              bgcolor: '#00e5ff',
              color: '#001318',
              '&:hover': { bgcolor: '#19ecff' },
              boxShadow: '0 8px 18px rgba(0,229,255,0.25)',
            }}
          >
            Save Course
          </Button>
        </Box>
      </SpotlightCard>
    </Box>
  );
}
