import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import AdminLocation from '@/lib/models/adminLocation'; 

export async function POST(req) {
  try {
    const { courseCode, geoLocation, pin, permission, distance } = await req.json();
    await connectToDB();
    const adminLocation = await AdminLocation.findOneAndUpdate(
      { courseCode }, 
      { geoLocation, pin, distance, updatedAt: new Date(), permission },
      { new: true, upsert: true } 
    );
    return NextResponse.json({ success: true, adminLocation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set/update geo-fence' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get('courseCode');
    if (!courseCode) {
      return NextResponse.json({ error: 'CourseCode is required' }, { status: 400 });
    }
    const adminLocation = await AdminLocation.findOne({ courseCode });
    if (!adminLocation) {
      return NextResponse.json({ error: 'Geo-fence not set for the course' }, { status: 404 });
    }
    return NextResponse.json({ 
      geoLocation: adminLocation.geoLocation, 
      pin: adminLocation.pin, 
      permission: adminLocation.permission,
      distance: adminLocation.distance 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve geo-fence' }, { status: 500 });
  }
}
