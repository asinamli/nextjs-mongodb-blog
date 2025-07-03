import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  slug: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  showAdminActions?: boolean;
  onDelete?: (id: string) => void;
  onPublish?: (postId: string) => void;
  publishingId?: string | null;
}

export default function PostCard({
  post,
  showAdminActions = false,
  onDelete,
  onPublish,
  publishingId
}: PostCardProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <article className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              📝 Blog
            </span>
            {!post.published && showAdminActions && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                📄 Taslak
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <Link
            href={showAdminActions ? `/admin/edit/${post._id}` : `/blog/${post.slug}`}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
          >
            <span>{showAdminActions ? "Düzenle" : "Devamını Oku"}</span>
            <span>→</span>
          </Link>

          {showAdminActions && (
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-500">
                {getReadingTime(post.content)} dk okuma
              </div>

              {!post.published && onPublish && (
                <button
                  onClick={() => onPublish(post._id)}
                  disabled={publishingId === post._id}
                  className="text-green-600 hover:text-green-800 text-xs font-medium transition duration-200 disabled:opacity-50"
                >
                  {publishingId === post._id ? (
                    <span className="flex items-center space-x-1">
                      <div className="animate-spin rounded-full h-3 w-3 border border-green-600 border-t-transparent"></div>
                      <span>Yayınlanıyor...</span>
                    </span>
                  ) : (
                    '🚀 Yayınla'
                  )}
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(post._id)}
                  className="text-red-600 hover:text-red-800 text-xs font-medium transition duration-200"
                >
                  🗑️ Sil
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

 