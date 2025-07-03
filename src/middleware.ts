import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basit varlık kontrolü fonksiyonu
function tokenExists(token: string | undefined): boolean {
  return !!token && token.length > 10; // En azından geçerli bir token uzunluğu olmalı
}

export async function middleware(request: NextRequest) {
  // Admin sayfalarına erişim kontrolü - login ve register hariç tüm admin sayfaları için
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/admin/register')) {

    console.log('Admin sayfası isteği, güvenlik kontrolü yapılıyor: ', request.nextUrl.pathname);
    
    // Token kontrolü
    const token = request.cookies.get('token')?.value;
    
    // Token yoksa login sayfasına yönlendir
    if (!tokenExists(token)) {
      console.log('Token bulunamadı veya geçersiz - Giriş sayfasına yönlendiriliyor');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token varsa devam et (tam doğrulama API tarafında yapılacak)
    console.log('Token mevcut, erişime izin veriliyor');
    return NextResponse.next();
  }

  // Admin sayfası değilse normal devam et
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};