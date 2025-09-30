// Client-safe wrappers for your API endpoints
export async function fetchCourses() {
  const res = await fetch('/api/courses/fetch');
  if (!res.ok) throw new Error('Failed to load courses');
  const raw = await res.json();
  // Normalize to array
  return Array.isArray(raw) ? raw : Array.isArray(raw?.courses) ? raw.courses : [];
}

export async function fetchEnrolledStudents(courseCode) {
  const res = await fetch(`/api/courses/enroll/students?courseCode=${encodeURIComponent(courseCode)}`);
  if (!res.ok) throw new Error('Failed to fetch students');
  const raw = await res.json();
  // Normalize to array: supports [], {students: []}, or {} → []
  const data = Array.isArray(raw) ? raw : (Array.isArray(raw?.students) ? raw.students : []);
  return data;
}

export async function submitAttendanceBatch(payload) {
  const res = await fetch('/api/attendance/create/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to save attendance');
  return data;
}
