import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Attendance from '@/lib/models/attendance'; 
export async function POST(req) {
  try {
    const { studentId, studentName, courseCode, courseName, pin, adminPin, timestamp } = await req.json();
    await connectToDB();
    const attendance = new Attendance({
      studentId,
      studentName,
      courseCode,
      courseName,
      timestamp,
    });
    await attendance.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
  }
}
