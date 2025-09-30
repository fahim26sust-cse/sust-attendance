'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Paper,
  Stack,
  MenuItem,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundEffects from '../components/student-home/BackgroundEffects';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    dept: '',
    batch: '',
    semester: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    for (let key of ['id', 'name', 'email', 'dept', 'batch', 'semester', 'password', 'confirmPassword']) {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');

    const payload = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      dept: formData.dept,
      batch: formData.batch,
      semester: formData.semester,
      password: formData.password,
    };

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.accessToken) {
      router.push('/login');
      return;
    }

    if (data?.field && data?.error) {
      setErrors((prev) => ({ ...prev, [data.field]: data.error }));
      setErrorMessage(data.error);
    } else if (data?.error) {
      setErrorMessage(data.error);
    } else {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const inputStyles = {
    color: 'white',
    bgcolor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.12)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.55)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.2)',
      transition: 'border-color 0.3s ease-in-out',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3b82f6',
    },
    '&.Mui-focused': {
      bgcolor: 'rgba(59,130,246,0.15)',
      transform: 'translateY(-2px) scale(1.01)',
      boxShadow: '0 8px 20px rgba(59,130,246,0.5)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
      borderWidth: 2,
    },
  };

  const menuItemStyles = {
    bgcolor: '#1e293b',
    color: 'white',
    borderRadius: 1,
    my: 0.5,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      bgcolor: '#3b82f6',
      color: 'white',
      transform: 'translateX(4px)',
      boxShadow: '0 4px 12px rgba(59,130,246,0.6)',
    },
    '&.Mui-selected': {
      bgcolor: '#3b82f6 !important',
      color: 'white',
      fontWeight: 600,
    },
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '140px',
        position: 'relative',
        backgroundColor: 'black',
      }}
    >
      <Navbar />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <BackgroundEffects />
      </div>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%)',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              bgcolor: 'rgb(0, 0, 0)',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 8px 30px rgba(0, 247, 255, 0.92)',
            }}
          >
            <Stack spacing={3}>
              <Box textAlign="center">
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'white', letterSpacing: 0.5 }}>
                  Register
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                  Create your account to continue
                </Typography>
              </Box>

              <Stack spacing={2}>
                {['id', 'name', 'email', 'dept'].map((field) => (
                  <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors[field]}
                    helperText={errors[field] || ' '}
                    variant="outlined"
                    margin="none"
                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                    InputProps={{ sx: inputStyles }}
                    FormHelperTextProps={{
                      sx: { m: 0.5, color: errors[field] ? 'error.main' : 'rgba(255,255,255,0.5)' },
                    }}
                  />
                ))}

                <TextField
                  select
                  label="Batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.batch}
                  helperText={errors.batch || ' '}
                  variant="outlined"
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          bgcolor: '#0f172a',
                          borderRadius: 2,
                          boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
                          maxHeight: 250,
                        },
                      },
                    },
                  }}
                >
                  {[
                    '2017-18', '2018-19', '2019-20', '2020-21', '2021-22',
                    '2022-23', '2023-24', '2024-25', '2025-26', '2026-27'
                  ].map((option) => (
                    <MenuItem key={option} value={option} sx={menuItemStyles}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.semester}
                  helperText={errors.semester || ' '}
                  variant="outlined"
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          bgcolor: '#0f172a',
                          borderRadius: 2,
                          boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
                          maxHeight: 250,
                        },
                      },
                    },
                  }}
                >
                  {[
                    '1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2', '5-1', '5-2', '6-1', '6-2'
                  ].map((option) => (
                    <MenuItem key={option} value={option} sx={menuItemStyles}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password || ' '}
                  variant="outlined"
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                  FormHelperTextProps={{
                    sx: { m: 0.5, color: errors.password ? 'error.main' : 'rgba(255,255,255,0.5)' },
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword || ' '}
                  variant="outlined"
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                  FormHelperTextProps={{
                    sx: { m: 0.5, color: errors.confirmPassword ? 'error.main' : 'rgba(255,255,255,0.5)' },
                  }}
                />
              </Stack>

              <Button
                onClick={handleRegister}
                fullWidth
                disabled={loading}
                variant="contained"
                size="large"
                sx={{
                  py: 1.25,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.5)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 30px rgba(59,130,246,0.65)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>

              <Typography variant="caption" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                By continuing, you agree to my Terms & Privacy Policy.
              </Typography>
            </Stack>
          </Paper>

          {errorMessage && (
            <Snackbar
              open={!!errorMessage}
              autoHideDuration={6000}
              onClose={() => setErrorMessage('')}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              sx={{
                bottom: { xs: `calc(16px + env(safe-area-inset-bottom))`, md: 32 },
              }}
            >
              <Alert
                severity="error"
                onClose={() => setErrorMessage('')}
                variant="filled"
                elevation={6}
                sx={{ minWidth: 320, textAlign: 'center' }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>


          )}
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
