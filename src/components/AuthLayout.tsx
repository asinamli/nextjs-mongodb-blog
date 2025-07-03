interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  icon = "🔐",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">

        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">{icon}</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-8">
          {children}
        </div>


        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2025 Blog Admin Panel - Tüm hakları saklıdır
          </p>
        </div>
      </div>
    </div>
  );
}
