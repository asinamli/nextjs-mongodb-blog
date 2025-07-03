import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // Veritabanı bağlantısı
    await dbConnect();
    
    // Kullanıcı bilgilerini al
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Kullanıcı bilgileri alınırken hata:', error);
    return NextResponse.json(
      { error: 'Oturum geçersiz' },
      { status: 401 }
    );
  }
}
