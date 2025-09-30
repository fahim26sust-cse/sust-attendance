// 'use client';

// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Typography, TextField, Button
// } from '@mui/material';

// export default function ConfirmDialog({
//   open,
//   pendingCourse,
//   requiredPhrase,
//   confirmInput,
//   onChangeInput,
//   confirmError,
//   onClose,
//   onSubmit,
//   submitting,
// }) {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs"   PaperProps={{
//     sx: {
//       backgroundColor: '#00052e', 
//       color: 'rgba(234,242,255,0.8)',           
//     }
//   }}>
//       <DialogTitle sx={{ color: '#eaf2ff', fontWeight: 800 }}>
//         Confirm Enrollment
//       </DialogTitle>

//       <DialogContent>
//         <Typography sx={{ color: 'rgba(234,242,255,0.8)', mb: 2 }}>
//           To enroll in <strong>{pendingCourse?.name}</strong> (Code: {pendingCourse?.code}),
//           please type <code>{requiredPhrase}</code> below.
//         </Typography>

//         <TextField
//           autoFocus
//           fullWidth
//           label={`Type: ${requiredPhrase}`}
//           variant="outlined"
//           value={confirmInput}
//           onChange={(e) => onChangeInput(e.target.value)}
//           onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(); } }}
//           error={Boolean(confirmError)}
//           helperText={confirmError || 'Case-insensitive; spaces are trimmed.'}
//           disabled={submitting}
//         />
//       </DialogContent>

//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button onClick={onClose} disabled={submitting}>Cancel</Button>
//         <Button variant="contained" onClick={onSubmit} disabled={submitting}>
//           {submitting ? 'Submitting…' : 'Confirm & Enroll'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, TextField, Button
} from '@mui/material';

export default function ConfirmDialog({
  open,
  pendingCourse,
  requiredPhrase,
  confirmInput,
  onChangeInput,
  confirmError,
  onClose,
  onSubmit,
  submitting,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        elevation: 24, // big shadow
        sx: {
          backgroundColor: '#0f172a', // slate-900-ish
          color: '#fff',
          // custom shadow if you want stronger than elevation
          boxShadow:
            '0 20px 50px rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.35)',
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ color: '#fff', fontWeight: 800 }}>
        Confirm Enrollment
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 2 }}>
          To enroll in <strong>{pendingCourse?.name}</strong> (Code: {pendingCourse?.code}),
          please type <code>{requiredPhrase}</code> below.
        </Typography>

        <TextField
          autoFocus
          fullWidth
          label={`Type: ${requiredPhrase}`}
          variant="outlined"
          value={confirmInput}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(); } }}
          error={Boolean(confirmError)}
          helperText={confirmError || 'Case-insensitive; spaces are trimmed.'}
          disabled={submitting}
          // Make the input, label, helper, and outline white-friendly
          sx={{
            '& .MuiInputBase-input': { color: '#fff' }, // input text
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' }, // label
            '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
            '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.75)' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.35)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.6)',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            // icons / adornments if you add them later
            '& .MuiSvgIcon-root': { color: '#fff' },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={submitting}
          sx={{ boxShadow: 'none' }}
        >
          {submitting ? 'Submitting…' : 'Confirm & Enroll'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
