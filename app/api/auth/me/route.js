import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/lib/models/user';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Please log in to access this resource.' }, { status: 200 }); // Success status but inform the user to log in
  }
  const token = authHeader.split(' ')[1];  
  try {
    const decoded = verifyAccessToken(token); 
    await connectToDB();
    const user = await User.findById(decoded.id).select('id name dept semester batch');
    return NextResponse.json({ id: user.id, name: user.name, dept: user.dept, semester: user.semester, batch: user.batch }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token. Please log in again.' }, { status: 200 });
  }
}
