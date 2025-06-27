// incele BU DİİREKRT COPY-PASTE


import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("🛡️ Middleware tetiklendi:", request.nextUrl.pathname);
  
  // Login sayfası HARİÇ admin sayfalarını koru
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {

    const token = request.cookies.get('token')?.value;
    console.log("🔑 Token:", token ? 'Mevcut' : 'Yok');

    // Sadece token varlığını kontrol et
    if (!token) {
      console.log("❌ Token yok, login'e yönlendiriliyor");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // JWT verify'ı burada yapma, sadece token varlığını kontrol et
    console.log("✅ Token mevcut, devam ediyor");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};