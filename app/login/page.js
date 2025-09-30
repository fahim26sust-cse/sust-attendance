'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import dynamic from 'next/dynamic';
import BackgroundEffects from '../components/student-home/BackgroundEffects';
export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(''); // clear top-level error while typing
  };

  const handleLogin = async () => {
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem('accessToken', data.accessToken);
      router.push('/');
    } else {
      setError(data.error || 'Login failed');
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

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '50px',
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
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          py: { xs: 6, md: 10 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              bgcolor: 'rgb(0, 0, 0)',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 8px 30px rgb(12, 219, 255)',
            }}
          >
            <Typography variant="h3" align="center" sx={{ fontFamily: 'cursive', color: 'white', mb: 3, fontWeight: 700, letterSpacing: 0.5 }}>
              Login
            </Typography>

            <Grid container spacing={2} direction="column" justifyContent="center">
              <Grid sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="ID"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                />
              </Grid>

              <Grid sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                />
              </Grid>

              <Grid sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  InputProps={{ sx: inputStyles }}
                />
              </Grid>

              <Grid sx={{ mb: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
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
                  Login
                </Button>
              </Grid>
            </Grid>

            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 2, textAlign: 'center', fontWeight: 500 }}
              >
                {error}
              </Typography>
            )}
          </Paper>
        </motion.div>
      </Box>
    </div>
  );
}
