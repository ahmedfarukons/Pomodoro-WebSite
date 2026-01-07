import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Tüm alanlar zorunlu.' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await (User as any).findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Bu e-posta ile zaten kayıtlı bir kullanıcı var.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      preferences: newUser.preferences,
      stats: newUser.stats,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json({ success: true, message: 'Kayıt başarılı!', user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: 'Kayıt işlemi sırasında bir hata oluştu.' }, { status: 500 });
  }
}


