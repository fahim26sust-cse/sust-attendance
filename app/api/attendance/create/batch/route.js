import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Attendance from '@/lib/models/attendance';
function getDayRange(dateInput) {
  const date = new Date(dateInput);
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  return { dayStart, dayEnd };
}
export async function POST(req) {
  try {
    const body = await req.json();
    const { courseCode, courseName, date, rows } = body || {};
    if (!courseCode || !courseName || !date || !Array.isArray(rows)) {
      return NextResponse.json({ error: 'courseCode, courseName, date, rows are required' }, { status: 400 });
    }
    await connectToDB();
    const presentRows = rows.filter(r => r.present);
    if (presentRows.length === 0) {
      return NextResponse.json({ inserted: 0, skippedExisting: 0, message: 'No present rows submitted.' }, { status: 200 });
    }
    const { dayStart, dayEnd } = getDayRange(date);
    const studentIds = presentRows.map(r => r.studentId);
    const existing = await Attendance.find({
      studentId: { $in: studentIds },
      courseCode,
      timestamp: { $gte: dayStart, $lte: dayEnd },
    }, { studentId: 1, _id: 0 });
    const already = new Set(existing.map(e => e.studentId));
    const toInsert = presentRows
      .filter(r => !already.has(r.studentId))
      .map(r => ({
        studentId: r.studentId,
        studentName: r.studentName,
        courseCode,
        courseName,
        timestamp: new Date(dayStart),
      }));

    let insertedCount = 0;
    if (toInsert.length > 0) {
      const result = await Attendance.insertMany(toInsert, { ordered: false });
      insertedCount = result?.length || 0;
    }

    return NextResponse.json({
      inserted: insertedCount,
      skippedExisting: presentRows.length - insertedCount,
      date,
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
  }
}
