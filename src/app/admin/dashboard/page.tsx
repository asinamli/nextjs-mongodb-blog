"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import PostCard from "@/components/PostCard";
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';

interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  slug: string;
  createdAt: string;
}

export default function Dashboard(){
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data); 
      console.log("yazılar getirildi", data);
    } catch(error) {
      console.error("Yazılar alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Yazı başarıyla silindi! 🗑️");
      } else {
        toast.error("Silme başarısız! ❌");
      }
    } catch (error) {
      console.error("Yazı silinirken hata oluştu:", error);
      toast.error("Hata oluştu! ⚠️");
    }
  };


  const publishPost = async (postId: string)=> {
    setPublishingId(postId);

    try{
      const currentPost = posts.find(post => post._id === postId);
      if(!currentPost) {
        toast.error("Yazı bulunamadı! ❌");
        return;
      }

      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          title: currentPost.title,
          content: currentPost.content,
          published: true,
        }),
    });

    if(response.ok)
  {
    const updatedPost=await response.json();
    setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    toast.success("Yazı başarıyla yayınlandı! 🎉");
  }else {
    toast.error("Yazı yayınlanırken hata oluştu! ❌");
  }
}catch(error) {
    console.error("Yazı yayınlanırken hata oluştu:", error);
    toast.error("Hata oluştu! ⚠️");
  }finally{
    setPublishingId(null);
  }
  };

  if (loading) {
    return (
      <AdminLayout
        pageTitle="Admin Dashboard"
        pageSubtitle="Blog yönetim paneli"
        pageIcon="📊"
        showBackButton={false}
        maxWidth="max-w-7xl"
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
     pageTitle="Admin Dashboard"
      pageSubtitle="Blog yazılarınızı yönetin"
      pageIcon="📊"
      showBackButton={false}
      maxWidth="max-w-7xl"
    >
      
      {isAuthenticated && user && (
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoş Geldiniz</p>
              <p className="text-xl font-bold text-gray-900">{user.username || user.email}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Yazı</p>
              <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>



     <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Yayınlanan</p>
              <p className="text-3xl font-bold text-gray-900">
                {posts.filter(post => post.published).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taslak</p>
              <p className="text-3xl font-bold text-gray-900 ">
                {posts.filter(post => !post.published).length}
              </p>
            </div>
          </div>
        </div>
      </div>




      <div className="bg-white rounded-xl shadow-lg shadow-[#001E70] overflow-hidden">
       

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz yazı bulunmuyor</h3>
            <p className="text-gray-600 mb-6">İlk blog yazınızı ekleyerek başlayın!</p>
            <a
              href="/admin/new-post"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              İlk Yazıyı Ekle
            </a>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  showAdminActions={true}
                  onDelete={deletePost}
                  onPublish={publishPost}           
                  publishingId={publishingId}      
                />


  ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}