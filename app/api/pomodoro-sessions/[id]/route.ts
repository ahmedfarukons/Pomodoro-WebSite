import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import PomodoroSession from '../../../../models/PomodoroSession';
import User from '../../../../models/User';

// Pomodoro oturumunu güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();

    await connectDB();
    
    const session = await PomodoroSession.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!session) {
      return NextResponse.json({ 
        success: false, 
        error: 'Pomodoro oturumu bulunamadı' 
      }, { status: 404 });
    }

    // Eğer oturum tamamlandıysa kullanıcı istatistiklerini güncelle
    if (updateData.completed && session.completed) {
      const userUpdate: any = {};
      
      if (session.type === 'work') {
        userUpdate.$inc = {
          'stats.totalPomodoros': 1,
          'stats.totalFocusTime': session.actualDuration || session.duration
        };
      } else {
        userUpdate.$inc = {
          'stats.totalBreakTime': session.actualDuration || session.duration
        };
      }

      await User.findByIdAndUpdate(session.userId, userUpdate);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Pomodoro oturumu başarıyla güncellendi!',
      session 
    });

  } catch (error) {
    console.error('Pomodoro oturumu güncelleme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Pomodoro oturumu güncellenemedi' 
    }, { status: 500 });
  }
}

// Pomodoro oturumunu sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await connectDB();
    
    const session = await PomodoroSession.findByIdAndDelete(id);

    if (!session) {
      return NextResponse.json({ 
        success: false, 
        error: 'Pomodoro oturumu bulunamadı' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Pomodoro oturumu başarıyla silindi!' 
    });

  } catch (error) {
    console.error('Pomodoro oturumu silme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Pomodoro oturumu silinemedi' 
    }, { status: 500 });
  }
}







