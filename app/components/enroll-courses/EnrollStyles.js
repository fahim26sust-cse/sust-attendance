'use client';
import { styled, keyframes } from '@mui/material/styles';
import { Box, Card, Chip, Button } from '@mui/material';

export const floatUp = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const HeaderWrap = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: 4,
}));

export const FlexWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
  },
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

export const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: 18,
  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
  animation: `${floatUp} 420ms ease both`,
  width: '48%',
  maxWidth: '270px',
  [theme.breakpoints.down('sm')]: {
    width: '48%',
    height: '150px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
}));

export const EnrollButton = styled(Button)(({ theme }) => ({
  borderRadius: 14,
  textTransform: 'none',
  backdropFilter: 'blur(6px)',
  background: 'linear-gradient(135deg, rgba(64,255,170,0.2), rgba(64,121,255,0.2))',
  border: '1px solid rgba(255,255,255,0.25)',
  transition: 'transform 150ms ease, box-shadow 150ms ease, background 200ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    background: 'linear-gradient(135deg, rgba(64,255,170,0.28), rgba(64,121,255,0.28))',
    boxShadow: '0 8px 24px rgba(64,121,255,0.35)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 4px',
    fontWeight: 500,
    width: '40%',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '10px 18px',
    fontWeight: 700,
    width: '100%',
  },
}));

export const Pill = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: 0.4,
  background: 'rgba(255,255,255,0.10)',
  border: '1px solid rgba(8, 159, 230, 0.9)',
  color: '#e9eefb',
  [theme.breakpoints.down('sm')]: {
    fontWeight: 10,
    fontSize: '10px'
  },
}));
