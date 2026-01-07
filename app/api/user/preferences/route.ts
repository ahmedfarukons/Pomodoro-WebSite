import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { authOptions } from '../../../../lib/auth';

function getUserIdFromAuthHeader(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.substring('Bearer '.length).trim();
  return token || null;
}

// GET - Get user preferences
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let userId: string | null = session?.user?.id || null;

    if (!userId) {
      userId = getUserIdFromAuthHeader(req);
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId).select('preferences stats');

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({
      preferences: user.preferences,
      stats: user.stats
    });
  } catch (error) {
    console.error('Get preferences error:', error);
    return NextResponse.json({ error: 'Tercihler alınırken bir hata oluştu.' }, { status: 500 });
  }
}

// PUT - Update user preferences
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let userId: string | null = session?.user?.id || null;

    if (!userId) {
      userId = getUserIdFromAuthHeader(req);
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = await req.json();

    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { preferences: updateData } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ preferences: user.preferences });
  } catch (error) {
    console.error('Update preferences error:', error);
    return NextResponse.json({ error: 'Tercihler güncellenirken bir hata oluştu.' }, { status: 500 });
  }
}