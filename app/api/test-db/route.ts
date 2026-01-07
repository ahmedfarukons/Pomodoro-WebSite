import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    // MongoDB'ye bağlan
    const mongoose = await connectDB();
    
    // Mevcut veritabanlarını listele
    const adminDb = mongoose.connection.db.admin();
    const dbList = await adminDb.listDatabases();
    
    // Test için basit bir sorgu yap
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB bağlantısı başarılı!',
      databases: dbList.databases.map((db: any) => db.name),
      currentDatabase: mongoose.connection.db.databaseName,
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'MongoDB bağlantısı başarısız!',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
