"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  const fetchPost = useCallback(async () => {
    try {

      const response = await fetch(`/api/posts/slug/${slug}`);
      
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Yazı yüklenirken hata:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, fetchPost]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yazı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız yazı bulunamadı veya yayından kaldırılmış olabilir.</p>
          <Link 
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200 inline-flex items-center space-x-2"
          >
            <span>←</span>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">

      <header className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition duration-200">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📝</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Blog Sitesi</h1>
                <p className="text-gray-600 text-sm">Ana Sayfaya Dön</p>
              </div>
            </Link>
            
            <Link 
              href="/admin/login"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2 text-sm"
            >
              <span>🔐</span>
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </header>


      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">

        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition duration-200">Ana Sayfa</Link>
            </li>
            <li>→</li>
            <li>
              <span className="text-gray-400">Blog</span>
            </li>
            <li>→</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>


        <article className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="px-8 py-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20 text-white">
                📝 Blog Yazısı
              </span>
              <span className="text-blue-100 text-sm">
                {formatDate(post.createdAt)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <span>📖</span>
                <span className="text-sm">{Math.ceil(post.content.length / 1000)} dk okuma</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📅</span>
                <span className="text-sm">
                  {post.updatedAt !== post.createdAt && "Güncellenme: " + formatDate(post.updatedAt)}
                </span>
              </div>
            </div>
          </div>


          <div className="px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </div>


          <div className="px-8 py-6 bg-gray-50 border-t ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Bu yazıyı beğendin mi?</span>
                <div className="flex items-center space-x-2">
                  <button className="text-2xl hover:scale-110 transition duration-200">👍</button>
                  <button className="text-2xl hover:scale-110 transition duration-200">❤️</button>
                  <button className="text-2xl hover:scale-110 transition duration-200">🔥</button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-blue-600 transition duration-200 flex items-center space-x-2">
                  <span>📤</span>
                  <span className="text-sm">Paylaş</span>
                </button>
              </div>
            </div>
          </div>
        </article>


        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition duration-200 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>←</span>
            <span>Diğer Yazıları Görüntüle</span>
          </Link>
        </div>
      </main>


      <footer className="bg-gray-800 text-white py-8 mt-16 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
