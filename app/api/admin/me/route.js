import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { connectToDB } from '@/lib/db';
import Admin from '@/lib/models/admin';
import { verifyAccessToken } from '@/lib/auth';

export async function GET() {
  const h = await headers();
  const authHeader = h.get('authorization') || h.get('Authorization') || null;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    const c = await cookies();
    token = c.get('admin-token')?.value || null;
  }
  if (!token) {
    return NextResponse.json(
      { message: 'Please log in to access this resource.' },
      { status: 200 }
    );
  }
  try {
    const decoded = verifyAccessToken(token);
    await connectToDB();
    let admin = null;
    if (decoded?.id) {
      admin = await Admin.findById(decoded.id).select('_id email');
    } else if (decoded?.email) {
      admin = await Admin.findOne({ email: decoded.email }).select('_id email');
    }
    if (!admin) {
      return NextResponse.json(
        { message: 'Admin not found. Please log in again.' },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { id: admin.id || admin._id?.toString(), email: admin.email, name: admin.name || null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid or expired token. Please log in again.' },
      { status: 200 }
    );
  }
}
