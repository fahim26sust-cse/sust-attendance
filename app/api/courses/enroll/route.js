import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import EnrolledCourse from '@/lib/models/enrolled_course';
export async function POST(req) {
  try {
    const { studentId, studentName, courseCode, courseName } = await req.json();
    await connectToDB();
    const existingEnrollment = await EnrolledCourse.findOne({
      studentId,
      studentName,
      courseCode,
      courseName
    });
    if (existingEnrollment) {
      return NextResponse.json({ error: 'You are already enrolled in this course.' }, { status: 400 });
    }
    const newEnrollment = new EnrolledCourse({
      studentId,
      studentName, 
      courseCode, 
      courseName 
    });
    await newEnrollment.save();
    return NextResponse.json({ message: 'Successfully enrolled in the course.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to enroll in course' }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required.' }, { status: 400 });
    }
    await connectToDB();
    const enrollments = await EnrolledCourse.find({ studentId });
    if (enrollments.length === 0) {
      return NextResponse.json({ message: 'No enrollments found for this student.' }, { status: 404 });
    }
    return NextResponse.json({ enrollments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enrollment data' }, { status: 500 });
  }
}
