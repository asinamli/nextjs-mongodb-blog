export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="w-full h-6 bg-gray-200 rounded"></div>
          <div className="w-4/5 h-6 bg-gray-200 rounded"></div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function PostCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}
