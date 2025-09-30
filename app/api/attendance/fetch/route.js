import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Attendance from '@/lib/models/attendance';

export async function GET(request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const courseCode = searchParams.get('courseCode');
    const courseName = searchParams.get('courseName');
    if (!courseCode || !courseName) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }
    const records = await Attendance.find({ courseCode, courseName });
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}
