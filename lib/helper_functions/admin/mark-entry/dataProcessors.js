export function coerceNum(v) {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
export function extractGlobalAssignmentsFromMarks(existingMarks) {
  const globalAssignments = [];
  const assignmentNames = new Set();
  
  existingMarks.forEach(mark => {
    if (Array.isArray(mark.assignments)) {
      mark.assignments.forEach(assignment => {
        if (assignment.name) {
          assignmentNames.add(assignment.name);
        }
      });
    }
  });
  Array.from(assignmentNames).forEach(name => {
    globalAssignments.push({ name, id: Date.now() + Math.random() });
  });
  
  return globalAssignments;
}
export function mapStudentData(students, existingMarks, course, globalAssignmentsFromData) {
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
      TT1: mark?.TT1 ?? '',
      TT2: mark?.TT2 ?? '',
      attendance: mark?.attendance ?? '',
      finalMarks: mark?.finalMarks ?? '',
      assignments
    };
  });
}

export function prepareSavePayload(rows, globalAssignments, coerceNum) {
  return rows.map(row => {
    const validAssignments = row.assignments.filter(a => 
      a.name?.trim() && a.score !== '' && a.score !== null && a.score !== undefined
    );
    return {
      studentId: row.studentId,
      studentName: row.studentName,
      courseCode: row.courseCode,
      courseName: row.courseName,
      TT1: coerceNum(row.TT1),
      TT2: coerceNum(row.TT2),
      attendance: coerceNum(row.attendance),
      finalMarks: coerceNum(row.finalMarks),
      assignments: validAssignments.map(a => ({ 
        name: a.name.trim(), 
        score: coerceNum(a.score) || 0 
      }))
    };
  });
}

export function hasDataToSave(payload) {
  return payload.some(row => 
    row.TT1 !== null || 
    row.TT2 !== null || 
    row.attendance !== null || 
    row.finalMarks !== null || 
    row.assignments.length > 0
  );
}

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