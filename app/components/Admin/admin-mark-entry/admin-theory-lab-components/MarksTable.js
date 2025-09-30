import React from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography
} from '@mui/material';

export function MarksTable({ rows, globalAssignments, mainFields, handleFieldChange, updateAssignmentScore }) {
  return (
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 180 }}>Student</TableCell>
            {mainFields.map(field => (
              <TableCell key={field}>{field}</TableCell>
            ))}
            {globalAssignments.map(assignment => (
              <TableCell key={assignment.id}>
                {assignment.name || 'Unnamed'}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r => (
            <TableRow key={r.studentId}>
              <TableCell>
                <Typography variant="subtitle2">{r.studentName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {r.studentId}
                </Typography>
              </TableCell>

              {mainFields.map(field => (
                <TableCell key={field} sx={{ maxWidth: 120 }}>
                  <TextField
                    size="small"
                    type="number"
                    placeholder="0-100"
                    value={r[field]}
                    inputProps={{ min: 0 }}
                    onChange={(e) => handleFieldChange(r.studentId, field, e.target.value)}
                    fullWidth
                  />
                </TableCell>
              ))}
              {globalAssignments.map(assignment => {
                const studentAssignment = r.assignments.find(a => a.id === assignment.id);
                const score = studentAssignment ? studentAssignment.score : '';               
                return (
                  <TableCell key={assignment.id}>
                    <TextField
                      size="small"
                      type="number"
                      placeholder="Score"
                      value={score}
                      inputProps={{ min: 0 }}
                      onChange={(e) => updateAssignmentScore(r.studentId, assignment.id, e.target.value)}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}