import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';

export async function POST(req) {
  const { id, email, name, dept, batch, semester, password } = await req.json();
  try {
    await connectToDB();
    const [emailHit, idHit] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ id }),
    ]);

    if (emailHit || idHit) {
      const field = emailHit ? 'email' : 'id';
      const error = emailHit ? 'Email already in use' : 'ID already in use';
      return NextResponse.json({ error, field }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id,
      email,
      name,
      dept,
      batch,
      semester,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken({ id: newUser._id.toString() });
    const refreshToken = generateRefreshToken({ id: newUser._id.toString() });
    const response = NextResponse.json({ accessToken });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
