import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import PomodoroSession from '../../../models/PomodoroSession';

// Tüm pomodoro oturumlarını getir
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Kullanıcı ID gerekli' 
      }, { status: 400 });
    }

    await connectDB();
    const sessions = await PomodoroSession.find({ userId })
      .sort({ startTime: -1 })
      .limit(50);

    return NextResponse.json({ 
      success: true, 
      sessions 
    });

  } catch (error) {
    console.error('Pomodoro oturum getirme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Pomodoro oturumları getirilemedi' 
    }, { status: 500 });
  }
}

// Yeni pomodoro oturumu oluştur
export async function POST(request: Request) {
  try {
    const { 
      userId, 
      taskId, 
      type, 
      duration, 
      startTime 
    } = await request.json();

    if (!userId || !type || !duration) {
      return NextResponse.json({ 
        success: false, 
        error: 'Kullanıcı ID, tip ve süre gerekli' 
      }, { status: 400 });
    }

    await connectDB();
    
    const session = new PomodoroSession({
      userId,
      taskId: taskId || null,
      type, // work, shortBreak, longBreak
      duration,
      completed: false,
      startTime: startTime ? new Date(startTime) : new Date(),
      interruptions: 0,
      notes: ''
    });

    await session.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Pomodoro oturumu başarıyla oluşturuldu!',
      session 
    });

  } catch (error) {
    console.error('Pomodoro oturumu oluşturma hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Pomodoro oturumu oluşturulamadı' 
    }, { status: 500 });
  }
} 