import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import EnrolledCourse from '@/lib/models/enrolled_course';
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get('courseCode');
    if (!courseCode) {
      return NextResponse.json({ error: 'courseCode is required' }, { status: 400 });
    }
    const students = await EnrolledCourse.find(
      { courseCode },
      { _id: 0, studentId: 1, studentName: 1, courseCode: 1, courseName: 1 }
    ).sort({ studentId: 1 });
    return NextResponse.json(students, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
