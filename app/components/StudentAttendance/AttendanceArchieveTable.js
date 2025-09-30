'use client';

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AttendanceArchiveTable({ attendance = [], userId }) {
  const userAttendance = attendance.filter(a => a.studentId === userId);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        bgcolor: 'rgba(24,24,24,0.75)',
        backdropFilter: 'blur(12px)',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        mt: 3,               
        px: 2,
        mb: 6,        
        position: 'relative',
        zIndex: 0,
      }}
    >
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'rgb(0, 0, 0)',
              '& th': {
                color: '#00d4ff',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '1rem',
                letterSpacing: 1,
                borderBottom: '2px solid rgb(49, 3, 255)',
              },
            }}
          >
            <TableCell>Date</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Student Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userAttendance.length > 0 ? (
            userAttendance.map((row, idx) => (
              <TableRow
                key={row._id || idx}
                sx={{
                  bgcolor: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: 'rgba(0,212,255,0.08)',
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <TableCell sx={{ color: '#f5f5f5', fontSize: '0.9rem' }}>
                  {row.timestamp ? new Date(row.timestamp).toLocaleString() : '—'}
                </TableCell>
                <TableCell sx={{ color: '#f5f5f5', fontSize: '0.9rem' }}>{row.courseCode}</TableCell>
                <TableCell sx={{ color: '#f5f5f5', fontSize: '0.9rem' }}>{row.courseName}</TableCell>
                <TableCell sx={{ color: '#f5f5f5', fontSize: '0.9rem' }}>{row.studentName}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  textAlign: 'center',
                  opacity: 0.7,
                  color: '#ccc',
                  bgcolor: 'rgba(255,255,255,0.02)',
                  fontStyle: 'italic',
                  p: 2,
                }}
              >
                No attendance records found for this user
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
