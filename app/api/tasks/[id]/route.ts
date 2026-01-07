import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Task from '../../../../models/Task';

// Görev güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();

    await connectDB();
    
    const task = await Task.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ 
        success: false, 
        error: 'Görev bulunamadı' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Görev başarıyla güncellendi!',
      task 
    });

  } catch (error) {
    console.error('Görev güncelleme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Görev güncellenemedi' 
    }, { status: 500 });
  }
}

// Görev sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await connectDB();
    
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ 
        success: false, 
        error: 'Görev bulunamadı' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Görev başarıyla silindi!' 
    });

  } catch (error) {
    console.error('Görev silme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Görev silinemedi' 
    }, { status: 500 });
  }
} 