
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

const NEU_BG   = '#048f43';   
const NEU_DARK = '#000d0d';   

export const NeoSurface = styled(Box)(({ theme }) => ({
  background: NEU_BG,
  borderRadius: 24,
  width:'100%',
  padding: '24px', 
  margin: '0 auto',  
  [theme.breakpoints.down('sm')]: {
    padding: '5px', 
  },
}));


export const NeoButton = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: '#000000',
  color: '#333',
  border: 'none',
  borderRadius: 18,
  padding: '14px 28px',
  textTransform: 'none',
  cursor: 'pointer',
  boxShadow: `8px 8px 20px ${NEU_DARK}, -8px -8px 20px #fff`,
  transition: 'box-shadow .3s ease, transform .15s ease',
  '&:hover': {
    boxShadow: `
      8px 8px 20px ${NEU_DARK},
      -8px -8px 20px #fff,
      inset -8px -8px 20px #fff,
      inset 8px 8px 20px ${NEU_DARK}
    `,
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: `inset 8px 8px 20px ${NEU_DARK}, inset -8px -8px 20px #fff`,
  },
  '&:focus-visible': { outline: '2px solid rgba(99,117,125,.25)' },
  [theme.breakpoints.down('sm')]: {
    padding: '12px 24px',
    width: '100%',  
  },
  [theme.breakpoints.down('xs')]: {
    padding: '10px 20px',
  },
}));



export const NeoCircle = styled(Box)(({ theme }) => ({
  background: NEU_BG,
  width: 110,
  height: 110,
  borderRadius: '50%',  
  border: 'none',
  cursor: 'pointer',
  boxShadow: `8px 8px 20px ${NEU_DARK}, -8px -8px 20px #fff`,
  transition: 'box-shadow .3s ease, transform .15s ease',
  '&:hover': {
    boxShadow: `
      8px 8px 20px ${NEU_DARK},
      -8px -8px 20px #fff,
      inset -8px -8px 20px #fff,
      inset 8px 8px 20px ${NEU_DARK}
    `,
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: `inset 8px 8px 20px ${NEU_DARK}, inset -8px -8px 20px #fff`,
  },
  [theme.breakpoints.down('sm')]: {
    width: 90,  
    height: 90,
  },
  [theme.breakpoints.down('xs')]: {
    width: 70,  
    height: 70,
  },
}));
