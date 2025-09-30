'use client';

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const GlassContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  border: '1px solid rgba(68, 6, 236, 0.65)',
  background: 'rgba(235, 159, 238, 0.64)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 18px 40px rgba(241, 144, 229, 0.48)',
}));
const HeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: 0.3,
  fontSize: 16,
  color: '#000',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgb(0, 0, 0)',
  whiteSpace: 'nowrap',
}));

const BodyCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 800 ,
  color: '#000000', 
  fontSize: 16,
  borderBottom: '1px solid rgba(255,255,255,0.08)',
}));

const ZebraRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.07)',
    transition: 'background-color 180ms ease',
  },
}));

export default function AttendanceEntryForm({ rows, onToggle }) {
  return (
    <GlassContainer component={Paper} elevation={0}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow >
            <HeadCell >Student ID</HeadCell>
            <HeadCell >Student Name</HeadCell>
            <HeadCell  >Course Code</HeadCell>
            <HeadCell align="center">Present</HeadCell>
            <HeadCell  align="center">Absent</HeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <ZebraRow key={r.studentId} hover>
              <BodyCell >{r.studentId}</BodyCell>
              <BodyCell >{r.studentName}</BodyCell>
              <BodyCell >{r.courseCode}</BodyCell>
              <BodyCell align="center">
                <Checkbox
                  checked={r.present === true}
                  onChange={(e) => onToggle(r.studentId, e.target.checked)}
                  inputProps={{ 'aria-label': `present-${r.studentId}` }}
                  sx={{
                    p: 0.5,
                    '& svg': { fontSize: 22 },
                    color: 'rgb(0, 0, 0)',
                    '&.Mui-checked': { color: '#00ff26' },
                  }}
                />
              </BodyCell>
              <BodyCell align="center">
                <Checkbox
                  checked={r.present === false}
                  onChange={(e) => onToggle(r.studentId, !e.target.checked)}
                  inputProps={{ 'aria-label': `absent-${r.studentId}` }}
                  sx={{
                    p: 0.5,
                    '& svg': { fontSize: 22 },
                    color: 'rgb(0, 0, 0)',
                    '&.Mui-checked': { color: '#ff0019' },
                  }}
                />
              </BodyCell>
            </ZebraRow>
          ))}

          {rows.length === 0 && (
            <TableRow>
              <BodyCell colSpan={5} align="center" sx={{ py: 5, opacity: 0.75 }}>
                No students loaded
              </BodyCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </GlassContainer>
  );
}
