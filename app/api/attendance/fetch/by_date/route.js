import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Attendance from '@/lib/models/attendance';

export async function GET(request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const courseCode = searchParams.get('courseCode');
    const courseName = searchParams.get('courseName');
    if (!studentId || !courseCode || !courseName) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }
    const today = new Date();
    const currentDateString = today.toISOString().split('T')[0]; 
    const records = await Attendance.find({
      studentId,
      courseCode,
      courseName,
      createdAt: {
        $gte: new Date(currentDateString), 
        $lt: new Date(new Date(currentDateString).setDate(today.getDate() + 1)), 
      },
    });
    if (records.length > 0) {
      return NextResponse.json({ attendanceExists: true }, { status: 200 }); 
    }
    return NextResponse.json({ attendanceExists: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}
