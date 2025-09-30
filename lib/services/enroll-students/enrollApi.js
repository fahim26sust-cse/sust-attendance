// Minimal client wrappers for your endpoints
export async function fetchAllCourses() {
  const res = await fetch('/api/courses/fetch');
  let raw = [];
  try { raw = await res.json(); } catch { /* noop */ }
  if (!res.ok) throw new Error('Failed to fetch courses');
  return Array.isArray(raw) ? raw : (Array.isArray(raw?.courses) ? raw.courses : []);
}

export async function fetchStudentEnrollments(studentId) {
  const res = await fetch(`/api/courses/enroll?studentId=${encodeURIComponent(studentId)}`, { method: 'GET' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || 'Failed to fetch enrolled courses');
  return data?.enrollments ?? [];
}

export async function createEnrollment({ studentId, studentName, courseCode, courseName }) {
  const res = await fetch('/api/courses/enroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, studentName, courseCode, courseName }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || 'Failed to enroll in the course.');
  return data;
}
