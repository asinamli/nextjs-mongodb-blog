"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {toast} from 'react-toastify';
import { useAuthStore } from '@/store/authStore';

interface AdminLayoutProps{
  children: ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
  pageIcon?: string;
showBackButton?: boolean;
backUrl?: string;
maxWidth?: string;

}

export default function AdminLayout({
  children,
  pageTitle,  
  pageSubtitle,
  pageIcon = "📝",
    showBackButton = true,
  backUrl = "/admin/dashboard",
  maxWidth = "max-w-4xl",
 
}: AdminLayoutProps) {
  const router = useRouter();
  const { logout: authLogout } = useAuthStore();

 const handleLogout = async () => {
  try{
    const response = await fetch("/api/auth/logout", {
      method: "POST" 
    });
    if(response.ok) {
    // Zustand store'dan da çıkış yap
    authLogout();
    toast.success("Çıkış başarılı! 👋")
    router.push("/admin/login");
  }else {
    toast.error("Çıkış başarısız! ❌");
  }
  }catch(error) {
    console.log("Çıkış yapılırken hata oluştu:", error);
    toast.error("Çıkış yapılırken hata oluştu! ⚠️");
  }
};

return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

           <div className="flex items-center space-x-4">
              {showBackButton && pageTitle !== "Admin Dashboard" && (
                <Link 
                  href={backUrl}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition duration-200"
                  title="Geri dön"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              )}

                 <Link href="/admin/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="mr-2">{pageIcon}</span>
                    {pageTitle}
                  </h1>
                  {pageSubtitle && (
                    <p className="text-xs text-gray-500">{pageSubtitle}</p>
                  )}
                </div>
              </Link>


            </div>
            

             <div className="hidden md:flex items-center space-x-3">
              <Link 
                href="/"
                className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                target="_blank"
                title="Siteyi görüntüle"
              >
                🌐 Siteyi Görüntüle
              </Link>
              
              <Link
                href="/admin/new-post"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                ✚ Yeni Yazı
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                title="Çıkış yap"
              >
                🚪 Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

     



      <main className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow`}>
        {children}
      </main>


      <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">📝</span>
          </div>
          <span className="text-lg font-semibold">Blog Sitesi</span>
        </div>
        <p className="text-gray-400 text-sm">
          © 2025 Blog Sitesi - Tüm hakları saklıdır
        </p>
      </div>
    </footer>
    </div>
  );
}