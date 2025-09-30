export async function fetchEnrolledStudents(courseCode) {
  const res = await fetch(
    `/api/courses/enroll/students?courseCode=${encodeURIComponent(courseCode)}`
  );
  
  let students;
  try {
    students = await res.json();
  } catch {
    students = [];
  }
  
  return Array.isArray(students) ? students : [];
}

export async function fetchExistingTheoryMarks(courseCode) {
  const marksRes = await fetch(
    `/api/admin/theory-marks/by-course?courseCode=${encodeURIComponent(courseCode)}`
  );
  
  let existingMarks;
  try {
    existingMarks = await marksRes.json();
  } catch {
    existingMarks = [];
  }
  
  return Array.isArray(existingMarks) ? existingMarks : [];
}

export async function saveTheoryMarksBulk(payload) {
  const res = await fetch('/api/admin/theory-marks/bulk-upsert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rows: payload }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to save theory marks');
  
  return data;
}
export async function fetchExistingLabMarks(courseCode) {
  const marksRes = await fetch(
    `/api/admin/lab-marks/by-course?courseCode=${encodeURIComponent(courseCode)}`
  );
  let existingMarks;
  try {
    existingMarks = await marksRes.json();
  } catch {
    existingMarks = [];
  }
  return Array.isArray(existingMarks) ? existingMarks : [];
}
export async function saveLabMarksBulk(payload) {
  const res = await fetch('/api/admin/lab-marks/bulk-upsert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rows: payload }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to save lab marks');
  
  return data;
}