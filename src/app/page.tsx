"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import PostCardGrid from "@/components/PostCardGrid";
import Footer from "@/components/Footer";

interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  slug: string;
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  const fetchPublishedPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      
      const publishedPosts = data.filter((post: Post) => post.published);
      setPosts(publishedPosts);
      setFilteredPosts(publishedPosts);
    } catch (error) {
      console.error("Yazılar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const resetSearch = () => {
    setSearchQuery("");
    setFilteredPosts(posts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">

      <Navbar />


      <HeroSection postCount={posts.length} />


      <SearchSection 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        resultCount={filteredPosts.length}
      />


      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <PostCardGrid 
          posts={filteredPosts}
          searchQuery={searchQuery}
          loading={loading}
          onReset={resetSearch}
        />
      </main>


      <Footer />
    </div>
  );
}