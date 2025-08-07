import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // MongoDB'ye bağlan
    await connectDB();

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email veya şifre hatalı' 
      }, { status: 401 });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email veya şifre hatalı' 
      }, { status: 401 });
    }

    // Şifreyi response'dan çıkar
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      stats: user.stats,
      createdAt: user.createdAt
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Giriş başarılı!',
      user: userResponse
    });

  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Giriş işlemi başarısız',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

