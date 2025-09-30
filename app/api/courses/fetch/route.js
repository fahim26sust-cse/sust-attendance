import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Course from '@/lib/models/course';

export async function GET() {
  try {
    await connectToDB();
    const courses = await Course.find();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
