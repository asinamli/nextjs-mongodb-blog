"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📝</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blog Sitesi</h1>
              <p className="text-gray-600 text-xs">Yazılar ve düşünceler</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Ana Sayfa
            </Link>
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium text-blue-600 flex items-center space-x-2"
                >
                  <span>📊</span>
                  <span>Admin Panel</span>
                </Link>
                <span className="text-gray-400">|</span>
                <div className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <span>👋</span>
                  <span>{user.username || user.email}</span>
                </div>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className={`text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  pathname.startsWith("/admin")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span>🔐</span>
                <span>Admin</span>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
