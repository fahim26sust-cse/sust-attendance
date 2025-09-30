import { useState, useEffect } from 'react';

export function useMarksForm(initialState) {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [globalAssignments, setGlobalAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modifiedCount, setModifiedCount] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  useEffect(() => {
    if (rows.length === 0 || originalRows.length === 0) {
      setModifiedCount(0);
      return;
    }
    const count = rows.filter((row, index) => {
      const originalRow = originalRows[index];
      if (!originalRow) return false;
      const mainFieldsChanged = initialState.mainFields.some(
        field => row[field] !== originalRow[field]
      );
      const assignmentsChanged = 
        row.assignments.length !== originalRow.assignments.length ||
        row.assignments.some((assignment, i) => {
          const originalAssignment = originalRow.assignments[i];
          if (!originalAssignment) return true;
          return assignment.name !== originalAssignment.name || assignment.score !== originalAssignment.score;
        });

      return mainFieldsChanged || assignmentsChanged;
    }).length;

    setModifiedCount(count);
  }, [rows, originalRows, initialState.mainFields]);

  const openDeleteDialog = (assignment) => {
    setAssignmentToDelete(assignment);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setAssignmentToDelete(null);
  };

  const addGlobalAssignment = () => {
    setGlobalAssignments(prev => [...prev, { name: '', id: Date.now() + Math.random() }]);
  };

  const removeGlobalAssignment = (id) => {
    setGlobalAssignments(prev => prev.filter(a => a.id !== id));

    setRows(prev => 
      prev.map(row => ({
        ...row,
        assignments: row.assignments.filter(a => a.id !== id)
      }))
    );
  };

  const updateGlobalAssignment = (id, name) => {
    setGlobalAssignments(prev => 
      prev.map(a => a.id === id ? { ...a, name } : a)
    );

    setRows(prev => 
      prev.map(row => ({
        ...row,
        assignments: row.assignments.map(a => 
          a.id === id ? { ...a, name } : a
        )
      }))
    );
  };

  const updateAssignmentScore = (studentId, assignmentId, score) => {
    setRows(prev =>
      prev.map(r => {
        if (r.studentId !== studentId) return r;
        const assignmentExists = r.assignments.some(a => a.id === assignmentId);
        let newAssignments;        
        if (assignmentExists) {
          newAssignments = r.assignments.map(a => 
            a.id === assignmentId ? { ...a, score } : a
          );
        } else {
          const globalAssignment = globalAssignments.find(a => a.id === assignmentId);
          newAssignments = [...r.assignments, { 
            id: assignmentId, 
            name: globalAssignment.name, 
            score 
          }];
        }
        
        return { ...r, assignments: newAssignments };
      })
    );
  };
  const handleFieldChange = (studentId, field, value) => {
    setRows(prev =>
      prev.map(r => (r.studentId === studentId ? { ...r, [field]: value } : r))
    );
  };
  return {
    rows, setRows,
    originalRows, setOriginalRows,
    globalAssignments, setGlobalAssignments,
    loading, setLoading,
    saving, setSaving,
    modifiedCount, setModifiedCount,
    deleteDialogOpen, setDeleteDialogOpen,
    assignmentToDelete, setAssignmentToDelete,
    openDeleteDialog,
    closeDeleteDialog,
    addGlobalAssignment,
    removeGlobalAssignment,
    updateGlobalAssignment,
    updateAssignmentScore,
    handleFieldChange
  };
}