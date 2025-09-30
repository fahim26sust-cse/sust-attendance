import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Attendance from '@/lib/models/attendance';
export async function DELETE(req) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }
    await connectToDB();
    const result = await Attendance.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete attendance' }, { status: 500 });
  }
}
