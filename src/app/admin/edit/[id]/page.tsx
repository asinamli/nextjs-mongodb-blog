"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { toast } from 'react-toastify';

interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  slug: string;
}

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [originalTitle, setOriginalTitle] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;


  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const post: Post = await response.json();
        setTitle(post.title);
        setContent(post.content);
        setPublished(post.published);
        setOriginalTitle(post.title);
      } else {
        toast.error("Post bulunamadı! ❌");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Post alınırken hata:", error);
      toast.error("Post yüklenirken hata oluştu! ⚠️");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Başlık ve içerik boş olamaz! ⚠️");
      return;
    }

    setUpdateLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          published
        }),
      });

      if (response.ok) {
        toast.success("Yazı başarıyla güncellendi! 🎉");
        router.push("/admin/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Güncelleme başarısız! ❌");
      }
    } catch (error) {
      console.error("Post güncellenirken hata:", error);
      toast.error("Güncelleme sırasında hata oluştu! ⚠️");
    } finally {
      setUpdateLoading(false);
    }
  };


  if (fetchLoading) {
    return (
      <AdminLayout
        pageTitle="Yazı Düzenle"
        pageSubtitle="Blog yazınızı güncelleyin"
        pageIcon="✏️"
      >
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Yazı yükleniyor...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      pageTitle="Yazı Düzenle"
      pageSubtitle="Blog yazınızı güncelleyin"
      pageIcon="✏️"
      maxWidth="max-w-4xl"
    >

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-blue-600">💡</span>
          <h3 className="text-sm font-semibold text-blue-900">İpuçları</h3>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Başlık değişirse slug otomatik güncellenir</li>
          <li>• Ctrl+S ile hızlı kaydetme yapabilirsiniz</li>
          <li>• Taslak olarak kaydedip daha sonra yayınlayabilirsiniz</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b">
          <h2 className="text-xl font-semibold text-purple-900 flex items-center space-x-2">
            <span>📝</span>
            <span>Blog Yazısını Düzenle</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              📌 Yazı Başlığı
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900 bg-white"
                placeholder="Yazınızın başlığını girin..."
                required
              />
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setTitle("")}
                  className="text-gray-400 hover:text-red-500 transition duration-200 text-sm"
                  title="Başlığı temizle"
                >
                  ✕
                </button>
              </div>
            </div>
            {originalTitle && title !== originalTitle && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                <span className="text-blue-700 font-medium">Orijinal: </span>
                <span className="text-blue-600">{originalTitle}</span>
              </div>
            )}
          </div>


          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              📖 Yazı İçeriği
            </label>
            <div className="relative">
              <textarea
                id="content"
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none text-gray-900 bg-white"
                placeholder="Yazınızın içeriğini buraya yazın..."
                required
              />
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <span className="text-xs text-gray-400">
                  {content.length} karakter
                </span>
                <button
                  type="button"
                  onClick={() => setContent("")}
                  className="text-gray-400 hover:text-red-500 transition duration-200 text-sm"
                  title="İçeriği temizle"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>


          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {published ? "🟢 Yayınla" : "🟡 Taslak olarak kaydet"}
                </span>
                <p className="text-xs text-gray-500">
                  {published 
                    ? "Yazı hemen yayınlanacak ve herkes görebilecek" 
                    : "Yazı taslak olarak kaydedilecek, sadece admin görebilecek"
                  }
                </p>
              </div>
            </label>
          </div>


          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
              disabled={updateLoading}
            >
              ← Geri Dön
            </button>
            
            <button
              type="submit"
              disabled={updateLoading}
              className="px-8 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition duration-200 flex items-center space-x-2"
            >
              {updateLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Güncelleniyor...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Güncelle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}