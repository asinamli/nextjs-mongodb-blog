"use client";

interface HeroSectionProps {
  postCount : number;
}

export default function HeroSection({ postCount }: HeroSectionProps) {
  return (
 <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Hoşgeldiniz!</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Bu blogda teknoloji, yazılım ve güncel konular hakkında yazılar bulabilirsiniz.
        </p>
        <div className="flex items-center justify-center space-x-6 text-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{postCount}</div>
            <div className="text-sm">Yazı</div>
          </div>
          <div className="w-px h-8 bg-blue-400"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-sm">Fikir</div>
          </div>
        </div>
      </div>
    </section>
  );
}