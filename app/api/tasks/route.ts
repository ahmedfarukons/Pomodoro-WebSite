import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Task from '../../../models/Task';

// Tüm görevleri getir
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
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      tasks 
    });

  } catch (error) {
    console.error('Görev getirme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Görevler getirilemedi' 
    }, { status: 500 });
  }
}

// Yeni görev oluştur
export async function POST(request: Request) {
  try {
    const { userId, title, description, priority, category, estimatedPomodoros, dueDate } = await request.json();

    if (!userId || !title) {
      return NextResponse.json({ 
        success: false, 
        error: 'Kullanıcı ID ve başlık gerekli' 
      }, { status: 400 });
    }

    await connectDB();
    
    const task = new Task({
      userId,
      title,
      description: description || '',
      priority: priority || 'medium',
      category: category || 'genel',
      estimatedPomodoros: estimatedPomodoros || 1,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: false,
      completedPomodoros: 0
    });

    await task.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Görev başarıyla oluşturuldu!',
      task 
    });

  } catch (error) {
    console.error('Görev oluşturma hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Görev oluşturulamadı' 
    }, { status: 500 });
  }
} 