'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/admin/login'); 
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred');
      }
    } else {
      setError('Please fill in both fields');
    }
  };

  return (
    <Box sx={{ width: 400, margin: 'auto', padding: 4 }}>
      <h2>Admin Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Button type="submit" fullWidth variant="contained">
          Register
        </Button> */}
        <h1>Contact Md Fahimul Islam For Registering As An Admin</h1>
      </form>
    </Box>
  );
}
