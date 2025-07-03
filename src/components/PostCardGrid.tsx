"use client";

import { se } from "date-fns/locale";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  slug: string;
  createdAt: string;
}

interface PostCardGridProps {
  posts: Post[];
  searchQuery: string;
  loading: boolean;
  onReset: () => void;
}

export default function PostCardGrid({posts, searchQuery, loading, onReset}: PostCardGridProps) {
  if (loading) {
    return <PostCardSkeletonGrid />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        {searchQuery ? (
          <>
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aradığınız yazı bulunamadı</h3>
            <p className="text-gray-600 text-lg mb-6">Farklı anahtar kelimeler ile tekrar deneyin.</p>
            <button
              onClick={onReset}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              Tüm Yazıları Göster
            </button>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Henüz yazı bulunmuyor</h3>
            <p className="text-gray-600 text-lg">Yakında yeni yazılar yayınlanacak. Bizi takip etmeye devam edin!</p>
          </>
        )}
      </div>
    );
  }

   return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

function PostCardSkeletonGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-5">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}