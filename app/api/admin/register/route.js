import { connectToDB } from '@/lib/db';
import Admin from '../../../../lib/models/admin';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return new Response(JSON.stringify({ error: 'Admin already exists' }), { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    return new Response(JSON.stringify({ message: 'Admin registered successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }
}
