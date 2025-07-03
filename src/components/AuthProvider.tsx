'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde oturum kontrolü
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Admin sayfalarında ekstra güvenlik kontrolü - middleware'i destekler
    const isAdminPage = pathname.startsWith('/admin') && 
                       !pathname.startsWith('/admin/login') &&
                       !pathname.startsWith('/admin/register');
    
    if (isAdminPage) {
      // Oturum kontrolü yükleniyor durumunda değilse ve giriş yapılmamışsa
      if (!isLoading && !isAuthenticated) {
        console.log('Admin sayfası için oturum doğrulaması başarısız - yönlendiriliyor');
        router.replace('/admin/login');
      }
      
      // Admin değilse erişimi reddet
      if (!isLoading && isAuthenticated && user && user.role !== 'admin') {
        console.log('Kullanıcı admin değil - erişim reddedildi');
        router.replace('/admin/login');
      }
    }
  }, [pathname, isAuthenticated, isLoading, user, router]);

  return <>{children}</>;
}
