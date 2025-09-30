'use client';
import React, { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { useMarksForm } from '../admin-mark-entry/admin-theory-lab-components/useMarksForm';
import { AssignmentManager } from '../admin-mark-entry/admin-theory-lab-components/AssignmentManager';
import { MarksTable } from '../admin-mark-entry/admin-theory-lab-components/MarksTable';
import { FormHeader } from '../admin-mark-entry/admin-theory-lab-components/FormHeader';
import { 
  fetchEnrolledStudents, 
  fetchExistingTheoryMarks, 
  saveTheoryMarksBulk 
} from '@/lib/helper_functions/admin/mark-entry/apiHandlers';
import { 
  extractGlobalAssignmentsFromMarks, 
  mapStudentData, 
  prepareSavePayload, 
  hasDataToSave,
  coerceNum 
} from '@/lib/helper_functions/admin/mark-entry/dataProcessors';
import { ensureAllGlobalAssignments } from '@/lib/helper_functions/admin/mark-entry/assignmentHelpers';
export default function TheoryMarksForm({ course, onMessage }) {
  const {
    rows, setRows,
    originalRows, setOriginalRows,
    globalAssignments, setGlobalAssignments,
    loading, setLoading,
    saving, setSaving,
    modifiedCount,
    deleteDialogOpen,
    assignmentToDelete,
    openDeleteDialog,
    closeDeleteDialog,
    addGlobalAssignment,
    removeGlobalAssignment,
    updateGlobalAssignment,
    updateAssignmentScore,
    handleFieldChange
  } = useMarksForm({
    mainFields: ['TT1', 'TT2', 'attendance', 'finalMarks']
  });
  const handleFetchStudents = async () => {
    setLoading(true);
    onMessage?.(null);  
    try {
      const studentsArr = await fetchEnrolledStudents(course.courseCode);
      if (studentsArr.length === 0) {
        setRows([]);
        setOriginalRows([]);
        onMessage?.({ type: 'info', text: 'No enrolled students found for this course.' });
        return;
      }
      const existingArr = await fetchExistingTheoryMarks(course.courseCode);
      const globalAssignmentsFromData = extractGlobalAssignmentsFromMarks(existingArr);
      if (globalAssignmentsFromData.length > 0) {
        setGlobalAssignments(globalAssignmentsFromData);
      }
      const mapped = mapStudentData(
        studentsArr, 
        existingArr, 
        course, 
        globalAssignmentsFromData
      );
      setRows(mapped);
      setOriginalRows(JSON.parse(JSON.stringify(mapped)));
      onMessage?.({ type: 'success', text: 'Students & theory marks loaded.' });     
    } catch (e) {
      console.error(e);
      onMessage?.({ type: 'error', text: 'Failed to fetch students/marks' });
    } finally {
      setLoading(false);
    }
  };
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      onMessage?.(null);
      const updatedRows = ensureAllGlobalAssignments(rows, globalAssignments);
      setRows(updatedRows);
      const payload = prepareSavePayload(updatedRows, globalAssignments, coerceNum);
      if (!hasDataToSave(payload)) {
        onMessage?.({ type: 'info', text: 'No changes to save.' });
        setSaving(false);
        return;
      }
      await saveTheoryMarksBulk(payload);
      setOriginalRows(JSON.parse(JSON.stringify(updatedRows)));      
      onMessage?.({ type: 'success', text: `Saved ${modifiedCount} record(s).` });    
    } catch (e) {
      console.error(e);
      onMessage?.({ type: 'error', text: e.message || 'Save failed' });
    } finally {
      setSaving(false);
    }
  };
    useEffect(() => {
    if (course) {
     setRows([]);
     setGlobalAssignments([]);
    }
  }, [course]);

  return (
    <Paper sx={{ p: 2 }}>
      <FormHeader
        title={`Theory Marks — ${course.courseCode}`}
        loading={loading}
        saving={saving}
        modifiedCount={modifiedCount}
        onFetchStudents={handleFetchStudents}
        onSaveAll={handleSaveAll}
        hasRows={rows.length > 0}
      />

      <AssignmentManager
        globalAssignments={globalAssignments}
        addGlobalAssignment={addGlobalAssignment}
        updateGlobalAssignment={updateGlobalAssignment}
        removeGlobalAssignment={removeGlobalAssignment}
        deleteDialogOpen={deleteDialogOpen}
        assignmentToDelete={assignmentToDelete}
        openDeleteDialog={openDeleteDialog}
        closeDeleteDialog={closeDeleteDialog}
      />

      {rows.length === 0 && !loading && (
        <Typography variant="body2" color="text.secondary" sx={{ px: 1, pb: 1 }}>
          No students to show yet. Click "Load Students" after selecting the course.
        </Typography>
      )}

      {rows.length > 0 && (
        <MarksTable
          rows={rows}
          globalAssignments={globalAssignments}
          mainFields={['TT1', 'TT2', 'attendance', 'finalMarks']}
          handleFieldChange={handleFieldChange}
          updateAssignmentScore={updateAssignmentScore}
        />
      )}
    </Paper>
  );
}