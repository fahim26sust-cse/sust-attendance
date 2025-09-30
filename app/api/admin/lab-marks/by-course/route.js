import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Lab_Marks from '@/lib/models/Lab_Marks';
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get('courseCode');
    const courseName = searchParams.get('courseName');
    if (!courseCode) {
      return NextResponse.json({ error: 'courseCode is required' }, { status: 400 });
    }
    const query = { courseCode };
    if (courseName && courseName.trim()) {
      query.courseName = courseName.trim();
    }
    const docs = await Lab_Marks.find(query).lean();
    return NextResponse.json(docs ?? [], { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}