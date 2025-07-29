import { NextResponse } from 'next/server';
import { dbConnect } from '@/db/DbConnect';
import User from '@/models/User';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  await dbConnect();

  const { email } = await params;

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
