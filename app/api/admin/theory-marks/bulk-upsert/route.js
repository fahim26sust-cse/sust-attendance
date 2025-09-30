import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Theory_Marks from '@/lib/models/theory_marks';
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { rows } = body || {};
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No rows to upsert' }, { status: 400 });
    }
    const bulk = Theory_Marks.collection.initializeUnorderedBulkOp();
    rows.forEach((r) => {
      if (!r.studentId || !r.courseCode) return;
      bulk.find({ studentId: r.studentId, courseCode: r.courseCode }).upsert().updateOne({
        $set: {
          studentName: r.studentName,
          courseName: r.courseName,
          TT1: r.TT1 ?? null,
          TT2: r.TT2 ?? null,
          attendance: r.attendance ?? null,
          finalMarks: r.finalMarks ?? null,
          assignments: Array.isArray(r.assignments) ? r.assignments : [],
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      });
    });
    const result = await bulk.execute();
    const upsertedCount = (result?.nUpserted || 0) + (result?.nModified || 0);
    return NextResponse.json({ ok: true, upsertedCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
