import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  generateAccessToken,
  verifyRefreshToken,
} from '@/lib/auth';
export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({ id: decoded.id });
    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}
