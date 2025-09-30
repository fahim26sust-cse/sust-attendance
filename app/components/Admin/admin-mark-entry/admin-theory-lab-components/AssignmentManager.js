import React from 'react';
import {
  Box, Typography, Button, TextField, IconButton,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export function AssignmentManager({
  globalAssignments,
  addGlobalAssignment,
  updateGlobalAssignment,
  removeGlobalAssignment,
  deleteDialogOpen,
  assignmentToDelete,
  openDeleteDialog,
  closeDeleteDialog
}) {
  const confirmDeleteAssignment = () => {
    if (assignmentToDelete) {
      removeGlobalAssignment(assignmentToDelete.id);
    }
    closeDeleteDialog();
  };
  return (
    <>
      <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Assignments (Applied to all students)
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Button size="small" startIcon={<AddIcon />} onClick={addGlobalAssignment}>
            Add Assignment
          </Button>
          <Typography variant="caption" color="text.secondary">
            Add assignment names that apply to all students
          </Typography>
        </Stack>

        {globalAssignments.length > 0 && (
          <Stack spacing={1}>
            {globalAssignments.map((assignment) => (
              <Stack key={assignment.id} direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  label="Assignment Name"
                  value={assignment.name}
                  onChange={(e) => updateGlobalAssignment(assignment.id, e.target.value)}
                  sx={{ minWidth: 200 }}
                />
                <IconButton 
                  aria-label="delete" 
                  onClick={() => openDeleteDialog(assignment)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-assignment-dialog-title"
        aria-describedby="delete-assignment-dialog-description"
      >
        <DialogTitle id="delete-assignment-dialog-title">
          Confirm Delete Assignment
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-assignment-dialog-description">
            Are you sure you want to delete the assignment "{assignmentToDelete?.name || 'Unnamed'}"?
            This action will remove this assignment and all associated marks for all students.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteAssignment} color="error" autoFocus>
            Delete Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}