import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Course from '@/lib/models/course';
export async function POST(req) {
  try {
    const { semester, department, batch, courseCode, courseName, courseType } = await req.json();
    await connectToDB();
    const existingCourse = await Course.findOne({ courseCode, courseName });
    if (existingCourse) {
      return NextResponse.json({ error: 'Course already exists' }, { status: 409 });
    }
    const newCourse = new Course({
      semester,
      department,
      batch,
      courseCode,  
      courseName,
      courseType,
    });
    await newCourse.save();
    return NextResponse.json({ message: 'Course saved successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save course' }, { status: 500 });
  }
}
