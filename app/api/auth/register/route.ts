import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // MongoDB'ye bağlan
    await connectDB();

    // Email kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Bu email adresi zaten kullanılıyor' 
      }, { status: 400 });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 12);

    // Yeni kullanıcı oluştur
    const user = new User({
      name,
      email,
      password: hashedPassword,
      preferences: {
        theme: 'system',
        pomodoroSettings: {
          workDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          longBreakInterval: 4
        }
      }
    });

    await user.save();

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
      message: 'Kullanıcı başarıyla oluşturuldu!',
      user: userResponse
    });

  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Kayıt işlemi başarısız',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

