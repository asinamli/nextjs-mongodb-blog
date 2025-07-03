export default function Footer() {
  return (
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
  );
}