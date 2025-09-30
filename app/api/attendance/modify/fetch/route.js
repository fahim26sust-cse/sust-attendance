import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Attendance from '@/lib/models/attendance';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get('courseCode');
    const date = searchParams.get('date');
    if (!courseCode || !date) {
      return NextResponse.json({ error: 'courseCode and date are required' }, { status: 400 });
    }
    await connectToDB();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const attendance = await Attendance.find({
      courseCode,
      timestamp: { $gte: startOfDay, $lte: endOfDay },
    });
    return NextResponse.json(attendance);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}
