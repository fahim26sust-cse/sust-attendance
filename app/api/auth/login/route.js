import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/lib/auth';

export async function POST(req) {
  const { id, email, password } = await req.json();
  await connectToDB();
  const user = await User.findOne({ email, id });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const accessToken = generateAccessToken({ id: user._id.toString() });
  const refreshToken = generateRefreshToken({ id: user._id.toString() });
  const response = NextResponse.json({ accessToken });
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return response;
}
