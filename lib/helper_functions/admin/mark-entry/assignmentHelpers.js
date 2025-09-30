export function ensureAllGlobalAssignments(rows, globalAssignments) {
  return rows.map(row => {
    const assignmentsWithAllGlobal = [...row.assignments];
    globalAssignments.forEach(globalAssignment => {
      const hasAssignment = assignmentsWithAllGlobal.some(a => a.id === globalAssignment.id);
      if (!hasAssignment) {
        assignmentsWithAllGlobal.push({
          id: globalAssignment.id,
          name: globalAssignment.name,
          score: ''
        });
      }
    });
    
    return {
      ...row,
      assignments: assignmentsWithAllGlobal
    };
  });
}