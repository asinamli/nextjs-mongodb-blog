"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { toast } from 'react-toastify';

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      });

      if (response.ok) {
        toast.success("Yazı başarıyla eklendi! 🎉");
        router.push("/admin/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Yazı eklenirken hata oluştu! ❌");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Bir hata oluştu! ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      pageTitle="Yeni Yazı Ekle"
      pageSubtitle="Blog yazınızı oluşturun"
      pageIcon="✏️"
      showBackButton={true}
      maxWidth="max-w-4xl"
    >

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-blue-600">💡</span>
          <h3 className="text-sm font-semibold text-blue-900">İpuçları</h3>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Başlık kısa ve çekici olmalıdır</li>
          <li>• İçerik en az 100 karakter olmalıdır</li>
          <li>• Taslak olarak kaydetmek için yayınla seçeneğini işaretlemeyin</li>
          <li>• Yazı kaydedildikten sonra dashboard'da görünecektir</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-green-100 border-b">
          <h2 className="text-xl font-semibold text-green-900 flex items-center space-x-2">
            <span>📝</span>
            <span>Yeni Blog Yazısı</span>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 placeholder-gray-500 text-gray-900 bg-white"
                placeholder="Yazı başlığınızı girin..."
                required
              />
              {title && (
                <div className="absolute right-3 top-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-400">
                    {title.length} karakter
                  </span>
                  <button
                    type="button"
                    onClick={() => setTitle("")}
                    className="text-gray-400 hover:text-red-500 transition duration-200 text-sm"
                    title="Başlığı temizle"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            {title.length > 0 && title.length < 5 && (
              <p className="text-sm text-orange-600 mt-1 flex items-center space-x-1">
                <span>⚠️</span>
                <span>Başlık çok kısa (en az 5 karakter önerilir)</span>
              </p>
            )}
          </div>


          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              📖 Yazı İçeriği
            </label>
            <div className="relative">
              <textarea
                id="content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 resize-none placeholder-gray-500 text-gray-900 bg-white"
                placeholder="Yazı içeriğinizi buraya yazın..."
                required
              />
              {content && (
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
              )}
            </div>
            <div className="mt-2 flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Karakter sayısı: {content.length}</span>
              {content.length < 100 && content.length > 0 && (
                <span className="text-orange-600 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>(En az 100 karakter önerilir)</span>
                </span>
              )}
              {content.length >= 100 && (
                <span className="text-green-600 flex items-center space-x-1">
                  <span>✅</span>
                  <span>Yeterli içerik</span>
                </span>
              )}
            </div>
          </div>


          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {published ? "🟢 Hemen yayınla" : "🟡 Taslak olarak kaydet"}
                </span>
                <p className="text-xs text-gray-500">
                  {published 
                    ? "Yazı kaydedilir kaydedilmez yayınlanacak" 
                    : "Yazı taslak olarak kaydedilecek, istediğiniz zaman yayınlayabilirsiniz"
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
              disabled={loading}
            >
              ← Geri Dön
            </button>

            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="px-8 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition duration-200 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>{published ? "Kaydet ve Yayınla" : "Taslak Olarak Kaydet"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}