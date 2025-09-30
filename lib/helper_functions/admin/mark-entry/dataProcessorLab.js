export function mapLabStudentData(students, existingMarks, course, globalAssignmentsFromData) {
  const marksByStudent = new Map(existingMarks.map(m => [m.studentId, m]));
  
  return students.map(student => {
    const mark = marksByStudent.get(student.studentId);
    const assignments = [];
    
    if (Array.isArray(mark?.assignments)) {
      mark.assignments.forEach(assignment => {
        const globalAssignment = globalAssignmentsFromData.find(a => a.name === assignment.name);
        if (globalAssignment) {
          assignments.push({
            id: globalAssignment.id,
            name: assignment.name,
            score: assignment.score ?? ''
          });
        }
      });
    }

    return {
      studentId: student.studentId,
      studentName: student.studentName,
      courseCode: course.courseCode,
      courseName: course.courseName,
      attendance: mark?.attendance ?? '',
      labFinal: mark?.labFinal ?? '',
      projectFinal: mark?.projectFinal ?? '',
      assignments
    };
  });
}

export function prepareLabSavePayload(rows, globalAssignments, coerceNum) {
  return rows.map(row => {
    const validAssignments = row.assignments.filter(a => 
      a.name?.trim() && a.score !== '' && a.score !== null && a.score !== undefined
    );
    
    return {
      studentId: row.studentId,
      studentName: row.studentName,
      courseCode: row.courseCode,
      courseName: row.courseName,
      attendance: coerceNum(row.attendance),
      labFinal: coerceNum(row.labFinal),
      projectFinal: coerceNum(row.projectFinal),
      assignments: validAssignments.map(a => ({ 
        name: a.name.trim(), 
        score: coerceNum(a.score) || 0 
      }))
    };
  });
}

export function hasLabDataToSave(payload) {
  return payload.some(row => 
    row.attendance !== null || 
    row.labFinal !== null || 
    row.projectFinal !== null || 
    row.assignments.length > 0
  );
}