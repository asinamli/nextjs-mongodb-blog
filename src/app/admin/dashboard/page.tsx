// bu kodu formaliteden koydun sil yeniden yaz 

"use client";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🎉 Admin Dashboard
          </h1>
          <p className="text-green-600 font-semibold">
            ✅ Başarıyla giriş yaptınız!
          </p>
          <button
            onClick={() => {
              document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              window.location.href = '/admin/login';
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}