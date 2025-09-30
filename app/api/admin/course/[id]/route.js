import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import EnrolledCourse from '@/lib/models/enrolled_course';
import Course from '@/lib/models/course';

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    if (!id) {
      throw new Error('Course ID is missing');
    }
    const updates = await req.json();
    if (!updates.courseName || !updates.courseCode || !updates.semester || !updates.department || !updates.batch) {
      return NextResponse.json({ error: 'Missing required course data' }, { status: 400 });
    }
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    const enrolledStudents = await EnrolledCourse.find({ courseId: id });
    if (enrolledStudents.length > 0) {
      return NextResponse.json({ error: 'Course cannot be updated because students are enrolled in it.' }, { status: 400 });
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json({ message: 'Course updated successfully.', updatedCourse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update course due to internal server error' }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    if (!id) {
      throw new Error('Course ID is missing');
    }
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    const enrolledStudents = await EnrolledCourse.find({ courseId: id });
    if (enrolledStudents.length > 0) {
      return NextResponse.json({ error: 'Course cannot be deleted because students are enrolled in it.' }, { status: 400 });
    }
    await Course.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Course deleted successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete course due to internal server error' }, { status: 500 });
  }
}