import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Admin from '@/lib/models/admin';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const normalizedEmail = (email || '').trim().toLowerCase();
    await connectToDB();
    const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const isPasswordValid = await bcrypt.compare(password || '', admin.password || '');
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const payload = { id: admin._id.toString(), email: admin.email };
    const accessToken = generateAccessToken(payload);   
    const refreshToken = generateRefreshToken(payload); 
    const res = NextResponse.json({ token: accessToken }, { status: 200 });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    res.cookies.set('admin-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 30, 
      path: '/',
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
